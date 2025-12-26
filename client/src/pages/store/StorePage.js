import React, { useState, useEffect } from 'react'
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Badge, 
  Alert,
  Spinner,
  Tab,
  Nav,
  Image,
  Carousel,
  ListGroup,
  Modal,
  Form
} from 'react-bootstrap'
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Whatsapp, 
  Star,
  StarFill,
  Share,
  Heart,
  Phone,
  Envelope,
  GeoAlt,
  Clock
} from 'react-bootstrap-icons'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const StorePage = () => {
  const { id } = useParams()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('products')
  const [showContactModal, setShowContactModal] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchStoreData()
  }, [id])

  const fetchStoreData = async () => {
    try {
      setLoading(true)
      const [storeRes, productsRes] = await Promise.all([
        axios.get(`/api/stores/${id}`),
        axios.get(`/api/products/store/${id}?limit=12`)
      ])
      
      setStore(storeRes.data)
      setProducts(productsRes.data.products || [])
    } catch (err) {
      setError(err.response?.data?.msg || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    try {
      await axios.post(`/api/stores/${id}/contact`, { message })
      alert('Message envoyé avec succès!')
      setShowContactModal(false)
      setMessage('')
    } catch (err) {
      alert('Erreur lors de l\'envoi du message')
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: store.name,
        text: store.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papier!')
    }
  }

  const renderRating = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <StarFill key={i} className="text-warning me-1" /> : 
        <Star key={i} className="text-secondary me-1" />
      )
    }
    return stars
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Chargement de la boutique...</h4>
      </Container>
    )
  }

  if (error || !store) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Boutique non trouvée</h4>
          <p>{error || 'Cette boutique n\'existe pas ou a été supprimée.'}</p>
          <Button as={Link} to="/" variant="primary">
            Retour à l'accueil
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container fluid className="px-0">
      {/* Banner de la boutique */}
      <div className="position-relative">
        {store.bannerUrl ? (
          <Image 
            src={store.bannerUrl} 
            alt="Bannière" 
            fluid 
            className="store-banner"
            style={{ height: '300px', objectFit: 'cover', width: '100%' }}
          />
        ) : (
          <div className="store-banner bg-primary" style={{ height: '300px' }} />
        )}
        
        {/* Overlay avec info */}
        <div className="position-absolute bottom-0 start-0 p-4 text-white w-100 store-overlay">
          <Container>
            <Row className="align-items-end">
              <Col md={8}>
                <div className="d-flex align-items-center mb-3">
                  <div className="store-logo-container me-4">
                    {store.logoUrl ? (
                      <Image 
                        src={store.logoUrl} 
                        roundedCircle 
                        width={100}
                        height={100}
                        className="border border-4 border-white"
                      />
                    ) : (
                      <div className="rounded-circle bg-white d-flex align-items-center justify-content-center"
                        style={{ width: '100px', height: '100px' }}>
                        <span className="display-4 text-primary">{store.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="mb-1">{store.name}</h1>
                    <div className="d-flex align-items-center mb-2">
                      {renderRating(store.stats?.rating?.average || 0)}
                      <span className="ms-2">({store.stats?.rating?.count || 0} avis)</span>
                    </div>
                    <Badge bg="success" className="me-2">
                      <i className="fas fa-check-circle me-1"></i>
                      {store.verified ? 'Vérifié' : 'Non vérifié'}
                    </Badge>
                    <Badge bg="info" className="me-2">
                      {store.plan}
                    </Badge>
                  </div>
                </div>
              </Col>
              <Col md={4} className="text-end">
                <div className="d-flex justify-content-end gap-2 mb-3">
                  <Button 
                    variant="light" 
                    size="sm"
                    onClick={() => setShowContactModal(true)}
                  >
                    <Phone className="me-2" />
                    Contacter
                  </Button>
                  <Button variant="light" size="sm" onClick={handleShare}>
                    <Share className="me-2" />
                    Partager
                  </Button>
                  <Button variant="light" size="sm">
                    <Heart className="me-2" />
                    Favoris
                  </Button>
                </div>
                <div className="text-white-50">
                  <small>
                    <Clock className="me-1" /> 
                    Actif depuis {new Date(store.createdAt).toLocaleDateString()}
                  </small>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Contenu principal */}
      <Container className="mt-4">
        <Row>
          {/* Barre latérale */}
          <Col lg={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <h5 className="mb-3">À propos</h5>
                <p className="text-muted">{store.description || 'Aucune description disponible.'}</p>
                
                <hr />
                
                <h6 className="mb-3">Informations</h6>
                <ListGroup variant="flush">
                  {store.category && (
                    <ListGroup.Item className="d-flex justify-content-between">
                      <span>Catégorie:</span>
                      <Badge bg="primary">{store.category}</Badge>
                    </ListGroup.Item>
                  )}
                  
                  {store.address?.city && (
                    <ListGroup.Item className="d-flex align-items-center">
                      <GeoAlt className="me-2 text-muted" />
                      <span>{store.address.city}, {store.address.country}</span>
                    </ListGroup.Item>
                  )}
                  
                  {store.contact?.phone && (
                    <ListGroup.Item className="d-flex align-items-center">
                      <Phone className="me-2 text-muted" />
                      <span>{store.contact.phone}</span>
                    </ListGroup.Item>
                  )}
                  
                  {store.contact?.email && (
                    <ListGroup.Item className="d-flex align-items-center">
                      <Envelope className="me-2 text-muted" />
                      <span>{store.contact.email}</span>
                    </ListGroup.Item>
                  )}
                </ListGroup>
                
                <hr />
                
                <h6 className="mb-3">Statistiques</h6>
                <div className="row text-center">
                  <div className="col-4">
                    <div className="display-6">{store.stats?.totalProducts || 0}</div>
                    <small className="text-muted">Produits</small>
                  </div>
                  <div className="col-4">
                    <div className="display-6">{store.stats?.totalViews || 0}</div>
                    <small className="text-muted">Vues</small>
                  </div>
                  <div className="col-4">
                    <div className="display-6">{store.stats?.totalFavorites || 0}</div>
                    <small className="text-muted">Favoris</small>
                  </div>
                </div>
                
                <hr />
                
                <h6 className="mb-3">Réseaux sociaux</h6>
                <div className="d-flex gap-2">
                  {store.socialLinks?.facebook && (
                    <a href={store.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-primary" size="sm">
                        <Facebook />
                      </Button>
                    </a>
                  )}
                  {store.socialLinks?.instagram && (
                    <a href={store.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-danger" size="sm">
                        <Instagram />
                      </Button>
                    </a>
                  )}
                  {store.socialLinks?.whatsapp && (
                    <a href={`https://wa.me/${store.socialLinks.whatsapp}`} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline-success" size="sm">
                        <Whatsapp />
                      </Button>
                    </a>
                  )}
                </div>
              </Card.Body>
            </Card>
            
            {/* Produits en vedette */}
            {products.length > 0 && (
              <Card className="mt-4 shadow-sm">
                <Card.Header>
                  <h6 className="mb-0">Produits populaires</h6>
                </Card.Header>
                <Card.Body>
                  {products.slice(0, 3).map(product => (
                    <div key={product._id} className="d-flex mb-3">
                      <Image 
                        src={product.images?.[0] || '/default-product.jpg'} 
                        rounded 
                        width={60}
                        height={60}
                        className="me-3"
                      />
                      <div>
                        <h6 className="mb-1">
                          <Link to={`/product/${product._id}`} className="text-decoration-none">
                            {product.title}
                          </Link>
                        </h6>
                        <p className="text-primary mb-0 fw-bold">
                          {product.price} {product.currency || 'DZD'}
                        </p>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Contenu principal */}
          <Col lg={9}>
            {/* Tabs de navigation */}
            <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-white border-0">
                  <Nav variant="tabs" className="border-0">
                    <Nav.Item>
                      <Nav.Link eventKey="products">
                        <i className="fas fa-box me-2"></i>
                        Produits ({products.length})
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="reviews">
                        <i className="fas fa-star me-2"></i>
                        Avis ({store.stats?.reviewsCount || 0})
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="about">
                        <i className="fas fa-info-circle me-2"></i>
                        À propos
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                
                <Card.Body>
                  <Tab.Content>
                    {/* Tab Produits */}
                    <Tab.Pane eventKey="products">
                      {products.length > 0 ? (
                        <Row>
                          {products.map(product => (
                            <Col key={product._id} md={6} lg={4} className="mb-4">
                              <Card className="h-100 product-card">
                                {product.images?.[0] && (
                                  <Link to={`/product/${product._id}`}>
                                    <Card.Img 
                                      variant="top" 
                                      src={product.images[0]} 
                                      style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                  </Link>
                                )}
                                <Card.Body>
                                  <Card.Title className="h6">
                                    <Link to={`/product/${product._id}`} className="text-decoration-none">
                                      {product.title}
                                    </Link>
                                  </Card.Title>
                                  <Card.Text className="text-muted small">
                                    {product.description?.substring(0, 80)}...
                                  </Card.Text>
                                  <div className="d-flex justify-content-between align-items-center">
                                    <span className="h5 text-primary mb-0">
                                      {product.price} {product.currency || 'DZD'}
                                    </span>
                                    <Button variant="outline-primary" size="sm">
                                      <i className="fas fa-shopping-cart me-1"></i>
                                      Acheter
                                    </Button>
                                  </div>
                                </Card.Body>
                                <Card.Footer className="bg-white border-0 pt-0">
                                  <small className="text-muted">
                                    <i className="fas fa-clock me-1"></i>
                                    {new Date(product.createdAt).toLocaleDateString()}
                                  </small>
                                </Card.Footer>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <Alert variant="info">
                          <i className="fas fa-info-circle me-2"></i>
                          Cette boutique n'a pas encore de produits à vendre.
                        </Alert>
                      )}
                    </Tab.Pane>

                    {/* Tab Avis */}
                    <Tab.Pane eventKey="reviews">
                      <Alert variant="info">
                        <i className="fas fa-comment me-2"></i>
                        Soyez le premier à laisser un avis sur cette boutique!
                      </Alert>
                      {/* Ici ajouter la logique des avis */}
                    </Tab.Pane>

                    {/* Tab À propos */}
                    <Tab.Pane eventKey="about">
                      <Row>
                        <Col md={6}>
                          <h5>Description détaillée</h5>
                          <p>{store.description || 'Aucune description disponible.'}</p>
                          
                          <h5 className="mt-4">Catégories</h5>
                          <Badge bg="primary" className="me-2">{store.category}</Badge>
                          {store.subcategory && (
                            <Badge bg="secondary">{store.subcategory}</Badge>
                          )}
                        </Col>
                        <Col md={6}>
                          <h5>Horaires d'ouverture</h5>
                          {store.settings?.workingHours ? (
                            <ListGroup>
                              {Object.entries(store.settings.workingHours).map(([day, hours]) => (
                                <ListGroup.Item key={day} className="d-flex justify-content-between">
                                  <span className="text-capitalize">{day}</span>
                                  <span>{hours.open ? `${hours.open} - ${hours.close}` : 'Fermé'}</span>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          ) : (
                            <p className="text-muted">Non spécifié</p>
                          )}
                          
                          <h5 className="mt-4">Politique de retour</h5>
                          <p className="text-muted">
                            Politique standard de 7 jours pour les retours.
                          </p>
                        </Col>
                      </Row>
                    </Tab.Pane>
                  </Tab.Content>
                </Card.Body>
              </Card>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      {/* Modal de contact */}
      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contacter {store.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Votre message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Écrivez votre message ici..."
              />
            </Form.Group>
            <div className="d-flex gap-2">
              <Button variant="primary" onClick={handleSendMessage}>
                Envoyer
              </Button>
              <Button variant="outline-secondary" onClick={() => setShowContactModal(false)}>
                Annuler
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CSS inline */}
      <style jsx="true">{`
        .store-banner {
          height: 300px;
          width: 100%;
          object-fit: cover;
        }
        .store-overlay {
          background: linear-gradient(transparent, rgba(0,0,0,0.7));
        }
        .product-card {
          transition: transform 0.3s;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }
        .store-logo-container {
          position: relative;
        }
        .store-logo-container:before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #007bff, #6610f2);
          border-radius: 50%;
          z-index: -1;
        }
      `}</style>
    </Container>
  )
}

export default StorePage