const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    // Campos base (siempre presentes)
 
    wilaya: { type: String },
    commune: { type: String },
    telefono: { type: String },
    
    // Categorías
    categorie: { type: String, required: true, index: true },
    subCategory: { type: String, index: true },
    articleType: { type: String }, // Para immobilier
    
    // Campos dinámicos organizados
    categorySpecificData: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {}
    },
    // Campos indexados para búsqueda rápida
    searchKeywords: [{ type: String, index: true }],
    
    // Metadatos
    images: [{ url: String, public_id: String }],
    user: { type: mongoose.Types.ObjectId, ref: 'user' },
    likes: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
   
    
  }, { timestamps: true });
  
  // Índices compuestos para búsqueda eficiente
  postSchema.index({ categorie: 1, subCategory: 1 });
  postSchema.index({ 'specificData.marque': 1 });
  postSchema.index({ 'specificData.etat': 1 });
  postSchema.index({ price: 1 });
  postSchema.index({ wilaya: 1, commune: 1 });

module.exports = mongoose.model('post', postSchema)