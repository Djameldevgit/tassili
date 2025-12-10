import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

// 🔷 REDUX
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 UTILS
import { checkImage } from '../utils/imageUpload';

// 🔷 COMPONENTES
import Categories from '../components/CATEGORIES/Categories';
import SubCategories from '../components/CATEGORIES/Subcategories';
import DynamicFieldManager from '../components/CATEGORIES/DynamicFieldManager';
import ImageUploadField from '../components/CATEGORIES/FormFields/ImageUploadField';

// 🔷 CAMPOS COMUNES MINIMALISTAS
import TitleField from '../components/CATEGORIES/FormFields/TitleField';
import DescriptionField from '../components/CATEGORIES/FormFields/DescriptionField';
import PriceField from '../components/CATEGORIES/FormFields/PriceField';
import WilayaCommunesField from '../components/CATEGORIES/FormFields/WilayaCommunesField';
import NumeroTelephoneField from '../components/CATEGORIES/FormFields/NumeroTelephoneField';

const CreateAnnoncePage = () => {
  // 🔷 REDUX Y HOOKS
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation(['common', 'categories', 'subcategories']);

  const isRTL = i18n.language === 'ar';
  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;

  // 🔷 ESTADO PRINCIPAL (MÍNIMO POSIBLE)
  const [postData, setPostData] = useState({
    // 🔥 LOS 4 CAMPOS OBLIGATORIOS para backend
    categorie: 'voyages', // ← INICIALIZAMOS CON VOYAGES PARA PROBAR
    subCategory: '',
  
    
    // 🔷 CAMPOS COMUNES BÁSICOS
    title: '',
    description: '',
    price: '',
    wilaya: '',
    commune: '',
    numeroTelephone: '',
    
    // 🔥 EL RESTO se llenará dinámicamente según categoría
    // NO declara más campos aquí
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 🔷 ESTADOS PARA ALERTAS
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  const [categorySpecificData, setCategorySpecificData] = useState({});




  const handleCategoryDataChange = useCallback((specificData) => {
    console.log('📦 Datos específicos recibidos:', specificData);
    setCategorySpecificData(specificData);
  }, []);  // ← CORRECTO: paréntesis de cierre y punto y coma


  // 🔷 FUNCIÓN PARA MOSTRAR ALERTAS
  const showAlertMessage = useCallback((message, variant = 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }, []);



  
  // 🔷 EFFECT PARA CARGA DE EDICIÓN (SIMPLIFICADO)
  useEffect(() => {
    if (isEdit && postToEdit) {
      console.log('🔄 Cargando datos para edición:', postToEdit);

      // Separar datos: básicos vs dinámicos
      const basicFields = {};
      const dynamicFields = {};

      // Extraer campos básicos
      const basicKeys = [
        'categorie', 'subCategory',
        'title', 'description', 'price',
        'wilaya', 'commune', 'numeroTelephone'
      ];

      Object.keys(postToEdit).forEach(key => {
        if (basicKeys.includes(key)) {
          basicFields[key] = postToEdit[key] || '';
        } else if (key === 'data' && postToEdit.data) {
          // Si existe campo 'data', extraer todo
          Object.keys(postToEdit.data).forEach(dataKey => {
            dynamicFields[dataKey] = postToEdit.data[dataKey];
          });
        } else if (![
          '_id', 'user', 'createdAt', 'updatedAt', 'images',
          'likes', 'comments', 'views', 'status'
        ].includes(key)) {
          // Otros campos van a dinámicos
          dynamicFields[key] = postToEdit[key];
        }
      });

      // Combinar en postData
      setPostData({
        ...basicFields,
        ...dynamicFields // Los campos dinámicos se mezclan
      });

      // Cargar imágenes
      if (postToEdit.images?.length > 0) {
        setImages(postToEdit.images.map(img => ({
          url: typeof img === 'string' ? img : img?.url,
          isExisting: true
        })));
      }
    }
  }, [isEdit, postToEdit]);

  // 🔷 HANDLER ÚNICO PARA TODOS LOS CAMBIOS
  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // 🔷 HANDLER PARA CAMBIOS DE TELÉFONO
  const handlePhoneChange = useCallback((phoneValue) => {
    setPostData(prev => ({
      ...prev,
      numeroTelephone: phoneValue
    }));
  }, []);

  // 🔷 HANDLER PARA IMÁGENES
  const handleChangeImages = useCallback((e) => {
    const files = [...e.target.files];
    if (files.length === 0) return;

    const error = checkImage(files, images.length);
    if (error) {
      showAlertMessage(error, 'warning');
      return;
    }

    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      isExisting: false
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [images.length, showAlertMessage]);

  const deleteImages = useCallback((index) => {
    setImages(prev => {
      const newImages = [...prev];
      const removedImage = newImages.splice(index, 1)[0];
      if (removedImage && !removedImage.isExisting && removedImage.url) {
        URL.revokeObjectURL(removedImage.url);
      }
      return newImages;
    });
  }, []);

  // 🔷 TU HANDLE SUBMIT FUNCIONAL (MODIFICADO PARA TU BACKEND)
// 🔷 TU HANDLE SUBMIT FUNCIONAL Y SIMPLIFICADO
const handleSubmit = useCallback(async (e) => {
  e.preventDefault();
  console.log('🔵 === handleSubmit CORREGIDO ===');
  
  if (isSubmitting) return;
  setIsSubmitting(true);

  // ✅ VALIDACIONES BÁSICAS
  if (images.length === 0) {
    showAlertMessage("Por favor agrega al menos una foto.", "danger");
    setIsSubmitting(false);
    return;
  }

  if (!postData.title) {
    showAlertMessage("El título es requerido.", "danger");
    setIsSubmitting(false);
    return;
  }

  if (!postData.subCategory) {
    showAlertMessage("Selecciona una subcategoría.", "danger");
    setIsSubmitting(false);
    return;
  }

  try {
    // 🔥 CREAR OBJETO UNIFICADO (VERSIÓN SIMPLIFICADA)
    const finalPostData = {
      // Campos comunes (nivel raíz)
      categorie: postData.categorie,
      subCategory: postData.subCategory,
      
      title: postData.title,
      description: postData.description || '',
      price: postData.price || 0,
      wilaya: postData.wilaya || '',
      commune: postData.commune || '',
      numeroTelephone: postData.numeroTelephone || '',
      
      // Campos específicos de categoría (se mezclan con los comunes)
      ...categorySpecificData,
      
      // Campo adicional para compatibilidad
      content: postData.description || ''
    };

    console.log('📊 DATOS FINALES PARA ENVÍO:', finalPostData);
    console.log('🖼️ Imágenes:', images.length);

    // ✅ PREPARAR ACTION DATA
    const actionData = {
      postData: finalPostData,
      images: images, // Envía el array tal cual
      auth,
      ...(isEdit && postToEdit && { 
        id: postToEdit._id,
        existingImages: images.filter(img => img.isExisting).map(img => img.url)
      }),
      ...(!isEdit && socket && { socket })
    };

    // ✅ EJECUTAR ACCIÓN
    if (isEdit) {
      await dispatch(updatePost(actionData));
      showAlertMessage('✅ Publicación actualizada correctamente!', "success");
    } else {
      await dispatch(createPost(actionData));
      showAlertMessage('✅ Publicación creada correctamente!', "success");
    }

    // ✅ REDIRIGIR
    setTimeout(() => {
      history.push('/');
    }, 1500);

  } catch (error) {
    console.error('❌ Error en handleSubmit:', error);
    
    let errorMsg = 'Error en la publicación';
    
    if (error.response) {
      errorMsg = error.response.data?.msg || 
                error.response.data?.message || 
                `Error ${error.response.status}`;
    } else if (error.request) {
      errorMsg = 'Error de conexión. Verifica tu internet.';
    } else {
      errorMsg = error.message || 'Error interno';
    }
    
    showAlertMessage(`❌ ${errorMsg}`, "danger");
    
  } finally {
    setIsSubmitting(false);
  }
}, [
  postData, 
  images, 
  auth, 
  isEdit, 
  postToEdit, 
  socket, 
  dispatch, 
  history, 
  isSubmitting, 
  showAlertMessage,
  categorySpecificData
]);
  // 🔷 RENDER OPTIMIZADO
  return (
    <Container className="py-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* TÍTULO */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          {isEdit ? '✏️ ' : '➕ '}
          {isEdit ? t('edit_ad', 'Modifier') : t('create_ad', 'Créer une annonce')}
        </h1>
      </div>

      {/* ALERTA */}
      {showAlert && (
        <Alert 
          variant={alertVariant} 
          dismissible 
          onClose={() => setShowAlert(false)}
          className="mt-3"
        >
          {alertMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* SECCIÓN 1: CATEGORÍAS */}
        <Card className="mb-3 border-0 shadow-sm">
 
           
            <Categories
              postData={postData}
              handleChangeInput={handleChangeInput}
            />
            
            {postData.categorie && (
              <div className="mt-3">
                <SubCategories
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                />
              </div>
            )}
       
        </Card>

        {/* SECCIÓN 2: CAMPOS DINÁMICOS (si hay subcategoría) */}
        {postData.subCategory && (
          <Card className="mb-3 border-0 shadow-sm">
            <Card.Header className="">
              <h5 className="mb-0">🔧 {t('specific_fields', 'Champs spécifiques')}</h5>
            </Card.Header>
         
              <DynamicFieldManager
                postData={postData}
                handleChangeInput={handleChangeInput}
                mainCategory={postData.categorie}
                subCategory={postData.subCategory}
                isRTL={isRTL}
                // 🔥 Pasar función para recibir datos específicos si es necesario
                onCategoryDataChange={handleCategoryDataChange} // 🔥 IMPORTANTE
              />
       
          </Card>
        )}

        {/* SECCIÓN 3: INFORMACIÓN BÁSICA */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header  >
            <h5 className="mb-0">📝 {t('basic_info', 'Informations de base')}</h5>
          </Card.Header>
          
            <div className="row g-3">
              <div className="col-12">
                <TitleField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
              <div className="col-12">
                <DescriptionField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
              <div className="col-md-6">
                <PriceField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
            </div>
         
        </Card>

        {/* SECCIÓN 4: UBICACIÓN Y CONTACTO */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header  >
            <h5 className="mb-0">📍 {t('location_contact', 'Localisation & Contact')}</h5>
          </Card.Header>
           
            <div className="row g-3">
              <div className="col-md-6">
                <WilayaCommunesField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
              <div className="col-md-6">
                <NumeroTelephoneField
                  postData={postData}
                  handleChangeInput={handlePhoneChange}
                  isRTL={isRTL}
                />
              </div>
            </div>
          
        </Card>

        {/* SECCIÓN 5: IMÁGENES */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Header  >
            <h5 className="mb-0">🖼️ {t('images', 'Photos')} *</h5>
          </Card.Header>
           
            <ImageUploadField
              images={images}
              handleChangeImages={handleChangeImages}
              deleteImages={deleteImages}
              isRTL={isRTL}
              maxImages={10}
            />
            <small className="text-muted">
              * {t('required_field', 'Champ obligatoire')}
            </small>
         
        </Card>

        {/* BOTONES */}
        <div className="text-center">
          <Button
            variant={isEdit ? "warning" : "primary"}
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="px-5"
          >
            {isSubmitting ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                {t('processing', 'Traitement...')}
              </>
            ) : (
              <>
                {isEdit ? '✏️ ' : '🚀 '}
                {isEdit ? t('update', 'Mettre à jour') : t('publish', 'Publier')}
              </>
            )}
          </Button>

          <Button
            variant="outline-secondary"
            className="ms-2"
            onClick={() => history.goBack()}
          >
            {t('cancel', 'Annuler')}
          </Button>
          
         
        </div>
      </form>
    </Container>
  );
};

export default CreateAnnoncePage;