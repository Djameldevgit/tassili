import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Card, Button, Alert, Spinner } from 'react-bootstrap';

// 🔷 REDUX ACTIONS
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 UTILS
import { checkImage } from '../utils/imageUpload';

// 🔷 COMPONENTES PRINCIPALES
import Categories from '../components/CATEGORIES/Categories';
import SubCategories from '../components/CATEGORIES/Subcategories';
import DynamicFieldManager from '../components/CATEGORIES/DynamicFieldManager';

// 🔷 CAMPOS COMUNES

import TitleField from '../components/CATEGORIES/FormFields/TitleField';
import DescriptionField from '../components/CATEGORIES/FormFields/DescriptionField';
import ImageUploadField from '../components/CATEGORIES/FormFields/ImageUploadField';
import TypeDeVenteField from '../components/CATEGORIES/FormFields/TypeDeVenteFiels';
import EtatField from '../components/CATEGORIES/FormFields/EtatField';
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
    // Campos básicos
    
    categorie: '',
    subCategory: '',
    articleType: '',
    title: '',
    description: '',

    // Campos comunes
    price: '',
    tipodeventa: 'vente',
    etat: 'neuf',
    wilaya: '',
    commune: '',
    numeroTelephone: '',

    // Campos específicos (se llenarán dinámicamente)
    // Estos se añaden automáticamente según la categoría
  });

  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertVariant, setAlertVariant] = useState('info');

  // 🔷 EFFECT PARA CARGA DE EDICIÓN
  useEffect(() => {
    if (isEdit && postToEdit) {
      console.log('🔄 Cargando datos para edición:', postToEdit);

      // Extraer todas las propiedades del post existente
      const postDataFromEdit = {
        // Campos básicos
        categorie: postToEdit.categorie || '',
        subCategory: postToEdit.subCategory || '',
        articleType: postToEdit.articleType || '',
        title: postToEdit.title || '',
        description: postToEdit.description || postToEdit.content || '',

        // Campos comunes
        price: postToEdit.price || '',
        tipodeventa: postToEdit.tipodeventa || 'vente',
        etat: postToEdit.etat || 'neuf',
        wilaya: postToEdit.wilaya || '',
        commune: postToEdit.commune || '',
        numeroTelephone: postToEdit.numeroTelephone || '',

        // Extraer todos los campos específicos del post
        ...Object.keys(postToEdit).reduce((acc, key) => {
          if (![
            '_id', 'user', 'createdAt', 'updatedAt', 'images',
            'likes', 'comments', 'views', 'category', 'subcategory',
            'categorie', 'subCategory', 'articleType', 'title',
            'description', 'content', 'price', 'tipodeventa',
            'etat', 'wilaya', 'commune', 'numeroTelephone'
          ].includes(key)) {
            acc[key] = postToEdit[key];
          }
          return acc;
        }, {})
      };

      setPostData(postDataFromEdit);

      // Cargar imágenes existentes
      if (postToEdit.images?.length > 0) {
        const existingImages = postToEdit.images.map((img, index) => ({
          url: typeof img === 'string' ? img : img?.url,
          file: null,
          isExisting: true,
          name: `existing-${index}`,
          id: `existing-${index}`
        }));
        setImages(existingImages);
      }
    }
  }, [isEdit, postToEdit]);

  // 🔷 HANDLER PARA CAMBIOS EN FORMULARIO
  const handleChangeInput = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // 🔷 HANDLER PARA CAMBIOS DINÁMICOS (de DynamicFieldManager)
  const handleDynamicFieldChange = useCallback((fieldName, fieldValue) => {
    setPostData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
  }, []);

  // 🔷 HANDLER PARA TELÉFONO
  const handlePhoneChange = useCallback((phoneValue) => {
    setPostData(prev => ({
      ...prev,
      numeroTelephone: phoneValue
    }));
  }, []);

  // 🔷 MANEJO DE IMÁGENES
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
      name: file.name,
      id: `new-${Date.now()}-${Math.random()}`
    }));

    setImages(prev => [...prev, ...newImages]);
  }, [images.length]);

  const deleteImages = useCallback((index) => {
    setImages(prev => {
      const newImages = [...prev];
      const removedImage = newImages.splice(index, 1)[0];
      // Liberar memoria si es una imagen nueva
      if (removedImage && !removedImage.isExisting && removedImage.url) {
        URL.revokeObjectURL(removedImage.url);
      }
      return newImages;
    });
  }, []);

  // 🔷 VALIDACIÓN DEL FORMULARIO
  const validateForm = useCallback(() => {
    // Validaciones básicas
    if (!postData.categorie) {
      showAlertMessage(t('select_category_required', 'Sélectionnez une catégorie'), 'warning');
      return false;
    }

    if (!postData.subCategory) {
      showAlertMessage(t('select_subcategory_required', 'Sélectionnez une sous-catégorie'), 'warning');
      return false;
    }

    if (!postData.title || postData.title.trim().length < 5) {
      showAlertMessage(t('title_required', 'Titre requis (min 5 caractères)'), 'warning');
      return false;
    }

    if (!postData.description || postData.description.trim().length < 20) {
      showAlertMessage(t('description_required', 'Description requise (min 20 caractères)'), 'warning');
      return false;
    }

    if (images.length === 0) {
      showAlertMessage(t('image_required', 'Ajoutez au moins une photo'), 'warning');
      return false;
    }

    if (!postData.price || isNaN(parseFloat(postData.price))) {
      showAlertMessage(t('price_required', 'Prix valide requis'), 'warning');
      return false;
    }

    if (!postData.wilaya) {
      showAlertMessage(t('location_required', 'Sélectionnez une wilaya'), 'warning');
      return false;
    }

    if (!postData.numeroTelephone || postData.numeroTelephone.length < 9) {
      showAlertMessage(t('phone_required', 'Numéro de téléphone valide requis'), 'warning');
      return false;
    }

    return true;
  }, [postData, images.length, t]);

  // 🔷 HANDLE SUBMIT
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Preparar datos para enviar
      const postDataToSend = {
        ...postData,
        user: auth.user?._id,
        content: postData.description,
        // Asegurar que los campos de categoría tengan nombres consistentes
        category: postData.categorie,
        subcategory: postData.subCategory,
        // Fecha de creación/actualización
        ...(isEdit && postToEdit ? { updatedAt: new Date() } : { createdAt: new Date() })
      };

      // Preparar imágenes
      const formData = new FormData();

      // Añadir datos del post
      Object.keys(postDataToSend).forEach(key => {
        if (postDataToSend[key] !== undefined && postDataToSend[key] !== null) {
          formData.append(key, postDataToSend[key]);
        }
      });

      // Añadir imágenes nuevas
      images.forEach((image, index) => {
        if (image.file) {
          formData.append('images', image.file);
        } else if (image.isExisting) {
          formData.append('existingImages', image.url);
        }
      });

      // Configurar acción
      const actionConfig = {
        postData: formData,
        auth,
        ...(isEdit && postToEdit && { id: postToEdit._id }),
        ...(!isEdit && { socket })
      };

      // Ejecutar acción
      if (isEdit) {
        await dispatch(updatePost(actionConfig));
        showAlertMessage(t('update_success', 'Annonce mise à jour avec succès!'), 'success');
      } else {
        await dispatch(createPost(actionConfig));
        showAlertMessage(t('create_success', 'Annonce créée avec succès!'), 'success');
      }

      // Redirigir después de éxito
      setTimeout(() => {
        history.push('/mes-annonces');
      }, 1500);

    } catch (error) {
      console.error('❌ Error al publicar:', error);
      showAlertMessage(
        error.response?.data?.msg ||
        error.message ||
        t('error_generic', 'Erreur lors de la publication'),
        'danger'
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [postData, images, auth, isEdit, postToEdit, socket, dispatch, history, isSubmitting, t, validateForm]);

  // 🔷 MOSTRAR ALERTAS
  const showAlertMessage = useCallback((message, variant = 'info') => {
    setAlertMessage(message);
    setAlertVariant(variant);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  // 🔷 RENDER
  return (
    <Container className="py-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* TÍTULO */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          {isEdit ? '✏️ ' : '➕ '}
          {isEdit ? t('edit_ad', 'Modifier une annonce') : t('create_ad', 'Créer une annonce')}
        </h1>
        <p className="text-muted">
          {isEdit
            ? t('edit_subtitle', 'Modifiez les détails de votre annonce')
            : t('create_subtitle', 'Remplissez tous les champs pour publier votre annonce')
          }
        </p>
      </div>

      {/* ALERTA */}
      {showAlert && (
        <Alert
          variant={alertVariant}
          dismissible
          onClose={() => setShowAlert(false)}
          className="mb-4"
        >
          {alertMessage}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        {/* SECCIÓN 1: CAMPOS BÁSICOS */}

     

        {/* SECCIÓN 3: CATEGORÍAS */}
        <Card className="border-0 shadow-sm">
         
          <Card.Body>
            <Categories
              postData={postData}
              handleChangeInput={handleChangeInput}
            />
          </Card.Body>
        </Card>

        {/* SECCIÓN 4: SUBCATEGORÍAS */}
        {postData.categorie && (
          <Card className="border-0 shadow-sm">
     
            <Card.Body>
              <SubCategories
                postData={postData}
                handleChangeInput={handleChangeInput}
              />
            </Card.Body>
          </Card>
        )}

        {/* SECCIÓN 5: CAMPOS ESPECÍFICOS DINÁMICOS */}
        {postData.subCategory && (
          <Card className="mb-4 border-0 shadow-sm">
           
            <Card.Body>
        
<DynamicFieldManager
  postData={postData}
  handleChangeInput={handleChangeInput}  // ← CAMBIAR A handleChangeInput
  mainCategory={postData.categorie}
  subCategory={postData.subCategory}
  articleType={postData.articleType}
  isRTL={isRTL}
/>
            </Card.Body>
          </Card>
        )}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-primary text-white">
            <h5 className="mb-0">📝 {t('basic_info', 'Informations de base')}</h5>
          </Card.Header>
          <Card.Body>
            <TitleField
              postData={postData}
              handleChangeInput={handleChangeInput}
              isRTL={isRTL}
            />
            <DescriptionField
              postData={postData}
              handleChangeInput={handleChangeInput}
              isRTL={isRTL}
            />
          </Card.Body>
        </Card>

        {/* SECCIÓN 6: PRECIO Y CONDICIONES */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-purple text-white">
            <h5 className="mb-0">💰 {t('price_conditions', 'Prix et conditions')}</h5>
          </Card.Header>
          <Card.Body>
            <div className="row g-3">
              <div className="col-md-6">
                <PriceField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
              <div className="col-md-6">
                <TypeDeVenteField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
              <div className="col-md-6">
                <EtatField
                  postData={postData}
                  handleChangeInput={handleChangeInput}
                  isRTL={isRTL}
                />
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* SECCIÓN 7: UBICACIÓN Y CONTACTO */}
        <Card className="border-0 shadow-sm">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">📍 {t('location_contact', 'Localisation et contact')}</h5>
          </Card.Header>
          <Card.Body>
            <WilayaCommunesField
              postData={postData}
              handleChangeInput={handleChangeInput}
              isRTL={isRTL}
            />
            <NumeroTelephoneField
              postData={postData}
              handleChangeInput={handlePhoneChange}
              isRTL={isRTL}
              defaultPhone={postData.numeroTelephone}
            />
          </Card.Body>
        </Card>
    {/* SECCIÓN 2: IMÁGENES */}
    <Card className="border-0 shadow-sm">
          <Card.Header className="bg-info text-white">
            <h5 className="mb-0">🖼️ {t('images', 'Photos')}</h5>
          </Card.Header>
          <Card.Body>
            <ImageUploadField
              images={images}
              handleChangeImages={handleChangeImages}
              deleteImages={deleteImages}
              isRTL={isRTL}
              maxImages={10}
            />
            <small className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
              💡 {t('image_tip', 'Ajoutez des photos claires sous différents angles')}
            </small>
          </Card.Body>
        </Card>
        {/* BOTÓN DE ENVÍO */}
        <div className="text-center">
          <Button
            variant={isEdit ? "warning" : "primary"}
            size="lg"
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-3"
          >
            {isSubmitting ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                {t('processing', 'Traitement en cours...')}
              </>
            ) : (
              <>
                {isEdit ? '✏️ ' : '🚀 '}
                {isEdit ? t('update_ad', 'Mettre à jour') : t('publish_ad', 'Publier l\'annonce')}
              </>
            )}
          </Button>

          <Button
            variant="outline-secondary"
            className="ms-3"
            onClick={() => history.goBack()}
            disabled={isSubmitting}
          >
            {t('cancel', 'Annuler')}
          </Button>
        </div>
      </form>

      {/* INFO ADICIONAL */}
      {!isSubmitting && (
        <Card className="mt-4 border-0 bg-light">
          <Card.Body>
            <h6 className="fw-bold">💡 {t('tips_title', 'Conseils pour réussir votre annonce')}:</h6>
            <ul className="mb-0">
              <li>{t('tip_photos', 'Prenez des photos de qualité sous bonne lumière')}</li>
              <li>{t('tip_description', 'Soyez précis et honnête dans la description')}</li>
              <li>{t('tip_price', 'Fixez un prix juste et compétitif')}</li>
              <li>{t('tip_contact', 'Répondez rapidement aux messages des acheteurs')}</li>
            </ul>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default CreateAnnoncePage;