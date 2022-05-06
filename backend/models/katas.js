const mongoose = require('mongoose');
const { Schema } = mongoose;

const KataSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    solution: { type: String, required: true },
    Languages: { type: String, require: true },
    exersiceResult: { type: Array },
    participants: { type: Array },
    creator: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
});

module.exports = mongoose.model('Kata', KataSchema);