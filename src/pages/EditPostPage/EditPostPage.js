import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getPost,
  setPost,
  editPost,
  setErrorMessage,
} from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

const ErrorMessage = styled.div`
  color: red;
`;
const Form = styled.form`
  text-align: center;
  margin-top: 30px;
`;
const Input = styled.input`
  width: 400px;
  height: 30px;
  border: 1px solid #f09fac;
  border-radius: 3px;
`;

const Textarea = styled.textarea`
  margin: 10px 0;
  border: 1px solid #f09fac;
  border-radius: 3px;
`;

const Button = styled.button`
  background-color: pink;
  border: 1px solid transparent;
  border-radius: 5px;
  width: 300px;
  height: 35px;
  cursor: pointer;
  :hover {
    background-color: #000000de;
    border: 1px solid transparent;
    border-radius: 5px;
    color: #ec8c9b;
  }
`;

export default function EditPostPage() {
  const post = useSelector((store) => store.posts.post);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.body);
  const errorMessage = useSelector((store) => store.posts.errorMessage);
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || title.trim() === "" || content.trim() === "") {
      return dispatch(setErrorMessage("標題或內容不能空白"));
    }
    dispatch(editPost(id, title, content)).then((newPostResponse) => {
      if (newPostResponse && newPostResponse.id) {
        history.push(`/post/${newPostResponse.id}`);
      }
    });
  };

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  return (
    <Form onSubmit={handleSubmit}>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div>
        標題: <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Textarea
          cols="55"
          rows="20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button>更新</Button>
    </Form>
  );
}
