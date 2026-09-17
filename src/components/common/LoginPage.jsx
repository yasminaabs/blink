import React, { useState } from "react";
import axios from "axios";
function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailReg, setEmailReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  const register = () => {
    axios.post('http://localhost:4000/api/v1/users/create', {
      email: emailReg,
      password: passwordReg
    })
    .then((response) => {
      console.log(response.data);
      // Affiche une alerte ou redirige l'utilisateur
    })
    .catch((error) => {
      console.error('Erreur lors de l\'inscription :', error.response?.data || error.message);
    });
  };

  const login = () => {
    axios.post('http://localhost:4000/api/v1/users/login', {
      email: email,
      password: password
    })
    .then((response) => {
      console.log("Connexion réussie :", response.data);
      // rediriger ou stocker le token si nécessaire
    })
    .catch((error) => {
      const message = error.response?.data?.message || "Erreur inconnue";
      setErrorMessage(message); // On met à jour l'état
    });
  };


  return ( 
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
  <form action="/dashbordclient">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative">
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-800" onClick={() => window.location.href = '/'}>
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center text-[#B01736] mb-6">
          {isLogin ? "Welcome Back " : "Create an Account "}
        </h2>
        {/* <form className="space-y-5" onSubmit={(e) => e.preventDefault()}> */}
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B01736]"
              placeholder="you@example.com"
              required
              onChange={(e)  => {
                {isLogin ? setEmail(e.target.value) : setEmailReg(e.target.value);}
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B01736]"
              placeholder="••••••••"
              required
              onChange={(e)  => {
                {isLogin ? setPassword(e.target.value) : setPasswordReg(e.target.value);}
                
              }}
            />
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#B01736] hover:underline">Forgot password?</a>
            </div>
          )}
          

          <button
            type="submit"

            className="w-full bg-[#B01736] text-white font-semibold py-2 rounded-xl hover:bg-[#8e0f29] transition"
            onClick={isLogin ? login : register}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
          {errorMessage && (<p className="text-red-500 text-sm mt-4 text-center">{errorMessage}</p>
)}

          {/* </form> */}
        

        <p className="text-sm text-center text-gray-500 mt-6">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <a
                href="#"
                className="text-[#B01736] font-medium hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a
                href="#"
                className="text-[#B01736] font-medium hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Login
              </a>
            </>
          )}
        </p>
      </div>
  </form>
    </div> 
  );
}

export default LoginPage;
