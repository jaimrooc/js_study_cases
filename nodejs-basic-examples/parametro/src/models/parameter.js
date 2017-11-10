const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

parameterSchema = new Schema({
    parameter: { type: String, required: "parametro obligatorio", minlength: [3, "Parámetro muy corto"] }
});

parameterSchema.virtual("parameterInc").get(() => {
    return "Nombre: " + this.parameter;
}).set((parameterInc) => {
    this.parameter = parameterInc + ".";
});

Parameter = mongoose.model('parameter', parameterSchema);

module.exports = Parameter;