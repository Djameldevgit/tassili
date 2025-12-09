import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ImmobilierFields = ({ 
  fieldName, 
  postData, 
  handleChangeInput, 
  subCategory,     // Type de bien: 'appartement', 'villa', etc.
  articleType,     // Type d'opération: 'vente', 'location', etc.
  isRTL 
}) => {
  const { t } = useTranslation();
  
  console.log('🏠 ImmobilierFields recibió:', { fieldName, subCategory, articleType });
  
  // 🔥 NUEVO: Lógica de mapeo como VehiculesFields
  const getSubCategorySpecificFields = () => {
    console.log('📋 Llamando getSubCategorySpecificFields con:', { subCategory, articleType });
    
    // Para immobilier, los campos vienen de FieldConfig directamente
    // Pero necesitamos una estructura similar para mantener consistencia
    
    const specificFields = {
      // Campos generales para cualquier tipo de bien
      'general': {
        'superficie': 'superficie',
        'nombrePieces': 'nombrePieces',
        'prix': 'prix',
        'loyer': 'loyer',
        'caution': 'caution',
        'dureeBail': 'dureeBail'
      },
      
      // Campos específicos por tipo de bien (independientemente de articleType)
      'appartement': {
        'etage': 'etage',
        'ascenseur': 'ascenseur',
        'parking': 'parking',
        'meuble': 'meuble',
        'chargesComprises': 'chargesComprises'
      },
      'villa': {
        'jardin': 'jardin',
        'piscine': 'piscine',
        'garage': 'garage',
        'etages': 'etages'
      },
      'terrain': {
        'zonage': 'zonage',
        'viabilise': 'viabilise',
        'pente': 'pente'
      },
      'local': {
        'activiteAutorisee': 'activiteAutorisee',
        'vitrine': 'vitrine'
      },
      'immeuble': {
        'nombreEtages': 'nombreEtages',
        'nombreAppartements': 'nombreAppartements'
      },
      'bungalow': {
        'mobilite': 'mobilite'
      },
      'terrain_agricole': {
        'zonage': 'zonage',
        'viabilise': 'viabilise'
      }
    };
    
    // Combinar campos generales + específicos del tipo de bien
    let result = {};
    
    if (specificFields['general']) {
      result = { ...result, ...specificFields['general'] };
    }
    
    if (subCategory && specificFields[subCategory]) {
      result = { ...result, ...specificFields[subCategory] };
    }
    
    // También considerar campos específicos por articleType si es necesario
    // Por ejemplo, para 'location' siempre mostrar 'loyer', 'caution', 'dureeBail'
    // Para 'vente' siempre mostrar 'prix'
    
    console.log('📋 Campos encontrados para', subCategory, ':', Object.keys(result));
    return result;
  };
  
  // 🔥 TODOS los campos definidos (igual que VehiculesFields)
  const fields = {
    'superficie': (
      <Form.Group key="superficie">
        <Form.Label>📏 {t('surface', 'Superficie')} (m²)</Form.Label>
        <Form.Control
          type="number"
          name="superficie"
          value={postData.superficie || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 90"
          min="0"
          step="0.1"
        />
      </Form.Group>
    ),
    
    'nombrePieces': (
      <Form.Group key="nombrePieces">
        <Form.Label>🚪 {t('rooms', 'Nombre de pièces')}</Form.Label>
        <Form.Control
          type="number"
          name="nombrePieces"
          value={postData.nombrePieces || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 3"
          min="1"
        />
      </Form.Group>
    ),
    
    'prix': (
      <Form.Group key="prix">
        <Form.Label>💰 {t('price', 'Prix')}</Form.Label>
        <Form.Control
          type="number"
          name="prix"
          value={postData.prix || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 250000"
          min="0"
        />
      </Form.Group>
    ),
    
    'loyer': (
      <Form.Group key="loyer">
        <Form.Label>💵 {t('rent', 'Loyer mensuel')}</Form.Label>
        <Form.Control
          type="number"
          name="loyer"
          value={postData.loyer || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 800"
          min="0"
        />
      </Form.Group>
    ),
    
    'caution': (
      <Form.Group key="caution">
        <Form.Label>🔒 {t('deposit', 'Caution')}</Form.Label>
        <Form.Control
          type="number"
          name="caution"
          value={postData.caution || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 800"
          min="0"
        />
      </Form.Group>
    ),
    
    'dureeBail': (
      <Form.Group key="dureeBail">
        <Form.Label>⏱️ {t('lease_duration', 'Durée du bail')}</Form.Label>
        <Form.Select
          name="dureeBail"
          value={postData.dureeBail || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_duration', 'Sélectionnez')}</option>
          <option value="1_an">1 an</option>
          <option value="2_ans">2 ans</option>
          <option value="3_ans">3 ans</option>
          <option value="9_ans">9 ans (bail commercial)</option>
          <option value="vide">Bail vide</option>
          <option value="meuble">Bail meublé</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'etage': (
      <Form.Group key="etage">
        <Form.Label>🏢 {t('floor', 'Étage')}</Form.Label>
        <Form.Select
          name="etage"
          value={postData.etage || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_floor', 'Sélectionnez')}</option>
          <option value="rez_de_chaussee">Rez-de-chaussée</option>
          <option value="1">1er étage</option>
          <option value="2">2ème étage</option>
          <option value="3">3ème étage</option>
          <option value="4">4ème étage</option>
          <option value="5_plus">5ème et plus</option>
          <option value="dernier">Dernier étage</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'ascenseur': (
      <Form.Group key="ascenseur">
        <Form.Label>🛗 {t('elevator', 'Ascenseur')}</Form.Label>
        <Form.Select
          name="ascenseur"
          value={postData.ascenseur || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'parking': (
      <Form.Group key="parking">
        <Form.Label>🅿️ {t('parking', 'Parking')}</Form.Label>
        <Form.Select
          name="parking"
          value={postData.parking || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="inclus">Inclus</option>
          <option value="optionnel">Optionnel</option>
          <option value="non">Non disponible</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'meuble': (
      <Form.Group key="meuble">
        <Form.Label>🛋️ {t('furnished', 'Meublé')}</Form.Label>
        <Form.Select
          name="meuble"
          value={postData.meuble || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
          <option value="partiel">Partiellement</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'jardin': (
      <Form.Group key="jardin">
        <Form.Label>🌳 {t('garden', 'Jardin')}</Form.Label>
        <Form.Select
          name="jardin"
          value={postData.jardin || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'piscine': (
      <Form.Group key="piscine">
        <Form.Label>🏊 {t('pool', 'Piscine')}</Form.Label>
        <Form.Select
          name="piscine"
          value={postData.piscine || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="privee">Privée</option>
          <option value="commune">Communautaire</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'garage': (
      <Form.Group key="garage">
        <Form.Label>🚗 {t('garage', 'Garage')}</Form.Label>
        <Form.Select
          name="garage"
          value={postData.garage || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="simple">Simple</option>
          <option value="double">Double</option>
          <option value="box">Box fermé</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'etages': (
      <Form.Group key="etages">
        <Form.Label>🏘️ {t('floors', 'Nombre d\'étages')}</Form.Label>
        <Form.Control
          type="number"
          name="etages"
          value={postData.etages || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 2"
          min="1"
        />
      </Form.Group>
    ),
    
    'zonage': (
      <Form.Group key="zonage">
        <Form.Label>🗺️ {t('zoning', 'Zonage')}</Form.Label>
        <Form.Select
          name="zonage"
          value={postData.zonage || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_zoning', 'Sélectionnez')}</option>
          <option value="urbain">Urbain</option>
          <option value="agricole">Agricole</option>
          <option value="constructible">Constructible</option>
          <option value="non_constructible">Non constructible</option>
          <option value="industriel">Industriel</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'viabilise': (
      <Form.Group key="viabilise">
        <Form.Label>⚡ {t('utilities', 'Viabilisé')}</Form.Label>
        <Form.Select
          name="viabilise"
          value={postData.viabilise || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui (eau, électricité, assainissement)</option>
          <option value="partiel">Partiellement</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'pente': (
      <Form.Group key="pente">
        <Form.Label>↗️ {t('slope', 'Pente')}</Form.Label>
        <Form.Select
          name="pente"
          value={postData.pente || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_slope', 'Sélectionnez')}</option>
          <option value="plate">Plate</option>
          <option value="legere">Légère pente</option>
          <option value="moyenne">Pente moyenne</option>
          <option value="forte">Forte pente</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'chargesComprises': (
      <Form.Group key="chargesComprises">
        <Form.Label>💡 {t('utilities_included', 'Charges comprises')}</Form.Label>
        <Form.Select
          name="chargesComprises"
          value={postData.chargesComprises || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
          <option value="partiel">Partiellement</option>
        </Form.Select>
      </Form.Group>
    ),
    
    // 🔥 NUEVOS CAMPOS PARA INMOBILIER
    'activiteAutorisee': (
      <Form.Group key="activiteAutorisee">
        <Form.Label>🏢 {t('authorized_activity', 'Activité autorisée')}</Form.Label>
        <Form.Control
          type="text"
          name="activiteAutorisee"
          value={postData.activiteAutorisee || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_activity', 'Ex: Commerce, Bureau, Restaurant...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'vitrine': (
      <Form.Group key="vitrine">
        <Form.Label>🪟 {t('storefront', 'Vitrine')}</Form.Label>
        <Form.Select
          name="vitrine"
          value={postData.vitrine || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_option', 'Sélectionnez')}</option>
          <option value="oui">Oui</option>
          <option value="non">Non</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'nombreEtages': (
      <Form.Group key="nombreEtages">
        <Form.Label>🏢 {t('building_floors', 'Nombre d\'étages du bâtiment')}</Form.Label>
        <Form.Control
          type="number"
          name="nombreEtages"
          value={postData.nombreEtages || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 5"
          min="1"
        />
      </Form.Group>
    ),
    
    'nombreAppartements': (
      <Form.Group key="nombreAppartements">
        <Form.Label>🏠 {t('apartments_count', 'Nombre d\'appartements')}</Form.Label>
        <Form.Control
          type="number"
          name="nombreAppartements"
          value={postData.nombreAppartements || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 10"
          min="1"
        />
      </Form.Group>
    ),
    
    'mobilite': (
      <Form.Group key="mobilite">
        <Form.Label>🚚 {t('mobility', 'Mobilité')}</Form.Label>
        <Form.Select
          name="mobilite"
          value={postData.mobilite || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_mobility', 'Sélectionnez')}</option>
          <option value="mobile">Mobile (sur roues)</option>
          <option value="fixe">Fixe</option>
          <option value="demontable">Démontable</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'capacite': (
      <Form.Group key="capacite">
        <Form.Label>👥 {t('capacity', 'Capacité d\'accueil')}</Form.Label>
        <Form.Control
          type="number"
          name="capacite"
          value={postData.capacite || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 6 personnes"
          min="1"
        />
      </Form.Group>
    ),
    
    'dureeMinimum': (
      <Form.Group key="dureeMinimum">
        <Form.Label>📅 {t('minimum_stay', 'Durée minimum de séjour')}</Form.Label>
        <Form.Select
          name="dureeMinimum"
          value={postData.dureeMinimum || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_minimum_stay', 'Sélectionnez')}</option>
          <option value="1_nuit">1 nuit</option>
          <option value="2_nuits">2 nuits</option>
          <option value="7_nuits">1 semaine</option>
          <option value="30_nuits">1 mois</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'nombreColocataires': (
      <Form.Group key="nombreColocataires">
        <Form.Label>👨‍👩‍👧‍👦 {t('roommates', 'Nombre de colocataires')}</Form.Label>
        <Form.Control
          type="number"
          name="nombreColocataires"
          value={postData.nombreColocataires || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 3"
          min="1"
        />
      </Form.Group>
    ),
    
    'equipements': (
      <Form.Group key="equipements">
        <Form.Label>🏡 {t('equipment', 'Équipements')}</Form.Label>
        <div>
          <Form.Check
            type="checkbox"
            name="equipements_cuisine"
            label={t('kitchen', 'Cuisine équipée')}
            checked={postData.equipements_cuisine || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="equipements_lave_linge"
            label={t('washing_machine', 'Lave-linge')}
            checked={postData.equipements_lave_linge || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="equipements_climatisation"
            label={t('air_conditioning', 'Climatisation')}
            checked={postData.equipements_climatisation || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="equipements_wifi"
            label={t('wifi', 'Wi-Fi')}
            checked={postData.equipements_wifi || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    )
  };
  
  const subCategoryFields = getSubCategorySpecificFields();
  
  console.log('🔍 ImmobilierFields - Estado final:', {
    fieldName,
    subCategory,
    articleType,
    subCategoryFields: Object.keys(subCategoryFields),
    fieldsDisponibles: Object.keys(fields)
  });
  
  // Si fieldName está especificado, devolver ese campo
  if (fieldName) {
    const fieldComponent = fields[fieldName];
    if (!fieldComponent) {
      console.warn(`⚠️ Campo '${fieldName}' no encontrado en ImmobilierFields`);
    }
    return fieldComponent || null;
  }
  
  // Si no hay fieldName específico, devolver todos los campos de la subcategoría
  if (subCategory && Object.keys(subCategoryFields).length > 0) {
    return (
      <>
        {Object.keys(subCategoryFields).map(key => {
          const fieldKey = subCategoryFields[key];
          const fieldComponent = fields[fieldKey];
          
          if (!fieldComponent) {
            console.warn(`⚠️ Campo '${fieldKey}' no encontrado para immobilier`);
            return null;
          }
          
          return (
            <div key={key} className="mb-3">
              {fieldComponent}
            </div>
          );
        })}
      </>
    );
  }
  
  // Si no hay campos para esta subcategoría
  if (subCategory) {
    return (
      <div className="alert alert-info">
        <h6>🏠 {t('real_estate_fields', 'Champs immobiliers')}</h6>
        <p>Les champs spécifiques seront affichés ici.</p>
      </div>
    );
  }
  
  return null;
};

export default ImmobilierFields;