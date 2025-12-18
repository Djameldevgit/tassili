import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import FieldRenderer from './FieldRenderer';

// 🔥 CONFIGURACIÓN DE PASOS
const STEP_CONFIG = {
  // Immobilier
  immobilier: {
    vente: {
      appartement: {
        step1: ['superficie', 'chambres', 'salle_de_bain', 'etage', 'ascenseur'],
        step2: ['description', 'meuble', 'parking', 'jardin', 'piscine'],
        step3: ['prix', 'negociable'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: [] // Imágenes manejadas aparte
      },
      villa: {
        step1: ['superficie', 'chambres', 'salle_de_bain', 'etages'],
        step2: ['description', 'jardin', 'piscine', 'garage'],
        step3: ['prix', 'negociable'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      }
    },
    location: {
      appartement: {
        step1: ['superficie', 'chambres', 'salle_de_bain', 'etage'],
        step2: ['description', 'meuble', 'parking'],
        step3: ['loyer', 'caution'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      }
    }
  },
  
  // Vehicules
  vehicules: {
    automobiles: {
      step1: ['marque', 'modele', 'annee', 'kilometrage'],
      step2: ['carburant', 'boite', 'couleur', 'puissance'],
      step3: ['prix', 'negociable', 'etat', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    motos: {
      step1: ['marque', 'modele', 'annee', 'kilometrage'],
      step2: ['cylindree', 'couleur', 'type_moto'],
      step3: ['prix', 'negociable', 'etat'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // Telephones
  telephones: {
    smartphones: {
      step1: ['marque', 'modele', 'capacite_stockage'],
      step2: ['etat', 'couleur', 'accessoires'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  }
  // Agrega más configuraciones...
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
  const [stepFields, setStepFields] = useState({});
  const [direction, setDirection] = useState(0); // -1: atrás, 1: adelante
  
  // 🔥 OBTENER CONFIGURACIÓN DE PASOS
  useEffect(() => {
    if (!mainCategory || !subCategory || (mainCategory === 'immobilier' && !articleType)) {
      setStepFields({});
      return;
    }
    
    try {
      let config = {};
      
      if (mainCategory === 'immobilier') {
        config = STEP_CONFIG.immobilier?.[articleType]?.[subCategory] || {};
      } else {
        config = STEP_CONFIG[mainCategory]?.[subCategory] || {};
      }
      
      console.log('📋 Configuración de pasos:', config);
      setStepFields(config);
      
      // Obtener campos para el paso actual
      const currentStepKey = `step${currentStep}`;
      const fields = config[currentStepKey] || [];
      setVisibleFields(fields);
      
    } catch (error) {
      console.error('❌ Error obteniendo configuración de pasos:', error);
      setStepFields({});
      setVisibleFields([]);
    }
  }, [mainCategory, subCategory, articleType, currentStep]);
  
  // 🔥 HANDLERS DE NAVEGACIÓN
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
  
  // 🔥 VARIANTES DE ANIMACIÓN
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
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 100 }
    }
  };
  
  // 🔥 OBTENER TÍTULO DEL PASO
  const getStepTitle = () => {
    const titles = {
      1: t('step1_title', 'Información básica'),
      2: t('step2_title', 'Descripción y detalles'),
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
      2: '📝',
      3: '💰',
      4: '📍',
      5: '🖼️'
    };
    return icons[currentStep] || '📋';
  };
  
  // Si no hay configuración válida
  if (!mainCategory || !subCategory) {
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
          <h5 className="mt-3">Sélectionnez une catégorie pour commencer</h5>
        </div>
      </motion.div>
    );
  }
  
  // Si no hay campos para este paso
  if (visibleFields.length === 0 && currentStep < 5) {
    return (
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center py-4"
      >
        <div className="alert alert-info">
          <h5><i className="fas fa-check-circle me-2"></i> Paso completado</h5>
          <p>Este paso no requiere información adicional.</p>
          {showNavigation && (
            <div className="mt-3">
              <button className="btn btn-primary" onClick={handleNextStep}>
                Continuar al siguiente paso →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    );
  }
  
  // Paso 5: Imágenes (manejado aparte)
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
        <h4 className="mb-4">🖼️ {t('images_step', 'Subir imágenes')}</h4>
        <p>Este paso se maneja en el componente ImagesStep.js</p>
        {/* Aquí integrarías tu componente de imágenes */}
      </motion.div>
    );
  }
  
  // 🔥 RENDERIZAR PASOS 1-4
  return (
    <div className="multi-step-form">
      
      {/* CABECERA DEL PASO */}
      <motion.div 
        variants={fadeInUp}
        className="step-header mb-4"
      >
        <div className="d-flex align-items-center">
          <div className="step-icon-circle me-3">
            <span className="step-icon">{getStepIcon()}</span>
          </div>
          <div>
            <h4 className="mb-0">{getStepTitle()}</h4>
            <small className="text-muted">
              {mainCategory} → {articleType ? `${articleType} → ` : ''}{subCategory}
            </small>
          </div>
          <div className="ms-auto">
            <span className="badge bg-primary">
              Paso {currentStep}/5
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
      </motion.div>
      
      {/* CONTENIDO ANIMADO */}
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
          <div className="fields-grid">
            <div className="row g-3">
              {visibleFields.map((fieldName, index) => (
                <motion.div 
                  key={fieldName}
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
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* NAVEGACIÓN */}
      {showNavigation && (
        <motion.div 
          variants={fadeInUp}
          className="step-navigation mt-4 pt-3 border-top"
        >
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
                  ← Paso anterior
                </motion.button>
              )}
            </AnimatePresence>
            
            <motion.button
              className="btn btn-primary"
              onClick={handleNextStep}
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              {currentStep < 4 ? 'Siguiente paso →' : 'Continuar con imágenes →'}
            </motion.button>
          </div>
        </motion.div>
      )}
      
      {/* ESTILOS */}
      <style jsx>{`
        .multi-step-form {
          padding: 25px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
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
        }
        
        .field-wrapper {
          transition: all 0.3s ease;
        }
        
        .field-wrapper:hover {
          transform: translateY(-2px);
        }
        
        .step-navigation {
          position: relative;
        }
        
        @media (max-width: 768px) {
          .multi-step-form {
            padding: 15px;
          }
          
          .step-icon-circle {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default DynamicFieldManager;