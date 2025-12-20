import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Container, Row, Col, Badge, Button, 
  Accordion, ListGroup
} from 'react-bootstrap';
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

    // 🏷️ GENERAR TÍTULO A PARTIR DE CAMPOS COMBINADOS
    const generateTitleFromFields = () => {
        const parts = [];
        
        // 1. Marque/Brand
        if (postData.marque || postData.brand) {
            parts.push(postData.marque || postData.brand);
        }
        
        // 2. Model/Modèle
        if (postData.model || postData.modele) {
            parts.push(postData.model || postData.modele);
        }
        
        // 3. Para vehículos: Année
        if (postData.annee) {
            parts.push(`(${postData.annee})`);
        }
        
        // 4. Para inmuebles: Superficie
       
        // 5. Ubicación: Wilaya
       
        
        // 6. Tipo/Subcategoría
        if (postData.subCategory) {
            const subCategoryMap = {
                'appartement': 'Appartement',
                'villa': 'Villa', 
                'maison': 'Maison',
                'terrain': 'Terrain',
                'local': 'Local',
                'voiture': 'Voiture',
                'moto': 'Moto',
                'velo': 'Vélo',
                'smartphone': 'Smartphone',
                'tablette': 'Tablette',
                'ordinateur': 'Ordinateur',
                'television': 'Télévision',
                'refrigerateur': 'Réfrigérateur',
                'chemise': 'Chemise',
                'pantalon': 'Pantalon',
                'robe': 'Robe',
                'chaussures': 'Chaussures'
            };
            
            const subCategoryLabel = subCategoryMap[postData.subCategory] || 
                                    postData.subCategory.charAt(0).toUpperCase() + 
                                    postData.subCategory.slice(1);
            parts.push(subCategoryLabel);
        }
        
        // Si no hay partes, usar un título por defecto
        if (parts.length === 0) {
            return t('descripcion:noTitle');
        }
        
        return parts.join(' • ');
    };

    // 🎨 CONFIGURACIÓN DE EMOJIS POR CATEGORÍA/TIPO
    const getEmojiForField = (fieldName, value = '') => {
        // Emojis para tipos de campos
        const fieldEmojis = {
            // Campos generales
            'brand': '🏷️',
            'marque': '🏷️',
            'model': '🚗',
            'modele': '🚗',
            'annee': '📅',
            'etat': '⭐',
            'condition': '⭐',
            'superficie': '📏',
            'surface': '📏',
            'nombrePieces': '🏠',
            'pieces': '🏠',
            'chambres': '🛏️',
            'sallesBain': '🚿',
            'jardin': '🌳',
            'piscine': '🏊',
            'garage': '🚗',
            'parking': '🅿️',
            'ascenseur': '🛗',
            'meuble': '🛋️',
            
            // Específicos de vehículos
            'kilometrage': '📊',
            'carburant': '⛽',
            'boite': '⚙️',
            'puissance': '⚡',
            'couleur': '🎨',
            
            // Específicos de electrónica
            'capacite': '💾',
            'ram': '🧠',
            'processeur': '⚡',
            'ecran': '📱',
            
            // Específicos de ropa
            'taille': '📐',
            'couleur': '🎨',
            'matiere': '🧵',
            'sexe': '👤',
            
            // Ubicación
            'wilaya': '📍',
            'commune': '🏘️',
            'location': '🗺️',
            
            // Precio
            'price': '💰',
            'prix': '💰',
            'loyer': '💵',
            
            // Contacto
            'numeroTelephone': '📞',
            'telefono': '📞',
            'contactPhone': '📞',
            'email': '📧',
            
            // Categorías principales (para icono de categoría)
            'immobilier': '🏠',
            'automobiles': '🚗',
            'vetements': '👕',
            'telephones': '📱',
            'informatique': '💻',
            'electromenager': '🔌',
            'sante_beaute': '💄',
            'meubles': '🛋️',
            'alimentaires': '🍎',
            'materiaux': '🧱',
            'services': '🛠️',
            'loisirs': '🎮',
            'emploi': '💼',
            'sport': '⚽',
            'voyages': '✈️',
        };

        // Mapeo de valores específicos a emojis
        const valueEmojis = {
            // Estados/condiciones
            'neuf': '🆕',
            'occasion': '🔄',
            'tres_bon_etat': '⭐⭐⭐',
            'bon_etat': '⭐⭐',
            'etat_moyen': '⭐',
            
            // Combustibles
            'essence': '⛽',
            'diesel': '🛢️',
            'electrique': '🔋',
            'hybride': '⚡⛽',
            
            // Materiales (telas)
            'coton': '👕',
            'laine': '🧥',
            'soie': '👘',
            'cachemire': '🧶',
            'laine_mouton': '🐑',
            'laine_mohair': '🐐',
            'laine_angora': '🐰',
            'cuir': '🐮',
            'jeans': '👖',
            'polyester': '🧵',
            
            // Colores básicos
            'noir': '⚫',
            'blanc': '⚪',
            'rouge': '🔴',
            'bleu': '🔵',
            'vert': '🟢',
            'jaune': '🟡',
            'gris': '⚪',
            'marron': '🟤',
            
            // Géneros
            'homme': '👨',
            'femme': '👩',
            'mixte': '👥',
            'enfant': '👶',
        };

        // Primero intentar con el valor específico
        if (value && valueEmojis[value]) {
            return valueEmojis[value];
        }
        
        // Luego con el nombre del campo
        if (fieldEmojis[fieldName]) {
            return fieldEmojis[fieldName];
        }
        
        // Default emoji basado en el tipo de dato
        if (typeof value === 'boolean') {
            return value ? '✅' : '❌';
        }
        if (typeof value === 'number') {
            return '🔢';
        }
        
        return '📝';
    };

    // 📱 COMPONENTE DE LÍNEA COMPACTA CON EMOJIS
  // 📱 COMPONENTE DE LÍNEA COMPACTA CON EMOJIS - VERSIÓN MEJORADA
