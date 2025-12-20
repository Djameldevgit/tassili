// redux/reducers/postReducer.js - VERSIÓN COMPLETA CORREGIDA
import { POST_TYPES } from '../actions/postAction';

const initialState = {
    loading: false,
    posts: [],           // Para HOME: TODOS los posts
    categoryPosts: {},   // Para CATEGORÍAS: posts por categoría {'immobilier': [...], ...}
    categorySpecificPosts: [],  // Nueva: posts para la página de categoría actual
    result: 0,
    page: 1,
    total: 0,
    totalPages: 1,
    categories: [],
    currentCategory: 'all'
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_TYPES.GET_POSTS_BY_CATEGORY:
            console.log('🔄 Reducer - GET_POSTS_BY_CATEGORY:', {
                category: action.payload.category,
                postsCount: action.payload.posts?.length,
                page: action.payload.page
            });
            
            const { category, posts, page, result, total, totalPages } = action.payload;
            
            // 📌 FLUJO 1: Si es "all" (Home) → actualizar state.posts
            if (category === 'all') {
                return {
                    ...state,
                    posts: page === 1 ? posts : [...state.posts, ...posts],
                    result: result || posts.length,
                    page,
                    total: total || 0,
                    totalPages: totalPages || 1,
                    currentCategory: 'all',
                    loading: false
                };
            }
            
            // 📌 FLUJO 2: Si es categoría específica
            const existingCategoryPosts = state.categoryPosts[category] || [];
            
            // Para CategoryPage: siempre actualizar categorySpecificPosts
            let updatedCategorySpecificPosts = [];
            if (page === 1) {
                updatedCategorySpecificPosts = posts;
            } else {
                updatedCategorySpecificPosts = [...state.categorySpecificPosts, ...posts];
            }
            
            // Para Home: actualizar categoryPosts (para el acordeón)
            let updatedCategoryPosts;
            if (page === 1) {
                updatedCategoryPosts = posts;
            } else {
                updatedCategoryPosts = [...existingCategoryPosts, ...posts];
            }
            
            return {
                ...state,
                categoryPosts: {
                    ...state.categoryPosts,
                    [category]: updatedCategoryPosts
                },
                categorySpecificPosts: updatedCategorySpecificPosts, // Para CategoryPage
                result: result || posts.length,
                page,
                total: total || 0,
                totalPages: totalPages || 1,
                currentCategory: category,
                loading: false
            };
            
        case POST_TYPES.GET_POSTS:  // Acción para Home
            console.log('🏠 Reducer - GET_POSTS (para Home)');
            return {
                ...state,
                posts: action.payload.posts || [],
                result: action.payload.result || 0,
                page: action.payload.page || 1,
                total: action.payload.total || 0,
                currentCategory: 'all',
                loading: false
            };
            
        case POST_TYPES.GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            };
            
        // ... otros casos se mantienen
            
        default:
            return state;
    }
};

export default postReducer;