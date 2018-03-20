const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    room: {
        type: String,
        unique:true,
        required: [true, 'The Room is required']
    },
    users: {
        type: [String],
        default:[]
    },
    created_by: {
        type: String,
        required: [true, 'Creator is required']
    },
    messageHistory: {
        type: [],
        default: []
    }
    // messageHistory: [{
    //     original_text:String,
    //     original_language:String,
    //     text:String,
    //     language:String,
    //     created_by:String,
    //     time:Date,
    // }]
}, { 
    timestamps: true,
    toJSON: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    }
 });

 const Chat = mongoose.model('Chat', chatSchema);
 module.exports = Chat;