 
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

 
  const detailPost = useSelector(state => state.detailPost.detailPost);
  
  const [post, setPost] = useState(null);
 

  useEffect(() => {
    if (id) {
      dispatch(getPost({ detailPost, id }));
    }
  }, [dispatch, id,   detailPost]);

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