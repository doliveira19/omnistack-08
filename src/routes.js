const express = require('express');
const DevController = require('./controllers/DevController'); // importa o controlador (MVC) de devs
const LikeController = require('./controllers/LikeController'); // importa o controlador (MVC) de likes
const DislikeController = require('./controllers/DislikeController'); // importa o controlador (MVC) de likes

const routes = express.Router();

// GET - retornar
// POST - enviar
// PUT - editar
// DELETE - deletar

// req - os dados da requisicao (ex: localhost:333?nome=daniel)
// res - resposta que sera enviada a quem fez a requisicao

/*
server.get('/', (req, res) => {
  // return res.send('Hello React'); // retorna um texto qualquer
  // return res.send(`Hello ${req.query.name}`); // exibe (retorna) o parametro passado na URL (o nome do parametro eh name)
  return res.json({ message: `Hello ${req.query.name}`}); // exibe (retorna) o parametro passado na URL (o nome do parametro eh name)
});
*/

// GET
/*
routes.get('/', (req, res) => {
  return res.json({ message: `Hello ${req.query.name}`}); // exibe (retorna) o parametro passado na URL (o nome do parametro eh name)
});
*/

// POST
/*
routes.post('/devs', (req, res) => {  
  // return res.json({ ok: true }); // retorna JSON
  return res.json(req.body);
});
*/

routes.get('/devs', DevController.index); // listar dev que o usuario n deu like ou dislike
routes.post('/devs', DevController.store); // cadastrar dev
routes.post('/devs/:devId/likes', LikeController.store); // dar like no dev
routes.post('/devs/:devId/dislikes', DislikeController.store); // dar dislike no dev

// exportar
module.exports = routes;