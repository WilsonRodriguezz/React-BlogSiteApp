import React, { useContext, useEffect, useState } from 'react';
//Import photos
import Photo from '../img/retrato1.jpeg';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
//import link functionality
import { Link, useLocation, useNavigate } from 'react-router-dom';
//import menu
import Menu from '../partials/Menu';
//import axios
import axios from 'axios';
//import moment
import moment from 'moment';
//import context
import { AuthContext } from '../context/authContext';
//import solution for <p> tags text
import DOMPurify from 'dompurify';

const Single = () => {
  //use state method to fetch information in the database to a post object
  const [post, setPost] = useState({});

  //get location path
  const location = useLocation();

  //get post ID from the path location
  const postId = location.pathname.split('/')[2];

  //Insert navigate function
  const navigate = useNavigate();

  //get user credentials of the session
  const { currentUser } = useContext(AuthContext);

  //Get post info
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  //Delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8800/api/posts/${postId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  //get Text
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent;
  };

  return (
    <div className="single">
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          {post.image && <img src={post.image} alt="" />}
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
};

export default Single;
