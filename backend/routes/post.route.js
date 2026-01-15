import express from 'express'
// authentication
import isUserAuthenticated from '../middlewares/isUserAuthenticated.js';
import isAdminAuthenticated from '../middlewares/isAdminAuthenticated.js';
// post controllers
import { AddComment, AddNewPost, GenerateContent, GetAllPosts, GetAllUsers, GetCommentsOfPost, GetPost } from '../controllers/post.controller.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

// routes
router.route('/allposts').get(GetAllPosts)
router.route('/allusers').get(GetAllUsers)
router.route('/:id/post').get(GetPost)
router.route('/:id/comments').get(GetCommentsOfPost)
// auth user related routes
router.route("/:id/addcomment").post(isUserAuthenticated, AddComment)

// admin related routes
router.route('/addpost').post(isAdminAuthenticated, upload.single('image'), AddNewPost)


// generate content 
router.route('/generatecontent').post(GenerateContent)

export default router;