const express = require('express'); // importa o framework express
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes'); // importa o arquivo routes

const server = express();

mongoose.connect('mongodb+srv://doliveira:doliveira@cluster0-f5thb.mongodb.net/my_database?retryWrites=true&w=majority',
  {useNewUrlParser: true}
); // conectando no banco

server.use(cors());
server.use(express.json()); // informa pro express que as requisicoes serao do tipo JSON
server.use(routes); // indica que vai usar as informacoes de routes

server.listen(3308);
