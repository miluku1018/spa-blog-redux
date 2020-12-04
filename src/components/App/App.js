import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import RegisterPage from "../../pages/RegisterPage";
import AboutPage from "../../pages/AboutPage";
import SinglePage from "../../pages/SinglePage";
import NewPostPage from "../../pages/NewPostPage";
import Header from "../Header";
import { getMe } from "../../WebAPI";
import { AuthContext } from "../../contexts";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

const Root = styled.div`
  padding-top: 64px;
  background: #eecfd438;
  width: 100%;
  height: 100vh;
`;

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then((response) => {
      if (response.ok) {
        setUser(response.data);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/posts/:slug">
              <SinglePage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}
