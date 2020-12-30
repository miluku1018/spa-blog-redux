import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { pagingPosts, getPostsCount } from "../../redux/reducers/postReducer";
import { useSelector, useDispatch } from "react-redux";

const Root = styled.div`
  width: 80%;
  margin: 15px auto;
`;

const PostWrapper = styled.div`
  height: 70vh;
`;

const PostContainer = styled.div`
  border-bottom: 1px solid #f09fac;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
  width: 80%;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const Pagination = styled.div`
  margin: 30px 0;
  text-align: center;
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

  ${(props) =>
    props.$active &&
    `
    background: ${props.theme.colors.primary_blue} ;
  `}
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function HomePage() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState("1");
  const totoalCount = useSelector((store) => store.posts.totoalCount);
  const posts = useSelector((store) => store.posts.posts);
  const pages = [];
  const limit = 5;

  useEffect(() => {
    dispatch(getPostsCount());
    dispatch(pagingPosts(currentPage, limit));
  }, [dispatch, currentPage]);

  const length = Math.ceil(totoalCount / limit);
  for (let i = 1; i <= length; i++) {
    pages.push(i);
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };
  return (
    <Root>
      <PostWrapper>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </PostWrapper>
      <Pagination>
        {pages.map((page) => (
          <PaginationButton
            key={page}
            $active={page === currentPage}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationButton>
        ))}
      </Pagination>
    </Root>
  );
}
