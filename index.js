var express = require("express");
var app = express();
var { livro, autor } = require("./models")

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//Página Inicial

app.get('/', async function(req, res){
  var pagina_inicial = "Seja bem vindo";
  res.json(pagina_inicial);
});

//Rotas para usuários

app.get("/livros/:id", async function(req, res){
  const resultado = await livro.findByPk(req.params.id);
  res.json(resultado);
});

app.get("/livros", async function(req, res){
  const resultado = await livro.findAll();
  res.json(resultado);
});

app.post("/livros", function(req, res){
  const resultado = livro.create(req.body);
  res.json(resultado);
});

app.put("/livros/:id", async function(req, res){
  var atualizar = await livro.findByPk(req.params.id);
  
  var resultado = await atualizar.update(req.body);
  res.json(resultado);
});

app.delete("/livros/:id", async function(req, res){
  const deletar = await livro.findByPk(req.params.id);
  deletar.destroy();
});

app.get("/livros/:id/autor", async function(req, res){
  const resultado = await livro.findByPk(req.params.id, {include: "autor"});
  res.json(resultado.autores)
});

//Rotas para empresas

app.get("/autores/:id", async function(req, res){
  const resultado = await autor.findByPk(req.params.id);
  res.json(resultado);
});

app.get("/autores", async function(req, res){
  const resultado = await autor.findAll();
  res.json(resultado);
});

app.post("/autores", function(req, res){
  const resultado = autor.create(req.body);
  res.json(resultado);
});

app.put("/autores/:id", async function(req, res){
  var atualizar = await autor.findByPk(req.params.id);
  
  var resultado = await atualizar.update(req.body);
  res.json(resultado);
});

app.delete("/autores/:id", async function(req, res){
  const deletar = await autor.findByPk(req.params.id);
  deletar.destroy();
});

app.get("/autores/:id/livros", async function(req, res){
  const resultado = await autor.findByPk(req.params.id, {include: "livros"});
  res.json(resultado.livros)
});

app.listen(3000, function(){
  console.log("Server it's ok!")
});