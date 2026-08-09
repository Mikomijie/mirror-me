import express from 'express'
import multer from 'multer'

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

const BASE_URL = 'https://yce-api-01.makeupar.com'

function getKey() {
  return process.env.YOUCAM_API_KEY
}

async function uploadFileToYouCam(fileBuffer, fileName, fileSize, contentType) {
  const registerRes = await fetch(`${BASE_URL}/s2s/v2.0/file`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      files: [{ content_type: contentType, file_name: fileName, file_size: fileSize }],
    }),
  })

  const registerData = await registerRes.json()
  console.log('File register response:', JSON.stringify(registerData))

  const fileData = registerData.data.files[0]
  const fileId = fileData.file_id
  const uploadUrl = fileData.requests[0].url

  await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'Content-Length': String(fileSize),
    },
    body: fileBuffer,
  })

  return fileId
}

async function pollTask(taskUrl, maxAttempts = 20, intervalMs = 3000) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, intervalMs))

    const res = await fetch(taskUrl, {
      headers: {
        'Authorization': `Bearer ${getKey()}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await res.json()
    console.log('Poll response:', JSON.stringify(data))

    const { task_status, results, error } = data.data

    if (task_status === 'success') return results
    if (task_status === 'error') throw new Error(error || 'Task failed')
  }

  throw new Error('Skin analysis timed out')
}

router.post('/', upload.single('selfie'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' })
    }

    console.log('Key being used:', getKey())

    const { buffer, originalname, size, mimetype } = req.file

    const fileId = await uploadFileToYouCam(buffer, originalname, size, mimetype)
    console.log('File ID:', fileId)

    const taskRes = await fetch(`${BASE_URL}/s2s/v2.0/task/skin-analysis`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        src_file_id: fileId,
        dst_actions: ['moisture', 'oiliness', 'radiance', 'acne', 'texture', 'pore'],
        format: 'json',
      }),
    })

    const taskData = await taskRes.json()
    console.log('Task create response:', JSON.stringify(taskData))

    const taskId = taskData.data.task_id

    const results = await pollTask(
      `${BASE_URL}/s2s/v2.0/task/skin-analysis/${taskId}`
    )

    res.json({ success: true, results })

  } catch (error) {
    console.error('Skin analysis error:', error?.message)
    res.status(500).json({ error: 'Skin analysis failed', detail: error.message })
  }
})

export default router