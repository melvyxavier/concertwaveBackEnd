//import(logic functions)
const express = require('express')
const { adminLogin, addConcert, getConcerts, editConcert, deleteConcert, getConcertbyId,
    userSignup, userLogin, ticketbook, getUsers, deleteUser,cancelbooking, bookedTickets,} = require('../controllers/logic')

//router object
const router = new express.Router()


router.post('/admin-login', adminLogin)

router.post('/admin/add-concert', addConcert)

router.get('/concerts-access', getConcerts)

router.put('/concert-edit/:id', editConcert)

router.delete('/concert-delete/:id', deleteConcert)

router.get('/concert-single/:id', getConcertbyId)

router.post('/user-signup', userSignup)

router.post('/user-login', userLogin)

router.post('/bookingdata', ticketbook)

router.get('/user-access', getUsers)

router.delete('/user-delete/:_id', deleteUser)

router.get('/booked-list/:userId', bookedTickets)

router.delete('/cancelbooking/:_id', cancelbooking)














//export router
module.exports = router 