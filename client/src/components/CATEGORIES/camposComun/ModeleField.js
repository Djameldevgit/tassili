// camposComun/ModeleField.js - CON SINCRONIZACIÓN
import React, { useState, useEffect } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModeleField = ({ 
  selectedCategory,
  selectedSubCategory,
  selectedBrand, // ← Esto viene de postData.marque via FieldRenderer
  postData, 
  handleChangeInput,
  name = 'modele',
  label = 'model',
  isRTL
}) => {
  const { t } = useTranslation('camposcomunes');
  const [filteredModels, setFilteredModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 📦 BASE DE DATOS DE MODELOS (simplificada - igual que tu código)
  const allModelsByCategoryAndBrand = {
    'vehicules': {
      'automobiles': {
        'Toyota': ['Corolla', 'Yaris', 'RAV4', 'Hilux', 'Land Cruiser Prado', 'Camry', 'C-HR', 'Prius', 'Auris', 'Avensis'],
        'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Talisman', 'Duster', 'Kangoo', 'Twingo', 'Scénic', 'Espace'],
        'Peugeot': ['208', '308', '3008', '5008', 'Partner', '2008', '508', '3008', 'Rifter', 'Expert'],
        'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'GLC', 'GLE', 'Classe B', 'Classe G', 'Vito', 'Sprinter'],
        'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5', 'X6', 'Série 7', 'Z4', 'i8'],
        'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Kona', 'Elantra', 'Accent', 'Getz'],
        'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Stonic', 'Niro', 'Seltos', 'Carnival'],
        'Dacia': ['Sandero', 'Logan', 'Duster', 'Lodgy', 'Spring', 'Jogger'],
        'Citroën': ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C-Elysée', 'DS3', 'DS4', 'Jumpy'],
        'Ford': ['Fiesta', 'Focus', 'Kuga', 'Puma', 'EcoSport', 'Mondeo', 'Transit', 'Ranger']
      },
      'motos': {
        'Honda': ['CBR600RR', 'CBR1000RR', 'CB500F', 'CB650R', 'Africa Twin', 'Gold Wing', 'CRF250L', 'SH300i'],
        'Yamaha': ['YZF-R1', 'YZF-R6', 'MT-07', 'MT-09', 'XMAX 300', 'Ténéré 700', 'WR250R', 'NMAX'],
        'Suzuki': ['GSX-R1000', 'GSX-R750', 'V-Strom 650', 'Burgman 400', 'Hayabusa', 'SV650', 'DR-Z400'],
        'Kawasaki': ['Ninja ZX-10R', 'Ninja 650', 'Z900', 'Versys 650', 'KLX250', 'Vulcan S', 'Ninja 400'],
        'BMW Motorrad': ['R 1250 GS', 'S 1000 RR', 'F 850 GS', 'R nineT', 'C 400 X', 'K 1600 GTL']
      },
      'utilitaires': {
        'Mercedes-Benz': ['Sprinter', 'Vito', 'Citan', 'Actros', 'Atego'],
        'Renault': ['Master', 'Trafic', 'Kangoo', 'Alaskan'],
        'Ford': ['Transit', 'Ranger', 'Transit Custom', 'F-MAX'],
        'Fiat': ['Ducato', 'Doblò', 'Talento', 'Fullback'],
        'Peugeot': ['Boxer', 'Partner', 'Expert', 'Landtrek']
      },
      'camions': {
        'Mercedes-Benz': ['Actros', 'Arocs', 'Antos', 'Atego'],
        'Volvo': ['FH', 'FM', 'FE', 'FL'],
        'Scania': ['R-series', 'S-series', 'G-series', 'P-series'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Iveco': ['Stralis', 'Trakker', 'Eurocargo', 'Daily']
      }
    },
    'telephones': {
      'smartphones': {
        'Samsung': [
          'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy A54', 'Galaxy A34',
          'Galaxy Z Flip5', 'Galaxy Z Fold5', 'Galaxy Note 20', 'Galaxy S21 FE'
        ],
        'Apple': [
          'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max',
          'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone SE (3rd gen)'
        ],
        'Xiaomi': [
          'Redmi Note 12 Pro', 'Redmi Note 12', 'Xiaomi 13 Pro', 'Xiaomi 13',
          'Poco X5 Pro', 'Poco F5', 'Redmi 12C', 'Mi 11 Lite'
        ],
        'Oppo': [
          'Reno 8 Pro', 'Reno 8', 'Find X5 Pro', 'Find X5', 'A96', 'A77', 'A57'
        ],
        'Huawei': [
          'P50 Pro', 'Mate 50 Pro', 'Nova 10 Pro', 'P40 Lite', 'Y9a', 'Enjoy 20e'
        ],
        'Condor': [
          'Plume L5', 'Plume P8 Pro', 'Plume P8', 'Griffe G6', 'Allure A9',
          'Infinity F1', 'Phoenix P1'
        ]
      }
    }
    // ... resto de tu código de modelos existente
  };
  
  // 🔄 SINCRONIZACIÓN: Cuando cambia la marca, buscar modelos
  useEffect(() => {
    if (!selectedCategory || !selectedBrand) {
      setFilteredModels([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simular carga
    const timer = setTimeout(() => {
      try {
        const categoryData = allModelsByCategoryAndBrand[selectedCategory];
        if (!categoryData) {
          setFilteredModels([]);
          return;
        }
        
        let models = [];
        
        // Buscar en subcategoría específica
        if (selectedSubCategory && categoryData[selectedSubCategory]) {
          models = categoryData[selectedSubCategory][selectedBrand] || [];
        }
        
        // Si no hay, buscar en toda la categoría
        if (models.length === 0) {
          Object.values(categoryData).forEach(subCatData => {
            if (subCatData[selectedBrand]) {
              models = [...models, ...subCatData[selectedBrand]];
            }
          });
          models = [...new Set(models)]; // Eliminar duplicados
        }
        
        setFilteredModels(models);
        
        // Seleccionar automáticamente si solo hay un modelo
        if (models.length === 1 && !postData[name]) {
          handleChangeInput({
            target: { name, value: models[0] }
          });
        }
        
      } catch (error) {
        console.error('❌ Error cargando modelos:', error);
        setFilteredModels([]);
      } finally {
        setIsLoading(false);
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubCategory, selectedBrand, name, postData[name], handleChangeInput]);
  
  return (
    <Form.Group className="mt-3" dir={isRTL ? 'rtl' : 'ltr'}>
      <Form.Label>
        🛠️ {t(label)}
        <span className="text-danger ms-1">*</span>
      </Form.Label>
      
      {/* Mensaje si no hay marca */}
      {!selectedBrand ? (
        <Alert variant="warning" className="py-2 mb-2">
          <small>
            <i className="bi bi-info-circle me-2"></i>
            {t('select_brand_first')}
          </small>
        </Alert>
      ) : null}
      
      {/* Mostrar marca seleccionada */}
      {selectedBrand && (
        <div className="mb-2">
          <small className="text-muted">
            <i className="bi bi-tag me-1"></i>
            {t('selected_brand')}: <strong>{selectedBrand}</strong>
          </small>
        </div>
      )}
      
      {/* Select de modelos */}
      {selectedBrand ? (
        isLoading ? (
          <div className="text-center py-2">
            <Spinner animation="border" size="sm" className="me-2" />
            <small>{t('loading_models')}</small>
          </div>
        ) : filteredModels.length > 0 ? (
          <>
            <Form.Select
              name={name}
              value={postData[name] || ''}
              onChange={handleChangeInput}
              disabled={isLoading}
              dir={isRTL ? 'rtl' : 'ltr'}
              className={isRTL ? 'text-end' : 'text-start'}
            >
              <option value="">{t('select_model')}</option>
              
              {/* Grupos si hay muchos modelos */}
              {filteredModels.length > 15 ? (
                <>
                  <optgroup label={t('popular_models')}>
                    {filteredModels.slice(0, 8).map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </optgroup>
                  <optgroup label={t('all_models')}>
                    {filteredModels.slice(8).map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </optgroup>
                </>
              ) : (
                filteredModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))
              )}
              
              <option value="autre">{t('other_model')}</option>
            </Form.Select>
            
            <Form.Text className="text-muted">
              <small>
                {t('models_available', { count: filteredModels.length })}
              </small>
            </Form.Text>
          </>
        ) : (
          <Form.Control
            type="text"
            name={name}
            value={postData[name] || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_model_manually')}
            disabled={isLoading}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        )
      ) : (
        <Form.Control
          type="text"
          name={name}
          value={postData[name] || ''}
          onChange={handleChangeInput}
          placeholder={t('select_brand_first')}
          disabled
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      )}
      
      {/* Campo para "otro" modelo */}
      {postData[name] === 'autre' && (
        <div className="mt-2">
          <Form.Label className="text-primary">
            ✏️ {t('model_custom')}
          </Form.Label>
          <Form.Control
            type="text"
            name={`${name}_custom`}
            value={postData[`${name}_custom`] || ''}
            onChange={handleChangeInput}
            placeholder={t('specify_model')}
            dir={isRTL ? 'rtl' : 'ltr'}
            required={postData[name] === 'autre'}
          />
          <Form.Text className="text-info">
            <small>{t('hints.model_not_listed')}</small>
          </Form.Text>
        </div>
      )}
      
      {/* Validación */}
      {!postData[name] && selectedBrand && (
        <Form.Text className="text-danger">
          <small>{t('validation.model_required')}</small>
        </Form.Text>
      )}
      
      {postData[name] === 'autre' && !postData[`${name}_custom`] && (
        <Form.Text className="text-danger">
          <small>{t('validation.custom_model_required')}</small>
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default ModeleField;