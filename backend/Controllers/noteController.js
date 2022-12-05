
const User = require("../models/user");
const Ticket = require("../models/ticket");
const Note = require('../models/note');


// @desc Get notes for a Ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
  //get user using the id in the jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if(ticket.user.toString() !== req.user.id ) {
    res.status(401)
    throw new Error('User Not Authorised')
  }

  const notes = await Note.find({ticket: req.params.ticketId})
  res.status(200).json(notes);
});

// @desc create note for a Ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const createNote = asyncHandler(async (req, res) => {
    //get user using the id in the jwt
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = await Ticket.findById(req.params.ticketId);


  
    if(ticket.user.toString() !== req.user.id ) {
      res.status(401)
      throw new Error('User Not Authorised')
    }
  
    const note = await Note.create({
        isStaff: false,
        user: req.user.id,
        text: req.body.text,
        ticket: req.params.ticketId
    })
    res.status(200).json(note);
  });

module.exports = {
    getNotes,
    createNote
}
