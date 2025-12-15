import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
const QuantiteField = ({ 
  postData, 
  handleChangeInput, 
  isRTL, 
 
  name = 'quantite', 
  label = 'quantity',
  min = 1,
  step = 1
}) => {  const { t } = useTranslation();
  return (
    <Form.Group>
      <Form.Label>📦 {t(label, 'Quantité')}</Form.Label>
      <Form.Control
        type="number"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        placeholder={t(`enter_${label}`, 'Entrez la quantité')}
        min={min}
        step={step}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default QuantiteField;