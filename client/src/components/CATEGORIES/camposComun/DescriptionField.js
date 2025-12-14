import React from 'react';
import { Form } from 'react-bootstrap';

const DescriptionField = ({ postData, handleChangeInput, isRTL,  name = 'description', label = 'description', rows = 3 }) => {
  return (
    <Form.Group>
      <Form.Label>📝  Description</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
       
        rows={rows}
        dir={isRTL ? 'rtl' : 'ltr'}
      />
    </Form.Group>
  );
};

export default DescriptionField;