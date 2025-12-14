import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const CommuneField = ({ 
  postData, 
  handleChangeInput, 
  isRTL, 
  t, 
  name = 'commune', 
  label = 'commune',
  wilayaField = 'wilaya'
}) => {
  const [communes, setCommunes] = useState([]);
  
  // Simulación de datos - en producción sería API
  useEffect(() => {
    if (postData[wilayaField]) {
      const communesByWilaya = {
        '16': ['Alger-Centre', 'Hussein Dey', 'Sidi M\'hamed', 'El Madania', 'El Harrach'],
        '31': ['Oran', 'Es-Senia', 'Bir El Djir', 'El Ancor', 'Oued Tlelat'],
        '25': ['Constantine', 'El Khroub', 'Ain Smara', 'Zighoud Youcef', 'Didouche Mourad'],
        '19': ['Sétif', 'El Eulma', 'Ain Arnat', 'Ain Abessa', 'Bougaâ'],
      };
      
      setCommunes(communesByWilaya[postData[wilayaField]] || []);
    } else {
      setCommunes([]);
    }
  }, [postData[wilayaField], wilayaField]);
  
  return (
    <Form.Group>
      <Form.Label>🏘️ {t(label, 'Commune')}</Form.Label>
      <Form.Select
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        dir={isRTL ? 'rtl' : 'ltr'}
        disabled={!postData[wilayaField]}
      >
        <option value="">{t('select_commune', 'Sélectionnez une commune')}</option>
        {communes.map(commune => (
          <option key={commune} value={commune}>
            {commune}
          </option>
        ))}
      </Form.Select>
      {!postData[wilayaField] && (
        <Form.Text className="text-muted">
          {t('select_wilaya_first', 'Sélectionnez d\'abord une wilaya')}
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default CommuneField;