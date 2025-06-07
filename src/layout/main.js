import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import Modal from "../components/BaseCompenents/Modal";
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import Signup from '../components/Signup';
import Todo from '../components/Todo';
import { PrivateRoute } from '../Wrapper/PrivateRoute';

export default function Main() {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <main className="flex justify-center items-center h-full flex-auto content-center">
        <Switch>
          {/* <Route exact path="/"> */}
          {/* <Redirect to="/todo" /> */}
          {/* </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/todo">
            <PrivateRoute>
              <Todo />
            </PrivateRoute>
          </Route>
          <Route exact path="/">
            <Redirect to="/todo" />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
