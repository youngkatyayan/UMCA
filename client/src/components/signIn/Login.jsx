
import React, { useState } from 'react';
import BackgroundImage from '../../assets/wallpaperflare.com_wallpaper4.jpg';
import Logo from '../../assets/logo.png';



const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    remember: false, 
  });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [popUp, setPopup] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);

        if (!popUp) {
            if (loginData.password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
    };

    //   handle login function 
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('/api/v1/login', loginData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (data.success) {
                toast.success(data.message);
                let response = data.result[0]

                let encryptedPASS = CryptoJS.AES.encrypt(response.password, "LOGIN PASSWORD").toString();;
                let encryptedUID = CryptoJS.AES.encrypt(response.mobile, "LOGIN UID").toString();
                let Status = CryptoJS.AES.encrypt(response.Status, "Status").toString();
                let Type = CryptoJS.AES.encrypt(response.Type, "Type").toString();

                localStorage.setItem('uid', encryptedUID)
                localStorage.setItem('password', encryptedPASS)
                localStorage.setItem('Status', Status)
                sessionStorage.setItem('Status', Type)
               
                setTimeout(() => {
                    navigate('/admin');
                    window.location.reload()
                }, 500);
            }
            else {
                toast.error(data.message);
                localStorage.clear()
                sessionStorage.clear()
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <>
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
                  className="hidden" 
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
                name='confirmPassword' 
                required
                value={confirmPassword} 
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

