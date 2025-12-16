import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

// 🔷 REDUX
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 UTILS
import { checkImage } from '../utils/imageUpload';

// 🔷 COMPONENTES QUE EL PADRE DEBE IMPORTAR DIRECTAMENTE
import Categories from '../components/CATEGORIES/Categories';
import SubCategories from '../components/CATEGORIES/Subcategories';
import DynamicFieldManager from '../components/CATEGORIES/DynamicFieldManager';
import ImageUploadField from '../components/CATEGORIES/FormFields/ImageUploadField';
import WilayaCommunesField from '../components/CATEGORIES/FormFields/WilayaCommunesField';
import NumeroTelephoneField from '../components/CATEGORIES/FormFields/NumeroTelephoneField';

// 🔷 CONSTANTES PARA CAMPOS BASE
const BASE_FIELDS = [
  'categorie', 'subCategory', 'articleType',
  'wilaya', 'commune', 'numeroTelephone'
];

const CreateAnnoncePage = () => {
  // 🔷 REDUX Y HOOKS
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation('createannoncepage'); // SOLO este namespace

  const isRTL = i18n.language === 'ar';
  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;

  // 🔷 ESTADOS PRINCIPALES
  const [formData, setFormData] = useState({
    // Campos base (siempre importados por el padre)
    categorie: '',
    articleType: '',
    subCategory: '',
    wilaya: '',
    commune: '',
    telefono: '',
  });

  const [specificData, setSpecificData] = useState({}); // Campos dinámicos
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
 
  // 🔷 USEMEMO PARA POSTDATA COMPLETO (EVITA RERENDERS INNECESARIOS)
  const completePostData = useMemo(() => {
    return { ...formData, ...specificData };
  }, [formData, specificData]);

  // 🔷 DEBUG: Contador de renders (para diagnóstico)
  

  // 🔷 CARGA DE DATOS PARA EDICIÓN (SIMPLIFICADA Y OPTIMIZADA)
  useEffect(() => {
    if (isEdit && postToEdit) {
     

      // 1. CARGAR CAMPOS BASE
      const loadedBaseData = {
        categorie: postToEdit.categorie || '',
        subCategory: postToEdit.subCategory || '',
        articleType: postToEdit.articleType || '',
        wilaya: postToEdit.wilaya || '',
        commune: postToEdit.commune || '',
        telefono: postToEdit.telefono || ''
      };

      // 2. CARGAR CAMPOS DINÁMICOS
      const loadedSpecificData = {};

      // Campos que ahora son dinámicos
     
     
      // Campos de categorySpecificData (si existe)
      if (postToEdit.categorySpecificData) {
        try {
          // Convertir Map a objeto si es necesario
          if (postToEdit.categorySpecificData instanceof Map) {
            postToEdit.categorySpecificData.forEach((value, key) => {
              if (value !== undefined && value !== null && value !== '') {
                loadedSpecificData[key] = value;
              }
            });
          } else if (typeof postToEdit.categorySpecificData === 'object') {
            Object.entries(postToEdit.categorySpecificData).forEach(([key, value]) => {
              if (value !== undefined && value !== null && value !== '') {
                loadedSpecificData[key] = value;
              }
            });
          }
        } catch (err) {
          console.warn('⚠️ Error al procesar categorySpecificData:', err);
        }
      }

      console.log('✅ Datos cargados exitosamente:', {
        base: Object.keys(loadedBaseData).filter(k => loadedBaseData[k]).length,
        dinamicos: Object.keys(loadedSpecificData).length,
        
      });

      setFormData(loadedBaseData);
      setSpecificData(loadedSpecificData);

      // 3. CARGAR IMÁGENES
      if (postToEdit.images?.length > 0) {
        const loadedImages = postToEdit.images.map(img => ({
          url: img.url || img,
          public_id: img.public_id || '',
          isExisting: true
        }));
        setImages(loadedImages);
      }
    }
  }, [isEdit, postToEdit]);

  // 🔷 HANDLER UNIFICADO PARA TODOS LOS CAMPOS (¡SOLUCIÓN AL BUCLE!)
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
  

    // ¿Es un campo base?
    if (BASE_FIELDS.includes(name)) {
      setFormData(prev => ({ ...prev, [name]: val }));
    } 
    // ¿Es un campo dinámico?
    else {
      setSpecificData(prev => {
        // Si el valor está vacío, eliminar el campo
        if (val === '' || val === undefined || val === null) {
          const { [name]: removed, ...rest } = prev;
          return rest;
        }
        // Si tiene valor, actualizar
        return { ...prev, [name]: val };
      });
    }
  }, []);

  // 🔷 HANDLER ESPECIAL PARA TELÉFONO (si NumeroTelephoneField devuelve objeto)
  const handlePhoneChange = useCallback((phoneValue) => {
    // Si es un evento, usar handleInputChange normal
    if (phoneValue && phoneValue.target) {
      handleInputChange(phoneValue);
    } 
    // Si es solo el valor (string)
    else {
      setFormData(prev => ({ ...prev, numeroTelephone: phoneValue }));
    }
  }, [handleInputChange]);

  // 🔷 HANDLERS PARA IMÁGENES
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
      isExisting: false,
      public_id: ''
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [images.length]);

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

  // 🔷 ALERTAS
  const showAlertMessage = useCallback((message, variant = 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  // 🔷 HANDLE SUBMIT (OPTIMIZADO)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

  

    // ✅ VALIDACIONES
    if (images.length === 0) {
      showAlertMessage("Ajoutez au moins une photo.", "danger");
      setIsSubmitting(false);
      return;
    }
 

    if (!formData.subCategory) {
      showAlertMessage("Sélectionnez une sous-catégorie.", "danger");
      setIsSubmitting(false);
      return;
    }

    try {
      // 🎯 PREPARAR DATOS COMBINADOS PARA BACKEND
      const postDataForBackend = {};
      
      // 1. Campos base
      BASE_FIELDS.forEach(field => {
        const value = formData[field];
        if (value !== undefined && value !== null && value !== '') {
          postDataForBackend[field] = value;
        }
      });

      // 2. Campos dinámicos (incluyendo title, description, price)
      Object.entries(specificData).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          postDataForBackend[key] = value;
        }
      });

    
      // 🎯 PREPARAR IMÁGENES
      const imagesForBackend = images.map(img => ({
        url: img.url,
        public_id: img.public_id || '',
        isExisting: img.isExisting || false
      }));

      // 🎯 PREPARAR ACTION DATA
      const actionData = {
        postData: postDataForBackend,
        images: imagesForBackend,
        auth
      };

      if (isEdit && postToEdit) {
        actionData.id = postToEdit._id;
        actionData.status = postToEdit;
      } else if (!isEdit && socket) {
        actionData.socket = socket;
      }

      // 🎯 EJECUTAR ACCIÓN
      const action = isEdit ? updatePost : createPost;
      await dispatch(action(actionData));

      // 🎯 ÉXITO
      showAlertMessage(
        isEdit ? '✅ Publication mise à jour !' : '✅ Publication créée !',
        "success"
      );

      // 🎯 REDIRIGIR
      setTimeout(() => history.push('/'), 1500);

    } catch (error) {
      console.error('❌ Error en submit:', error);
      showAlertMessage(
        `❌ ${error.response?.data?.msg || error.message || 'Erreur serveur'}`,
        "danger"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData, specificData, images, auth, isEdit, postToEdit, 
    socket, dispatch, history, isSubmitting, showAlertMessage
  ]);

 

