// MarqueModelField.jsx - Para marcas y modelos (vehículos, teléfonos, etc.)
import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MarqueModelField = ({ postData, handleChangeInput, category, isRTL }) => {
  const { t } = useTranslation();

  // Marcas según categoría
  const marquesByCategory = {
    'automobiles': ['Renault', 'Peugeot', 'Citroën', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda', 'Hyundai', 'Kia', 'Dacia'],
    'telephones': ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Oppo', 'OnePlus', 'Google', 'Nokia', 'Motorola'],
    'informatique': ['Dell', 'HP', 'Lenovo', 'Apple', 'Asus', 'Acer', 'MSI', 'Razer'],
    'electromenager': ['Samsung', 'LG', 'Whirlpool', 'Bosch', 'Electrolux', 'Philips', 'Tefal']
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className={isRTL ? 'text-end d-block' : ''}>
          🏷️ {t('brand', 'Marque')}
        </Form.Label>
        <Form.Select
          name="marque"
          value={postData.marque || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_brand', 'Sélectionnez la marque')}</option>
          {marquesByCategory[category]?.map(marque => (
            <option key={marque} value={marque.toLowerCase()}>{marque}</option>
          ))}
          <option value="autre">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>

      {postData.marque && (
        <Form.Group className="mb-3">
          <Form.Label className={isRTL ? 'text-end d-block' : ''}>
            🔤 {t('model', 'Modèle')}
          </Form.Label>
          <Form.Control
            type="text"
            name="modele"
            value={postData.modele || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_model', 'Ex: Clio, iPhone 13, Galaxy S21...')}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        </Form.Group>
      )}
    </>
  );
};

export default MarqueModelField;