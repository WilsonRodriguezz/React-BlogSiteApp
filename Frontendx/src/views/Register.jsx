import React, { useState } from 'react';
//import link functionality
import { Link, useNavigate } from 'react-router-dom';

//import axios modules
import axios from 'axios';

const Register = () => {
  //Communication with BACKEND
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });

  //const to catch error
  const [err, SetError] = useState(null);

  //This navigae const is used to send users to login after they get registered
  const navigate = useNavigate();

  //Store data in variables
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8800/api/auth/register', inputs);
      navigate('/login');
    } catch (err) {
      SetError(err.response.data);
    }
  };

  console.log(inputs);

  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="text"
          placeholder="email"
          name="email"
          onChange={handleChange}
        ></input>
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        ></input>
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Don't you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
