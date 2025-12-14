// FieldRenderer.js - VERSIÓN SIMPLIFICADA Y FUNCIONAL
import React, { useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

// 🔥 IMPORTAR TODOS LOS CAMPOS COMUNES DESDE EL INDEX
import * as CamposComun from './camposComun/index';

// 🔥 IMPORTAR COMPONENTES ESPECÍFICOS DE CATEGORÍAS
import ImmobilierFields from './specificFields/ImmobiliersFields';
import VetementsFields from './specificFields/VetementsFields';
import VehiculesFields from './specificFields/VehiculesFields';
import TelephonesFields from './specificFields/TelephonesFields';
import InformatiqueFields from './specificFields/InformatiqueFields';
import ElectromenagerFields from './specificFields/ElectromenagerFields';
import SanteBeauteFields from './specificFields/SanteBeauteFields';
import MeublesFields from './specificFields/MeublesFields';
import LoisirsFields from './specificFields/LoisirsFields';
import SportFields from './specificFields/SportFields';
import AlimentairesFields from './specificFields/AlimentairesFields';
import MateriauxFields from './specificFields/MateriauxFields';
import ServicesFields from './specificFields/ServicesFields';
import VoyagesFields from './specificFields/VoyagesFields';
import EmploiFields from './specificFields/EmploiFields';
import PiecesDetacheesFields from './specificFields/PiecesDetacheesFields';

// 🔥 MAPEO DE COMPONENTES ESPECÍFICOS POR CATEGORÍA
const CATEGORY_COMPONENTS = {
  'immobilier': ImmobilierFields,
  'automobiles': VehiculesFields,
  'vetements': VetementsFields,
  'telephones': TelephonesFields,
  'informatique': InformatiqueFields,
  'electromenager': ElectromenagerFields,
  'sante_beaute': SanteBeauteFields,
  'meubles': MeublesFields,
  'loisirs': LoisirsFields,
  'sport': SportFields,
  'alimentaires': AlimentairesFields,
  'materiaux': MateriauxFields,
  'services': ServicesFields,
  'voyages': VoyagesFields,
  'emploi': EmploiFields,
  'pieces_detachees': PiecesDetacheesFields,
};

// 🔥 SISTEMA CENTRAL DE VISIBILIDAD (SIMPLIFICADO)
const useFieldVisibility = (fieldName, mainCategory, subCategory, articleType, postData) => {
  return useMemo(() => {
    console.log(`🔍 [Visibility] Verificando ${fieldName} para ${mainCategory}.${subCategory}`);
    
    // 📌 REGLAS PARA VOYAGES
    if (mainCategory === 'voyages') {
      if (subCategory === 'voyage_organise') {
        if (fieldName === 'destinationWilaya' && postData.destinationType !== 'local') {
          return false;
        }
        if (fieldName === 'destinationCountry' && postData.destinationType !== 'international') {
          return false;
        }
      }
      
      if (subCategory === 'location_vacances') {
        if (fieldName === 'communeLocation' && (!postData.wilayaLocation || postData.wilayaLocation === '')) {
          return false;
        }
      }
    }
    
    // 📌 REGLAS PARA IMMOBILIER
    if (mainCategory === 'immobilier') {
      const invalidCombinations = {
        'villa': ['etage', 'nombreEtagesImmeuble'],
        'terrain': ['etage', 'nombrePieces', 'ascenseur', 'parking', 'meuble', 'etages'],
        'local': ['etage', 'nombrePieces', 'jardin', 'piscine'],
        'terrain_agricole': ['etage', 'nombrePieces', 'ascenseur', 'parking'],
        'immeuble': ['superficieJardin', 'piscine', 'jardin']
      };
      
      if (invalidCombinations[subCategory]?.includes(fieldName)) {
        return false;
      }
      
      if (fieldName === 'superficieJardin' && postData.jardin !== 'oui') {
        return false;
      }
      if (fieldName === 'nombrePlacesGarage' && postData.garage === 'non') {
        return false;
      }
    }
    
    // Por defecto: mostrar el campo
    return true;
    
  }, [fieldName, mainCategory, subCategory, articleType, postData]);
};

// 🔥 COMPONENTE PRINCIPAL FIELD RENDERER (CORREGIDO)
const FieldRenderer = ({ 
  fieldName, 
  postData, 
  handleChangeInput, 
  mainCategory, 
  subCategory, 
  articleType, 
  isRTL 
}) => {
  const { t } = useTranslation();
  
  // 🔍 DEBUG: Ver qué props estamos recibiendo
  useEffect(() => {
    console.log('🎯 FieldRenderer recibió:', {
      fieldName,
      mainCategory,
      subCategory,
      articleType
    });
  }, [fieldName, mainCategory, subCategory, articleType]);
  
  // 🔥 PASO 1: Determinar si el campo debe mostrarse
  const shouldShowField = useFieldVisibility(
    fieldName, 
    mainCategory, 
    subCategory, 
    articleType, 
    postData
  );
  
  if (!shouldShowField) {
    console.log(`🚫 Campo ${fieldName} oculto por reglas de visibilidad`);
    return null;
  }
  
  // 🔥 PASO 2: Verificar si es un campo común (usando el mapa de CamposComun)
  const commonFieldType = CamposComun.COMMON_FIELDS_MAP?.[fieldName];
  
  if (commonFieldType && CamposComun[commonFieldType]) {
    const Component = CamposComun[commonFieldType];
    console.log(`✅ Usando componente común: ${commonFieldType} para ${fieldName}`);
    
    // 🎯 PROPS BASE PARA TODOS LOS CAMPOS COMUNES
    const baseProps = {
      key: `${fieldName}-${mainCategory}-${subCategory}`,
      postData,
      handleChangeInput,
      isRTL,
      name: fieldName,
      label: fieldName
    };
    
    // 🎯 PROPS ESPECÍFICOS SEGÚN TIPO DE CAMPO
    let specificProps = {};
    
    // Campos que necesitan categoría y subcategoría
    if (['MarqueField', 'ModeleField', 'TailleField', 'EtatField', 'PrixField'].includes(commonFieldType)) {
      specificProps.selectedCategory = mainCategory;
      specificProps.selectedSubCategory = subCategory;
    }
    
    // ModeleField necesita la marca seleccionada
    if (commonFieldType === 'ModeleField') {
      // Buscar la marca en varios campos posibles
      const selectedBrand = postData.marque || postData.marqueauto || postData.marquemoto || '';
      specificProps.selectedBrand = selectedBrand;
      
      console.log(`🔍 ModeleField - Marca seleccionada: ${selectedBrand}`);
      
      // Si no hay marca, mostrar mensaje
      if (!selectedBrand) {
        return (
          <div className="alert alert-warning py-2 mb-0">
            <small>
              <i className="bi bi-info-circle me-2"></i>
              {t('select_brand_first', 'Veuillez d\'abord sélectionner une marque')}
            </small>
          </div>
        );
      }
    }
    
    // PrixField necesita moneda específica para algunas categorías
    if (commonFieldType === 'PrixField') {
      if (mainCategory === 'voyages') {
        specificProps.currency = 'EURO';
      } else {
        specificProps.currency = 'DA';
      }
    }
    
    return (
      <div className={`field-renderer common-field ${commonFieldType.toLowerCase()}`}>
        <Component {...baseProps} {...specificProps} />
      </div>
    );
  }
  
  // 🔥 PASO 3: Usar componente específico de categoría
  const CategoryComponent = CATEGORY_COMPONENTS[mainCategory];
  
  if (CategoryComponent) {
    try {
      console.log(`🎯 Usando componente específico: ${mainCategory}Fields para ${fieldName}`);
      
      return (
        <div className="field-renderer category-specific">
          <CategoryComponent
            fieldName={fieldName}
            mainCategory={mainCategory}        // ✅ ¡IMPORTANTE! Pasar categoría
            subCategory={subCategory}
            articleType={articleType}
            postData={postData}
            handleChangeInput={handleChangeInput}
            isRTL={isRTL}
          />
        </div>
      );
    } catch (error) {
      console.error(`❌ Error en ${mainCategory}Fields para '${fieldName}':`, error);
      return (
        <div className="alert alert-danger">
          Error en componente de categoría: {error.message}
        </div>
      );
    }
  }
  
  // 🔥 PASO 4: Campo genérico como último recurso
  console.warn(`⚠️ [FieldRenderer] Campo '${fieldName}' sin componente para ${mainCategory}`);
  
  // Determinar tipo de campo basado en el nombre
  const getFieldType = () => {
    if (fieldName.includes('date') || fieldName.includes('Date')) return 'date';
    if (fieldName.includes('email')) return 'email';
    if (fieldName.includes('phone') || fieldName.includes('Phone')) return 'tel';
    if (fieldName.includes('prix') || fieldName.includes('price') || fieldName.includes('loyer')) return 'number';
    if (fieldName.includes('quantite') || fieldName.includes('nombre') || fieldName.includes('capacite')) return 'number';
    if (fieldName.includes('description') || fieldName.includes('content')) return 'textarea';
    return 'text';
  };
  
  const fieldType = getFieldType();
  
  return (
    <div className="field-renderer generic-field">
      <Form.Group>
        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
          {t(`fields.${fieldName}`, fieldName.replace(/_/g, ' '))}
        </Form.Label>
        
        {fieldType === 'textarea' ? (
          <Form.Control
            as="textarea"
            name={fieldName}
            value={postData[fieldName] || ''}
            onChange={handleChangeInput}
            placeholder={t(`enter_${fieldName}`, `Entrez ${fieldName.replace(/_/g, ' ')}`)}
            rows={3}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        ) : (
          <Form.Control
            type={fieldType}
            name={fieldName}
            value={postData[fieldName] || ''}
            onChange={handleChangeInput}
            placeholder={t(`enter_${fieldName}`, `Entrez ${fieldName.replace(/_/g, ' ')}`)}
            dir={isRTL ? 'rtl' : 'ltr'}
            min={fieldType === 'number' ? '0' : undefined}
            step={fieldType === 'number' ? '0.01' : undefined}
          />
        )}
        
        <Form.Text className="text-muted">
          <small>
            <i className="fas fa-info-circle me-1"></i>
            {t('generic_field', 'Champ générique')} • {fieldType}
          </small>
        </Form.Text>
      </Form.Group>
    </div>
  );
};

// 🔥 PROPIEDADES POR DEFECTO
FieldRenderer.defaultProps = {
  fieldName: '',
  postData: {},
  handleChangeInput: () => {},
  mainCategory: '',
  subCategory: '',
  articleType: '',
  isRTL: false
};

// 🔥 FUNCIONES DE UTILIDAD
export const getCommonFields = () => Object.keys(CamposComun.COMMON_FIELDS_MAP || {});
export const getAvailableCategories = () => Object.keys(CATEGORY_COMPONENTS);
export const isCommonField = (fieldName) => CamposComun.COMMON_FIELDS_MAP?.[fieldName] !== undefined;

export default FieldRenderer