import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VoyagesFields = ({ fieldName, postData, handleChangeInput, subCategory, isRTL }) => {
  const { t } = useTranslation();
  
  // CORREGIDO: Arrays REDUCIDOS con solo campos ESENCIALES
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'voyage_organise': [
        'typeVoyage',
        'destinationType',        
        'destinationLocation',    // Campo ÚNICO para destino
        'startDate',
        'endDate',
        'servicesIncluded',       // Checkboxes agrupados
        'pricePerPerson',
        'contactPhone'
      ],
      'location_vacances': [
        'typeHebergement',
        'wilayaLocation',
        'communeLocation',
        'capacity',
        'equipments',            // Checkboxes agrupados
        'startDateLocation',
        'endDateLocation',
        'pricePerNight',
        'contactPhone'
      ],
      'hajj_omra': [
        'typeVoyageReligieux',
        'hajjPeriod',
        'packageType',
        'servicesIncludedHajj',   // Checkboxes agrupados
        'pricePerPersonHajj',
        'contactPhone'
      ],
      'reservations_visa': [
        'typeServiceVisa',
        'destinationCountry',
        'visaType',
        'processingTime',
        'urgentService',
        'priceVisa',
        'contactPhone'
      ],
      'sejour': [
        'typeSejour',
        'regionSejour',
        'durationSejour',
        'activities',
        'priceSejour',
        'contactPhone'
      ],
      'croisiere': [
        'cruiseCompany',
        'departurePort',
        'destinationCruise',
        'durationCruise',
        'cabinType',
        'priceCruise',
        'contactPhone'
      ],
      'autre': [
        'descriptionSpecifique',
        'serviceType',
        'price',
        'contactPhone'
      ]
    };
    
    return specificFields[subCategory] || [];
  };
  
  // OBJETO SIMPLIFICADO de campos ESENCIALES
  const fields = {
    // ==================== VOYAGE ORGANISÉ ====================
    'typeVoyage': (
      <Form.Group key="typeVoyage">
        <Form.Label>✈️ {t('travel_type', 'Type de voyage')}</Form.Label>
        <Form.Select
          name="typeVoyage"
          value={postData.typeVoyage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_travel_type', 'Sélectionnez')}</option>
          <option value="touristique">{t('tourist', 'Touristique')}</option>
          <option value="culturel">{t('cultural', 'Culturel')}</option>
          <option value="balneaire">{t('beach', 'Balnéaire')}</option>
          <option value="familial">{t('family', 'Familial')}</option>
          <option value="affaires">{t('business', 'Affaires')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationType': (
      <Form.Group key="destinationType">
        <Form.Label>🌍 {t('destination_type', 'Type de destination')}</Form.Label>
        <Form.Select
          name="destinationType"
          value={postData.destinationType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_destination_type', 'Sélectionnez')}</option>
          <option value="local">{t('local', 'Local (Algérie)')}</option>
          <option value="international">{t('international', 'International')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationLocation': (
      <Form.Group key="destinationLocation">
        <Form.Label>📍 {t('destination', 'Destination')}</Form.Label>
        {postData.destinationType === 'local' ? (
          <Form.Select
            name="destinationWilaya"
            value={postData.destinationWilaya || ''}
            onChange={handleChangeInput}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('select_wilaya', 'Sélectionnez une wilaya')}</option>
            <option value="alger">{t('algiers', 'Alger')}</option>
            <option value="oran">{t('oran', 'Oran')}</option>
            <option value="constantine">{t('constantine', 'Constantine')}</option>
            <option value="annaba">{t('annaba', 'Annaba')}</option>
            <option value="tlemcen">{t('tlemcen', 'Tlemcen')}</option>
            <option value="autre">{t('other_wilaya', 'Autre')}</option>
          </Form.Select>
        ) : (
          <Form.Control
            type="text"
            name="destinationCountry"
            value={postData.destinationCountry || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_country', 'Pays de destination')}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        )}
      </Form.Group>
    ),
    
    'startDate': (
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
    
    'endDate': (
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
    
    'servicesIncluded': (
      <Form.Group key="servicesIncluded">
        <Form.Label>✅ {t('services_included', 'Services inclus')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="transportIncluded"
            label={t('transport', 'Transport')}
            checked={postData.transportIncluded || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="accommodationIncluded"
            label={t('accommodation', 'Hébergement')}
            checked={postData.accommodationIncluded || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="mealsIncluded"
            label={t('meals', 'Repas')}
            checked={postData.mealsIncluded || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="guideIncluded"
            label={t('guide', 'Guide')}
            checked={postData.guideIncluded || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'pricePerPerson': (
      <Form.Group key="pricePerPerson">
        <Form.Label>💰 {t('price_per_person', 'Prix par personne')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="pricePerPerson"
            value={postData.pricePerPerson || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 150000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    'contactPhone': (
      <Form.Group key="contactPhone">
        <Form.Label>📞 {t('contact_phone', 'Téléphone de contact')}</Form.Label>
        <InputGroup>
          <InputGroup.Text>+213</InputGroup.Text>
          <Form.Control
            type="tel"
            name="contactPhone"
            value={postData.contactPhone || ''}
            onChange={handleChangeInput}
            placeholder="555123456"
            dir="ltr"
            pattern="[0-9]{9}"
            maxLength="9"
          />
        </InputGroup>
        <Form.Text className="text-muted">
          💡 {t('phone_format', 'Format: +213 555 123 456')}
        </Form.Text>
      </Form.Group>
    ),
    
    // ==================== LOCATION VACANCES ====================
    'typeHebergement': (
      <Form.Group key="typeHebergement">
        <Form.Label>🏡 {t('accommodation_type', 'Type d\'hébergement')}</Form.Label>
        <Form.Select
          name="typeHebergement"
          value={postData.typeHebergement || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_accommodation', 'Sélectionnez')}</option>
          <option value="appartement">{t('apartment', 'Appartement')}</option>
          <option value="villa">{t('villa', 'Villa')}</option>
          <option value="maison">{t('house', 'Maison')}</option>
          <option value="riad">{t('riad', 'Riad')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'wilayaLocation': (
      <Form.Group key="wilayaLocation">
        <Form.Label>📍 {t('wilaya', 'Wilaya')}</Form.Label>
        <Form.Select
          name="wilayaLocation"
          value={postData.wilayaLocation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_wilaya', 'Sélectionnez')}</option>
          <option value="alger">Alger</option>
          <option value="oran">Oran</option>
          <option value="constantine">Constantine</option>
          <option value="annaba">Annaba</option>
          <option value="tlemcen">Tlemcen</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'communeLocation': (
      <Form.Group key="communeLocation">
        <Form.Label>🏘️ {t('commune', 'Commune/Quartier')}</Form.Label>
        <Form.Control
          type="text"
          name="communeLocation"
          value={postData.communeLocation || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_commune', 'Nom de la commune')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'capacity': (
      <Form.Group key="capacity">
        <Form.Label>👥 {t('capacity', 'Capacité')}</Form.Label>
        <Form.Control
          type="number"
          name="capacity"
          value={postData.capacity || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_capacity', 'Nombre de personnes')}
          min="1"
        />
      </Form.Group>
    ),
    
    'equipments': (
      <Form.Group key="equipments">
        <Form.Label>🏠 {t('equipments', 'Équipements')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="wifi"
            label="Wi-Fi"
            checked={postData.wifi || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="kitchen"
            label={t('kitchen', 'Cuisine')}
            checked={postData.kitchen || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="parking"
            label={t('parking', 'Parking')}
            checked={postData.parking || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="ac"
            label="Climatisation"
            checked={postData.ac || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'startDateLocation': (
      <Form.Group key="startDateLocation">
        <Form.Label>📅 {t('available_from', 'Disponible du')}</Form.Label>
        <Form.Control
          type="date"
          name="startDateLocation"
          value={postData.startDateLocation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'endDateLocation': (
      <Form.Group key="endDateLocation">
        <Form.Label>📅 {t('available_to', 'Disponible au')}</Form.Label>
        <Form.Control
          type="date"
          name="endDateLocation"
          value={postData.endDateLocation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'pricePerNight': (
      <Form.Group key="pricePerNight">
        <Form.Label>💰 {t('price_per_night', 'Prix par nuit')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="pricePerNight"
            value={postData.pricePerNight || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 10000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    // ==================== HAJJ & OMRA ====================
    'typeVoyageReligieux': (
      <Form.Group key="typeVoyageReligieux">
        <Form.Label>🕋 {t('religious_travel_type', 'Type')}</Form.Label>
        <Form.Select
          name="typeVoyageReligieux"
          value={postData.typeVoyageReligieux || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_type', 'Sélectionnez')}</option>
          <option value="hajj">{t('hajj', 'Hajj')}</option>
          <option value="omra">{t('umrah', 'Omra')}</option>
          <option value="hajj_omra">{t('hajj_umrah', 'Hajj & Omra')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'hajjPeriod': (
      <Form.Group key="hajjPeriod">
        <Form.Label>📅 {t('period', 'Période')}</Form.Label>
        <Form.Select
          name="hajjPeriod"
          value={postData.hajjPeriod || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_period', 'Sélectionnez')}</option>
          <option value="hajj_2024">{t('hajj_2024', 'Hajj 2024')}</option>
          <option value="hajj_2025">{t('hajj_2025', 'Hajj 2025')}</option>
          <option value="ramadan">{t('ramadan', 'Ramadan')}</option>
          <option value="all_year">{t('all_year', 'Toute l\'année')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'packageType': (
      <Form.Group key="packageType">
        <Form.Label>📦 {t('package_type', 'Package')}</Form.Label>
        <Form.Select
          name="packageType"
          value={postData.packageType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_package', 'Sélectionnez')}</option>
          <option value="economique">{t('economy', 'Économique')}</option>
          <option value="standard">{t('standard', 'Standard')}</option>
          <option value="premium">{t('premium', 'Premium')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'servicesIncludedHajj': (
      <Form.Group key="servicesIncludedHajj">
        <Form.Label>✅ {t('services_included', 'Services inclus')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="flightHajj"
            label={t('flight', 'Billet avion')}
            checked={postData.flightHajj || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="hotelHajj"
            label={t('hotel', 'Hôtel')}
            checked={postData.hotelHajj || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="transportHajj"
            label={t('transport', 'Transport')}
            checked={postData.transportHajj || false}
            onChange={handleChangeInput}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="guideHajj"
            label={t('guide', 'Guide religieux')}
            checked={postData.guideHajj || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'pricePerPersonHajj': (
      <Form.Group key="pricePerPersonHajj">
        <Form.Label>💰 {t('price_per_person', 'Prix par personne')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="pricePerPersonHajj"
            value={postData.pricePerPersonHajj || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 500000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    // ==================== RESERVATIONS VISA ====================
    'typeServiceVisa': (
      <Form.Group key="typeServiceVisa">
        <Form.Label>📋 {t('visa_service', 'Service visa')}</Form.Label>
        <Form.Select
          name="typeServiceVisa"
          value={postData.typeServiceVisa || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_service', 'Sélectionnez')}</option>
          <option value="tourist">{t('tourist_visa', 'Visa touristique')}</option>
          <option value="business">{t('business_visa', 'Visa affaires')}</option>
          <option value="student">{t('student_visa', 'Visa étudiant')}</option>
          <option value="urgent">{t('urgent_visa', 'Visa urgent')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationCountry': (
      <Form.Group key="destinationCountry">
        <Form.Label>🇺🇸 {t('destination_country', 'Pays de destination')}</Form.Label>
        <Form.Select
          name="destinationCountry"
          value={postData.destinationCountry || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_country', 'Sélectionnez')}</option>
          <option value="france">France</option>
          <option value="canada">Canada</option>
          <option value="usa">États-Unis</option>
          <option value="uae">Émirats Arabes Unis</option>
          <option value="saudi">Arabie Saoudite</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'visaType': (
      <Form.Group key="visaType">
        <Form.Label>📄 {t('visa_type', 'Type de visa')}</Form.Label>
        <Form.Select
          name="visaType"
          value={postData.visaType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_type', 'Sélectionnez')}</option>
          <option value="single">{t('single_entry', 'Entrée simple')}</option>
          <option value="multiple">{t('multiple_entry', 'Entrées multiples')}</option>
          <option value="schengen">Schengen</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'processingTime': (
      <Form.Group key="processingTime">
        <Form.Label>⏱️ {t('processing_time', 'Délai de traitement')}</Form.Label>
        <Form.Select
          name="processingTime"
          value={postData.processingTime || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_time', 'Sélectionnez')}</option>
          <option value="express_48h">Express (48h)</option>
          <option value="standard_1w">Standard (1 semaine)</option>
          <option value="normal_2w">Normal (2 semaines)</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'urgentService': (
      <Form.Group key="urgentService">
        <Form.Label>🚨 {t('urgent_service', 'Service urgent')}</Form.Label>
        <Form.Check
          type="switch"
          name="urgentService"
          checked={postData.urgentService || false}
          onChange={handleChangeInput}
          label={postData.urgentService ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'priceVisa': (
      <Form.Group key="priceVisa">
        <Form.Label>💰 {t('price', 'Prix')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="priceVisa"
            value={postData.priceVisa || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 25000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    // ==================== SÉJOUR ====================
    'regionSejour': (
      <Form.Group key="regionSejour">
        <Form.Label>🗺️ {t('region', 'Région')}</Form.Label>
        <Form.Select
          name="regionSejour"
          value={postData.regionSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_region', 'Sélectionnez')}</option>
          <option value="coast">{t('coast', 'Côte')}</option>
          <option value="kabylie">Kabylie</option>
          <option value="sahara">Sahara</option>
          <option value="international">{t('international', 'International')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'durationSejour': (
      <Form.Group key="durationSejour">
        <Form.Label>⏱️ {t('duration', 'Durée')}</Form.Label>
        <Form.Select
          name="durationSejour"
          value={postData.durationSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_duration', 'Sélectionnez')}</option>
          <option value="weekend">Week-end (2-3 jours)</option>
          <option value="1_week">1 semaine</option>
          <option value="2_weeks">2 semaines</option>
          <option value="custom">{t('custom', 'Sur mesure')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'activities': (
      <Form.Group key="activities">
        <Form.Label>🎯 {t('activities', 'Activités')}</Form.Label>
        <Form.Control
          as="textarea"
          name="activities"
          value={postData.activities || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_activities', 'Activités proposées...')}
          rows={2}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'priceSejour': (
      <Form.Group key="priceSejour">
        <Form.Label>💰 {t('price', 'Prix')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="priceSejour"
            value={postData.priceSejour || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 80000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    // ==================== CROISIÈRE ====================
    'cruiseCompany': (
      <Form.Group key="cruiseCompany">
        <Form.Label>🚢 {t('cruise_company', 'Compagnie')}</Form.Label>
        <Form.Select
          name="cruiseCompany"
          value={postData.cruiseCompany || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_company', 'Sélectionnez')}</option>
          <option value="msc">MSC Croisières</option>
          <option value="costa">Costa Croisières</option>
          <option value="royal">Royal Caribbean</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'departurePort': (
      <Form.Group key="departurePort">
        <Form.Label>⛵ {t('departure_port', 'Port de départ')}</Form.Label>
        <Form.Select
          name="departurePort"
          value={postData.departurePort || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_port', 'Sélectionnez')}</option>
          <option value="algiers">Alger</option>
          <option value="barcelona">Barcelone</option>
          <option value="marseille">Marseille</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationCruise': (
      <Form.Group key="destinationCruise">
        <Form.Label>🌊 {t('destination', 'Destination')}</Form.Label>
        <Form.Select
          name="destinationCruise"
          value={postData.destinationCruise || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_destination', 'Sélectionnez')}</option>
          <option value="mediterranean">Méditerranée</option>
          <option value="caribbean">Caraïbes</option>
          <option value="baltic">Baltique</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'durationCruise': (
      <Form.Group key="durationCruise">
        <Form.Label>⏱️ {t('duration', 'Durée')}</Form.Label>
        <Form.Select
          name="durationCruise"
          value={postData.durationCruise || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_duration', 'Sélectionnez')}</option>
          <option value="3_5">3-5 jours</option>
          <option value="7_10">7-10 jours</option>
          <option value="14+">14+ jours</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'cabinType': (
      <Form.Group key="cabinType">
        <Form.Label>🛏️ {t('cabin_type', 'Type de cabine')}</Form.Label>
        <Form.Select
          name="cabinType"
          value={postData.cabinType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_cabin', 'Sélectionnez')}</option>
          <option value="inside">Intérieure</option>
          <option value="outside">Extérieure</option>
          <option value="balcony">Avec balcon</option>
          <option value="suite">Suite</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'priceCruise': (
      <Form.Group key="priceCruise">
        <Form.Label>💰 {t('price_per_person', 'Prix par personne')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="priceCruise"
            value={postData.priceCruise || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 200000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    ),
    
    // ==================== AUTRE ====================
    'descriptionSpecifique': (
      <Form.Group key="descriptionSpecifique">
        <Form.Label>📝 {t('description', 'Description')}</Form.Label>
        <Form.Control
          as="textarea"
          name="descriptionSpecifique"
          value={postData.descriptionSpecifique || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_description', 'Décrivez votre service...')}
          rows={3}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'serviceType': (
      <Form.Group key="serviceType">
        <Form.Label>🔧 {t('service_type', 'Type de service')}</Form.Label>
        <Form.Select
          name="serviceType"
          value={postData.serviceType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_service_type', 'Sélectionnez')}</option>
          <option value="transport">{t('transport', 'Transport')}</option>
          <option value="guide">{t('guide', 'Guide')}</option>
          <option value="other">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'price': (
      <Form.Group key="price">
        <Form.Label>💰 {t('price', 'Prix')}</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="price"
            value={postData.price || ''}
            onChange={handleChangeInput}
            placeholder="Ex: 50000"
            min="0"
          />
          <InputGroup.Text>DA</InputGroup.Text>
        </InputGroup>
      </Form.Group>
    )
  };
  
  // Lógica de renderizado
  const subCategoryFields = getSubCategorySpecificFields();
  
  console.log('✈️ VoyagesFields - Renderizando:', {
    subCategory,
    fieldName,
    fieldsCount: subCategoryFields.length
  });
  
  // Si se solicita un campo específico
  if (fieldName) {
    const fieldComponent = fields[fieldName];
    if (!fieldComponent) {
      console.error(`❌ Campo '${fieldName}' no encontrado en VoyagesFields`);
      return (
        <div className="alert alert-danger">
          <strong>Error:</strong> Campo '{fieldName}' no está definido.
        </div>
      );
    }
    return fieldComponent;
  }
  
  // Si hay subcategoría, renderizar todos sus campos
  if (subCategory && subCategoryFields.length > 0) {
    return (
      <div className="row g-3">
        {subCategoryFields.map(fieldKey => {
          const fieldComponent = fields[fieldKey];
          
          if (!fieldComponent) {
            console.error(`❌ Campo '${fieldKey}' no definido para ${subCategory}`);
            return (
              <div key={fieldKey} className="col-12">
                <div className="alert alert-warning">
                  <strong>Advertencia:</strong> Campo '{fieldKey}' no disponible.
                </div>
              </div>
            );
          }
          
          return (
            <div key={fieldKey} className="col-12 col-md-6">
              {fieldComponent}
            </div>
          );
        })}
      </div>
    );
  }
  
  // Si no hay subcategoría seleccionada
  if (!subCategory) {
    return (
      <div className="alert alert-info">
        <strong>✈️ Information:</strong> Sélectionnez une sous-catégorie.
      </div>
    );
  }
  
  return null;
};

export default VoyagesFields;