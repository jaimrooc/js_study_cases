
module.exports.controller = function (app) {

    /**
     * languages route
     */
    app.get('/languages', function (req, res) {
        languages = [{firstLetter:"M", name: "Mongoose"},{firstLetter:"E", name: "Express"},{firstLetter:"A", name: "Angular"},{firstLetter:"N", name: "NodeJS"}];
        res.render('pages/languages.ejs', {
            languages: this.languages
        });
    });
}
