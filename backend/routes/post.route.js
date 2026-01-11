import express from 'express'
// authentication
import isUserAuthenticated from '../middlewares/isUserAuthenticated.js';
import isAdminAuthenticated from '../middlewares/isAdminAuthenticated.js';
// post controllers
import { AddNewPost, GetAllPosts } from '../controllers/post.controller.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

// routes
router.route('/allposts').get(GetAllPosts)

// admin related routes
router.route('/addpost').post(isAdminAuthenticated, upload.single('image'), AddNewPost)

export default router;