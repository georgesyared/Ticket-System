const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    // make relation between user and ticket
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: {
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone','MacBook Pro','iMac','iPad'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description of the issue'],
    },
    status: {
        type: String,
        required: true,
        enum: ['new','open','closed'],
        default: 'new',
    },
},
{
    timestamp: true,
}
)

module.exports = mongoose.model('Ticket', ticketSchema);