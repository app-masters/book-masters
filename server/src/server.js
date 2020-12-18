import app from "./app.js"

import "dotenv/config.js"

const port = process.env.APP_PORT || 3333

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}!`)
})
