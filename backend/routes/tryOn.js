import express from 'express'
import multer from 'multer'
import axios from 'axios'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

const BASE_URL = 'https://yce-api-01.makeupar.com'
const API_KEY = process.env.YOUCAM_API_KEY

// Helper: upload file to YouCam and get file_id
async function uploadFileToYouCam(fileBuffer, fileName, fileSize, contentType) {
  // Step 1: Register file metadata
  const registerRes = await axios.post(
    `${BASE_URL}/s2s/v2.0/file`,
    {
      files: [
        {
          content_type: contentType,
          file_name: fileName,
          file_size: fileSize,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  )

  const fileData = registerRes.data.data.files[0]
  const fileId = fileData.file_id
  const uploadUrl = fileData.requests[0].url

  // Step 2: Upload actual image to pre-signed S3 URL
  await axios.put(uploadUrl, fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Content-Length': fileSize,
    },
  })

  return fileId
}

// Helper: poll task until success or error
async function pollTask(taskUrl, maxAttempts = 20, intervalMs = 3000) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, intervalMs))

    const res = await axios.get(taskUrl, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    })

    const { task_status, results, error } = res.data.data

    if (task_status === 'success') return results
    if (task_status === 'error') throw new Error(error || 'Task failed')
  }

  throw new Error('Try-on timed out')
}

router.post('/', upload.fields([
  { name: 'selfie', maxCount: 1 },
  { name: 'outfit', maxCount: 1 },
]), async (req, res) => {
  try {
    const selfie = req.files?.selfie?.[0]
    const outfit = req.files?.outfit?.[0]

    if (!selfie || !outfit) {
      return res.status(400).json({ error: 'Both selfie and outfit images are required' })
    }

    // Upload both images in parallel
    const [selfieFileId, outfitFileId] = await Promise.all([
      uploadFileToYouCam(
        selfie.buffer,
        selfie.originalname,
        selfie.size,
        selfie.mimetype
      ),
      uploadFileToYouCam(
        outfit.buffer,
        outfit.originalname,
        outfit.size,
        outfit.mimetype
      ),
    ])

    // Create VTO task using cloth-v4
    const taskRes = await axios.post(
      `${BASE_URL}/s2s/v2.0/task/cloth-v4`,
      {
        src_file_id: selfieFileId,
        ref_file_id: outfitFileId,
        garment_category: 'auto',
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const taskId = taskRes.data.data.task_id

    // Poll for result
    const results = await pollTask(
      `${BASE_URL}/s2s/v2.0/task/cloth-v4/${taskId}`
    )

    // results.url = the final image of user wearing the outfit
    res.json({ success: true, resultImageUrl: results.url })

  } catch (error) {
    console.error('Try-on error:', error?.response?.data || error.message)
    res.status(500).json({ error: 'Try-on failed', detail: error.message })
  }
})

export default router