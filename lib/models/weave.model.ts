import mongoose from 'mongoose';

const weaveSchema = new mongoose.Schema({
    text: {type: String, required: true},
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId:{
        type: String
    },
    children: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Weave'
        }
    ]
});

const Weave = mongoose.models.Weave || mongoose.model('Weave', weaveSchema);

export default Weave;

