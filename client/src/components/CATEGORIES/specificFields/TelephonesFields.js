import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const TelephonesFields = ({ fieldName, postData, handleChangeInput, subCategory, isRTL }) => {
  const { t } = useTranslation();
  
  // ✅ FUNCIÓN ACTUALIZADA CON LAS SUBCATEGORÍAS DE TÉLÉPHONES
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'smartphones': {
        'marque': 'marque',
        'modele': 'modele',
        'etat': 'etat',
        'capaciteStockage': 'capaciteStockage',
        'couleur': 'couleur',
        'systemeExploitation': 'systemeExploitation',
        'tailleEcran': 'tailleEcran',
        'ram': 'ram',
        'batterie': 'batterie',
        'reseau': 'reseau',
        'capteurEmpreinte': 'capteurEmpreinte',
        'faceid': 'faceid',
        'doubleSim': 'doubleSim',
        'typeChargeur': 'typeChargeur',
        'garantie': 'garantie',
        'imei': 'imei'
      },
      'telephones_cellulaires': {
        'marque': 'marque',
        'modele': 'modele',
        'etat': 'etat',
        'couleur': 'couleur',
        'typeTelephone': 'typeTelephone',
        'reseau': 'reseau',
        'doubleSim': 'doubleSim',
        'batterie': 'batterie',
        'garantie': 'garantie'
      },
      'tablettes': {
        'marque': 'marque',
        'modele': 'modele',
        'etat': 'etat',
        'capaciteStockage': 'capaciteStockage',
        'couleur': 'couleur',
        'systemeExploitation': 'systemeExploitation',
        'tailleEcran': 'tailleEcran',
        'ram': 'ram',
        'batterie': 'batterie',
        'reseau': 'reseau',
        'connectivite': 'connectivite',
        'garantie': 'garantie'
      },
      'fixes_fax': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'etat': 'etat',
        'couleur': 'couleur',
        'fonctions': 'fonctions',
        'connectivite': 'connectivite',
        'garantie': 'garantie'
      },
      'smartwatchs': {
        'marque': 'marque',
        'modele': 'modele',
        'etat': 'etat',
        'couleur': 'couleur',
        'systemeExploitation': 'systemeExploitation',
        'tailleEcran': 'tailleEcran',
        'batterie': 'batterie',
        'compatible': 'compatible',
        'fonctions': 'fonctions',
        'garantie': 'garantie'
      },
      'protection_antichoc': {
        'typeProtection': 'typeProtection',
        'marque': 'marque',
        'modeleCompatible': 'modeleCompatible',
        'couleur': 'couleur',
        'materiau': 'materiau',
        'etat': 'etat'
      },
      'ecouteurs_son': {
        'typeEcouteurs': 'typeEcouteurs',
        'marque': 'marque',
        'modele': 'modele',
        'couleur': 'couleur',
        'connectivite': 'connectivite',
        'micro': 'micro',
        'cancellationBruit': 'cancellationBruit',
        'etat': 'etat'
      },
      'chargeurs_cables': {
        'typeAccessoire': 'typeAccessoire',
        'marque': 'marque',
        'modeleCompatible': 'modeleCompatible',
        'typeConnecteur': 'typeConnecteur',
        'longueur': 'longueur',
        'puissance': 'puissance',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'supports_stabilisateurs': {
        'typeSupport': 'typeSupport',
        'marque': 'marque',
        'modeleCompatible': 'modeleCompatible',
        'materiau': 'materiau',
        'ajustable': 'ajustable',
        'etat': 'etat'
      },
      'manettes': {
        'typeManette': 'typeManette',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'connectivite': 'connectivite',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'vr': {
        'typeVR': 'typeVR',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'resolution': 'resolution',
        'champVision': 'champVision',
        'etat': 'etat'
      },
      'power_banks': {
        'marque': 'marque',
        'modele': 'modele',
        'capacite': 'capacite',
        'nombrePorts': 'nombrePorts',
        'typeCharge': 'typeCharge',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'stylets': {
        'typeStylet': 'typeStylet',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'pression': 'pression',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'cartes_memoire': {
        'typeCarte': 'typeCarte',
        'marque': 'marque',
        'capacite': 'capacite',
        'vitesse': 'vitesse',
        'classe': 'classe',
        'etat': 'etat'
      },
      'accessoires': {
        'typeAccessoire': 'typeAccessoire',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'pieces_rechange': {
        'typePiece': 'typePiece',
        'marque': 'marque',
        'modeleCompatible': 'modeleCompatible',
        'etat': 'etat'
      },
      'offres_abonnements': {
        'typeOffre': 'typeOffre',
        'operateur': 'operateur',
        'duree': 'duree',
        'dataIncluse': 'dataIncluse',
        'appelsInclus': 'appelsInclus',
        'smsInclus': 'smsInclus',
        'prixMensuel': 'prixMensuel',
        'engagement': 'engagement'
      }
    };
    
    return specificFields[subCategory] || {};
  };
  
  // Tu objeto de fields existente (necesitas AGREGAR campos nuevos)
  const fields = {
    'marque': (
      <Form.Group>
        <Form.Label>🏷️ {t('brand', 'Marque')}</Form.Label>
        <Form.Select
          name="marque"
          value={postData.marque || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'modele': (
      <Form.Group>
        <Form.Label>📱 {t('model', 'Modèle')}</Form.Label>
        <Form.Control
          type="text"
          name="modele"
          value={postData.modele || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_model', 'Ex: iPhone 13, Galaxy S21, Redmi Note 10...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'etat': (
      <Form.Group>
        <Form.Label>🔧 {t('condition', 'État')}</Form.Label>
        <Form.Select
          name="etat"
          value={postData.etat || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'capaciteStockage': (
      <Form.Group>
        <Form.Label>💾 {t('storage', 'Stockage')}</Form.Label>
        <Form.Select
          name="capaciteStockage"
          value={postData.capaciteStockage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'couleur': (
      <Form.Group>
        <Form.Label>🎨 {t('color', 'Couleur')}</Form.Label>
        <Form.Select
          name="couleur"
          value={postData.couleur || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'systemeExploitation': (
      <Form.Group>
        <Form.Label>🖥️ {t('os', 'Système d\'exploitation')}</Form.Label>
        <Form.Select
          name="systemeExploitation"
          value={postData.systemeExploitation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'tailleEcran': (
      <Form.Group>
        <Form.Label>📱 {t('screen_size', 'Taille écran')} (pouces)</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="tailleEcran"
              value={postData.tailleEcran || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 6.1"
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Select
              name="tailleEcranUnite"
              value={postData.tailleEcranUnite || 'pouces'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="pouces">{t('inches', 'pouces')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'ram': (
      <Form.Group>
        <Form.Label>⚡ {t('ram', 'RAM')}</Form.Label>
        <Form.Select
          name="ram"
          value={postData.ram || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'batterie': (
      <Form.Group>
        <Form.Label>🔋 {t('battery', 'Batterie')} (mAh)</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="batterie"
              value={postData.batterie || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 4000"
              min="0"
            />
          </Col>
          <Col>
            <Form.Select
              name="batterieUnite"
              value={postData.batterieUnite || 'mAh'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="mAh">mAh</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'reseau': (
      <Form.Group>
        <Form.Label>📶 {t('network', 'Réseau')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          {/* ... tu código existente ... */}
        </div>
      </Form.Group>
    ),
    
    'capteurEmpreinte': (
      <Form.Group>
        <Form.Label>👆 {t('fingerprint', 'Capteur d\'empreinte')}</Form.Label>
        <Form.Check
          type="switch"
          name="capteurEmpreinte"
          checked={postData.capteurEmpreinte || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'capteurEmpreinte',
              value: e.target.checked
            }
          })}
          label={postData.capteurEmpreinte ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'faceid': (
      <Form.Group>
        <Form.Label>👁️ {t('face_id', 'Face ID')}</Form.Label>
        <Form.Check
          type="switch"
          name="faceid"
          checked={postData.faceid || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'faceid',
              value: e.target.checked
            }
          })}
          label={postData.faceid ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'doubleSim': (
      <Form.Group>
        <Form.Label>📱 {t('dual_sim', 'Double SIM')}</Form.Label>
        <Form.Check
          type="switch"
          name="doubleSim"
          checked={postData.doubleSim || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'doubleSim',
              value: e.target.checked
            }
          })}
          label={postData.doubleSim ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'typeChargeur': (
      <Form.Group>
        <Form.Label>🔌 {t('charger_type', 'Type de chargeur')}</Form.Label>
        <Form.Select
          name="typeChargeur"
          value={postData.typeChargeur || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* ... tu código existente ... */}
        </Form.Select>
      </Form.Group>
    ),
    
    'garantie': (
      <Form.Group>
        <Form.Label>🛡️ {t('warranty', 'Garantie')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="dureeGarantie"
              value={postData.dureeGarantie || ''}
              onChange={handleChangeInput}
              placeholder={t('warranty_months', 'Mois')}
              min="0"
            />
          </Col>
          <Col>
            <Form.Select
              name="typeGarantie"
              value={postData.typeGarantie || ''}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="">{t('warranty_type', 'Type')}</option>
              <option value="marque">{t('brand_warranty', 'Marque')}</option>
              <option value="vendeur">{t('seller_warranty', 'Vendeur')}</option>
              <option value="officielle">{t('official', 'Officielle')}</option>
              <option value="aucune">{t('none', 'Aucune')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'imei': (
      <Form.Group>
        <Form.Label>🔢 {t('imei', 'Numéro IMEI')}</Form.Label>
        <Form.Control
          type="text"
          name="imei"
          value={postData.imei || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_imei', 'Ex: 123456789012345')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    // ✅ AÑADE ESTOS NUEVOS CAMPOS:
    'typeTelephone': (
      <Form.Group>
        <Form.Label>📞 {t('phone_type', 'Type de téléphone')}</Form.Label>
        <Form.Select
          name="typeTelephone"
          value={postData.typeTelephone || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_phone_type', 'Sélectionnez type')}</option>
          <option value="clapet">📞 Clapet</option>
          <option value="coulissant">📞 Coulissant</option>
          <option value="candybar">📞 Candybar</option>
          <option value="basic">📞 Basique</option>
          <option value="senior">👴 Téléphone senior</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'connectivite': (
      <Form.Group>
        <Form.Label>🔗 {t('connectivity', 'Connectivité')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="checkbox"
            name="bluetooth"
            label="Bluetooth"
            checked={postData.bluetooth || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="wifi"
            label="Wi-Fi"
            checked={postData.wifi || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="nfc"
            label="NFC"
            checked={postData.nfc || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="gps"
            label="GPS"
            checked={postData.gps || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'fonctions': (
      <Form.Group>
        <Form.Label>⚙️ {t('functions', 'Fonctions')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="checkbox"
            name="fax"
            label="Fax"
            checked={postData.fax || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="repondeur"
            label="Répondeur"
            checked={postData.repondeur || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="affichage"
            label="Affichage"
            checked={postData.affichage || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="memoire"
            label="Mémoire contacts"
            checked={postData.memoire || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'compatible': (
      <Form.Group>
        <Form.Label>🔄 {t('compatible_with', 'Compatible avec')}</Form.Label>
        <Form.Control
          type="text"
          name="compatible"
          value={postData.compatible || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_compatibility', 'Ex: iPhone, Android, Windows...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeAppareil': (
      <Form.Group>
        <Form.Label>📞 {t('device_type', 'Type d\'appareil')}</Form.Label>
        <Form.Select
          name="typeAppareil"
          value={postData.typeAppareil || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_device_type', 'Sélectionnez type')}</option>
          <option value="telephone_fixe">☎️ Téléphone fixe</option>
          <option value="fax">📠 Fax</option>
          <option value="combiné">📞 Combiné</option>
          <option value="sans_fil">📞 Sans fil</option>
          <option value="videophone">📹 Vidéophone</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeProtection': (
      <Form.Group>
        <Form.Label>🛡️ {t('protection_type', 'Type de protection')}</Form.Label>
        <Form.Select
          name="typeProtection"
          value={postData.typeProtection || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_protection_type', 'Sélectionnez type')}</option>
          <option value="coque">📱 Coque</option>
          <option value="film">📱 Film protecteur</option>
          <option value="etui">🎒 Étuï</option>
          <option value="bumper">🛡️ Bumper</option>
          <option value="complet">🛡️ Protection complète</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'modeleCompatible': (
      <Form.Group>
        <Form.Label>📱 {t('compatible_model', 'Modèle compatible')}</Form.Label>
        <Form.Control
          type="text"
          name="modeleCompatible"
          value={postData.modeleCompatible || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_compatible_model', 'Ex: iPhone 13, Galaxy S21...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'materiau': (
      <Form.Group>
        <Form.Label>🧱 {t('material', 'Matériau')}</Form.Label>
        <Form.Select
          name="materiau"
          value={postData.materiau || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_material', 'Sélectionnez matériau')}</option>
          <option value="silicone">🔵 Silicone</option>
          <option value="plastique">🔵 Plastique</option>
          <option value="cuir">🐮 Cuir</option>
          <option value="metal">⚙️ Métal</option>
          <option value="caoutchouc">🔵 Caoutchouc</option>
          <option value="tpu">🔵 TPU</option>
          <option value="polycarbonate">🔵 Polycarbonate</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeEcouteurs': (
      <Form.Group>
        <Form.Label>🎧 {t('earphones_type', 'Type d\'écouteurs')}</Form.Label>
        <Form.Select
          name="typeEcouteurs"
          value={postData.typeEcouteurs || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_earphones_type', 'Sélectionnez type')}</option>
          <option value="intra">🎧 Intra-auriculaires</option>
          <option value="circum">🎧 Circum-auriculaires</option>
          <option value="sans_fil">🎧 Sans fil</option>
          <option value="filaire">🎧 Filaires</option>
          <option value="sport">🏃 Écouteurs sport</option>
          <option value="gaming">🎮 Écouteurs gaming</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'micro': (
      <Form.Group>
        <Form.Label>🎤 {t('microphone', 'Microphone')}</Form.Label>
        <Form.Check
          type="switch"
          name="micro"
          checked={postData.micro || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'micro',
              value: e.target.checked
            }
          })}
          label={postData.micro ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'cancellationBruit': (
      <Form.Group>
        <Form.Label>🔇 {t('noise_cancellation', 'Annulation bruit')}</Form.Label>
        <Form.Check
          type="switch"
          name="cancellationBruit"
          checked={postData.cancellationBruit || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'cancellationBruit',
              value: e.target.checked
            }
          })}
          label={postData.cancellationBruit ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'typeAccessoire': (
      <Form.Group>
        <Form.Label>🔧 {t('accessory_type', 'Type d\'accessoire')}</Form.Label>
        <Form.Select
          name="typeAccessoire"
          value={postData.typeAccessoire || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_accessory_type', 'Sélectionnez type')}</option>
          <option value="chargeur">⚡ Chargeur</option>
          <option value="cable">🔌 Câble</option>
          <option value="adaptateur">🔌 Adaptateur</option>
          <option value="support">📐 Support</option>
          <option value="autre">🎁 Autre</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeConnecteur': (
      <Form.Group>
        <Form.Label>🔌 {t('connector_type', 'Type de connecteur')}</Form.Label>
        <Form.Select
          name="typeConnecteur"
          value={postData.typeConnecteur || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_connector_type', 'Sélectionnez type')}</option>
          <option value="usb_c">🔌 USB-C</option>
          <option value="lightning">⚡ Lightning</option>
          <option value="micro_usb">🔌 Micro-USB</option>
          <option value="usb_a">🔌 USB-A</option>
          <option value="type_c">🔌 Type-C</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'longueur': (
      <Form.Group>
        <Form.Label>📏 {t('length', 'Longueur')} (m)</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="longueur"
              value={postData.longueur || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 1, 2, 3"
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Select
              name="longueurUnite"
              value={postData.longueurUnite || 'mètres'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="mètres">m</option>
              <option value="centimetres">cm</option>
              <option value="pouces">pouces</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'puissance': (
      <Form.Group>
        <Form.Label>⚡ {t('power', 'Puissance')} (W)</Form.Label>
        <Form.Control
          type="number"
          name="puissance"
          value={postData.puissance || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 18, 20, 30"
          min="0"
        />
      </Form.Group>
    ),
    
    // ... continúa agregando más campos según necesites
    
  };
  
  // ✅ AQUÍ USAS LA FUNCIÓN
  const subCategoryFields = getSubCategorySpecificFields();
  
  // Si fieldName está especificado, devolver ese campo
  if (fieldName) {
    const fieldComponent = fields[fieldName];
    if (!fieldComponent) {
      console.warn(`⚠️ Campo "${fieldName}" no encontrado en TelephonesFields para "${subCategory}"`);
      return (
        <Form.Group>
          <Form.Text className="text-danger">
            ⚠️ {t('field_not_implemented', 'Champ non implémenté')}: {fieldName}
          </Form.Text>
        </Form.Group>
      );
    }
    return fieldComponent;
  }
  
  // Si no hay fieldName específico, devolver todos los campos de la subcategoría
  if (subCategory && subCategoryFields) {
    const subCategoryId = subCategory; // ej: 'smartphones'
    const fieldsToShow = subCategoryFields[subCategoryId];
    
    if (!fieldsToShow || Object.keys(fieldsToShow).length === 0) {
      return (
        <div className="alert alert-info">
          ℹ️ {t('select_subcategory', 'Sélectionnez une sous-catégorie pour voir les champs')}
        </div>
      );
    }
    
    return (
      <>
        {Object.keys(fieldsToShow).map(key => (
          <div key={key} className="mb-3">
            {fields[fieldsToShow[key]] || (
              <div className="alert alert-warning">
                ⚠️ {t('component_missing', 'Composant manquant')}: {fieldsToShow[key]}
              </div>
            )}
          </div>
        ))}
      </>
    );
  }
  
  return null;
};

export default TelephonesFields;