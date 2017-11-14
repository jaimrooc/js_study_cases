const mongoose = require('mongoose'), Schema = mongoose.Schema;

bookSchema = new Schema({
    titulo: { type: String, required: "Obligatorio"},
    autor: { type: String, required: "Obligatorio"},
    pagina: { type: Number, required: "Obligatorio", min: 1, max: 1000 },
    precio: { type: Number, required: "Obligatorio", min: 0, max: 100000 }
});

bookSchema.virtual("bookInc").get(() => {
    return "Titulo: " + this.titulo;
    return "Autor: " + this.autor;
    return "Pagina: " + this.pagina;
    return "Precio: " + this.precio;
}).set((bookInc) => {
    this.titulo = bookInc.titulo;
    this.autor = bookInc.autor;
    this.pagina = bookInc.pagina;
    this.precio = bookInc.precio;
});

Books = mongoose.model('book', bookSchema);

module.exports = Books;