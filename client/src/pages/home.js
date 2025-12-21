// pages/Home.js - VERSIÓN CON PAGINACIÓN DE CATEGORÍAS
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getCategories, getPostsByCategory } from '../redux/actions/postAction';
import LoadIcon from '../images/loading.gif';
import HeaderCarousel from '../components/SlidersHeadrs/HeaderCarousel';
import CategorySlider from '../components/SlidersHeadrs/CategorySlider';
import CategorySliderEmoji from '../components/SlidersHeadrs/CategorySlderEmoji';

const Home = () => {
    const dispatch = useDispatch();
    const { homePosts } = useSelector(state => state);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    
    const observerRef = useRef();
    const lastCategoryRef = useRef();

    // 📌 Cargar PRIMERAS 2 categorías al inicio
    useEffect(() => {
        const loadInitialData = async () => {
            try {
                console.log('🏠 Home - Cargando primeras 2 categorías...');
                await dispatch(getCategories(1, 2));
                setLoading(false);
            } catch (error) {
                console.error('Error loading categories:', error);
                setLoading(false);
            }
        };
        
        loadInitialData();
    }, [dispatch]);

    // 📌 Cargar 6 posts para cada categoría cargada
    useEffect(() => {
        if (!loading && homePosts.categories && homePosts.categories.length > 0) {
            console.log('📥 Cargando posts para categorías visibles...');
            
            homePosts.categories.forEach(async (category, index) => {
                // Solo cargar si no tiene posts ya
                if (!homePosts.categoryPosts?.[category.name]) {
                    setTimeout(async () => {
                        try {
                            await dispatch(getPostsByCategory(category.name, 1, { limit: 6 }));
                        } catch (error) {
                            console.error(`Error loading posts for ${category.name}:`, error);
                        }
                    }, index * 300);
                }
            });
        }
    }, [loading, homePosts.categories, dispatch]);

    // 📌 Función para cargar MÁS categorías (scroll infinito)
    const loadMoreCategories = useCallback(async () => {
        if (loadingMore || !homePosts.categoriesHasMore) return;
        
        setLoadingMore(true);
        try {
            const nextPage = (homePosts.categoriesPage || 0) + 1;
            console.log(`📥 Cargando página ${nextPage} de categorías...`);
            
            await dispatch(getCategories(nextPage, 2));
        } catch (error) {
            console.error('Error loading more categories:', error);
        } finally {
            setLoadingMore(false);
        }
    }, [dispatch, loadingMore, homePosts.categoriesHasMore, homePosts.categoriesPage]);

    // 📌 Observer para scroll infinito
    useEffect(() => {
        if (loading || !homePosts.categoriesHasMore) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && homePosts.categoriesHasMore) {
                    loadMoreCategories();
                }
            },
            { threshold: 0.5 }
        );
        
        if (lastCategoryRef.current) {
            observer.observe(lastCategoryRef.current);
        }
        
        return () => {
            if (lastCategoryRef.current) {
                observer.unobserve(lastCategoryRef.current);
            }
        };
    }, [loading, homePosts.categories, homePosts.categoriesHasMore, loadMoreCategories]);

    // 📌 Filtrar categorías por búsqueda
    const filteredCategories = homePosts.categories
        ?.filter(cat => 
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

    return (
        <div className="marketplace-home">
 
<HeaderCarousel/>
<CategorySlider/>
 

            <div className="hero-section text-center py-3">
                <div className="search-bar mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0 py-2">
                            <i className="fas fa-search text-muted"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 py-2"
                            placeholder="Buscar categorías..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="container">
                {loading ? (
                    <div className="text-center py-5">
                        <img src={LoadIcon} alt="loading" className="d-block mx-auto" width="40" />
                        <p className="mt-2 text-muted small">Cargando categorías...</p>
                    </div>
                ) : (
                    <div className="categories-container">
                        {/* LISTA DE CATEGORÍAS CON PAGINACIÓN */}
                        {filteredCategories.map((category, index) => {
                            const postsForCategory = homePosts.categoryPosts?.[category.name] || [];
                            const isLastCategory = index === filteredCategories.length - 1;
                            
                            return (
                                <div 
                                    key={category.name}
                                    ref={isLastCategory ? lastCategoryRef : null}
                                    className="category-section mb-3"
                                >
                                    {/* HEADER DE CATEGORÍA */}
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <div className="d-flex align-items-center">
                                            <span className="me-1" style={{ fontSize: '0.7rem' }}>
                                                {category.emoji || '📁'}
                                            </span>
                                            <div>
                                                <h2 className="h5 fw-bold mb-0">
                                                    {category.name}
                                                </h2>
                                                <small className="text-muted">
                                                    {category.count} anuncios
                                                </small>
                                            </div>
                                        </div>
                                        
                                        <Link 
                                            to={`/category/${category.name}`}
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Ver más
                                        </Link>
                                    </div>

                                    {/* 6 POSTS POR CATEGORÍA */}
                                    {postsForCategory.length > 0 ? (
                                        <div className="row g-2 mb-2">
                                            {postsForCategory.slice(0, 6).map((post) => (
                                                <div key={post._id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                                    <PostCardCompact post={post} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-2">
                                            <small className="text-muted">
                                                <i className="fas fa-spinner fa-spin me-1"></i>
                                                Cargando anuncios...
                                            </small>
                                        </div>
                                    )}
                                    
                                    {/* SEPARADOR DELGADO */}
                                    {index < filteredCategories.length - 1 && (
                                        <hr className="my-2 opacity-10" />
                                    )}
                                </div>
                            );
                        })}
                        
                        {/* LOADING MORE INDICATOR */}
                        {loadingMore && (
                            <div className="text-center py-3">
                                <div className="spinner-border spinner-border-sm text-primary me-2"></div>
                                <span className="text-muted small">Cargando más categorías...</span>
                            </div>
                        )}
                        
                        {/* NO MORE CATEGORIES MESSAGE */}
                        {!homePosts.categoriesHasMore && filteredCategories.length > 0 && (
                            <div className="text-center py-3">
                                <p className="text-muted small">
                                    <i className="fas fa-check-circle text-success me-1"></i>
                                    Todas las categorías cargadas
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            {/* ESTILOS */}
            <style jsx>{`
                .marketplace-home {
                    min-height: 100vh;
                    background: #f8f9fa;
                }
                
                .hero-section {
                    background: white;
                    border-bottom: 1px solid #e9ecef;
                    padding: 1rem;
                }
                
                .search-bar {
                    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
                }
                
                .category-section {
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    border: 1px solid #e9ecef;
                }
            `}</style>
        </div>
    );
};

// PostCardCompact (versión compacta - la misma de antes)
const PostCardCompact = ({ post }) => {
    if (!post || !post._id) return null;
    
    const firstImage = post.images?.[0]?.url || '/default-post.jpg';
    const title = post.description?.substring(0, 40) || 'Producto';
    
    return (
        <Link to={`/post/${post._id}`} className="text-decoration-none">
            <div className="post-card-compact card border-0">
                <div 
                    className="post-image rounded" 
                    style={{
                        height: '120px',
                        backgroundImage: `url(${firstImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative'
                    }}
                >
                    {post.prix && (
                        <div className="position-absolute bottom-0 start-0 m-1">
                            <span className="badge bg-dark bg-opacity-75 px-2 py-1" style={{ fontSize: '0.7rem' }}>
                                {post.prix.toLocaleString()} DA
                            </span>
                        </div>
                    )}
                </div>
                
                <div className="card-body p-2">
                    <p 
                        className="card-text mb-1 text-dark" 
                        style={{
                            fontSize: '0.8rem',
                            lineHeight: '1.2',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {title}...
                    </p>
                    
                    {post.wilaya && (
                        <small className="text-muted d-block" style={{ fontSize: '0.7rem' }}>
                            <i className="fas fa-map-marker-alt me-1"></i>
                            {post.wilaya}
                        </small>
                    )}
                </div>
                
                <style jsx>{`
                    .post-card-compact {
                        transition: all 0.2s ease;
                        border-radius: 6px;
                        overflow: hidden;
                    }
                    
                    .post-card-compact:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    }
                `}</style>
            </div>
        </Link>
    );
};

export default Home;