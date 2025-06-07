import React, { useActionState } from 'react';
import GoogleLogo from '../assets/google.svg';
import GithubLogo from '../assets/github.svg';
import Input from './BaseCompenents/Input';
import { NavLink, useHistory } from 'react-router-dom';
import Button from './BaseCompenents/Button';
import { useAuth } from '../context/AuthContext';
import { http } from '../services/httpService';
import './Login.css';

const Login = () => {
  const history = useHistory();
  const { setUser } = useAuth();
  const [errorMsg, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const email = formData.get('email');
      const password = formData.get('password');

      if (!email || !email.trim().length) {
        return 'email is required';
      }
      if (!password || !password.trim().length) {
        return 'password is required';
      }

      const response = await http.post('/user/login', {
        body: {
          email: email.trim(),
          password: password.trim(),
        },
      });
      if (response.statusCode === 200 && response.data) {
        setUser(response.data.userId, response.data.email);
        history.push('/');
        return null;
      } else {
        return (
          response.message || 'Something went wrong, please try again later'
        );
      }
    },
    null,
  );
  return (
    <div className="flex flex-col flex-auto max-w-sm sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md mx-3">
      <h1
        className="text-6xl text-gray-700 tracking-wide dark:text-darkSecondary mb-5
         text-center font-bold"
      >
        Sign In
      </h1>

      {errorMsg && (
        <span className="text-white-600 text-center mb-4 bg-red-600 px-4 py-2 rounded">
          {errorMsg}
        </span>
      )}
      <form action={formAction}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full formControl dark:bg-gray-700"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full formControl dark:bg-gray-700"
          required
        />

        <Button isSvg={true} type="submit" btnText="Login" />
      </form>

      <div className="signup-link flex md:mt-8 mt-4 items-center flex-col">
        <NavLink
          to="/forgetPassword"
          className="dark:text-gray-500 border-b-1 border-current"
        >
          Forget Password
        </NavLink>
        <div className="flex">
          <h4 className="dark:text-gray-500">
            Don't have account register here
          </h4>
          <NavLink to="/signup" className="ml-2 border-b-2 border-current">
            signup
          </NavLink>
        </div>
      </div>
      <div className="mt-6 flex justify-around">
        <button className="flex transition-colors duration-300 ease-in justify-center items-center px-4 py-2 dark:hover:bg-gray-700 hover:bg-gray-400">
          SigIn with{' '}
          <span className="ml-2">
            <img src={GoogleLogo} alt="google" className="w-8 h-8" />
          </span>
        </button>
        <button className="flex transition-colors duration-300 ease-in justify-center items-center px-4 py-2 dark:hover:bg-gray-700 bg-dark hover:bg-gray-400">
          SigIn with
          <span className="ml-2">
            <img src={GithubLogo} alt="google" className="w-8 h-8" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
