const Dev = require('../models/Devs');

module.exports = {
    async store(req, res) {
        const { user } = req.headers; // pega o dado passado no header (quem esta dando o like)
        const { devId } = req.params; // pega o parametro passado na url (quem esta recebendo o like)

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if ( !targetDev ) {
            return res.status(400).json({error: "Dev not exists"}); // retorna 400 bad request porque n encontrou o usuario
        }

        // caso o usuario que esta dando like tenha recebido like do usuario a qual ele esta dando like
        if ( targetDev.likes.includes(loggedDev._id) ) {
            console.log("Deu Match!");
        }

        loggedDev.likes.push(targetDev._id); // da um push (insere mais um) na propriedade (campo) likes (que eh um array)
        await loggedDev.save(); // salva a info no banco

        return res.json({ loggedDev });

    }
};