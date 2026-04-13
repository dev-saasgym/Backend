import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import alunosRoutes from './routes/alunos.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.use('/auth', authRoutes);
app.use('/alunos', alunosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
