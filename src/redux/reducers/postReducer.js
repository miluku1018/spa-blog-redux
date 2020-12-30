import { createSlice } from "@reduxjs/toolkit";
import {
  getPost as getPostAPI,
  getPosts,
  pagingPosts as pagingPostsAPI,
  removePost as removePostAPI,
  editPost as editPostAPI,
  createPost,
} from "../../WebAPI";

export const postReducer = createSlice({
  name: "posts",
  initialState: {
    isLoadingPost: false,
    post: null,
    posts: [],
    totoalCount: null,
    errorMessage: null,
    newPostResponse: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },
    setPost: (state, action) => {
      state.post = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setTotalCount: (state, action) => {
      state.totoalCount = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload;
    },
  },
});

export const {
  setIsLoadingPost,
  setPost,
  setPosts,
  setTotalCount,
  setErrorMessage,
  setNewPostResponse,
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true));
  getPostAPI(id)
    .then((res) => {
      dispatch(setPost(res));
      dispatch(setIsLoadingPost(false));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const pagingPosts = (page, limit) => (dispatch) => {
  pagingPostsAPI(page, limit)
    .then((res) => {
      dispatch(setPosts(res));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPostsCount = () => (dispatch) => {
  getPosts()
    .then((res) => {
      dispatch(setTotalCount(res.length));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newPost = (title, body) => (dispatch) => {
  return createPost(title, body).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const editPost = (id, title, body) => (dispatch) => {
  return editPostAPI(id, title, body).then((res) => {
    dispatch(setNewPostResponse(res));
    return res;
  });
};

export const removePost = (id) => () => {
  return removePostAPI(id).then((res) => res);
};

export default postReducer.reducer;
