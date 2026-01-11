import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subTitle: { type: String, default: '' },
    image: { type: String, required: true, },
    content: { type: String, required: true },
    category: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true })

export default mongoose.model('Post', postSchema)