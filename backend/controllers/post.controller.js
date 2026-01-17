import Post from '../models/post.model.js'
import Comment from "../models/comment.model.js"
import User from "../models/user.model.js"
import sharp from "sharp"
import cloudinary from "../utils/cloudinary.js"
import generateContent from '../utils/gemini.js'
// Actions related to the user
// export const LikePost = async (req, res) => {
//     try {
//         const userId = req.id;
//         const postId = req.params.id;
//         const post = await Post.findById(postId)
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found.', success: false });
//         }
//         await post.updateOne({ $addToSet: { likes: userId } })
//         await post.save();
//         return res.status(200).json({ message: 'Liked.', success: true });
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const DislikePost = async (req, res) => {
//     try {
//         const userId = req.id;
//         const postId = req.params.id;
//         const post = await Post.findById(postId)
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found.', success: false });
//         }
//         await post.updateOne({ $pull: { likes: userId } })
//         await post.save();
//         return res.status(200).json({ message: 'Disliked', success: true });
//     } catch (error) {
//         console.log(error);
//     }
// }
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
        return res.status(200).json({ message: 'Comment added.', success: true, comment });
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
        const posts = await Post.find().sort({ createdAt: -1 }).select("-password")
        if (posts.length === 0) {
            return res.status(200).json({ message: "Sorry no post exist.", success: false });
        }
        return res.status(200).json({ success: true, posts });
    } catch (error) {
        console.log(error);
    }
}
export const GetAllUsers = async (_, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ users: users.length, success: true })
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
        const comments = await Comment.find({ _id: post.comments }).sort({ createdAt: -1 }).populate({ path: "user", select: 'profilePicture username' })
        return res.status(200).json({ success: true, comments });
    } catch (error) {
        console.log(error);
    }
}
export const GetLatestComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }).populate({ path: "user", select: 'profilePicture username' })
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

        const { title, content, category, isPublished, subTitle } = req.body;
        const image = req.file;

        if (!title || !content || !category || !isPublished) {
            console.log("Missing fields:", {
                title: !title,
                content: !content,
                category: !category,
                isPublished: !isPublished,
                image: !image
            });
            return res.status(400).json({
                message: 'Check every field.',
                success: false
            });
        }

        if (!image || !image.buffer) {
            return res.status(400).json({
                message: 'Image is required.',
                success: false
            });
        }

        const optimizedImage = await sharp(image.buffer)
            .resize(1200, 800, { fit: 'inside' })
            .toFormat('jpeg', { quality: 90 })
            .toBuffer();

        const dataUri = `data:image/jpeg;base64,${optimizedImage.toString('base64')}`;

        const cloudResponse = await cloudinary.uploader.upload(dataUri, {
            folder: 'blog-posts'
        });

        if (cloudResponse) {
            const post = await Post.create({
                title,
                subTitle: subTitle || '',
                image: cloudResponse.secure_url,
                content,
                category,
                isPublished: isPublished === 'true' || isPublished === true
            });

            return res.status(201).json({
                message: "Post added successfully.",
                success: true,
                post
            });
        }

    } catch (error) {
        console.log("Backend error:", error);
        return res.status(500).json({
            message: error.message || 'Internal server error',
            success: false
        });
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
        await post.updateOne({ isPublished: false })
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
        await Comment.deleteMany({ _id: post.comments })
        return res.status(200).json({ message: "Post deleted.", success: true });
    } catch (error) {
        console.log(error);
    }
}
// export const DeleteComment = async (req, res) => {
//     try {
//         const commentId = req.params.id;
//         const comment = await Comment.findById(commentId)
//         if (!comment) {
//             return res.status(404).json({ message: 'Comment not found.', success: false });
//         }
//         await Post.findByIdAndDelete(comment)
//         return res.status(200).json({ message: "Comment deleted.", success: true });
//     } catch (error) {
//         console.log(error);
//     }
// }
// generate content

export const GenerateContent = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required.", success: false });
        }
        const content = await generateContent(title)
        return res.status(200).json({ success: true, content });
    } catch (error) {
        console.log(error);
    }
}