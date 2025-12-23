// pages/DetailPost.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailPostCard from '../../components/PostCard';
import { getPost } from '../../redux/actions/postAction';
import SimilarPosts from '../../components/SimilarPosts';

const DetailPost = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [normalizedPost, setNormalizedPost] = useState(null);
  
  // Obtener el estado CORRECTO
  const { post, loading, error } = useSelector(state => state.post);
  
  // Debug completo
  console.log('🔍 DETAIL POST - ESTADO:', {
    id,
    loading,
    error,
    postExists: !!post,
    postKeys: post ? Object.keys(post) : [],
    postCategorie: post?.categorie,
    postCategory: post?.category, // Probablemente undefined
    postSubCategory: post?.subCategory
  });

  useEffect(() => {
    if (id) {
      console.log('🔄 Obteniendo post con ID:', id);
      dispatch(getPost(id));
    }
  }, [id, dispatch]);

  // Normalizar el post cuando llegue
  useEffect(() => {
    if (post) {
      console.log('📦 POST RECIBIDO DEL API:', post);
      
      // Normalizar: usar categorie como category
      const normalized = {
        ...post,
        // Asegurar que category tenga valor (de categorie)
        category: post.categorie || post.category,
        // Asegurar que subCategory exista
        subCategory: post.subCategory || '',
        // Asegurar arrays
        likes: post.likes || [],
        images: post.images || [],
        mixto: post.mixto || {},
        user: post.user || { name: 'Usuario', avatar: '' }
      };
      
      console.log('🔄 POST NORMALIZADO:', {
        category: normalized.category,
        subCategory: normalized.subCategory,
        _id: normalized._id
      });
      
      setNormalizedPost(normalized);
    }
  }, [post]);

  // 1. Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {/* Skeleton para CardBodyTitle */}
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-32"></div>
            </div>
          </div>
          
          {/* Skeleton para CardBodyCarousel */}
          <div className="h-96 bg-gray-300 rounded-lg"></div>
          
          {/* Skeleton para CardFooter */}
          <div className="h-20 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // 2. Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-red-600 text-5xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(getPost(id))}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // 3. Post no encontrado
  if (!normalizedPost || !normalizedPost._id) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md mx-auto">
          <div className="text-yellow-600 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-yellow-700 mb-2">Publicación no encontrada</h2>
          <p className="text-yellow-600 mb-4">El anuncio que buscas no existe o ha sido eliminado.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          >
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  // 4. ✅ Post encontrado - Renderizar
  console.log('🎯 RENDERIZANDO CON:', {
    category: normalizedPost.category,
    subCategory: normalizedPost.subCategory,
    postId: normalizedPost._id
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* DEBUG INFO */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-blue-700">📊 Información de categoría</h3>
            <div className="mt-2 grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-500">Categoría:</span>
                <p className="font-semibold">{normalizedPost.category || 'No definida'}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Subcategoría:</span>
                <p className="font-semibold">{normalizedPost.subCategory || 'No definida'}</p>
              </div>
            </div>
          </div>
          <button 
            onClick={() => console.log('Post completo:', normalizedPost)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ver en consola
          </button>
        </div>
      </div>
jjjjjjjjjjjj
      {/* Post principal */}
      <DetailPostCard post={normalizedPost} />
      
      {/* Posts similares */}
      <div className="mt-12">
        {normalizedPost.category && normalizedPost.subCategory ? (
          <>
            <h2 className="text-2xl font-bold mb-6 pb-3 border-b">
              🏷️ Anuncios similares en <span className="text-blue-600">{normalizedPost.category}</span>
            </h2>
            <SimilarPosts 
              category={normalizedPost.category}
              subCategory={normalizedPost.subCategory}
              currentPostId={normalizedPost._id}
            />
          </>
        ) : (
          <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center">
              <div className="text-yellow-600 text-2xl mr-3">⚠️</div>
              <div>
                <h3 className="font-bold text-yellow-700">No se pueden cargar anuncios similares</h3>
                <p className="text-yellow-600 text-sm mt-1">
                  Esta publicación no tiene categoría o subcategoría definida.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPost;