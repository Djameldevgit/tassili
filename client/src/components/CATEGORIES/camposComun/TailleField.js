import React, { useMemo } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TailleField = ({ 
  selectedCategory,
  selectedSubCategory,
  postData, 
  handleChangeInput,
  name = 'taille',
  label = 'Taille'
}) => {
  const { t } = useTranslation();
  
  // 📏 OPCIONES DE TALLA POR CATEGORÍA
  const sizeOptions = useMemo(() => {
    const options = {
      // 👕 ROPA
      vetements: {
        vetements_homme: ['X', 'S', 'M', 'L', 'XL', 'XXL', '3XL'],
        chaussures_homme: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
        default: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      },
      
      // 📺 ELECTRÓNICA
      electromenager: {
        televiseurs: ['32', '43', '50', '55', '65', '75', '85'],
        refrigerateurs_congelateurs: ['Petit (< 200L)', 'Moyen (200-400L)', 'Grand (> 400L)'],
        machines_laver: ['6kg', '7kg', '8kg', '9kg', '10kg', '12kg'],
        default: ['Petit', 'Moyen', 'Grand']
      },
      
      // 💻 INFORMÁTICA
      informatique: {
        ecrans: ['15', '17', '19', '21', '24', '27', '32'],
        default: ['Standard', 'Grand']
      },
      
      // 🚗 VEHÍCULOS
      automobiles: {
        voitures: ['Petite', 'Compacte', 'Berline', 'SUV', 'Monospace'],
        motos: ['125cc', '250cc', '500cc', '750cc', '1000cc'],
        default: ['Standard']
      }
    };
    
    const categoryData = options[selectedCategory];
    if (!categoryData) return [];
    
    if (selectedSubCategory && categoryData[selectedSubCategory]) {
      return categoryData[selectedSubCategory];
    }
    
    return categoryData.default || [];
  }, [selectedCategory, selectedSubCategory]);
  
  return (
    <Form.Group className="mt-3">
      <Form.Label>📏 {t(label)}</Form.Label>
      
      {sizeOptions.length > 0 ? (
        <Form.Select
          name={name}
          value={postData[name] || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_size', 'Sélectionnez la taille')}</option>
          {sizeOptions.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
          <option value="autre">{t('other_size', 'Autre taille')}</option>
        </Form.Select>
      ) : (
        <Row>
          <Col>
            <Form.Control
              type="number"
              name={name}
              value={postData[name] || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_size', 'Ex: 42, 1.75, etc.')}
              min="0"
              step="0.01"
            />
          </Col>
          <Col xs="auto">
            <Form.Select
              name={`${name}Unit`}
              value={postData[`${name}Unit`] || 'cm'}
              onChange={handleChangeInput}
              style={{ width: '100px' }}
            >
              <option value="cm">cm</option>
              <option value="m">m</option>
              <option value="pouces">"</option>
              <option value="litres">L</option>
              <option value="kg">kg</option>
            </Form.Select>
          </Col>
        </Row>
      )}
      
      {postData[name] === 'autre' && (
        <Form.Control
          type="text"
          name={`${name}_custom`}
          value={postData[`${name}_custom`] || ''}
          onChange={handleChangeInput}
          placeholder={t('specify_size', 'Précisez la taille')}
          className="mt-2"
        />
      )}
    </Form.Group>
  );
};

export default TailleField;