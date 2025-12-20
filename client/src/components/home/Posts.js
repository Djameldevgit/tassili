// components/home/Posts.js - VERSIÓN FINAL
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import PostCard from '../postcards/PostCard';

const Posts = ({ selectedCategory, fromCategoryPage = false }) => {
    const location = useLocation();
    const { homePosts } = useSelector(state => state);
    
    console.log('🔍 Posts - Estado:', {
        selectedCategory,
        fromCategoryPage,
        path: location.pathname,
        postsForHome: homePosts.posts?.length,
        categorySpecificPosts: homePosts.categorySpecificPosts?.length,
        currentCategory: homePosts.currentCategory
    });
    
    // 📌 LÓGICA DE POSTS A MOSTRAR
    const displayPosts = useMemo(() => {
        // CASO 1: Página de categoría específica
        if (fromCategoryPage || location.pathname.startsWith('/category/')) {
            console.log('📂 CategoryPage - Usando categorySpecificPosts');
            return homePosts.categorySpecificPosts || [];
        }
        
        // CASO 2: Home con categoría "all"
        if (selectedCategory === 'all') {
            console.log('🏠 Home - Mostrando TODOS los posts');
            return homePosts.posts || [];
        }
        
        // CASO 3: Home con categoría específica (filtro en Home)
        if (homePosts.categoryPosts && homePosts.categoryPosts[selectedCategory]) {
            console.log(`🏠 Home - Filtrado para ${selectedCategory}`);
            return homePosts.categoryPosts[selectedCategory] || [];
        }
        
        // Fallback
        console.log('⚠️ No se encontraron posts');
        return [];
        
    }, [homePosts, selectedCategory, fromCategoryPage, location.pathname]);
    
    // ... resto del renderizado igual
    if (!displayPosts || displayPosts.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="display-1 mb-3">📭</div>
                <h4 className="text-muted mb-3">
                    {selectedCategory === 'all' 
                        ? 'No hay anuncios publicados aún' 
                        : `No hay anuncios en "${selectedCategory}"`
                    }
                </h4>
            </div>
        );
    }
    
    return (
        <div className="posts">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {displayPosts.map(post => (
                    <div key={post._id} className="col">
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Posts;