const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
    user_name: String,
    user_password: String,
    First_name: String,
    Last_name: String,
    Age: {
        type: Number,
        min: [12, 'Too Young to Register.'],
        max: 99
    }
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    versionKey: false
});

Users.virtual('Fullname').get(function () {
    // console.log(this)
    return `${this.First_name} ${this.Last_name}`;
})
// .set((data) => {
//     this.Fullname = data
// })



// const Products = new Schema({

// });

module.exports = mongoose.model('Users', Users);