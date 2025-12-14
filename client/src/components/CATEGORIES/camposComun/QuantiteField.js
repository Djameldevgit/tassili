import React from 'react';
import { Form } from 'react-bootstrap';

const QuantiteField = ({ 
  postData, 
  handleChangeInput, 
  isRTL, 
  t, 
  name = 'quantite', 
  label = 'quantity',
  min = 1,
  step = 1
}) => {
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