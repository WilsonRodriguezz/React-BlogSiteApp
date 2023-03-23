//IMPORT DATABASE
import { db } from '../db.js';
//import json Web Token to verify user
import jwt from 'jsonwebtoken';

//Export functions to router
export const getPosts = (req, res) => {
  //Check if there's a category linked in the domain
  const fQuery = req.query.cat
    ? 'SELECT * FROM posts WHERE cat =  ? ORDER BY `date` DESC'
    : 'SELECT * FROM posts ORDER BY `date` DESC';
  //Perform a query based on category or null category
  db.query(fQuery, [req.query.cat], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const fQuery =
    'SELECT p.id, `username`, `title`, `desc`, p.img, u.image, `cat`, `date` FROM user u JOIN posts p ON u.id = p.uid WHERE p.id = ?';
  db.query(fQuery, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json('You are not authenticated to perform this operation!');
  }

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) {
      return res.status(403).json('Authentication is not valid');
    }

    const fQuery =
      'INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)';

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];
    db.query(fQuery, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Post has been successfully created.');
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json('You are not authenticated to perform this operation!');
  }

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) {
      return res.status(403).json('Authentication is not valid');
    }

    const postId = req.params.id;
    //Query to delete post
    const fQuery = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?';
    db.query(fQuery, [postId, userInfo.id], (err, data) => {
      if (err) {
        return res.status(403).json('You can delete only your own posts!');
      }

      return res.json('Post has been deleted');
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(401)
      .json('You are not authenticated to perform this operation!');
  }

  jwt.verify(token, 'jwtkey', (err, userInfo) => {
    if (err) {
      return res.status(403).json('Authentication is not valid');
    }

    const postId = req.params.id;

    const fQuery =
      'UPDATE posts SET `title`=? , `desc`=?, `img`=? , `cat`=? WHERE `id`=? AND `uid` = ?';

    const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];
    db.query(fQuery, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json('Post has been successfully updated.');
    });
  });
};
