import SliderVehicule from './SliderVehicules';
import SliderVetements from './SliderVetements';
import SliderTelephones from './SliderTelephones';
import SliderInformatiques from './SliderInformatiques';
import SliderElectromenager from './SlidersElectromenagers';
import SliderPiecesDetachees from './SliderPiecesDetaches';
import SliderSanteBeaute from './SliderSanteBeaute';
import SliderMeubles from './SliderMuebles';
import SliderLoisirs from './SliderLoisir';
import CategorySliderEmoji from './CategorySlderEmoji';
import  SliderSport from './SliderSport';
import  SliderAlimentaires from './SliderAlimentaires';
import SliderServices from './SliderServices';
import SliderMateriaux from './SliderMateriaux';
import SliderVoyages from './SliderVoyages';
 import SliderEmploi from './SliderEmploi';
import SliderImmobiler from './SliderImmobiler';
const DynamicCategorySlider = ({ categoryName }) => {
  // Base de datos de coincidencias de categorías - COMPLETA Y ACTUALIZADA
  const categoryDatabase = {
    // Vehículos
    'vehicules': {
      component: SliderVehicule,
      variations: [
        'automobiles', 'vehicules', 'véhicules', 'vehicles',
        'voitures', 'motos', 'voiture', 'vehicle', 'carros',
        'coches', 'autos', 'cars', 'automóviles', 'transport',
        'automobiles & véhicules', 'automobiles et véhicules'
      ]
    },
    
    // Vestimenta
    'vetements': {
      component: SliderVetements,
      variations: [
        'vetements', 'vêtements', 'mode', 'clothing',
        'clothes', 'fashion', 'ropa', 'vestimenta',
        'prendas', 'habillement', 'kleidung', 'apparel',
        'vêtements & mode', 'vetements et mode'
      ]
    },
    
    // Teléfonos
    'telephones': {
      component: SliderTelephones,
      variations: [
        'telephones', 'téléphones', 'smartphones', 'phone',
        'mobile', 'smartphone', 'celulares', 'móviles',
        'teléfonos', 'handy', 'telefono', 'cellphone', 'mobilephone',
        'téléphones & accessoires', 'telephones et accessoires'
      ]
    },

    // Informática
    'informatique': {
      component: SliderInformatiques,
      variations: [
        'informatique', 'informática', 'computación', 'technology',
        'tech', 'computers', 'ordenadores', 'computer', 'computadora',
        'it', 'informatic', 'informatica'
      ]
    },

    // Electromenager
    'electromenager': {
      component: SliderElectromenager,
      variations: [
        'electromenager', 'électroménager', 'electrodomésticos',
        'appliances', 'home_appliances', 'electrodomesticos',
        'electro', 'appareils', 'homeappliances', 'electrodomestico',
        'électroménager & électronique', 'electromenager et electronique'
      ]
    },

    // Pièces Détachées
    'piecesdetachees': {
      component: SliderPiecesDetachees,
      variations: [
        'piecesdetachees', 'pièces détachées', 'pieces_detachees',
        'repuestos', 'spareparts', 'piezas', 'recambios',
        'auto parts', 'car parts', 'partes', 'componentes',
        'pièces détachées'
      ]
    },

    // Santé & Beauté
    'santebeaute': {
      component: SliderSanteBeaute,
      variations: [
        'santebeaute', 'santé & beauté', 'sante_beaute',
        'salud-belleza', 'beauty', 'cosmeticos', 'cosmétiques',
        'beauté', 'healthbeauty', 'salud y belleza', 'cosmetics',
        'santé & beauté', 'sante et beaute'
      ]
    },

    // Meubles & Maison
    'meubles': {
      component: SliderMeubles,
      variations: [
        'meubles', 'meubles-maison', 'meubles_maison',
        'muebles', 'furniture', 'mobiliario', 'homefurniture',
        'mobili', 'mobilier', 'home decor', 'decoracion',
        'meubles & maison', 'meubles et maison'
      ]
    },

    // Loisirs & Divertissements
    'loisirs': {
      component: SliderLoisirs,
      variations: [
        'loisirs', 'loisirs-divertissements', 'loisirs_divertissements',
        'ocio', 'entretenimiento', 'hobbies', 'entretenimento',
        'entertainment', 'leisure', 'recreation', 'diversión',
        'loisirs & divertissements', 'loisirs et divertissements'
      ]
    },

    // Sport
    'sport': {
      component: SliderSport,
      variations: [
        'sport', 'sports', 'deportes', 'deporte',
        'athletics', 'athlétisme', 'esportes', 'esport',
        'sports', 'deporte'
      ]
    },

    // Alimentaires
    'alimentaires': {
      component: SliderAlimentaires,
      variations: [
        'alimentaires', 'alimentos', 'food', 'comida',
        'nourriture', 'alimentación', 'alimentation',
        'grocery', 'épicerie', 'supermercado',
        'alimentaires'
      ]
    },

    // Services
    'services': {
      component: SliderServices,
      variations: [
        'services', 'servicios', 'service', 'servicio',
        'professional services', 'serviços', 'servicii',
        'professional', 'professionnel', 'profesional',
        'services'
      ]
    },

    // Materiaux & Équipement
    'materiaux': {
      component: SliderMateriaux,
      variations: [
        'materiaux', 'materiales', 'materials', 'equipment',
        'matériaux & équipement', 'materiales y equipos',
        'construction materials', 'materiales de construcción'
      ]
    },

    // Voyages
    'voyages': {
      component: SliderVoyages,
      variations: [
        'voyages', 'viajes', 'travel', 'trips',
        'travels', 'voyage', 'viaje', 'turismo',
        'tourism', 'traveling'
      ]
    },

    // Emploi
    'emploi': {
      component: SliderEmploi,
      variations: [
        'emploi', 'empleo', 'job', 'jobs',
        'employment', 'trabajo', 'work',
        'empleos', 'travail', 'empleos'
      ]
    },

    // Immobilier
    'immobilier': {
      component: SliderImmobiler,
      variations: [
        'immobilier', 'real estate', 'bienes raíces',
        'inmobiliaria', 'realty', 'property',
        'propiedades', 'properties', 'vivienda'
      ]
    }
  };

  // Función para normalizar texto - MEJORADA
  const normalizeText = (text) => {
    if (!text) return '';
    
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
      .replace(/[^\w\s]/gi, '') // Eliminar caracteres especiales
      .replace(/\s+/g, ''); // Eliminar espacios
  };

  // Función para buscar categoría mejorada con keywords específicos
  const findCategory = (category) => {
    if (!category) return null;
    
    const normalizedCategory = normalizeText(category);
    
    // Palabras clave para cada categoría principal - ACTUALIZADA
    const categoryKeywords = {
      'vehicules': ['auto', 'car', 'moto', 'bike', 'vehicle', 'voiture', 'coche', 'automobile'],
      'vetements': ['cloth', 'wear', 'shoe', 'dress', 'shirt', 'pantalon', 'vestimenta', 'ropa', 'moda'],
      'telephones': ['phone', 'mobile', 'cell', 'smartphone', 'teléfono', 'telefono', 'celular'],
      'informatique': ['computer', 'tech', 'laptop', 'pc', 'ordenador', 'computadora', 'informática'],
      'electromenager': ['appliance', 'tv', 'fridge', 'washing', 'electrodoméstico', 'electrodomestico', 'electro'],
      'piecesdetachees': ['part', 'piece', 'spare', 'component', 'pieza', 'repuesto', 'recambio'],
      'santebeaute': ['beauty', 'health', 'cosmetic', 'parfum', 'belleza', 'salud', 'cosmético'],
      'meubles': ['furniture', 'table', 'chair', 'sofa', 'bed', 'mueble', 'mobiliario', 'decoración'],
      'loisirs': ['hobby', 'game', 'sport', 'music', 'book', 'ocio', 'entretenimiento', 'diversión'],
      'sport': ['deporte', 'sports', 'football', 'basketball', 'tennis', 'fitness', 'ejercicio'],
      'alimentaires': ['food', 'alimento', 'comida', 'grocery', 'supermarket', 'épicerie', 'alimentación'],
      'services': ['service', 'servicio', 'professional', 'profesional', 'trabajo', 'work'],
      'materiaux': ['material', 'equipment', 'tools', 'construction', 'herramientas', 'construcción'],
      'voyages': ['travel', 'trip', 'tour', 'vacation', 'viaje', 'turismo', 'vacaciones'],
      'emploi': ['job', 'work', 'employment', 'trabajo', 'empleo', 'career', 'carrera'],
      'immobilier': ['realestate', 'property', 'house', 'apartment', 'inmobiliaria', 'propiedad', 'casa']
    };
    
    // 1. Buscar coincidencia exacta en las claves principales
    if (categoryDatabase[normalizedCategory]) {
      return categoryDatabase[normalizedCategory].component;
    }
    
    // 2. Buscar en todas las categorías por variaciones
    for (const [key, data] of Object.entries(categoryDatabase)) {
      // Verificar si el nombre coincide exactamente
      if (normalizeText(key) === normalizedCategory) {
        return data.component;
      }
      
      // Verificar variaciones exactas
      const hasExactVariation = data.variations.some(variation => 
        normalizeText(variation) === normalizedCategory
      );
      
      if (hasExactVariation) {
        return data.component;
      }
      
      // Verificar coincidencias parciales (más flexible)
      const hasPartialMatch = data.variations.some(variation => {
        const normalizedVariation = normalizeText(variation);
        return normalizedCategory.includes(normalizedVariation) ||
               normalizedVariation.includes(normalizedCategory);
      });
      
      if (hasPartialMatch) {
        return data.component;
      }
      
      // 3. Verificar por palabras clave si no hay coincidencia exacta
      if (categoryKeywords[key]) {
        const hasKeyword = categoryKeywords[key].some(keyword => 
          normalizedCategory.includes(keyword)
        );
        
        if (hasKeyword) {
          return data.component;
        }
      }
      
      // 4. Verificar si la categoría contiene el nombre principal
      if (normalizedCategory.includes(key) || key.includes(normalizedCategory)) {
        return data.component;
      }
    }
    
    return null;
  };

  const SelectedSlider = findCategory(categoryName);

  if (!SelectedSlider) {
    // Mostrar slider general
    return (
      <div className="dynamic-slider-container">
        <div className="slider-info mb-3">
          <h5 className="text-muted">
            <i className="fas fa-arrow-right me-2"></i>
            Explorando: {categoryName}
          </h5>
        </div>
        <CategorySliderEmoji />
      </div>
    );
  }

  return (
    <div className="dynamic-slider-container">
      <div className="slider-info mb-3">
        <h5 className="text-primary">
          <i className="fas fa-layer-group me-2"></i>
          Subcategorías de {categoryName}
        </h5>
      </div>
      <SelectedSlider />
    </div>
  );
};

export default DynamicCategorySlider;