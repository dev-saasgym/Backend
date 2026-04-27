import express from 'express'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import alunosRoutes from './routes/alunos.routes.js'
import dashboardRoutes from './routes/dashboard.routes.js'

const app = express()

// ✅ CORS CORRIGIDO
app.use(cors({
  origin: [
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json())

app.get('/', (req, res) => {
  res.send('API funcionando 🚀')
})

// ROTAS
app.use('/auth', authRoutes)
app.use('/alunos', alunosRoutes)
app.use('/dashboard', dashboardRoutes)

// START
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
