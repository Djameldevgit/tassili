import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
 
const Categories = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('categories');
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');

  // Données des catégories avec icônes
  const categories = [
    { 
      id: 'immobilier', 
      name: t('immobilier', 'Immobilier')
    },
    { 
      id: 'vehicules', 
      name: t('automobiles', 'Automobiles & Véhicules')
    },
  
    { 
      id: 'telephones', 
      name: t('telephones', 'Téléphones & Accessoires')
    },
    { 
      id: 'informatique', 
      name: t('informatique', 'Informatique')
    },
    { 
      id: 'electromenager', 
      name: t('electromenager', 'Électroménager & Électronique')
    },
    { 
      id: 'piecesDetachees', 
      name: t('piecesDetachees', 'Pieces Detachees')
    },


    { 
      id: 'vetements', 
      name: t('vetements', 'Vêtements & Mode')
    },
    { 
      id: 'alimentaires', 
      name: t('Alimentaires', 'Alimentaires')
    }, 

    { 
      id: 'sante_beaute', 
      name: t('sante_beaute', 'Santé & Beauté')
    },
    { 
      id: 'meubles', 
      name: t('meubles', 'Meubles & Maison')
    },
    { 
      id: 'services', 
      name: t('Services', 'Services')
    }, 
    { 
      id: 'materiaux', 
      name: t('Materiaux', 'Materiaux')
    }, 


    { 
      id: 'loisirs', 
      name: t('loisirs', 'Loisirs & Divertissements')
    },
    { 
      id: 'emploi', 
      name: t('emploi', 'Offres & Demandes d\'emploi')
    },
    { 
      id: 'sport', 
      name: t('Sport')
    } ,
    { 
      id: 'voyages', 
      name: t('Voyage')
    }

  ];

  // Filtrer les catégories selon la recherche
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
 
      <Form.Group>
        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
          {t('main_category', 'Catégorie principale')} 
        </Form.Label>
        <Form.Select
          name="categorie"
          value={postData.categorie || ''}
          onChange={handleChangeInput}
          className={`form-select ${isRTL ? 'text-end' : ''}`}
          required
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_category', 'Choisissez une catégorie')}</option>
          {filteredCategories.map((category) => (
             <option key={category.id} value={category.id}>
            {category.name}
            </option> 
          ))}
        </Form.Select>
      </Form.Group>

      {/* Styles inline para RTL */}
      <style>
        {`
          .rtl { direction: rtl; text-align: right; }
          .ltr { direction: ltr; text-align: left; }
          
          .rtl .me-2 { margin-left: 0.5rem !important; margin-right: 0 !important; }
          .rtl .ms-2 { margin-right: 0.5rem !important; margin-left: 0 !important; }
          
          .form-select {
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            border: 1px solid #ced4da;
          }
          
          .form-select:focus {
            border-color: #86b7fe;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
          }
        `}
      </style>
    </div>
  );
};

export default React.memo(Categories);