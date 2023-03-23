import express from 'express';
//import controllers
import {
  addPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from '../controllers/post.js';

const router = express.Router();

//GET REQUEST IN '/test' route
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router;
