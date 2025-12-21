// pages/CategoryPage.js - VERSIÓN CORREGIDA
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Posts from '../../components/home/Posts';
import { getPostsByCategory, getCategories } from '../../redux/actions/postAction';
import LoadIcon from '../../images/loading.gif';
import CategorySliderEmoji from '../../components/SlidersHeadrs/CategorySlderEmoji';

const CategoryPage = () => {
    const dispatch = useDispatch();
    const { categoryName } = useParams();
    const { homePosts } = useSelector(state => state);
    
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(12);
    
    // 📌 DEBUG
    useEffect(() => {
        console.log('🔍 CategoryPage Mounted:', {
            categoryName,
            homePosts: {
                postsCount: homePosts.posts?.length,
                category: homePosts.category,
                categoriesCount: homePosts.categories?.length,
                result: homePosts.result
            }
        });
    }, [categoryName, homePosts]);
    
    // 📌 Obtener información de la categoría
    const currentCategory = homePosts.categories?.find(
        cat => cat.name === categoryName
    );
    
    // 📌 Cargar categorías si no están cargadas
    useEffect(() => {
        if (!homePosts.categories || homePosts.categories.length === 0) {
            dispatch(getCategories());
        }
    }, [dispatch, homePosts.categories]);
    
    // 📌 Cargar posts de la categoría
    useEffect(() => {
        const loadCategoryPosts = async () => {
            if (!categoryName) return;
            
            setLoading(true);
            console.log(`📂 CategoryPage - Loading posts for: ${categoryName}`);
            
            try {
                const result = await dispatch(getPostsByCategory(categoryName, 1, { limit }));
                console.log(`✅ CategoryPage - Load result:`, {
                    success: !!result,
                    postsCount: result?.posts?.length,
                    total: result?.total
                });
                setPage(2);
            } catch (error) {
                console.error('❌ CategoryPage - Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        };
        
        loadCategoryPosts();
    }, [dispatch, categoryName, limit]);
    
    // 📌 Cargar más posts
    const loadMorePosts = async () => {
        console.log(`📥 Loading more posts, page ${page}`);
        try {
            await dispatch(getPostsByCategory(categoryName, page, { limit }));
            setPage(prev => prev + 1);
        } catch (error) {
            console.error('Error loading more posts:', error);
        }
    };
    
    // 📌 Contar posts totales cargados
    const totalLoaded = homePosts.posts?.length || 0;
    const hasMore = currentCategory && totalLoaded < currentCategory.count;
    
    // 📌 Verificar si hay posts después de cargar
    useEffect(() => {
        if (!loading && homePosts.posts) {
            console.log('📊 After loading:', {
                loading,
                postsCount: homePosts.posts.length,
                categoryInState: homePosts.category,
                requestedCategory: categoryName
            });
        }
    }, [loading, homePosts.posts, homePosts.category, categoryName]);
    
    if (!categoryName) {
        return (
            <div className="text-center py-5">
                <h4>Categoría no especificada</h4>
                <Link to="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
            </div>
        );
    }
    
    return (
        <div className="category-posts-page container py-4">
            {/* BREADCRUMB */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <i className="fas fa-home me-1"></i>
                            Inicio
                        </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {categoryName}
                    </li>
                </ol>
            </nav>
            
        
            
            {/* POSTS */}
            {loading ? (
                <div className="text-center py-5">
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                    <p className="mt-2">Cargando anuncios de {categoryName}...</p>
                </div>
            ) : (
                <>
                    {/* DEBUG: Mostrar info de posts */}
                    <div >
                     <CategorySliderEmoji/>
                    </div>
                    
                    {/* COMPONENTE POSTS */}
                    <Posts 
                        selectedCategory={categoryName}
                        fromCategoryPage={true}
                    />
                    
                    {/* PAGINACIÓN */}
                    {hasMore && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center mt-5 pt-4 border-top"
                        >
                            <button
                                className="btn btn-primary btn-lg px-5"
                                onClick={loadMorePosts}
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                        Cargando...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-plus-circle me-2"></i>
                                        Cargar más anuncios ({currentCategory.count - totalLoaded} restantes)
                                    </>
                                )}
                            </button>
                            <p className="text-muted mt-2">
                                Página {page - 1} • {totalLoaded} de {currentCategory.count} anuncios
                            </p>
                        </motion.div>
                    )}
                    
                    {/* VOLVER A HOME */}
                    <div className="text-center mt-5">
                        <Link to="/" className="btn btn-outline-secondary">
                            <i className="fas fa-arrow-left me-2"></i>
                            Volver al inicio
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoryPage;