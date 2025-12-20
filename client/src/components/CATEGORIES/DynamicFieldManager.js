// DynamicFieldManager.js - CONFIGURACIÓN COMPLETA
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import FieldRenderer from './FieldRenderer';

// 🔥 CONFIGURACIÓN COMPLETA DE TODOS LOS PASOS
const STEP_CONFIG = {
  // ==================== IMMOBILIER ====================
  immobilier: {
    vente: {
      appartement: {
        step1: ['superficie', 'chambres', 'salle_de_bain', 'etage', 'ascenseur'],
        step2: ['description', 'meuble', 'parking', 'jardin', 'piscine'],
        step3: ['prix', 'negociable'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      },
      villa: {
        step1: ['superficie', 'chambres', 'salle_de_bain', 'etages'],
        step2: ['description', 'jardin', 'piscine', 'garage'],
        step3: ['prix', 'negociable'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      },
      terrain: {
        step1: ['superficie', 'type_terrain'],
        step2: ['description', 'viabilise'],
        step3: ['prix', 'negociable'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      },
      local: {
        step1: ['superficie', 'type_local'],
        step2: ['description', 'parking'],
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
      },
      villa: {
        step1: ['superficie', 'chambres', 'salle_de_bain'],
        step2: ['description', 'meuble', 'jardin', 'piscine'],
        step3: ['loyer', 'caution'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      }
    },
    location_vacances: {
      appartement: {
        step1: ['superficie', 'chambres', 'salle_de_bain'],
        step2: ['description', 'meuble', 'equipements'],
        step3: ['prix_nuit', 'prix_semaine', 'caution'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      },
      villa: {
        step1: ['superficie', 'chambres', 'salle_de_bain'],
        step2: ['description', 'piscine', 'jardin', 'bbq'],
        step3: ['prix_nuit', 'prix_semaine', 'caution'],
        step4: ['wilaya', 'commune', 'adresse', 'phone'],
        step5: []
      }
    }
  },
  
  // ==================== VEHICULES ====================
  vehicules: {
    automobiles: {
      step1: ['marque', 'modele', 'annee', 'kilometrage'],
      step2: ['carburant', 'boite', 'couleur', 'puissance', 'portes'],
      step3: ['prix', 'negociable', 'etat', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    utilitaires: {
      step1: ['marque', 'modele', 'annee', 'kilometrage'],
      step2: ['carburant', 'boite', 'couleur', 'charge_utile'],
      step3: ['prix', 'negociable', 'etat'],
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
  
  // ==================== VETEMENTS ====================
  vetements: {
    vetements_homme: {
      step1: ['type_vetement', 'marque', 'taille', 'couleur'],
      step2: ['etat', 'matiere', 'saison'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    vetements_femme: {
      step1: ['type_vetement', 'marque', 'taille', 'couleur'],
      step2: ['etat', 'matiere', 'saison'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    chaussures_homme: {
      step1: ['type_chaussure', 'marque', 'pointure', 'couleur'],
      step2: ['etat', 'matiere'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    chaussures_femme: {
      step1: ['type_chaussure', 'marque', 'pointure', 'couleur'],
      step2: ['etat', 'matiere', 'talon'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== TELEPHONES ====================
  telephones: {
    smartphones: {
      step1: ['marque', 'modele', 'capacite_stockage', 'ram'],
      step2: ['etat', 'couleur', 'accessoires'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    telephones_cellulaires: {
      step1: ['marque', 'modele'],
      step2: ['etat', 'couleur'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    tablettes: {
      step1: ['marque', 'modele', 'capacite_stockage', 'taille_ecran'],
      step2: ['etat', 'couleur', 'accessoires'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== INFORMATIQUE ====================
  informatique: {
    ordinateurs_portables: {
      step1: ['marque', 'modele', 'processeur', 'ram', 'stockage'],
      step2: ['taille_ecran', 'carte_graphique', 'etat'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    ordinateurs_bureau: {
      step1: ['processeur', 'ram', 'stockage', 'carte_graphique'],
      step2: ['ecran', 'clavier_souris', 'etat'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    serveurs: {
      step1: ['processeur', 'ram', 'stockage', 'type_serveur'],
      step2: ['etat', 'age'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== ELECTROMENAGER ====================
  electromenager: {
    televiseurs: {
      step1: ['marque', 'modele', 'taille_ecran', 'type_ecran'],
      step2: ['etat', 'annee', 'accessoires'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    demodulateurs_box_tv: {
      step1: ['marque', 'modele', 'operateur'],
      step2: ['etat', 'accessoires'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    paraboles_switch_tv: {
      step1: ['type_equipement', 'marque'],
      step2: ['etat', 'accessoires'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== PIECES DETACHEES ====================
  piecesDetachees: {
    pieces_automobiles: {
      step1: ['marque_vehicule', 'modele', 'reference_piece'],
      step2: ['etat', 'neuf_occasion'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    pieces_vehicules: {
      step1: ['type_vehicule', 'reference_piece'],
      step2: ['etat', 'neuf_occasion'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    pieces_moto: {
      step1: ['marque_moto', 'modele', 'reference_piece'],
      step2: ['etat', 'neuf_occasion'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== SANTE & BEAUTE ====================
  sante_beaute: {
    cosmetiques_beaute: {
      step1: ['type_produit', 'marque'],
      step2: ['etat', 'date_peremption'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    parfums_deodorants_femme: {
      step1: ['marque_parfum', 'contenance'],
      step2: ['etat', 'date_peremption'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    parfums_deodorants_homme: {
      step1: ['marque_parfum', 'contenance'],
      step2: ['etat', 'date_peremption'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    parapharmacie_sante: {
      step1: ['type_produit', 'marque'],
      step2: ['etat', 'date_peremption'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== MEUBLES ====================
  meubles: {
    meubles_maison: {
      step1: ['type_meuble', 'materiau'],
      step2: ['etat', 'couleur', 'dimensions'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    decoration: {
      step1: ['type_decoration', 'style'],
      step2: ['etat', 'materiau'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    vaisselle: {
      step1: ['type_vaisselle', 'materiau'],
      step2: ['etat', 'nombre_pieces'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== LOISIRS ====================
  loisirs: {
    animalerie: {
      step1: ['type_animal', 'race'],
      step2: ['age', 'sexe', 'vaccin'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    consoles_jeux_videos: {
      step1: ['type_console', 'marque', 'modele'],
      step2: ['etat', 'accessoires', 'jeux_inclus'],
      step3: ['prix', 'negociable', 'garantie'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    livres_magazines: {
      step1: ['type_livre', 'titre', 'auteur'],
      step2: ['etat', 'langue', 'annee_edition'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== SPORT ====================
  sport: {
    football: {
      step1: ['type_equipement', 'marque', 'taille'],
      step2: ['etat', 'couleur'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    hand_voley_basket: {
      step1: ['sport', 'type_equipement', 'marque'],
      step2: ['etat', 'taille'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== ALIMENTAIRES ====================
  alimentaires: {
    fruits_secs: {
      step1: ['type_fruit', 'quantite'],
      step2: ['qualite', 'origine'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    graines_riz_cereales: {
      step1: ['type_produit', 'quantite'],
      step2: ['qualite', 'origine'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    aliments_dietetiques: {
      step1: ['type_produit', 'marque'],
      step2: ['composition', 'date_peremption'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== SERVICES ====================
  services: {
    construction_travaux: {
      step1: ['type_service', 'specialite'],
      step2: ['experience', 'zone_intervention'],
      step3: ['tarif', 'devis_gratuit'],
      step4: ['wilaya', 'commune', 'phone', 'email'],
      step5: []
    },
    ecoles_formations: {
      step1: ['type_formation', 'domaine'],
      step2: ['duree', 'diplome', 'langue'],
      step3: ['prix', 'modalites_paiement'],
      step4: ['wilaya', 'commune', 'phone', 'email'],
      step5: []
    }
  },
  
  // ==================== MATERIAUX ====================
  materiaux: {
    materiel_professionnel: {
      step1: ['type_materiel', 'marque'],
      step2: ['etat', 'annee', 'heures_utilisation'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    outillage_professionnel: {
      step1: ['type_outil', 'marque'],
      step2: ['etat', 'accessoires'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    materiaux_construction: {
      step1: ['type_materiau', 'qualite'],
      step2: ['quantite', 'conditionnement'],
      step3: ['prix', 'negociable'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    }
  },
  
  // ==================== VOYAGES ====================
  voyages: {
    voyage_organise: {
      step1: ['destination', 'duree'],
      step2: ['type_voyage', 'periode'],
      step3: ['prix_personne', 'inclus'],
      step4: ['agence', 'phone', 'email'],
      step5: []
    },
    location_vacances: {
      step1: ['destination', 'type_hebergement'],
      step2: ['capacite', 'equipements'],
      step3: ['prix_nuit', 'prix_semaine', 'caution'],
      step4: ['wilaya', 'commune', 'phone'],
      step5: []
    },
    hajj_omra: {
      step1: ['type_pelerinage', 'periode'],
      step2: ['forfait', 'hebergement'],
      step3: ['prix', 'inclus'],
      step4: ['agence', 'phone', 'email'],
      step5: []
    }
  },
  
  // ==================== EMPLOI ====================
  emploi: {
    offres_emploi: {
      step1: ['poste', 'secteur'],
      step2: ['type_contrat', 'experience_requise', 'diplome'],
      step3: ['salaire', 'avantages'],
      step4: ['entreprise', 'wilaya', 'phone', 'email'],
      step5: []
    },
    demandes_emploi: {
      step1: ['poste_recherche', 'secteur'],
      step2: ['experience', 'diplome', 'competences'],
      step3: ['salaire_souhaite', 'type_contrat'],
      step4: ['wilaya', 'phone', 'email'],
      step5: []
    }
  }
};

// 🔥 CONFIGURACIÓN POR DEFECTO (si no encuentra la categoría específica)
const DEFAULT_CONFIG = {
  step1: ['description'],
  step2: ['prix', 'etat'],
  step3: ['wilaya', 'commune'],
  step4: ['phone', 'email'],
  step5: []
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
  const [direction, setDirection] = useState(0);
  
  // 🔥 OBTENER CONFIGURACIÓN DE PASOS (MEJORADA)
  useEffect(() => {
    console.log('🔍 Buscando configuración para:', {
      mainCategory,
      subCategory,
      articleType,
      currentStep
    });
    
    if (!mainCategory || !subCategory) {
      console.log('⚠️ Falta categoría o subcategoría');
      setStepFields(DEFAULT_CONFIG);
      setVisibleFields(DEFAULT_CONFIG[`step${currentStep}`] || []);
      return;
    }
    
    try {
      let config = {};
      
      // 1. Para immobilier (tiene articleType)
      if (mainCategory === 'immobilier') {
        if (!articleType) {
          console.log('⚠️ Immobilier necesita articleType');
          config = DEFAULT_CONFIG;
        } else {
          config = STEP_CONFIG.immobilier?.[articleType]?.[subCategory] || DEFAULT_CONFIG;
          console.log('🏠 Config immobilier encontrada:', config);
        }
      }
      // 2. Para otras categorías
      else {
        config = STEP_CONFIG[mainCategory]?.[subCategory] || DEFAULT_CONFIG;
        console.log(`📋 Config para ${mainCategory}/${subCategory}:`, config);
      }
      
      // Guardar configuración
      setStepFields(config);
      
      // Obtener campos para el paso actual
      const currentStepKey = `step${currentStep}`;
      const fields = config[currentStepKey] || [];
      
      console.log(`🎯 Campos para paso ${currentStep}:`, fields);
      setVisibleFields(fields);
      
    } catch (error) {
      console.error('❌ Error obteniendo configuración:', error);
      setStepFields(DEFAULT_CONFIG);
      setVisibleFields(DEFAULT_CONFIG[`step${currentStep}`] || []);
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
  
  // 🔥 OBTENER TÍTULO DEL PASO
  const getStepTitle = () => {
    const titles = {
      1: t('step1_title', 'Información básica'),
      2: t('step2_title', 'Detalles'),
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
  
  // 🔥 VALIDAR SI SE PUEDE CONTINUAR
  const canContinue = () => {
    // Para el paso 5 (imágenes), validar aparte
    if (currentStep === 5) return true;
    
    // Para otros pasos, verificar si hay campos requeridos
    const requiredFields = visibleFields.filter(field => 
      field.includes('_required') || 
      ['prix', 'loyer', 'phone', 'wilaya'].includes(field)
    );
    
    if (requiredFields.length === 0) return true;
    
    // Verificar si los campos requeridos tienen valor
    return requiredFields.every(field => {
      const fieldValue = postData[field] || '';
      return fieldValue.toString().trim() !== '';
    });
  };
  
  // Si no hay categoría seleccionada
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
  
  // Paso 5: Imágenes
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
        <div className="step-header mb-4">
          <div className="d-flex align-items-center">
            <div className="step-icon-circle me-3">
              <span className="step-icon">🖼️</span>
            </div>
            <div>
              <h4 className="mb-0">{getStepTitle()}</h4>
              <small className="text-muted">
                {mainCategory} → {subCategory}
              </small>
            </div>
          </div>
        </div>
        
        <div className="alert alert-info">
          <h5><i className="fas fa-images me-2"></i> Paso de imágenes</h5>
          <p>Este paso se maneja en el componente ImagesStep.js</p>
          <p>Puedes continuar y las imágenes se subirán al final.</p>
        </div>
      </motion.div>
    );
  }
  
  // 🔥 RENDERIZAR PASOS 1-4
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
      </div>
      
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
          {/* Mensaje si no hay campos pero es un paso válido */}
          {visibleFields.length === 0 ? (
            <div className="alert alert-success">
              <h5><i className="fas fa-check-circle me-2"></i> Paso completado</h5>
              <p>Este paso no requiere información adicional.</p>
              <p className="mb-0">Puedes continuar al siguiente paso.</p>
            </div>
          ) : (
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
              
              {/* Ayuda sobre campos requeridos */}
              <div className="mt-3">
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Los campos marcados con * son obligatorios
                </small>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      
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
                  ← Paso anterior
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
              {currentStep < 4 ? 'Siguiente paso →' : 'Continuar con imágenes →'}
            </motion.button>
          </div>
          
          {/* Indicador si hay campos requeridos */}
          {!canContinue() && (
            <div className="alert alert-warning mt-3 py-2">
              <small>
                <i className="fas fa-exclamation-triangle me-1"></i>
                Completa los campos obligatorios antes de continuar
              </small>
            </div>
          )}
        </div>
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
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
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