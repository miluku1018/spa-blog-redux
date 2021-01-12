import React, { useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import RegisterPage from "../../pages/RegisterPage";
import AboutPage from "../../pages/AboutPage";
import SinglePage from "../../pages/SinglePage";
import NewPostPage from "../../pages/NewPostPage";
import EditPostPage from "../../pages/EditPostPage";
import Header from "../Header";
import { getUser } from "../../redux/reducers/userReducer";
import { getAuthToken } from "../../utils";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Root = styled.div`
  padding-top: 64px;
  background: #eecfd438;
  width: 100%;
  height: 100%;
`;

export default function App() {
  const user = useSelector((store) => store.users.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser);
    }
  }, [dispatch]);

  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/posts/:id">
            <SinglePage />
          </Route>
          <Route path="/new-post">{user && <NewPostPage />}</Route>
          <Route path="/edit/:id">{user && <EditPostPage />}</Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </Root>
  );
}
