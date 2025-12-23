import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getSimilarPosts, clearSimilarPosts } from '../redux/actions/postAction';
import LoadIcon from '../images/loading.gif';
import PostCard from '../components/PostCard';
import { getDataAPI } from '../utils/fetchData';

const PostId = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { homePosts = { posts: [] }, detailPost = [], similarPosts = [], similarLoading = false } = useSelector(state => state);

  const postsArray = homePosts.posts || [];
  const detailArray = detailPost || [];

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      let current = detailArray.find(p => p._id === id) || postsArray.find(p => p._id === id);

      if (!current) {
        try {
          const res = await getDataAPI(`post/${id}`);
          // API puede devolver { post: {...} } o directamente {...}
          current = res.data.post || res.data;
          dispatch({ type: 'GET_POST', payload: current });
          console.log('📥 Post cargado desde API:', current);
        } catch (err) {
          console.error('❌ Error al cargar post:', err);
        }
      }

      if (current) {
        setPost(current);

        // Solo buscar similares si existe categoría y subcategoría
        if (current.categorie && current.subCategory) {
          dispatch(getSimilarPosts(id));
        } else {
          console.warn('⚠️ Post no tiene categorie o subCategory, no se buscarán similares', current);
          dispatch(clearSimilarPosts());
        }
      }

      setLoading(false);
    };

    fetchPost();
    return () => dispatch(clearSimilarPosts());
  }, [detailArray, postsArray, dispatch, id]);

  if (loading) return <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />;
  if (!post) return <p className="text-center mt-4">Post no encontrado</p>;

  return (
    <div className="posts-detail">
      <PostCard post={post} />

      <h3 className="mt-4">Posts similares</h3>
      {similarLoading && <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />}

      <div className="similar-posts">
        {(!similarPosts || similarPosts.length === 0) && !similarLoading && (
          <p>No se encontraron posts similares</p>
        )}
        {similarPosts && similarPosts.map(item => (
          <PostCard key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
};

export default PostId;

