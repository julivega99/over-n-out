const mongoose = require('mongoose');
const Schema = mongoose.Schema

const searchSchema = new Schema({
    hash: {
        type: String,
        required: [true, 'Hash is required']
    },
    data: {
        type: String,
        default: ""
    }
});

const Search = mongoose.model("SearchesDB", searchSchema);

module.exports = Search;