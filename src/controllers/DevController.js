const axios = require('axios'); // importa o axios
const Dev = require('../models/Devs'); // importa o model para ter informacoes do banco

module.exports = {

    async index(req,res) {
        const { user } = req.headers; // usuario que foi passado via header
        const loggedDev = await Dev.findById(user); // pega as informacoes desse user no banco

        const user = await Dev.find({
            $and: [
                { _id: { $ne: user }}, // ne = not equal
                { _id: { $nin: loggedDev.likes } }, // nin = not int
                { _id: { $nin: loggedDev.dislikes } }
            ]
        });
    },

    // metodo store
    async store(req, res) { // funcao assincrona, precisa de um await ao chamar o axios
        const { username } = req.body; // criar um objeto contendo o dado "username" enviado na requisicao

        // verifica se ja existe um usuario com o username desejado
        const userExists = await Dev.findOne({ user : username });

        // se existir, retorna esse usuário e sai da funcao
        if ( userExists ) {
            return res.json(userExists);
        }

        // const response = axios.get('https://api.github.com/users/diego3g'); // faz uma requisicao a API do github
        const response = await axios.get(`https://api.github.com/users/${username}`); // faz uma requisicao a API do github passando o username

        // response.data = contem a informacao retornada pela API

        // const { name, bio, avatar_url} = response.data; // resgata o valor criando uma desestruturacao {}, permitindo criar variaveis com os dados
        const { name, bio, avatar_url: avatar} = response.data; // resgata o dado avatar_url e renomeia para avatar

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        }); // cria uma var dev contendo o retorno de Dev.create

        // return res.json({ ok: true});
        // return res.json(response.data); // data = onde contem o retorno da resposta
        return res.json(dev);
    }
}