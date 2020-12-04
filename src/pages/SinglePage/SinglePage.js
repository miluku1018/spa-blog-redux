import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { getPost } from "../../WebAPI";

const PostContainer = styled.div`
  width: 80%;
  margin: 30px auto;
  border-bottom: 1px solid #f09fac;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  font-weight: bold;
`;

const PostTitle = styled.div`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PostBody = styled.div`
  color: rgba(0, 0, 0, 1);
`;

export default function SinglePage() {
  let { slug } = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    getPost(slug).then((post) => setPost(post));
  }, [slug]);

  return (
    <div>
      {post && (
        <PostContainer>
          <PostHeader>
            <PostTitle>{post.title}</PostTitle>
            <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
          </PostHeader>
          <PostBody>{post.body}</PostBody>
        </PostContainer>
      )}
    </div>
  );
}
