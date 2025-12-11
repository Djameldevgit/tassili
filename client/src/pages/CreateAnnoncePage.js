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

// 🔷 CAMPOS COMUNES
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

  // 🔷 ESTADO PRINCIPAL
  const [postData, setPostData] = useState({
    categorie: '',
    articleType: '',
    subCategory: '',
    title: '',
    description: '',
    price: '',
    wilaya: '',
    commune: '',
    numeroTelephone: '',
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');
  const [categorySpecificData, setCategorySpecificData] = useState({});

  // 🔷 DEBUG: Ver estado actual
  useEffect(() => {
    console.log('📊 Estado actual:', {
      categorie: postData.categorie,
      subCategory: postData.subCategory,
      articleType: postData.articleType,
      tieneTitle: !!postData.title,
      tieneWilaya: !!postData.wilaya,
      tieneCommune: !!postData.commune
    });
  }, [postData]);

  // 🔷 SIMPLIFICADO: Carga de datos para edición
  useEffect(() => {
    if (isEdit && postToEdit) {
      console.log('🔄 Cargando post para edición:', {
        id: postToEdit._id,
        tieneSubCategory: !!postToEdit.subCategory,
        tieneCategorie: !!postToEdit.categorie,
        tieneImages: postToEdit.images?.length || 0
      });

      // 🎯 ESTRATEGIA SIMPLE: Tomar datos directamente del post
      const loadedData = {
        categorie: postToEdit.categorie  || '',
        subCategory: postToEdit.subCategory || '',
        articleType: postToEdit.articleType || '',
        title: postToEdit.title || '',
        description: postToEdit.description || postToEdit.content || '',
        price: postToEdit.price || 0,
        wilaya: postToEdit.wilaya || '',
        commune: postToEdit.commune || '',
        numeroTelephone: postToEdit.numeroTelephone || ''
      };

      // 🎯 Extraer campos específicos de data/specificData si existen
      const specificData = {};
      const dataSources = [postToEdit.data, postToEdit.specificData];
      
      dataSources.forEach(source => {
        if (source && typeof source === 'object') {
          Object.keys(source).forEach(key => {
            if (source[key] !== undefined && source[key] !== null) {
              specificData[key] = source[key];
            }
          });
        }
      });

      setPostData(loadedData);
      setCategorySpecificData(specificData);

      // 🎯 Cargar imágenes
      if (postToEdit.images && Array.isArray(postToEdit.images)) {
        const loadedImages = postToEdit.images.map(img => ({
          url: typeof img === 'string' ? img : img?.url,
          isExisting: true
        }));
        setImages(loadedImages);
        console.log(`🖼️ ${loadedImages.length} imágenes cargadas`);
      }
    }
  }, [isEdit, postToEdit]);

  const handleCategoryDataChange = useCallback((specificData) => {
    console.log('📦 Datos específicos actualizados:', specificData);
    setCategorySpecificData(specificData);
  }, []);

  // 🔷 Alertas
  const showAlertMessage = useCallback((message, variant = 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  // 🔷 Handlers
  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handlePhoneChange = useCallback((phoneValue) => {
    setPostData(prev => ({
      ...prev,
      numeroTelephone: phoneValue
    }));
  }, []);

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

  // 🔷 HANDLE SUBMIT CORREGIDO
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    // ✅ Validaciones básicas
    if (images.length === 0) {
      showAlertMessage("Ajoutez au moins une photo.", "danger");
      setIsSubmitting(false);
      return;
    }

    if (!postData.title) {
      showAlertMessage("Le titre est requis.", "danger");
      setIsSubmitting(false);
      return;
    }

    if (!postData.subCategory) {
      showAlertMessage("Sélectionnez une sous-catégorie.", "danger");
      setIsSubmitting(false);
      return;
    }

    try {
      // 🎯 PREPARAR DATOS PARA BACKEND (VERSIÓN SIMPLE)
      const finalPostData = {
        // Campos que el backend espera
        categorie: postData.categorie, // ← Backend espera 'category'
        subCategory: postData.subCategory,
        articleType: postData.articleType || undefined,
        
        // Campos básicos
        title: postData.title,
        description: postData.description || '',
        content: postData.description || '',
        price: postData.price || 0,
        wilaya: postData.wilaya || '',
        commune: postData.commune || '', // ← Backend espera 'vile'
        numeroTelephone: postData.numeroTelephone || '',
        
        // Campos específicos
        ...categorySpecificData
      };

      // 🎯 LIMPIAR undefined/null
      Object.keys(finalPostData).forEach(key => {
        if (finalPostData[key] === undefined || finalPostData[key] === null) {
          delete finalPostData[key];
        }
      });

      console.log('📤 Envoi au backend:', {
        isEdit,
        postId: isEdit ? postToEdit._id : 'Nouveau',
        data: finalPostData,
        images: images.length
      });

      // 🎯 PREPARAR ACTION DATA
      const actionData = {
        postData: finalPostData,
        images: images,
        auth
      };

      // 🎯 AGREGAR DATOS ESPECÍFICOS PARA EDICIÓN
      if (isEdit && postToEdit) {
        actionData.id = postToEdit._id;
        actionData.status = postToEdit;
      } else if (!isEdit && socket) {
        actionData.socket = socket;
      }

      // 🎯 EJECUTAR
      if (isEdit) {
        await dispatch(updatePost(actionData));
      } else {
        await dispatch(createPost(actionData));
      }

      // 🎯 ÉXITO
      showAlertMessage(
        isEdit ? '✅ Publication mise à jour !' : '✅ Publication créée !',
        "success"
      );

      // 🎯 REDIRIGIR
      setTimeout(() => history.push('/'), 1500);

    } catch (error) {
      console.error('❌ Erreur:', error);
      
      let errorMsg = 'Erreur lors de l\'opération';
      if (error.response?.data?.msg) {
        errorMsg = error.response.data.msg;
      } else if (error.message) {
        errorMsg = error.message;
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

  // 🔷 RENDER
  return (
    <Container className="py-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* TITRE */}
      <div className="mb-4">
        <h3 className="fw-bold">
          {isEdit ? '✏️ ' : '➕ '}
          {isEdit ? t('edit_ad', 'Modifier') : t('create_ad', 'Créer une annonce')}
        </h3>
        {isEdit && (
          <p className="text-muted">
            Modification de: <strong>{postData.title || 'Sans titre'}</strong>
          </p>
        )}
      </div>

      {/* ALERTE */}
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
        {/* SECTION 1: CATÉGORIES */}
        <Card className="mb-3 border-0 shadow-sm">
         
            <Categories
              postData={postData}
              handleChangeInput={handleChangeInput}
            />
            
            {postData.categorie && (
              <div className="mt-2">
                <SubCategories
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                />
              </div>
            )}
      
        </Card>

        {/* SECTION 2: CHAMPS DYNAMIQUES */}
        {postData.subCategory && (
          <Card className="mb-3 border-0 shadow-sm">
            <Card.Header>
              <h5 className="mb-0">🔧 {t('specific_fields', 'Champs spécifiques')}</h5>
            </Card.Header>
            
              <DynamicFieldManager
                postData={postData}
                handleChangeInput={handleChangeInput}
                mainCategory={postData.categorie}
                subCategory={postData.subCategory}
                articleType={postData.articleType}
                isRTL={isRTL}
                onCategoryDataChange={handleCategoryDataChange}
              />
           
          </Card>
        )}

        {/* SECTION 3: INFORMATIONS DE BASE */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header>
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

        {/* SECTION 4: LOCALISATION & CONTACT */}
        <Card className="mb-3 border-0 shadow-sm">
          <Card.Header>
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

        {/* SECTION 5: IMAGES */}
        <Card className="mb-4 border-0 shadow-sm">
          <Card.Header>
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

        {/* BOUTONS */}
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