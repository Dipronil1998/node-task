const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        comments: {
            type: String,
        },
        assigned_to: {
            type: String,
        },
        dead_line: {
            type: Date
        },
        project: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Project'
        }
    }, { timestamps: true },
);

taskSchema.methods.toJSON=function(){
    const objects=this.toObject();
    delete objects.__v;
    return objects;
}

module.exports = mongoose.model('Task', taskSchema);
