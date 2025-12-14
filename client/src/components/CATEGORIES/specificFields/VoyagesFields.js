// VoyagesFields.js - VERSIÓN ACTUALIZADA CON CAMPOS COMUNES
import React from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import DescriptionField from '../camposComun/DescriptionField';
import PhoneField from '../camposComun/PhoneField';
import PrixField from '../camposComun/PrixField';
 
 
 
const VoyagesFields = ({ fieldName, postData, handleChangeInput, subCategory, articleType, isRTL  }) => {
  const { t } = useTranslation();
  
  console.log('✈️ VoyagesFields recibió:', { 
    fieldName, 
    subCategory, 
    articleType,
    postData
  });
  
  // Determinar qué campos mostrar
  const getFieldsToShow = () => {
    const commonFields = ['pricePerPerson', 'contactPhone', 'description'];
    
    const specificFields = {
      'voyage_organise': [
        'typeVoyage',
        'destinationType',
        'destinationLocation',
        'startDate',
        'endDate',
        'servicesIncluded',
        ...(postData.destinationType === 'local' ? ['destinationWilaya'] : []),
        ...(postData.destinationType === 'international' ? ['destinationCountry'] : [])
      ],
      
      'location_vacances': [
        'typeHebergement',
        'wilayaLocation',
        'communeLocation',
        'capacity',
        'equipments',
        'startDateLocation',
        'endDateLocation',
        'pricePerNight'
      ],
      
      'hajj_omra': [
        'typeVoyageReligieux',
        'hajjPeriod',
        'packageType',
        'servicesIncludedHajj',
        'pricePerPersonHajj'
      ],
      
      'reservations_visa': [
        'typeServiceVisa',
        'destinationCountry',
        'visaType',
        'processingTime',
        'urgentService',
        'priceVisa'
      ],
      
      'sejour': [
        'typeSejour',
        'regionSejour',
        'durationSejour',
        'activities',
        'priceSejour'
      ],
      
      'croisiere': [
        'cruiseCompany',
        'departurePort',
        'destinationCruise',
        'durationCruise',
        'cabinType',
        'priceCruise'
      ],
      
      'autre': [
        'descriptionSpecifique',
        'serviceType',
        'price'
      ]
    };
    
    const fieldsForSubCategory = specificFields[subCategory] || [];
    return [...new Set([...commonFields, ...fieldsForSubCategory])];
  };
  
  // 🔥 DICCIONARIO SIMPLIFICADO (solo campos ESPECÍFICOS de voyages)
  const fields = {
    // Campos específicos de voyages
    'destinationType': (
      <Form.Group key="destinationType">
        <Form.Label>📍 {t('destination_type', 'Type de destination')}</Form.Label>
        <Form.Select
          name="destinationType"
          value={postData.destinationType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_destination_type', 'Sélectionnez')}</option>
          <option value="local">{t('local_trip', 'Voyage local')}</option>
          <option value="international">{t('international_trip', 'Voyage international')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationWilaya': (
      <Form.Group key="destinationWilaya">
        <Form.Label>🏙️ {t('wilaya_destination', 'Wilaya de destination')}</Form.Label>
        <Form.Control
          type="text"
          name="destinationWilaya"
          value={postData.destinationWilaya || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_wilaya', 'Ex: Alger, Oran...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'destinationCountry': (
      <Form.Group key="destinationCountry">
        <Form.Label>🌍 {t('country_destination', 'Pays de destination')}</Form.Label>
        <Form.Control
          type="text"
          name="destinationCountry"
          value={postData.destinationCountry || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_country', 'Ex: France, Turquie...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'destinationLocation': (
      <Form.Group key="destinationLocation">
        <Form.Label>🗺️ {t('destination_location', 'Lieu de destination')}</Form.Label>
        <Form.Control
          type="text"
          name="destinationLocation"
          value={postData.destinationLocation || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_destination', 'Ex: Paris, Istanbul...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeVoyage': (
      <Form.Group key="typeVoyage">
        <Form.Label>🎯 {t('trip_type', 'Type de voyage')}</Form.Label>
        <Form.Select
          name="typeVoyage"
          value={postData.typeVoyage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_trip_type', 'Sélectionnez')}</option>
          <option value="culturel">Voyage culturel</option>
          <option value="plage">Voyage plage</option>
          <option value="montagne">Voyage montagne</option>
          <option value="aventure">Voyage aventure</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeHebergement': (
      <Form.Group key="typeHebergement">
        <Form.Label>🏠 {t('accommodation_type', "Type d'hébergement")}</Form.Label>
        <Form.Select
          name="typeHebergement"
          value={postData.typeHebergement || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_accommodation', 'Sélectionnez')}</option>
          <option value="appartement">Appartement</option>
          <option value="villa">Villa</option>
          <option value="hotel">Hôtel</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'wilayaLocation': (
      <Form.Group key="wilayaLocation">
        <Form.Label>📍 {t('wilaya', 'Wilaya')}</Form.Label>
        <Form.Control
          type="text"
          name="wilayaLocation"
          value={postData.wilayaLocation || ''}
          onChange={handleChangeInput}
          placeholder="Ex: Alger"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'communeLocation': (
      <Form.Group key="communeLocation">
        <Form.Label>🏘️ {t('commune', 'Commune')}</Form.Label>
        <Form.Control
          type="text"
          name="communeLocation"
          value={postData.communeLocation || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_commune', 'Ex: Alger-Centre...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'capacity': (
      <Form.Group key="capacity">
        <Form.Label>👥 {t('capacity', 'Capacité (personnes)')}</Form.Label>
        <Form.Control
          type="number"
          name="capacity"
          value={postData.capacity || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 4"
          min="1"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'pricePerNight': (
      <Form.Group key="pricePerNight">
        <Form.Label>🌙 {t('price_per_night', 'Prix par nuit')}</Form.Label>
        <Form.Control
          type="number"
          name="pricePerNight"
          value={postData.pricePerNight || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 10000"
          min="0"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    // 🔥 CAMPOS QUE USAN COMPONENTES COMUNES (PERO CON NOMBRES DIFERENTES)
    'pricePerPerson': (
      <PrixField
        key="pricePerPerson"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="pricePerPerson"
        label="price_per_person"
      />
    ),
    
    'priceVisa': (
      <PrixField
        key="priceVisa"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="priceVisa"
        label="visa_price"
      />
    ),
    
    'priceSejour': (
      <PrixField
        key="priceSejour"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="priceSejour"
        label="stay_price"
      />
    ),
    
    'priceCruise': (
      <PrixField
        key="priceCruise"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="priceCruise"
        label="cruise_price"
      />
    ),
    
    'price': (
      <PrixField
        key="price"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="price"
        label="price"
      />
    ),
    'typeVoyageReligieux': (
      <Form.Group key="destinationCountry">
        <Form.Label>🌍 {t('country_destination', 'Pays de destination')}</Form.Label>
        <Form.Control
          type="text"
          name="destinationCountry"
          value={postData.destinationCountry || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_country', 'Ex: France, Turquie...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    'contactPhone': (
      <PhoneField
        key="contactPhone"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="contactPhone"
        label="contact_phone"
      />
    ),
    
    'description': (
      <DescriptionField
        key="description"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="description"
        label="description"
        rows={3}
      />
    ),
    
    'descriptionSpecifique': (
      <DescriptionField
        key="descriptionSpecifique"
        postData={postData}
        handleChangeInput={handleChangeInput}
        isRTL={isRTL}
        t={t}
        name="descriptionSpecifique"
        label="specific_description"
        rows={2}
      />
    ),
   
  };
  
  // 🔥 FUNCIÓN PARA RENDERIZAR CAMPOS ESPECIALES (DINÁMICOS)
  const renderSpecialField = (fieldKey) => {
    // Campos que necesitan lógica especial
    const specialFields = {
      'servicesIncluded': () => (
        <Form.Group key="servicesIncluded">
          <Form.Label>✅ {t('included_services', 'Services inclus')}</Form.Label>
          <div className="border rounded p-3 bg-light">
            <Form.Check
              type="checkbox"
              id="service_transport"
              name="servicesIncluded_transport"
              label="✈️ Transport"
              checked={postData.servicesIncluded_transport || false}
              onChange={handleChangeInput}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="service_hebergement"
              name="servicesIncluded_hebergement"
              label="🏨 Hébergement"
              checked={postData.servicesIncluded_hebergement || false}
              onChange={handleChangeInput}
              className="mb-2"
            />
          </div>
        </Form.Group>
      ),
      
      'equipments': () => (
        <Form.Group key="equipments">
          <Form.Label>🏡 {t('equipments', 'Équipements')}</Form.Label>
          <div className="border rounded p-3 bg-light">
            <Form.Check
              type="checkbox"
              id="equip_wifi"
              name="equipments_wifi"
              label="📶 Wi-Fi"
              checked={postData.equipments_wifi || false}
              onChange={handleChangeInput}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              id="equip_piscine"
              name="equipments_piscine"
              label="🏊 Piscine"
              checked={postData.equipments_piscine || false}
              onChange={handleChangeInput}
              className="mb-2"
            />
          </div>
        </Form.Group>
      ),
      
      'startDate': () => (
        <Form.Group key="startDate">
          <Form.Label>📅 {t('start_date', 'Date de départ')}</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={postData.startDate || ''}
            onChange={handleChangeInput}
            dir={isRTL ? 'rtl' : 'ltr'}
            min={new Date().toISOString().split('T')[0]}
          />
        </Form.Group>
      ),
      
      'endDate': () => (
        <Form.Group key="endDate">
          <Form.Label>📅 {t('end_date', 'Date de retour')}</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={postData.endDate || ''}
            onChange={handleChangeInput}
            dir={isRTL ? 'rtl' : 'ltr'}
            min={postData.startDate || new Date().toISOString().split('T')[0]}
          />
        </Form.Group>
      ),
    };
    
    return specialFields[fieldKey]?.() || null;
  };
  
  // Si fieldName está especificado, devolver solo ese campo
  if (fieldName) {
    // 1. Buscar en campos especiales
    const specialField = renderSpecialField(fieldName);
    if (specialField) return specialField;
    
    // 2. Buscar en campos normales
    const fieldComponent = fields[fieldName];
    
    if (!fieldComponent) {
      console.warn(`⚠️ Campo '${fieldName}' no encontrado`);
      return null; // ← Retornar null, no mensaje de error
    }
    
    return fieldComponent;
  }
  
  // Si no hay fieldName, devolver campos según subCategory
  if (subCategory) {
    const fieldsToShow = getFieldsToShow();
    
    console.log('🎯 VoyagesFields - Campos a mostrar:', {
      subCategory,
      fieldsToShow
    });
    
    return (
      <>
        {fieldsToShow.map((fieldKey) => {
          // 1. Intentar con campos especiales primero
          const specialField = renderSpecialField(fieldKey);
          if (specialField) return <div key={fieldKey} className="mb-3">{specialField}</div>;
          
          // 2. Luego con campos normales
          const fieldComponent = fields[fieldKey];
          
          if (!fieldComponent) {
            console.warn(`⚠️ Campo '${fieldKey}' no encontrado`);
            return null;
          }
          
          return (
            <div key={fieldKey} className="mb-3">
              {fieldComponent}
            </div>
          );
        })}
      </>
    );
  }
  
  return null;
};

export default VoyagesFields;