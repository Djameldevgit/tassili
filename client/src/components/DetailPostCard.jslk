// components/DetailPostCard.js
import React, { useState, useEffect } from 'react';
import { Card, Spinner, Row, Col, Button, Alert } from 'react-bootstrap';
import { getDataAPI } from '../utils/fetchData';
 import PostCard from './PostCard';
 
 
import CardBodyCarousel from './home/post_card/CardBodyCarousel';
import CardHeader from './home/post_card/CardHeader';
import DescriptionPost from './home/post_card/DescriptionPost';

const DetailPostCard = ({ post }) => {
  const [similarPosts, setSimilarPosts] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // 1. Cargar posts similares iniciales
  useEffect(() => {
    if (post?._id) {
      fetchSimilarPosts();
    }
  }, [post?._id]);

  // Función para cargar posts similares (ruta: /api/post/:id/similar)
  const fetchSimilarPosts = async () => {
    try {
      setLoadingSimilar(true);
      setError(null);
      
      // Usa getDataAPI en lugar de axios
      const res = await getDataAPI(`post/${post._id}/similar`);
      
      if (res.data && res.data.posts) {
        setSimilarPosts(res.data.posts);
        setHasMore(res.data.posts.length >= 6);
      }
    } catch (err) {
      console.error('Error al cargar anuncios similares:', err);
      setError('No se pudieron cargar los anuncios similaires');
    } finally {
      setLoadingSimilar(false);
    }
  };

  // 2. Función para "Ver más" (ruta: /api/posts/category/:categorie)
  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      
      const skip = similarPosts.length;
      
      // Usa getDataAPI con parámetros
      const res = await getDataAPI(
        `posts/category/${post.categorie}?limit=6&skip=${skip}&excludeId=${post._id}`
      );
      
      if (res.data && res.data.posts) {
        const newPosts = res.data.posts;
        setSimilarPosts(prev => [...prev, ...newPosts]);
        setHasMore(newPosts.length >= 6);
      }
    } catch (err) {
      console.error('Error al cargar más anuncios:', err);
      setError('Erreur lors du chargement des annonces');
    } finally {
      setLoadingMore(false);
    }
  };

  // 3. Función para explorar la categoría
  const handleExploreCategory = () => {
    window.location.href = `/category/${post.categorie}`;
  };

  // 4. Verificar si realmente no hay posts en la categoría
  const checkIfCategoryHasPosts = async () => {
    try {
      const res = await getDataAPI(`posts/category/${post.categorie}?limit=1`);
      return res.data && res.data.posts && res.data.posts.length > 0;
    } catch (err) {
      return false;
    }
  };

  if (!post) return null;

  return (
    <div className="detail-post-card">
      {/* Contenedor principal */}
      <div className="main-content">
        <CardHeader post={post} />
        <Card className="shadow-sm border-0 mb-4">
          <CardBodyCarousel post={post} />
          
          <DescriptionPost 
            post={post}
            similarPosts={similarPosts}
            loadingSimilar={loadingSimilar}
            onLoadMoreSimilar={handleLoadMore}
            onExploreCategory={handleExploreCategory}
          />
        </Card>
      </div>

      {/* Sección de posts similares */}
      <div className="similar-posts-section mt-5">
        {/* Encabezado */}
        <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h4 className="mb-0">
              <span className="me-2">📌</span>
              Annonces similaires
              {similarPosts.length > 0 && (
                <span className="badge bg-primary ms-2">{similarPosts.length}</span>
              )}
            </h4>
            <p className="text-muted small mb-0 mt-1">
              Autres annonces de la catégorie <strong>{post.categorie}</strong>
            </p>
          </div>
          
          {similarPosts.length > 0 && hasMore && (
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? 'Chargement...' : 'Voir plus'}
            </Button>
          )}
        </div>

        {/* Estado de error */}
        {error && (
          <Alert variant="warning" className="mb-4">
            {error}
            <Button 
              variant="outline-warning" 
              size="sm" 
              className="ms-3"
              onClick={fetchSimilarPosts}
            >
              Réessayer
            </Button>
          </Alert>
        )}

        {/* Loading inicial */}
        {loadingSimilar && similarPosts.length === 0 && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Recherche d'annonces similaires...</p>
          </div>
        )}

        {/* Grid de posts similares */}
        {!loadingSimilar && similarPosts.length > 0 && (
          <>
            <Row xs={1} md={2} lg={3} className="g-4">
              {similarPosts.map((similarPost) => (
                <Col key={similarPost._id}>
                  <PostCard post={similarPost} />
                </Col>
              ))}
            </Row>
            
            {hasMore && (
              <div className="text-center mt-4 pt-3 border-top">
                <Button 
                  variant="primary" 
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-4"
                >
                  {loadingMore ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Chargement...
                    </>
                  ) : (
                    'Voir plus d\'annonces similaires →'
                  )}
                </Button>
              </div>
            )}
          </>
        )}

        {/* Estado vacío - CON MÁS INFORMACIÓN */}
        {!loadingSimilar && similarPosts.length === 0 && !error && (
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-light border-0">
              <h5 className="mb-0 d-flex align-items-center">
                <span className="me-2">📌</span>
                Annonces similaires
              </h5>
            </Card.Header>
            <Card.Body className="text-center py-5">
              <div className="mb-3" style={{ fontSize: '3rem' }}>
                🔍
              </div>
              
              {/* Mensaje dinámico según situación */}
              {post.categorie === 'immobilier' || post.categorie === 'vehicules' ? (
                <>
                  <h6 className="text-muted mb-3">
                    Aucune annonce similaire pour le moment
                  </h6>
                  <p className="text-muted small mb-4">
                    Nous n'avons pas trouvé d'annonces similaires dans la catégorie 
                    <strong className="ms-1">"{post.categorie}"</strong>.
                    <br />
                    <small className="text-info">
                      (Cela peut être dû à: 1) Peu d'annonces publiées, 2) Filtres trop spécifiques)
                    </small>
                  </p>
                </>
              ) : (
                <>
                  <h6 className="text-muted mb-3">
                    Catégorie peu active
                  </h6>
                  <p className="text-muted small mb-4">
                    La catégorie <strong>"{post.categorie}"</strong> ne contient pas encore beaucoup d'annonces.
                    Soyez le premier à publier régulièrement dans cette catégorie!
                  </p>
                </>
              )}
              
              <div className="d-flex justify-content-center gap-3">
                <Button 
                  variant="primary" 
                  onClick={handleExploreCategory}
                  className="mt-2"
                >
                  Explorer la catégorie {post.categorie}
                </Button>
                
                <Button 
                  variant="outline-secondary" 
                  onClick={fetchSimilarPosts}
                  className="mt-2"
                >
                  Actualiser la recherche
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Estilos */}
      <style>{`
        .detail-post-card {
          max-width: 1200px;
          margin: 0 auto;
          animation: fadeIn 0.5s ease;
        }
        
        .similar-posts-section h4 {
          color: #2d3748;
          font-weight: 600;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
          .similar-posts-section .row {
            margin: 0 -10px;
          }
          
          .d-flex.justify-content-between {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DetailPostCard;