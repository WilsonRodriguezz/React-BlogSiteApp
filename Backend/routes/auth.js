//Import express
import express from 'express';
//SAVE express.Router() in a variable
const router = express.Router();
//IMPORT CONTROLLERS FROM CONTROLLERS/AUTH
import { register } from '../controllers/auth.js';
import { login } from '../controllers/auth.js';
import { logout } from '../controllers/auth.js';

//Perform operations and export to index.js
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

/*get request to test api

router.get('/login', (req, res) => {
  res.json('login test');
});

router.get('/register', (req, res) => {
  res.json('register test');
});*/

export default router;
