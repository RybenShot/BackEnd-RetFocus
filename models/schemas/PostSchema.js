const { Schema } = require("mongoose")

let postSchema = new Schema({
  author:{
   type: Schema.Types.ObjectId, ref: 'users'
} ,
  title: { type: String, required: true, minlength: 3, maxlength: 100 },
  url: { type: String, required: true, minlength: 3 },
  description:{ type: String, required: true, minlength: 3, maxlength: 100},
  image: { type: String, required: false },
  // tag: { type: String, required: false, enum: ['Drama', 'Terror', 'Comedia', 'Accion', 'Romance', 'Motivador', 'Gore', 'Tension', 'Ficcion'] },
  created_at: { type: Date, default: Date.now },
  Votes: { type: Number, default: 0 },
    // enabled: { type: Boolean, default: true },
    // comments: [
    //   {
    //     type: Schema.Types.ObjectId, ref: "comments"
    //   }
    // ]
});

module.exports = postSchema
