import React, { useContext, useState } from 'react';
//import link functionality
import { Link, useNavigate } from 'react-router-dom';
//import axios
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {
  //Communication with BACKEND
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });

  //const to catch error
  const [err, SetError] = useState(null);

  //This navigae const is used to send users to login after they get registered
  const navigate = useNavigate();

  //Use context from index.js to determine which user is logged
  const { login } = useContext(AuthContext);

  //Store data in variables
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate('/');
    } catch (err) {
      SetError(err.response.data);
    }
  };

  console.log(inputs);

  return (
    <div className="auth">
      <h1>Login</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Login</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register here</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
