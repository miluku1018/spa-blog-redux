import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getPosts, pagingPosts } from "../../WebAPI";

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const PostWrapper = styled.div`
  height: 70vh;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid #f09fac;
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PaginationContainer = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const PaginationInfo = styled.div`
  padding-top: 10px;
`;

const PaginationButton = styled.button`
  cursor: pointer;
  width: 150px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid transparent;
  background-color: pink;

  & + & {
    margin-left: 5px;
  }
  :hover {
    background-color: #000000de;
    border: 1px solid transparent;
    border-radius: 5px;
    color: #ec8c9b;
  }
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

function Pagination({ setCurrentPage, currentPage, totoalPages }) {
  const handleButtonClick = (e) => {
    const page = e.target.innerText;
    if (page === "prev" && currentPage >= "2") {
      return setCurrentPage(Number(currentPage) - 1);
    }
    if (page === "next" && Number(currentPage) !== totoalPages.length) {
      return setCurrentPage(Number(currentPage) + 1);
    }
    if (page === "first") {
      return setCurrentPage(1);
    }
    if (page === "last") {
      return setCurrentPage(totoalPages.length);
    }
    if (page !== "prev" && page !== "next") {
      return setCurrentPage(page);
    }
  };
  return (
    <PaginationContainer>
      <PaginationButton onClick={handleButtonClick}>first</PaginationButton>
      <PaginationButton onClick={handleButtonClick}>prev</PaginationButton>
      <PaginationButton onClick={handleButtonClick}>next</PaginationButton>
      <PaginationButton onClick={handleButtonClick}>last</PaginationButton>
      <PaginationInfo>
        第 {currentPage} 頁 / 共 {totoalPages.length} 頁
      </PaginationInfo>
    </PaginationContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const [totoalPages, setTotalPages] = useState([]);
  const limit = 5;

  useEffect(() => {
    getPosts().then((posts) => {
      const total = Math.ceil(posts.length / limit);
      for (let i = 1; i < total; i++) {
        setTotalPages((totoalPages) => [...totoalPages, i]);
      }
    });
  }, []);

  useEffect(() => {
    pagingPosts(currentPage, limit).then((posts) => setPosts(posts));
  }, [currentPage]);

  return (
    <Root>
      <PostWrapper>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostWrapper>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totoalPages={totoalPages}
      />
    </Root>
  );
}
