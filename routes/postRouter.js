const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

// routes/postRouter.js - AGREGAR NUEVAS RUTAS
// routes/postRouter.js - VERIFICAR QUE ESTÉN ESTAS RUTAS
 

// 📌 RUTAS DE POSTS
router.route('/posts')
    .post(auth, postCtrl.createPost)      // POST /api/posts
    .get(  postCtrl.getPosts);        // GET /api/posts

    router.route('/post/:id')
    .patch(auth, postCtrl.updatePost)
    .get( postCtrl.getPost)
    .delete(auth, postCtrl.deletePost)
// 📌 RUTAS DE CATEGORÍAS (NUEVAS)
router.get('/posts/category/:category',   postCtrl.getPostsByCategory);
router.get('/categories/all', postCtrl.getAllCategoriesPaginated);
router.get('/categories/paginated', postCtrl.getAllCategoriesPaginated); // Nueva
// 📌 RUTAS EXISTENTES (verifica que estén)
 
router.get('/user_posts/:id', auth, postCtrl.getUserPosts);
router.get('/post_discover', auth, postCtrl.getPostsDicover);
router.patch('/savePost/:id', auth, postCtrl.savePost);
router.patch('/unSavePost/:id', auth, postCtrl.unSavePost);
router.get('/getSavePosts', auth, postCtrl.getSavePosts);

module.exports = router;
 