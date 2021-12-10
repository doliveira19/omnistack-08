const { Schema, model } = require('mongoose'); // importa Schema e model do mongoose

const DevSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    user : {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [{
      type: Schema.Types.ObjectId, // o id da tabela Dev da pessoa que foi dado o like
      ref: 'Dev' // de onde vira a referencia
    }],
    dislikes: [{
      type: Schema.Types.ObjectId, // o id da tabela Dev da pessoa que foi dado o dislike
      ref: 'Dev' // de onde vira a referencia
    }]
},{    
  timestamps: true // indica que serao criados os campos createdAt (hora de criacao)
                   // e updatedAt (hora de atualizacao) automaticamente
});

module.exports = model('Dev', DevSchema); // exporta o model de DevSchema com o nome de Dev