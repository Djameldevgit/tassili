// pages/Home.js - VERSIÓN ACTUALIZADA PARA USAR REDUX
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategories, getPostsByCategory } from '../redux/actions/postAction';
import LoadIcon from '../images/loading.gif';

const Home = () => {
    const dispatch = useDispatch();
    const { homePosts, auth } = useSelector(state => state);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // 📌 Estado local para controlar qué categorías están expandidas
    const [expandedCategories, setExpandedCategories] = useState({});

    // 📌 Cargar categorías al inicio
    useEffect(() => {
        const loadData = async () => {
            try {
                console.log('🏠 Marketplace Home - Loading categories...');
                await dispatch(getCategories());
                setLoading(false);
            } catch (error) {
                console.error('Error loading categories:', error);
                setLoading(false);
            }
        };
        
        loadData();
    }, [dispatch]);

    // 📌 Cargar posts para categorías populares AUTOMÁTICAMENTE
    useEffect(() => {
        if (!loading && homePosts.categories) {
            const popularCategories = homePosts.categories
                .filter(cat => cat.count > 0)
                .slice(0, 4); // Reducir a 4 para no sobrecargar
            
            console.log('📥 Auto-loading posts for popular categories:', popularCategories.length);
            
            popularCategories.forEach(async (category, index) => {
                // Cargar 6 posts para cada categoría popular
                try {
                    await dispatch(getPostsByCategory(category.name, 1, { limit: 6 }));
                    // Auto-expandir las primeras 2 categorías
                    if (index < 2) {
                        setExpandedCategories(prev => ({ ...prev, [category.name]: true }));
                    }
                } catch (error) {
                    console.error(`Error loading posts for ${category.name}:`, error);
                }
            });
        }
    }, [loading, homePosts.categories, dispatch]);

    // 📌 Función para expandir/contraer categoría
    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
        
        // Si se expande y no tiene posts cargados, cargarlos
        if (!expandedCategories[categoryName] && !homePosts.categoryPosts?.[categoryName]) {
            dispatch(getPostsByCategory(categoryName, 1, { limit: 6 }));
        }
    };

    // 📌 Filtrar categorías por búsqueda
    const filteredCategories = homePosts.categories
        ?.filter(cat => cat.count > 0)
        .filter(cat => 
            cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cat.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

    // 📌 Obtener categorías populares
    const popularCategories = filteredCategories.slice(0, 8);

    return (
        <div className="marketplace-home">
            {/* HERO SECTION (se mantiene igual) */}
            <div className="hero-section text-center py-5">
                {/* ... Mismo código del hero section ... */}
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="container">
                {loading ? (
                    <div className="text-center py-5">
                        <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                        <p className="mt-2">Cargando categorías...</p>
                    </div>
                ) : filteredCategories.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="display-1 mb-3">🔍</div>
                        <h4 className="text-muted">No se encontraron categorías</h4>
                        <p className="text-muted">
                            {searchQuery 
                                ? `No hay categorías que coincidan con "${searchQuery}"`
                                : 'No hay categorías disponibles en este momento'
                            }
                        </p>
                        {searchQuery && (
                            <button 
                                className="btn btn-outline-primary"
                                onClick={() => setSearchQuery('')}
                            >
                                Ver todas las categorías
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="categories-container">
                        {/* LISTA DE CATEGORÍAS - AHORA USA REDUX */}
                        {popularCategories.map((category, categoryIndex) => {
                            // Obtener posts desde Redux, no desde estado local
                            const postsForCategory = homePosts.categoryPosts?.[category.name] || [];
                            const isExpanded = expandedCategories[category.name] || false;
                            
                            return (
                                <motion.div
                                    key={category.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: categoryIndex * 0.1 }}
                                    className="category-section mb-5"
                                >
                                    {/* CABECERA DE CATEGORÍA */}
                                    <div className="category-header d-flex justify-content-between align-items-center mb-4 p-4 bg-light rounded-3 shadow-sm">
                                        <div className="d-flex align-items-center">
                                            <div className="category-icon display-4 me-4">
                                                {category.emoji || '📁'}
                                            </div>
                                            <div>
                                                <h2 className="h3 fw-bold mb-2">
                                                    {category.name}
                                                </h2>
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="badge bg-primary">
                                                        {category.count} anuncios
                                                    </span>
                                                    {category.description && (
                                                        <small className="text-muted">
                                                            {category.description}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex gap-2">
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() => toggleCategory(category.name)}
                                            >
                                                {isExpanded ? 'Ocultar' : 'Ver'} anuncios
                                            </button>
                                            <Link 
                                                to={`/category/${category.name}`}
                                                className="btn btn-primary"
                                            >
                                                Ver todos →
                                            </Link>
                                        </div>
                                    </div>

                                    {/* POSTS DE LA CATEGORÍA (desde Redux) */}
                                    {isExpanded && (
                                        <div className="category-posts mb-4">
                                            {postsForCategory.length === 0 ? (
                                                <div className="text-center py-4">
                                                    <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                                    <span className="text-muted">Cargando anuncios...</span>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* GRID DE POSTS (desde Redux) */}
                                                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                                                        {postsForCategory.slice(0, 6).map((post, postIndex) => (
                                                            <motion.div
                                                                key={post._id}
                                                                className="col"
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: postIndex * 0.05 }}
                                                            >
                                                                <PostCardCompact post={post} />
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {/* FOOTER */}
                                                    <div className="category-footer mt-4 pt-3 border-top text-center">
                                                        <p className="text-muted mb-3">
                                                            Mostrando {Math.min(6, postsForCategory.length)} de {category.count} anuncios
                                                        </p>
                                                        <Link 
                                                            to={`/category/${category.name}`}
                                                            className="btn btn-outline-primary"
                                                        >
                                                            <i className="fas fa-external-link-alt me-2"></i>
                                                            Ver todos los anuncios
                                                        </Link>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {/* SEPARADOR */}
                                    {categoryIndex < popularCategories.length - 1 && (
                                        <hr className="my-5 opacity-25" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                {/* ESTADÍSTICAS Y CTA (se mantienen igual) */}
            </div>
        </div>
    );
};

// PostCardCompact (se mantiene igual)
// DENTRO DE Home.js - COMPONENTE PostCardCompact CORREGIDO
const PostCardCompact = ({ post }) => {
    // Asegúrate de que el post exista
    if (!post || !post._id) {
        console.error('❌ PostCardCompact recibió post inválido:', post);
        return null; // Importante: retornar algo
    }
    
    return (
        <Link to={`/post/${post._id}`} className="text-decoration-none">
            <div className="post-card-compact card border-0 shadow-sm h-100">
                {/* IMAGEN */}
                <div 
                    className="post-image position-relative" 
                    style={{
                        height: '200px',
                        backgroundImage: `url(${post.images?.[0]?.url || '/default-post.jpg'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderTopLeftRadius: '12px',
                        borderTopRightRadius: '12px'
                    }}
                >
                    {/* OVERLAY PARA TÍTULO */}
                    <div 
                        className="position-absolute bottom-0 start-0 end-0 p-3" 
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)'
                        }}
                    >
                        <h6 
                            className="text-white fw-bold mb-1" 
                            style={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                            }}
                        >
                            {post.description?.substring(0, 70) || 'Producto en venta'}...
                        </h6>
                    </div>
                    
                    {/* BADGE DE PRECIO */}
                    {post.prix && (
                        <div className="position-absolute top-0 end-0 m-2">
                            <span className="badge bg-success px-3 py-2">
                                <strong>{post.prix.toLocaleString()} DA</strong>
                            </span>
                        </div>
                    )}
                </div>
                
                {/* DETALLES */}
                <div className="card-body p-3">
                    {/* UBICACIÓN Y FECHA */}
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        {post.wilaya ? (
                            <div className="d-flex align-items-center text-muted small">
                                <i className="fas fa-map-marker-alt me-1"></i>
                                <span>{post.wilaya}</span>
                            </div>
                        ) : (
                            <div></div>
                        )}
                        
                        <small className="text-muted">
                            <i className="far fa-clock me-1"></i>
                            {post.createdAt ? 
                                new Date(post.createdAt).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short'
                                }) : 'Fecha no disponible'
                            }
                        </small>
                    </div>
                    
                    {/* CATEGORÍA */}
                    {post.categorie && (
                        <div className="mb-2">
                            <span className="badge bg-light text-dark border">
                                {post.categorie}
                            </span>
                        </div>
                    )}
                    
                    {/* ESTADO (si existe) */}
                    {post.etat && (
                        <div className="d-flex justify-content-between align-items-center">
                            <small className={`
                                ${post.etat.includes('Neuf') ? 'text-success' : 
                                  post.etat.includes('Bon') ? 'text-primary' : 
                                  'text-warning'}
                            `}>
                                <i className="fas fa-certificate me-1"></i>
                                {post.etat}
                            </small>
                            <small className="text-muted">
                                <i className="far fa-eye me-1"></i>
                                {post.views || 0}
                            </small>
                        </div>
                    )}
                </div>
                
                {/* ESTILOS INLINE - Asegúrate de que sean válidos */}
                <style jsx="true">{`
                    .post-card-compact {
                        transition: all 0.3s ease;
                        border-radius: 12px;
                        overflow: hidden;
                    }
                    
                    .post-card-compact:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 15px 35px rgba(0,0,0,0.1) !important;
                    }
                `}</style>
            </div>
        </Link>
    );
};

export default Home;