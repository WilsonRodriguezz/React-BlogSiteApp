import React, { useState } from 'react';
//import libraries
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import axios
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';

const Write = () => {
  //pick state of the post
  const state = useLocation().state;

  //Use function from the library
  const [value, setValue] = useState(state?.value || '');
  const [title, setTitle] = useState(state?.title || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate();

  //upload image function

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(
        'http://localhost:8800/api/upload',
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  //submit function
  const handleCLick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`http://localhost:8800/api/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
          })
        : await axios.post(`http://localhost:8800/api/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : '',
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          });

      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input
            type="file"
            name=""
            id="file"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="file">
            Upload Image
          </label>
          <div className="button">
            <button>Save as a draft</button>
            <button onClick={handleCLick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'life'}
              name="cat"
              value="life"
              id="life"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="life">Life</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'science'}
              name="cat"
              value="science"
              id="science"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'technology'}
              name="cat"
              value="technology"
              id="technology"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'cinema'}
              name="cat"
              value="cinema"
              id="cinema"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'sports'}
              name="cat"
              value="sports"
              id="sports"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="sports">Sports</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'food'}
              name="cat"
              value="food"
              id="food"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="cat">
            <input
              type="radio"
              checked={cat === 'health'}
              name="cat"
              value="health"
              id="health"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="health">Health</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
