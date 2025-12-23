// components/SimilarPosts.js
import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSimilarPosts } from '../redux/actions/postAction';

const SimilarPosts = ({ category, subCategory, currentPostId }) => {
  const dispatch = useDispatch();
  const [hasAttemptedFetch, setHasAttemptedFetch] = useState(false);
  
  // Obtener estado
  const { 
    similarPosts = [], 
    similarLoading = false,
    similarHasMore = false,
    similarError = null
  } = useSelector(state => state.post || {});

  // Debug
  console.log('🔍 SIMILAR POSTS - Estado actual:', {
    category,
    subCategory,
    currentPostId,
    similarPostsCount: similarPosts.length,
    similarLoading,
    similarHasMore,
    similarError,
    hasAttemptedFetch
  });

  // Fetch inicial
  useEffect(() => {
    if (category && subCategory && !hasAttemptedFetch) {
      console.log('🚀 Iniciando búsqueda de posts similares:', {
        category,
        subCategory,
        excludeId: currentPostId
      });
      
      setHasAttemptedFetch(true);
      dispatch(getSimilarPosts({
        category: category,
        subCategory: subCategory,
        excludeId: currentPostId,
        limit: 6,
        page: 1
      }));
    }
  }, [category, subCategory, currentPostId, dispatch, hasAttemptedFetch]);

  // Cargar más posts
  const handleLoadMore = useCallback(() => {
    if (similarHasMore && !similarLoading) {
      console.log('⬇️ Cargando más posts...');
      dispatch(getSimilarPosts({
        category,
        subCategory,
        excludeId: currentPostId,
        limit: 6,
        page: Math.floor(similarPosts.length / 6) + 1
      }));
    }
  }, [similarHasMore, similarLoading, category, subCategory, currentPostId, similarPosts.length, dispatch]);

  // CASO 1: Error
  if (similarError) {
    return (
      <div className="similar-posts mt-8">
        <h2 className="text-2xl font-bold mb-6">Anuncios similares</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
          <div className="text-red-600 text-5xl mb-4">❌</div>
          <h3 className="text-red-700 font-bold mb-2">Error al cargar</h3>
          <p className="text-red-600 mb-4">{similarError}</p>
          <button 
            onClick={() => dispatch(getSimilarPosts({
              category,
              subCategory,
              excludeId: currentPostId,
              limit: 6,
              page: 1
            }))}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // CASO 2: Cargando inicial
  if (similarLoading && similarPosts.length === 0) {
    return (
      <div className="similar-posts mt-8">
        <h2 className="text-2xl font-bold mb-6">Anuncios similares</h2>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <h3 className="text-blue-700 font-bold mb-2">Buscando anuncios similares...</h3>
          <p className="text-blue-600">
            Categoría: <span className="font-semibold">{category}</span>
          </p>
          <p className="text-blue-600">
            Subcategoría: <span className="font-semibold">{subCategory}</span>
          </p>
        </div>
      </div>
    );
  }

  // CASO 3: No hay posts similares
  if (!similarLoading && similarPosts.length === 0 && hasAttemptedFetch) {
    return (
      <div className="similar-posts mt-8">
        <h2 className="text-2xl font-bold mb-6">Anuncios similares</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-400 text-5xl mb-4">📭</div>
          <h3 className="text-gray-700 font-bold mb-2">No hay anuncios similares</h3>
          <p className="text-gray-600 mb-2">
            No encontramos otros anuncios en esta categoría.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            <p><strong>Categoría:</strong> {category}</p>
            <p><strong>Subcategoría:</strong> {subCategory}</p>
          </div>
        </div>
      </div>
    );
  }

  // CASO 4: Mostrar posts similares
  return (
    <div className="similar-posts mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Anuncios similares
          <span className="ml-2 bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
            {similarPosts.length}
          </span>
        </h2>
        
        {similarLoading && (
          <div className="flex items-center text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-600 border-t-transparent mr-2"></div>
            <span className="text-sm">Actualizando...</span>
          </div>
        )}
      </div>

      {/* Grid de posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarPosts.map((post) => {
          if (!post || !post._id) return null;
          
          // Extraer datos del post
          const postTitle = post.mixto?.title || post.title || 'Sin título';
          const postPrice = post.mixto?.price || post.price || 0;
          const postImage = post.images?.[0] || post.mixto?.images?.[0];
          const postCategory = post.categorie || post.category || category;
          
          return (
            <Link 
              key={post._id} 
              to={`/post/${post._id}`}
              className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {postImage ? (
                  <img 
                    src={postImage} 
                    alt={postTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl text-gray-300 mb-2">🖼️</div>
                      <p className="text-gray-400 text-sm">Sin imagen</p>
                    </div>
                  </div>
                )}
                
                {/* Badge de categoría */}
                <div className="absolute top-2 left-2">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                    {postCategory}
                  </span>
                </div>
              </div>
              
              {/* Información */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 line-clamp-2 h-12 mb-3">
                  {postTitle}
                </h3>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 font-bold text-lg">
                      ${postPrice.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.subCategory || subCategory}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="mr-1">❤️</span>
                      <span>{post.likes?.length || 0}</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Botón para cargar más */}
      {similarHasMore && (
        <div className="text-center mt-8">
          <button
            onClick={handleLoadMore}
            disabled={similarLoading}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              similarLoading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-lg'
            }`}
          >
            {similarLoading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Cargando...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <span className="mr-2">⬇️</span>
                Ver más anuncios
                <span className="ml-2">({similarPosts.length}+)</span>
              </span>
            )}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Página {Math.floor(similarPosts.length / 6) + 1}
          </p>
        </div>
      )}

      {/* Mensaje si no hay más */}
      {!similarHasMore && similarPosts.length > 0 && (
        <div className="text-center mt-8 pt-6 border-t">
          <p className="text-gray-500">
            ✅ Has visto todos los anuncios similares
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {similarPosts.length} anuncios encontrados
          </p>
        </div>
      )}
    </div>
  );
};

export default SimilarPosts;