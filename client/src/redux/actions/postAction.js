import { GLOBALTYPES } from './globalTypes'
import { imageUpload } from '../../utils/imageUpload'
import { postDataAPI, getDataAPI, patchDataAPI, deleteDataAPI } from '../../utils/fetchData'
import { createNotify, removeNotify } from './notifyAction'
import { POST_TYPES_APROVE } from './postAproveAction';

// redux/actions/postAction.js
export const POST_TYPES = {
    // ... tus constantes existentes (NO LAS CAMBIES)
    LOADING_POST: 'LOADING_POST',
    GET_POST: 'GET_POST',
    GET_POSTS: 'GET_POSTS',
    GET_POSTS_BY_CATEGORY: 'GET_POSTS_BY_CATEGORY',
    GET_CATEGORIES: 'GET_CATEGORIES',
    GET_CATEGORIES_PAGINATED: 'GET_CATEGORIES_PAGINATED',
    ERROR_POST: 'ERROR_POST',
    
    // ✅ AÑADE ESTOS NUEVOS TYPES
    GET_SIMILAR_POSTS: 'GET_SIMILAR_POSTS',
    LOADING_SIMILAR_POSTS: 'LOADING_SIMILAR_POSTS',
    CLEAR_SIMILAR_POSTS: 'CLEAR_SIMILAR_POSTS'
}
 
 
export const getSimilarPosts = (postId, options = {}) => async (dispatch, getState) => {
    try {
      dispatch({ type: POST_TYPES.LOADING_SIMILAR_POSTS, payload: true });
      
      console.log('🔍 Buscando posts similares para postId:', postId);
      
      // Obtener el post detalle del reducer correcto
      const { detailPost } = getState();
      let currentPost = detailPost.find(post => post._id === postId);
      
      // Si no está en el reducer detailPost, obtenerlo de la API
      if (!currentPost) {
        console.log('📥 Post no encontrado en detailPostReducer, obteniendo de API...');
        
        const postRes = await getDataAPI(`post/${postId}`);
        currentPost = postRes.data;
        
        // Guardar en el detailPostReducer
        dispatch({ 
          type: POST_TYPES.GET_POST, 
          payload: currentPost 
        });
      }
      
      // Verificar que tenemos los datos necesarios
      if (!currentPost?.categorie || !currentPost?.subCategory) {
        console.error('❌ Post no tiene categorie o subCategory:', currentPost);
        throw new Error('El post no tiene la información necesaria para buscar similares');
      }
      
      console.log('📋 Datos del post para búsqueda:', {
        categorie: currentPost.categorie,
        subCategory: currentPost.subCategory,
        id: currentPost._id
      });
      
      // Construir params para TU endpoint existente
      const params = new URLSearchParams({
        categorie: currentPost.categorie,
        subCategory: currentPost.subCategory,
        excludeId: postId,
        limit: options.limit || 6,
        page: options.page || 1
      }).toString();
      
      console.log('🌐 Llamando endpoint:', `/posts/similar?${params}`);
      
      // Llamar a TU endpoint existente
      const res = await getDataAPI(`posts/similar?${params}`);
      
      console.log(`✅ Posts similares encontrados: ${res.data.posts?.length || 0}`);
      
      // Despachar al postReducer (no al detailPostReducer)
      dispatch({ 
        type: POST_TYPES.GET_SIMILAR_POSTS, 
        payload: {
          posts: res.data.posts || [],
          total: res.data.total || 0,
          page: res.data.page || 1,
          totalPages: res.data.totalPages || 1,
          hasMore: res.data.hasMore || false,
          currentPostId: postId  // Para referencia
        }
      });
      
    } catch (err) {
      console.error('❌ Error en getSimilarPosts:', err);
      dispatch({ 
        type: POST_TYPES.ERROR_POST, 
        payload: {
          message: err.response?.data?.message || err.message || 'Error al cargar posts similares',
          action: 'getSimilarPosts'
        }
      });
      dispatch({ type: POST_TYPES.LOADING_SIMILAR_POSTS, payload: false });
    }
  };
  
  export const clearSimilarPosts = () => (dispatch) => {
    dispatch({ type: POST_TYPES.CLEAR_SIMILAR_POSTS });
  };
 
