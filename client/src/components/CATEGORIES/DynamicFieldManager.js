import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FieldRenderer from './FieldRenderer'; // Importamos FieldRenderer
import { getVisibleFields } from './FieldConfig';

const DynamicFieldManager = ({ 
  postData, 
  handleChangeInput, 
  mainCategory, 
  subCategory, 
  articleType 
}) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [visibleFields, setVisibleFields] = useState([]);

  // Determinar qué campos mostrar
  useEffect(() => {
    if (mainCategory && subCategory) {
      const fields = getVisibleFields(mainCategory, subCategory, articleType);
      setVisibleFields(fields);
    } else {
      setVisibleFields([]);
    }
  }, [mainCategory, subCategory, articleType]);

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
    <div className={`mt-4 p-3 border rounded bg-light ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="mb-3 border-bottom pb-2">
        <h6 className="text-primary mb-0">
          ⚙️ {t('specific_fields', 'Champs spécifiques')}
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
              handleChangeInput={handleChangeInput}
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
        </small>
      </div>
    </div>
  );
};

export default DynamicFieldManager;