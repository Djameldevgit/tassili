import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const PrixField = ({ 
  selectedCategory,
  postData, 
  handleChangeInput,
  name = 'prix',
  label = 'Prix',
  showCurrency = true,
  currency = 'DA'
}) => {
  const { t } = useTranslation();
  
  // 🏷️ DETERMINAR MONEDA BASADA EN CATEGORÍA
  const getCurrencyForCategory = () => {
    if (currency) return currency;
    
    const categoryCurrencyMap = {
      'voyages': 'EURO',
      'immobilier': 'DA',
      'automobiles': 'DA',
      'electromenager': 'DA',
      'informatique': 'DA',
      'telephones': 'DA',
      'vetements': 'DA',
      'default': 'DA'
    };
    
    return categoryCurrencyMap[selectedCategory] || categoryCurrencyMap.default;
  };
  
  const currentCurrency = getCurrencyForCategory();
  
  return (
    <Form.Group className="mt-3">
      <Form.Label>💰 {t(label)}</Form.Label>
      
      <Row>
        <Col xs={showCurrency ? 8 : 12}>
          <Form.Control
            type="number"
            name={name}
            value={postData[name] || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_price', 'Ex: 150000')}
            min="0"
            step="0.01"
          />
        </Col>
        
        {showCurrency && (
          <Col xs={4}>
            <Form.Select
              name={`${name}Currency`}
              value={postData[`${name}Currency`] || currentCurrency}
              onChange={handleChangeInput}
            >
              <option value="DA">DA</option>
              <option value="EURO">€</option>
              <option value="USD">$</option>
            </Form.Select>
          </Col>
        )}
      </Row>
      
      <Form.Text className="text-muted">
        <small>
          {currentCurrency === 'EURO' ? 'Prix en euros' : 'Prix en dinars algériens'}
          {selectedCategory === 'voyages' && ' (pour une personne)'}
          {selectedCategory === 'immobilier' && ' (prix total)'}
        </small>
      </Form.Text>
    </Form.Group>
  );
};

export default PrixField;