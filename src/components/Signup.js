import React, { useActionState, useEffect } from 'react';
import Button from './BaseCompenents/Button';
import Input from './BaseCompenents/Input';
import { NavLink, useHistory } from 'react-router-dom';
import { http } from '../services/httpService';

function Signup() {
  const history = useHistory();
  const [errorMsg, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const userName = formData.get('username');
      const email = formData.get('email');
      const password = formData.get('password');
      if (!userName || !userName.trim().length) {
        return 'username is required';
      }
      if (!email || !email.trim().length) {
        return 'email is required';
      }
      if (!password || !password.trim().length) {
        return 'password is required';
      }

      const response = await http.post('/user/register', {
        body: {
          name: userName.trim(),
          email: email.trim(),
          password: password.trim(),
        },
      });
      if (response.statusCode === 201) {
        history.push('/login');
        return null;
      } else {
        return (
          response.message || 'Something went wrong, please try again later'
        );
      }
    },
    null,
  );
  // useEffect(() => {
  //   if (!isPending) {
  //     if (!errorMsg) {
  //       // Redirect to login page after successful signup

  //     }
  //   }
  // },[ errorMsg, isPending]);
  return (
    <div className="flex flex-col flex-auto max-w-sm sm:max-w-md md:max-w-md lg:max-w-md xl:max-w-md mx-3">
      <h1 className="text-6xl text-gray-700 tracking-wide dark:text-darkSecondary mb-5 text-center font-bold">
        Sign Up
      </h1>
      {errorMsg && (
        <span className="text-white-600 text-center mb-4 bg-red-600 px-4 py-2 rounded">
          {errorMsg}
        </span>
      )}
      <form action={formAction}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full formControl dark:bg-gray-700"
          required
        />
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
        <Button isSvg={true} type="submit" btnText="Signup" />
      </form>
      {/* <Input type="number" placeholder="Mobile" /> */}

      <div className="signup-link flex md:mt-8 mt-4 justify-center">
        <h4>Already have an account login here</h4>
        <NavLink to="/" className="ml-2 border-b-2 border-current">
          login
        </NavLink>
      </div>
    </div>
  );
}

export default Signup;