// 🔷 ACTUALIZA TODAS LAS TRADUCCIONES en el return:
return (
  <Container className="py-4" dir={isRTL ? 'rtl' : 'ltr'}>
    {/* TITULO */}
    <div className="mb-4">
      <h3 className="fw-bold">
        {isEdit ? '✏️ ' : '➕ '}
        {isEdit ? t('page_title.edit') : t('page_title.create')}
      </h3>
    </div>

    {/* ALERTA */}
    {showAlert && (
      <Alert variant={alertVariant} dismissible onClose={() => setShowAlert(false)}>
        {alertMessage} {/* Mantienes los mensajes hardcodeados o los traduces */}
      </Alert>
    )}

    <form onSubmit={handleSubmit}>
      {/* SECCIÓN 1: CATEGORÍAS */}
      <Card className="mb-3 border-0 shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">🏷️ {t('sections.categories')}</h5>
        </Card.Header>
        <Card.Body>
          {/* Categories y SubCategories manejan sus propias traducciones */}
          <Categories
            postData={formData}
            handleChangeInput={handleInputChange}
          />
          
          {formData.categorie && (
            <div className="mt-3">
              <SubCategories
                postData={formData}
                handleChangeInput={handleInputChange}
              />
            </div>
          )}
        </Card.Body>
      </Card>

      {/* SECCIÓN 2: CAMPOS DINÁMICOS */}
      {formData.subCategory && (
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header className="bg-light">
            <h5 className="mb-0">📋 {t('sections.dynamic_fields')}</h5>
          </Card.Header>
          <Card.Body>
            <DynamicFieldManager
              mainCategory={formData.categorie}
              subCategory={formData.subCategory}
              articleType={formData.articleType}
              postData={completePostData}
              handleChangeInput={handleInputChange}
              isRTL={isRTL}
            />
          </Card.Body>
        </Card>
      )}

      {/* SECCIÓN 3: LOCALIZACIÓN Y CONTACTO */}
      <Card className="mb-3 border-0 shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">📍 {t('sections.location_contact')}</h5>
        </Card.Header>
        <Card.Body>
          {/* WilayaCommunesField y NumeroTelephoneField manejan sus traducciones */}
          <div className="row g-3">
            <div className="col-md-6">
              <WilayaCommunesField
                postData={formData}
                handleChangeInput={handleInputChange}
                isRTL={isRTL}
              />
            </div>
            <div className="col-md-6">
              <NumeroTelephoneField
                postData={formData}
                handleChangeInput={handlePhoneChange}
                isRTL={isRTL}
              />
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* SECCIÓN 4: IMÁGENES */}
      <Card className="mb-4 border-0 shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">🖼️ {t('sections.images')} *</h5>
          <small className="text-muted">
            {t('labels.photos_count', { count: images.length })} | {t('labels.max_photos')}
          </small>
        </Card.Header>
        <Card.Body>
          <ImageUploadField
            images={images}
            handleChangeImages={handleChangeImages}
            deleteImages={deleteImages}
            isRTL={isRTL}
            maxImages={10}
          />
          <small className="text-muted d-block mt-2">
            {t('labels.required_field')}
          </small>
        </Card.Body>
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
              {t('buttons.processing')}
            </>
          ) : (
            <>
              {isEdit ? '✏️ ' : '🚀 '}
              {isEdit ? t('buttons.update') : t('buttons.publish')}
            </>
          )}
        </Button>

        <Button
          variant="outline-secondary"
          className="ms-2"
          onClick={() => history.goBack()}
          disabled={isSubmitting}
        >
          {t('buttons.cancel')}
        </Button>
      </div>
    </form>
  </Container>
);
};

// 🔷 MEMO PARA OPTIMIZAR RENDERS
export default React.memo(CreateAnnoncePage);