import React from 'react';
import { Form } from 'react-bootstrap';

const SuperficieField = ({ 
  postData, 
  handleChangeInput, 
  isRTL, 
  t, 
  name = 'superficie', 
  label = 'surface'
}) => {
  return (
    <Form.Group>
      <Form.Label>📏 {t(label, 'Superficie')} (m²)</Form.Label>
      <Form.Control
        type="number"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        placeholder="Ex: 90"
        min="0"
        step="0.1"
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default SuperficieField;