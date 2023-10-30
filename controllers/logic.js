const { json } = require("express")
const { admins, concerts, users, tickets } = require('../models/collections')

const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    admins.findOne({ uname, psw })
        .then(admin => {
            if (admin) {
                res.status(200).json({
                    message: "Login Successful :)",
                    status: true,
                    statusCode: 200,
                    admin: admin.uname
                })
            } else {
                res.status(404).json({
                    message: "Please Enter Valid Login Details",
                    status: false,
                    statusCode: 404
                })
            }
        })
        .catch(err => {
            console.error("Database query error:", err)
            res.status(500).json({
                message: "Internal Server Error",
                status: false,
                statusCode: 500
            })
        })
}

// ------------------------------------------------------------------

const addConcert = (req, res) => {
    const { Cname, categoryId, dateTime, venue, price, image } = req.body
    const newConcert = new concerts({
        Cname, categoryId, dateTime, venue, price, image
    })
    newConcert.save()
    res.status(200).json({
        message: "New Concert Added!",
        status: true,
        statusCode: 200
    })

}

// --------------------------------------------------------------------

const getConcerts = (req, res) => {

    concerts.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200

            })
        }
    })
}

// -------------------------------------------------------------

const editConcert = (req, res) => {
    const { id } = req.params
    const { Cname, categoryId, dateTime, venue, price, image } = req.body
    concerts.findOne({ _id: id }).then(cdata => {
        if (cdata) {
            cdata.Cname = Cname
            cdata.categoryId = categoryId
            cdata.dateTime = dateTime
            cdata.venue = venue
            cdata.price = price
            cdata.image = image

            cdata.save()
            res.status(200).json({
                message: "Concert edited successfully",
                status: true,
                statusCode: 200
            })
        }
    })
}

// ----------------------------------------------------------------

const deleteConcert = (req, res) => {
    const { id } = req.params
    concerts.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "Concert Deleted",
            status: true,
            statusCode: 200
        })
    })
}

// -----------------------------------------------------------------

const getConcertbyId = (req, res) => {
    const { id } = req.params
    concerts.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                statusCode: 200,
                status: true
            })
        }
        else {
            res.status(404).json({
                message: "Concert not found",
                statusCode: 404,
                status: false
            })
        }
    })
}


// --------------------------------------------------------------------

const userSignup = (req, res) => {
    const { userName, email, psw } = req.body
    users.findOne({ email }).then(user => {
        if (user) {
            res.status(404).json({
                message: "User already exists",
                status: false,
                statusCode: 404
            })
        }
        else {

            newUser = new users({
                userName, email, psw
            })
            newUser.save()
            res.status(200).json({
                message: 'SignUp Successful :)',
                statusCode: 200,
                status: true
            })
        }
    })
}

// -----------------------------------------------------------------------

const userLogin = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "Login successful :)",
                status: true,
                statusCode: 200,
                currentUser: user.userName,
                _id: user._id

            })
        }
        else {
            res.status(404).json({
                message: "Incorrect! Please make sure you have already signed up.",
                status: false,
                statusCode: 404
            })
        }
    })
}

// ------------------------------------------------------------------------------

const ticketbook = (req, res) => {
    const { userId, cId } = req.body;

    tickets.findOne({ userId, cId }).then(existingTicket => {
        if (existingTicket) {
            res.status(400).json({
                message: "You have already booked a ticket for this concert.",
                statusCode: 400,
                status: false
            });
        } else {
            concerts.findOne({ _id: cId }).then(concert => {
                if (concert) {
                    const newTicket = new tickets({
                        userId,
                        cId,
                        Cname: concert.Cname,
                        image: concert.image,
                        venue: concert.venue,
                        dateTime: concert.dateTime
                    });

                    newTicket.save().then(() => {
                        res.status(200).json({
                            message: "Ticket Booked! Enjoy the concert :)",
                            statusCode: 200,
                            status: true
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: "Error booking the ticket",
                            statusCode: 500,
                            status: false
                        });
                    });
                } else {
                    res.status(404).json({
                        message: "Concert not found",
                        statusCode: 404,
                        status: false
                    });
                }
            });
        }
    });
};

// -----------------------------------------------

const getUsers = (req, res) => {

    users.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200

            })
        }
    })
}
// ------------------------------------------------

const deleteUser = (req, res) => {
    const { _id } = req.params
    users.deleteOne({ _id }).then(data => {
        tickets.deleteMany({ userId: _id }).then(data => {

            res.status(200).json({
                message: "User Deleted",
                status: true,
                statusCode: 200
            })
        })
    })

}

// ----------------------------------------------

const bookedTickets = (req, res) => {
    const { userId } = req.params;
    tickets.find({ userId }).then(concerts => {
        if (concerts && concerts.length > 0) {
            res.status(200).json({
                message: concerts,
                statusCode: 200,
                status: true
            });
        } else {
            res.status(404).json({
                message: 'No booked tickets found',
                statusCode: 404,
                status: false
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Internal server error',
            statusCode: 500,
            status: false
        });
    });
};

// ---------------------------------------------

const cancelbooking = (req, res) => {
    const { _id } = req.params
    tickets.deleteOne({ _id }).then(data => {
        res.status(200).json({
            message: "Your booking has been cancelled. Check your email for further confirmation :(",
            statusCode: 200,
            status: true
        })
    })
}


module.exports = {
    adminLogin, addConcert, getConcerts, editConcert, deleteConcert, getConcertbyId, userSignup,
    userLogin, ticketbook, getUsers, deleteUser, cancelbooking, bookedTickets
}
