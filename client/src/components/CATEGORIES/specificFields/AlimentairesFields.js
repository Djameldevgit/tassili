import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AlimentairesFields = ({ fieldName, postData, handleChangeInput, subCategory,   isRTL }) => {
  const { t } = useTranslation();
  
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'produits_laitiers': {
        'typeLaitier': 'typeLaitier',
        'contenance': 'contenance',
        'datePeremption': 'datePeremption',
        'temperatureConservation': 'temperatureConservation'
      },
      'fruits_secs': {
        'typeFruitSec': 'typeFruitSec',
        'conditionnement': 'conditionnement',
        'origine': 'origine',
        'quantite': 'quantite'
      },
      'graines_riz_cereales': {
        'typeGraine': 'typeGraine',
        'quantite': 'quantite',
        'conditionnement': 'conditionnement',
        'origine': 'origine'
      },
      'sucres_produits_sucres': {
        'typeSucre': 'typeSucre',
        'quantite': 'quantite',
        'forme': 'forme',
        'marque': 'marque'
      },
      'boissons': {
        'typeBoisson': 'typeBoisson',
        'volume': 'volume',
        'marque': 'marque',
        'alcool': 'alcool'
      },
      'viandes_poissons': {
        'typeViande': 'typeViande',
        'quantite': 'quantite',
        'conditionnement': 'conditionnement',
        'congele': 'congele'
      },
      'cafe_the_infusion': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'marque': 'marque',
        'origine': 'origine'
      },
      'complements_alimentaires': {
        'typeComplement': 'typeComplement',
        'quantite': 'quantite',
        'marque': 'marque',
        'dureeValidite': 'dureeValidite'
      },
      'miel_derives': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'origine': 'origine',
        'purete': 'purete'
      },
      'fruits_legumes': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'frais': 'frais',
        'origine': 'origine'
      },
      'ble_farine': {
        'typeFarine': 'typeFarine',
        'quantite': 'quantite',
        'typeMouture': 'typeMouture',
        'origine': 'origine'
      },
      'bonbons_chocolat': {
        'typeConfiserie': 'typeConfiserie',
        'quantite': 'quantite',
        'marque': 'marque',
        'datePeremption': 'datePeremption'
      },
      'boulangerie_viennoiserie': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'frais': 'frais',
        'dateFabrication': 'dateFabrication'
      },
      'ingredients_cuisine_patisserie': {
        'typeIngredient': 'typeIngredient',
        'quantite': 'quantite',
        'marque': 'marque',
        'datePeremption': 'datePeremption'
      },
      'noix_graines': {
        'typeNoix': 'typeNoix',
        'quantite': 'quantite',
        'conditionnement': 'conditionnement',
        'decortique': 'decortique'
      },
      'plats_cuisines': {
        'typePlat': 'typePlat',
        'quantite': 'quantite',
        'conditionnement': 'conditionnement',
        'datePeremption': 'datePeremption'
      },
      'sauces_epices_condiments': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'marque': 'marque',
        'piquant': 'piquant'
      },
      'oeufs': {
        'typeOeufs': 'typeOeufs',
        'quantite': 'quantite',
        'calibre': 'calibre',
        'datePonte': 'datePonte'
      },
      'huiles': {
        'typeHuile': 'typeHuile',
        'volume': 'volume',
        'marque': 'marque',
        'viergeExtra': 'viergeExtra'
      },
      'pates': {
        'typePates': 'typePates',
        'quantite': 'quantite',
        'marque': 'marque',
        'composition': 'composition'
      },
      'gateaux': {
        'typeGateau': 'typeGateau',
        'quantite': 'quantite',
        'frais': 'frais',
        'datePeremption': 'datePeremption'
      },
      'emballage': {
        'typeEmballage': 'typeEmballage',
        'quantite': 'quantite',
        'materiel': 'materiel',
        'dimensions': 'dimensions'
      },
      'aliments_bebe': {
        'typeAliment': 'typeAliment',
        'quantite': 'quantite',
        'marque': 'marque',
        'ageCible': 'ageCible'
      },
      'aliments_dietetiques': {
        'typeProduit': 'typeProduit',
        'quantite': 'quantite',
        'marque': 'marque',
        'regime': 'regime'
      }
    };
    
    return specificFields[subCategory] || {};
  };
  
  const fields = {
    // Produits laitiers
    'typeLaitier': (
      <Form.Group>
        <Form.Label>🥛 {t('dairy_type', 'Type de produit laitier')}</Form.Label>
        <Form.Select
          name="typeLaitier"
          value={postData.typeLaitier || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_dairy_type', 'Sélectionnez')}</option>
          <option value="lait">{t('milk', 'Lait')}</option>
          <option value="yaourt">{t('yogurt', 'Yaourt')}</option>
          <option value="fromage">{t('cheese', 'Fromage')}</option>
          <option value="beurre">{t('butter', 'Beurre')}</option>
          <option value="creme">{t('cream', 'Crème')}</option>
          <option value="lait_poudre">{t('powdered_milk', 'Lait en poudre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'contenance': (
      <Form.Group>
        <Form.Label>📦 {t('capacity', 'Contenance')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="contenance"
              value={postData.contenance || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_capacity', 'Ex: 1')}
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Select
              name="uniteContenance"
              value={postData.uniteContenance || 'L'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="unites">{t('units', 'Unités')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'datePeremption': (
      <Form.Group>
        <Form.Label>📅 {t('expiration_date', 'Date de péremption')}</Form.Label>
        <Form.Control
          type="date"
          name="datePeremption"
          value={postData.datePeremption || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'temperatureConservation': (
      <Form.Group>
        <Form.Label>❄️ {t('storage_temperature', 'Température de conservation')}</Form.Label>
        <Form.Select
          name="temperatureConservation"
          value={postData.temperatureConservation || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_temperature', 'Sélectionnez')}</option>
          <option value="ambiant">{t('room_temp', 'Ambiente')}</option>
          <option value="refrigere">{t('refrigerated', 'Réfrigéré (4°C)')}</option>
          <option value="congele">{t('frozen', 'Congelé (-18°C)')}</option>
          <option value="frais">{t('fresh', 'Frais (0-4°C)')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeFruitSec': (
      <Form.Group>
        <Form.Label>🥜 {t('dried_fruit_type', 'Type de fruit sec')}</Form.Label>
        <Form.Select
          name="typeFruitSec"
          value={postData.typeFruitSec || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_dried_fruit', 'Sélectionnez')}</option>
          <option value="amandes">{t('almonds', 'Amandes')}</option>
          <option value="noix">{t('walnuts', 'Noix')}</option>
          <option value="pistaches">{t('pistachios', 'Pistaches')}</option>
          <option value="dates">{t('dates', 'Dattes')}</option>
          <option value="abricots_secs">{t('dried_apricots', 'Abricots secs')}</option>
          <option value="figues_seches">{t('dried_figs', 'Figues séchées')}</option>
          <option value="raisins_secs">{t('raisins', 'Raisins secs')}</option>
          <option value="pruneaux">{t('prunes', 'Pruneaux')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'conditionnement': (
      <Form.Group>
        <Form.Label>📦 {t('packaging', 'Conditionnement')}</Form.Label>
        <Form.Select
          name="conditionnement"
          value={postData.conditionnement || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_packaging', 'Sélectionnez')}</option>
          <option value="sachet">{t('bag', 'Sachet')}</option>
          <option value="boite">{t('box', 'Boîte')}</option>
          <option value="bocal">{t('jar', 'Bocal')}</option>
          <option value="sac">{t('bag', 'Sac')}</option>
          <option value="vrac">{t('bulk', 'Vrac')}</option>
          <option value="sous_vide">{t('vacuum_packed', 'Sous vide')}</option>
          <option value="barquette">{t('tray', 'Barquette')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'origine': (
      <Form.Group>
        <Form.Label>🌍 {t('origin', 'Origine')}</Form.Label>
        <Form.Control
          type="text"
          name="origine"
          value={postData.origine || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_origin', 'Pays/région d\'origine')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'quantite': (
      <Form.Group>
        <Form.Label>📊 {t('quantity', 'Quantité')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="quantite"
              value={postData.quantite || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_quantity', 'Ex: 5')}
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Select
              name="uniteQuantite"
              value={postData.uniteQuantite || 'kg'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="unites">{t('units', 'Unités')}</option>
              <option value="paquets">{t('packets', 'Paquets')}</option>
              <option value="bouteilles">{t('bottles', 'Bouteilles')}</option>
              <option value="boites">{t('boxes', 'Boîtes')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'typeGraine': (
      <Form.Group>
        <Form.Label>🌾 {t('grain_type', 'Type de graine/céréale')}</Form.Label>
        <Form.Select
          name="typeGraine"
          value={postData.typeGraine || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_grain_type', 'Sélectionnez')}</option>
          <option value="riz">{t('rice', 'Riz')}</option>
          <option value="ble">{t('wheat', 'Blé')}</option>
          <option value="orge">{t('barley', 'Orge')}</option>
          <option value="mais">{t('corn', 'Maïs')}</option>
          <option value="avoine">{t('oats', 'Avoine')}</option>
          <option value="lentilles">{t('lentils', 'Lentilles')}</option>
          <option value="pois_chiches">{t('chickpeas', 'Pois chiches')}</option>
          <option value="haricots">{t('beans', 'Haricots')}</option>
          <option value="couscous">{t('couscous', 'Couscous')}</option>
          <option value="semoule">{t('semolina', 'Semoule')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeSucre': (
      <Form.Group>
        <Form.Label>🍬 {t('sugar_type', 'Type de sucre')}</Form.Label>
        <Form.Select
          name="typeSucre"
          value={postData.typeSucre || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_sugar_type', 'Sélectionnez')}</option>
          <option value="sucre_blanc">{t('white_sugar', 'Sucre blanc')}</option>
          <option value="sucre_roux">{t('brown_sugar', 'Sucre roux')}</option>
          <option value="sucre_complet">{t('whole_sugar', 'Sucre complet')}</option>
          <option value="sucre_candi">{t('rock_sugar', 'Sucre candi')}</option>
          <option value="sucre_glace">{t('powdered_sugar', 'Sucre glace')}</option>
          <option value="miel">{t('honey', 'Miel')}</option>
          <option value="sirop">{t('syrup', 'Sirop')}</option>
          <option value="edulcorant">{t('sweetener', 'Édulcorant')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'forme': (
      <Form.Group>
        <Form.Label>🔵 {t('form', 'Forme')}</Form.Label>
        <Form.Select
          name="forme"
          value={postData.forme || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_form', 'Sélectionnez')}</option>
          <option value="poudre">{t('powder', 'Poudre')}</option>
          <option value="cristaux">{t('crystals', 'Cristaux')}</option>
          <option value="liquide">{t('liquid', 'Liquide')}</option>
          <option value="pate">{t('paste', 'Pâte')}</option>
          <option value="granules">{t('granules', 'Granulés')}</option>
          <option value="tablettes">{t('tablets', 'Tablettes')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'marque': (
      <Form.Group>
        <Form.Label>🏷️ {t('brand', 'Marque')}</Form.Label>
        <Form.Control
          type="text"
          name="marque"
          value={postData.marque || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_brand', 'Nom de la marque')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeBoisson': (
      <Form.Group>
        <Form.Label>🥤 {t('drink_type', 'Type de boisson')}</Form.Label>
        <Form.Select
          name="typeBoisson"
          value={postData.typeBoisson || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_drink_type', 'Sélectionnez')}</option>
          <option value="eau">{t('water', 'Eau')}</option>
          <option value="jus">{t('juice', 'Jus')}</option>
          <option value="soda">{t('soda', 'Soda')}</option>
          <option value="boisson_energisante">{t('energy_drink', 'Boisson énergisante')}</option>
          <option value="the">{t('tea', 'Thé')}</option>
          <option value="cafe">{t('coffee', 'Café')}</option>
          <option value="lait">{t('milk', 'Lait')}</option>
          <option value="boisson_vegetale">{t('plant_based_drink', 'Boisson végétale')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'volume': (
      <Form.Group>
        <Form.Label>🧴 {t('volume', 'Volume')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="volume"
              value={postData.volume || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_volume', 'Ex: 1.5')}
              min="0"
              step="0.1"
            />
          </Col>
          <Col>
            <Form.Select
              name="uniteVolume"
              value={postData.uniteVolume || 'L'}
              onChange={handleChangeInput}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="cl">cl</option>
              <option value="canettes">{t('cans', 'Canettes')}</option>
              <option value="bouteilles">{t('bottles', 'Bouteilles')}</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'alcool': (
      <Form.Group>
        <Form.Label>🍷 {t('alcohol_content', 'Teneur en alcool')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="alcool"
              value={postData.alcool || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_alcohol_content', 'Ex: 12')}
              min="0"
              max="100"
              step="0.1"
            />
          </Col>
          <Col>
            <span className="align-middle">% vol</span>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'typeViande': (
      <Form.Group>
        <Form.Label>🥩 {t('meat_type', 'Type de viande/poisson')}</Form.Label>
        <Form.Select
          name="typeViande"
          value={postData.typeViande || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_meat_type', 'Sélectionnez')}</option>
          <option value="boeuf">{t('beef', 'Bœuf')}</option>
          <option value="poulet">{t('chicken', 'Poulet')}</option>
          <option value="agneau">{t('lamb', 'Agneau')}</option>
          <option value="porc">{t('pork', 'Porc')}</option>
          <option value="poisson">{t('fish', 'Poisson')}</option>
          <option value="fruits_mer">{t('seafood', 'Fruits de mer')}</option>
          <option value="volaille">{t('poultry', 'Volaille')}</option>
          <option value="charcuterie">{t('deli_meats', 'Charcuterie')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'congele': (
      <Form.Group>
        <Form.Label>❄️ {t('frozen', 'Congelé')}</Form.Label>
        <Form.Check
          type="switch"
          name="congele"
          checked={postData.congele || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'congele',
              value: e.target.checked
            }
          })}
          label={postData.congele ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'typeProduit': (
      <Form.Group>
        <Form.Label>☕ {t('product_type', 'Type de produit')}</Form.Label>
        <Form.Select
          name="typeProduit"
          value={postData.typeProduit || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_product_type', 'Sélectionnez')}</option>
          <option value="cafe">{t('coffee', 'Café')}</option>
          <option value="the">{t('tea', 'Thé')}</option>
          <option value="infusion">{t('herbal_tea', 'Infusion')}</option>
          <option value="cacao">{t('cocoa', 'Cacao')}</option>
          <option value="chocolat_chaud">{t('hot_chocolate', 'Chocolat chaud')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeComplement': (
      <Form.Group>
        <Form.Label>💊 {t('supplement_type', 'Type de complément')}</Form.Label>
        <Form.Select
          name="typeComplement"
          value={postData.typeComplement || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_supplement_type', 'Sélectionnez')}</option>
          <option value="vitamines">{t('vitamins', 'Vitamines')}</option>
          <option value="mineraux">{t('minerals', 'Minéraux')}</option>
          <option value="proteines">{t('proteins', 'Protéines')}</option>
          <option value="acides_amines">{t('amino_acids', 'Acides aminés')}</option>
          <option value="probiotiques">{t('probiotics', 'Probiotiques')}</option>
          <option value="plantes">{t('herbs', 'Plantes médicinales')}</option>
          <option value="omega">{t('omega', 'Oméga 3/6/9')}</option>
          <option value="energie">{t('energy', 'Énergie/vitalité')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'dureeValidite': (
      <Form.Group>
        <Form.Label>📅 {t('shelf_life', 'Durée de validité')}</Form.Label>
        <Form.Control
          type="text"
          name="dureeValidite"
          value={postData.dureeValidite || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_shelf_life', 'Ex: 24 mois après ouverture')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'purete': (
      <Form.Group>
        <Form.Label>🌟 {t('purity', 'Pureté/qualité')}</Form.Label>
        <Form.Select
          name="purete"
          value={postData.purete || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_purity', 'Sélectionnez')}</option>
          <option value="bio">{t('organic', 'Bio')}</option>
          <option value="pur">{t('pure', '100% pur')}</option>
          <option value="premium">{t('premium', 'Premium')}</option>
          <option value="artisanal">{t('artisanal', 'Artisanal')}</option>
          <option value="standard">{t('standard', 'Standard')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'frais': (
      <Form.Group>
        <Form.Label>🌱 {t('freshness', 'Fraîcheur')}</Form.Label>
        <Form.Select
          name="frais"
          value={postData.frais || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_freshness', 'Sélectionnez')}</option>
          <option value="tres_frais">{t('very_fresh', 'Très frais')}</option>
          <option value="frais">{t('fresh', 'Frais')}</option>
          <option value="moyen">{t('average', 'Moyen')}</option>
          <option value="mature">{t('ripe', 'Mûr')}</option>
          <option value="trop_mur">{t('overripe', 'Trop mûr')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeFarine': (
      <Form.Group>
        <Form.Label>🌾 {t('flour_type', 'Type de farine')}</Form.Label>
        <Form.Select
          name="typeFarine"
          value={postData.typeFarine || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_flour_type', 'Sélectionnez')}</option>
          <option value="blanche">{t('white_flour', 'Blanche T55')}</option>
          <option value="complete">{t('whole_wheat', 'Complète T110')}</option>
          <option value="integrale">{t('whole_grain', 'Intégrale T150')}</option>
          <option value="seigle">{t('rye', 'Seigle')}</option>
          <option value="sarrasin">{t('buckwheat', 'Sarrasin')}</option>
          <option value="mais">{t('corn_flour', 'Maïs')}</option>
          <option value="chataigne">{t('chestnut', 'Châtaigne')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeMouture': (
      <Form.Group>
        <Form.Label>⚙️ {t('grinding_type', 'Type de mouture')}</Form.Label>
        <Form.Select
          name="typeMouture"
          value={postData.typeMouture || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_grinding', 'Sélectionnez')}</option>
          <option value="fine">{t('fine', 'Fine')}</option>
          <option value="moyenne">{t('medium', 'Moyenne')}</option>
          <option value="grossiere">{t('coarse', 'Grossière')}</option>
          <option value="extra_fine">{t('extra_fine', 'Extra fine')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeConfiserie': (
      <Form.Group>
        <Form.Label>🍫 {t('confectionery_type', 'Type de confiserie')}</Form.Label>
        <Form.Select
          name="typeConfiserie"
          value={postData.typeConfiserie || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_confectionery', 'Sélectionnez')}</option>
          <option value="chocolat">{t('chocolate', 'Chocolat')}</option>
          <option value="bonbons">{t('candy', 'Bonbons')}</option>
          <option value="chewing_gum">{t('gum', 'Chewing-gum')}</option>
          <option value="caramel">{t('caramel', 'Caramel')}</option>
          <option value="nougat">{t('nougat', 'Nougat')}</option>
          <option value="reglisse">{t('licorice', 'Réglisse')}</option>
          <option value="dragées">{t('dragees', 'Dragées')}</option>
          <option value="tablette">{t('chocolate_bar', 'Tablette de chocolat')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'dateFabrication': (
      <Form.Group>
        <Form.Label>🏭 {t('manufacturing_date', 'Date de fabrication')}</Form.Label>
        <Form.Control
          type="date"
          name="dateFabrication"
          value={postData.dateFabrication || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeIngredient': (
      <Form.Group>
        <Form.Label>🧂 {t('ingredient_type', 'Type d\'ingrédient')}</Form.Label>
        <Form.Select
          name="typeIngredient"
          value={postData.typeIngredient || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_ingredient_type', 'Sélectionnez')}</option>
          <option value="levure">{t('yeast', 'Levure')}</option>
          <option value="sucre_vanille">{t('vanilla_sugar', 'Sucre vanillé')}</option>
          <option value="colorant">{t('food_coloring', 'Colorant alimentaire')}</option>
          <option value="arome">{t('flavoring', 'Arôme')}</option>
          <option value="conservateur">{t('preservative', 'Conservateur')}</option>
          <option value="gelifiant">{t('gelling_agent', 'Gélifiant')}</option>
          <option value="epices">{t('spices', 'Épices')}</option>
          <option value="sel">{t('salt', 'Sel')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeNoix': (
      <Form.Group>
        <Form.Label>🌰 {t('nut_type', 'Type de noix/graine')}</Form.Label>
        <Form.Select
          name="typeNoix"
          value={postData.typeNoix || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_nut_type', 'Sélectionnez')}</option>
          <option value="noix_cajou">{t('cashews', 'Noix de cajou')}</option>
          <option value="noix_pecan">{t('pecans', 'Noix de pécan')}</option>
          <option value="noisettes">{t('hazelnuts', 'Noisettes')}</option>
          <option value="pignons">{t('pine_nuts', 'Pignons')}</option>
          <option value="graines_tournesol">{t('sunflower_seeds', 'Graines de tournesol')}</option>
          <option value="graines_courge">{t('pumpkin_seeds', 'Graines de courge')}</option>
          <option value="graines_lin">{t('flax_seeds', 'Graines de lin')}</option>
          <option value="graines_sesame">{t('sesame_seeds', 'Graines de sésame')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'decortique': (
      <Form.Group>
        <Form.Label>🌰 {t('shelled', 'Décortiqué')}</Form.Label>
        <Form.Check
          type="switch"
          name="decortique"
          checked={postData.decortique || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'decortique',
              value: e.target.checked
            }
          })}
          label={postData.decortique ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'typePlat': (
      <Form.Group>
        <Form.Label>🍲 {t('dish_type', 'Type de plat')}</Form.Label>
        <Form.Select
          name="typePlat"
          value={postData.typePlat || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_dish_type', 'Sélectionnez')}</option>
          <option value="couscous">{t('couscous', 'Couscous')}</option>
          <option value="tajine">{t('tagine', 'Tajine')}</option>
          <option value="plat_sauce">{t('stew', 'Plat en sauce')}</option>
          <option value="grillade">{t('grilled', 'Grillade')}</option>
          <option value="soupe">{t('soup', 'Soupe')}</option>
          <option value="salade">{t('salad', 'Salade')}</option>
          <option value="pates">{t('pasta', 'Pâtes')}</option>
          <option value="riz">{t('rice', 'Riz')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'piquant': (
      <Form.Group>
        <Form.Label>🌶️ {t('spiciness', 'Piquant')}</Form.Label>
        <Form.Select
          name="piquant"
          value={postData.piquant || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_spiciness', 'Sélectionnez')}</option>
          <option value="doux">{t('mild', 'Doux')}</option>
          <option value="leger">{t('light', 'Léger')}</option>
          <option value="moyen">{t('medium', 'Moyen')}</option>
          <option value="fort">{t('strong', 'Fort')}</option>
          <option value="tres_fort">{t('very_strong', 'Très fort')}</option>
          <option value="extreme">{t('extreme', 'Extrême')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeOeufs': (
      <Form.Group>
        <Form.Label>🥚 {t('egg_type', 'Type d\'œufs')}</Form.Label>
        <Form.Select
          name="typeOeufs"
          value={postData.typeOeufs || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_egg_type', 'Sélectionnez')}</option>
          <option value="poules_plein_air">{t('free_range', 'Poules plein air')}</option>
          <option value="bio">{t('organic', 'Bio')}</option>
          <option value="standard">{t('standard', 'Standard')}</option>
          <option value="caille">{t('quail', 'Caille')}</option>
          <option value="cane">{t('duck', 'Cane')}</option>
          <option value="oie">{t('goose', 'Oie')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'calibre': (
      <Form.Group>
        <Form.Label>🥚 {t('egg_size', 'Calibre')}</Form.Label>
        <Form.Select
          name="calibre"
          value={postData.calibre || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_egg_size', 'Sélectionnez')}</option>
          <option value="S">S (petit)</option>
          <option value="M">M (moyen)</option>
          <option value="L">L (grand)</option>
          <option value="XL">XL (très grand)</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'datePonte': (
      <Form.Group>
        <Form.Label>🐔 {t('lay_date', 'Date de ponte')}</Form.Label>
        <Form.Control
          type="date"
          name="datePonte"
          value={postData.datePonte || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeHuile': (
      <Form.Group>
        <Form.Label>🫒 {t('oil_type', 'Type d\'huile')}</Form.Label>
        <Form.Select
          name="typeHuile"
          value={postData.typeHuile || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_oil_type', 'Sélectionnez')}</option>
          <option value="olive">{t('olive', 'Olive')}</option>
          <option value="tournesol">{t('sunflower', 'Tournesol')}</option>
          <option value="colza">{t('rapeseed', 'Colza')}</option>
          <option value="arachide">{t('peanut', 'Arachide')}</option>
          <option value="coco">{t('coconut', 'Coco')}</option>
          <option value="sesame">{t('sesame', 'Sésame')}</option>
          <option value="noix">{t('walnut', 'Noix')}</option>
          <option value="mais">{t('corn', 'Maïs')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'viergeExtra': (
      <Form.Group>
        <Form.Label>🌟 {t('virgin_extra', 'Vierge extra')}</Form.Label>
        <Form.Check
          type="switch"
          name="viergeExtra"
          checked={postData.viergeExtra || false}
          onChange={(e) => handleChangeInput({
            target: {
              name: 'viergeExtra',
              value: e.target.checked
            }
          })}
          label={postData.viergeExtra ? t('yes', 'Oui') : t('no', 'Non')}
          reverse={isRTL}
        />
      </Form.Group>
    ),
    
    'typePates': (
      <Form.Group>
        <Form.Label>🍝 {t('pasta_type', 'Type de pâtes')}</Form.Label>
        <Form.Select
          name="typePates"
          value={postData.typePates || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_pasta_type', 'Sélectionnez')}</option>
          <option value="spaghetti">{t('spaghetti', 'Spaghetti')}</option>
          <option value="penne">{t('penne', 'Penne')}</option>
          <option value="fusilli">{t('fusilli', 'Fusilli')}</option>
          <option value="tagliatelle">{t('tagliatelle', 'Tagliatelle')}</option>
          <option value="lasagnes">{t('lasagna', 'Lasagnes')}</option>
          <option value="couscous">{t('couscous', 'Couscous')}</option>
          <option value="nouilles">{t('noodles', 'Nouilles')}</option>
          <option value="farfalles">{t('farfalle', 'Farfalles')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'composition': (
      <Form.Group>
        <Form.Label>📝 {t('composition', 'Composition')}</Form.Label>
        <Form.Control
          as="textarea"
          name="composition"
          value={postData.composition || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_composition', 'Liste des ingrédients...')}
          rows={2}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'typeGateau': (
      <Form.Group>
        <Form.Label>🎂 {t('cake_type', 'Type de gâteau')}</Form.Label>
        <Form.Select
          name="typeGateau"
          value={postData.typeGateau || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_cake_type', 'Sélectionnez')}</option>
          <option value="anniversaire">{t('birthday', 'Anniversaire')}</option>
          <option value="mariage">{t('wedding', 'Mariage')}</option>
          <option value="chocolat">{t('chocolate_cake', 'Chocolat')}</option>
          <option value="fruits">{t('fruit_cake', 'Fruits')}</option>
          <option value="creme">{t('cream_cake', 'Crème')}</option>
          <option value="sec">{t('dry_cake', 'Sec (biscuit)')}</option>
          <option value="patisserie">{t('pastry', 'Pâtisserie')}</option>
          <option value="oriental">{t('oriental', 'Oriental')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeEmballage': (
      <Form.Group>
        <Form.Label>📦 {t('packaging_type', 'Type d\'emballage')}</Form.Label>
        <Form.Select
          name="typeEmballage"
          value={postData.typeEmballage || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_packaging_type', 'Sélectionnez')}</option>
          <option value="sachet">{t('bag', 'Sachet')}</option>
          <option value="boite">{t('box', 'Boîte')}</option>
          <option value="carton">{t('cardboard', 'Carton')}</option>
          <option value="plastique">{t('plastic', 'Plastique')}</option>
          <option value="verre">{t('glass', 'Verre')}</option>
          <option value="metal">{t('metal', 'Métal')}</option>
          <option value="papier">{t('paper', 'Papier')}</option>
          <option value="aluminium">{t('aluminum', 'Aluminium')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'materiel': (
      <Form.Group>
        <Form.Label>🧱 {t('material', 'Matériau')}</Form.Label>
        <Form.Select
          name="materiel"
          value={postData.materiel || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_material', 'Sélectionnez')}</option>
          <option value="plastique">{t('plastic', 'Plastique')}</option>
          <option value="carton">{t('cardboard', 'Carton')}</option>
          <option value="verre">{t('glass', 'Verre')}</option>
          <option value="metal">{t('metal', 'Métal')}</option>
          <option value="papier">{t('paper', 'Papier')}</option>
          <option value="bois">{t('wood', 'Bois')}</option>
          <option value="tissu">{t('fabric', 'Tissu')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'dimensions': (
      <Form.Group>
        <Form.Label>📐 {t('dimensions', 'Dimensions')}</Form.Label>
        <Row className="mb-2">
          <Col>
            <Form.Control
              type="number"
              name="longueur"
              value={postData.longueur || ''}
              onChange={handleChangeInput}
              placeholder={t('length', 'Longueur')}
              min="0"
              step="0.1"
            />
          </Col>
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
        </Row>
        <Form.Select
          name="uniteDimensions"
          value={postData.uniteDimensions || 'cm'}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="cm">cm</option>
          <option value="m">m</option>
          <option value="mm">mm</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typeAliment': (
      <Form.Group>
        <Form.Label>👶 {t('baby_food_type', 'Type d\'aliment bébé')}</Form.Label>
        <Form.Select
          name="typeAliment"
          value={postData.typeAliment || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_baby_food', 'Sélectionnez')}</option>
          <option value="lait">{t('milk', 'Lait infantile')}</option>
          <option value="puree">{t('puree', 'Purée')}</option>
          <option value="compote">{t('compote', 'Compote')}</option>
          <option value="cereales">{t('cereals', 'Céréales')}</option>
          <option value="petits_pots">{t('jars', 'Petits pots')}</option>
          <option value="biscuits">{t('biscuits', 'Biscuits')}</option>
          <option value="bouillie">{t('porridge', 'Bouillie')}</option>
          <option value="boisson">{t('drink', 'Boisson')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'ageCible': (
      <Form.Group>
        <Form.Label>👶 {t('target_age', 'Âge cible')}</Form.Label>
        <Form.Select
          name="ageCible"
          value={postData.ageCible || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_age_range', 'Sélectionnez')}</option>
          <option value="0-6">{t('months_0_6', '0-6 mois')}</option>
          <option value="6-12">{t('months_6_12', '6-12 mois')}</option>
          <option value="1-2">{t('years_1_2', '1-2 ans')}</option>
          <option value="2-3">{t('years_2_3', '2-3 ans')}</option>
          <option value="3+">{t('years_3_plus', '3 ans et plus')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'regime': (
      <Form.Group>
        <Form.Label>🥗 {t('diet', 'Régime')}</Form.Label>
        <Form.Select
          name="regime"
          value={postData.regime || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_diet', 'Sélectionnez')}</option>
          <option value="sans_gluten">{t('gluten_free', 'Sans gluten')}</option>
          <option value="sans_lactose">{t('lactose_free', 'Sans lactose')}</option>
          <option value="vegetarien">{t('vegetarian', 'Végétarien')}</option>
          <option value="vegan">{t('vegan', 'Vegan')}</option>
          <option value="sans_sucre">{t('sugar_free', 'Sans sucre')}</option>
          <option value="hypocalorique">{t('low_calorie', 'Hypocalorique')}</option>
          <option value="riche_proteines">{t('high_protein', 'Riche en protéines')}</option>
          <option value="sans_sel">{t('low_salt', 'Pauvre en sel')}</option>
        </Form.Select>
      </Form.Group>
    )
  };
  
  // Obtener campos específicos para la subcategoría actual
  const subCategoryFields = getSubCategorySpecificFields();
  
  // Si fieldName está especificado, devolver ese campo
  if (fieldName) {
    return fields[fieldName] || null;
  }
  
  // Si no hay fieldName específico, devolver todos los campos de la subcategoría
  if (subCategory && subCategoryFields) {
    return (
      <>
        {Object.keys(subCategoryFields).map(key => (
          <div key={key} className="mb-3">
            {fields[subCategoryFields[key]]}
          </div>
        ))}
      </>
    );
  }
  
  return null;
};

export default AlimentairesFields;