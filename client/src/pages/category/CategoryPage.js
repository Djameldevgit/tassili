import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Row, 
    Col, 
    Container,
    Button,
    Badge,
    ProgressBar,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
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
    const scrollContainerRef = useRef(null);
    
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
    
    // 📌 Función para hacer scroll horizontal con flechas del teclado
    const scrollHorizontal = (direction) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 350;
            const container = scrollContainerRef.current;
            
            if (direction === 'left') {
                container.scrollLeft -= scrollAmount;
            } else {
                container.scrollLeft += scrollAmount;
            }
        }
    };
    
    // 📌 Contar posts totales cargados
    const totalLoaded = homePosts.posts?.length || 0;
    const hasMore = currentCategory && totalLoaded < currentCategory.count;
    
    // 📌 Calcular progreso de carga
    const progressPercentage = currentCategory 
        ? Math.min((totalLoaded / currentCategory.count) * 100, 100)
        : 0;
    
    if (!categoryName) {
        return (
            <Container className="text-center py-5">
                <h4>Categoría no especificada</h4>
                <Link to="/" className="btn btn-primary">
                    Volver al inicio
                </Link>
            </Container>
        );
    }
    
    return (
        <Container className="category-posts-page py-4">
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
                        {currentCategory && (
                            <Badge bg="secondary" className="ms-2">
                                {currentCategory.count} anuncios
                            </Badge>
                        )}
                    </li>
                </ol>
            </nav>
            
            {/* SLIDER DE CATEGORÍAS */}
            <div className="mb-4">
                <CategorySliderEmoji />
            </div>
            
            {/* ENCABEZADO DE CATEGORÍA */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <h2 className="mb-0">
                        <i className="fas fa-tag me-2 text-primary"></i>
                        {categoryName}
                    </h2>
                    <p className="text-muted mb-0">
                        {currentCategory ? `${totalLoaded} de ${currentCategory.count} anuncios cargados` : 'Cargando...'}
                    </p>
                </Col>
                <Col xs="auto">
                    <div className="d-flex gap-2">
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Desplazar izquierda</Tooltip>}
                        >
                            <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => scrollHorizontal('left')}
                                className="rounded-circle"
                            >
                                <i className="fas fa-chevron-left"></i>
                            </Button>
                        </OverlayTrigger>
                        
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Desplazar derecha</Tooltip>}
                        >
                            <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => scrollHorizontal('right')}
                                className="rounded-circle"
                            >
                                <i className="fas fa-chevron-right"></i>
                            </Button>
                        </OverlayTrigger>
                    </div>
                </Col>
            </Row>
            
            {/* BARRA DE PROGRESO */}
            <ProgressBar 
                now={progressPercentage} 
                className="mb-3" 
                label={`${Math.round(progressPercentage)}% cargado`}
                variant="primary"
                animated
            />
            
            {/* POSTS EN FILA HORIZONTAL CON SCROLL */}
            {loading ? (
                <Row className="justify-content-center py-5">
                    <Col xs="auto" className="text-center">
                        <img src={LoadIcon} alt="loading" />
                        <p className="mt-2">Cargando anuncios de {categoryName}...</p>
                    </Col>
                </Row>
            ) : (
                <>
                    {/* CONTENEDOR CON SCROLL HORIZONTAL */}
                    <div 
                        ref={scrollContainerRef}
                        style={{
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            whiteSpace: 'nowrap',
                            padding: '15px 0',
                            marginBottom: '30px',
                            scrollBehavior: 'smooth',
                            msOverflowStyle: 'none',
                            scrollbarWidth: 'none'
                        }}
                        className="mb-4"
                    >
                        <div style={{ display: 'inline-flex', gap: '20px', padding: '0 10px' }}>
                            <Posts 
                                selectedCategory={categoryName}
                                fromCategoryPage={true}
                                displayMode="horizontal"
                            />
                        </div>
                    </div>
                    
                 
                    
                    {/* TODOS LOS ANUNCIOS EN GRID */}
                    <div className="mt-5 pt-4 border-top">
                        <h4 className="mb-3">
                            <i className="fas fa-th-large me-2"></i>
                            Todos los anuncios
                        </h4>
                        <Row xs={1} sm={2} md={3} lg={4} className="g-3">
                            <Posts 
                                selectedCategory={categoryName}
                                fromCategoryPage={true}
                                displayMode="grid"
                            />
                        </Row>
                    </div>
                    
                    {/* PAGINACIÓN */}
                    {hasMore && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center mt-5 pt-4 border-top"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={loadMorePosts}
                                disabled={loading}
                                className="px-5"
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
                            </Button>
                            <p className="text-muted mt-2">
                                Página {page - 1} • {totalLoaded} de {currentCategory.count} anuncios
                            </p>
                        </motion.div>
                    )}
                    
                    {/* VOLVER A HOME */}
                    <Row className="justify-content-center mt-5">
                        <Col xs="auto">
                            <Link to="/" className="btn btn-outline-secondary">
                                <i className="fas fa-arrow-left me-2"></i>
                                Volver al inicio
                            </Link>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default CategoryPage;