import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import alunosRoutes from './routes/alunos.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

// 🔥 CORS COMPLETO (resolve de vez)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// 🔥 responde preflight
app.options('*', cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

// ROTAS
app.use('/auth', authRoutes)
app.use('/alunos', alunosRoutes)
app.use('/dashboard', dashboardRoutes)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
