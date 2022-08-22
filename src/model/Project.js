const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        host_link: {
            type: String,
        },
        technolgy: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }, { timestamps: true },
);


projectSchema.methods.toJSON=function(){
    const objects=this.toObject();
    delete objects.__v;
    return objects;
}

module.exports = mongoose.model('Project', projectSchema);
