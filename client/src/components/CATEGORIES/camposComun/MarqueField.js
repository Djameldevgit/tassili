// 📁 MarqueField.js - VERSIÓN SIMPLIFICADA Y FUNCIONAL
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

const MarqueField = ({ 
  mainCategory,         // ← NUEVO: categoría principal (ej: 'telephones')
  subCategory,         // ← NUEVO: subcategoría (ej: 'smartphones')
  fieldName = 'marque',
  postData, 
  handleChangeInput,
  isRTL,
  t
}) => {
  const [filteredBrands, setFilteredBrands] = useState([]);

  console.log('🔍 MarqueField recibió:', {
    mainCategory,
    subCategory,
    fieldName,
    'postData[marque]': postData?.marque
  });
 
  // 🔥 BASE DE DATOS SIMPLIFICADA
  const BRANDS_DATABASE = {
    'telephones': {
      'smartphones': [
        'Apple iPhone', 'Samsung Galaxy', 'Xiaomi', 'Huawei', 'Oppo', 
        'Realme', 'OnePlus', 'Vivo', 'Google Pixel', 'Nokia', 'Sony'
      ],
      'tablettes': [
        'Apple iPad', 'Samsung Galaxy Tab', 'Huawei MatePad', 'Lenovo Tab',
        'Amazon Fire', 'Xiaomi Pad'
      ],
      'smartwatchs': [
        'Apple Watch', 'Samsung Galaxy Watch', 'Xiaomi', 'Huawei', 'Fitbit',
        'Garmin', 'Amazfit'
      ]
    },
    'vehicules': {
      'automobiles': [
        'Toyota', 'Renault', 'Peugeot', 'Mercedes', 'BMW', 'Audi', 'Volkswagen'
      ],
      'motos': [
        'Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'Ducati'
      ]
    },
    'electromenager': {
      'televiseurs': [
        'Samsung', 'LG', 'Sony', 'Panasonic', 'TCL'
      ],
      'refrigerateurs': [
        'LG', 'Samsung', 'Whirlpool', 'Bosch', 'Brandt'
      ]
    }
    // Agrega más categorías según necesites
  };

  // 🔄 Cargar marcas cuando cambia la categoría
  useEffect(() => {
    if (!mainCategory) {
      console.log('⚠️ MarqueField: No hay mainCategory');
      setFilteredBrands([]);
      return;
    }

    console.log(`🔍 MarqueField buscando: ${mainCategory}.${subCategory}`);

    // Buscar marcas en la base de datos
    const categoryBrands = BRANDS_DATABASE[mainCategory];
    
    if (!categoryBrands) {
      console.log(`❌ Categoría '${mainCategory}' no encontrada en BRANDS_DATABASE`);
      setFilteredBrands([]);
      return;
    }

    // Si hay subcategoría específica
    if (subCategory && categoryBrands[subCategory]) {
      console.log(`✅ Encontradas marcas para ${mainCategory}.${subCategory}`);
      setFilteredBrands(categoryBrands[subCategory]);
    } 
    // Si no, usar categoría general
    else if (categoryBrands.default) {
      console.log(`ℹ️ Usando marcas 'default' para ${mainCategory}`);
      setFilteredBrands(categoryBrands.default);
    } 
    // Si no hay nada
    else {
      console.log(`⚠️ No hay marcas para ${mainCategory}`);
      setFilteredBrands([]);
    }
  }, [mainCategory, subCategory]);

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        🏷️ {t?.('brand', 'Marque')} 
        {mainCategory && (
          <small className="text-muted ms-2">
            ({filteredBrands.length} options)
          </small>
        )}
      </Form.Label>
      
      {filteredBrands.length > 0 ? (
        <>
          <Form.Select
            name={fieldName}
            value={postData[fieldName] || ''}
            onChange={handleChangeInput}
            required
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t?.('select_brand', 'Sélectionnez une marque')}</option>
            
            {filteredBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
            
            <option value="autre">{t?.('other_brand', 'Autre')}</option>
          </Form.Select>
          
          <Form.Text className="text-muted">
            <small>
              Catégorie: {mainCategory} {subCategory && `→ ${subCategory}`}
            </small>
          </Form.Text>
        </>
      ) : (
        <>
          <Form.Control
            type="text"
            name={fieldName}
            value={postData[fieldName] || ''}
            onChange={handleChangeInput}
            placeholder={t?.('enter_brand', 'Entrez la marque')}
            required
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Form.Text className="text-muted">
            <small>
              Saisissez manuellement la marque
            </small>
          </Form.Text>
        </>
      )}
      
      {/* Campo para "otra" marca */}
      {postData[fieldName] === 'autre' && (
        <Form.Control
          type="text"
          name={`${fieldName}_custom`}
          value={postData[`${fieldName}_custom`] || ''}
          onChange={handleChangeInput}
          placeholder={t?.('specify_brand', 'Précisez la marque')}
          className="mt-2"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      )}
    </Form.Group>
  );
};

export default MarqueField;