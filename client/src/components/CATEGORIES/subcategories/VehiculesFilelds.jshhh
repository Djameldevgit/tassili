import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const VehiculesFields = ({ fieldName, postData, handleChangeInput, subCategory, isRTL }) => {
  const { t } = useTranslation();
  
  const getSubCategorySpecificFields = () => {
    const specificFields = {
      'voitures': {
        'marque': 'marque',
        'modele': 'modele',
        'annee': 'annee',
        'kilometrage': 'kilometrage',
        'carburant': 'carburant',
        'boiteVitesse': 'boiteVitesse',
        'puissance': 'puissance'
      },
      'motos': {
        'typeMoto': 'typeMoto',
        'marque': 'marque',
        'modele': 'modele',
        'cylindree': 'cylindree',
        'annee': 'annee',
        'kilometrage': 'kilometrage'
      },
      'utilitaires': {
        'marque': 'marque',
        'modele': 'modele',
        'typeUtilitaire': 'typeUtilitaire',
        'annee': 'annee',
        'kilometrage': 'kilometrage',
        'chargeUtile': 'chargeUtile'
      },
      'engins': {
        'typeEngin': 'typeEngin',
        'marque': 'marque',
        'modele': 'modele',
        'annee': 'annee',
        'etatEngin': 'etatEngin'
      },
      'pieces_vehicules': {
        'typePiece': 'typePiece',
        'marqueCompatible': 'marqueCompatible',
        'modeleCompatible': 'modeleCompatible',
        'etatPiece': 'etatPiece'
      }
    };
    
    return specificFields[subCategory] || {};
  };
  
  const fields = {
    'marque': (
      <Form.Group key="marque">
        <Form.Label>🏷️ {t('brand', 'Marque')}</Form.Label>
        <Form.Select
          name="marque"
          value={postData.marque || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_brand', 'Sélectionnez la marque')}</option>
          <option value="renault">Renault</option>
          <option value="peugeot">Peugeot</option>
          <option value="citroen">Citroën</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          <option value="volkswagen">Volkswagen</option>
          <option value="toyota">Toyota</option>
          <option value="honda">Honda</option>
          <option value="hyundai">Hyundai</option>
          <option value="kia">Kia</option>
          <option value="dacia">Dacia</option>
          <option value="autre">{t('other', 'Autre')}</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'modele': (
      <Form.Group key="modele">
        <Form.Label>🚘 {t('model', 'Modèle')}</Form.Label>
        <Form.Control
          type="text"
          name="modele"
          value={postData.modele || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_model', 'Ex: Clio, 208, Golf...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'annee': (
      <Form.Group key="annee">
        <Form.Label>📅 {t('year', 'Année')}</Form.Label>
        <Form.Select
          name="annee"
          value={postData.annee || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_year', 'Sélectionnez l\'année')}</option>
          {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </Form.Group>
    ),
    
    'kilometrage': (
      <Form.Group key="kilometrage">
        <Form.Label>🛣️ {t('mileage', 'Kilométrage')}</Form.Label>
        <Row>
          <Col>
            <Form.Control
              type="number"
              name="kilometrage"
              value={postData.kilometrage || ''}
              onChange={handleChangeInput}
              placeholder="Ex: 75000"
              min="0"
            />
          </Col>
          <Col>
            <Form.Select
              name="kilometrageUnite"
              value={postData.kilometrageUnite || 'km'}
              onChange={handleChangeInput}
            >
              <option value="km">km</option>
              <option value="miles">Miles</option>
            </Form.Select>
          </Col>
        </Row>
      </Form.Group>
    ),
    
    'carburant': (
      <Form.Group key="carburant">
        <Form.Label>⛽ {t('fuel', 'Carburant')}</Form.Label>
        <Form.Select
          name="carburant"
          value={postData.carburant || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_fuel', 'Sélectionnez')}</option>
          <option value="essence">Essence</option>
          <option value="diesel">Diesel</option>
          <option value="electrique">Électrique</option>
          <option value="hybride">Hybride</option>
          <option value="gpl">GPL</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'boiteVitesse': (
      <Form.Group key="boiteVitesse">
        <Form.Label>⚙️ {t('gearbox', 'Boîte de vitesse')}</Form.Label>
        <Form.Select
          name="boiteVitesse"
          value={postData.boiteVitesse || ''}
          onChange={handleChangeInput}
        >
          <option value="">{t('select_gearbox', 'Sélectionnez')}</option>
          <option value="manuelle">Manuelle</option>
          <option value="automatique">Automatique</option>
          <option value="semi-auto">Semi-automatique</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'puissance': (
      <Form.Group key="puissance">
        <Form.Label>🐎 {t('power', 'Puissance')} (CV)</Form.Label>
        <Form.Control
          type="number"
          name="puissance"
          value={postData.puissance || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 90"
          min="0"
        />
      </Form.Group>
    ),
    
    'typeMoto': (
      <Form.Group key="typeMoto">
        <Form.Label>🏍️ {t('motorbike_type', 'Type de moto')}</Form.Label>
        <Form.Select
          name="typeMoto"
          value={postData.typeMoto || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_moto_type', 'Sélectionnez')}</option>
          <option value="sportive">Sportive</option>
          <option value="roadster">Roadster</option>
          <option value="custom">Custom</option>
          <option value="trail">Trail/Enduro</option>
          <option value="scooter">Scooter</option>
          <option value="quad">Quad</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'cylindree': (
      <Form.Group key="cylindree">
        <Form.Label>🔧 {t('displacement', 'Cylindrée')} (cc)</Form.Label>
        <Form.Control
          type="number"
          name="cylindree"
          value={postData.cylindree || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 600"
          min="0"
        />
      </Form.Group>
    ),
    
    'typeUtilitaire': (
      <Form.Group key="typeUtilitaire">
        <Form.Label>🚚 {t('utility_type', 'Type d\'utilitaire')}</Form.Label>
        <Form.Select
          name="typeUtilitaire"
          value={postData.typeUtilitaire || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_utility_type', 'Sélectionnez')}</option>
          <option value="fourgon">Fourgon</option>
          <option value="camionnette">Camionnette</option>
          <option value="camion">Camion</option>
          <option value="remorque">Remorque</option>
          <option value="bus">Bus/Minibus</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'chargeUtile': (
      <Form.Group key="chargeUtile">
        <Form.Label>⚖️ {t('payload', 'Charge utile')} (kg)</Form.Label>
        <Form.Control
          type="number"
          name="chargeUtile"
          value={postData.chargeUtile || ''}
          onChange={handleChangeInput}
          placeholder="Ex: 1500"
          min="0"
        />
      </Form.Group>
    ),
    
    'typeEngin': (
      <Form.Group key="typeEngin">
        <Form.Label>🚜 {t('machine_type', 'Type d\'engin')}</Form.Label>
        <Form.Select
          name="typeEngin"
          value={postData.typeEngin || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_machine_type', 'Sélectionnez')}</option>
          <option value="tracteur">Tracteur</option>
          <option value="pelle">Pelle mécanique</option>
          <option value="niveleuse">Niveleuse</option>
          <option value="compacteur">Compacteur</option>
          <option value="grue">Grue</option>
          <option value="generateur">Générateur</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'etatEngin': (
      <Form.Group key="etatEngin">
        <Form.Label>🛠️ {t('machine_condition', 'État de l\'engin')}</Form.Label>
        <Form.Select
          name="etatEngin"
          value={postData.etatEngin || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_condition', 'Sélectionnez')}</option>
          <option value="neuf">Neuf</option>
          <option value="tres_bon">Très bon état</option>
          <option value="operationnel">Opérationnel</option>
          <option value="reparation">Besoin de réparation</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'typePiece': (
      <Form.Group key="typePiece">
        <Form.Label>🔩 {t('part_type', 'Type de pièce')}</Form.Label>
        <Form.Select
          name="typePiece"
          value={postData.typePiece || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_part_type', 'Sélectionnez')}</option>
          <option value="moteur">Moteur/Transmission</option>
          <option value="carrosserie">Carrosserie</option>
          <option value="freinage">Freinage</option>
          <option value="suspension">Suspension</option>
          <option value="electrique">Électrique</option>
          <option value="interieur">Intérieur</option>
        </Form.Select>
      </Form.Group>
    ),
    
    'marqueCompatible': (
      <Form.Group key="marqueCompatible">
        <Form.Label>🔗 {t('compatible_brand', 'Marque compatible')}</Form.Label>
        <Form.Control
          type="text"
          name="marqueCompatible"
          value={postData.marqueCompatible || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_compatible_brands', 'Ex: Renault, Peugeot...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'modeleCompatible': (
      <Form.Group key="modeleCompatible">
        <Form.Label>🔗 {t('compatible_model', 'Modèles compatibles')}</Form.Label>
        <Form.Control
          type="text"
          name="modeleCompatible"
          value={postData.modeleCompatible || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_compatible_models', 'Ex: Clio, 206, Golf...')}
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </Form.Group>
    ),
    
    'etatPiece': (
      <Form.Group key="etatPiece">
        <Form.Label>🔄 {t('part_condition', 'État de la pièce')}</Form.Label>
        <Form.Select
          name="etatPiece"
          value={postData.etatPiece || ''}
          onChange={handleChangeInput}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">{t('select_condition', 'Sélectionnez')}</option>
          <option value="neuf">Neuf</option>
          <option value="occasion">Occasion en état</option>
          <option value="reparation">À réparer</option>
          <option value="usage">Usage visible</option>
        </Form.Select>
      </Form.Group>
    )
  };
  
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

export default VehiculesFields;