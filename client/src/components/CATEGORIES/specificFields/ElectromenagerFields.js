import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ElectromenagerFields = ({ fieldName, postData, handleChangeInput, subCategory, isRTL }) => {
  const { t } = useTranslation();
  
  // ✅ FUNCIÓN ACTUALIZADA CON TUS SUBCATEGORÍAS DE ELECTROMÉNAGER
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'televiseurs': {
        'marque': 'marque',
        'modele': 'modele',
        'tailleEcran': 'tailleEcran',
        'resolution': 'resolution',
        'typeEcran': 'typeEcran',
        'smartTv': 'smartTv',
        'connectivite': 'connectivite',
        'anneeFabrication': 'anneeFabrication',
        'garantie': 'garantie',
        'etat': 'etat'
      },
      'demodulateurs_box_tv': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'connectivite': 'connectivite',
        'fonctions': 'fonctions',
        'controleParental': 'controleParental',
        'etat': 'etat'
      },
      'paraboles_switch_tv': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'diametreParabole': 'diametreParabole',
        'nombreTetes': 'nombreTetes',
        'compatible': 'compatible',
        'etat': 'etat'
      },
      'abonnements_iptv': {
        'typeAbonnement': 'typeAbonnement',
        'fournisseur': 'fournisseur',
        'duree': 'duree',
        'nombreChaines': 'nombreChaines',
        'resolution': 'resolution',
        'compatible': 'compatible',
        'prixMensuel': 'prixMensuel',
        'etat': 'etat'
      },
      'cameras_accessories': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'resolution': 'resolution',
        'zoom': 'zoom',
        'stabilisation': 'stabilisation',
        'connectivite': 'connectivite',
        'accessoiresInclus': 'accessoiresInclus',
        'etat': 'etat'
      },
      'audio': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'puissance': 'puissance',
        'connectivite': 'connectivite',
        'compatible': 'compatible',
        'dimensions': 'dimensions',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'refrigerateurs_congelateurs': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'capacite': 'capacite',
        'classeEnergetique': 'classeEnergetique',
        'typeFroid': 'typeFroid',
        'dimensions': 'dimensions',
        'couleur': 'couleur',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'machines_laver': {
        'typeMachine': 'typeMachine',
        'marque': 'marque',
        'modele': 'modele',
        'capacite': 'capacite',
        'classeEnergetique': 'classeEnergetique',
        'vitesseEssorage': 'vitesseEssorage',
        'programmes': 'programmes',
        'dimensions': 'dimensions',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'lave_vaisselles': {
        'marque': 'marque',
        'modele': 'modele',
        'capacite': 'capacite',
        'classeEnergetique': 'classeEnergetique',
        'programmes': 'programmes',
        'consommationEau': 'consommationEau',
        'dimensions': 'dimensions',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'fours_cuisson': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'typeEnergie': 'typeEnergie',
        'capacite': 'capacite',
        'puissance': 'puissance',
        'fonctions': 'fonctions',
        'dimensions': 'dimensions',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'chauffage_climatisation': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'puissance': 'puissance',
        'typeEnergie': 'typeEnergie',
        'surfaceChauffe': 'surfaceChauffe',
        'filtres': 'filtres',
        'telecommande': 'telecommande',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'appareils_cuisine': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'puissance': 'puissance',
        'capacite': 'capacite',
        'fonctions': 'fonctions',
        'materiau': 'materiau',
        'couleur': 'couleur',
        'accessoires': 'accessoires',
        'etat': 'etat'
      },
      'aspirateurs_nettoyeurs': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'puissance': 'puissance',
        'typeAspiration': 'typeAspiration',
        'capaciteReservoir': 'capaciteReservoir',
        'filtres': 'filtres',
        'accessoires': 'accessoires',
        'etat': 'etat'
      },
      'repassage': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'puissance': 'puissance',
        'surfaceRepassage': 'surfaceRepassage',
        'reglageTemperature': 'reglageTemperature',
        'vapeur': 'vapeur',
        'capaciteReservoir': 'capaciteReservoir',
        'etat': 'etat'
      },
      'beaute_hygiene': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'fonctions': 'fonctions',
        'puissance': 'puissance',
        'accessoires': 'accessoires',
        'couleur': 'couleur',
        'etatBatterie': 'etatBatterie',
        'etat': 'etat'
      },
      'machines_coudre': {
        'marque': 'marque',
        'modele': 'modele',
        'typeMachine': 'typeMachine',
        'pointsCouture': 'pointsCouture',
        'programmes': 'programmes',
        'vitesse': 'vitesse',
        'accessoires': 'accessoires',
        'anneeFabrication': 'anneeFabrication',
        'etat': 'etat'
      },
      'telecommandes': {
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'typeBatterie': 'typeBatterie',
        'fonctions': 'fonctions',
        'couleur': 'couleur',
        'etat': 'etat'
      },
      'securite_gps': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'fonctions': 'fonctions',
        'connectivite': 'connectivite',
        'batterie': 'batterie',
        'compatible': 'compatible',
        'etat': 'etat'
      },
      'composants_electroniques': {
        'typeComposant': 'typeComposant',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'caracteristiques': 'caracteristiques',
        'etat': 'etat'
      },
      'pieces_rechange': {
        'typePiece': 'typePiece',
        'marque': 'marque',
        'modele': 'modele',
        'compatible': 'compatible',
        'etat': 'etat'
      },
      'autre': {
        'typeAppareil': 'typeAppareil',
        'marque': 'marque',
        'modele': 'modele',
        'description': 'description',
        'etat': 'etat'
      }
    };
    
    return specificFields[subCategory] || {};
  };
  
  // Tu objeto de fields existente (pero necesitarás AGREGAR campos nuevos)
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
          <option value="">{t('select_brand', 'Sélectionnez la marque')}</option>
          {/* GRUPO TV y Audio */}
          <optgroup label={t('tv_audio_brands', 'TV & Audio')}>
            <option value="samsung">📺 Samsung</option>
            <option value="lg">📺 LG</option>
            <option value="sony">📺 Sony</option>
            <option value="panasonic">📺 Panasonic</option>
            <option value="philips">📺 Philips</option>
            <option value="sharp">📺 Sharp</option>
            <option value="tcl">📺 TCL</option>
            <option value="hisense">📺 Hisense</option>
          </optgroup>
          
          {/* GRUPO Electrodomésticos */}
          <optgroup label={t('appliance_brands', 'Electrodoméstiques')}>
            <option value="whirlpool">🧼 Whirlpool</option>
            <option value="bosch">🧼 Bosch</option>
            <option value="siemens">🧼 Siemens</option>
            <option value="electrolux">🧼 Electrolux</option>
            <option value="miele">🧼 Miele</option>
            <option value="hotpoint">🧼 Hotpoint</option>
            <option value="candy">🧼 Candy</option>
            <option value="indesit">🧼 Indesit</option>
            <option value="beko">🧼 Beko</option>
            <option value="daewoo">🧼 Daewoo</option>
          </optgroup>
          
          {/* GRUPO Cocina */}
          <optgroup label={t('kitchen_brands', 'Cuisine')}>
            <option value="kenwood">🍳 Kenwood</option>
            <option value="moulinex">🍳 Moulinex</option>
            <option value="severin">🍳 Severin</option>
            <option value="braun">🍳 Braun</option>
            <option value="krups">🍳 Krups</option>
            <option value="tefal">🍳 Tefal</option>
            <option value="rowenta">🍳 Rowenta</option>
            <option value="philips">🍳 Philips</option>
          </optgroup>
          
          <option value="autre">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'modele': (
      <Form.Group>
        <Form.Label>📦 {t('model', 'Modèle')}</Form.Label>
        <Form.Control
          type="text"
          name="modele"
          value={postData.modele || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_model', 'Ex: UE43TU7025, WM14F5Q2A, KGN39VI30P...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'tailleEcran': (
      <Form.Group>
        <Form.Label>📺 {t('screen_size', 'Taille écran')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="tailleEcran"
              value={postData.tailleEcran || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 43, 55, 65"
              min="0"
              step="1"
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
              <option value="cm">cm</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'resolution': (
      <Form.Group>
        <Form.Label>📺 {t('resolution', 'Résolution')}</Form.Label>
        <Form.Select
          name="resolution"
          value={postData.resolution || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_resolution', 'Sélectionnez résolution')}</option>
          <option value="hd">HD (1366x768)</option>
          <option value="full_hd">Full HD (1920x1080)</option>
          <option value="2k">2K (2560x1440)</option>
          <option value="4k">4K (3840x2160)</option>
          <option value="8k">8K (7680x4320)</option>
          <option value="uhd">UHD</option>
        </Form.Select>
      </Form.Group>
    ),
    
    // AGREGAR ESTOS CAMPOS NUEVOS:
    'typeAppareil': (
      <Form.Group>
        <Form.Label>🔌 {t('appliance_type', 'Type d\'appareil')}</Form.Label>
        <Form.Select
          name="typeAppareil"
          value={postData.typeAppareil || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_appliance_type', 'Sélectionnez type')}</option>
          <option value="televiseur">📺 Téléviseur</option>
          <option value="home_cinema">🎬 Home cinéma</option>
          <option value="barre_son">🔊 Barre de son</option>
          <option value="enceinte">🔊 Enceinte</option>
          <option value="ampli">🔊 Amplificateur</option>
          <option value="refrigerateur">❄️ Réfrigérateur</option>
          <option value="congelateur">❄️ Congélateur</option>
          <option value="lave_linge">🧼 Lave-linge</option>
          <option value="seche_linge">🧼 Sèche-linge</option>
          <option value="lave_vaisselle">🍽️ Lave-vaisselle</option>
          <option value="four">🔥 Four</option>
          <option value="table_cuisson">🔥 Table de cuisson</option>
          <option value="hotte">🔥 Hotte</option>
          <option value="climatiseur">🌡️ Climatiseur</option>
          <option value="chauffage">🌡️ Chauffage</option>
          <option value="aspirateur">🧹 Aspirateur</option>
          <option value="robot_menager">🍳 Robot ménager</option>
          <option value="cafetiere">☕ Cafetière</option>
          <option value="fer_repasser">♨️ Fer à repasser</option>
          <option value="machine_coudre">🧵 Machine à coudre</option>
          <option value="autre">❓ Autre</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'capacite': (
      <Form.Group>
        <Form.Label>📏 {t('capacity', 'Capacité')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="capacite"
              value={postData.capacite || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 8, 12, 300"
              min="0"
              step="0.5"
            />
          </Col>
          <Col>
            <Form.Select
              name="capaciteUnite"
              value={postData.capaciteUnite || 'kg'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="kg">kg</option>
              <option value="litres">litres</option>
              <option value="m3">m³</option>
              <option value="pouces">pouces</option>
              <option value="pieces">pièces</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'classeEnergetique': (
      <Form.Group>
        <Form.Label>⚡ {t('energy_class', 'Classe énergétique')}</Form.Label>
        <Form.Select
          name="classeEnergetique"
          value={postData.classeEnergetique || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_energy_class', 'Sélectionnez classe')}</option>
          <option value="A+++">A+++ (Très économe)</option>
          <option value="A++">A++ (Très économe)</option>
          <option value="A+">A+ (Économe)</option>
          <option value="A">A (Économe)</option>
          <option value="B">B (Bon)</option>
          <option value="C">C (Moyen)</option>
          <option value="D">D (Élevé)</option>
          <option value="E">E (Très élevé)</option>
          <option value="F">F (Excessif)</option>
          <option value="G">G (Très excessif)</option>
        </Form.Select>
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
          placeholder="Ex: 1200, 2000, 3500"
          min="0"
        />
      </Form.Group>
    ),
    
    'dimensions': (
      <Form.Group>
        <Form.Label>📐 {t('dimensions', 'Dimensions')}</Form.Label>
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="number"
              name="largeur"
              value={postData.largeur || ''}
              onChange={handleChangeInput}
              placeholder={t('width', 'Largeur')}
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="hauteur"
              value={postData.hauteur || ''}
              onChange={handleChangeInput}
              placeholder={t('height', 'Hauteur')}
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="profondeur"
              value={postData.profondeur || ''}
              onChange={handleChangeInput}
              placeholder={t('depth', 'Profondeur')}
              min="0"
              step="0.1"
            />
          </Col>
        </Row>
        <Form.Select
          name="uniteDimensions"
          value={postData.uniteDimensions || 'cm'}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="m">m</option>
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
          <option value="">{t('select_color', 'Sélectionnez couleur')}</option>
          <option value="blanc">⚪ Blanc</option>
          <option value="noir">⚫ Noir</option>
          <option value="inox">🔘 Inox</option>
          <option value="argent">🔘 Argent</option>
          <option value="gris">🔘 Gris</option>
          <option value="bleu">🔵 Bleu</option>
          <option value="rouge">🔴 Rouge</option>
          <option value="vert">🟢 Vert</option>
          <option value="jaune">🟡 Jaune</option>
          <option value="multicolore">🌈 Multicolore</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'anneeFabrication': (
      <Form.Group>
        <Form.Label>📅 {t('manufacture_year', 'Année de fabrication')}</Form.Label>
        <Form.Select
          name="anneeFabrication"
          value={postData.anneeFabrication || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_year', 'Sélectionnez année')}</option>
          {Array.from({length: 15}, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </Form.Group>
    ),
    
    'garantie': (
      <Form.Group>
        <Form.Label>🛡️ {t('warranty', 'Garantie restante')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="garantie"
              value={postData.garantie || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 12, 24, 36"
              min="0"
            />
          </Col>
          <Col>
            <Form.Select
              name="garantieUnite"
              value={postData.garantieUnite || 'mois'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="mois">{t('months', 'mois')}</option>
              <option value="annees">{t('years', 'années')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'etat': (
      <Form.Group>
        <Form.Label>🔄 {t('condition', 'État')}</Form.Label>
        <Form.Select
          name="etat"
          value={postData.etat || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_condition', 'Sélectionnez état')}</option>
          <option value="neuf">{t('new', 'Neuf avec étiquette')}</option>
          <option value="tres_bon">{t('very_good', 'Très bon état')}</option>
          <option value="bon">{t('good', 'Bon état')}</option>
          <option value="moyen">{t('fair', 'État moyen')}</option>
          <option value="reparation">{t('needs_repair', 'Nécessite réparation')}</option>
          <option value="pour_pieces">{t('for_parts', 'Pour pièces')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'connectivite': (
      <Form.Group>
        <Form.Label>🔗 {t('connectivity', 'Connectivité')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="checkbox"
            name="wifi"
            label="Wi-Fi"
            checked={postData.wifi || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="bluetooth"
            label="Bluetooth"
            checked={postData.bluetooth || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="hdmi"
            label="HDMI"
            checked={postData.hdmi || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="usb"
            label="USB"
            checked={postData.usb || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="ethernet"
            label="Ethernet"
            checked={postData.ethernet || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="nfc"
            label="NFC"
            checked={postData.nfc || false}
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
          placeholder={t('enter_compatibility', 'Ex: Samsung UE43, LG 55UQ...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'fonctions': (
      <Form.Group>
        <Form.Label>⚙️ {t('functions', 'Fonctions')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="checkbox"
            name="smartTv"
            label="Smart TV"
            checked={postData.smartTv || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="hdr"
            label="HDR"
            checked={postData.hdr || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="3d"
            label="3D"
            checked={postData['3d'] || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="voiceControl"
            label={t('voice_control', 'Contrôle vocal')}
            checked={postData.voiceControl || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="recording"
            label={t('recording', 'Enregistrement')}
            checked={postData.recording || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    ),
    
    'accessoiresInclus': (
      <Form.Group>
        <Form.Label>📦 {t('accessories_included', 'Accessoires inclus')}</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          <Form.Check
            type="checkbox"
            name="telecommande"
            label={t('remote', 'Télécommande')}
            checked={postData.telecommande || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="support"
            label={t('stand', 'Support')}
            checked={postData.support || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="cables"
            label={t('cables', 'Câbles')}
            checked={postData.cables || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="manuel"
            label={t('manual', 'Manuel')}
            checked={postData.manuel || false}
            onChange={handleChangeInput}
          />
          <Form.Check
            type="checkbox"
            name="batteries"
            label={t('batteries', 'Batteries')}
            checked={postData.batteries || false}
            onChange={handleChangeInput}
          />
        </div>
      </Form.Group>
    )
    // ... AGREGAR MÁS CAMPOS SEGÚN NECESITES
  };
  
  // ✅ AQUÍ USAS LA FUNCIÓN
  const subCategoryFields = getSubCategorySpecificFields();
  
  // Si fieldName está especificado, devolver ese campo
  if (fieldName) {
    const fieldComponent = fields[fieldName];
    if (!fieldComponent) {
      console.warn(`⚠️ Campo "${fieldName}" no encontrado en ElectromenagerFields para "${subCategory}"`);
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
    const subCategoryId = subCategory; // ej: 'televiseurs'
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

export default ElectromenagerFields;