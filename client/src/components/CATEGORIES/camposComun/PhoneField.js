import React from 'react';
import { Form } from 'react-bootstrap';

const PhoneField = ({ postData, handleChangeInput, isRTL,  name = 'contactPhone', label = 'contact_phone' }) => {
 
  return (
    <Form.Group>
      <Form.Label>📞 Numero Telephone</Form.Label>
      <Form.Control
        type="tel"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        placeholder="Telephone"
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default PhoneField;
  