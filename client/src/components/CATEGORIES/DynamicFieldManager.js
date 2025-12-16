import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import FieldRenderer from './FieldRenderer';
import { getVisibleFields } from './FieldConfig';

const DynamicFieldManager = ({ 
  postData, 
  handleChangeInput, 
  mainCategory, 
  subCategory, 
  articleType,
  onCategoryDataChange // 🔥 NUEVO: callback para enviar datos al padre
}) => {
  const { t, i18n } = useTranslation('dynamicmanager');
  const isRTL = i18n.language === 'ar';
  const [visibleFields, setVisibleFields] = useState([]);
  
  // 🔥 REF para evitar re-renders innecesarios
  const prevCategoryRef = useRef({ mainCategory: '', subCategory: '' });
  
  // 🔥 Estado para datos específicos de esta categoría
  const [categoryData, setCategoryData] = useState({});

  // 🎯 Determinar qué campos mostrar
  useEffect(() => {
    if (mainCategory && subCategory) {
      const fields = getVisibleFields(mainCategory, subCategory, articleType);
      setVisibleFields(fields);
      
      // 🔥 Resetear datos de categoría cuando cambia la categoría
      if (prevCategoryRef.current.mainCategory !== mainCategory || 
          prevCategoryRef.current.subCategory !== subCategory) {
        setCategoryData({});
        if (onCategoryDataChange) {
          onCategoryDataChange({}); // Limpiar datos anteriores
        }
      }
      
      prevCategoryRef.current = { mainCategory, subCategory };
    } else {
      setVisibleFields([]);
    }
  }, [mainCategory, subCategory, articleType, onCategoryDataChange]);

  // 🔥 Efecto para extraer y enviar datos específicos
  useEffect(() => {
    if (visibleFields.length === 0 || !postData) return;

    // Extraer solo los campos específicos de esta categoría
    const specificData = {};
    
    visibleFields.forEach(fieldName => {
      if (postData[fieldName] !== undefined && postData[fieldName] !== null) {
        specificData[fieldName] = postData[fieldName];
      }
    });

    // Si hay datos, actualizar estado y notificar al padre
    if (Object.keys(specificData).length > 0) {
      setCategoryData(specificData);
      
      if (onCategoryDataChange) {
        onCategoryDataChange(specificData);
      }
    }
    
  }, [postData, visibleFields, onCategoryDataChange]);

  // 🔥 Handler mejorado para cambios de campos
  const handleFieldChange = useCallback((e) => {
    // Primero, ejecutar el handler original
    handleChangeInput(e);
    
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    // 🔥 Actualizar datos específicos inmediatamente
    setCategoryData(prev => ({
      ...prev,
      [name]: fieldValue
    }));
    
    // 🔥 Notificar al padre del cambio
    if (onCategoryDataChange && visibleFields.includes(name)) {
      setTimeout(() => {
        const updatedData = { ...categoryData, [name]: fieldValue };
        onCategoryDataChange(updatedData);
      }, 0);
    }
    
  }, [handleChangeInput, onCategoryDataChange, categoryData, visibleFields]);

  // 🔥 Función para obtener datos completos de la categoría
  const getFullCategoryData = useCallback(() => {
    const allData = {};
    
    // Combinar datos de postData que son específicos de esta categoría
    visibleFields.forEach(fieldName => {
      if (postData && postData[fieldName] !== undefined) {
        allData[fieldName] = postData[fieldName];
      }
    });
    
    return allData;
  }, [visibleFields, postData]);

  // Si no hay categoría o subcategoría, no renderizar nada
  if (!mainCategory || !subCategory) {
    return (
      <div className={`text-center py-4 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-muted">
          <p>🏁 {t('select_category_first', 'Sélectionnez d\'abord une catégorie')}</p>
        </div>
      </div>
    );
  }

  // Si no hay campos visibles para esta categoría
  if (visibleFields.length === 0) {
    return (
      <div className={`text-center py-4 ${isRTL ? 'rtl' : 'ltr'}`}>
        <div className="text-muted">
          <p>🎯 {t('no_specific_fields', 'Aucun champ spécifique requis pour cette catégorie')}</p>
        </div>
      </div>
    );
  }

  // 🎯 RENDERIZAR CAMPOS USANDO FieldRenderer
  return (
    <div className={`p-1 border rounded bg-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="mb-3 border-bottom pb-1">
        <h6 className="text-primary mb-0">
         
          <small className="text-muted ms-2">
            {t('for_category', 'pour')}: {t(`categories.${mainCategory}`, mainCategory)} → {t(`subcategories.${subCategory}`, subCategory)}
          </small>
        </h6>
        
    
      </div>
      
      <div className="row g-3">
        {visibleFields.map((fieldName) => (
          <div key={fieldName} className="col-12 col-md-6">
            <FieldRenderer
              fieldName={fieldName}
              postData={postData}
              handleChangeInput={handleFieldChange} // 🔥 Usar handler mejorado
              mainCategory={mainCategory}
              subCategory={subCategory}
              articleType={articleType}
              isRTL={isRTL}
            />
          </div>
        ))}
      </div>
      
      {/* Información sobre los campos */}
      <div className="mt-3 pt-2 border-top">
        <small className="text-muted">
          <i className="fas fa-info-circle me-1"></i>
          {t('fields_info', `${visibleFields.length} champ(s) spécifique(s) pour cette catégorie`)}
          
          {/* 🔥 Información adicional de datos */}
          {Object.keys(categoryData).length > 0 && (
            <span className="ms-2">
              <i className="fas fa-database me-1"></i>
              {Object.keys(categoryData).length} datos capturados
            </span>
          )}
        </small>
      </div>
    </div>
  );
};

// 🔥 Función helper para exportar datos
DynamicFieldManager.getCategoryData = (postData, mainCategory, subCategory) => {
  if (!mainCategory || !subCategory || !postData) return {};
  
  try {
    const fields = getVisibleFields(mainCategory, subCategory, postData.articleType || 'vente');
    const specificData = {};
    
    fields.forEach(fieldName => {
      if (postData[fieldName] !== undefined && postData[fieldName] !== null) {
        specificData[fieldName] = postData[fieldName];
      }
    });
    
    return specificData;
  } catch (error) {
    console.error('Error obteniendo datos de categoría:', error);
    return {};
  }
};

export default DynamicFieldManager;