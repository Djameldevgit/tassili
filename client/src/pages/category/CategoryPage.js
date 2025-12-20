// pages/CategoryPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Spinner, Alert, Breadcrumb, Button } from 'react-bootstrap';
import { getDataAPI } from '../../utils/fetchData';
  
import PostCard from '../../components/postcards/PostCard';



 
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const limit = 12;

  // Emojis por categoría
  const categoryEmojis = {
    'immobilier': '🏠',
    'vehicules': '🚗',
    'telephones': '📱',
    'informatique': '💻',
    'electromenager': '🔌',
    'piecesDetachees': '⚙️',
    'vetements': '👕',
    'alimentaires': '🍎',
    'sante_beaute': '💄',
    'meubles': '🛋️',
    'services': '🛠️',
    'materiaux': '🧱',
    'loisirs': '🎮',
    'emploi': '💼',
    'sport': '⚽',
    'voyages': '✈️'
  };

  // 1. Cargar posts iniciales
  useEffect(() => {
    if (categoryName) {
      fetchCategoryPosts(true);
    }
  }, [categoryName]);

  // Función para cargar posts
  const fetchCategoryPosts = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
        setSkip(0);
      } else {
        setLoadingMore(true);
      }

      setError(null);
      
      // Usar getDataAPI con el token de autenticación
      const currentSkip = isInitial ? 0 : skip;
      const url = `posts/category/${categoryName}?limit=${limit}&skip=${currentSkip}`;
      
      const res = await getDataAPI(url);
      
      if (res.data && res.data.posts) {
        if (isInitial) {
          setPosts(res.data.posts);
        } else {
          setPosts(prev => [...prev, ...res.data.posts]);
        }
        
        // Actualizar skip y verificar si hay más posts
        const newSkip = currentSkip + res.data.posts.length;
        setSkip(newSkip);
        setHasMore(res.data.posts.length >= limit);
        
        // Si la API devuelve hasMore, usarlo
        if (res.data.hasMore !== undefined) {
          setHasMore(res.data.hasMore);
        }
      }
    } catch (err) {
      console.error('Error fetching category posts:', err);
      const errorMsg = err.response?.data?.msg || 
                      err.message || 
                      'Erreur lors du chargement des annonces';
      setError(errorMsg);
    } finally {
      if (isInitial) {
        setLoading(false);
      } else {
        setLoadingMore(false);
      }
    }
  };

  // Función para cargar más posts
  const handleLoadMore = () => {
    fetchCategoryPosts(false);
  };

  // Función para volver a intentar
  const handleRetry = () => {
    fetchCategoryPosts(true);
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Chargement des annonces...</p>
      </Container>
    );
  }

  // Formatear nombre de categoría para display
  const formatCategoryName = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const displayName = formatCategoryName(categoryName);
  const emoji = categoryEmojis[categoryName] || '📁';

  return (
    <Container className="category-page py-4">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>
          Accueil
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          {emoji} {displayName}
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* Encabezado */}
      <div className="category-header mb-5">
        <h1 className="display-6 mb-3">
          <span className="me-3">{emoji}</span>
          Catégorie: {displayName}
        </h1>
        <p className="lead text-muted">
          {posts.length} annonce{posts.length !== 1 ? 's' : ''} disponible{posts.length !== 1 ? 's' : ''}
          {hasMore && posts.length > 0 && ' (et plus...)'}
        </p>
      </div>

      {/* Error */}
      {error && (
        <Alert variant="warning" className="mb-4">
          <Alert.Heading>Erreur de chargement</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-warning" onClick={handleRetry}>
            Réessayer
          </Button>
        </Alert>
      )}

      {/* Posts */}
      {posts.length > 0 ? (
        <>
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => (
              <Col key={post._id}>
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
          
          {/* Paginación */}
          {hasMore && (
            <div className="text-center mt-5 pt-4 border-top">
              <Button 
                variant="primary" 
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-5"
              >
                {loadingMore ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Chargement...
                  </>
                ) : (
                  'Charger plus d\'annonces'
                )}
              </Button>
            </div>
          )}
          
          {/* Mensaje si no hay más posts */}
          {!hasMore && posts.length > 0 && (
            <div className="text-center mt-5 pt-4 border-top">
              <p className="text-muted">
                ✅ Toutes les annonces de cette catégorie ont été chargées
              </p>
            </div>
          )}
        </>
      ) : (
        // Estado vacío
        <div className="text-center py-5">
          <div className="mb-4" style={{ fontSize: '4rem' }}>
            {emoji}
          </div>
          <h4 className="text-muted mb-3">Aucune annonce dans cette catégorie</h4>
          <p className="text-muted mb-4">
            La catégorie <strong>"{displayName}"</strong> ne contient pas encore d'annonces.
            <br />
            Soyez le premier à publier dans cette catégorie!
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/create-post" className="btn btn-primary">
              Publier une annonce
            </Link>
            <Button variant="outline-secondary" onClick={handleRetry}>
              Actualiser
            </Button>
          </div>
        </div>
      )}

      {/* Información adicional para categorías populares */}
      {(categoryName === 'immobilier' || categoryName === 'vehicules') && posts.length === 0 && (
        <Alert variant="info" className="mt-4">
          <strong>💡 Conseil:</strong> Les annonces dans cette catégorie apparaîtront 
          ici dès que des utilisateurs publieront. Essayez de filtrer par wilaya 
          ou de vérifier les catégories similaires.
        </Alert>
      )}

      {/* Estilos */}
      <style>{`
        .category-page {
          animation: fadeIn 0.5s ease;
          min-height: 70vh;
        }
        
        .category-header {
          border-bottom: 3px solid #f0f0f0;
          padding-bottom: 1.5rem;
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* Animación para nuevos posts */
        .g-4 > * {
          animation: slideUp 0.4s ease forwards;
          opacity: 0;
        }
        
        .g-4 > *:nth-child(1) { animation-delay: 0.1s; }
        .g-4 > *:nth-child(2) { animation-delay: 0.2s; }
        .g-4 > *:nth-child(3) { animation-delay: 0.3s; }
        .g-4 > *:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .category-header h1 {
            font-size: 1.8rem;
          }
          
          .lead {
            font-size: 1rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default CategoryPage;