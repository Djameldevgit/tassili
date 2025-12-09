import React from 'react';
import { Form, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Importar componentes específicos de categorías
  import ImmobilierFields from './specificFields/ImmobiliersFields';
import VetementsFields from './specificFields/VetementsFields';
import VehiculesFields from './specificFields/VehiculesFields'
 
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


// Campos compartidos básicos
const sharedFieldComponents = {
  'prix': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>💰 {t('price', 'Prix')}</Form.Label>
      <Form.Control
        type="number"
        name="prix"
        value={postData.prix || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_price', 'Entrez le prix')}
        min="0"
        step="0.01"
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  ),
  
  'description': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>📝 {t('description', 'Description')}</Form.Label>
      <Form.Control
        as="textarea"
        name="description"
        value={postData.description || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_description', 'Décrivez votre article...')}
        rows={3}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  ),
  
  'etat': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>🔄 {t('condition', 'État')}</Form.Label>
      <Form.Select
        name="etat"
        value={postData.etat || ''}
        onChange={handleChangeInput}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <option value="">{t('select_condition', 'Sélectionnez')}</option>
        <option value="neuf">{t('new', 'Neuf')}</option>
        <option value="tres_bon">{t('very_good', 'Très bon état')}</option>
        <option value="bon">{t('good', 'Bon état')}</option>
        <option value="moyen">{t('average', 'État moyen')}</option>
        <option value="usage">{t('used', 'Usage visible')}</option>
      </Form.Select>
    </Form.Group>
  ),
  
  'marque': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>🏷️ {t('brand', 'Marque')}</Form.Label>
      <Form.Control
        type="text"
        name="marque"
        value={postData.marque || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_brand', 'Entrez la marque')}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  ),
  
  'couleur': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>🎨 {t('color', 'Couleur')}</Form.Label>
      <Form.Control
        type="text"
        name="couleur"
        value={postData.couleur || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_color', 'Entrez la couleur')}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  ),
  
  'taille': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>📏 {t('size', 'Taille')}</Form.Label>
      <Form.Control
        type="text"
        name="taille"
        value={postData.taille || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_size', 'Entrez la taille')}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  ),
  
  'quantite': ({ postData, handleChangeInput, isRTL, t }) => (
    <Form.Group>
      <Form.Label>📦 {t('quantity', 'Quantité')}</Form.Label>
      <Form.Control
        type="number"
        name="quantite"
        value={postData.quantite || ''}
        onChange={handleChangeInput}
        placeholder={t('enter_quantity', 'Entrez la quantité')}
        min="1"
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  )
};

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
  
  // 🎯 1. Verificar si es un campo compartido
  const SharedFieldComponent = sharedFieldComponents[fieldName];
  if (SharedFieldComponent) {
    return (
      <div className="field-renderer">
        <SharedFieldComponent
          postData={postData}
          handleChangeInput={handleChangeInput}
          mainCategory={mainCategory}
          subCategory={subCategory}
          articleType={articleType}
          isRTL={isRTL}
          t={t}
        />
      </div>
    );
  }
  
  // 🎯 2. Determinar qué componente de categoría usar
  const getCategoryComponent = () => {
    if (!mainCategory) return null;
    
    const categoryMap = {
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
      'emploi': EmploiFields
    };
    
    return categoryMap[mainCategory] || null;
  };
  
  const CategoryComponent = getCategoryComponent();
  
  // 🎯 3. Si hay componente de categoría, usarlo
  if (CategoryComponent) {
    try {
      const fieldComponent = (
        <CategoryComponent
        fieldName={fieldName}
          postData={postData}
          handleChangeInput={handleChangeInput}
          subCategory={subCategory}
          articleType={articleType}
          isRTL={isRTL}
        />
      );
      
      // Si el componente devuelve algo, renderizarlo
      if (fieldComponent) {
        return (
          <div className="field-renderer category-specific">
            {fieldComponent}
          </div>
        );
      }
    } catch (error) {
      console.error(`Error rendering field ${fieldName} for ${mainCategory}:`, error);
    }
  }
  
  // 🎯 4. Campo genérico si no se encontró componente específico
  return (
    <div className="field-renderer generic-field">
      <Form.Group>
        <Form.Label className={`fw-bold ${isRTL ? 'text-end d-block' : ''}`}>
          {t(`fields.${fieldName}`, fieldName.replace(/_/g, ' '))}
        </Form.Label>
        <Form.Control
          type="text"
          name={fieldName}
          value={postData[fieldName] || ''}
          onChange={handleChangeInput}
          placeholder={t(`enter_${fieldName}`, `Entrez ${fieldName.replace(/_/g, ' ')}`)}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <Form.Text className="text-muted">
          <small>
            <i className="fas fa-info-circle me-1"></i>
            {t('generic_field', 'Champ générique')}
          </small>
        </Form.Text>
      </Form.Group>
    </div>
  );
};

// 🎯 Propiedades por defecto para seguridad
FieldRenderer.defaultProps = {
  fieldName: '',
  postData: {},
  handleChangeInput: () => {},
  mainCategory: '',
  subCategory: '',
  articleType: '',
  isRTL: false
};

export default FieldRenderer;