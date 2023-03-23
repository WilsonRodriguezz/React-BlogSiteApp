//EXPORT CONTROLLERS CODE TO AUTH ROUTER
import { db } from '../db.js';
//Import module to encrypt password
import bcrypt from 'bcryptjs';
//Import jsonwebtoken for login
import jwt from 'jsonwebtoken';

export const register = (req, res) => {
  //CHECK IF THERE'S AN EXISTING USER WITH THOSE CREDENTIALS
  const fQuery = 'SELECT * FROM user WHERE email = ? OR username = ?';
  db.query(fQuery, [req.body.email, req.body.name], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length) {
      return res.status(409).json('User already exists');
    }

    //if there's any user with those credentials already register, we proceed to create a new user
    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    //INSERT NEW USER TO USER TABLE
    const sQuery =
      'INSERT INTO user(`username`, `email`, `password`) VALUES(?)';
    const values = [req.body.username, req.body.email, hash];

    db.query(sQuery, [values], (err, data) => {
      if (err) {
        return res.json(err);
      }
      return res.status(200).json('User has been succesfully created.');
    });
  });
};

export const login = (req, res) => {
  //CHECK IF USER EXSITS
  const fQuery = 'SELECT * FROM user WHERE username = ?';
  db.query(fQuery, [req.body.username], (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length == 0) {
      return res.status(404).json('User not found');
    }

    //If user exists check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json('Wrong username or password');
    }

    //make the login with jwt
    const token = jwt.sign({ id: data[0].id }, 'jwtkey');
    const { password, ...other } = data[0];

    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json('User has been successfully logged out');
};
