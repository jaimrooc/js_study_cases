var mongoose = require('mongoose');
var Book = require('../model/book');
let bodyParser = require('body-parser');
var Promise = require('mpromise');

module.exports.controller = function (app) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.get('/books', function (req, res) {
        Book.find({}, (err, docs) => {
            res.render('pages/parameters.ejs', {
                book: null,
                books: docs
            });
        });

    });

    app.get('/parameter', function (req, res) {
        res.render('pages/parameter.ejs', {
            book: null,
        });
    });

    app.get('/parameter/:id', function (req, res) {
        Book.findById(req.params.id, (err, doc) => {
            console.log(doc);
            res.render('pages/parameter_edit.ejs', {
                book: doc
            });
        });
    });

    app.post('/parameter', function (req, res) {
        var parameter = new Book({ 
            titulo: req.body.titulo,
            autor: req.body.autor,
            pagina: req.body.pagina,
            precio : req.body.precio
        });
        var promise = parameter.save();
        promise.onResolve(function (err) {
            if (err) {
                console.log(err.message); // mensajes de error
                res.render('pages/parameter.ejs', {
                    error: err.message
                });
            }
            Book.find({}, (err, docs) => {
                res.render('pages/parameters.ejs', {
                    book: parameter.get("bookInc"),
                    books: docs
                });
            });
        });
    });

    app.put('/parameter/:id', function (req, res) {
        console.log(req.params.id);
        Book.findById(req.params.id, (err, doc) => {
            doc.titulo = req.body.titulo;
            doc.autor = req.body.autor;
            doc.precio = req.body.precio;
            doc.pagina = req.body.pagina;
            var promise = doc.save();
            promise.onResolve(function (err) {
                if (err) {
                    console.log(err.message); // mensajes de error
                    res.render('pages/parameter_edit.ejs', {
                        error: err.message,
                        book: doc
                    });
                }
                Book.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        parameter: doc.get("parameterInc"),
                        parameters: docs
                    });
                });
            });
        });
    });

    app.post('/parameter/:id', function (req, res) {
        Book.findById(req.params.id, (err, doc) => {
            doc.titulo = req.body.titulo;
            doc.autor = req.body.autor;
            doc.precio = req.body.precio;
            doc.pagina = req.body.pagina;
            var promise = doc.save();
            promise.onResolve(function (err) {
                if (err) {
                    console.log(err.message); // mensajes de error
                    res.render('pages/parameter_edit.ejs', {
                        error: err.message,
                        book: doc
                    });
                }
                Book.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        book: doc.get("bookInc"),
                        books: docs
                    });
                });
            });
        });
    });

    app.get('/parameter/delete/:id', function (req, res) {
        Book.remove({ _id: req.params.id }, function (err) {
            console.log(req.params.id);
            if (!err) {
                Book.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        book: null,
                        books: docs
                    });
                });
            }
            else {
                message.type = 'error';
            }
        });
    });

}
