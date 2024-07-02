import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog , filterBlog } from '../controllers/blogController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/blogs', authMiddleware, createBlog);
router.get('/blogs', authMiddleware, getAllBlogs);
router.get('/blogs/:id', authMiddleware, getBlogById);
router.put('/blogs/:id', authMiddleware, updateBlog);
router.delete('/blogs/:id', authMiddleware, deleteBlog);
router.get('/blogsFilter', authMiddleware, filterBlog); 

export default router;
