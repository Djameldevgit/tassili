// FieldRenderer.js - VERSIÓN ULTRA SIMPLIFICADA
import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const FieldRenderer = ({ 
  fieldName, 
  postData, 
  handleChangeInput, 
  mainCategory, 
  subCategory, 
  articleType, 
  isRTL 
}) => {
  
  useEffect(() => {
    console.log(`🎯 FieldRenderer renderizando: ${fieldName} para ${mainCategory}.${subCategory}`);
  }, [fieldName, mainCategory, subCategory]);
  
  // 🔥 CONFIGURACIÓN DIRECTA DE CAMPOS
  const getFieldConfig = () => {
    // Campos comunes para Immobilier
    const immobilierFields = {
      superficie: {
        type: 'number',
        label: 'Superficie',
        placeholder: 'm²',
        suffix: 'm²',
        required: true,
        min: 1
      },
      prix: {
        type: 'number',
        label: 'Prix',
        placeholder: 'Prix en DA',
        suffix: 'DA',
        required: true,
        min: 1
      },
      loyer: {
        type: 'number',
        label: 'Loyer mensuel',
        placeholder: 'Loyer en DA',
        suffix: 'DA/mois',
        required: true,
        min: 1
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: 'Décrivez votre bien...',
        rows: 4
      },
      nombrePieces: {
        type: 'number',
        label: 'Nombre de pièces',
        placeholder: 'Ex: 3',
        min: 1
      },
      etage: {
        type: 'number',
        label: 'Étage',
        placeholder: 'Ex: 2',
        min: 0
      },
      ascenseur: {
        type: 'select',
        label: 'Ascenseur',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' }
        ]
      },
      caution: {
        type: 'number',
        label: 'Caution',
        placeholder: 'Montant de la caution',
        suffix: 'DA'
      },
      jardin: {
        type: 'select',
        label: 'Jardin',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' }
        ]
      },
      piscine: {
        type: 'select',
        label: 'Piscine',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' }
        ]
      },
      garage: {
        type: 'select',
        label: 'Garage',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' }
        ]
      },
      meuble: {
        type: 'select',
        label: 'Meublé',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'oui', label: 'Oui' },
          { value: 'non', label: 'Non' }
        ]
      },
      etages: {
        type: 'number',
        label: "Nombre d'étages",
        placeholder: 'Ex: 2',
        min: 1
      },
      zonage: {
        type: 'select',
        label: 'Zonage',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'urbain', label: 'Urbain' },
          { value: 'agricole', label: 'Agricole' },
          { value: 'industriel', label: 'Industriel' }
        ]
      },
      dureeMinimum: {
        type: 'number',
        label: 'Durée minimum (jours)',
        placeholder: 'Ex: 7',
        suffix: 'jours',
        min: 1
      }
    };
    
    // Campos para otras categorías
    const commonFields = {
      marque: { type: 'text', label: 'Marque', placeholder: 'Marque' },
      modele: { type: 'text', label: 'Modèle', placeholder: 'Modèle' },
      prix: { type: 'number', label: 'Prix', placeholder: 'Prix', suffix: 'DA' },
      annee: { type: 'number', label: 'Année', placeholder: 'Année', min: 1900, max: new Date().getFullYear() },
      kilometrage: { type: 'number', label: 'Kilométrage', placeholder: 'KM', suffix: 'km' },
      carburant: { 
        type: 'select', 
        label: 'Carburant',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'essence', label: 'Essence' },
          { value: 'diesel', label: 'Diesel' },
          { value: 'electrique', label: 'Électrique' }
        ]
      },
      boite: {
        type: 'select',
        label: 'Boîte',
        options: [
          { value: '', label: '-- Sélectionnez --' },
          { value: 'manuelle', label: 'Manuelle' },
          { value: 'automatique', label: 'Automatique' }
        ]
      },
      cylindree: { type: 'number', label: 'Cylindrée', placeholder: 'cm³', suffix: 'cm³' },
      capacite: { type: 'number', label: 'Capacité', placeholder: 'Capacité', suffix: 'kg' }
    };
    
    // Para Immobilier
    if (mainCategory === 'immobilier') {
      return immobilierFields[fieldName] || {
        type: 'text',
        label: fieldName,
        placeholder: `Entrez ${fieldName}`
      };
    }
    
    // Para otras categorías
    return commonFields[fieldName] || {
      type: 'text',
      label: fieldName,
      placeholder: `Entrez ${fieldName}`
    };
  };
  
  const fieldConfig = getFieldConfig();
  const value = postData?.[fieldName] || '';
  
  return (
    <div className="field-renderer">
      <Form.Group>
        <Form.Label className="fw-bold mb-1">
          {fieldConfig.label}
          {fieldConfig.required && <span className="text-danger ms-1">*</span>}
        </Form.Label>
        
        {fieldConfig.type === 'textarea' ? (
          <Form.Control
            as="textarea"
            name={fieldName}
            value={value}
            onChange={handleChangeInput}
            placeholder={fieldConfig.placeholder}
            rows={fieldConfig.rows || 3}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="form-control-sm"
          />
        ) : fieldConfig.type === 'select' ? (
          <Form.Select
            name={fieldName}
            value={value}
            onChange={handleChangeInput}
            dir={isRTL ? 'rtl' : 'ltr'}
            className="form-control-sm"
          >
            {fieldConfig.options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        ) : (
          <div className="position-relative">
            <Form.Control
              type={fieldConfig.type}
              name={fieldName}
              value={value}
              onChange={handleChangeInput}
              placeholder={fieldConfig.placeholder}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="form-control-sm"
              min={fieldConfig.min}
              max={fieldConfig.max}
              step={fieldConfig.step}
              required={fieldConfig.required}
            />
            {fieldConfig.suffix && (
              <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                <small className="text-muted">{fieldConfig.suffix}</small>
              </div>
            )}
          </div>
        )}
        
        {fieldConfig.type === 'number' && (
          <Form.Text className="text-muted">
            <small>
              <i className="fas fa-info-circle me-1"></i>
              {fieldConfig.label.includes('Prix') || fieldConfig.label.includes('Loyer')
                ? 'Montant en Dinars algériens'
                : 'Entrez une valeur numérique'}
            </small>
          </Form.Text>
        )}
      </Form.Group>
    </div>
  );
};

export default FieldRenderer;