import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Spinner } from 'react-bootstrap';

const UserPosts = ({ userId, excludePostId, limit = 4 }) => {
    const dispatch = useDispatch();
    const { posts: allPosts } = useSelector(state => state.homePosts || {});
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!userId) return;
        
        setLoading(true);
        
        // Filtramos posts del mismo usuario, excluyendo el post actual
        const filtered = allPosts
            ?.filter(post => 
                post.user?._id === userId && 
                post._id !== excludePostId
            )
            .slice(0, limit) || [];
        
        setUserPosts(filtered);
        setLoading(false);
        
        console.log('📊 UserPosts - Anuncios del usuario:', {
            userId,
            excludePostId,
            totalPosts: allPosts?.length,
            found: filtered.length
        });
        
    }, [allPosts, userId, excludePostId, limit]);
    
    // Si no hay posts, no mostrar el componente
    if (userPosts.length === 0) {
        return null;
    }
    
    return (
        <div className="user-posts-section">
            <h5 className="mb-3">
                <i className="fas fa-store me-2 text-primary"></i>
                Más del vendedor
            </h5>
            
            {loading ? (
                <div className="text-center py-3">
                    <Spinner animation="border" size="sm" />
                    <p className="mt-2 text-muted small">Cargando...</p>
                </div>
            ) : (
                <Row className="g-2">
                    {userPosts.map(post => (
                        <Col key={post._id} xs={12}>
                            <Link 
                                to={`/post/${post._id}`}
                                className="text-decoration-none text-dark"
                            >
                                <Card className="border-hover">
                                    <div className="d-flex">
                                        {/* Imagen pequeña */}
                                        <div 
                                            className="flex-shrink-0"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                backgroundImage: `url(${post.images?.[0]?.url || '/default-post.jpg'})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}
                                        />
                                        
                                        {/* Información */}
                                        <Card.Body className="p-2">
                                            <h6 className="card-title mb-1" style={{
                                                fontSize: '0.9rem',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                {post.titre || 'Sin título'}
                                            </h6>
                                            
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-primary fw-bold small">
                                                    {post.price ? `${post.price.toLocaleString()} €` : 'Consultar'}
                                                </span>
                                                <small className="text-muted">
                                                    {post.categorie}
                                                </small>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            )}
            
            {/* Ver todos los anuncios del usuario */}
            {userPosts.length > 0 && (
                <div className="text-center mt-3">
                    <Link 
                        to={`/profile/${userId}`}
                        className="btn btn-outline-primary btn-sm"
                    >
                        Ver todos los anuncios del vendedor
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserPosts;