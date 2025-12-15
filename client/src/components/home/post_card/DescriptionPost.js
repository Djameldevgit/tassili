import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, Row, Col, Badge, Button, 
  Accordion, ListGroup, Alert
} from 'react-bootstrap';
import { 
  FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaEye, 
  FaTag, FaUser, FaStar, FaCheckCircle, FaComment,
  FaEnvelope, FaHome, FaCar, FaTshirt, FaMobileAlt,
  FaLaptop, FaCogs, FaTools, FaHeart, FaCouch,
  FaUtensils, FaBox, FaConciergeBell, FaGamepad,
  FaBriefcase, FaFootballBall, FaPlane, FaGraduationCap,
  FaMusic, FaBaby, FaBook, FaCamera, FaEuroSign,
  FaDollarSign, FaBuilding, FaCity, FaGlobe,
  FaShoppingCart, FaShippingFast, FaPaintBrush,
  FaTree, FaSwimmingPool, FaBed, FaBath, FaRuler,
  FaCrown, FaGem, FaShieldAlt, FaCertificate,
  FaMoneyBillWave, FaInfoCircle, FaChevronRight
} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { MESS_TYPES } from '../../../redux/actions/messageAction';
import { GLOBALTYPES } from '../../../redux/actions/globalTypes';

const DescriptionPost = ({ post }) => {
    const [readMore, setReadMore] = useState(false);
    const [isTranslationsReady, setIsTranslationsReady] = useState(false);
    
    const { auth, message, languageReducer } = useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const lang = languageReducer.language || 'fr';
    const { t, i18n } = useTranslation(['descripcion', 'createpost']);
    const isRTL = lang === 'ar';

    useEffect(() => {
        const changeLanguage = async () => {
            if (i18n.language !== lang) {
                await i18n.changeLanguage(lang);
            }
            setIsTranslationsReady(true);
        };
        
        changeLanguage();
    }, [lang, i18n]);

    // 🔥 OBTENER TODOS LOS DATOS DEL POST
    const getAllPostData = useMemo(() => {
        if (!post) return {};
        
        const combinedData = { ...post };
        
        const dataSources = [
            post.specificData,
            post.data,
            post.categorySpecificData
        ];
        
        dataSources.forEach(source => {
            if (source && typeof source === 'object') {
                Object.keys(source).forEach(key => {
                    if (source[key] !== undefined && source[key] !== null) {
                        if (combinedData[key] === undefined || combinedData[key] === null) {
                            combinedData[key] = source[key];
                        }
                    }
                });
            }
        });
        
        return combinedData;
    }, [post]);

    const postData = getAllPostData;

    // 🎨 CONFIGURACIÓN DE ESTILOS
    const theme = {
        primary: '#8b5cf6',
        secondary: '#f472b6',
        success: '#10b981',
        warning: '#f59e0b',
        info: '#3b82f6',
        dark: '#1f2937',
        light: '#f8fafc'
    };

    // 📱 COMPONENTE DE LÍNEA COMPACTA
    const CompactLine = ({ icon, label, value, color = "dark", badge = null, className = "" }) => (
        <div className={`d-flex align-items-center py-2 border-bottom ${className}`} style={{ minHeight: '44px' }}>
            <div className="d-flex align-items-center" style={{ width: '40px' }}>
                <span className={`text-${color}`} style={{ fontSize: '18px' }}>
                    {icon}
                </span>
            </div>
            <div className="flex-grow-1">
                <div className="d-flex align-items-center justify-content-between">
                    <span className="small text-muted" style={{ fontSize: '0.85rem' }}>
                        {label}
                    </span>
                    <div className="d-flex align-items-center gap-2">
                        <span className="fw-bold" style={{ fontSize: '1rem' }}>
                            {typeof value === 'boolean' 
                                ? (value ? t('descripcion:yes') : t('descripcion:no'))
                                : Array.isArray(value)
                                    ? value.join(', ')
                                    : value}
                        </span>
                        {badge && (
                            <Badge bg={badge.color} className="ms-2" style={{ fontSize: '0.7rem', padding: '2px 6px' }}>
                                {badge.text}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

    // 🔥 HEADER COMPACTO CON TÍTULO Y DATOS CLAVE
    const generateCompactHeader = () => {
        const categoryIcons = {
            'immobilier': <FaHome />,
            'automobiles': <FaCar />,
            'vetements': <FaTshirt />,
            'telephones': <FaMobileAlt />,
            'informatique': <FaLaptop />,
            'electromenager': <FaCogs />,
            'sante_beaute': <FaHeart />,
            'meubles': <FaCouch />,
            'alimentaires': <FaUtensils />,
            'materiaux': <FaBox />,
            'services': <FaConciergeBell />,
            'loisirs': <FaGamepad />,
            'emploi': <FaBriefcase />,
            'sport': <FaFootballBall />,
            'voyages': <FaPlane />,
        };

        const categoryIcon = categoryIcons[postData.categorie] || <FaTag />;
        const categoryLabel = t(`descripcion:${postData.categorie}`, postData.categorie);

        return (
            <div className="mb-4">
                {/* TÍTULO PRINCIPAL */}
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                        <div className="text-primary" style={{ fontSize: '28px' }}>
                            {categoryIcon}
                        </div>
                        <div className="flex-grow-1">
                            <h1 className="h4 fw-bold mb-1" style={{ lineHeight: '1.3' }}>
                                {postData.title || t('descripcion:noTitle')}
                            </h1>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <Badge bg="light" text="dark" className="py-1 px-2" style={{ fontSize: '0.8rem' }}>
                                    {categoryLabel}
                                </Badge>
                                {postData.subCategory && (
                                    <span className="text-muted small d-flex align-items-center gap-1">
                                        <FaChevronRight size={10} />
                                        {t(`createpost:options.${postData.subCategory}`, postData.subCategory)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* PRECIO EN LA MISMA LÍNEA */}
                    {postData.price && (
                        <div className="text-end ms-2">
                            <div className="h4 fw-bold text-success mb-0">
                                {postData.price} {postData.currency || 'DZD'}
                            </div>
                            {postData.negotiable && (
                                <Badge bg="warning" className="mt-1" style={{ fontSize: '0.7rem' }}>
                                    {t('descripcion:negotiable')}
                                </Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* DATOS CLAVE EN GRID COMPACTO */}
                <Row className="g-2 mb-3">
                    {postData.brand && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={<FaTag />}
                                label={t('descripcion:brand')}
                                value={postData.brand}
                                color="primary"
                            />
                        </Col>
                    )}
                    
                    {postData.etat && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={<FaGem />}
                                label={t('descripcion:condition')}
                                value={t(`createpost:options.${postData.etat}`, postData.etat)}
                                color="warning"
                            />
                        </Col>
                    )}
                    
                    {postData.superficie && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={<FaRuler />}
                                label={t('descripcion:surface')}
                                value={`${postData.superficie} m²`}
                                color="success"
                            />
                        </Col>
                    )}
                    
                    {postData.nombrePieces && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={<FaHome />}
                                label={t('descripcion:rooms')}
                                value={postData.nombrePieces}
                                color="info"
                            />
                        </Col>
                    )}
                </Row>
            </div>
        );
    };

    // 📋 SECCIÓN DE DESCRIPCIÓN COMPACTA
    const generateCompactDescription = () => {
        const textToShow = postData.description || postData.content;
        if (!textToShow) return null;

        return (
            <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                    <FaInfoCircle className="text-primary me-2" />
                    <h6 className="mb-0 fw-bold">{t('descripcion:description')}</h6>
                </div>
                <div className="bg-light p-3 rounded" style={{ fontSize: '0.95rem' }}>
                    <p className="mb-0" style={{ lineHeight: '1.5' }}>
                        {readMore ? textToShow : `${textToShow.substring(0, 120)}...`}
                    </p>
                    {textToShow.length > 120 && (
                        <Button 
                            variant="link" 
                            className="mt-2 p-0 text-decoration-none small"
                            onClick={() => setReadMore(!readMore)}
                        >
                            {readMore ? t('descripcion:seeLess') : '› ' + t('descripcion:readMore')}
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    // 🔍 ESPECIFICACIONES EN LISTA COMPACTA
    const generateCompactSpecifications = () => {
        const excludedFields = [
            'title', 'description', 'content', 'price', 'prix', 'loyer', 'currency',
            'wilaya', 'commune', 'location', 'numeroTelephone', 'telefono', 'contactPhone',
            'email', 'brand', 'marque', 'condition', 'etat', 'articleType',
            'categorie', 'subCategory', 'subSubCategory', 'user', 
            'createdAt', 'updatedAt', 'status', 'views', 'likes', 'comments', 
            'images', '_id', 'specificData', 'data', 'categorySpecificData',
            'superficie', 'surface', 'nombrePieces', 'pieces'
        ];

        const specificFields = Object.keys(postData)
            .filter(key => !excludedFields.includes(key) && 
                          postData[key] !== undefined && 
                          postData[key] !== null &&
                          postData[key] !== '')
            .map(key => ({ key, value: postData[key] }));

        if (specificFields.length === 0) return null;

        const fieldIcons = {
            'annee': <FaCalendarAlt />,
            'kilometrage': <FaCar />,
            'carburant': <FaCar />,
            'couleur': <FaPaintBrush />,
            'taille': <FaRuler />,
            'capacite': <FaBox />,
            'quantite': <FaShoppingCart />,
            'garage': <FaCar />,
            'piscine': <FaSwimmingPool />,
            'jardin': <FaTree />,
            'etage': <FaBuilding />,
            'ascenseur': <FaBuilding />,
            'parking': <FaCar />,
            'meuble': <FaCouch />,
            'chambres': <FaBed />,
            'sallesBain': <FaBath />,
            'model': <FaTag />,
            'couleur': <FaPaintBrush />,
            'marque': <FaTag />,
            'default': <FaTag />
        };

        return (
            <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                    <FaCrown className="text-warning me-2" />
                    <h6 className="mb-0 fw-bold">{t('descripcion:specifications')}</h6>
                </div>
                
                <div className="row g-0">
                    {specificFields.map((field, index) => (
                        <div key={field.key} className="col-12 col-md-6">
                            <CompactLine
                                icon={fieldIcons[field.key] || fieldIcons.default}
                                label={t(`descripcion:${field.key}`, field.key.replace(/_/g, ' '))}
                                value={field.value}
                                color="dark"
                                className={index % 2 === 0 ? 'pe-md-2' : 'ps-md-2'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    // 📍 UBICACIÓN COMPACTA
    const generateCompactLocation = () => {
        const hasLocation = postData.wilaya || postData.commune || postData.location;
        if (!hasLocation) return null;

        return (
            <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    <h6 className="mb-0 fw-bold">{t('descripcion:location')}</h6>
                </div>
                
                <div className="bg-light rounded p-3">
                    <div className="row g-2">
                        {postData.wilaya && (
                            <div className="col-12 col-md-6">
                                <CompactLine
                                    icon={<FaBuilding />}
                                    label={t('descripcion:wilaya')}
                                    value={postData.wilaya}
                                    color="primary"
                                    className="border-0"
                                />
                            </div>
                        )}
                        
                        {postData.commune && (
                            <div className="col-12 col-md-6">
                                <CompactLine
                                    icon={<FaCity />}
                                    label={t('descripcion:commune')}
                                    value={postData.commune}
                                    color="info"
                                    className="border-0"
                                />
                            </div>
                        )}
                        
                        {postData.location && (
                            <div className="col-12">
                                <CompactLine
                                    icon={<FaGlobe />}
                                    label={t('descripcion:address')}
                                    value={postData.location}
                                    color="warning"
                                    className="border-0"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // 👤 INFO DEL USUARIO COMPACTA
    const generateCompactUserInfo = () => {
        if (!post.user) return null;
        
        const user = post.user;
        const phone = postData.numeroTelephone || postData.contactPhone || postData.telefono || user.phone;

        return (
            <div className="mt-4 pt-4 border-top">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                            <FaUser className="text-primary" />
                            {t('descripcion:seller')}
                        </h5>
                        {user.verified && (
                            <Badge bg="success" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                                <FaCheckCircle size={10} /> {t('descripcion:verified')}
                            </Badge>
                        )}
                    </div>
                    
                    <div className="text-muted small">
                        {t('descripcion:memberSince')}: {user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
                    </div>
                </div>
                
                <div className="d-flex align-items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '2px solid #e5e7eb',
                            backgroundColor: '#f3f4f6'
                        }}>
                            {user.avatar ? (
                                <img 
                                    src={user.avatar} 
                                    alt={user.username}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-primary">
                                    <span className="fs-5 fw-bold text-white">
                                        {user.username?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Info usuario */}
                    <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0 fw-bold">
                                {user.fullname || user.username}
                            </h6>
                            <div className="text-muted small">@{user.username}</div>
                        </div>
                        
                        {/* Rating y stats */}
                        <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="d-flex align-items-center gap-1">
                                <FaStar className="text-warning" size={14} />
                                <span className="fw-bold">{(user.rating || 5.0).toFixed(1)}</span>
                                <span className="text-muted small">({user.ratingCount || 0})</span>
                            </div>
                            <div className="text-muted small">•</div>
                            <div className="text-muted small">
                                {user.postCount || 0} {t('descripcion:posts').toLowerCase()}
                            </div>
                        </div>
                        
                        {/* Información de contacto */}
                        {(phone || user.email) && (
                            <div className="d-flex align-items-center gap-3 flex-wrap mt-2">
                                {phone && (
                                    <div className="d-flex align-items-center gap-2">
                                        <FaPhone className="text-success" size={14} />
                                        <span className="fw-bold">{phone}</span>
                                        <Button 
                                            variant="outline-success" 
                                            size="sm"
                                            className="py-0 px-2"
                                            onClick={() => window.location.href = `tel:${phone}`}
                                        >
                                            {t('descripcion:call')}
                                        </Button>
                                    </div>
                                )}
                                
                                {user.email && (
                                    <div className="d-flex align-items-center gap-2">
                                        <FaEnvelope className="text-primary" size={14} />
                                        <span className="text-muted small">{user.email}</span>
                                    </div>
                                )}
                                
                                {auth.user && (
                                    <Button 
                                        variant="primary" 
                                        size="sm"
                                        className="d-flex align-items-center gap-1 py-1 px-3"
                                        onClick={() => {
                                            if (!auth.user) {
                                                dispatch({ 
                                                    type: GLOBALTYPES.ALERT, 
                                                    payload: { error: t('descripcion:loginToChat') } 
                                                });
                                                return;
                                            }
                                            
                                            const existingConversation = message.data?.find(item => item._id === user._id);
                                            if (existingConversation) {
                                                history.push(`/message/${user._id}`);
                                            } else {
                                                dispatch({
                                                    type: MESS_TYPES.ADD_USER,
                                                    payload: { 
                                                        ...user, 
                                                        text: '', 
                                                        media: [],
                                                        postTitle: postData.title,
                                                        postId: post._id
                                                    }
                                                });
                                                history.push(`/message/${user._id}`);
                                            }
                                        }}
                                    >
                                        <FaComment size={12} /> {t('descripcion:chat')}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // 📊 INFO ADICIONAL EN ACORDIÓN
    const generateCompactAdditionalInfo = () => {
        return (
            <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="py-2" style={{ fontSize: '0.9rem' }}>
                        <div className="d-flex align-items-center gap-2">
                            <FaCalendarAlt className="text-info" size={14} />
                            <span>{t('descripcion:additionalInfo')}</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-2">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <FaCalendarAlt className="text-muted" size={12} />
                                    <span className="small">{t('descripcion:publishedOn')}</span>
                                </div>
                                <Badge bg="light" text="dark" className="small">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                                </Badge>
                            </ListGroup.Item>
                            
                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <FaEye className="text-muted" size={12} />
                                    <span className="small">{t('descripcion:views')}</span>
                                </div>
                                <Badge bg="info" className="small">
                                    {(post.views || 0).toLocaleString()}
                                </Badge>
                            </ListGroup.Item>
                            
                            {post.likes?.length > 0 && (
                                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <FaHeart className="text-danger" size={12} />
                                        <span className="small">{t('descripcion:likes')}</span>
                                    </div>
                                    <Badge bg="danger" className="small">
                                        {post.likes.length}
                                    </Badge>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    };

    if (!isTranslationsReady) {
        return (
            <Container className="py-4">
                <div className="text-center py-4">
                    <div className="spinner-border text-primary" style={{ width: '2rem', height: '2rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <h6 className="mt-3 small text-muted">{t('descripcion:loading')}</h6>
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-3" style={{ direction: isRTL ? 'rtl' : 'ltr', maxWidth: '1200px' }}>
            {/* HEADER COMPACTO */}
            {generateCompactHeader()}
            
            {/* DESCRIPCIÓN */}
            {generateCompactDescription()}
            
            {/* ESPECIFICACIONES */}
            {generateCompactSpecifications()}
            
            {/* UBICACIÓN */}
            {generateCompactLocation()}
            
            {/* INFO ADICIONAL */}
            {generateCompactAdditionalInfo()}
            
            {/* INFO DEL USUARIO */}
            {generateCompactUserInfo()}
        </Container>
    );
};

export default DescriptionPost;