const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: String,
    description: String,
    priority: String,
    authorId: {
        ref: "User",
        type: Schema.Types.ObjectId
    },
    dueDate: String
}, {
    timestamps: true
});

module.exports = model('Task', taskSchema);