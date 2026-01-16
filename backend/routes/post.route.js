import express from 'express'
// authentication
import isUserAuthenticated from '../middlewares/isUserAuthenticated.js';
import isAdminAuthenticated from '../middlewares/isAdminAuthenticated.js';
// post controllers
import { AddComment, AddNewPost, DeletePost, GenerateContent, GetAllPosts, GetAllUsers, GetCommentsOfPost, GetLatestComments, GetPost, Publish, Unpublish } from '../controllers/post.controller.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

// routes
router.route('/allposts').get(GetAllPosts)
router.route('/allusers').get(GetAllUsers)
router.route('/allcomments').get(GetLatestComments)

router.route('/:id/post').get(GetPost)
router.route('/:id/comments').get(GetCommentsOfPost)
// auth user related routes
router.route("/:id/addcomment").post(isUserAuthenticated, AddComment)

// admin related routes
router.route('/addpost').post(isAdminAuthenticated, upload.single('image'), AddNewPost)
router.route('/:id/publish').get(isAdminAuthenticated, Publish)
router.route('/:id/unpublish').get(isAdminAuthenticated, Unpublish)
router.route('/:id/delete').get(isAdminAuthenticated, DeletePost)

// generate content 
router.route('/generatecontent').post(GenerateContent)

export default router;