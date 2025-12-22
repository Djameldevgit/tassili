const Posts = require('../models/postModel')
const Comments = require('../models/commentModel')
const Users = require('../models/userModel')
const cloudinary = require('cloudinary').v2;

// Configurar Cloudinary
cloudinary.config({
    cloud_name: 'dfjipgj2o',
    api_key: '213981915435275',
    api_secret: 'wv_IiCM9zzhdiWDNXXo8HZi7wX4'
});
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const postCtrl = {
// controllers/postCtrl.js - AGREGAR NUEVO MÉTODO

// Obtener todas las categorías disponibles dinámicamente
createPost: async (req, res) => {
    try {
        console.log('📥 Datos recibidos en createPost:', req.body);
        
        const { 
            categorie, 
            subCategory, 
            articleType,
            title,
            description,
            price,
            wilaya,
            commune,
            address,
            condition,
            categorySpecificData = {}, // AQUÍ recibe los campos dinámicos
            images 
        } = req.body;

        // Validaciones
        if(!images || images.length === 0) {
            return res.status(400).json({msg: "Please add at least one photo."});
        }
        
        if(!categorie) {
            return res.status(400).json({msg: "Category is required."});
        }

        // Preparar datos específicos
        const specificDataMap = new Map();
        if (categorySpecificData && typeof categorySpecificData === 'object') {
            Object.entries(categorySpecificData).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    specificDataMap.set(key, value);
                }
            });
        }

        // Crear nuevo post
        const newPost = new Posts({
            categorie,
            subCategory: subCategory || '',
            articleType: articleType || '',
            title: title || '',
            description: description || '',
            price: price || 0,
            categorySpecificData: specificDataMap,
            images,
            user: req.user._id,
            location: {
                wilaya: wilaya || '',
                commune: commune || '',
                address: address || ''
            },
            condition: condition || 'occasion',
            isActive: true
        });

        await newPost.save();
        
        // Populate para respuesta
        await newPost.populate("user", "avatar username fullname");

        res.json({
            msg: 'Post created successfully!',
            newPost: {
                ...newPost._doc,
                user: req.user
            }
        });

    } catch (err) {
        console.error('❌ Error en createPost:', err);
        return res.status(500).json({msg: err.message});
    }
},

// 📌 OBTENER POSTS (corregido)
getPosts: async (req, res) => {
    try {
        const { page = 1, limit = 9, category } = req.query;
        const skip = (page - 1) * limit;
        
        // Construir query
        let query = { isActive: true };
        
        // Si hay categoría, filtrar
        if (category && category !== 'all') {
            query.categorie = category;
        }
        
        // Obtener posts
        const posts = await Posts.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort('-createdAt')
            .populate("user", "avatar username");
        
        // Contar total
        const total = await Posts.countDocuments(query);
        
        res.json({
            msg: 'Success!',
            result: posts.length,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            posts
        });

    } catch (err) {
        console.error('❌ Error en getPosts:', err);
        return res.status(500).json({msg: err.message});
    }
},

// 📌 OBTENER POSTS POR CATEGORÍA (nuevo)
getPostsByCategory: async (req, res) => {
    try {
        const { category } = req.params;
        const { page = 1, limit = 9 } = req.query;
        const skip = (page - 1) * limit;
        
        const query = { 
            categorie: category,
            isActive: true 
        };
        
        const [posts, total] = await Promise.all([
            Posts.find(query)
                .skip(skip)
                .limit(parseInt(limit))
                .sort('-createdAt')
                .populate("user", "avatar username"),
            Posts.countDocuments(query)
        ]);
        
        res.json({
            success: true,
            posts,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
            hasMore: skip + posts.length < total
        });

    } catch (err) {
        console.error('❌ Error en getPostsByCategory:', err);
        return res.status(500).json({msg: err.message});
    }
},

// 📌 OBTENER TODAS LAS CATEGORÍAS (nuevo)
// backend/controllers/postCtrl.js - NUEVO CONTROLADOR
getAllCategoriesPaginated: async (req, res) => {
    try {
        const { page = 1, limit = 2 } = req.query; // 2 categorías por página
        const skip = (page - 1) * limit;
        
        // Obtener todas las categorías con conteo
        const allCategories = await Posts.aggregate([
            { $match: { isActive: true } },
            { $group: { 
                _id: "$categorie", 
                count: { $sum: 1 }
            }},
            { $sort: { count: -1 } }
        ]);
        
        // Agregar emojis
        const categoryEmojis = {
            'vehicules': '🚗',
            'immobilier': '🏠',
            'informatique': '💻',
            'vetements': '👕',
            'telephones': '📱',
            'services': '🛠️',
            'electromenager': '🔌',
            'piecesDetachees': '⚙️',
            'alimentaires': '🍎',
            'sante_beaute': '💄',
            'meubles': '🛋️',
            'materiaux': '🧱',
            'loisirs': '🎮',
            'emploi': '💼',
            'sport': '⚽',
            'voyages': '✈️'
        };
        
        const categoriesWithEmojis = allCategories.map(cat => ({
            name: cat._id,
            count: cat.count,
            emoji: categoryEmojis[cat._id] || '📦'
        }));
        
        // Paginación
        const totalCategories = categoriesWithEmojis.length;
        const paginatedCategories = categoriesWithEmojis.slice(skip, skip + parseInt(limit));
        
        res.json({
            success: true,
            categories: paginatedCategories,
            page: parseInt(page),
            total: totalCategories,
            totalPages: Math.ceil(totalCategories / limit),
            hasMore: skip + paginatedCategories.length < totalCategories
        });

    } catch (err) {
        console.error('❌ Error en getAllCategoriesPaginated:', err);
        return res.status(500).json({msg: err.message});
    }
},
 

