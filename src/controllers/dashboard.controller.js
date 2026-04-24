export const getDashboard = async (req, res) => {
  try {

    // 🔥 depois você liga no banco
    return res.json({
      stats: {
        alunos: 120,
        mensalidades: "95%",
        faturamento: "R$ 12.450",
        checkins: 86
      },
      grafico: [
        { name: "Jan", valor: 4000 },
        { name: "Fev", valor: 3000 },
        { name: "Mar", valor: 5000 },
        { name: "Abr", valor: 4500 },
        { name: "Mai", valor: 6000 },
        { name: "Jun", valor: 7000 }
      ]
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro no dashboard" })
  }
}
