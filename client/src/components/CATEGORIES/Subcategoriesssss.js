import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Subcategories = ({ postData, handleChangeInput }) => {
  const { t } = useTranslation(['subcategories']);
  const [availableSubcategories, setAvailableSubcategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 📋 BASE DE DATOS DE SUBCATEGORÍAS POR CATEGORÍA
  const getSubcategoriesByCategory = (category) => {
    const subcategoriesMap = {
      // 🏠 IMMOBILIER
      'immobilier': {
        'vente': ['appartement', 'villa', 'terrain', 'local_commercial', 'bureau', 'immeuble', 'ferme'],
        'location': ['appartement', 'villa', 'local_commercial', 'bureau', 'garage', 'chambre'],
        'colocation': ['appartement', 'villa', 'maison'],
        'default': ['appartement', 'villa', 'terrain', 'local_commercial']
      },
      
      // 🚗 AUTOMOBILES
      'automobiles': {
        'voitures': ['citadine', 'berline', 'suv', 'break', 'coupe', 'cabriolet', 'monospace'],
        'motos': ['sportive', 'roadster', 'custom', 'trail', 'scooter', 'quad'],
        'utilitaires': ['fourgon', 'camionnette', 'pick-up', 'camion', 'bus', 'remorque'],
        'engins': ['tracteur', 'pelle', 'niveleuse', 'grue', 'compacteur', 'generateur'],
        'pieces_vehicules': ['moteur', 'carrosserie', 'freinage', 'suspension', 'electrique'],
        'default': ['voitures', 'motos', 'utilitaires', 'camions', 'engins', 'pieces_vehicules']
      },
      
      // 💻 INFORMATIQUE
      'informatique': {
        'ordinateurs_portables': ['ultrabook', 'gaming', 'professionnel', 'convertible', 'chromebook'],
        'ordinateurs_bureau': ['tour', 'mini-pc', 'all-in-one', 'station_de_travail'],
        'ecrans': ['gaming', 'professionnel', 'ultrawide', 'curved', '4k'],
        'composants_pc': ['carte_mere', 'processeur', 'carte_graphique', 'ram', 'disque_dur'],
        'imprimantes': ['jet_d_encre', 'laser', 'multifonction', '3d', 'professionnelle'],
        'default': ['ordinateurs_portables', 'ordinateurs_bureau', 'ecrans', 'composants_pc']
      },
      
      // 🏠 ÉLECTROMÉNAGER
      'electromenager': {
        'televiseurs': ['led', 'oled', 'qled', 'smart_tv', '4k', '8k'],
        'refrigerateurs': ['americain', 'combi', 'frigo_congelateur', 'table_top'],
        'machines_laver': ['hublot', 'top', 'sechante', 'lavante_sechante'],
        'climatisation': ['split', 'mobile', 'gainable', 'climatiseur_reversible'],
        'cuisine': ['four', 'cuisiniere', 'lave_vaisselle', 'micro_ondes', 'hotte'],
        'default': ['televiseurs', 'refrigerateurs', 'machines_laver', 'climatisation']
      },
      
      // 📱 TÉLÉPHONES
      'telephones': {
        'smartphones': ['android', 'ios', 'reconditionne', 'neuf', 'occasion'],
        'tablettes': ['android', 'ios', 'windows', 'reconditionne', 'neuf'],
        'accessoires': ['coque', 'chargeur', 'ecouteurs', 'batterie_externe', 'support'],
        'fixes_fax': ['telephone_fixe', 'fax', 'repondeur', 'sans_fil'],
        'default': ['smartphones', 'tablettes', 'accessoires', 'fixes_fax']
      },
      
      // 👕 VÊTEMENTS
      'vetements': {
        'vetements_homme': ['chemise', 'pantalon', 't_shirt', 'costume', 'veste', 'jean'],
        'vetements_femme': ['robe', 'jupe', 'blouse', 'pantalon', 'ensemble'],
        'chaussures': ['baskets', 'bottines', 'sandales', 'escarpins', 'chaussures_sport'],
        'sacs_accessoires': ['sac_main', 'sac_bandouliere', 'valise', 'ceinture', 'bijoux'],
        'default': ['vetements_homme', 'vetements_femme', 'chaussures', 'sacs_accessoires']
      },
      
      // ✈️ VOYAGES
      'voyages': {
        'voyage_organise': ['culturel', 'plage', 'aventure', 'luxe', 'economique'],
        'location_vacances': ['appartement', 'villa', 'riad', 'chalet', 'maison'],
        'billets_avion': ['aller_simple', 'aller_retour', 'multi_destinations'],
        'croisieres': ['mediterranee', 'caraibes', 'asie', 'europe_du_nord'],
        'default': ['voyage_organise', 'location_vacances', 'billets_avion', 'croisieres']
      },
      
      // 🛠️ SERVICES
      'services': {
        'construction': ['maçonnerie', 'electricite', 'plomberie', 'menuiserie', 'peinture'],
        'transport': ['demenagement', 'livraison', 'taxi', 'location_vehicule'],
        'nettoyage': ['domestique', 'bureaux', 'industriel', 'vitres', 'tapis'],
        'reparation': ['electromenager', 'electronique', 'automobile', 'informatique'],
        'default': ['construction', 'transport', 'nettoyage', 'reparation']
      }
    };
    
    // Si la categoría no existe, retornar array vacío
    if (!subcategoriesMap[category]) {
      return [];
    }
    
    // Para "immobilier", necesitamos articleType
    if (category === 'immobilier' && postData.articleType) {
      return subcategoriesMap[category][postData.articleType] || subcategoriesMap[category]['default'];
    }
    
    // Para otras categorías, retornar default o todas las subcategorías
    return subcategoriesMap[category]['default'] || 
           Object.keys(subcategoriesMap[category]).filter(key => key !== 'default');
  };

  // 🔄 Cargar subcategorías cuando cambia la categoría
  useEffect(() => {
    console.log('🔄 Subcategories useEffect - Categoría:', postData.categorie);
    
    if (!postData.categorie) {
      setAvailableSubcategories([]);
      return;
    }

    setIsLoading(true);
    
    try {
      const subcats = getSubcategoriesByCategory(postData.categorie);
      console.log('✅ Subcategorías cargadas:', subcats);
      setAvailableSubcategories(subcats);
    } catch (error) {
      console.error('❌ Error cargando subcategorías:', error);
      setAvailableSubcategories([]);
    } finally {
      setIsLoading(false);
    }
  }, [postData.categorie, postData.articleType]); // Dependencias

  // 🔄 Validar subcategoría actual cuando se cargan las opciones
  useEffect(() => {
    if (postData.subCategory && availableSubcategories.length > 0) {
      const isValid = availableSubcategories.includes(postData.subCategory);
      
      if (!isValid && postData.subCategory !== '') {
        console.warn(`⚠️ Subcategoría "${postData.subCategory}" no es válida para ${postData.categorie}`);
        
        // Opcional: Si estás en modo edición, puedes mantenerla
        // pero para creación nueva, limpiar
        if (!postData._id) { // Si no es un post existente
          handleChangeInput({
            target: { name: 'subCategory', value: '' }
          });
        }
      }
    }
  }, [postData.subCategory, availableSubcategories, postData.categorie, handleChangeInput, postData._id]);

  // Si no hay categoría seleccionada, no mostrar nada
  if (!postData.categorie) {
    return null;
  }

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        <strong>📂 {t('subcategory', 'Sous-catégorie')}</strong>
        {postData.subCategory && (
          <span className="ms-2 text-success">
            <small>
              <i className="bi bi-check-circle me-1"></i>
              {postData.subCategory}
            </small>
          </span>
        )}
      </Form.Label>
      
      {isLoading ? (
        <div className="text-center py-2">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <small className="ms-2 text-muted">Chargement des sous-catégories...</small>
        </div>
      ) : availableSubcategories.length > 0 ? (
        <>
          <Form.Select
            name="subCategory"
            value={postData.subCategory || ''}
            onChange={handleChangeInput}
            required
            disabled={isLoading}
          >
            <option value="">
              {t('select_subcategory', 'Sélectionnez une sous-catégorie')}
            </option>
            {availableSubcategories.map((subCat) => (
              <option key={subCat} value={subCat}>
                {t(subCat, subCat)}
              </option>
            ))}
          </Form.Select>
          
          <Form.Text className="text-muted">
            <small>
              {availableSubcategories.length} sous-catégorie(s) disponible(s)
              {postData.categorie === 'immobilier' && postData.articleType && 
                ` pour ${postData.articleType}`}
            </small>
          </Form.Text>
        </>
      ) : (
        <Form.Control
          type="text"
          name="subCategory"
          value={postData.subCategory || ''}
          onChange={handleChangeInput}
          placeholder={t('enter_subcategory', 'Entrez la sous-catégorie manuellement')}
          required
          disabled={isLoading}
        />
      )}
      
      {/* Debug info en desarrollo */}
      {process.env.NODE_ENV === 'development' && (
        <Form.Text className="text-muted">
          <small>
            <i className="bi bi-bug me-1"></i>
            Catégorie: <code>{postData.categorie}</code> | 
            Sous-catégories: <code>{availableSubcategories.length}</code>
          </small>
        </Form.Text>
      )}
    </Form.Group>
  );
};

export default Subcategories;