 
// DetailPost.js (versión más simple)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import LoadIcon from '../../images/loading.gif';
import DetailPostCard from '../../components/DetailPostCard';
import { getPost } from "../../redux/actions/postAction";

const DetailPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const detailPost = useSelector(state => state.detailPost.detailPost);
  
  const [post, setPost] = useState(null);
  const [similarPosts, setSimilarPosts] = useState([]);

  useEffect(() => {
    if (id) {
      dispatch(getPost({ detailPost, id, auth }));
    }
  }, [dispatch, id, auth, detailPost]);

  useEffect(() => {
    const found = detailPost.find(p => p._id === id);
    if (found) {
      setPost(found);
    }
  }, [detailPost, id]);

  if (!post) return (
    <div className="loading-container">
      <img src={LoadIcon} alt="loading" className="loading-spinner" />
    </div>
  );

  return <DetailPostCard post={post} />;
};

export default DetailPost;