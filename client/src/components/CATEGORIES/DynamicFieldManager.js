// 📁 src/components/CATEGORIES/DynamicFieldManager.js
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import FieldRenderer from './FieldRenderer';
import { getVisibleFields } from './FieldConfig';

// 🔥 CONFIGURACIÓN DE PASOS - USANDO TU FIELD_CONFIG
const STEP_CONFIG = {
  // Paso 1: Información básica (campos compartidos)
  step1: {
    name: 'info_basica',
    description: 'Información básica del producto',
    // Estos campos son FIJOS para el paso 1
    fields: ['title', 'description']
  },
  
  // Paso 2: Detalles específicos (de FieldConfig)
  step2: {
    name: 'detalles_especificos',
    description: 'Características específicas de la categoría',
    // Estos campos vienen DINÁMICAMENTE de FieldConfig
    dynamic: true
  },
  
  // Paso 3: Precio y condiciones
  step3: {
    name: 'precio_condiciones',
    description: 'Precio y condiciones de venta/alquiler',
    fields: ['price', 'negociable', 'etat']
  },
  
  // Paso 4: Contacto y ubicación
  step4: {
    name: 'contacto_ubicacion',
    description: 'Información de contacto y ubicación',
    fields: ['telephone', 'wilaya', 'commune', 'adresse']
  },
  
  // Paso 5: Imágenes
  step5: {
    name: 'imagenes',
    description: 'Imágenes del producto/servicio',
    fields: [] // Campos específicos para imágenes
  }
};

