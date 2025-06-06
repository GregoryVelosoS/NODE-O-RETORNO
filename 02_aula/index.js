const express = require("express");
const app = express();
const port = 5000;
const path = require('path')
const caminho = path.join(__dirname, 'pages')

//TRABALHAR COM POST 
app.get("/users/cadastrar", (req,res) =>{
  res.sendFile(`${caminho}/cadastro.html`)   
})
//Converte o body em filho de J
app.use(
    express.urlencoded({
      extended:true
    })
)
app.use(express.json())

app.post("/users/save", (req,res) => {
  console.log(req.body)

  const login = req.body.usuario
  const senha = req.body.senha

  console.log(`Login do individuo: ${login} e a senha dele é ${senha}`)
  res.sendFile(`${caminho}/cadastroConfirmado.html`)   
})

// Simula ter usuário autenticado
const checaAutorizacao = (req,res, next) => {
  req.authStatus = false
  //Sim
  if(req.authStatus){
    console.log("Usuário Autenticado")
  }
  else{
    console.log("Usuário não possui permissão para acessar")
  }
  next()
}

app.use(checaAutorizacao)

app.get("/users/:id", (req,res) => {
    const id = req.params.id
    console.log(`Usuário ${id} foi encontrado no banco`)
    res.sendFile(`${caminho}/users.html`)
})

app.get("/home", (req, res) =>{
    res.sendFile(`${caminho}/index.html`)
})

app.get("/", (req, res) => {
  res.send("Olá mundo");
});

app.use((req,res,next)=>{
  res.status(404).sendFile(`${caminho}/404.html`)
})

app.listen(port, console.log(`Servidor rodando na porta ${port}`));

