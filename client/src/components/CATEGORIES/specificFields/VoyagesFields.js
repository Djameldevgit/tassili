import React from 'react';
import { Form, Row, Col, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VoyagesFields = ({ fieldName, postData, handleChangeInput, subCategory, isRTL }) => {
  const { t } = useTranslation();
  
  // Función para manejar cambios en checkboxes y switches
  const handleCheckboxChange = (e) => {
    handleChangeInput({
      target: {
        name: e.target.name,
        value: e.target.checked,
        type: 'checkbox'
      }
    });
  };
  
  // CORREGIDO: Arrays actualizados con todos los nuevos campos
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'voyage_organise': [
        'typeVoyage',
        'destinationType',        
        'destinationRegion',      
        'destinationWilaya',      
        'destinationInternational',
        'dureeVoyage',
        'dateDepart',
        'transportVoyage',
        'hebergementVoyage',
        'reservationDetails',     
        'prixOptions'
      ],
      'location_vacances': [
        'typeHebergement',
        'destinationType',
        'wilayaLocation',
        'communeLocation',
        'capaciteHebergement',
        'equipementsHebergement',
        'localisationHebergement',
        'periodeLocation',
        'reservationConditions'
      ],
      'hajj_omra': [
        'typeVoyageReligieux',
        'periodeVoyage',
        'destinationHajj',
        'packageType',
        'servicesInclus',
        'guideReligieux',
        'logementProche',
        'reservationAvance',
        'prixParPersonne'
      ],
      'reservations_visa': [
        'typeServiceVisa',
        'destinationType',
        'paysVisa',
        'typeVisa',
        'delaiVisa',
        'suiviDossier',
        'urgenceService',
        'documentsRequis'
      ],
      'sejour': [
        'typeSejour',
        'destinationType',
        'regionSejour',
        'dureeSejour',
        'activitesSejour',
        'formuleSejour',
        'publicCible',
        'optionsReservation'
      ],
      'croisiere': [
        'compagnieCroisiere',
        'departCroisiere',
        'destinationCroisiere',
        'dureeCroisiere',
        'escalesCroisiere',
        'typeCabine',
        'reservationEarlyBird'
      ],
      'autre': [
        'descriptionSpecifique',
        'typeServiceVoyage'
      ]
    };
    
    return specificFields[subCategory] || [];
  };
  
  // OBJETO COMPLETO DE CAMPOS CON TODOS LOS NUEVOS COMPONENTES
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
          <option value="aventure">{t('adventure', 'Aventure')}</option>
          <option value="culturel">{t('cultural', 'Culturel')}</option>
          <option value="balneaire">{t('beach', 'Balnéaire')}</option>
          <option value="montagne">{t('mountain', 'Montagne')}</option>
          <option value="safari">{t('safari', 'Safari')}</option>
          <option value="decouverte">{t('discovery', 'Découverte')}</option>
          <option value="gastronomique">{t('gastronomic', 'Gastronomique')}</option>
          <option value="affaires">{t('business', 'Affaires')}</option>
          <option value="familial">{t('family', 'Familial')}</option>
          <option value="romantique">{t('romantic', 'Romantique')}</option>
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
          <option value="local">{t('local', 'Destination locale (Algérie)')}</option>
          <option value="international">{t('international', 'Destination internationale')}</option>
          <option value="mixte">{t('mixed', 'Mixte (Local + International)')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationRegion': (
      <Form.Group key="destinationRegion">
        <Form.Label>🗺️ {t('destination_region', 'Région en Algérie')}</Form.Label>
        <Form.Select
          name="destinationRegion"
          value={postData.destinationRegion || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={postData.destinationType && !['local', 'mixte'].includes(postData.destinationType)}
        >
          <option value="">{t('select_region', 'Sélectionnez une région')}</option>
          <option value="nord">{t('north', 'Nord (Côtes méditerranéennes)')}</option>
          <option value="centre">{t('center', 'Centre (Hauts plateaux)')}</option>
          <option value="sud">{t('south', 'Sud (Sahara)')}</option>
          <option value="kabylie">{t('kabylie', 'Kabylie')}</option>
          <option value="est">{t('east', 'Est (Constantine, Annaba)')}</option>
          <option value="ouest">{t('west', 'Ouest (Oran, Tlemcen)')}</option>
          <option value="toutes">{t('all_regions', 'Toutes les régions')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationWilaya': (
      <Form.Group key="destinationWilaya">
        <Form.Label>📍 {t('wilaya', 'Wilaya spécifique')}</Form.Label>
        <Form.Select
          name="destinationWilaya"
          value={postData.destinationWilaya || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={postData.destinationType && !['local', 'mixte'].includes(postData.destinationType)}
        >
          <option value="">{t('select_wilaya', 'Sélectionnez une wilaya')}</option>
          <option value="alger">{t('algiers', 'Alger')}</option>
          <option value="oran">{t('oran', 'Oran')}</option>
          <option value="constantine">{t('constantine', 'Constantine')}</option>
          <option value="annaba">{t('annaba', 'Annaba')}</option>
          <option value="blida">{t('blida', 'Blida')}</option>
          <option value="setif">{t('setif', 'Sétif')}</option>
          <option value="batna">{t('batna', 'Batna')}</option>
          <option value="djelfa">{t('djelfa', 'Djelfa')}</option>
          <option value="tlemcen">{t('tlemcen', 'Tlemcen')}</option>
          <option value="bejaia">{t('bejaia', 'Béjaïa')}</option>
          <option value="tizi_ouzou">{t('tizi_ouzou', 'Tizi Ouzou')}</option>
          <option value="tamanrasset">{t('tamanrasset', 'Tamanrasset')}</option>
          <option value="ghardaia">{t('ghardaia', 'Ghardaïa')}</option>
          <option value="autre">{t('other_wilaya', 'Autre wilaya')}</option>
          <option value="multiple">{t('multiple_wilayas', 'Plusieurs wilayas')}</option>
        </Form.Select>
        {postData.destinationWilaya === 'autre' && (
          <Form.Control
            type="text"
            name="autreWilaya"
            value={postData.autreWilaya || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_wilaya', 'Précisez la wilaya')}
            className="mt-2"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        )}
      </Form.Group>
    ),
    
    'destinationInternational': (
      <Form.Group key="destinationInternational">
        <Form.Label>✈️ {t('international_destination', 'Destination internationale')}</Form.Label>
        <Form.Select
          name="destinationInternational"
          value={postData.destinationInternational || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
          disabled={postData.destinationType && !['international', 'mixte'].includes(postData.destinationType)}
        >
          <option value="">{t('select_country', 'Sélectionnez un pays')}</option>
          <option value="france">{t('france', 'France')}</option>
          <option value="espagne">{t('spain', 'Espagne')}</option>
          <option value="italie">{t('italy', 'Italie')}</option>
          <option value="turquie">{t('turkey', 'Turquie')}</option>
          <option value="maroc">{t('morocco', 'Maroc')}</option>
          <option value="tunisie">{t('tunisia', 'Tunisie')}</option>
          <option value="arabie_saoudite">{t('saudi_arabia', 'Arabie Saoudite')}</option>
          <option value="emirats">{t('uae', 'Émirats Arabes Unis')}</option>
          <option value="egypte">{t('egypt', 'Égypte')}</option>
          <option value="thailande">{t('thailand', 'Thaïlande')}</option>
          <option value="malaisie">{t('malaysia', 'Malaisie')}</option>
          <option value="inde">{t('india', 'Inde')}</option>
          <option value="autre">{t('other_country', 'Autre pays')}</option>
        </Form.Select>
        {postData.destinationInternational === 'autre' && (
          <Form.Control
            type="text"
            name="autrePays"
            value={postData.autrePays || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_country_name', 'Nom du pays')}
            className="mt-2"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        )}
      </Form.Group>
    ),
    
    'dureeVoyage': (
      <Form.Group key="dureeVoyage">
        <Form.Label>⏱️ {t('travel_duration', 'Durée du voyage')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="dureeVoyage"
              value={postData.dureeVoyage || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_duration', 'Ex: 7')}
              min="1"
              max="90"
            />
          </Col>
          <Col>
            <Form.Select
              name="uniteDureeVoyage"
              value={postData.uniteDureeVoyage || 'jours'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="jours">{t('days', 'Jours')}</option>
              <option value="semaines">{t('weeks', 'Semaines')}</option>
              <option value="weekend">{t('weekend', 'Week-end')}</option>
              <option value="mois">{t('months', 'Mois')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'dateDepart': (
      <Form.Group key="dateDepart">
        <Form.Label>📅 {t('departure_date', 'Date de départ')}</Form.Label>
        <Form.Control
          type="date"
          name="dateDepart"
          value={postData.dateDepart || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
          min={new Date().toISOString().split('T')[0]}
        />
      </Form.Group>
    ),
    
    'transportVoyage': (
      <Form.Group key="transportVoyage">
        <Form.Label>🚗 {t('travel_transport', 'Transport inclus')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="transportAvion"
            label={t('plane', 'Avion')}
            checked={postData.transportAvion || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="transportBus"
            label={t('bus', 'Bus/Car')}
            checked={postData.transportBus || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="transportTrain"
            label={t('train', 'Train')}
            checked={postData.transportTrain || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="transportLocal"
            label={t('local_transport', 'Transport local')}
            checked={postData.transportLocal || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="transferts"
            label={t('transfers', 'Transferts aéroport')}
            checked={postData.transferts || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    'hebergementVoyage': (
      <Form.Group key="hebergementVoyage">
        <Form.Label>🏨 {t('travel_accommodation', 'Hébergement inclus')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="hebergementHotel"
            label={t('hotel', 'Hôtel')}
            checked={postData.hebergementHotel || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="hebergementRiad"
            label={t('riad', 'Riad/Guesthouse')}
            checked={postData.hebergementRiad || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="hebergementAppartement"
            label={t('apartment', 'Appartement')}
            checked={postData.hebergementAppartement || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="hebergementVilla"
            label={t('villa', 'Villa')}
            checked={postData.hebergementVilla || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="petitDejeuner"
            label={t('breakfast', 'Petit déjeuner inclus')}
            checked={postData.petitDejeuner || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    'reservationDetails': (
      <Form.Group key="reservationDetails">
        <Form.Label>📅 {t('reservation_details', 'Détails de réservation')}</Form.Label>
        <Row className="g-2 mb-3">
          <Col md={6}>
            <Form.Label className="small">{t('booking_deadline', 'Date limite réservation')}</Form.Label>
            <Form.Control
              type="date"
              name="dateLimiteReservation"
              value={postData.dateLimiteReservation || ''}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </Col>
          <Col md={6}>
            <Form.Label className="small">{t('min_people', 'Minimum participants')}</Form.Label>
            <Form.Control
              type="number"
              name="minParticipants"
              value={postData.minParticipants || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 10"
              min="1"
            />
          </Col>
        </Row>
        <Form.Check
          type="checkbox"
          name="reservationFlexible"
          label={t('flexible_booking', 'Réservation flexible (modification possible)')}
          checked={postData.reservationFlexible || false}
          onChange={handleCheckboxChange}
          className="mb-2"
        />
        <Form.Check
          type="checkbox"
          name="annulationGratuite"
          label={t('free_cancellation', 'Annulation gratuite jusqu\'à 30 jours avant')}
          checked={postData.annulationGratuite || false}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    ),
    
    'prixOptions': (
      <Form.Group key="prixOptions">
        <Form.Label>💰 {t('price_options', 'Options de paiement')}</Form.Label>
        <Row className="g-2 mb-3">
          <Col md={6}>
            <Form.Label className="small">{t('price_per_person', 'Prix par personne')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="prixParPersonne"
                value={postData.prixParPersonne || ''}
                onChange={handleChangeInput}
                placeholder="Ex: 150000"
                min="0"
              />
              <InputGroup.Text>DA</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={6}>
            <Form.Label className="small">{t('deposit', 'Acompte requis')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="acompte"
                value={postData.acompte || ''}
                onChange={handleChangeInput}
                placeholder="Ex: 50000"
                min="0"
              />
              <InputGroup.Text>DA</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <div className="mt-2">
          <Form.Check
            type="checkbox"
            name="paiementEchelonne"
            label={t('installment_payment', 'Paiement échelonné disponible')}
            checked={postData.paiementEchelonne || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="reductionGroupe"
            label={t('group_discount', 'Réduction pour groupes (+5 personnes)')}
            checked={postData.reductionGroupe || false}
            onChange={handleCheckboxChange}
          />
        </div>
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
          <option value="chalet">{t('chalet', 'Chalet')}</option>
          <option value="bungalow">{t('bungalow', 'Bungalow')}</option>
          <option value="studio">{t('studio', 'Studio')}</option>
          <option value="ferme">{t('farm', 'Ferme')}</option>
          <option value="chambre_hote">{t('guest_room', 'Chambre d\'hôte')}</option>
          <option value="maison_hote">{t('guest_house', 'Maison d\'hôte')}</option>
          <option value="camping">{t('camping', 'Camping')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'wilayaLocation': (
      <Form.Group key="wilayaLocation">
        <Form.Label>🏙️ {t('wilaya_location', 'Wilaya de location')}</Form.Label>
        <Form.Select
          name="wilayaLocation"
          value={postData.wilayaLocation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_wilaya', 'Sélectionnez une wilaya')}</option>
          <option value="alger">{t('algiers_coast', 'Alger (Côte)')}</option>
          <option value="tipaza">{t('tipaza', 'Tipaza')}</option>
          <option value="bejaia">{t('bejaia', 'Béjaïa')}</option>
          <option value="jijel">{t('jijel', 'Jijel')}</option>
          <option value="skikda">{t('skikda', 'Skikda')}</option>
          <option value="annaba">{t('annaba', 'Annaba')}</option>
          <option value="tlemcen">{t('tlemcen', 'Tlemcen')}</option>
          <option value="oran">{t('oran', 'Oran')}</option>
          <option value="ghardaia">{t('ghardaia', 'Ghardaïa (Sahara)')}</option>
          <option value="tamanrasset">{t('tamanrasset', 'Tamanrasset (Sud)')}</option>
          <option value="autre">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'communeLocation': (
      <Form.Group key="communeLocation">
        <Form.Label>🏘️ {t('commune_location', 'Commune/Quartier')}</Form.Label>
        <Form.Control
          type="text"
          name="communeLocation"
          value={postData.communeLocation || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_commune', 'Ex: Sidi Fredj, El Mohammadia, etc.')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'capaciteHebergement': (
      <Form.Group key="capaciteHebergement">
        <Form.Label>👥 {t('accommodation_capacity', 'Capacité d\'accueil')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="capaciteHebergement"
              value={postData.capaciteHebergement || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_capacity', 'Ex: 4')}
              min="1"
              max="50"
            />
          </Col>
          <Col>
            <span className="align-middle">{t('people', 'personnes')}</span>
          </Col>
        </Row>
        <Form.Text className="text-muted">
          💡 {t('capacity_tip', 'Nombre maximum de personnes autorisées')}
        </Form.Text>
      </Form.Group>
    ),
    
    'equipementsHebergement': (
      <Form.Group key="equipementsHebergement">
        <Form.Label>🏠 {t('accommodation_equipment', 'Équipements')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="equipementCuisine"
            label={t('kitchen', 'Cuisine équipée')}
            checked={postData.equipementCuisine || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="equipementWifi"
            label={t('wifi', 'Wi-Fi')}
            checked={postData.equipementWifi || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="equipementClimatisation"
            label={t('ac', 'Climatisation')}
            checked={postData.equipementClimatisation || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="equipementPiscine"
            label={t('pool', 'Piscine')}
            checked={postData.equipementPiscine || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="equipementParking"
            label={t('parking', 'Parking')}
            checked={postData.equipementParking || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="equipementJardin"
            label={t('garden', 'Jardin')}
            checked={postData.equipementJardin || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    'localisationHebergement': (
      <Form.Group key="localisationHebergement">
        <Form.Label>📍 {t('accommodation_location', 'Localisation détaillée')}</Form.Label>
        <Form.Control
          type="text"
          name="localisationHebergement"
          value={postData.localisationHebergement || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_location', 'Adresse exacte ou quartier')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
        <Form.Text className="text-muted">
          💡 {t('location_tip', 'Vous pouvez préciser la proximité avec les points d\'intérêt')}
        </Form.Text>
      </Form.Group>
    ),
    
    'periodeLocation': (
      <Form.Group key="periodeLocation">
        <Form.Label>📅 {t('rental_period', 'Période de location')}</Form.Label>
        <Row className="mb-2">
          <Col>
            <Form.Label className="small">{t('from', 'Du')}</Form.Label>
            <Form.Control
              type="date"
              name="dateDebutLocation"
              value={postData.dateDebutLocation || ''}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </Col>
          <Col>
            <Form.Label className="small">{t('to', 'Au')}</Form.Label>
            <Form.Control
              type="date"
              name="dateFinLocation"
              value={postData.dateFinLocation || ''}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </Col>
        </Row>
        <Form.Check
          type="checkbox"
          name="locationLongueDuree"
          label={t('long_term_rental', 'Location longue durée possible')}
          checked={postData.locationLongueDuree || false}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    ),
    
    'reservationConditions': (
      <Form.Group key="reservationConditions">
        <Form.Label>📋 {t('booking_conditions', 'Conditions de réservation')}</Form.Label>
        <Row className="g-2 mb-2">
          <Col md={6}>
            <Form.Label className="small">{t('min_nights', 'Nuitées minimum')}</Form.Label>
            <Form.Control
              type="number"
              name="nuitMin"
              value={postData.nuitMin || '2'}
              onChange={handleChangeInput}
              min="1"
            />
          </Col>
          <Col md={6}>
            <Form.Label className="small">{t('arrival_time', 'Heure d\'arrivée')}</Form.Label>
            <Form.Control
              type="time"
              name="heureArrivee"
              value={postData.heureArrivee || '14:00'}
              onChange={handleChangeInput}
            />
          </Col>
        </Row>
        <Form.Check
          type="checkbox"
          name="caution"
          label={t('deposit_required', 'Caution requise')}
          checked={postData.caution || false}
          onChange={handleCheckboxChange}
          className="mb-1"
        />
        {postData.caution && (
          <InputGroup className="mb-2">
            <Form.Control
              type="number"
              name="montantCaution"
              value={postData.montantCaution || ''}
              onChange={handleChangeInput}
              placeholder="Montant de la caution"
              min="0"
            />
            <InputGroup.Text>DA</InputGroup.Text>
          </InputGroup>
        )}
        <Form.Check
          type="checkbox"
          name="animauxAutorises"
          label={t('pets_allowed', 'Animaux autorisés')}
          checked={postData.animauxAutorises || false}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    ),
    
    // ==================== HAJJ & OMRA ====================
    'typeVoyageReligieux': (
      <Form.Group key="typeVoyageReligieux">
        <Form.Label>🕋 {t('religious_travel_type', 'Type de voyage religieux')}</Form.Label>
        <Form.Select
          name="typeVoyageReligieux"
          value={postData.typeVoyageReligieux || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_religious_travel', 'Sélectionnez')}</option>
          <option value="hajj">{t('hajj', 'Hajj')}</option>
          <option value="omra">{t('umrah', 'Omra')}</option>
          <option value="hajj_omra">{t('hajj_umrah', 'Hajj & Omra combinés')}</option>
          <option value="omra_ramadan">{t('umrah_ramadan', 'Omra Ramadan')}</option>
          <option value="omra_chawwal">{t('umrah_shawwal', 'Omra Chawwal')}</option>
          <option value="omra_moharram">{t('umrah_muharram', 'Omra Moharram')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'periodeVoyage': (
      <Form.Group key="periodeVoyage">
        <Form.Label>📅 {t('travel_period', 'Période du voyage')}</Form.Label>
        <Form.Select
          name="periodeVoyage"
          value={postData.periodeVoyage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_period', 'Sélectionnez')}</option>
          <option value="ramadan">{t('ramadan', 'Ramadan')}</option>
          <option value="hajj_2024">{t('hajj_2024', 'Hajj 2024')}</option>
          <option value="hajj_2025">{t('hajj_2025', 'Hajj 2025')}</option>
          <option value="hajj_2026">{t('hajj_2026', 'Hajj 2026')}</option>
          <option value="toute_annee">{t('all_year', 'Toute l\'année (Omra)')}</option>
          <option value="vacances_scolaires">{t('school_holidays', 'Vacances scolaires')}</option>
          <option value="ete">{t('summer', 'Été')}</option>
          <option value="hiver">{t('winter', 'Hiver')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationHajj': (
      <Form.Group key="destinationHajj">
        <Form.Label>🕋 {t('hajj_destination', 'Destination Hajj/Omra')}</Form.Label>
        <Form.Select
          name="destinationHajj"
          value={postData.destinationHajj || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_hajj_destination', 'Sélectionnez')}</option>
          <option value="makkah_medina">{t('makkah_medina', 'Makkah et Médina')}</option>
          <option value="makkah_only">{t('makkah_only', 'Makkah uniquement (Omra)')}</option>
          <option value="complet">{t('complete', 'Circuit complet Hajj')}</option>
          <option value="omra_ramadan">{t('omra_ramadan', 'Omra spécial Ramadan')}</option>
          <option value="omra_visite">{t('omra_visite', 'Omra avec visites historiques')}</option>
          <option value="hajj_tamattou">{t('hajj_tamattou', 'Hajj Tamattou')}</option>
          <option value="hajj_kiran">{t('hajj_kiran', 'Hajj Kiran')}</option>
          <option value="hajj_ifrad">{t('hajj_ifrad', 'Hajj Ifrad')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'packageType': (
      <Form.Group key="packageType">
        <Form.Label>📦 {t('package_type', 'Type de paquete Hajj/Omra')}</Form.Label>
        <Form.Select
          name="packageType"
          value={postData.packageType || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_package_type', 'Sélectionnez')}</option>
          <option value="economique">{t('economy', 'Économique (3 étoiles)')}</option>
          <option value="standard">{t('standard', 'Standard (4 étoiles)')}</option>
          <option value="confort">{t('comfort', 'Confort (5 étoiles)')}</option>
          <option value="premium">{t('premium', 'Premium/Luxe (5 étoiles +)')}</option>
          <option value="sur_mesure">{t('custom_hajj', 'Sur mesure')}</option>
        </Form.Select>
        <Form.Text className="text-muted">
          💡 {t('package_tip', 'Différents niveaux de service et d\'hébergement')}
        </Form.Text>
      </Form.Group>
    ),
    
    'servicesInclus': (
      <Form.Group key="servicesInclus">
        <Form.Label>✅ {t('included_services', 'Services inclus Hajj/Omra')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="serviceBillet"
            label={t('ticket', 'Billet d\'avion AR')}
            checked={postData.serviceBillet || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceHebergement"
            label={t('accommodation', 'Hébergement (hôtels)')}
            checked={postData.serviceHebergement || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceTransport"
            label={t('transport', 'Transport local VIP')}
            checked={postData.serviceTransport || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceRepas"
            label={t('meals', 'Repas (buffet)')}
            checked={postData.serviceRepas || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceAssistance"
            label={t('assistance', 'Assistance religieuse 24/7')}
            checked={postData.serviceAssistance || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceVisa"
            label={t('visa', 'Visa Hajj/Omra')}
            checked={postData.serviceVisa || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="serviceZiyarat"
            label={t('ziyarat', 'Visites religieuses (Ziyarat)')}
            checked={postData.serviceZiyarat || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    'guideReligieux': (
      <Form.Group key="guideReligieux">
        <Form.Label>📖 {t('religious_guide', 'Guide religieux')}</Form.Label>
        <Form.Check
          type="switch"
          name="guideReligieux"
          checked={postData.guideReligieux || false}
          onChange={handleCheckboxChange}
          label={postData.guideReligieux ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
        {postData.guideReligieux && (
          <Form.Select
            name="langueGuide"
            value={postData.langueGuide || ''}
            onChange={handleChangeInput}
            className="mt-2"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">{t('select_language', 'Langue du guide')}</option>
            <option value="arabe">{t('arabic', 'Arabe')}</option>
            <option value="arabe_dialecte">{t('arabic_dialect', 'Arabe dialectal algérien')}</option>
            <option value="francais">{t('french', 'Français')}</option>
            <option value="anglais">{t('english', 'Anglais')}</option>
            <option value="bilingue">{t('bilingual', 'Bilingue Arabe/Français')}</option>
            <option value="trilingue">{t('trilingual', 'Trilingue')}</option>
          </Form.Select>
        )}
      </Form.Group>
    ),
    
    'logementProche': (
      <Form.Group key="logementProche">
        <Form.Label>📍 {t('nearby_accommodation', 'Proximité des lieux saints')}</Form.Label>
        <Form.Select
          name="logementProche"
          value={postData.logementProche || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_proximity', 'Sélectionnez')}</option>
          <option value="tres_proche">{t('very_close', 'Très proche (moins de 500m)')}</option>
          <option value="proche">{t('close', 'Proche (500m-1km)')}</option>
          <option value="moyen">{t('medium', 'Distance moyenne (1-3 km)')}</option>
          <option value="eloigne">{t('far', 'Éloigné (plus de 3 km)')}</option>
          <option value="haram">{t('haram', 'Face à Al-Haram')}</option>
          <option value="nabawi">{t('nabawi', 'Face à An-Nabawi')}</option>
        </Form.Select>
        <Form.Text className="text-muted">
          💡 {t('proximity_tip', 'Distance par rapport à la Mosquée Al-Haram ou An-Nabawi')}
        </Form.Text>
      </Form.Group>
    ),
    
    'reservationAvance': (
      <Form.Group key="reservationAvance">
        <Form.Label>⏰ {t('early_booking', 'Réservation anticipée Hajj')}</Form.Label>
        <div className="alert alert-info mb-3">
          <small>
            <strong>💡 Information importante pour Algériens:</strong><br />
            Pour le Hajj {new Date().getFullYear() + 1}, les réservations anticipées sont recommandées.<br />
            Les places sont limitées et attribuées par quota du Ministère des Affaires Religieuses.
          </small>
        </div>
        <Form.Check
          type="checkbox"
          name="reservationAnticipee"
          label={t('early_booking_option', 'Proposer réservation anticipée (avant octobre)')}
          checked={postData.reservationAnticipee || false}
          onChange={handleCheckboxChange}
          className="mb-2"
        />
        {postData.reservationAnticipee && (
          <>
            <Form.Label className="small">{t('early_booking_discount', 'Réduction réservation anticipée')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="reductionAnticipee"
                value={postData.reductionAnticipee || ''}
                onChange={handleChangeInput}
                placeholder="Ex: 10"
                min="0"
                max="50"
              />
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup>
          </>
        )}
      </Form.Group>
    ),
    
    'prixParPersonne': (
      <Form.Group key="prixParPersonne">
        <Form.Label>💰 {t('price_per_person_hajj', 'Prix par personne (DA)')}</Form.Label>
        <Row className="g-2">
          <Col md={4}>
            <Form.Label className="small">{t('economy', 'Économique')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="prixEconomique"
                value={postData.prixEconomique || ''}
                onChange={handleChangeInput}
                placeholder="DA"
                min="0"
              />
              <InputGroup.Text>DA</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Label className="small">{t('standard', 'Standard')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="prixStandard"
                value={postData.prixStandard || ''}
                onChange={handleChangeInput}
                placeholder="DA"
                min="0"
              />
              <InputGroup.Text>DA</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col md={4}>
            <Form.Label className="small">{t('premium', 'Premium')}</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                name="prixPremium"
                value={postData.prixPremium || ''}
                onChange={handleChangeInput}
                placeholder="DA"
                min="0"
              />
              <InputGroup.Text>DA</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
        <Form.Text className="text-muted">
          💡 {t('price_tip', 'Prix tout compris selon le package sélectionné')}
        </Form.Text>
      </Form.Group>
    ),
    
    // ==================== RESERVATIONS VISA ====================
    'typeServiceVisa': (
      <Form.Group key="typeServiceVisa">
        <Form.Label>📋 {t('visa_service_type', 'Type de service visa')}</Form.Label>
        <Form.Select
          name="typeServiceVisa"
          value={postData.typeServiceVisa || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_visa_service', 'Sélectionnez')}</option>
          <option value="demande_visa">{t('visa_application', 'Demande de visa')}</option>
          <option value="assistance_dossier">{t('file_assistance', 'Assistance complète dossier')}</option>
          <option value="urgent">{t('urgent', 'Visa urgent')}</option>
          <option value="affaires">{t('business', 'Visa affaires')}</option>
          <option value="touristique">{t('tourist', 'Visa touristique')}</option>
          <option value="etudiant">{t('student', 'Visa étudiant')}</option>
          <option value="medical">{t('medical', 'Visa médical')}</option>
          <option value="familial">{t('family', 'Visa familial')}</option>
          <option value="transit">{t('transit', 'Visa transit')}</option>
          <option value="travail">{t('work', 'Visa travail')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'paysVisa': (
      <Form.Group key="paysVisa">
        <Form.Label>🇺🇸 {t('visa_country', 'Pays du visa')}</Form.Label>
        <Form.Select
          name="paysVisa"
          value={postData.paysVisa || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_country_visa', 'Sélectionnez un pays')}</option>
          <option value="france">{t('france', 'France')}</option>
          <option value="canada">{t('canada', 'Canada')}</option>
          <option value="usa">{t('usa', 'États-Unis')}</option>
          <option value="royaume_uni">{t('uk', 'Royaume-Uni')}</option>
          <option value="allemagne">{t('germany', 'Allemagne')}</option>
          <option value="espagne">{t('spain', 'Espagne')}</option>
          <option value="italie">{t('italy', 'Italie')}</option>
          <option value="turquie">{t('turkey', 'Turquie')}</option>
          <option value="arabie_saoudite">{t('saudi_arabia', 'Arabie Saoudite')}</option>
          <option value="emirats">{t('uae', 'Émirats Arabes Unis')}</option>
          <option value="chine">{t('china', 'Chine')}</option>
          <option value="japon">{t('japan', 'Japon')}</option>
          <option value="australie">{t('australia', 'Australie')}</option>
          <option value="autre">{t('other_country', 'Autre pays')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'delaiVisa': (
      <Form.Group key="delaiVisa">
        <Form.Label>⏱️ {t('visa_processing_time', 'Délai de traitement')}</Form.Label>
        <Form.Select
          name="delaiVisa"
          value={postData.delaiVisa || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_processing_time', 'Sélectionnez')}</option>
          <option value="express_24h">{t('express_24h', 'Express 24h')}</option>
          <option value="express_48h">{t('express_48h', 'Express 48h')}</option>
          <option value="rapide">{t('fast', 'Rapide (3-5 jours)')}</option>
          <option value="standard">{t('standard', 'Standard (1-2 semaines)')}</option>
          <option value="long">{t('long', 'Long (3-4 semaines)')}</option>
          <option value="tres_long">{t('very_long', 'Très long (1-2 mois)')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeVisa': (
      <Form.Group key="typeVisa">
        <Form.Label>📄 {t('visa_type', 'Type de visa')}</Form.Label>
        <Form.Select
          name="typeVisa"
          value={postData.typeVisa || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_visa_type', 'Sélectionnez')}</option>
          <option value="simple">{t('single', 'Entrée simple')}</option>
          <option value="multiple">{t('multiple', 'Entrées multiples')}</option>
          <option value="transit">{t('transit', 'Transit')}</option>
          <option value="long_sejour">{t('long_stay', 'Long séjour')}</option>
          <option value="court_sejour">{t('short_stay', 'Court séjour')}</option>
          <option value="schengen">{t('schengen', 'Schengen')}</option>
          <option value="e_visa">{t('e_visa', 'E-Visa')}</option>
          <option value="visa_arrivee">{t('visa_on_arrival', 'Visa à l\'arrivée')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'suiviDossier': (
      <Form.Group key="suiviDossier">
        <Form.Label>📊 {t('file_tracking', 'Suivi du dossier')}</Form.Label>
        <Form.Check
          type="switch"
          name="suiviDossier"
          checked={postData.suiviDossier || false}
          onChange={handleCheckboxChange}
          label={postData.suiviDossier ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
        <Form.Text className="text-muted">
          💡 {t('tracking_tip', 'Mises à jour régulières sur l\'avancement de votre dossier')}
        </Form.Text>
      </Form.Group>
    ),
    
    'urgenceService': (
      <Form.Group key="urgenceService">
        <Form.Label>🚨 {t('urgent_service', 'Service urgent')}</Form.Label>
        <div className="alert alert-warning mb-3">
          <small>
            <strong>⚠️ Important pour Algériens:</strong><br />
            Certains pays exigent un visa même pour transit.<br />
            Vérifiez les nouvelles régulations avant de réserver.
          </small>
        </div>
        <Form.Check
          type="checkbox"
          name="serviceUrgent24h"
          label={t('24h_service', 'Service 24h/24 disponible')}
          checked={postData.serviceUrgent24h || false}
          onChange={handleCheckboxChange}
          className="mb-1"
        />
        <Form.Check
          type="checkbox"
          name="assistanceTelephonique"
          label={t('phone_assistance', 'Assistance téléphonique en arabe/français')}
          checked={postData.assistanceTelephonique || false}
          onChange={handleCheckboxChange}
          className="mb-1"
        />
        <Form.Check
          type="checkbox"
          name="serviceWeekend"
          label={t('weekend_service', 'Service weekends et jours fériés')}
          checked={postData.serviceWeekend || false}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    ),
    
    'documentsRequis': (
      <Form.Group key="documentsRequis">
        <Form.Label>📑 {t('required_documents', 'Documents requis')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="docPasseport"
            label={t('passport', 'Passeport valide (6 mois)')}
            checked={postData.docPasseport || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="docPhotos"
            label={t('photos', 'Photos d\'identité')}
            checked={postData.docPhotos || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="docJustificatif"
            label={t('proof', 'Justificatifs de ressources')}
            checked={postData.docJustificatif || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="docReservation"
            label={t('reservation', 'Réservation d\'hôtel/billet')}
            checked={postData.docReservation || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="docAssurance"
            label={t('insurance', 'Assurance voyage')}
            checked={postData.docAssurance || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="docInvitation"
            label={t('invitation', 'Lettre d\'invitation')}
            checked={postData.docInvitation || false}
            onChange={handleCheckboxChange}
          />
        </div>
        <Form.Text className="text-muted">
          💡 {t('documents_tip', 'Liste des documents nécessaires selon le type de visa')}
        </Form.Text>
      </Form.Group>
    ),
    
    // ==================== SÉJOUR ====================
    'typeSejour': (
      <Form.Group key="typeSejour">
        <Form.Label>🏞️ {t('stay_type', 'Type de séjour')}</Form.Label>
        <Form.Select
          name="typeSejour"
          value={postData.typeSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_stay_type', 'Sélectionnez')}</option>
          <option value="detente">{t('relaxation', 'Détente & Bien-être')}</option>
          <option value="decouverte">{t('discovery', 'Découverte touristique')}</option>
          <option value="sportif">{t('sports', 'Sportif & Aventure')}</option>
          <option value="culturel">{t('cultural', 'Culturel & Historique')}</option>
          <option value="bien_etre">{t('wellness', 'Bien-être & Spa')}</option>
          <option value="gastronomique">{t('gastronomic', 'Gastronomique')}</option>
          <option value="familial">{t('family', 'Familial')}</option>
          <option value="romantique">{t('romantic', 'Romantique & Luna de miel')}</option>
          <option value="affaires">{t('business', 'Affaires & Conférences')}</option>
          <option value="ecologique">{t('eco', 'Écologique & Nature')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'regionSejour': (
      <Form.Group key="regionSejour">
        <Form.Label>🗺️ {t('stay_region', 'Région du séjour')}</Form.Label>
        <Form.Select
          name="regionSejour"
          value={postData.regionSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_region_stay', 'Sélectionnez une région')}</option>
          <option value="cote_algeroise">{t('algiers_coast', 'Côte algéroise')}</option>
          <option value="kabylie">{t('kabylie', 'Kabylie')}</option>
          <option value="oranie">{t('oranie', 'Oranie')}</option>
          <option value="constantinoise">{t('constantinoise', 'Constantinoise')}</option>
          <option value="annaba_skikda">{t('annaba_skikda', 'Annaba-Skikda')}</option>
          <option value="sahara">{t('sahara', 'Sahara')}</option>
          <option value="hauts_plateaux">{t('high_plateaus', 'Hauts Plateaux')}</option>
          <option value="tlemcen">{t('tlemcen_region', 'Région de Tlemcen')}</option>
          <option value="international">{t('international', 'International')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'dureeSejour': (
      <Form.Group key="dureeSejour">
        <Form.Label>⏱️ {t('stay_duration', 'Durée du séjour')}</Form.Label>
        <Form.Select
          name="dureeSejour"
          value={postData.dureeSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_duration', 'Sélectionnez')}</option>
          <option value="weekend">{t('weekend', 'Week-end (2-3 jours)')}</option>
          <option value="courte">4-7 {t('days', 'jours')}</option>
          <option value="moyenne">8-14 {t('days', 'jours')}</option>
          <option value="longue">15-21 {t('days', 'jours')}</option>
          <option value="tres_longue">22+ {t('days', 'jours')}</option>
          <option value="sur_mesure">{t('custom', 'Sur mesure')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'activitesSejour': (
      <Form.Group key="activitesSejour">
        <Form.Label>🎯 {t('stay_activities', 'Activités incluses')}</Form.Label>
        <Form.Control
          as="textarea"
          name="activitesSejour"
          value={postData.activitesSejour || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_activities', 'Listez les activités proposées (randonnée, visites, sports, etc.)...')}
          rows={3}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'formuleSejour': (
      <Form.Group key="formuleSejour">
        <Form.Label>📋 {t('stay_package', 'Formule')}</Form.Label>
        <Form.Select
          name="formuleSejour"
          value={postData.formuleSejour || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_package', 'Sélectionnez')}</option>
          <option value="tout_inclus">{t('all_inclusive', 'Tout inclus (All Inclusive)')}</option>
          <option value="demi_pension">{t('half_board', 'Demi-pension')}</option>
          <option value="pension_complete">{t('full_board', 'Pension complète')}</option>
          <option value="petit_dejeuner">{t('breakfast_only', 'Petit déjeuner uniquement')}</option>
          <option value="sans_repas">{t('no_meals', 'Sans repas')}</option>
          <option value="formule_sur_mesure">{t('custom_package', 'Formule sur mesure')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'publicCible': (
      <Form.Group key="publicCible">
        <Form.Label>👥 {t('target_audience', 'Public cible')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="publicFamille"
            label={t('family', 'Familles')}
            checked={postData.publicFamille || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicCouple"
            label={t('couples', 'Couples')}
            checked={postData.publicCouple || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicSolo"
            label={t('solo', 'Voyageurs solo')}
            checked={postData.publicSolo || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicGroupes"
            label={t('groups', 'Groupes')}
            checked={postData.publicGroupes || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicSeniors"
            label={t('seniors', 'Seniors')}
            checked={postData.publicSeniors || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicJeunes"
            label={t('youth', 'Jeunes')}
            checked={postData.publicJeunes || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="publicEntreprises"
            label={t('corporate', 'Entreprises')}
            checked={postData.publicEntreprises || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    'optionsReservation': (
      <Form.Group key="optionsReservation">
        <Form.Label>⚙️ {t('reservation_options', 'Options de réservation')}</Form.Label>
        <div className="mb-2">
          <Form.Check
            type="checkbox"
            name="optionGuide"
            label={t('guide_option', 'Guide local inclus')}
            checked={postData.optionGuide || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="optionTransport"
            label={t('transport_option', 'Transport sur place')}
            checked={postData.optionTransport || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="optionAssurance"
            label={t('insurance_option', 'Assurance voyage')}
            checked={postData.optionAssurance || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="optionFlexibilite"
            label={t('flexibility_option', 'Flexibilité des dates')}
            checked={postData.optionFlexibilite || false}
            onChange={handleCheckboxChange}
            className="mb-1"
          />
          <Form.Check
            type="checkbox"
            name="optionAnnulation"
            label={t('cancellation_option', 'Annulation gratuite')}
            checked={postData.optionAnnulation || false}
            onChange={handleCheckboxChange}
          />
        </div>
      </Form.Group>
    ),
    
    // ==================== CROISIÈRE ====================
    'compagnieCroisiere': (
      <Form.Group key="compagnieCroisiere">
        <Form.Label>🚢 {t('cruise_company', 'Compagnie de croisière')}</Form.Label>
        <Form.Select
          name="compagnieCroisiere"
          value={postData.compagnieCroisiere || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_cruise_company', 'Sélectionnez')}</option>
          <option value="msc">MSC Croisières</option>
          <option value="costa">Costa Croisières</option>
          <option value="royal_caribbean">Royal Caribbean</option>
          <option value="norwegian">Norwegian Cruise Line</option>
          <option value="celebrity">Celebrity Cruises</option>
          <option value="carnival">Carnival Cruise Line</option>
          <option value="princess">Princess Cruises</option>
          <option value="disney">Disney Cruise Line</option>
          <option value="holland">Holland America Line</option>
          <option value="silversea">Silversea Cruises</option>
          <option value="autre">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'departCroisiere': (
      <Form.Group key="departCroisiere">
        <Form.Label>⛵ {t('cruise_departure', 'Port de départ')}</Form.Label>
        <Form.Select
          name="departCroisiere"
          value={postData.departCroisiere || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_departure_port', 'Sélectionnez')}</option>
          <option value="algiers">{t('algiers_port', 'Alger')}</option>
          <option value="oran">{t('oran_port', 'Oran')}</option>
          <option value="annaba">{t('annaba_port', 'Annaba')}</option>
          <option value="skikda">{t('skikda_port', 'Skikda')}</option>
          <option value="bejaia">{t('bejaia_port', 'Béjaïa')}</option>
          <option value="barcelone">{t('barcelona', 'Barcelone (Espagne)')}</option>
          <option value="marseille">{t('marseille', 'Marseille (France)')}</option>
          <option value="genoa">{t('genoa', 'Gênes (Italie)')}</option>
          <option value="rome">{t('rome', 'Rome (Italie)')}</option>
          <option value="athenes">{t('athens', 'Athènes (Grèce)')}</option>
          <option value="dubai">{t('dubai', 'Dubai (Émirats)')}</option>
          <option value="autre">{t('other_port', 'Autre port')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'destinationCroisiere': (
      <Form.Group key="destinationCroisiere">
        <Form.Label>🌊 {t('cruise_destination', 'Destination croisière')}</Form.Label>
        <Form.Select
          name="destinationCroisiere"
          value={postData.destinationCroisiere || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_cruise_destination', 'Sélectionnez')}</option>
          <option value="mediterranee">{t('mediterranean', 'Méditerranée')}</option>
          <option value="caraibes">{t('caribbean', 'Caraïbes')}</option>
          <option value="baltique">{t('baltic', 'Mer Baltique')}</option>
          <option value="norvege">{t('norway', 'Norvège (fjords)')}</option>
          <option value="grece">{t('greece', 'Grèce (îles)')}</option>
          <option value="asie">{t('asia', 'Asie du Sud-Est')}</option>
          <option value="pacifique">{t('pacific', 'Pacifique Sud')}</option>
          <option value="monde">{t('world', 'Tour du monde')}</option>
          <option value="autre">{t('other_destination', 'Autre destination')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'dureeCroisiere': (
      <Form.Group key="dureeCroisiere">
        <Form.Label>⏱️ {t('cruise_duration', 'Durée de la croisière')}</Form.Label>
        <Form.Select
          name="dureeCroisiere"
          value={postData.dureeCroisiere || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_duration', 'Sélectionnez')}</option>
          <option value="courte">3-5 {t('days', 'jours')}</option>
          <option value="moyenne">6-10 {t('days', 'jours')}</option>
          <option value="longue">11-14 {t('days', 'jours')}</option>
          <option value="tres_longue">15-21 {t('days', 'jours')}</option>
          <option value="long_voyage">22+ {t('days', 'jours')}</option>
          <option value="autour_monde">{t('world', 'Tour du monde (3+ mois)')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'escalesCroisiere': (
      <Form.Group key="escalesCroisiere">
        <Form.Label>📍 {t('cruise_stops', 'Escales principales')}</Form.Label>
        <Form.Control
          as="textarea"
          name="escalesCroisiere"
          value={postData.escalesCroisiere || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_stops', 'Ex: Barcelone, Marseille, Gênes, Naples, Palerme...')}
          rows={2}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeCabine': (
      <Form.Group key="typeCabine">
        <Form.Label>🛏️ {t('cabin_type', 'Type de cabine')}</Form.Label>
        <Form.Select
          name="typeCabine"
          value={postData.typeCabine || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_cabin_type', 'Sélectionnez')}</option>
          <option value="interieure">{t('inside', 'Intérieure')}</option>
          <option value="exterieure">{t('outside', 'Extérieure avec hublot')}</option>
          <option value="balcon">{t('balcony', 'Cabine avec balcon')}</option>
          <option value="suite">{t('suite', 'Suite')}</option>
          <option value="familiale">{t('family', 'Familiale')}</option>
          <option value="promenade">{t('promenade', 'Promenade')}</option>
          <option value="spa">{t('spa', 'Spa Suite')}</option>
          <option value="presidentielle">{t('presidential', 'Présidentielle')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'reservationEarlyBird': (
      <Form.Group key="reservationEarlyBird">
        <Form.Label>🎫 {t('early_bird_booking', 'Réservation Early Bird')}</Form.Label>
        <div className="mb-3">
          <Form.Check
            type="checkbox"
            name="earlyBirdDisponible"
            label={t('early_bird_available', 'Offre Early Bird disponible')}
            checked={postData.earlyBirdDisponible || false}
            onChange={handleCheckboxChange}
            className="mb-2"
          />
          
          {postData.earlyBirdDisponible && (
            <>
              <Row className="g-2 mb-2">
                <Col md={6}>
                  <Form.Label className="small">{t('early_bird_discount', 'Réduction Early Bird')}</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="number"
                      name="reductionEarlyBird"
                      value={postData.reductionEarlyBird || ''}
                      onChange={handleChangeInput}
                      placeholder="Ex: 15"
                      min="0"
                      max="50"
                    />
                    <InputGroup.Text>%</InputGroup.Text>
                  </InputGroup>
                </Col>
                <Col md={6}>
                  <Form.Label className="small">{t('early_bird_deadline', 'Date limite Early Bird')}</Form.Label>
                  <Form.Control
                    type="date"
                    name="dateLimiteEarlyBird"
                    value={postData.dateLimiteEarlyBird || ''}
                    onChange={handleChangeInput}
                  />
                </Col>
              </Row>
            </>
          )}
        </div>
      </Form.Group>
    ),
    
    // ==================== AUTRE ====================
    'descriptionSpecifique': (
      <Form.Group key="descriptionSpecifique">
        <Form.Label>📝 {t('specific_description', 'Description spécifique')}</Form.Label>
        <Form.Control
          as="textarea"
          name="descriptionSpecifique"
          value={postData.descriptionSpecifique || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_specific_description', 'Décrivez votre service voyage en détail...')}
          rows={4}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeServiceVoyage': (
      <Form.Group key="typeServiceVoyage">
        <Form.Label>🔧 {t('travel_service_type', 'Type de service voyage')}</Form.Label>
        <Form.Select
          name="typeServiceVoyage"
          value={postData.typeServiceVoyage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_service_type', 'Sélectionnez')}</option>
          <option value="transport">{t('transport_service', 'Service de transport')}</option>
          <option value="guide">{t('guide_service', 'Guide touristique')}</option>
          <option value="evenementiel">{t('event_service', 'Événementiel voyage')}</option>
          <option value="logistique">{t('logistics', 'Logistique voyage')}</option>
          <option value="assurance">{t('insurance_service', 'Assurance voyage')}</option>
          <option value="billet">{t('ticket_service', 'Billeterie')}</option>
          <option value="autre_service">{t('other_service', 'Autre service')}</option>
        </Form.Select>
      </Form.Group>
    )
  };
  
  // Lógica de renderizado
  const subCategoryFields = getSubCategorySpecificFields();
  
  console.log('✈️ VoyagesFields - Renderizando:', {
    subCategory,
    fieldName,
    fieldsCount: subCategoryFields.length,
    fields: subCategoryFields
  });
  
  // Si se solicita un campo específico
  if (fieldName) {
    const fieldComponent = fields[fieldName];
    if (!fieldComponent) {
      console.error(`❌ Campo '${fieldName}' no encontrado en VoyagesFields`);
      return (
        <div className="alert alert-danger">
          <strong>Error:</strong> Campo '{fieldName}' no está definido para voyages.
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
        <strong>✈️ Información:</strong> Selecciona una subcategoría de voyages para ver los campos específicos.
      </div>
    );
  }
  
  // Si la subcategoría no tiene campos definidos
  return (
    <div className="alert alert-warning">
      <strong>⚠️ Advertencia:</strong> La subcategoría '{subCategory}' no tiene campos definidos.
    </div>
  );
};

export default VoyagesFields;