const DynamicFieldManager = ({ 
  mainCategory, 
  subCategory, 
  articleType,
  postData, 
  handleChangeInput,
  isRTL,
  currentStep = 1,
  onStepChange,
  showNavigation = true
}) => {
  const { t } = useTranslation();
  const [visibleFields, setVisibleFields] = useState([]);
  const [direction, setDirection] = useState(0);
  
  // 🔥 OBTENER CAMPOS VISIBLES según paso actual
  useEffect(() => {
    console.log('🔍 DynamicFieldManager - Buscando campos para:', {
      mainCategory,
      subCategory,
      articleType,
      currentStep
    });
    
    if (!mainCategory || !subCategory) {
      console.log('⚠️ No hay categoría/subcategoría seleccionada');
      setVisibleFields(STEP_CONFIG[`step${currentStep}`]?.fields || []);
      return;
    }
    
    try {
      let fields = [];
      
      // PASO 2: Campos dinámicos de FieldConfig
      if (currentStep === 2) {
        // Obtener TODOS los campos de esta categoría
        const allCategoryFields = getVisibleFields(mainCategory, subCategory, articleType);
        
        // Filtrar campos que NO sean de los otros pasos fijos
        const otherStepFields = [
          ...(STEP_CONFIG.step1.fields || []),
          ...(STEP_CONFIG.step3.fields || []),
          ...(STEP_CONFIG.step4.fields || [])
        ];
        
        fields = allCategoryFields.filter(field => 
          !otherStepFields.includes(field) && 
          !['title', 'description', 'price', 'telephone', 'wilaya', 'commune', 'adresse'].includes(field)
        );
        
        console.log('📋 Campos específicos para paso 2:', fields);
      }
      // OTROS PASOS: Campos fijos
      else {
        fields = STEP_CONFIG[`step${currentStep}`]?.fields || [];
      }
      
      setVisibleFields(fields);
      
    } catch (error) {
      console.error('❌ Error en DynamicFieldManager:', error);
      setVisibleFields([]);
    }
  }, [mainCategory, subCategory, articleType, currentStep]);
  
  // 🔥 HANDLERS DE NAVEGACIÓN (tu lógica original)
  const handleNextStep = () => {
    setDirection(1);
    const nextStep = currentStep + 1;
    if (onStepChange) {
      onStepChange(nextStep);
    }
  };
  
  const handlePrevStep = () => {
    setDirection(-1);
    const prevStep = currentStep - 1;
    if (onStepChange) {
      onStepChange(prevStep);
    }
  };
  
  // 🔥 VARIANTES DE ANIMACIÓN (tu lógica original)
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };
  
  // 🔥 OBTENER TÍTULO DEL PASO
  const getStepTitle = () => {
    const titles = {
      1: t('step1_title', 'Información básica'),
      2: t('step2_title', 'Detalles específicos'),
      3: t('step3_title', 'Precio y condiciones'),
      4: t('step4_title', 'Contacto y ubicación'),
      5: t('step5_title', 'Imágenes')
    };
    return titles[currentStep] || `Paso ${currentStep}`;
  };
  
  // 🔥 OBTENER ICONO DEL PASO
  const getStepIcon = () => {
    const icons = {
      1: '📋',
      2: '🔍',
      3: '💰',
      4: '📍',
      5: '🖼️'
    };
    return icons[currentStep] || '📋';
  };
  
  // 🔥 VALIDAR SI SE PUEDE CONTINUAR
  const canContinue = () => {
    // Paso 5 (imágenes) siempre puede continuar
    if (currentStep === 5) return true;
    
    // Para otros pasos, verificar campos requeridos
    const requiredFields = {
      1: ['title', 'description'],
      2: [], // Los campos del paso 2 son opcionales o dinámicos
      3: ['price'],
      4: ['telephone', 'wilaya']
    };
    
    const currentRequired = requiredFields[currentStep] || [];
    
    // Verificar si los campos requeridos tienen valor
    return currentRequired.every(field => {
      const fieldValue = postData[field] || '';
      return fieldValue.toString().trim() !== '';
    });
  };
  
  // 🔥 RENDERIZAR CAMPOS DEL PASO ACTUAL
  const renderStepFields = () => {
    // Paso 5: Imágenes (caso especial)
    if (currentStep === 5) {
      return (
        <motion.div
          key="step-5"
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="images-step"
        >
          <div className="alert alert-info">
            <h5><i className="fas fa-images me-2"></i> {t('images_step', 'Paso de imágenes')}</h5>
            <p>{t('images_description', 'Sube las imágenes de tu producto/servicio')}</p>
            <div className="text-center my-4">
              <i className="fas fa-cloud-upload-alt fa-3x text-primary"></i>
              <p className="mt-3">{t('drag_drop_images', 'Arrastra y suelta las imágenes aquí')}</p>
            </div>
          </div>
        </motion.div>
      );
    }
    
    // Pasos 1-4: Renderizar campos
    return (
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={`step-${currentStep}`}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="step-content"
        >
          {/* Mensaje si no hay campos */}
          {visibleFields.length === 0 && currentStep === 2 ? (
            <div className="alert alert-success">
              <h5><i className="fas fa-check-circle me-2"></i> {t('no_specific_fields', 'Sin campos específicos')}</h5>
              <p>{t('no_fields_description', 'Esta categoría no requiere campos específicos adicionales.')}</p>
            </div>
          ) : (
            <div className="fields-grid">
              <div className="row g-3">
                {visibleFields.map((fieldName, index) => (
                  <motion.div 
                    key={`${fieldName}-${index}`}
                    className="col-12 col-md-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="field-wrapper">
                      <FieldRenderer
                        fieldName={fieldName}
                        postData={postData}
                        handleChangeInput={handleChangeInput}
                        mainCategory={mainCategory}
                        subCategory={subCategory}
                        articleType={articleType}
                        isRTL={isRTL}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Información de campos requeridos */}
              <div className="mt-3">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  {t('required_fields_info', 'Los campos marcados con * son obligatorios')}
                </small>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Si no hay categoría seleccionada (excepto paso 1)
  if ((!mainCategory || !subCategory) && currentStep > 1) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-5"
      >
        <div className="text-muted">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <i className="fas fa-hand-point-up fa-3x"></i>
          </motion.div>
          <h5 className="mt-3">{t('select_category_first', 'Selecciona una categoría primero')}</h5>
          <p className="mb-0">{t('go_back_step1', 'Vuelve al paso 1 para seleccionar categoría')}</p>
        </div>
      </motion.div>
    );
  }
  
  // 🔥 RENDER PRINCIPAL
  return (
    <div className="multi-step-form">
      
      {/* CABECERA DEL PASO */}
      <div className="step-header mb-4">
        <div className="d-flex align-items-center">
          <div className="step-icon-circle me-3">
            <span className="step-icon">{getStepIcon()}</span>
          </div>
          <div>
            <h4 className="mb-0">{getStepTitle()}</h4>
            <small className="text-muted">
              {mainCategory && subCategory ? (
                <>
                  {mainCategory} → {articleType ? `${articleType} → ` : ''}{subCategory}
                </>
              ) : (
                t('select_category', 'Selecciona categoría')
              )}
            </small>
          </div>
          <div className="ms-auto">
            <span className="badge bg-primary">
              {t('step', 'Paso')} {currentStep}/5
            </span>
          </div>
        </div>
        
        {/* BARRA DE PROGRESO */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
          className="progress mt-3"
          style={{ height: '6px' }}
        >
          <motion.div 
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / 5) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
      
      {/* CONTENIDO DEL PASO */}
      {renderStepFields()}
      
      {/* NAVEGACIÓN */}
      {showNavigation && (
        <div className="step-navigation mt-4 pt-3 border-top">
          <div className="d-flex justify-content-between">
            <AnimatePresence>
              {currentStep > 1 && (
                <motion.button
                  key="prev-btn"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="btn btn-outline-secondary"
                  onClick={handlePrevStep}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  {t('previous_step', 'Paso anterior')}
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.button
              className="btn btn-primary"
              onClick={handleNextStep}
              disabled={!canContinue()}
              whileHover={canContinue() ? { scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" } : {}}
              whileTap={canContinue() ? { scale: 0.95 } : {}}
            >
              {currentStep < 5 ? (
                <>
                  {t('next_step', 'Siguiente paso')} 
                  <i className="fas fa-arrow-right ms-2"></i>
                </>
              ) : (
                <>
                  {t('publish', 'Publicar anuncio')} 
                  <i className="fas fa-paper-plane ms-2"></i>
                </>
              )}
            </motion.button>
          </div>
          
          {/* Indicador si hay campos requeridos */}
          {!canContinue() && currentStep !== 5 && (
            <div className="alert alert-warning mt-3 py-2">
              <small>
                <i className="fas fa-exclamation-triangle me-1"></i>
                {t('complete_required_fields', 'Completa los campos obligatorios antes de continuar')}
              </small>
            </div>
          )}
        </div>
      )}
      
      {/* ESTILOS (manteniendo los tuyos) */}
      <style jsx>{`
        .multi-step-form {
          padding: 25px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          border: 1px solid #eaeaea;
        }
        
        .step-header {
          padding-bottom: 15px;
          border-bottom: 2px solid #f0f0f0;
        }
        
        .step-icon-circle {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }
        
        .step-icon {
          font-size: 24px;
          color: white;
        }
        
        .progress {
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #4f46e5, #7c3aed, #a78bfa);
          border-radius: 3px;
          transition: width 0.8s ease-in-out;
        }
        
        .field-wrapper {
          transition: all 0.3s ease;
          background: #f8f9fa;
          border-radius: 8px;
          padding: 15px;
          border: 1px solid #dee2e6;
        }
        
        .field-wrapper:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          border-color: #4f46e5;
        }
        
        .step-navigation {
          position: relative;
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
          box-shadow: none !important;
        }
        
        .images-step .alert-info {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
          border: 2px dashed #2196f3;
          border-radius: 12px;
        }
        
        @media (max-width: 768px) {
          .multi-step-form {
            padding: 15px;
            margin: 0 -10px;
          }
          
          .step-icon-circle {
            width: 50px;
            height: 50px;
          }
          
          .field-wrapper {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicFieldManager;