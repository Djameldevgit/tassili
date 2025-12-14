import React, { useMemo } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const EtatField = ({ 
  selectedCategory,
  postData, 
  handleChangeInput,
  name = 'etat',
  label = 'État'
}) => {
  const { t } = useTranslation();
  
  // 📊 OPCIONES DE ESTADO POR CATEGORÍA
  const conditionOptions = useMemo(() => {
    const options = {
      // 🏠 INMUEBLES
      immobilier: ['Neuf', 'Excellent', 'Très bon', 'Bon', 'À rénover'],
      
      // 🚗 VEHÍCULOS
      automobiles: ['Neuf', 'Très bon état', 'Bon état', 'État moyen', 'À réparer'],
      
      // 📱 ELECTRÓNICA
      electromenager: ['Neuf', 'Très bon état', 'Bon état', 'Fonctionnel', 'À réparer'],
      informatique: ['Neuf', 'Très bon état', 'Bon état', 'Fonctionnel', 'Pour pièces'],
      telephones: ['Neuf', 'Très bon état', 'Bon état', 'État correct', 'Écran cassé'],
      
      // 👕 ROPA
      vetements: ['Neuf avec étiquette', 'Neuf sans étiquette', 'Très bon état', 'Bon état'],
      
      // 📚 GENERAL
      default: ['Neuf', 'Très bon état', 'Bon état', 'État moyen', 'Usage visible']
    };
    
    return options[selectedCategory] || options.default;
  }, [selectedCategory]);
  
  return (
    <Form.Group className="mt-3">
      <Form.Label>🏷️ {t(label)}</Form.Label>
      
      <Form.Select
        name={name}
        value={postData[name] || ''}
        onChange={handleChangeInput}
        required
      >
        <option value="">{t('select_condition', 'Sélectionnez l\'état')}</option>
        {conditionOptions.map((condition) => (
          <option key={condition} value={condition}>{condition}</option>
        ))}
      </Form.Select>
      
      <Form.Text className="text-muted">
        <small>
          {selectedCategory === 'automobiles' && 'État général du véhicule'}
          {selectedCategory === 'immobilier' && 'État du bien immobilier'}
          {selectedCategory === 'telephones' && 'État de l\'appareil'}
        </small>
      </Form.Text>
    </Form.Group>
  );
};

export default EtatField;