export const getPostsByCategory = (category, page = 1, filters = {}) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        
        // 📌 DEPURACIÓN
        console.log('🔍 getPostsByCategory INPUT:', {
            category,
            page,
            filters,
            categoryType: typeof category
        });
        
        // Construir URL
        const encodedCategory = encodeURIComponent(category);
        let url = `posts/category/${encodedCategory}`;
        
        // Parámetros
        const params = new URLSearchParams();
        params.append('page', page);
        params.append('limit', filters.limit || 12);
        
        url += `?${params.toString()}`;
        
        console.log('📡 API URL:', `/api/${url}`);
        
        // Hacer petición
        const res = await getDataAPI(url, auth.token);
        
        console.log('✅ API RESPONSE:', {
            status: res.status,
            dataKeys: Object.keys(res.data),
            postsCount: res.data.posts?.length,
            total: res.data.total,
            success: res.data.success
        });
        
        // Verificar si hay posts
        if (!res.data.posts || res.data.posts.length === 0) {
            console.warn('⚠️ No posts found in response');
            console.log('📄 Full response:', res.data);
        }
        
        // Extraer posts
        const posts = res.data.posts || [];
        
        dispatch({
            type: POST_TYPES.GET_POSTS_BY_CATEGORY,
            payload: {
                posts: posts,
                page: page,
                result: res.data.total || posts.length,
                category: category,
                total: res.data.total || 0,
                totalPages: res.data.totalPages || 1,
                success: res.data.success
            }
        });
        
        return {
            success: true,
            posts: posts,
            total: res.data.total || 0
        };
        
    } catch (err) {
        console.error('❌ ERROR in getPostsByCategory:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status,
            url: err.config?.url
        });
        
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { 
                error: err.response?.data?.msg || 
                      'Error al cargar posts de categoría' 
            }
        });
        
        return {
            success: false,
            error: err.message
        };
    }
};
// Acción para obtener todas las categorías
// redux/actions/postAction.js - NUEVA ACCIÓN
export const getCategories = (page = 1, limit = 2) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        const res = await getDataAPI(`categories/paginated?page=${page}&limit=${limit}`, auth.token);
        
        dispatch({
            type: POST_TYPES.GET_CATEGORIES_PAGINATED,
            payload: {
                categories: res.data.categories,
                page: res.data.page,
                total: res.data.total,
                totalPages: res.data.totalPages,
                hasMore: res.data.hasMore
            }
        });
        
        return res.data;
    } catch (err) {
        dispatch({
            type: 'ALERT',
            payload: { error: err.response?.data?.msg || 'Error al cargar categorías' }
        });
        throw err;
    }
};

// Acción para crear post (ya la tienes, pero asegurar que guarda categoría)
// actions/postAction.js - createPost actualizada
export const createPost = ({ 
    postData, 
    images, 
    auth, 
    socket 
}) => async (dispatch) => {
    let media = []
    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        
        if(images.length > 0) media = await imageUpload(images)

        // 📌 ENVIAR DATOS ORGANIZADOS
        const res = await postDataAPI('posts', { 
            ...postData,
            images: media 
        }, auth.token)

        dispatch({ 
            type: POST_TYPES.CREATE_POST, 
            payload: {
                ...res.data.newPost, 
                user: auth.user,
                // 📌 Asegurar que los campos específicos estén disponibles
                categorySpecificData: postData.categorySpecificData || {}
            } 
        })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: false} })

        // Notify (opcional)
        const msg = {
            id: res.data.newPost._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${res.data.newPost._id}`,
            content: postData.description, 
            image: media[0]?.url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response?.data?.msg || err.message}
        })
    }
}
export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: POST_TYPES.LOADING_POST, payload: true })
        const res = await getDataAPI('posts')
        
        dispatch({
            type: POST_TYPES.GET_POSTS,
            payload: {...res.data, page: 2}
        })

        dispatch({ type: POST_TYPES.LOADING_POST, payload: false })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}


export const getPost = ({detailPost, id }) => async (dispatch) => {
    if(detailPost.every(post => post._id !== id)){
        try {
            const res = await getDataAPI(`post/${id}` )
            dispatch({ type: POST_TYPES.GET_POST, payload: res.data.post })
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: {error: err.response.data.msg}
            })
        }
    }
}


export const deletePost = ({post, auth, socket}) => async (dispatch) => {
    dispatch({ type: POST_TYPES.DELETE_POST, payload: post })

    try {
        const res = await deleteDataAPI(`post/${post._id}`, auth.token)

        // Notify
        const msg = {
            id: post._id,
            text: 'added a new post.',
            recipients: res.data.newPost.user.followers,
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))
        
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const likePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: [...post.likes, auth.user]}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('likePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/like`, null, auth.token)
        
        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
            content: post.content, 
            image: post.images[0].url
        }

        dispatch(createNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const updatePost = ({content, images, auth, status}) => async (dispatch) => {
    let media = []
    const imgNewUrl = images.filter(img => !img.url)
    const imgOldUrl = images.filter(img => img.url)

    if(status.content === content 
        && imgNewUrl.length === 0
        && imgOldUrl.length === status.images.length
    ) return;

    try {
        dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true} })
        if(imgNewUrl.length > 0) media = await imageUpload(imgNewUrl)

        const res = await patchDataAPI(`post/${status._id}`, { 
            content, images: [...imgOldUrl, ...media] 
        }, auth.token)

        dispatch({ type: POST_TYPES.UPDATE_POST, payload: res.data.newPost })

        dispatch({ type: GLOBALTYPES.ALERT, payload: {success: res.data.msg} })
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}
export const unLikePost = ({post, auth, socket}) => async (dispatch) => {
    const newPost = {...post, likes: post.likes.filter(like => like._id !== auth.user._id)}
    dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost})

    socket.emit('unLikePost', newPost)

    try {
        await patchDataAPI(`post/${post._id}/unlike`, null, auth.token)

        // Notify
        const msg = {
            id: auth.user._id,
            text: 'like your post.',
            recipients: [post.user._id],
            url: `/post/${post._id}`,
        }
        dispatch(removeNotify({msg, auth, socket}))

    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

 
 

export const savePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: [...auth.user.saved, post._id]}
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`savePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}

export const unSavePost = ({post, auth}) => async (dispatch) => {
    const newUser = {...auth.user, saved: auth.user.saved.filter(id => id !== post._id) }
    dispatch({ type: GLOBALTYPES.AUTH, payload: {...auth, user: newUser}})

    try {
        await patchDataAPI(`unSavePost/${post._id}`, null, auth.token)
    } catch (err) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {error: err.response.data.msg}
        })
    }
}