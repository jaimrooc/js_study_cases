
module.exports.controller = function (app) {

    /**
     * a home page route
     */
    app.get('/', function (req, res) {
        res.render('pages/index');
    });
}
