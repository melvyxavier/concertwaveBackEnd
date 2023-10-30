//import mongoose
const mongoose = require('mongoose')



// admin-------------------------------------------------------------------

//define schema
const adminSchema = new mongoose.Schema(
    {
        uname: String,
        psw: String
    }
)

//model - collectionName

const admins = new mongoose.model("admins", adminSchema)

// concerts--------------------------------------------------------------------

const concertSchema = new mongoose.Schema(

    {
        Cname: String,
        categoryId: Number,
        venue: String,
        dateTime: String,
        image: String,
        price: Number

    }

)


const concerts = new mongoose.model("concerts", concertSchema)

// ----------------------------------------------------------------------------------------

//user
const userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    psw: String
})

const users = new mongoose.model("users", userSchema)

// --------------------------------------------------------------------------------------------

//Ticket
const ticketSchema = new mongoose.Schema({
    userId: String,
    cId: String,
    Cname: String,
    venue: String,
    image: String,
    dateTime: String,


})

const tickets = new mongoose.model("tickets", ticketSchema);

// --------------------------------------------------------------------------------------------


module.exports = { admins, concerts, users, tickets }