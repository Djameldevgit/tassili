// CreateAnnoncePage.js - VERSIÓN CORREGIDA
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container, Button, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';

// 🔷 REDUX
import { createPost, updatePost } from '../redux/actions/postAction';

// 🔷 COMPONENTES
import CategoryAccordion from '../components/CATEGORIES/CategoryAccordion';
import DynamicFieldManager from '../components/CATEGORIES/DynamicFieldManager';
import ImagesStep from '../components/CATEGORIES/camposComun/ImagesStep';



const CreateAnnoncePage = () => {
  // 🔷 REDUX Y HOOKS
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';
  const isEdit = location.state?.isEdit || false;
  const postToEdit = location.state?.postData || null;

  // 🔷 ESTADOS DEL WIZARD
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    categorie: '',
    articleType: '',
    subCategory: '',
  });

  const [specificData, setSpecificData] = useState({});
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'info' });

  // 🔷 HANDLER UNIFICADO PARA TODOS LOS CAMPOS
  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;

    // ¿Es un campo base?
    const BASE_FIELDS = ['categorie', 'subCategory', 'articleType'];
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

  // 🔷 HANDLER PARA CATEGORÍAS
  const handleCategoryChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      
      if (name === 'categorie') {
        newData.articleType = '';
        newData.subCategory = '';
        setCurrentStep(1); // Reset al paso 1 cuando cambia categoría
      }
      
      if (name === 'articleType') {
        newData.subCategory = '';
      }
      
      return newData;
    });
  }, []);

  // 🔷 CARGA DE DATOS PARA EDICIÓN
  useEffect(() => {
    if (isEdit && postToEdit) {
      // 1. CARGAR CAMPOS BASE
      const loadedBaseData = {
        categorie: postToEdit.categorie || '',
        subCategory: postToEdit.subCategory || '',
        articleType: postToEdit.articleType || '',
      };

      // 2. CARGAR CAMPOS DINÁMICOS
      const loadedSpecificData = {};

      // Campos de categorySpecificData
      if (postToEdit.categorySpecificData) {
        try {
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

  // 🔷 MOSTRAR ALERTA
  const showAlertMessage = useCallback((message, variant = 'info') => {
    setAlert({ show: true, message, variant });
    setTimeout(() => setAlert({ show: false, message: '', variant: 'info' }), 5000);
  }, []);

  // 🔷 VALIDAR SI SE PUEDE AVANZAR
  const canProceedToNextStep = () => {
    switch(currentStep) {
      case 1: // Categorías
        return formData.categorie && formData.subCategory && 
               (formData.categorie !== 'immobilier' || formData.articleType);
        
      case 2: // Descripción
        // Verificar campos requeridos del paso 2
        const step2Required = ['description', 'marque', 'modele'];
        return step2Required.some(field => specificData[field]);
        
      case 3: // Precio
        return specificData.prix || specificData.loyer || specificData.pricePerPerson;
        
      case 4: // Contacto (ahora es precio/estado)
        return true; // No hay campos obligatorios específicos
        
      case 5: // Imágenes
        return images.length > 0;
        
      default:
        return false;
    }
  };

  // 🔷 HANDLE SUBMIT FINAL
  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    // ✅ VALIDACIONES FINALES
    if (images.length === 0) {
      showAlertMessage("Add at least one photo.", "danger");
      setIsSubmitting(false);
      return;
    }

    if (!formData.categorie || !formData.subCategory) {
      showAlertMessage("Please complete all required fields.", "danger");
      setIsSubmitting(false);
      return;
    }

    try {
      // 🎯 PREPARAR DATOS PARA BACKEND
      const postDataForBackend = {
        ...formData,
        ...specificData
      };

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
        isEdit ? '✅ Publication updated!' : '✅ Publication created!',
        "success"
      );

      // 🎯 REDIRIGIR
      setTimeout(() => history.push('/'), 1500);

    } catch (error) {
      console.error('❌ Error in submit:', error);
      showAlertMessage(
        `❌ ${error.response?.data?.msg || error.message || 'Server error'}`,
        "danger"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [
    formData, specificData, images, auth, isEdit, postToEdit, 
    socket, dispatch, history, isSubmitting, showAlertMessage
  ]);

  // 🔷 RENDERIZAR PASO ACTUAL - ¡CORREGIDO!
  const renderCurrentStep = () => {
    const commonProps = {
      postData: { ...formData, ...specificData },
      handleChangeInput: handleInputChange, // ¡AQUÍ ESTÁ LA CORRECCIÓN!
      isRTL
    };

    const stepVariants = {
      enter: { opacity: 0, x: 50 },
      center: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 }
    };

    switch(currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="step-content"
          >
            <div className="step-header mb-4">
              <h2 className="fw-bold">🏷️ Step 1: Select Category</h2>
              <p className="text-muted">Choose the category and subcategory for your ad</p>
            </div>
            
            <div className="card p-4 shadow-sm">
              <CategoryAccordion
                postData={formData}
                handleChangeInput={handleCategoryChange} // Usar handleCategoryChange aquí
              />
            </div>
          </motion.div>
        );
        
      case 2:
      case 3:
      case 4:
        return (
          <motion.div
            key={`step${currentStep}`}
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="step-content"
          >
            <DynamicFieldManager
              mainCategory={formData.categorie}
              subCategory={formData.subCategory}
              articleType={formData.articleType}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              showNavigation={false}
              {...commonProps}
            />
          </motion.div>
        );
        
      case 5:
        return (
          <motion.div
            key="step5"
            custom={1}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="step-content"
          >
            <ImagesStep
              images={images}
              setImages={setImages}
              isRTL={isRTL}
              onComplete={handleSubmit}
              onBack={() => setCurrentStep(4)}
            />
          </motion.div>
        );
        
      default:
        return null;
    }
  };

  // 🔷 TÍTULOS DE PASOS
  const stepTitles = [
    { title: 'Category', icon: '🏷️', step: 1 },
    { title: 'Description', icon: '📝', step: 2 },
    { title: 'Details', icon: '🔍', step: 3 },
    { title: 'Price & Condition', icon: '💰', step: 4 },
    { title: 'Photos', icon: '🖼️', step: 5 }
  ];

  return (
    <Container className="py-4" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* ALERTA */}
      <AnimatePresence>
        {alert.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Alert 
              variant={alert.variant} 
              dismissible 
              onClose={() => setAlert({ ...alert, show: false })}
              className="mb-4"
            >
              {alert.message}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TÍTULO PRINCIPAL */}
      <div className="text-center mb-4">
        <h1 className="fw-bold display-6">
          {isEdit ? '✏️ Edit Ad' : '➕ Create New Ad'}
        </h1>
        <p className="text-muted">Complete all 5 steps to publish your ad</p>
      </div>

      {/* PROGRESO */}
      <div className="mb-5">
        {/* INDICADORES DE PASO (desktop) */}
        <div className="d-none d-md-flex justify-content-between mb-4">
          {stepTitles.map((step) => (
            <div key={step.step} className="text-center position-relative" style={{ flex: 1 }}>
              <div className={`step-indicator ${currentStep >= step.step ? 'active' : ''}`}>
                <div className="step-circle">
                  <span className="step-icon">{step.icon}</span>
                </div>
                <div className="step-title mt-2">
                  <small className="fw-medium">{step.title}</small>
                </div>
              </div>
              
              {/* CONECTOR (excepto último) */}
              {step.step < 5 && (
                <div className="step-connector"></div>
              )}
            </div>
          ))}
        </div>

        {/* BARRA DE PROGRESO */}
        <div className="mb-3">
          <ProgressBar 
            now={(currentStep / 5) * 100} 
            className="mb-2"
            style={{ height: '8px', borderRadius: '4px' }}
          />
          <div className="d-flex justify-content-between">
            <small className="text-muted">
              Step {currentStep} of 5
            </small>
            <small className="text-muted">
              {Math.round((currentStep / 5) * 100)}% complete
            </small>
          </div>
        </div>
      </div>

      {/* CONTENIDO DEL PASO ACTUAL */}
      <AnimatePresence mode="wait">
        {renderCurrentStep()}
      </AnimatePresence>

      {/* BOTONES DE NAVEGACIÓN */}
      <div className="d-flex justify-content-between mt-4 pt-3 border-top">
        <Button
          variant="outline-secondary"
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2"
        >
          ← Previous
        </Button>
        
        {currentStep < 5 ? (
          <Button
            variant="primary"
            onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
            disabled={!canProceedToNextStep()}
            className="px-4 py-2"
          >
            Next Step →
          </Button>
        ) : (
          <Button
            variant="success"
            size="lg"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-5 py-2"
          >
            {isSubmitting ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Publishing...
              </>
            ) : (
              <>
                🚀 Publish Ad
              </>
            )}
          </Button>
        )}
      </div>

      {/* ESTILOS */}
      <style jsx>{`
        .step-content {
          min-height: 400px;
        }
        
        .step-header {
          padding-bottom: 20px;
          margin-bottom: 20px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .step-indicator {
          position: relative;
          z-index: 1;
        }
        
        .step-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          border: 4px solid white;
          transition: all 0.3s ease;
        }
        
        .step-indicator.active .step-circle {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          color: white;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }
        
        .step-icon {
          font-size: 24px;
        }
        
        .step-connector {
          position: absolute;
          top: 30px;
          left: 60%;
          right: -40%;
          height: 2px;
          background: #e9ecef;
          z-index: 0;
        }
        
        .step-indicator.active ~ .step-connector {
          background: #4f46e5;
        }
        
        .card {
          border: none;
          border-radius: 12px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border: none;
        }
        
        .btn-primary:hover {
          background: linear-gradient(135deg, #4338ca, #6d28d9);
        }
        
        .btn-success {
          background: linear-gradient(135deg, #10b981, #34d399);
          border: none;
        }
        
        .btn-success:hover {
          background: linear-gradient(135deg, #0da271, #2ca67c);
        }
        
        @media (max-width: 768px) {
          .step-circle {
            width: 40px;
            height: 40px;
          }
          
          .step-icon {
            font-size: 18px;
          }
          
          .step-title {
            font-size: 11px;
          }
        }
      `}</style>
    </Container>
  );
};

export default CreateAnnoncePage;