// 📱 COMPONENTE DE LÍNEA COMPACTA CON EMOJIS - VERSIÓN CORREGIDA
const CompactLine = ({ icon, label, value, badge = null, className = "" }) => {
    const formatValue = (val) => {
        if (val === undefined || val === null) return '-';
        if (typeof val === 'boolean') return val ? t('descripcion:yes') : t('descripcion:no');
        if (Array.isArray(val)) return val.join(', ');
        if (typeof val === 'object') return Object.values(val).filter(v => v).join(', ');
        if (typeof val === 'number') return new Intl.NumberFormat('fr-FR').format(val);
        return String(val);
    };

    const formattedValue = formatValue(value);
    
    return (
        <div className={`d-flex align-items-center ${className}`} style={{ 
            minHeight: '46px',
            borderBottom: '1px solid #e5e7eb',
            padding: '8px 0',
            margin: '0 -5px' // Compensa padding del contenedor padre
        }}>
            {/* ICONO - COMPACT */}
            <div style={{ 
                width: '28px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 8px 0 5px'
            }}>
                <span style={{ fontSize: '16px' }}>
                    {icon}
                </span>
            </div>
            
            {/* CONTENIDO - BALANCEADO */}
            <div style={{ 
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                minWidth: 0,
                padding: '0 5px'
            }}>
                {/* ETIQUETA */}
                <div style={{
                    flex: 1,
                    minWidth: 0,
                    paddingRight: '12px'
                }}>
                    <span className="fw-bold" style={{ 
                        fontSize: '0.92rem',
                        color: '#111827',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {label}
                    </span>
                </div>
                
                {/* VALOR - ALINEADO DERECHA */}
                <div style={{ 
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    minWidth: 0,
                    maxWidth: '55%'
                }}>
                    <span className="fw-medium" style={{ 
                        fontSize: '0.92rem',
                        color: '#4b5563',
                        textAlign: 'right',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginRight: badge ? '8px' : '0'
                    }}>
                        {formattedValue}
                    </span>
                    
                    {badge && (
                        <Badge bg={badge.color} style={{ 
                            fontSize: '0.65rem', 
                            padding: '1px 5px',
                            flexShrink: 0
                        }}>
                            {badge.text}
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};
    // 🔥 HEADER COMPACTO CON TÍTULO GENERADO
    const generateCompactHeader = () => {
        const categoryEmoji = getEmojiForField(postData.categorie);
        const generatedTitle = generateTitleFromFields();
        
        return (
            <div className="mb-4">
                {/* TÍTULO PRINCIPAL GENERADO */}
                <div className="d-flex align-items-start justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2 flex-grow-1">
                        <div className="text-primary" style={{ fontSize: '32px' }}>
                            {categoryEmoji}
                        </div>
                        <div className="flex-grow-1">
                            <h1 className="h4 fw-bold mb-1" style={{ lineHeight: '1.3' }}>
                                {generatedTitle}
                            </h1>
                            <div className="d-flex align-items-center gap-2 flex-wrap">
                                <Badge bg="light" text="dark" className="py-1 px-2" style={{ fontSize: '0.8rem' }}>
                                    {t(`descripcion:${postData.categorie}`, postData.categorie)}
                                </Badge>
                                {postData.subCategory && (
                                    <span className="text-muted small d-flex align-items-center gap-1">
                                        {getEmojiForField('subCategory')}
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
                                {getEmojiForField('price')} {new Intl.NumberFormat('fr-FR').format(postData.price)} {postData.currency || 'DZD'}
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
                    {postData.marque && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={getEmojiForField('marque', postData.marque)}
                                label={t('descripcion:marque')}
                                value={postData.marque}
                                color="primary"
                            />
                        </Col>
                    )}
                    
                    {postData.model && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={getEmojiForField('model', postData.model)}
                                label={t('descripcion:model')}
                                value={postData.model}
                                color="info"
                            />
                        </Col>
                    )}
                    
                    {postData.etat && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={getEmojiForField('etat', postData.etat)}
                                label={t('descripcion:condition')}
                                value={t(`createpost:options.${postData.etat}`, postData.etat)}
                                color="warning"
                            />
                        </Col>
                    )}
                    
                    {postData.annee && (
                        <Col xs={6} md={3}>
                            <CompactLine
                                icon={getEmojiForField('annee', postData.annee)}
                                label={t('descripcion:year')}
                                value={postData.annee}
                                color="success"
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
                    <span className="text-primary me-2" style={{ fontSize: '20px' }}>📄</span>
                    <h6 className="mb-0 fw-bold">{t('descripcion:description')}</h6>
                </div>
                <div className="bg-light p-3 rounded" style={{ fontSize: '0.95rem' }}>
                    <p className="mb-0" style={{ lineHeight: '1.5', textAlign: isRTL ? 'right' : 'left' }}>
                        {readMore ? textToShow : `${textToShow.substring(0, 120)}...`}
                    </p>
                    {textToShow.length > 120 && (
                        <Button 
                            variant="link" 
                            className="mt-2 p-0 text-decoration-none small"
                            onClick={() => setReadMore(!readMore)}
                        >
                            {readMore ? '👆 ' + t('descripcion:seeLess') : '👇 ' + t('descripcion:readMore')}
                        </Button>
                    )}
                </div>
            </div>
        );
    };

    // 🔍 ESPECIFICACIONES EN LISTA COMPACTA CON EMOJIS
    const generateCompactSpecifications = () => {
        const excludedFields = [
            'title', 'description', 'content', 'price', 'prix', 'loyer', 'currency',
            'wilaya', 'commune', 'location', 'numeroTelephone', 'telefono', 'contactPhone',
            'email', 'brand', 'marque', 'condition', 'etat', 'articleType',
            'categorie', 'subCategory', 'subSubCategory', 'user', 
            'createdAt', 'updatedAt', 'status', 'views', 'likes', 'comments', 
            'images', '_id', 'specificData', 'data', 'categorySpecificData',
            'superficie', 'surface', 'nombrePieces', 'pieces', 'model', 'modele', 'annee'
        ];

        const specificFields = Object.keys(postData)
            .filter(key => !excludedFields.includes(key) && 
                          postData[key] !== undefined && 
                          postData[key] !== null &&
                          postData[key] !== '')
            .map(key => ({ 
                key, 
                value: postData[key],
                emoji: getEmojiForField(key, postData[key])
            }));

        if (specificFields.length === 0) return null;

        return (
            <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                    <span className="text-warning me-2" style={{ fontSize: '20px' }}>📋</span>
                    <h6 className="mb-0 fw-bold">{t('descripcion:specifications')}</h6>
                </div>
                
                <div className="bg-light rounded p-3">
                    <div className="row g-0">
                        {specificFields.map((field, index) => (
                            <div key={field.key} className="col-12 col-md-6">
                                <CompactLine
                                    icon={field.emoji}
                                    label={t(`descripcion:${field.key}`, field.key.replace(/_/g, ' '))}
                                    value={field.value}
                                    color="dark"
                                    className={index % 2 === 0 ? 'pe-md-2' : 'ps-md-2'}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // 📍 UBICACIÓN COMPACTA CON EMOJIS
    const generateCompactLocation = () => {
        const hasLocation = postData.wilaya || postData.commune || postData.location;
        if (!hasLocation) return null;

        return (
            <div className="mb-4">
                <div className="d-flex align-items-center mb-2">
                    <span className="text-danger me-2" style={{ fontSize: '20px' }}>📍</span>
                    <h6 className="mb-0 fw-bold">{t('descripcion:location')}</h6>
                </div>
                
                <div className="bg-light rounded p-3">
                    <div className="row g-0">
                        {postData.wilaya && (
                            <div className="col-12 col-md-6">
                                <CompactLine
                                    icon="🏙️"
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
                                    icon="🏘️"
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
                                    icon="🗺️"
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

    // 👤 INFO DEL USUARIO COMPACTA CON EMOJIS
    const generateCompactUserInfo = () => {
        if (!post.user) return null;
        
        const user = post.user;
        const phone = postData.numeroTelephone || postData.contactPhone || postData.telefono || user.phone;

        return (
            <div className="mt-4 pt-4 border-top">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-2">
                        <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                            <span className="text-primary">👤</span>
                            {t('descripcion:seller')}
                        </h5>
                        {user.verified && (
                            <Badge bg="success" className="py-1 px-2" style={{ fontSize: '0.7rem' }}>
                                ✅ {t('descripcion:verified')}
                            </Badge>
                        )}
                    </div>
                    
                    <div className="text-muted small">
                        🗓️ {t('descripcion:memberSince')}: {user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A'}
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
                                <span className="text-warning">⭐</span>
                                <span className="fw-bold">{(user.rating || 5.0).toFixed(1)}</span>
                                <span className="text-muted small">({user.ratingCount || 0})</span>
                            </div>
                            <div className="text-muted small">•</div>
                            <div className="text-muted small">
                                📝 {user.postCount || 0} {t('descripcion:posts').toLowerCase()}
                            </div>
                        </div>
                        
                        {/* Información de contacto */}
                        {(phone || user.email) && (
                            <div className="d-flex align-items-center gap-3 flex-wrap mt-2">
                                {phone && (
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-success">📞</span>
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
                                        <span className="text-primary">📧</span>
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
                                                        postTitle: generateTitleFromFields(),
                                                        postId: post._id
                                                    }
                                                });
                                                history.push(`/message/${user._id}`);
                                            }
                                        }}
                                    >
                                        💬 {t('descripcion:chat')}
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // 📊 INFO ADICIONAL EN ACORDIÓN CON EMOJIS
    const generateCompactAdditionalInfo = () => {
        return (
            <Accordion className="mb-4">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="py-2" style={{ fontSize: '0.9rem' }}>
                        <div className="d-flex align-items-center gap-2">
                            <span className="text-info">📊</span>
                            <span>{t('descripcion:additionalInfo')}</span>
                        </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-2">
                        <ListGroup variant="flush">
                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-muted">📅</span>
                                    <span className="small">{t('descripcion:publishedOn')}</span>
                                </div>
                                <Badge bg="light" text="dark" className="small">
                                    {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
                                </Badge>
                            </ListGroup.Item>
                            
                            <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                <div className="d-flex align-items-center gap-2">
                                    <span className="text-muted">👁️</span>
                                    <span className="small">{t('descripcion:views')}</span>
                                </div>
                                <Badge bg="info" className="small">
                                    {(post.views || 0).toLocaleString()}
                                </Badge>
                            </ListGroup.Item>
                            
                            {post.likes?.length > 0 && (
                                <ListGroup.Item className="d-flex justify-content-between align-items-center py-2">
                                    <div className="d-flex align-items-center gap-2">
                                        <span className="text-danger">❤️</span>
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
            {/* HEADER COMPACTO CON TÍTULO GENERADO */}
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