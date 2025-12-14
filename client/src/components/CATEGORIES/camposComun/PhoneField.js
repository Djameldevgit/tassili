import React from 'react';
import { Form } from 'react-bootstrap';

const PhoneField = ({ postData, handleChangeInput, isRTL, t, name = 'contactPhone', label = 'contact_phone' }) => {
 
  return (
    <Form.Group>
      <Form.Label>📞 {t(label, 'Téléphone de contacttttt')}</Form.Label>
      <Form.Control
        type="tel"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        placeholder={t(`enter_${label}`, 'Ex: 0550123456')}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default PhoneField;
  