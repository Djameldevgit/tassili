import React from 'react';
import DescriptionPost from './home/post_card/DescriptionPost';
import CardBodyCarousel from './home/post_card/CardBodyCarousel';
import { Row, Col, Badge, Button } from 'react-bootstrap';

const DetailPostCard = ({ post }) => {
    // Validación básica
    if (!post) {
        return (
            <div className="text-center py-5">
                <p>No se pudo cargar la información del anuncio</p>
            </div>
        );
    }
    
    return (
        <div className="detail-post-card">
            {/* SECCIÓN 1: Carrusel de imágenes */}
            <div className="mb-4">
                <CardBodyCarousel post={post} />
            </div>
            
            {/* SECCIÓN 2: Información principal */}
            <div className="post-header mb-4">
                <Row className="align-items-center">
                    <Col xs={8}>
                        <h1 className="h3 mb-2 fw-bold">
                            {post.titre || 'Sin título'}
                        </h1>
                        
                        <div className="d-flex gap-2 mb-2">
                            <Badge bg="primary" className="px-3 py-2">
                                {post.categorie || 'Categoría'}
                            </Badge>
                            
                            {post.subCategory && (
                                <Badge bg="secondary" className="px-3 py-2">
                                    {post.subCategory}
                                </Badge>
                            )}
                            
                            {post.isUrgent && (
                                <Badge bg="danger" className="px-3 py-2">
                                    <i className="fas fa-bolt me-1"></i>
                                    Urgente
                                </Badge>
                            )}
                        </div>
                    </Col>
                    
                    <Col xs={4} className="text-end">
                        <div className="price-display">
                            <h2 className="text-primary mb-0">
                                {post.price ? post.price.toLocaleString() + ' €' : 'Consultar'}
                            </h2>
                            <small className="text-muted">Precio</small>
                        </div>
                    </Col>
                </Row>
            </div>
            
            {/* SECCIÓN 3: Información de ubicación y contacto */}
            <div className="post-info mb-4 p-3 bg-light rounded">
                <Row>
                    <Col md={6} className="mb-3 mb-md-0">
                        <div className="d-flex align-items-center">
                            <i className="fas fa-map-marker-alt text-muted me-2"></i>
                            <div>
                                <strong>Ubicación:</strong>
                                <div>
                                    {post.wilaya || 'No especificado'}
                                    {post.commune && `, ${post.commune}`}
                                </div>
                            </div>
                        </div>
                    </Col>
                    
                    <Col md={6}>
                        <div className="d-flex align-items-center">
                            <i className="fas fa-phone text-muted me-2"></i>
                            <div>
                                <strong>Contacto:</strong>
                                <div>
                                    {post.telephone || 'No disponible'}
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            
            {/* SECCIÓN 4: Descripción del post */}
            <div className="post-description mb-4">
                <h4 className="h5 mb-3">
                    <i className="fas fa-align-left text-muted me-2"></i>
                    Descripción
                </h4>
                <DescriptionPost post={post} />
            </div>
            
            {/* SECCIÓN 5: Datos específicos de categoría */}
            {post.categorySpecificData && 
             Object.keys(post.categorySpecificData).length > 0 && (
                <div className="category-details mb-4">
                    <h4 className="h5 mb-3">
                        <i className="fas fa-list-alt text-muted me-2"></i>
                        Detalles específicos
                    </h4>
                    
                    <Row className="g-2">
                        {Object.entries(post.categorySpecificData).map(([key, value]) => (
                            <Col key={key} xs={12} sm={6} md={4}>
                                <div className="p-3 border rounded bg-white">
                                    <div className="text-muted small text-uppercase">
                                        {formatKey(key)}
                                    </div>
                                    <div className="fw-bold mt-1">
                                        {formatValue(value)}
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
            
            {/* SECCIÓN 6: Botones de acción */}
            <div className="post-actions mt-4">
                <Row className="g-2">
                    <Col xs={12} md={8}>
                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-100 py-3"
                            onClick={() => window.location.href = `tel:${post.telephone}`}
                            disabled={!post.telephone}
                        >
                            <i className="fas fa-phone me-2"></i>
                            {post.telephone ? `Llamar al ${post.telephone}` : 'Teléfono no disponible'}
                        </Button>
                    </Col>
                    
                    <Col xs={6} md={2}>
                        <Button 
                            variant="outline-primary" 
                            size="lg" 
                            className="w-100 py-3"
                            onClick={() => {/* Acción de like */}}
                        >
                            <i className="far fa-heart"></i>
                        </Button>
                    </Col>
                    
                    <Col xs={6} md={2}>
                        <Button 
                            variant="outline-primary" 
                            size="lg" 
                            className="w-100 py-3"
                            onClick={() => {/* Acción de guardar */}}
                        >
                            <i className="far fa-bookmark"></i>
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

// Función para formatear las claves (ej: "marque" → "Marca")
const formatKey = (key) => {
    const translations = {
        'marque': 'Marca',
        'model': 'Modelo',
        'etat': 'Estado',
        'annee': 'Año',
        'kilometrage': 'Kilometraje',
        'carburant': 'Combustible',
        'boite': 'Caja',
        'type': 'Tipo',
        'surface': 'Superficie',
        'pieces': 'Habitaciones',
        'chambres': 'Dormitorios',
        'couleur': 'Color',
        'taille': 'Talla',
        'etat': 'Condición'
    };
    
    return translations[key] || key.charAt(0).toUpperCase() + key.slice(1);
};

// Función para formatear los valores
const formatValue = (value) => {
    if (typeof value === 'boolean') {
        return value ? 'Sí' : 'No';
    }
    return String(value);
};

export default DetailPostCard;