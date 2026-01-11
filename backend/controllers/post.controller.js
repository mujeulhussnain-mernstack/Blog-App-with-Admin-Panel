import Post from '../models/post.model.js'
import Comment from "../models/comment.model.js"
import sharp from "sharp"
import cloudinary from "../utils/cloudinary.js"
// Actions related to the user
export const LikePost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        await post.updateOne({ $addToSet: { likes: userId } })
        await post.save();
        return res.status(200).json({ message: 'Liked.', success: true });
    } catch (error) {
        console.log(error);
    }
}
export const DislikePost = async (req, res) => {
    try {
        const userId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        await post.updateOne({ $pull: { likes: userId } })
        await post.save();
        return res.status(200).json({ message: 'Disliked', success: true });
    } catch (error) {
        console.log(error);
    }
}
export const AddComment = async (req, res) => {
    try {
        const userId = req.id;
        const { text } = req.body;
        if (!text) {
            return res.status(401).json({ message: 'Comment required.', success: false });
        }
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        const comment = await Comment.create({
            text,
            user: userId
        })
        await comment.populate({ path: 'user', select: 'username, profilePicture' })
        await comment.save();
        await post.comments.push(comment._id)
        await post.save();
        return res.status(200).json({ message: 'Comment added.', success: true });
    } catch (error) {
        console.log(error);
    }
}
export const GetPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId).populate({ path: 'comments', sort: { createdAt: -1 }, populate: { path: 'user', select: 'username, profilePicture' } })
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        return res.status(200).json({ success: true, post });
    } catch (error) {
        console.log(error);
    }
}
// Basic Actions
// get all posts
// get comments of posts
export const GetAllPosts = async (_, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).select("title, image, likes, category")
        if (posts.length === 0) {
            return res.status(200).json({ message: "Sorry no post exist.", success: false });
        }
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        console.log(error);
    }
}
export const GetCommentsOfPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        const comments = await Comment.find({ _id: post._id })
        if (comments.length === 0) {
            return res.status(200).json({ message: "Sorry this post has no comments.", success: false });
        }
        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
    }
}
// Admin's Actions
// add new post
// publish or unpublish post
// delete post
// delete comment
export const AddNewPost = async (req, res) => {
    try {
        const { title, content, category, isPublished } = req.body;
        const { image } = req.file;
        if (!title || !image || !content || !category || !isPublished) {
            return res.status(401).json({ message: 'Check every field.', success: false });
        }
        const optimizedImage = await sharp(image.buffer).toFormat('jpeg', { quality: 90 }).toBuffer();
        const dataUri = `data:image/jpeg;base64,${optimizedImage.toString('base64')}`
        const cloudResponse = await cloudinary.uploader.upload(dataUri)
        if (cloudResponse) {
            const post = await Post.create({
                title,
                subTitle,
                image: (await cloudResponse)?.secure_url,
                content,
                category,
                isPublished
            })
            return res.status(201).json({ message: "Post added.", success: true, post });
        }
    } catch (error) {
        console.log(error);
    }
}
export const Publish = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        await post.updateOne({ isPublished: true })
        await post.save();
        return res.status(200).json({ message: "Published.", success: true });
    } catch (error) {
        console.log(error);
    }
}
export const Unpublish = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        await post.updateOne({ isPublished: true })
        await post.save();
        return res.status(200).json({ message: "Unpublished.", success: true });
    } catch (error) {
        console.log(error);
    }
}
export const DeletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: 'Post not found.', success: false });
        }
        await Post.findByIdAndDelete(postId)
        await Comment.deleteMany({ _id: postId })
        return res.status(200).json({ message: "Post deleted.", success: true });
    } catch (error) {
        console.log(error);
    }
}
export const DeleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;
        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found.', success: false });
        }
        await Post.findByIdAndDelete(comment)
        return res.status(200).json({ message: "Comment deleted.", success: true });
    } catch (error) {
        console.log(error);
    }
}