import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import skinAnalysisRoute from './routes/skinAnalysis.js'
import tryOnRoute from './routes/tryOn.js'

dotenv.config()
console.log('KEY LOADED:', process.env.YOUCAM_API_KEY)

const app = express()
const PORT = 3001

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
}))

app.use(express.json())

app.use('/api/skin-analysis', skinAnalysisRoute)
app.use('/api/tryon', tryOnRoute)

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'VerdictStyle backend running' })
})

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})