// Función auxiliar para calcular similitud
// redux/actions/postAction.js
  getSimilarPosts : (currentPostId) => async (dispatch, getState) => {
    try {
        const { auth } = getState();
        
        console.log('🔍 Buscando posts similares para ID:', currentPostId);
        
        // 1. Primero obtenemos el post actual COMPLETO
        const postRes = await getDataAPI(`post/${currentPostId}`, auth.token);
        const currentPost = postRes.data.post;
        
        console.log('📋 Datos del post actual para similares:', {
            id: currentPost._id,
            categorie: currentPost.categorie,
            subCategory: currentPost.subCategory,
            wilaya: currentPost.wilaya,
            price: currentPost.price
        });
        
        // 2. Construir query para posts similares
        const params = new URLSearchParams();
        params.append('categorie', currentPost.categorie);
        params.append('excludeId', currentPost._id);
        params.append('limit', '6');
        
        // Agregar ubicación si existe
        if (currentPost.wilaya) {
            params.append('wilaya', currentPost.wilaya);
        }
        
        // 3. Hacer la petición
        const url = `posts/similar?${params.toString()}`;
        console.log('📡 URL de búsqueda:', url);
        
        const similarRes = await getDataAPI(url, auth.token);
        
        console.log('✅ Posts similares encontrados:', {
            count: similarRes.data.posts.length,
            posts: similarRes.data.posts.map(p => ({
                id: p._id,
                categorie: p.categorie,
                titre: p.titre
            }))
        });
        
        // 4. Guardar en Redux
        dispatch({
            type: POST_TYPES.GET_SIMILAR_POSTS,
            payload: similarRes.data.posts || []
        });
        
        return {
            success: true,
            posts: similarRes.data.posts || []
        };
        
    } catch (err) {
        console.error('❌ Error completo en getSimilarPosts:', {
            message: err.message,
            response: err.response.data,
            status: err.response.status
        });
        
        // En caso de error, devolver array vacío
        dispatch({
            type: POST_TYPES.GET_SIMILAR_POSTS,
            payload: []
        });
        
        return {
            success: false,
            posts: [],
            error: err.message
        };
    }
},
 

updatePost: async (req, res) => {
    try {
        const { content, images } = req.body

        const post = await Posts.findOneAndUpdate({_id: req.params.id}, {
            content, images
        }).populate("user likes", "avatar username fullname")
        .populate({
            path: "comments",
            populate: {
                path: "user likes",
                select: "-password"
            }
        })

        res.json({
            msg: "Updated Post!",
            newPost: {
                ...post._doc,
                content, images
            }
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},


getUserPosts: async (req, res) => {
    try {
        const features = new APIfeatures(Posts.find({user: req.params.id}), req.query)
        .paginating()
        const posts = await features.query.sort("-createdAt")

        res.json({
            posts,
            result: posts.length
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getPost: async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id)
        .populate("user likes", "avatar username fullname followers")
        .populate({
            path: "comments",
            populate: {
                path: "user likes",
                select: "-password"
            }
        })

        if(!post) return res.status(400).json({msg: 'This post does not exist.'})

        res.json({
            post
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getPostsDicover: async (req, res) => {
    try {

        const newArr = [...req.user.following, req.user._id]

        const num  = req.query.num || 9

        const posts = await Posts.aggregate([
            { $match: { user : { $nin: newArr } } },
            { $sample: { size: Number(num) } },
        ])

        return res.json({
            msg: 'Success!',
            result: posts.length,
            posts
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
deletePost: async (req, res) => {
    try {
        const post = await Posts.findOneAndDelete({_id: req.params.id, user: req.user._id})
        await Comments.deleteMany({_id: {$in: post.comments }})

        res.json({
            msg: 'Deleted Post!',
            newPost: {
                ...post,
                user: req.user
            }
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
savePost: async (req, res) => {
    try {
        const user = await Users.find({_id: req.user._id, saved: req.params.id})
        if(user.length > 0) return res.status(400).json({msg: "You saved this post."})

        const save = await Users.findOneAndUpdate({_id: req.user._id}, {
            $push: {saved: req.params.id}
        }, {new: true})

        if(!save) return res.status(400).json({msg: 'This user does not exist.'})

        res.json({msg: 'Saved Post!'})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
unSavePost: async (req, res) => {
    try {
        const save = await Users.findOneAndUpdate({_id: req.user._id}, {
            $pull: {saved: req.params.id}
        }, {new: true})

        if(!save) return res.status(400).json({msg: 'This user does not exist.'})

        res.json({msg: 'unSaved Post!'})

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},
getSavePosts: async (req, res) => {
    try {
        const features = new APIfeatures(Posts.find({
            _id: {$in: req.user.saved}
        }), req.query).paginating()

        const savePosts = await features.query.sort("-createdAt")

        res.json({
            savePosts,
            result: savePosts.length
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
},


}

module.exports = postCtrl