// redux/reducers/postReducer.js - VERSIÓN COMPLETA Y ACTUALIZADA
import { POST_TYPES } from '../actions/postAction';

const initialState = {
    loading: false,
    posts: [],
    categoryPosts: {},
    categorySpecificPosts: [],
    result: 0,
    page: 1,
    total: 0,
    totalPages: 1,
    categories: [],
    
    // ✅ NUEVOS ESTADOS PARA POSTS SIMILARES
    similarPosts: [],           // Array de posts similares
    similarPostsTotal: 0,       // Total de posts similares encontrados
    similarPostsPage: 1,        // Página actual de posts similares
    similarPostsTotalPages: 1,  // Total de páginas
    similarPostsHasMore: false, // Si hay más páginas
    similarLoading: false,      // Loading state para posts similares
    currentSimilarPostId: null, // ID del post actual para el cual buscamos similares
    
    // Estados para categorías paginadas
    categoriesPage: 1,
    categoriesTotal: 0,
    categoriesHasMore: false,
    
    currentCategory: 'all',
    error: null
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        // ==================== POSTS POR CATEGORÍA ====================
        case POST_TYPES.GET_POSTS_BY_CATEGORY:
            console.log('🔄 Reducer - GET_POSTS_BY_CATEGORY:', {
                category: action.payload.category,
                postsCount: action.payload.posts?.length,
                page: action.payload.page
            });
            
            const { category, posts, page, result, total, totalPages } = action.payload;
            
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
            
            const existingCategoryPosts = state.categoryPosts[category] || [];
            
            let updatedCategorySpecificPosts = [];
            if (page === 1) {
                updatedCategorySpecificPosts = posts;
            } else {
                updatedCategorySpecificPosts = [...state.categorySpecificPosts, ...posts];
            }
            
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
                categorySpecificPosts: updatedCategorySpecificPosts,
                result: result || posts.length,
                page,
                total: total || 0,
                totalPages: totalPages || 1,
                currentCategory: category,
                loading: false
            };
            
        // ==================== POSTS GENERALES (HOME) ====================
        case POST_TYPES.GET_POSTS:
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
            
        // ==================== CATEGORÍAS ====================
        case POST_TYPES.GET_CATEGORIES:
            console.log('📂 Reducer - GET_CATEGORIES:', {
                payloadType: typeof action.payload,
                isArray: Array.isArray(action.payload),
                length: action.payload?.length
            });
            
            // Asegurar que siempre sea un array
            const categoriesArray = Array.isArray(action.payload) 
                ? action.payload 
                : (action.payload.categories || []);
            
            return {
                ...state,
                categories: categoriesArray,
                loading: false
            };
            
        case POST_TYPES.GET_CATEGORIES_PAGINATED:
            console.log('🔄 Reducer - GET_CATEGORIES_PAGINATED - Payload:', {
                payload: action.payload,
                payloadType: typeof action.payload,
                isArray: Array.isArray(action.payload),
                hasCategories: 'categories' in action.payload,
                categoriesType: typeof action.payload?.categories,
                categoriesIsArray: Array.isArray(action.payload?.categories)
            });
            
            // Asegurar que categories sea un array
            const categoriesData = action.payload?.categories;
            let safeCategories = [];
            
            if (Array.isArray(categoriesData)) {
                safeCategories = categoriesData;
            } else if (categoriesData && typeof categoriesData === 'object') {
                // Si es un objeto, convertirlo a array
                safeCategories = Object.values(categoriesData);
            } else if (Array.isArray(action.payload)) {
                // Si el payload completo es el array
                safeCategories = action.payload;
            }
            
            console.log('📊 Categories seguro:', {
                safeCategoriesLength: safeCategories.length,
                firstItem: safeCategories[0]
            });
            
            if (action.payload?.page === 1) {
                return {
                    ...state,
                    categories: safeCategories,
                    categoriesPage: action.payload.page || 1,
                    categoriesTotal: action.payload.total || 0,
                    categoriesHasMore: action.payload.hasMore || false,
                    loading: false
                };
            } else {
                return {
                    ...state,
                    categories: [...state.categories, ...safeCategories],
                    categoriesPage: action.payload.page || state.categoriesPage + 1,
                    categoriesTotal: action.payload.total || state.categoriesTotal,
                    categoriesHasMore: action.payload.hasMore || false,
                    loading: false
                };
            }
            
        // ==================== POSTS SIMILARES ====================
        case POST_TYPES.GET_SIMILAR_POSTS:
            console.log('🔄 Reducer - GET_SIMILAR_POSTS:', {
                postsCount: action.payload.posts?.length,
                page: action.payload.page,
                hasMore: action.payload.hasMore,
                total: action.payload.total,
                currentPostId: action.payload.currentPostId
            });
            
            // Extraer datos del payload con valores por defecto
            const similarPosts = action.payload.posts || [];
            const similarPage = action.payload.page || 1;
            const similarTotal = action.payload.total || 0;
            const similarTotalPages = action.payload.totalPages || 1;
            const similarHasMore = action.payload.hasMore || false;
            const currentPostId = action.payload.currentPostId || null;
            
            // Si es página 1 o post diferente, reemplazar
            // Si es misma página del mismo post, agregar
            let updatedSimilarPosts;
            if (similarPage === 1 || currentPostId !== state.currentSimilarPostId) {
                updatedSimilarPosts = similarPosts;
            } else {
                updatedSimilarPosts = [...state.similarPosts, ...similarPosts];
            }
            
            return {
                ...state,
                similarPosts: updatedSimilarPosts,
                similarPostsTotal: similarTotal,
                similarPostsPage: similarPage,
                similarPostsTotalPages: similarTotalPages,
                similarPostsHasMore: similarHasMore,
                similarLoading: false,
                currentSimilarPostId: currentPostId
            };
            
        case POST_TYPES.LOADING_SIMILAR_POSTS:
            console.log('⏳ Reducer - LOADING_SIMILAR_POSTS:', action.payload);
            return {
                ...state,
                similarLoading: action.payload
            };
            
        case POST_TYPES.CLEAR_SIMILAR_POSTS:
            console.log('🧹 Reducer - CLEAR_SIMILAR_POSTS');
            return {
                ...state,
                similarPosts: [],
                similarPostsTotal: 0,
                similarPostsPage: 1,
                similarPostsTotalPages: 1,
                similarPostsHasMore: false,
                similarLoading: false,
                currentSimilarPostId: null
            };
            
        // ==================== LOADING Y ERROR ====================
        case POST_TYPES.LOADING_POST:
            console.log('⏳ Reducer - LOADING_POST:', action.payload);
            return {
                ...state,
                loading: action.payload
            };
            
        case POST_TYPES.ERROR_POST:
            console.log('❌ Reducer - ERROR_POST:', action.payload);
            return {
                ...state,
                error: action.payload,
                loading: false,
                similarLoading: false
            };
            
        default:
            return state;
    }
};

export default postReducer;