const Store = require('../models/storeModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')

const storeCtrl = {
  // 🏪 Crear tienda
// storeActions.js - Actualizado para Error 500
createStore: async (req, res) => {
  console.log('=== BACKEND: createStore ===')
  console.log('req.user:', req.user ? 'Usuario existe' : 'NO hay usuario')
  console.log('req.body:', JSON.stringify(req.body, null, 2))
  
  try {
    // 1. Verificar autenticación
    if (!req.user || !req.user._id) {
      return res.status(401).json({ 
        success: false,
        msg: 'Non authentifié' 
      })
    }

    const { 
      name, 
      description, 
      category, 
      plan = 'Free',
      duration = 30,
      price = 0,
      credits = 0,
      storage = 100,
      originalPlan = null
    } = req.body

    // 2. Validaciones básicas
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        success: false,
        msg: 'Le nom de la boutique est obligatoire' 
      })
    }

    if (!category) {
      return res.status(400).json({ 
        success: false,
        msg: 'La catégorie est obligatoire' 
      })
    }

    // 3. Verificar si el usuario ya tiene tienda
    const existingStore = await Store.findOne({ owner: req.user._id })
    if (existingStore) {
      return res.status(400).json({ 
        success: false,
        msg: 'Vous avez déjà une boutique' 
      })
    }

    // 4. Crear objeto de tienda
    const storeData = {
      owner: req.user._id,
      name: name.trim(),
      description: (description || 'Nouvelle boutique').trim(),
      category: category,
      plan: plan,
      duration: parseInt(duration),
      price: parseFloat(price),
      credits: parseInt(credits),
      storage: parseInt(storage),
      originalPlan: originalPlan,
      isActive: true,
      verified: false,
      address: {
        country: 'Algeria'
      }
    }

    console.log('📦 Données de la boutique à créer:', storeData)
    
    // 5. Crear y guardar la tienda
    const newStore = new Store(storeData)
    const savedStore = await newStore.save()
    
    console.log('✅ Boutique créée avec succès:', {
      id: savedStore._id,
      name: savedStore.name,
      category: savedStore.category,
      plan: savedStore.plan
    })

    // 6. Actualizar usuario
    try {
      await User.findByIdAndUpdate(
        req.user._id,
        {
          $set: { hasStore: true },
          $push: { stores: savedStore._id }
        },
        { new: true }
      )
      console.log('✅ Utilisateur mis à jour')
    } catch (userError) {
      console.warn('⚠️ Erreur lors de la mise à jour utilisateur:', userError.message)
    }

    // 7. Responder con éxito
    res.status(201).json({
      success: true,
      msg: 'Boutique créée avec succès! 🎉',
      store: savedStore
    })

  } catch (err) {
    console.error('❌ ERREUR CRITIQUE dans createStore:')
    console.error('Message:', err.message)
    console.error('Stack:', err.stack)
    
    // Manejo de errores específicos
    if (err.name === 'ValidationError') {
      const errors = {}
      for (const field in err.errors) {
        errors[field] = err.errors[field].message
      }
      return res.status(400).json({
        success: false,
        msg: 'Erreur de validation',
        errors
      })
    }
    
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        msg: 'Une boutique avec ce nom existe déjà'
      })
    }
    
    // Error general
    res.status(500).json({
      success: false,
      msg: 'Erreur lors de la création de la boutique',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
},

  // 📋 Obtener todas las tiendas (con paginación)
  getAllStores: async (req, res) => {
    try {
      const { page = 1, limit = 20, category, plan } = req.query
      
      const query = {}
      if (category) query.category = category
      if (plan) query.plan = plan
      
      const stores = await Store.find(query)
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      
      const total = await Store.countDocuments(query)
      
      res.json({
        success: true,
        stores,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
      })
      
    } catch (err) {
      console.error('❌ Error en getAllStores:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtenir les boutiques.' 
      })
    }
  },
  // 👤 Obtener tiendas por usuario
  getStoresByUser: async (req, res) => {
    try {
      const { id } = req.params
      const stores = await Store.find({ owner: id })
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })

      res.json({
        stores,
        count: stores.length
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error al obtener tiendas del usuario.' })
    }
  },

  // 🏪 Obtener una tienda específica
  getStoreById: async (req, res) => {
    try {
      const { id } = req.params
      const store = await Store.findById(id)
        .populate('owner', 'name email phone')
        .populate({
          path: 'products',
          model: 'Post',
          match: { isActive: true },
          options: { limit: 12, sort: { createdAt: -1 } }
        })

      if (!store) {
        return res.status(404).json({ msg: 'Tienda no encontrada.' })
      }

      // Incrementar vistas si no es el dueño
      if (req.user._id.toString() !== store.owner._id.toString()) {
        store.stats.totalViews += 1
        await store.save()
      }

      res.json(store)

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error al obtener la tienda.' })
    }
  },

  // ✏️ Actualizar tienda
  updateStore: async (req, res) => {
    try {
      const { id } = req.params
      const store = await Store.findById(id)

      if (!store) {
        return res.status(404).json({ msg: 'Tienda no encontrada.' })
      }

      // Verificar permisos
      if (store.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          msg: 'No tienes permiso para modificar esta tienda.' 
        })
      }

      // No permitir cambiar el owner
      if (req.body.owner) {
        delete req.body.owner
      }

      const updated = await Store.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      }).populate('owner', 'name email')

      res.json({ 
        msg: 'Tienda actualizada con éxito.', 
        store: updated 
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error al actualizar la tienda.' })
    }
  },

  // ⬆️ Cambiar plan
  changePlan: async (req, res) => {
    try {
      const { id } = req.params
      const { plan } = req.body

      if (!['Free', 'Pro', 'Premium'].includes(plan)) {
        return res.status(400).json({ msg: 'Plan no válido.' })
      }

      const store = await Store.findById(id)
      
      if (!store) {
        return res.status(404).json({ msg: 'Tienda no encontrada.' })
      }

      if (store.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          msg: 'No tienes permiso para cambiar el plan.' 
        })
      }

      store.plan = plan
      await store.save()

      res.json({ 
        msg: `Plan actualizado a ${plan} exitosamente.`, 
        store 
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error al cambiar el plan.' })
    }
  },

  // ❌ Eliminar tienda
  deleteStore: async (req, res) => {
    try {
      const { id } = req.params
      const store = await Store.findById(id)

      if (!store) {
        return res.status(404).json({ msg: 'Tienda no encontrada.' })
      }

      // Verificar permisos
      if (store.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          msg: 'No tienes permiso para eliminar esta tienda.' 
        })
      }

      // Actualizar usuario
      await User.findByIdAndUpdate(store.owner, { hasStore: false })

      // Eliminar tienda
      await Store.findByIdAndDelete(id)

      res.json({ 
        msg: 'Tienda eliminada correctamente.' 
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error al eliminar la tienda.' })
    }
  },

  // 🔍 Buscar tiendas
  searchStores: async (req, res) => {
    try {
      const { q, category, city } = req.query
      
      const query = { isActive: true }
      
      if (q) {
        query.$or = [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      }
      
      if (category) query.category = category
      if (city) query['address.city'] = city

      const stores = await Store.find(query)
        .populate('owner', 'name')
        .limit(50)
        .sort({ 'stats.totalViews': -1 })

      res.json({
        stores,
        count: stores.length
      })

    } catch (err) {
      console.error(err)
      res.status(500).json({ msg: 'Error buscando tiendas.' })
    }
  },





  getPublicStores: async (req, res) => {
    try {
      const { 
        page = 1, 
        limit = 12, 
        category, 
        city, 
        plan,
        sort = 'newest'
      } = req.query
      
      // Construir query
      const query = { isActive: true }
      
      if (category && category !== 'all') {
        query.category = category
      }
      
      if (city && city !== 'all') {
        query['address.city'] = city
      }
      
      if (plan && plan !== 'all') {
        query.plan = plan
      }
      
      // Ordenamiento
      let sortOption = {}
      switch(sort) {
        case 'newest':
          sortOption = { createdAt: -1 }
          break
        case 'oldest':
          sortOption = { createdAt: 1 }
          break
        case 'views':
          sortOption = { 'stats.totalViews': -1 }
          break
        case 'favorites':
          sortOption = { 'stats.totalFavorites': -1 }
          break
        case 'name':
          sortOption = { name: 1 }
          break
        case 'products':
          sortOption = { 'stats.totalProducts': -1 }
          break
        default:
          sortOption = { createdAt: -1 }
      }
      
      // Ejecutar consulta
      const stores = await Store.find(query)
        .select('-socialLinks -planFeatures -verified -__v') // Excluir campos sensibles
        .populate('owner', 'name avatar username email')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      
      const total = await Store.countDocuments(query)
      
      // Obtener estadísticas para filtros
      const categories = await Store.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
      
      const cities = await Store.aggregate([
        { $match: { isActive: true, 'address.city': { $exists: true, $ne: '' } } },
        { $group: { _id: '$address.city', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ])
      
      res.json({
        success: true,
        stores,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        filters: {
          categories: categories.map(cat => ({ name: cat._id, count: cat.count })),
          cities: cities.map(city => ({ name: city._id, count: city.count })),
          plans: [
            { name: 'Free', count: await Store.countDocuments({ plan: 'Free', isActive: true }) },
            { name: 'Pro', count: await Store.countDocuments({ plan: 'Pro', isActive: true }) },
            { name: 'Premium', count: await Store.countDocuments({ plan: 'Premium', isActive: true }) }
          ]
        }
      })
      
    } catch (err) {
      console.error('❌ Error en getPublicStores:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtener las boutiques' 
      })
    }
  },
  
  // 🔍 Buscar stores públicas
  searchPublicStores: async (req, res) => {
    try {
      const { 
        q, 
        page = 1, 
        limit = 12, 
        sort = 'relevance' 
      } = req.query
      
      if (!q || q.trim() === '') {
        return res.status(400).json({ 
          success: false,
          msg: 'Terme de recherche requis' 
        })
      }
      
      const query = {
        isActive: true,
        $or: [
          { name: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } },
          { category: { $regex: q, $options: 'i' } }
        ]
      }
      
      // Ordenamiento para búsqueda
      let sortOption = {}
      if (sort === 'relevance') {
        // Podrías implementar lógica de relevancia aquí
        sortOption = { createdAt: -1 }
      } else if (sort === 'newest') {
        sortOption = { createdAt: -1 }
      } else if (sort === 'views') {
        sortOption = { 'stats.totalViews': -1 }
      }
      
      const stores = await Store.find(query)
        .select('-socialLinks -planFeatures -verified -__v')
        .populate('owner', 'name avatar username')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      
      const total = await Store.countDocuments(query)
      
      res.json({
        success: true,
        stores,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        searchTerm: q
      })
      
    } catch (err) {
      console.error('❌ Error en searchPublicStores:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error en la búsqueda' 
      })
    }
  },
  
  // 🏪 Obtener stores por categoría (para mostrar en categorías)
  getStoresByCategory: async (req, res) => {
    try {
      const { category } = req.params
      const { page = 1, limit = 12, sort = 'newest' } = req.query
      
      // Validar categoría
      if (!category) {
        return res.status(400).json({ 
          success: false,
          msg: 'Catégorie requise' 
        })
      }
      
      const query = { 
        category,
        isActive: true 
      }
      
      // Ordenamiento
      let sortOption = {}
      if (sort === 'newest') sortOption = { createdAt: -1 }
      else if (sort === 'oldest') sortOption = { createdAt: 1 }
      else if (sort === 'views') sortOption = { 'stats.totalViews': -1 }
      else if (sort === 'favorites') sortOption = { 'stats.totalFavorites': -1 }
      
      const stores = await Store.find(query)
        .select('-socialLinks -planFeatures -verified -__v')
        .populate('owner', 'name avatar username')
        .sort(sortOption)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      
      const total = await Store.countDocuments(query)
      
      // Obtener subcategorías si existen en tu modelo
      // (puedes adaptar esto según tu estructura)
      
      res.json({
        success: true,
        stores,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        category,
        hasSubcategories: false // Cambiar si implementas subcategorías
      })
      
    } catch (err) {
      console.error('❌ Error en getStoresByCategory:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtener boutiques par catégorie' 
      })
    }
  },
  
  // 📊 Obtener estadísticas de stores por categoría
  getStoreCategoriesStats: async (req, res) => {
    try {
      const categories = await Store.aggregate([
        { $match: { isActive: true } },
        { 
          $group: { 
            _id: '$category',
            count: { $sum: 1 },
            totalViews: { $sum: '$stats.totalViews' },
            totalFavorites: { $sum: '$stats.totalFavorites' },
            totalProducts: { $sum: '$stats.totalProducts' }
          }
        },
        { $sort: { count: -1 } }
      ])
      
      // Agregar emojis para categorías
      const categoryEmojis = {
        'Alimentaire': '🍎',
        'Vêtements': '👕',
        'Électronique': '📱',
        'Immobilier': '🏠',
        'Automobiles': '🚗',
        'Services': '🔧',
        'Informatique': '💻',
        'Mobiliers': '🛋️',
        'Loisirs': '🎮',
        'Sport': '⚽',
        'Voyages': '✈️',
        'Emploi': '💼',
        'Matériaux': '🧱',
        'Électroménager': '🔌',
        'Pièces détachées': '⚙️',
        'Santé & Beauté': '💄'
      }
      
      const categoriesWithEmojis = categories.map(cat => ({
        name: cat._id,
        emoji: categoryEmojis[cat._id] || '🏪',
        count: cat.count,
        totalViews: cat.totalViews || 0,
        totalFavorites: cat.totalFavorites || 0,
        totalProducts: cat.totalProducts || 0
      }))
      
      // Contar total de stores
      const totalStores = await Store.countDocuments({ isActive: true })
      
      res.json({
        success: true,
        categories: categoriesWithEmojis,
        totalStores,
        stats: {
          totalViews: categories.reduce((sum, cat) => sum + (cat.totalViews || 0), 0),
          totalFavorites: categories.reduce((sum, cat) => sum + (cat.totalFavorites || 0), 0),
          totalProducts: categories.reduce((sum, cat) => sum + (cat.totalProducts || 0), 0)
        }
      })
      
    } catch (err) {
      console.error('❌ Error en getStoreCategoriesStats:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtener estadísticas' 
      })
    }
  },
  
  // 👤 Obtener stores por usuario (pública)
  getPublicStoresByUser: async (req, res) => {
    try {
      const { id } = req.params
      const { page = 1, limit = 12 } = req.query
      
      const stores = await Store.find({ 
        owner: id, 
        isActive: true 
      })
        .select('-socialLinks -planFeatures -verified -__v')
        .populate('owner', 'name avatar username')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
      
      const total = await Store.countDocuments({ owner: id, isActive: true })
      
      // Obtener info del usuario
      const user = await User.findById(id).select('name avatar username email')
      
      res.json({
        success: true,
        stores,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        user
      })
      
    } catch (err) {
      console.error('❌ Error en getPublicStoresByUser:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtener boutiques de l\'utilisateur' 
      })
    }
  },
  
  // 🏪 Obtener una store específica (pública)
  getPublicStoreById: async (req, res) => {
    try {
      const { id } = req.params
      
      const store = await Store.findById(id)
        .select('-socialLinks -__v') // Excluir campos sensibles
        .populate('owner', 'name avatar username email phone')
      
      if (!store) {
        return res.status(404).json({ 
          success: false,
          msg: 'Boutique non trouvée' 
        })
      }
      
      if (!store.isActive) {
        return res.status(403).json({ 
          success: false,
          msg: 'Cette boutique n\'est pas active' 
        })
      }
      
      // Incrementar vistas
      store.stats.totalViews += 1
      await store.save()
      
      // Obtener stores similares (misma categoría)
      const similarStores = await Store.find({
        _id: { $ne: store._id },
        category: store.category,
        isActive: true
      })
        .select('name category plan stats logoUrl')
        .limit(4)
        .sort({ 'stats.totalViews': -1 })
      
      res.json({
        success: true,
        store,
        similarStores,
        ownerInfo: store.owner
      })
      
    } catch (err) {
      console.error('❌ Error en getPublicStoreById:', err)
      res.status(500).json({ 
        success: false,
        msg: 'Error al obtener la boutique' 
      })
    }
  }


  
}

module.exports = storeCtrl