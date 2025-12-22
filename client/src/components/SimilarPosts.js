// components/SimilarPosts/SimpleSimilarPosts.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { getSimilarPosts } from '../redux/actions/postAction';
 

const  SimilarPosts = ({ currentPost }) => {
    const dispatch = useDispatch();
     
        const { homePosts } = useSelector(state => state);
        const {similarPosts} = homePosts.similarPosts
    useEffect(() => {
        if (currentPost?._id) {
            console.log('🔄 Cargando posts similares para:', currentPost._id);
            dispatch(getSimilarPosts(currentPost._id));
        }
    }, [dispatch, currentPost?._id]);
    
    // Si no hay posts, no mostrar nada
    if (!similarPosts || similarPosts.length === 0) {
        console.log('📭 No hay posts similares para mostrar');
        return null;
    }
    
    console.log('📊 Posts similares a mostrar:', similarPosts.length);
    
    return (
        <div className="similar-posts-section mt-5 pt-4 border-top">
            <h4 className="mb-4">
                <i className="fas fa-star me-2 text-warning"></i>
                Anuncios similares en {currentPost?.categorie}
                <Badge bg="light" text="dark" className="ms-2">
                    {similarPosts.length}
                </Badge>
            </h4>
            
            <Row className="g-3">
                {similarPosts.map(post => (
                    <Col key={post._id} xs={12} sm={6} md={4} lg={3}>
                        <Link 
                            to={`/post/${post._id}`} 
                            className="text-decoration-none text-dark"
                        >
                            <Card className="h-100 shadow-sm border-hover">
                                {/* Imagen */}
                                <div 
                                    className="rounded-top"
                                    style={{
                                        height: '140px',
                                        backgroundImage: `url(${post.images?.[0]?.url || '/default-post.jpg'})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                />
                                
                                <Card.Body className="p-3">
                                    <Card.Title className="h6 mb-2" style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {post.titre || 'Sin título'}
                                    </Card.Title>
                                    
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className="fw-bold text-primary">
                                            {post.price ? `${post.price.toLocaleString()} €` : 'Consultar'}
                                        </span>
                                        <Badge bg="secondary" className="text-uppercase">
                                            {post.categorie}
                                        </Badge>
                                    </div>
                                    
                                    <div className="d-flex align-items-center">
                                        <i className="fas fa-map-marker-alt text-muted me-2 small"></i>
                                        <small className="text-muted">
                                            {post.wilaya || 'Sin ubicación'}
                                        </small>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
            
            {/* Debug info (solo en desarrollo) */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-3 p-2 bg-light rounded small">
                    <strong>Debug info:</strong>
                    <div>Categoría buscada: {currentPost?.categorie}</div>
                    <div>Posts encontrados: {similarPosts.length}</div>
                    <div>IDs: {similarPosts.map(p => p._id.substring(0, 8)).join(', ')}</div>
                </div>
            )}
        </div>
    );
};

export default  SimilarPosts;