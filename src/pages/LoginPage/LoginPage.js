import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { AuthContext } from "../../contexts";

import { useHistory } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  text-align: center;
  border: 5px solid #ec8c9b;
  width: 500px;
  margin: 60px auto 0;
  padding: 30px 0;
  border-radius: 3px;
`;

const Input = styled.input`
  margin: 10px 0;
  width: 200px;
  height: 25px;
  border-radius: 3px;
  border: 1px solid #8ce7ec;
`;

const Button = styled.button`
  margin-top: 20px;
  cursor: pointer;
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: #8ce7ec;
  :hover {
    background-color: #000000de;
    border: 1px solid transparent;
    border-radius: 5px;
    color: #ec8c9b;
  }
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        return setErrorMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button>登入</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
