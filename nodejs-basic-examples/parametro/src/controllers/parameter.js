var mongoose = require('mongoose');
var Parameter = require('../models/parameter');
let bodyParser = require('body-parser');
var Promise = require('mpromise');

module.exports.controller = function (app) {

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.get('/parameters', function (req, res) {
        Parameter.find({}, (err, docs) => {
            res.render('pages/parameters.ejs', {
                parameter: null,
                parameters: docs
            });
        });

    });

    app.get('/parameter', function (req, res) {
        res.render('pages/parameter.ejs', {
            parameter: null,
        });
    });

    app.get('/parameter/:id', function (req, res) {
        Parameter.findById(req.params.id, (err, doc) => {
            console.log(doc);
            res.render('pages/parameter_edit.ejs', {
                parameter: doc
            });
        });
    });

    app.post('/parameter', function (req, res) {
        console.log(req.body.parameter.parameter);
        var parameter = new Parameter({ parameter: req.body.parameter, parameterInc: req.body.parameter });
        var promise = parameter.save();
        promise.onResolve(function (err) {
            if (err) {
                console.log(err.message); // mensajes de error
                res.render('pages/parameter.ejs', {
                    error: err.message
                });
            }
            Parameter.find({}, (err, docs) => {
                res.render('pages/parameters.ejs', {
                    parameter: parameter.get("parameterInc"),
                    parameters: docs
                });
            });
        });
    });

    app.put('/parameter/:id', function (req, res) {
        console.log(req.params.id);
        Parameter.findById(req.params.id, (err, doc) => {
            doc.parameter = req.body.parameter;
            var promise = doc.save();
            promise.onResolve(function (err) {
                if (err) {
                    console.log(err.message); // mensajes de error
                    res.render('pages/parameter_edit.ejs', {
                        error: err.message,
                        parameter: doc
                    });
                }
                Parameter.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        parameter: doc.get("parameterInc"),
                        parameters: docs
                    });
                });
            });
        });
    });

    app.post('/parameter/:id', function (req, res) {
        Parameter.findById(req.params.id, (err, doc) => {
            doc.parameter = req.body.parameter;
            var promise = doc.save();
            promise.onResolve(function (err) {
                if (err) {
                    console.log(err.message); // mensajes de error
                    res.render('pages/parameter_edit.ejs', {
                        error: err.message,
                        parameter: doc
                    });
                }
                Parameter.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        parameter: doc.get("parameterInc"),
                        parameters: docs
                    });
                });
            });
        });
    });

    app.get('/parameter/delete/:id', function (req, res) {
        Parameter.remove({ _id: req.params.id }, function (err) {
            console.log(req.params.id);
            if (!err) {
                Parameter.find({}, (err, docs) => {
                    res.render('pages/parameters.ejs', {
                        parameter: null,
                        parameters: docs
                    });
                });
            }
            else {
                message.type = 'error';
            }
        });
    });

}
