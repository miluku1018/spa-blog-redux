import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { getPost, removePost } from "../../redux/reducers/postReducer";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const Root = styled.div``;

const PostContainer = styled.div`
  width: 80%;
  margin: 40px auto;
  border-bottom: 1px solid #f09fac;
  padding: 16px;
  display: flex;
  flex-direction: column;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteButton = styled.button`
  width: 90px;
  height: 45px;
  cursor: pointer;
  background: aliceblue;
  border: 1px solid lightblue;
  padding: 10px 0;
  border-radius: 5px;
  margin-left: 15px;

  &:hover {
    background: #ff45009c;
    border: 1px solid lightred;
  }
`;

const EditButton = styled.button`
  width: 90px;
  height: 40px;
  cursor: pointer;
  background: aliceblue;
  border: 1px solid lightblue;
  padding: 10px 0;
  border-radius: 5px;
  &:hover {
    background: #9ff95f;
    border: 1px solid #9ff95f;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px 0;
  font-weight: bold;
`;

const PostInfo = styled.div`
  width: 80%;
`;

const PostTitle = styled.div`
  font-size: 34px;
  color: #333;
  text-decoration: none;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.4);
  margin-top: 12px;
`;

const PostBody = styled.div`
  color: rgba(0, 0, 0, 1);
  white-space: pre-line;
  margin-top: 20px;
`;

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 24px;
  background: rgba(0, 0, 0, 0.4);
`;

function Post({ post, onDelete, onUpdate }) {
  const user = useSelector((store) => store.users.user);
  if (!post) return null;
  return (
    <div>
      {post && (
        <PostContainer>
          <PostHeader>
            <PostInfo>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
            </PostInfo>
            {user && user.id === post.userId && (
              <ButtonGroup>
                <EditButton onClick={onUpdate}>編輯</EditButton>
                <DeleteButton onClick={onDelete}>刪除</DeleteButton>
              </ButtonGroup>
            )}
          </PostHeader>
          <PostBody>{post.body}</PostBody>
        </PostContainer>
      )}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

export default function SinglePage() {
  let { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.posts.isLoadingPost);
  const post = useSelector((store) => store.posts.post);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  const handleDelete = () => {
    dispatch(removePost(id)).then(() => history.push("/"));
  };
  const handleUpdate = () => {
    history.push(`/edit/${id}`);
  };
  return (
    <Root>
      <Post post={post} onDelete={handleDelete} onUpdate={handleUpdate} />
      {isLoading && <Loading>載入中</Loading>}
    </Root>
  );
}
