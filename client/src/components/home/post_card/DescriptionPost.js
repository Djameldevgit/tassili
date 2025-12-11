import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaComment, FaPhone, FaMapMarkerAlt, FaTag, FaPalette, FaRuler, 
  FaVenusMars, FaCloudSun, FaTshirt, FaStore, FaEnvelope, FaCalendarAlt, 
  FaSyncAlt, FaEye, FaShoppingCart, FaBoxes, FaBox, FaHome, FaCar, 
  FaBriefcase, FaGraduationCap, FaMusic, FaFootballBall, FaBaby,
  FaHeart, FaBook, FaLaptop, FaMobileAlt, FaCamera, FaCouch, FaUtensils,
  FaUser, FaStar, FaCheckCircle, FaBuilding, FaCity, FaGlobe, FaEuroSign,
  FaDollarSign, FaMoneyBillWave, FaShippingFast, FaTools, FaCogs,
  FaPaintBrush, FaTree, FaSwimmingPool, FaBed, FaBath, FaVectorSquare,
  FaLayerGroup, FaMountain, FaSeedling, FaWarehouse, FaStoreAlt,
  FaConciergeBell, FaWrench, FaCarBattery, FaTire, FaOilCan, FaShoePrints, FaGem, FaGlasses, FaShoppingBag,
  FaUtensilSpoon, FaCookieBite, FaWineBottle, FaAppleAlt, FaHamburger,
  FaPizzaSlice, FaIceCream, FaCoffee, FaBeer, FaCocktail,
  FaBookOpen, FaGamepad, FaFilm, FaTheaterMasks, FaCampground,
  FaFishingRod, FaBasketballBall, FaRunning, FaDumbbell, FaBicycle,
  FaShip, FaPlane, FaTrain, FaBus, FaMotorcycle, FaTruck,
  FaUserTie, FaUserGraduate, FaUserMd, FaUserNinja, FaUserAstronaut,
  FaUserCheck, FaUserClock, FaUserCog, FaUserEdit, FaUserFriends,
  FaUserLock, FaUserMinus, FaUserPlus, FaUserSecret, FaUserShield,
  FaUserTimes, FaUsers
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

    // 🔥🔥🔥 NUEVA LÓGICA MEJORADA: COMBINAR TODOS LOS CAMPOS
    const getAllPostData = useCallback(() => {
        if (!post) return {};
        
        console.log('🔍 Analizando estructura del post:', {
            categoria: post.categorie,
            subCategoria: post.subCategory,
            articleType: post.articleType, // ← NUEVO para Immobilier
            tieneSpecificData: !!post.specificData,
            tieneData: !!post.data,
            tieneCategorySpecificData: !!post.categorySpecificData,
            usuario: post.user ? post.user.username : 'Sin usuario'
        });
        
        // Crear objeto combinado con prioridad
        const combinedData = { ...post };
        
        // 🎯 ESTRATEGIA DE COMBINACIÓN POR PRIORIDAD:
        // 1. Campos directos del post (máxima prioridad)
        // 2. Campos de specificData (si existe)
        // 3. Campos de data (compatibilidad)
        // 4. Campos de categorySpecificData (legacy)
        
        const dataSources = [
            post.specificData,    // Nueva estructura recomendada
            post.data,            // Estructura antigua
            post.categorySpecificData // Legacy
        ];
        
        dataSources.forEach(source => {
            if (source && typeof source === 'object') {
                Object.keys(source).forEach(key => {
                    if (source[key] !== undefined && source[key] !== null) {
                        // Solo asignar si no existe ya (prioridad a campos directos)
                        if (combinedData[key] === undefined || combinedData[key] === null) {
                            combinedData[key] = source[key];
                        }
                    }
                });
            }
        });
        
        // 🎯 GESTIÓN ESPECIAL PARA IMMOBILIER
        // Si es immobilier, asegurar que articleType esté disponible
        if (post.categorie === 'immobilier') {
            if (post.articleType) {
                combinedData.articleType = post.articleType;
            }
            // También buscar articleType en data/specificData
            dataSources.forEach(source => {
                if (source?.articleType) {
                    combinedData.articleType = source.articleType;
                }
            });
        }
        
        // 🎯 CAMPOS CRÍTICOS CON VALORES POR DEFECTO
        const essentialFields = {
            title: combinedData.title || 'Sin título',
            description: combinedData.description || combinedData.content || '',
            price: combinedData.price || combinedData.prix || combinedData.loyer || 0,
            numeroTelephone: combinedData.numeroTelephone || combinedData.telefono || combinedData.contactPhone || '',
            wilaya: combinedData.wilaya || '',
            commune: combinedData.commune || '',
            // Para Immobilier específicamente
            superficie: combinedData.superficie || combinedData.surface || '',
            nombrePieces: combinedData.nombrePieces || combinedData.pieces || ''
        };
        
        console.log('🎯 Datos finales combinados:', {
            titulo: essentialFields.title,
            precio: essentialFields.price,
            articleType: combinedData.articleType || 'No especificado',
            categoria: combinedData.categorie,
            subCategoria: combinedData.subCategory,
            camposTotal: Object.keys(combinedData).length,
            camposEspecificos: Object.keys(combinedData).filter(k => 
                !['title', 'description', 'content', 'price', 'prix', 'loyer',
                  'wilaya', 'commune', 'numeroTelephone', 'telefono', 'contactPhone',
                  'images', 'user', '_id', 'createdAt', 'updatedAt', 'status',
                  'views', 'likes', 'comments', 'categorie', 'subCategory',
                  'articleType', 'specificData', 'data', 'categorySpecificData'].includes(k)
            )
        });
        
        return { ...combinedData, ...essentialFields };
    }, [post]);
    
    const postData = getAllPostData();
    
    // 🔥 FUNCIÓN DE TRADUCCIÓN MEJORADA CON SUPPORT PARA IMMOBILIER
    const translateOption = useCallback((optionKey, fallback = '') => {
        if (!optionKey) return fallback;
        
        // Intentar traducción en createpost
        const translation = t(`createpost:options.${optionKey}`, { defaultValue: '' });
        if (translation && translation !== optionKey) return translation;
        
        // Intentar traducción en descripcion
        const descripcionTranslation = t(`descripcion:${optionKey}`, { defaultValue: '' });
        if (descripcionTranslation && descripcionTranslation !== optionKey) return descripcionTranslation;
        
        // Traducciones especiales para Immobilier
        if (postData.categorie === 'immobilier') {
            const immobilierTranslations = {
                'vente': 'Vente',
                'location': 'Location',
                'location_vacances': 'Location vacances',
                'cherche_location': 'Recherche location',
                'cherche_achat': 'Recherche achat',
                'appartement': 'Appartement',
                'villa': 'Villa',
                'terrain': 'Terrain',
                'local': 'Local',
                'immeuble': 'Immeuble',
                'bungalow': 'Bungalow',
                'terrain_agricole': 'Terrain agricole',
                'superficie': 'Superficie',
                'nombrePieces': 'Nombre de pièces',
                'prix': 'Prix',
                'loyer': 'Loyer',
                'caution': 'Caution',
                'dureeBail': 'Durée du bail',
                'etage': 'Étage',
                'ascenseur': 'Ascenseur',
                'parking': 'Parking',
                'meuble': 'Meublé',
                'jardin': 'Jardin',
                'piscine': 'Piscine',
                'garage': 'Garage',
                'etages': 'Nombre d\'étages',
                'zonage': 'Zonage',
                'viabilise': 'Viabilisé',
                'pente': 'Pente',
                'chargesComprises': 'Charges comprises',
                'activiteAutorisee': 'Activité autorisée',
                'vitrine': 'Vitrine',
                'nombreEtages': 'Nombre d\'étages',
                'nombreAppartements': 'Nombre d\'appartements',
                'mobilite': 'Mobilité',
                'capacite': 'Capacité',
                'dureeMinimum': 'Durée minimum',
                'budgetMax': 'Budget maximum'
            };
            
            if (immobilierTranslations[optionKey]) {
                return immobilierTranslations[optionKey];
            }
        }
        
        // Fallback: devolver la clave formateada
        return fallback || optionKey.toString().replace(/_/g, ' ').replace(/([A-Z])/g, ' $1').trim();
    }, [t, postData.categorie]);
    
    // 🔥 OBTENER ÍCONO SEGÚN CATEGORÍA (COMPLETO)
    const getCategoryIcon = (category) => {
        const icons = {
            'immobilier': <FaHome />,
            'automobiles': <FaCar />,
            'vetements': <FaTshirt />,
            'telephones': <FaMobileAlt />,
            'informatique': <FaLaptop />,
            'electromenager': <FaCogs />,
            'piecesDetachees': <FaTools />,
            'sante_beaute': <FaHeart />,
            'meubles': <FaCouch />,
            'alimentaires': <FaUtensils />,
            'materiaux': <FaBox />,
            'services': <FaConciergeBell />,
            'loisirs': <FaGamepad />,
            'emploi': <FaBriefcase />,
            'sport': <FaFootballBall />,
            'voyages': <FaPlane />,
            'mode': <FaTshirt />,
            'education': <FaGraduationCap />,
            'musique': <FaMusic />,
            'bebe': <FaBaby />,
            'livres': <FaBook />,
            'photo': <FaCamera />,
            'maison': <FaHome />
        };
        return icons[category] || <FaTag />;
    };
    
    // 🔥 OBTENER TÍTULO DE CATEGORÍA TRADUCIDO
    const getCategoryTitle = () => {
        const categoryMap = {
            'immobilier': t('descripcion:immobilier', 'Immobilier'),
            'automobiles': t('descripcion:automobiles', 'Automobiles'),
            'vetements': t('descripcion:vetements', 'Vêtements'),
            'telephones': t('descripcion:telephones', 'Téléphones'),
            'informatique': t('descripcion:informatique', 'Informatique'),
            'electromenager': t('descripcion:electromenager', 'Électroménager'),
            'piecesDetachees': t('descripcion:piecesDetachees', 'Pièces détachées'),
            'sante_beaute': t('descripcion:sante_beaute', 'Santé & Beauté'),
            'meubles': t('descripcion:meubles', 'Meubles'),
            'alimentaires': t('descripcion:alimentaires', 'Alimentaires'),
            'materiaux': t('descripcion:materiaux', 'Matériaux'),
            'services': t('descripcion:services', 'Services'),
            'loisirs': t('descripcion:loisirs', 'Loisirs'),
            'emploi': t('descripcion:emploi', 'Emploi'),
            'sport': t('descripcion:sport', 'Sport'),
            'voyages': t('descripcion:voyages', 'Voyages')
        };
        
        return categoryMap[postData.categorie] || postData.categorie;
    };
    
    // 🔥 OBTENER ÍCONO SEGÚN EL CAMPO (COMPLETO PARA TODAS CATEGORÍAS)
    const getFieldIcon = (fieldName) => {
        const iconMap = {
            // GENERALES
            'title': '📝',
            'description': '📋',
            'price': '💰',
            'prix': '💰',
            'loyer': '💵',
            'caution': '🔒',
            'numeroTelephone': '📞',
            'telefono': '📞',
            'contactPhone': '📞',
            'email': '📧',
            'wilaya': '🏛️',
            'commune': '🏘️',
            'location': '📍',
            'address': '📍',
            
            // IMMOBILIER
            'articleType': '📋',
            'superficie': '📐',
            'surface': '📐',
            'nombrePieces': '🚪',
            'pieces': '🚪',
            'etage': '🏢',
            'ascenseur': '🛗',
            'parking': '🅿️',
            'meuble': '🛋️',
            'jardin': '🌳',
            'piscine': '🏊',
            'garage': '🚗',
            'etages': '🏘️',
            'zonage': '🗺️',
            'viabilise': '⚡',
            'pente': '↗️',
            'chargesComprises': '💡',
            'activiteAutorisee': '🏢',
            'vitrine': '🪟',
            'nombreEtages': '🏢',
            'nombreAppartements': '🏠',
            'mobilite': '🚚',
            'capacite': '👥',
            'dureeBail': '⏱️',
            'dureeMinimum': '📅',
            'budgetMax': '💰',
            
            // AUTOMOBILES
            'marque': '🚗',
            'modele': '🏎️',
            'annee': '📅',
            'kilometrage': '🛣️',
            'carburant': '⛽',
            'boite': '⚙️',
            'puissance': '⚡',
            'couleur': '🎨',
            
            // VOYAGES
            'typeVoyage': '✈️',
            'destinationType': '🌍',
            'startDate': '📅',
            'endDate': '📅',
            'pricePerPerson': '💰',
            'pricePerNight': '💰',
            
            // ALIMENTAIRES
            'quantite': '📦',
            'typeProduit': '🍎',
            'datePeremption': '📅',
            'contenance': '🥫',
            
            // SERVICES
            'typeService': '🔧',
            'experience': '💼',
            'zoneIntervention': '🗺️',
            
            // EMPLOI
            'salaire': '💰',
            'contrat': '📝',
            'experienceRequise': '💼',
            'niveauEtude': '🎓',
            
            // MARCAS Y ESTADOS
            'brand': '🏷️',
            'marque': '🏷️',
            'condition': '🔄',
            'etat': '🔄',
            'color': '🎨',
            'couleur': '🎨',
            'size': '📏',
            'taille': '📏',
            'quantity': '📦',
            'quantite': '📦',
            
            // FECHAS
            'createdAt': '📅',
            'updatedAt': '🔄',
            'date': '📅',
            
            // POR DEFECTO
            'default': <FaTag />
        };
        
        return iconMap[fieldName] || iconMap['default'];
    };
    
    // 🔥 LÓGICA DEL CHAT (MANTIENE TU CÓDIGO ORIGINAL)
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
        const phone = postData.numeroTelephone || postData.contactPhone || postData.telefono;
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
    
    // 🎨 ESTILOS (MANTENIENDO TU ESTILO)
    const styles = {
        primaryColor: "#8b5cf6",
        accentColor: "#f472b6",
        successColor: "#34d399",
        warningColor: "#fbbf24",
        infoColor: "#3b82f6",
        textDark: "#000000",
        textMedium: "#374151",
        textLight: "#ffffff",
        mainGradient: "linear-gradient(135deg, #f472b6 0%, #8b5cf6 100%)",
        contactGradient: "linear-gradient(135deg, #fbbf24 0%, #f472b6 100%)",
        userGradient: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        cardShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px"
    };
    
    // 🔥 TRADUCCIONES PARA LOS VALORES
    const getTranslatedValue = (field, value) => {
        if (!value) return '';
        
        // Para arrays, traducir cada elemento
        if (Array.isArray(value)) {
            return value.map(item => translateOption(`${field}.${item}`, item)).join(', ');
        }
        
        // Para valores booleanos
        if (typeof value === 'boolean') {
            return value ? t('descripcion:yes') : t('descripcion:no');
        }
        
        // Para objetos complejos
        if (typeof value === 'object' && value !== null) {
            try {
                return JSON.stringify(value, null, 2);
            } catch {
                return String(value);
            }
        }
        
        // Para valores individuales
        const translated = translateOption(`${field}.${value}`, value.toString());
        return translated;
    };
    
    // 🔥 COMPONENTE PARA MOSTRAR CAMPO
    const FieldDisplay = ({ label, value, icon, type = "text", isHighlighted = false }) => {
        const safeValue = React.useMemo(() => {
            if (value === null || value === undefined || value === '') {
                return null;
            }
            
            if (typeof value === 'object' && !Array.isArray(value)) {
                try {
                    return JSON.stringify(value);
                } catch {
                    return String(value);
                }
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
    
    // 💰 COMPONENTE PRECIO MEJORADO
    const PriceDisplay = () => {
        const price = postData.price || postData.prix || postData.loyer;
        if (!price && price !== 0) return null;

        const isRent = postData.categorie === 'immobilier' && 
                      (postData.articleType === 'location' || postData.articleType === 'location_vacances');
        
        const priceLabel = isRent ? t('descripcion:rent') : t('descripcion:price');
        const currency = postData.currency || 'DZD';

        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: isRent ? '#f0f9ff' : '#ecfdf5',
                borderRadius: '10px',
                border: isRent ? '2px solid #3b82f6' : '2px solid #10b981',
                marginBottom: '16px',
                flexDirection: isRTL ? 'row-reverse' : 'row',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <span style={{ 
                    fontWeight: '700',
                    color: isRent ? '#1e40af' : '#065f46',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                }}>
                    {isRent ? '💵' : '💰'} {priceLabel}:
                </span>
                <div style={{ textAlign: isRTL ? 'left' : 'right' }}>
                    <div style={{ 
                        fontSize: '28px',
                        fontWeight: '800',
                        color: isRent ? '#1e40af' : '#065f46'
                    }}>
                        {price} {currency}
                    </div>
                    {isRent && postData.dureeBail && (
                        <div style={{
                            fontSize: '14px',
                            color: '#3b82f6',
                            fontWeight: '600',
                            marginTop: '4px'
                        }}>
                            {translateOption('dureeBail', postData.dureeBail)}
                        </div>
                    )}
                    {postData.negotiable && (
                        <div style={{
                            fontSize: '14px',
                            color: isRent ? '#3b82f6' : '#059669',
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
        // Determinar subtítulo según categoría
        let subtitle = '';
        if (postData.categorie === 'immobilier' && postData.articleType && postData.subCategory) {
            subtitle = `${translateOption(postData.articleType)} - ${translateOption(postData.subCategory)}`;
        } else if (postData.subCategory) {
            subtitle = translateOption(postData.subCategory);
        }
        
        return (
            <div style={{
                background: styles.mainGradient,
                color: 'white',
                padding: '24px',
                borderRadius: styles.borderRadius,
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
                    marginBottom: '15px',
                    flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {getCategoryIcon(postData.categorie)}
                        <h1 style={{
                            margin: 0,
                            fontSize: '26px',
                            fontWeight: '800',
                            wordBreak: 'break-word'
                        }}>
                            {postData.title}
                        </h1>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}>
                        <span style={{
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '16px',
                            fontWeight: '600'
                        }}>
                            {getCategoryTitle()}
                        </span>
                        
                        {subtitle && (
                            <span style={{
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '16px',
                                fontWeight: '600'
                            }}>
                                {subtitle}
                            </span>
                        )}
                    </div>
                </div>

                {/* Información clave específica por categoría */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap',
                    marginTop: '15px'
                }}>
                    {/* Marca */}
                    {(postData.brand || postData.marque) && (
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
                                {postData.brand || postData.marque}
                            </div>
                        </div>
                    )}

                    {/* Estado/Condición */}
                    {(postData.condition || postData.etat) && (
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
                                {getTranslatedValue('conditions', postData.condition || postData.etat)}
                            </div>
                        </div>
                    )}

                    {/* Para Immobilier: Superficie */}
                    {(postData.superficie || postData.surface) && (
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
                                {t('descripcion:surface')}
                            </div>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {postData.superficie || postData.surface} m²
                            </div>
                        </div>
                    )}

                    {/* Para Immobilier: Número de piezas */}
                    {(postData.nombrePieces || postData.pieces) && (
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
                                {t('descripcion:rooms')}
                            </div>
                            <div style={{
                                fontSize: '18px',
                                fontWeight: '700'
                            }}>
                                {postData.nombrePieces || postData.pieces}
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
                borderRadius: styles.borderRadius,
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
    
    // 🔥 SECCIÓN INFORMACIÓN ESPECÍFICA POR CATEGORÍA (MEJORADA)
    const generateCategorySpecificSection = () => {
        // Campos excluidos (ya se muestran en otras secciones)
        const excludedFields = [
            'title', 'description', 'content', 'price', 'prix', 'loyer', 'currency',
            'wilaya', 'commune', 'location', 'numeroTelephone', 'telefono', 'contactPhone',
            'email', 'brand', 'marque', 'condition', 'etat', 'articleType',
            'categorie', 'subCategory', 'subSubCategory', 'user', 
            'createdAt', 'updatedAt', 'status', 'views', 'likes', 'comments', 
            'images', '_id', 'specificData', 'data', 'categorySpecificData',
            'superficie', 'surface', 'nombrePieces', 'pieces' // Ya mostrados en main
        ];

        // Obtener campos específicos organizados por prioridad
        const specificFields = Object.keys(postData)
            .filter(key => !excludedFields.includes(key) && postData[key] !== undefined && postData[key] !== null)
            .map(key => {
                const value = postData[key];
                let displayValue = value;
                
                // Filtrar valores vacíos
                if (value === '' || (Array.isArray(value) && value.length === 0)) {
                    return null;
                }
                
                // Convertir booleanos
                if (typeof value === 'boolean') {
                    displayValue = value ? t('descripcion:yes') : t('descripcion:no');
                }
                
                // Crear label traducido
                const label = t(`descripcion:${key}`, key);
                
                return {
                    key,
                    value: displayValue,
                    label,
                    icon: getFieldIcon(key),
                    priority: getFieldPriority(key, postData.categorie)
                };
            })
            .filter(field => field !== null)
            .sort((a, b) => b.priority - a.priority); // Ordenar por prioridad

        if (specificFields.length === 0) return null;

        return (
            <div style={{
                backgroundColor: '#f0f9ff',
                padding: '20px',
                borderRadius: styles.borderRadius,
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
                    {getCategoryIcon(postData.categorie)} {t('descripcion:specifications')}
                </h2>
                
                {specificFields.map(field => (
                    <FieldDisplay
                        key={field.key}
                        label={field.label}
                        value={field.value}
                        icon={field.icon}
                        type={field.key}
                        isHighlighted={field.priority > 5}
                    />
                ))}
            </div>
        );
    };
    
    // 🔥 FUNCIÓN PARA ASIGNAR PRIORIDAD A CAMPOS
    const getFieldPriority = (fieldName, category) => {
        const priorityRules = {
            'immobilier': {
                'etage': 10,
                'ascenseur': 9,
                'parking': 9,
                'meuble': 8,
                'jardin': 10,
                'piscine': 10,
                'garage': 9,
                'zonage': 8,
                'viabilise': 8
            },
            'automobiles': {
                'annee': 10,
                'kilometrage': 10,
                'carburant': 9,
                'boite': 9,
                'puissance': 8
            },
            'default': {
                'model': 10,
                'modele': 10,
                'color': 8,
                'couleur': 8,
                'size': 7,
                'taille': 7,
                'quantity': 6,
                'quantite': 6
            }
        };
        
        const categoryRules = priorityRules[category] || priorityRules['default'];
        return categoryRules[fieldName] || 5; // Prioridad media por defecto
    };
    
    // 🔥 SECCIÓN UBICACIÓN
    const generateLocationSection = () => {
        const hasLocation = postData.wilaya || postData.commune || postData.location;
        if (!hasLocation) return null;

        return (
            <div style={{
                backgroundColor: '#faf5ff',
                padding: '20px',
                borderRadius: styles.borderRadius,
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
                
                {postData.location && (
                    <FieldDisplay
                        label={t('descripcion:address')}
                        value={postData.location}
                        icon="📍"
                    />
                )}
            </div>
        );
    };
    
    // 🔥🔥🔥 NUEVA SECCIÓN: INFORMACIÓN DEL USUARIO (AL FINAL)
    const generateUserInfoSection = () => {
        if (!post.user) return null;
        
        const user = post.user;
        const userSince = user.createdAt ? new Date(user.createdAt).getFullYear() : 'N/A';
        const userRating = user.rating || '5.0';
        const totalPosts = user.postCount || 0;
        const isVerified = user.verified || false;
        
        return (
            <div style={{
                background: styles.userGradient,
                color: 'white',
                padding: '24px',
                borderRadius: styles.borderRadius,
                marginBottom: '16px',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <h2 style={{
                    marginBottom: '20px',
                    fontSize: '24px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    justifyContent: 'center'
                }}>
                    <FaUser /> {t('descripcion:sellerInfo')}
                </h2>
                
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexDirection: isRTL ? 'row-reverse' : 'row',
                    flexWrap: 'wrap',
                    marginBottom: '20px'
                }}>
                    {/* Avatar y nombre */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        flex: 1,
                        minWidth: '250px'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid white',
                            backgroundColor: '#f0f9ff'
                        }}>
                            {user.avatar ? (
                                <img 
                                    src={user.avatar} 
                                    alt={user.username}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: styles.primaryColor,
                                    color: 'white',
                                    fontSize: '30px',
                                    fontWeight: 'bold'
                                }}>
                                    {user.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                        
                        <div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                marginBottom: '6px'
                            }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '22px',
                                    fontWeight: '700'
                                }}>
                                    {user.fullname || user.username}
                                </h3>
                                {isVerified && (
                                    <FaCheckCircle style={{ color: '#10b981', fontSize: '20px' }} />
                                )}
                            </div>
                            <p style={{
                                margin: 0,
                                fontSize: '16px',
                                opacity: '0.9'
                            }}>
                                @{user.username}
                            </p>
                        </div>
                    </div>
                    
                    {/* Estadísticas del usuario */}
                    <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '15px',
                            borderRadius: '8px',
                            minWidth: '120px'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: '8px'
                            }}>
                                <FaStar />
                                <div style={{
                                    fontSize: '18px',
                                    fontWeight: '700'
                                }}>
                                    {userRating}
                                </div>
                            </div>
                            <div style={{
                                fontSize: '14px',
                                opacity: '0.9'
                            }}>
                                {t('descripcion:rating')}
                            </div>
                        </div>
                        
                        <div style={{
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '15px',
                            borderRadius: '8px',
                            minWidth: '120px'
                        }}>
                            <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                marginBottom: '8px'
                            }}>
                                {totalPosts}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                opacity: '0.9'
                            }}>
                                {t('descripcion:totalPosts')}
                            </div>
                        </div>
                        
                        <div style={{
                            textAlign: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            padding: '15px',
                            borderRadius: '8px',
                            minWidth: '120px'
                        }}>
                            <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                marginBottom: '8px'
                            }}>
                                {userSince}
                            </div>
                            <div style={{
                                fontSize: '14px',
                                opacity: '0.9'
                            }}>
                                {t('descripcion:memberSince')}
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Información de contacto del usuario */}
                <div style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}>
                    <h3 style={{
                        margin: '0 0 15px 0',
                        fontSize: '18px',
                        fontWeight: '600'
                    }}>
                        {t('descripcion:contactSeller')}
                    </h3>
                    
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        flexWrap: 'wrap'
                    }}>
                        {/* Teléfono del usuario */}
                        {(user.phone || postData.numeroTelephone) && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '12px 18px',
                                borderRadius: '8px',
                                flex: 1,
                                minWidth: '200px',
                                cursor: 'pointer',
                                transition: 'all 0.3s'
                            }} 
                            onClick={handleCallOwner}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                            >
                                <FaPhone size={20} />
                                <div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    }}>
                                        {user.phone || postData.numeroTelephone}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        opacity: '0.8'
                                    }}>
                                        {t('descripcion:clickToCall')}
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Email del usuario */}
                        {user.email && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                padding: '12px 18px',
                                borderRadius: '8px',
                                flex: 1,
                                minWidth: '200px'
                            }}>
                                <FaEnvelope size={20} />
                                <div>
                                    <div style={{
                                        fontSize: '16px',
                                        fontWeight: '600'
                                    }}>
                                        {user.email}
                                    </div>
                                    <div style={{
                                        fontSize: '14px',
                                        opacity: '0.8'
                                    }}>
                                        {t('descripcion:email')}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Botón para iniciar chat */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}>
                        <button
                            onClick={handleChatWithOwner}
                            style={{
                                background: 'white',
                                color: styles.primaryColor,
                                border: 'none',
                                padding: '14px 28px',
                                borderRadius: '8px',
                                fontSize: '16px',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s',
                                minWidth: '200px',
                                justifyContent: 'center'
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <FaComment size={20} />
                            {t('descripcion:chatWithSeller')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    
    // 🔥 SECCIÓN CONTACTO (SIMPLIFICADA - AHORA LA INFO DEL USUARIO VA AL FINAL)
    const generateContactSection = () => {
        const phone = postData.numeroTelephone || postData.contactPhone || postData.telefono;
        const hasContact = phone;

        if (!hasContact) return null;

        return (
            <div style={{
                background: styles.contactGradient,
                color: 'white',
                padding: '20px',
                borderRadius: styles.borderRadius,
                textAlign: 'center',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: '16px'
            }}>
                <h2 style={{
                    margin: '0 0 20px 0',
                    fontSize: '22px',
                    fontWeight: '700'
                }}>
                    {t('descripcion:quickContact')}
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    flexWrap: 'wrap',
                    marginBottom: '20px'
                }}>
                    {/* Llamar */}
                    {phone && (
                        <div 
                            style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                cursor: 'pointer',
                                padding: '14px 20px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                flex: 1,
                                minWidth: '180px',
                                maxWidth: '250px',
                                justifyContent: 'center',
                                transition: 'all 0.3s'
                            }}
                            onClick={handleCallOwner}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        >
                            <FaPhone size={22} />
                            <div>
                                <div style={{ fontSize: '17px', fontWeight: '600' }}>
                                    {t('descripcion:callNow')}
                                </div>
                                <div style={{ fontSize: '14px', opacity: '0.9' }}>
                                    {phone}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mapa */}
                    {(postData.location || postData.wilaya || postData.commune) && (
                        <div 
                            style={{ 
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                cursor: 'pointer',
                                padding: '14px 20px',
                                borderRadius: '8px',
                                backgroundColor: 'rgba(255,255,255,0.2)',
                                flex: 1,
                                minWidth: '180px',
                                maxWidth: '250px',
                                justifyContent: 'center',
                                transition: 'all 0.3s'
                            }}
                            onClick={handleOpenMap}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                        >
                            <FaMapMarkerAlt size={22} />
                            <div>
                                <div style={{ fontSize: '17px', fontWeight: '600' }}>
                                    {t('descripcion:viewMap')}
                                </div>
                                <div style={{ fontSize: '14px', opacity: '0.9' }}>
                                    {t('descripcion:seeLocation')}
                                </div>
                            </div>
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
                borderRadius: styles.borderRadius,
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

                {/* Fechas */}
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
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}
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
                        {post.updatedAt ? new Date(post.updatedAt).toLocaleDateString() : 'N/A'}
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
                            {post.views.toLocaleString()}
                        </span>
                    </div>
                )}
            </div>
        );
    };
    
    // 🔥 SECCIÓN PRECIO
    const generatePricingSection = () => {
        const price = postData.price || postData.prix || postData.loyer;
        if (!price && price !== 0) return null;

        return (
            <div style={{
                backgroundColor: '#fffbeb',
                padding: '20px',
                borderRadius: styles.borderRadius,
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

    // 🎯 RENDER PRINCIPAL - ORDEN OPTIMIZADO
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
            {/* SECCIÓN 1: INFORMACIÓN PRINCIPAL */}
            {generateMainSection()}
            
            {/* SECCIÓN 2: DESCRIPCIÓN */}
            {generateDescriptionSection()}
            
            {/* SECCIÓN 3: PRECIO */}
            {generatePricingSection()}
            
            {/* SECCIÓN 4: ESPECIFICACIONES POR CATEGORÍA */}
            {generateCategorySpecificSection()}
            
            {/* SECCIÓN 5: UBICACIÓN */}
            {generateLocationSection()}
            
            {/* SECCIÓN 6: INFORMACIÓN ADICIONAL */}
            {generateAdditionalInfoSection()}
            
            {/* SECCIÓN 7: CONTACTO RÁPIDO */}
            {generateContactSection()}
            
            {/* 🔥🔥🔥 SECCIÓN 8: INFORMACIÓN DEL USUARIO (AL FINAL) */}
            {generateUserInfoSection()}
        </div>
    );
};

export default DescriptionPost;