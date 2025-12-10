import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaComment, FaPhone, FaMapMarkerAlt, FaTag, FaPalette, FaRuler, 
  FaVenusMars, FaCloudSun, FaTshirt, FaStore, FaEnvelope, FaCalendarAlt, 
  FaSyncAlt, FaEye, FaShoppingCart, FaBoxes, FaBox, FaHome, FaCar, 
  FaBriefcase, FaGraduationCap, FaMusic, FaFootballBall, FaBaby,
  FaHeart, FaBook, FaLaptop, FaMobileAlt, FaCamera, FaCouch, FaUtensils
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

    // 🔥🔥🔥 NUEVA LÓGICA: COMBINAR TODOS LOS CAMPOS
    const getAllPostData = useCallback(() => {
        if (!post) return {};
        
        console.log('🔍 Estructura del post recibido:', {
            tieneCategorySpecificData: !!post.categorySpecificData,
            tipoCategorySpecificData: typeof post.categorySpecificData,
            keysCategorySpecificData: post.categorySpecificData ? Object.keys(post.categorySpecificData) : [],
            tieneData: !!post.data,
            keysPost: Object.keys(post).filter(k => !['categorySpecificData', 'data'].includes(k))
        });
        
        // Crear objeto combinado
        const combinedData = { ...post };
        
        // 1. Si existe categorySpecificData, combinarlo
        if (post.categorySpecificData && typeof post.categorySpecificData === 'object') {
            Object.keys(post.categorySpecificData).forEach(key => {
                if (post.categorySpecificData[key] !== undefined && post.categorySpecificData[key] !== null) {
                    combinedData[key] = post.categorySpecificData[key];
                }
            });
        }
        
        // 2. Si existe data (formato antiguo), combinarlo también
        if (post.data && typeof post.data === 'object') {
            Object.keys(post.data).forEach(key => {
                if (post.data[key] !== undefined && post.data[key] !== null) {
                    combinedData[key] = post.data[key];
                }
            });
        }
        
        // 3. Campos críticos que deben existir (con valores por defecto)
        const essentialFields = {
            title: combinedData.title || 'Sin título',
            price: combinedData.price || 0,
            description: combinedData.description || combinedData.content || '',
            numeroTelephone: combinedData.numeroTelephone || combinedData.contactPhone || '',
            wilaya: combinedData.wilaya || '',
            commune: combinedData.commune || ''
        };
        
        console.log('🎯 Datos combinados finales:', {
            titulo: essentialFields.title,
            precio: essentialFields.price,
            camposCombinados: Object.keys(combinedData).length,
            camposEspecificos: Object.keys(combinedData).filter(k => 
                !['title', 'description', 'price', 'wilaya', 'commune', 
                  'numeroTelephone', 'images', 'user', '_id', 
                  'createdAt', 'updatedAt', 'categorySpecificData', 'data'].includes(k)
            )
        });
        
        return { ...combinedData, ...essentialFields };
    }, [post]);
    
    const postData = getAllPostData(); // 🔥 Ahora contiene TODOS los campos
    
    // 🔥 FUNCIÓN DE TRADUCCIÓN MEJORADA
    const translateOption = useCallback((optionKey, fallback = '') => {
        if (!optionKey) return fallback;
        
        const translation = t(`createpost:options.${optionKey}`, { defaultValue: '' });
        if (translation) return translation;
        
        const descripcionTranslation = t(`descripcion:${optionKey}`, { defaultValue: '' });
        return descripcionTranslation || fallback || optionKey;
    }, [t]);

    // 🔥 OBTENER ÍCONO SEGÚN CATEGORÍA
    const getCategoryIcon = (category) => {
        const icons = {
            'mode': <FaTshirt />,
            'automobiles': <FaCar />,
            'immobilier': <FaHome />,
            'emploi': <FaBriefcase />,
            'education': <FaGraduationCap />,
            'musique': <FaMusic />,
            'sport': <FaFootballBall />,
            'bebe': <FaBaby />,
            'sante': <FaHeart />,
            'livres': <FaBook />,
            'informatique': <FaLaptop />,
            'telephonie': <FaMobileAlt />,
            'photo': <FaCamera />,
            'maison': <FaCouch />,
            'voyages': <FaEnvelope />,
            'services': <FaUtensils />
        };
        return icons[category] || <FaTag />;
    };

    // 🔥 LÓGICA DEL CHAT - AHORA USA postData
    const handleChatWithOwner = () => {
        if (!auth.user) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: t('descripcion:loginToChat') } 
            });
            return;
        }

        if (!post.user || !post.user._id) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: t('descripcion:cannotContactSeller') } 
            });
            return;
        }

        try {
            const existingConversation = message.data.find(item => item._id === post.user._id);
            
            if (existingConversation) {
                history.push(`/message/${post.user._id}`);
                return;
            }

            dispatch({
                type: MESS_TYPES.ADD_USER,
                payload: { 
                    ...post.user, 
                    text: '', 
                    media: [],
                    postTitle: postData.title || t('descripcion:generalProduct'),
                    postId: post._id
                }
            });

            history.push(`/message/${post.user._id}`);

            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { success: t('descripcion:conversationStarted') }
            });

        } catch (error) {
            console.error('Erreur lors du démarrage de la conversation:', error);
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: t('descripcion:chatError') }
            });
        }
    };

    const handleCallOwner = () => {
        const phone = postData.numeroTelephone || postData.contactPhone;
        if (!phone) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: t('descripcion:phoneNotAvailable') } 
            });
            return;
        }
        
        if (window.confirm(t('descripcion:confirmCall', { phone }))) {
            window.location.href = `tel:${phone}`;
        }
    };

    const handleOpenMap = () => {
        if (!postData.location && !postData.wilaya && !postData.commune) {
            dispatch({ 
                type: GLOBALTYPES.ALERT, 
                payload: { error: t('descripcion:locationNotAvailable') } 
            });
            return;
        }

        try {
            localStorage.setItem('currentPost', JSON.stringify(post));
        } catch (error) {
            console.log("Error guardando en localStorage:", error);
        }

        history.push('/map', { 
            postData: post 
        });
    };

    // 🎨 ESTILOS
    const styles = {
        primaryColor: "#8b5cf6",
        accentColor: "#f472b6",
        successColor: "#34d399",
        warningColor: "#fbbf24",
        textDark: "#000000",
        textMedium: "#374151",
        textLight: "#ffffff",
        mainGradient: "linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)",
        contactGradient: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
        cardShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    };

    // 🔥 TRADUCCIONES PARA LOS VALORES
    const getTranslatedValue = (field, value) => {
        if (!value) return '';
        
        // Para arrays, traducir cada elemento
        if (Array.isArray(value)) {
            return value.map(item => translateOption(`${field}.${item}`, item)).join(', ');
        }
        
        // Para valores booleanos (true/false)
        if (typeof value === 'boolean') {
            return value ? t('descripcion:yes') : t('descripcion:no');
        }
        
        // Si es un objeto, convertirlo a string JSON
        if (typeof value === 'object' && value !== null) {
            console.warn(`⚠️ Campo "${field}" es un objeto, convirtiendo:`, value);
            return JSON.stringify(value, null, 2);
        }
        
        // Para valores individuales
        return translateOption(`${field}.${value}`, value.toString());
    };

    // 🔥 COMPONENTE PARA MOSTRAR CAMPO - SEGURO CONTRA OBJETOS
    const FieldDisplay = ({ label, value, icon, type = "text", isHighlighted = false }) => {
        // Validar que el valor no sea un objeto profundo
        const safeValue = React.useMemo(() => {
            if (value === null || value === undefined || value === '') {
                return null;
            }
            
            // Si es un objeto, convertirlo
            if (typeof value === 'object' && !Array.isArray(value)) {
                return JSON.stringify(value);
            }
            
            return value;
        }, [value]);

        if (!safeValue) return null;

        const displayValue = type === 'translated' ? getTranslatedValue(type, safeValue) : 
                           (type ? getTranslatedValue(type, safeValue) : safeValue.toString());

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                padding: '10px 0',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                wordBreak: 'break-word',
                backgroundColor: isHighlighted ? '#f0f9ff' : 'transparent',
                borderRadius: isHighlighted ? '8px' : '0',
                paddingLeft: isHighlighted ? '12px' : '0',
                paddingRight: isHighlighted ? '12px' : '0'
            }}>
                <span style={{
                    fontWeight: '600',
                    color: isHighlighted ? '#1e40af' : '#000000',
                    minWidth: isRTL ? 'auto' : '160px',
                    fontSize: '17px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    flexShrink: 0,
                    textAlign: isRTL ? 'right' : 'left'
                }}>
                    {icon} {label}:
                </span>
                <span style={{ 
                    fontSize: '17px',
                    color: isHighlighted ? '#1e40af' : '#374151',
                    fontWeight: isHighlighted ? '700' : '500',
                    flex: 1,
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word',
                    backgroundColor: isHighlighted ? '#dbeafe' : '#f8fafc',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: isHighlighted ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                    lineHeight: '1.5'
                }}>
                    {displayValue}
                </span>
            </div>
        );
    };

    // 💰 COMPONENTE PRECIO
    const PriceDisplay = () => {
        if (!postData.price) return null;

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: '#ecfdf5',
                borderRadius: '10px',
                border: '2px solid #10b981',
                marginBottom: '16px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <span style={{ 
                    fontWeight: '700',
                    color: '#000000',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    💰 {t('descripcion:price')}:
                </span>
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                    <div style={{ 
                        fontSize: '28px',
                        fontWeight: '800',
                        color: '#065f46'
                    }}>
                        {postData.price} {postData.currency || 'DZD'}
                    </div>
                    {postData.negotiable && (
                        <div style={{
                            fontSize: '14px',
                            color: '#059669',
                            fontWeight: '600',
                            marginTop: '4px'
                        }}>
                            {t('descripcion:negotiable')}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔥 SECCIÓN PRINCIPAL CON INFORMACIÓN BÁSICA
    const generateMainSection = () => {
        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '20px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '15px',
                    marginBottom: '15px'
                }}>
                    {getCategoryIcon(post.categorie)}
                    <h1 style={{
                        margin: 0,
                        fontSize: '26px',
                        fontWeight: '800',
                        wordBreak: 'break-word'
                    }}>
                        {postData.title}
                    </h1>
                </div>
                
                <p style={{
                    fontSize: '19px',
                    opacity: '0.95',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    wordBreak: 'break-word',
                    fontWeight: '600'
                }}>
                    {getTranslatedValue('categories', post.subCategory)} 
                    {postData.subSubCategory && ` - ${getTranslatedValue('categories', postData.subSubCategory)}`}
                </p>

                {/* Información clave */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    {postData.brand && (
                        <div style={{ 
                            textAlign: 'center', 
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '14px 18px',
                            borderRadius: '8px',
                            minWidth: '140px'
                        }}>
                            <div style={{ 
                                fontSize: '15px',
                                opacity: '0.9',
                                fontWeight: '600',
                                marginBottom: '6px'
                            }}>
                                {t('descripcion:brand')}
                            </div>
                            <div style={{ 
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {postData.brand}
                            </div>
                        </div>
                    )}

                    {postData.condition && (
                        <div style={{ 
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '14px 18px',
                            borderRadius: '8px',
                            minWidth: '140px'
                        }}>
                            <div style={{ 
                                fontSize: '15px',
                                opacity: '0.9',
                                fontWeight: '600',
                                marginBottom: '6px'
                            }}>
                                {t('descripcion:condition')}
                            </div>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {getTranslatedValue('conditions', postData.condition)}
                            </div>
                        </div>
                    )}

                    {postData.articleType && (
                        <div style={{ 
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '14px 18px',
                            borderRadius: '8px',
                            minWidth: '140px'
                        }}>
                            <div style={{ 
                                fontSize: '15px',
                                opacity: '0.9',
                                fontWeight: '600',
                                marginBottom: '6px'
                            }}>
                                {t('descripcion:type')}
                            </div>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {getTranslatedValue('articleTypes', postData.articleType)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔥 SECCIÓN DESCRIPCIÓN
    const generateDescriptionSection = () => {
        const textToShow = postData.description || postData.content;
        if (!textToShow) return null;

        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #e5e7eb',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '16px',
                    color: styles.primaryColor,
                    fontSize: '22px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FaTag /> {t('descripcion:description')}
                </h2>
                <div style={{
                    fontSize: '17px',
                    color: '#374151',
                    lineHeight: '1.6',
                    textAlign: isRTL ? 'right' : 'left',
                    wordBreak: 'break-word'
                }}>
                    <span>
                        {
                            textToShow.length < 120
                                ? textToShow
                                : readMore ? textToShow + ' ' : textToShow.slice(0, 120) + '...'
                        }
                    </span>
                    {textToShow.length > 120 && (
                        <span
                            style={{
                                color: styles.primaryColor,
                                cursor: 'pointer',
                                fontWeight: '600',
                                marginLeft: isRTL ? '0' : '10px',
                                marginRight: isRTL ? '10px' : '0',
                                fontSize: '16px',
                                display: 'inline-block',
                                marginTop: '10px'
                            }}
                            onClick={() => setReadMore(!readMore)}
                        >
                            {readMore ? t('descripcion:seeLess') : t('descripcion:readMore')}
                        </span>
                    )}
                </div>
            </div>
        );
    };

    // 🔥 SECCIÓN INFORMACIÓN ESPECÍFICA POR CATEGORÍA
    const generateCategorySpecificSection = () => {
        // Lista de campos comunes que ya se muestran en otras secciones
        const excludedFields = [
            'title', 'description', 'content', 'price', 'currency', 'negotiable',
            'wilaya', 'commune', 'location', 'numeroTelephone', 'contactPhone',
            'brand', 'condition', 'articleType', 'categorie', 'subCategory',
            'subSubCategory', 'user', 'createdAt', 'updatedAt', 'status',
            'views', 'likes', 'comments', 'images', '_id',
            'categorySpecificData', 'data' // 🔥 Excluir los contenedores
        ];

        // Obtener todos los campos específicos
        const specificFields = Object.keys(postData)
            .filter(key => !excludedFields.includes(key) && postData[key])
            .map(key => ({
                key,
                value: postData[key],
                label: t(`descripcion:${key}`, key),
                icon: getFieldIcon(key)
            }))
            .filter(field => {
                const val = field.value;
                return val !== '' && val !== null && val !== undefined && 
                       (!Array.isArray(val) || val.length > 0);
            });

        if (specificFields.length === 0) return null;

        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #bae6fd',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    color: styles.primaryColor,
                    fontSize: '22px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    {getCategoryIcon(post.categorie)} {t('descripcion:specifications')}
                </h2>
                
                {specificFields.map(field => (
                    <FieldDisplay
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        icon={field.icon}
                        type={field.key}
                    />
                ))}
            </div>
        );
    };

    // 🔥 OBTENER ÍCONO SEGÚN EL CAMPO
    const getFieldIcon = (fieldName) => {
        const iconMap = {
            // Automóviles
            'marque': '🚗',
            'modele': '🏎️',
            'annee': '📅',
            'kilometrage': '🛣️',
            'carburant': '⛽',
            'boite': '⚙️',
            'puissance': '⚡',
            'couleur': '🎨',
            
            // Viajes
            'typeVoyage': '✈️',
            'destinationType': '🌍',
            'startDate': '📅',
            'endDate': '📅',
            'pricePerPerson': '💰',
            
            // Inmobiliaria
            'surface': '📐',
            'pieces': '🏠',
            'etage': '🏢',
            'meuble': '🛋️',
            'quartier': '📍',
            
            // Empleo
            'salaire': '💰',
            'contrat': '📝',
            'experience': '💼',
            'formation': '🎓',
            
            // Moda
            'gender': <FaVenusMars />,
            'season': <FaCloudSun />,
            'material': <FaTshirt />,
            'sizes': <FaRuler />,
            'colors': <FaPalette />,
            
            // General
            'phone': <FaPhone />,
            'email': <FaEnvelope />,
            'address': <FaMapMarkerAlt />,
            'date': <FaCalendarAlt />,
            
            // Por defecto
            'default': <FaTag />
        };

        return iconMap[fieldName] || iconMap['default'];
    };

    // 🔥 SECCIÓN UBICACIÓN
    const generateLocationSection = () => {
        const hasLocation = postData.wilaya || postData.commune || postData.location;
        if (!hasLocation) return null;

        return (
            <div style={{
                backgroundColor: '#faf5ff',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #e9d5ff',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    color: styles.primaryColor,
                    fontSize: '22px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    <FaMapMarkerAlt /> {t('descripcion:location')}
                </h2>

                <FieldDisplay
                    label={t('descripcion:wilaya')}
                    value={postData.wilaya}
                    icon="🏛️"
                    type="wilayas"
                />
                
                <FieldDisplay
                    label={t('descripcion:commune')}
                    value={postData.commune}
                    icon="🏘️"
                />
                
                <FieldDisplay
                    label={t('descripcion:address')}
                    value={postData.location}
                    icon="📍"
                />
            </div>
        );
    };

    // 🔥 SECCIÓN CONTACTO
    const generateContactSection = () => {
        const phone = postData.numeroTelephone || postData.contactPhone;
        const email = postData.email;
        const hasContact = phone || email;

        if (!hasContact) return null;

        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    margin: '0 0 20px 0',
                    fontSize: '22px',
                    fontWeight: '700'
                }}>
                    {t('descripcion:contact')}
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '20px'
                }}>
                    {/* Teléfono */}
                    {phone && (
                        <div 
                            style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                padding: '12px 14px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                flex: 1,
                                justifyContent: 'center'
                            }}
                            onClick={handleCallOwner}
                        >
                            <FaPhone size={20} />
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                {t('descripcion:call')}
                            </span>
                        </div>
                    )}

                    {/* Chat */}
                    <div 
                        style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            flex: 1,
                            justifyContent: 'center'
                        }}
                        onClick={handleChatWithOwner}
                    >
                        <FaComment size={20} />
                        <span style={{ fontSize: '16px', fontWeight: '600' }}>
                            {t('descripcion:message')}
                        </span>
                    </div>

                    {/* Mapa */}
                    {(postData.location || postData.wilaya || postData.commune) && (
                        <div 
                            style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                cursor: 'pointer',
                                padding: '12px 14px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                flex: 1,
                                justifyContent: 'center'
                            }}
                            onClick={handleOpenMap}
                        >
                            <FaMapMarkerAlt size={20} />
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                {t('descripcion:map')}
                            </span>
                        </div>
                    )}
                </div>

                {/* Información de contacto */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    {phone && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaPhone size={16} />
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{phone}</span>
                        </div>
                    )}
                    
                    {email && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FaEnvelope size={16} />
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>{email}</span>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    // 🔥 SECCIÓN INFORMACIÓN ADICIONAL
    const generateAdditionalInfoSection = () => {
        return (
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #e5e7eb',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    color: styles.primaryColor,
                    fontSize: '22px',
                    fontWeight: '700'
                }}>
                    {t('descripcion:additionalInfo')}
                </h2>

                {/* Fechas de publicación */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    <FaCalendarAlt style={{ color: '#6b7280', fontSize: '18px' }} />
                    <span style={{ fontWeight: '600', color: '#000000', fontSize: '17px' }}>
                        {t('descripcion:publishedOn')}:
                    </span>
                    <span style={{ color: '#374151', fontSize: '17px' }}>
                        {new Date(post.createdAt).toLocaleDateString()} à {new Date(post.createdAt).toLocaleTimeString()}
                    </span>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    marginBottom: '12px',
                    flexDirection: isRTL ? 'row-reverse' : 'row'
                }}>
                    <FaSyncAlt style={{ color: '#6b7280', fontSize: '18px' }} />
                    <span style={{ fontWeight: '600', color: '#000000', fontSize: '17px' }}>
                        {t('descripcion:updatedOn')}:
                    </span>
                    <span style={{ color: '#374151', fontSize: '17px' }}>
                        {new Date(post.updatedAt).toLocaleDateString()} à {new Date(post.updatedAt).toLocaleTimeString()}
                    </span>
                </div>

                {/* Vistas */}
                {post.views > 0 && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexDirection: isRTL ? 'row-reverse' : 'row'
                    }}>
                        <FaEye style={{ color: '#6b7280', fontSize: '18px' }} />
                        <span style={{ fontWeight: '600', color: '#000000', fontSize: '17px' }}>
                            {t('descripcion:views')}:
                        </span>
                        <span style={{ color: '#374151', fontSize: '17px' }}>
                            {post.views}
                        </span>
                    </div>
                )}
            </div>
        );
    };

    // 🔥 SECCIÓN PRECIO (si existe)
    const generatePricingSection = () => {
        if (!postData.price) return null;

        return (
            <div style={{
                backgroundColor: '#fffbeb',
                padding: '20px',
                borderRadius: '10px',
                marginBottom: '16px',
                border: '1px solid #fde68a',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    color: styles.warningColor,
                    fontSize: '22px',
                    fontWeight: '700'
                }}>
                    {t('descripcion:pricing')}
                </h2>
                <PriceDisplay />
            </div>
        );
    };

    if (!isTranslationsReady) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                direction: isRTL ? 'rtl' : 'ltr'
            }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">{t('descripcion:loading')}</p>
                </div>
            </div>
        );
    }

    // 🎯 RENDER PRINCIPAL
    return (
        <div style={{
            direction: isRTL ? 'rtl' : 'ltr',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            lineHeight: '1.5',
            color: '#374151',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '16px',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            {generateMainSection()}
            {generateDescriptionSection()}
            {generatePricingSection()}
            {generateCategorySpecificSection()}
            {generateLocationSection()}
            {generateAdditionalInfoSection()}
            {generateContactSection()}
        </div>
    );
};

export default DescriptionPost;