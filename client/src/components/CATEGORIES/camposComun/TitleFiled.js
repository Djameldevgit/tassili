import React from 'react';
import { Form } from 'react-bootstrap';

const TitleField = ({ 
  postData, 
  handleChangeInput, 
  isRTL, 
  t, 
  name = 'title', 
  label = 'size'
}) => {
  return (
    <Form.Group>
      <Form.Label>📏 {t(label, 'Taille')}</Form.Label>
      <Form.Control
        type="text"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        placeholder={t(`enter_${label}`, 'Entrez la taille')}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default TitleField;