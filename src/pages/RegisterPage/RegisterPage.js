import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { register, setErrorMessage } from "../../redux/reducers/userReducer";

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
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const errorMessage = useSelector((store) => store.users.errorMessage);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => dispatch(setErrorMessage(null)), [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(register(username, nickname, password));
    dispatch(register(username, nickname, password)).then((res) => {
      if (res) {
        history.push("/");
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        nickname:{" "}
        <Input value={nickname} onChange={(e) => setNickname(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button>註冊</Button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
