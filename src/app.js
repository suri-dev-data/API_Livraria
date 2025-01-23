import express from "express";
import mongoose from "mongoose"; 
import db from "./config/dbConnect.js";
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Erro de conexão'));

db.once("open", () => {
  console.log('conexão com o banco feita com sucesso');
});

const app = express();
app.use(express.json())
routes(app);

// eslint-disable-next-line no-unused-vars
app.use((erro,req,res,next) => {
  if (erro instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos"});
  } 
  res.status(500).send({message: "Erro interno de servidor"});
});

export default app;