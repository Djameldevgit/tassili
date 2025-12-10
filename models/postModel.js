const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    // ==================== CAMPOS DEL SISTEMA ====================
    categorie: {
        type: String,
        required: [true, 'La catégorie est obligatoire']
    },
    subCategory: {
        type: String,
        required: [true, 'La sous-catégorie est obligatoire']
    },
    
    
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    
    images: [], // Mantén igual que antes
    
    // ==================== CAMPOS PARA FRONTEND (COMPATIBILIDAD) ====================
    // Estos campos deben existir para que tu UI funcione
    title: String,
    description: String,
    content: String,  // ← IMPORTANTE: tu frontend usa este campo
    price: Number,
    wilaya: String,
    commune: String,
    telefono: String,  // ← Usa el nombre que espera tu frontend
    
    // ==================== CAMPOS DINÁMICOS (2 FORMAS) ====================
    // Opción A: Campo estructurado (recomendado a largo plazo)
    specificData: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    
    // Opción B: Campo plano para compatibilidad inmediata
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    
    // ==================== METADATOS ====================
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'sold', 'expired', 'hidden', 'pending']
    },
    views: { type: Number, default: 0 },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  
    
}, {
    timestamps: true,
    strict: false  // ← 🔥 MANTÉN ESTO PARA COMPATIBILIDAD
})

// Índices
postSchema.index({ categorie: 1, subCategory: 1, status: 1 })
postSchema.index({ user: 1, createdAt: -1 })
postSchema.index({ 'data.wilaya': 1 })
postSchema.index({ 'data.price': 1 })
postSchema.index({ price: 1 })

module.exports = mongoose.model('post', postSchema)