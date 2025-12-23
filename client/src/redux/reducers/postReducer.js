// redux/reducers/postReducer.js - VERSIÓN COMPLETA Y CORREGIDA
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
    
    // Estados para similar posts
    similarPosts: [],
    similarLoading: false,
    similarPage: 1,
    similarTotalPages: 1,
    similarHasMore: false,
    similarError: null,
    
    // Estados para categorías paginadas
    categoriesPage: 1,
    categoriesTotal: 0,
    categoriesHasMore: false,
    
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
            
        case POST_TYPES.SIMILAR_POSTS_REQUEST:
            console.log('🔄 Reducer - SIMILAR_POSTS_REQUEST');
            return { 
                ...state, 
                similarLoading: true,
                similarError: null
            };
              
        case POST_TYPES.SIMILAR_POSTS_SUCCESS:
            console.log('✅ Reducer - SIMILAR_POSTS_SUCCESS:', {
                postsCount: action.payload.posts?.length,
                page: action.payload.page,
                hasMore: action.payload.hasMore
            });
            
            return {
                ...state,
                similarLoading: false,
                similarPosts: action.payload.page === 1 
                    ? (action.payload.posts || []) 
                    : [...state.similarPosts, ...(action.payload.posts || [])],
                similarPage: action.payload.page || 1,
                similarTotalPages: action.payload.totalPages || 1,
                similarHasMore: action.payload.hasMore || false,
                similarError: null
            };
                
        case POST_TYPES.SIMILAR_POSTS_FAIL:
            console.log('❌ Reducer - SIMILAR_POSTS_FAIL:', action.payload);
            return {
                ...state,
                similarLoading: false,
                similarError: action.payload,
                similarPosts: []
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
            
            // ⚠️ CORRECCIÓN: Asegurar que categories sea un array
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
            
        case POST_TYPES.LOADING_POST:
            return {
                ...state,
                loading: action.payload
            };
            
        case POST_TYPES.GET_POST:
            console.log('📄 Reducer - GET_POST:', {
                postId: action.payload?._id,
                hasCategorie: !!action.payload?.categorie
            });
            return {
                ...state,
                post: action.payload,
                loading: false
            };
            
        case POST_TYPES.ERROR_POST:
            return {
                ...state,
                error: action.payload,
                loading: false
            };
            
        default:
            return state;
    }
};

export default postReducer;