import React, { useEffect } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert
} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStoresByUser } from '../../redux/actions/storeActions'
import { FaStore, FaPlus, FaEye, FaEdit, FaChartLine } from 'react-icons/fa'

const StoreList = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { auth } = useSelector(state => state)
  const { stores, loading, error } = useSelector(state => state.store || {})
  
  const userId = auth?.user?._id

  useEffect(() => {
    if (userId && auth?.token) {
      console.log('🔄 Chargement des boutiques pour utilisateur:', userId)
      dispatch(getStoresByUser({
        userId,
        auth: {
          token: auth.token,
          user: auth.user
        }
      }))
    }
  }, [userId, auth, dispatch])

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Chargement des boutiques...</p>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Mes Boutiques</h1>
          <p className="text-muted mb-0">
            Gérez toutes vos boutiques depuis cet espace
          </p>
        </div>
        
        <Button 
          variant="primary" 
          onClick={() => navigate('/store/create')}
        >
          <FaPlus className="me-2" />
          Créer une nouvelle boutique
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {stores && stores.length === 0 ? (
        <Card className="text-center shadow-sm border-0 py-5">
          <Card.Body>
            <div className="mb-4">
              <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '100px', height: '100px' }}>
                <FaStore size={40} className="text-muted" />
              </div>
            </div>
            <h4 className="mb-3">Aucune boutique trouvée</h4>
            <p className="text-muted mb-4">
              Vous n'avez pas encore créé de boutique. Créez votre première boutique pour commencer à vendre.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => navigate('/store/create')}
            >
              <FaPlus className="me-2" />
              Créer ma première boutique
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {stores && stores.map(store => (
            <Col key={store._id} lg={4} md={6} className="mb-4">
              <Card className="h-100 shadow-sm border-0">
                <Card.Body>
                  <div className="d-flex align-items-start mb-3">
                    <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '50px', height: '50px' }}>
                      <FaStore size={20} />
                    </div>
                    <div className="ms-3">
                      <h5 className="mb-1">{store.name}</h5>
                      <div className="d-flex align-items-center">
                        <Badge bg={store.plan === 'Premium' ? 'warning' : 
                                  store.plan === 'Pro' ? 'info' : 'secondary'}
                               className="me-2">
                          {store.plan}
                        </Badge>
                        <span className="text-muted small">
                          {store.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted small mb-4">
                    {store.description?.substring(0, 100) || 'Aucune description'}
                    {store.description?.length > 100 ? '...' : ''}
                  </p>

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <div className="text-muted small">Produits</div>
                      <div className="fw-bold">{store.stats?.totalProducts || 0}</div>
                    </div>
                    <div>
                      <div className="text-muted small">Vues</div>
                      <div className="fw-bold">{store.stats?.totalViews || 0}</div>
                    </div>
                    <div>
                      <div className="text-muted small">Favoris</div>
                      <div className="fw-bold">{store.stats?.totalFavorites || 0}</div>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Link to={`/store/${store._id}`} className="flex-grow-1">
                      <Button variant="outline-primary" className="w-100">
                        <FaEye className="me-2" />
                        Voir
                      </Button>
                    </Link>
                    
                    <Link to={`/store/${store._id}/dashboard`}>
                      <Button variant="outline-secondary">
                        <FaChartLine />
                      </Button>
                    </Link>
                    
                    <Link to={`/store/${store._id}/edit`}>
                      <Button variant="outline-secondary">
                        <FaEdit />
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-transparent border-top-0 pt-0">
                  <div className="text-muted small">
                    Créée le {new Date(store.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Info sobre límites */}
      <Alert variant="info" className="mt-4">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <strong>Limites du compte:</strong> Vous pouvez créer jusqu'à 3 boutiques avec votre compte actuel.
          </div>
          <div className="text-end">
            {stores?.length || 0} / 3 boutiques créées
          </div>
        </div>
      </Alert>
    </Container>
  )
}

export default StoreList