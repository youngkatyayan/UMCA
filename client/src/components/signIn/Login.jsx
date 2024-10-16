
import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './index.css';
import BackgroundImage from '../../assets/wallpaperflare.com_wallpaper4.jpg';
import Logo from '../../assets/logo.png';



const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    remember: false, // Set default to false
  });

  const [confirmPassword, setConfirmPassword] = useState(''); // Separate state for confirmation
  const [popUp, setPopup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    if (!popUp) {
      // Handle signup here if popUp is false
      if (loginData.password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      // You may want to add more signup logic here
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: name === 'remember' ? checked : value }));

    if (name === 'confirmPassword') {
      setConfirmPassword(value); // Update confirmation password
    }
  };

  return (
    <>
     {/* <img src={Logo} alt="Logo" style={{ width: '100%', height: 'auto' }} /> */}
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >

      {popUp ? (
        <div className="w-full max-w-md p-8 rounded-lg border border-white/50 bg-white/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-2xl mb-6 text-white font-semibold text-center">Login</h2>
            <div className="relative border-b-2 border-gray-300 mb-4">
              <input
                type="text"
                name="username"
                required
                value={loginData.username}
                placeholder='Enter your username'
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white py-2 focus:outline-none placeholder-white"
              />
            </div>
            <div className="relative border-b-2 border-gray-300 mb-6">
              <input
                type="password"
                name='password'
                required
                value={loginData.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className="w-full bg-transparent border-none outline-none text-white py-2 focus:outline-none placeholder-white"
              />
            </div>
            <div className="flex justify-between items-center text-white mb-8">
              <label htmlFor="remember" className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={loginData.remember}
                  onChange={handleChange}
                  className="hidden" // Hide the default checkbox
                />
                <span className="w-12 h-6 flex items-center bg-gray-400 rounded-full p-1 duration-300 ease-in-out">
                  <span
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${loginData.remember ? "translate-x-6 bg-blue-500" : "translate-x-0"
                      }`}
                  />
                </span>
                <p className="ml-2">Remember me</p>
              </label>
              <a onClick={() => setPopup(false)} href="#" className="text-gray-300 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="bg-white text-black font-semibold py-2 px-4 rounded-md border-2 border-transparent hover:bg-white/15 hover:text-white hover:border-white transition duration-300"
            >
              Log In
            </button>
            <div className="text-center mt-6 text-white">
              <p>Don't have an account? <a onClick={() => setPopup(false)} className="text-blue-600 hover:underline ">Register</a></p>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-lg border border-white/50 bg-white/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <h2 className="text-2xl mb-6 text-white font-semibold">SignUp</h2>
            <div className="relative border-b-2 border-gray-300 mb-4">
              <input
                type="text"
                name="username"
                required
                value={loginData.username}
                placeholder='Enter Username'
                onChange={handleChange}
                className="w-full bg-transparent border-none outline-none text-white py-2 focus:outline-none placeholder-white"
              />
            </div>
            <div className="relative border-b-2 border-gray-300 mb-6">
              <input
                type="password"
                name='password'
                required
                value={loginData.password}
                onChange={handleChange}
                placeholder='Enter password'
                className="w-full bg-transparent border-none outline-none text-white py-2 focus:outline-none placeholder-white"
              />
            </div>
            <div className="relative border-b-2 border-gray-300 mb-6">
              <input
                type="password"
                name='confirmPassword' // Change this to confirmPassword
                required
                value={confirmPassword} // Use confirmPassword state
                onChange={handleChange}
                placeholder='confirm password'
                className="w-full bg-transparent border-none outline-none text-white py-2 focus:outline-none placeholder-white"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-black font-semibold py-2 px-4 rounded-md border-2 border-transparent hover:bg-white/15 hover:text-white hover:border-white transition duration-300"
            >
              SignUp
            </button>
            <div className="text-center mt-6 text-white">
              <p>Already have an account? <a onClick={() => setPopup(true)} className="text-blue-600 hover:underline">Login</a></p>
            </div>
          </form>
        </div>
      )}
    </div>
  </>
  );
};

export default Login;

