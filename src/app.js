import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import alunosRoutes from './routes/alunos.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.options('*', cors()) // 🔥 ESSENCIAL

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

app.use('/auth', authRoutes)
app.use('/alunos', alunosRoutes)
app.use('/dashboard', dashboardRoutes)

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
