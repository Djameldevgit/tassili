// 📁 src/components/camposComun/ModeleField.js
import React, { useState, useEffect, useMemo } from 'react';
import { Form, Alert, Spinner, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModeleField = ({ 
  mainCategory,        // ← Ej: 'telephones', 'vehicules', 'electromenager'
  subCategory,         // ← Ej: 'smartphones', 'automobiles', 'televiseurs'
  postData,            // ← Contiene la marca seleccionada en postData.marque
  handleChangeInput,
  fieldName = 'modele',
  label = 'model',
  brandField = 'marque', // ← Nombre del campo de marca (puede ser 'marque', 'brand', etc.)
  isRTL,
  t
}) => {
  const [filteredModels, setFilteredModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // 🔄 Extraer la marca seleccionada de postData
  useEffect(() => {
    const brand = postData[brandField];
    console.log('🔍 ModeleField - Marca detectada:', {
      brand,
      brandField,
      'postData keys': Object.keys(postData)
    });
    setSelectedBrand(brand);
  }, [postData, brandField]);

  // 📦 BASE DE DATOS COMPLETA PARA TODAS LAS CATEGORÍAS
  const ALL_MODELS_DATABASE = useMemo(() => ({
    // ============ 📱 TÉLÉPHONES ============
    'telephones': {
      'smartphones': {
        'Apple': [
          'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max',
          'iPhone 14 Pro', 'iPhone 14', 'iPhone 13 Pro', 'iPhone 13', 'iPhone SE'
        ],
        'Samsung': [
          'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy A54', 'Galaxy A34',
          'Galaxy Z Flip5', 'Galaxy Z Fold5', 'Galaxy Note 20', 'Galaxy S21 FE'
        ],
        'Xiaomi': [
          'Redmi Note 12 Pro', 'Redmi Note 12', 'Xiaomi 13 Pro', 'Xiaomi 13',
          'Poco X5 Pro', 'Poco F5', 'Redmi 12C', 'Mi 11 Lite'
        ],
        'Huawei': [
          'P50 Pro', 'Mate 50 Pro', 'Nova 10 Pro', 'P40 Lite', 'Y9a', 'Enjoy 20e'
        ],
        'Condor': [
          'Plume L5', 'Plume P8 Pro', 'Plume P8', 'Griffe G6', 'Allure A9'
        ]
      },
      'tablettes': {
        'Apple': ['iPad Pro', 'iPad Air', 'iPad', 'iPad mini'],
        'Samsung': ['Galaxy Tab S9', 'Galaxy Tab A8', 'Galaxy Tab S7 FE'],
        'Huawei': ['MatePad Pro', 'MatePad 11', 'MatePad T10s'],
        'Lenovo': ['Tab P11 Pro', 'Tab M10', 'Tab P12']
      }
    },

    // ============ 🚗 VEHICULES ============
    'vehicules': {
      'automobiles': {
        'Toyota': ['Corolla', 'Yaris', 'RAV4', 'Hilux', 'Land Cruiser', 'Camry', 'C-HR'],
        'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Talisman', 'Duster'],
        'Peugeot': ['208', '308', '3008', '5008', 'Partner', '2008', '508'],
        'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'GLC', 'GLE', 'Classe S'],
        'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5', 'X7']
      },
      'motos': {
        'Honda': ['CBR600RR', 'CBR1000RR', 'CB500F', 'Africa Twin', 'Gold Wing'],
        'Yamaha': ['YZF-R1', 'MT-07', 'MT-09', 'XMAX', 'Ténéré 700'],
        'Suzuki': ['GSX-R1000', 'V-Strom 650', 'Burgman 400', 'Hayabusa']
      },
      'utilitaires': {
        'Mercedes-Benz': ['Sprinter', 'Vito', 'Citan'],
        'Renault': ['Master', 'Trafic', 'Kangoo'],
        'Ford': ['Transit', 'Ranger', 'Transit Custom']
      }
    },

    // ============ 🏠 ÉLECTROMÉNAGER ============
    'electromenager': {
      'televiseurs': {
        'Samsung': ['QLED Q60', 'Crystal UHD', 'The Frame', 'Neo QLED', 'TU7000'],
        'LG': ['OLED C3', 'NanoCell', 'UHD 4K', 'QNED', 'UN7000'],
        'Sony': ['BRAVIA XR', 'BRAVIA X80', 'BRAVIA X90', 'KD-55X80J'],
        'TCL': ['C71', 'C81', 'P71', '4K Android TV'],
        'IRIS': ['Smart TV 4K', 'LED TV', 'Android TV']
      },
      'refrigerateurs': {
        'Whirlpool': ['W7X', 'MaxiCool', 'FrostFree', 'Inverter'],
        'Bosch': ['KGN', 'GSV', 'Vario', 'VitaFresh'],
        'LG': ['InstaView', 'DoorCooling+', 'Smart Inverter'],
        'Brandt': ['BFD', 'BFC', 'Inverter', 'No Frost']
      },
      'machines_laver': {
        'Whirlpool': ['FSCR', 'WFC', 'UltraCare', 'EcoPower'],
        'Bosch': ['WAT', 'WAE', 'WGA', 'VarioPerfect'],
        'LG': ['Direct Drive', 'TurboWash', 'AI DD', 'Inverter Direct Drive'],
        'Brandt': ['WFE', 'WFH', 'EcoSilence', 'Jet System']
      },
      'climatisation': {
        'Daikin': ['FTXJ', 'ATXJ', 'Ururu Sarara', 'Emura'],
        'Carrier': ['AquaSnap', 'AquaForce', 'WeatherMaker'],
        'LG': ['Art Cool', 'Dual Inverter', 'Platinum'],
        'Mitsubishi': ['MSZ', 'MUZ', 'Mr. Slim', 'Kirigamine']
      }
    },

    // ============ 💻 INFORMATIQUE ============
    'informatique': {
      'ordinateurs_portables': {
        'Dell': ['XPS 13', 'XPS 15', 'Inspiron 15', 'Latitude', 'Alienware'],
        'HP': ['Spectre x360', 'Envy', 'Pavilion', 'Omen', 'EliteBook'],
        'Lenovo': ['ThinkPad X1', 'ThinkPad T14', 'Yoga', 'IdeaPad', 'Legion'],
        'Apple': ['MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air', 'MacBook Pro 13"'],
        'Asus': ['ZenBook', 'VivoBook', 'ROG Zephyrus', 'TUF Gaming']
      },
      'ordinateurs_bureau': {
        'Dell': ['OptiPlex', 'Precision', 'Alienware Aurora', 'XPS'],
        'HP': ['Pavilion', 'Envy', 'Omen', 'EliteDesk', 'ProDesk'],
        'Apple': ['Mac Studio', 'Mac Pro', 'iMac', 'Mac mini'],
        'Lenovo': ['ThinkCentre', 'IdeaCentre', 'Legion Tower']
      },
      'ecrans': {
        'Dell': ['UltraSharp U2723QE', 'P Series', 'S Series', 'Alienware'],
        'Samsung': ['Odyssey G9', 'Smart Monitor', 'CRG9', 'Space Monitor'],
        'LG': ['UltraGear', 'UltraFine', 'UltraWide', 'Gram +View'],
        'Asus': ['ROG Swift', 'TUF Gaming', 'ProArt', 'VY Series']
      }
    },

    // ============ 👗 VÊTEMENTS ============
    'vetements': {
      'vetements_homme': {
        'Zara': ['Basic T-Shirt', 'Chinos', 'Blazer', 'Jeans', 'Sweatshirt'],
        'H&M': ['Premium Quality', 'Divided', 'Logg', 'Modern Classic'],
        'Celio': ['Chemise', 'Pantalon', 'Veste', 'Costume', 'Polo'],
        'Jack & Jones': ['Vintage', 'Core', 'Premium', 'Athletic']
      },
      'vetements_femme': {
        'Zara': ['Basic Top', 'Midi Dress', 'Blazer', 'Jeans', 'Skirt'],
        'H&M': ['Divided', 'Premium Quality', 'Logg', 'Conscious'],
        'Mango': ['Committed', 'New Classics', 'Limited Edition', 'Studio']
      }
    },

    // ============ 🛋️ MEUBLES ============
    'meubles': {
      'meubles_maison': {
        'IKEA': ['BILLY', 'PAX', 'KALLAX', 'MALM', 'HEMNES', 'POÄNG'],
        'Fly': ['Salon', 'Chambre', 'Bureau', 'Cuisine', 'Salle à manger'],
        'Kitea': ['Moderne', 'Classique', 'Contemporain', 'Scandinave'],
        'BUT': ['Canapé', 'Table', 'Armoire', 'Lit', 'Chaise']
      },
      'meubles_bureau': {
        'IKEA': ['BEKANT', 'MICKE', 'LINNMON', 'MALM'],
        'Herman Miller': ['Aeron', 'Embody', 'Mirra', 'Sayl'],
        'Steelcase': ['Leap', 'Gesture', 'Think', 'Series']
      }
    },

    // ============ 🎮 LOISIRS ============
    'loisirs': {
      'consoles_jeux_videos': {
        'Sony': ['PlayStation 5', 'PlayStation 4', 'PlayStation 3', 'PS Vita'],
        'Microsoft': ['Xbox Series X', 'Xbox Series S', 'Xbox One', 'Xbox 360'],
        'Nintendo': ['Switch OLED', 'Switch', 'Switch Lite', 'Wii U', '3DS']
      },
      'instruments_musique': {
        'Yamaha': ['P-125', 'DGX-670', 'PSS-F30', 'TRBX174'],
        'Fender': ['Stratocaster', 'Telecaster', 'Jazzmaster', 'Precision Bass'],
        'Roland': ['GO:PIANO', 'FP-10', 'FA-07', 'TD-1DMK']
      }
    },

    // ============ 🏋️ SPORT ============
    'sport': {
      'fitness_musculation': {
        'Decathlon': ['DOMYOS', 'Domyos Flow', 'Kipsta', 'Quechua'],
        'Nike': ['Air Max', 'Jordan', 'Blazer', 'Cortez'],
        'Adidas': ['Ultraboost', 'Superstar', 'Stan Smith', 'NMD']
      },
      'velos': {
        'Decathlon': ['Rockrider', 'Btwin', 'Triban', 'Elops'],
        'Scott': ['Scale', 'Spark', 'Genius', 'Contessa'],
        'Trek': ['Fuel EX', 'Slash', 'Remedy', 'Session']
      }
    },

    // ============ 🔩 PIÈCES DÉTACHÉES ============
    'pieces_detachees': {
      'pieces_automobiles': {
        'Bosch': ['Bougie', 'Filtre à air', 'Batterie', 'Élément d\'allumage'],
        'Valeo': ['Alternateur', 'Démarreur', 'Embrayage', 'Phare'],
        'Delphi': ['Capteur', 'Calculateur', 'Câble', 'Connecteur']
      },
      'pieces_telephones': {
        'Samsung': ['Écran', 'Batterie', 'Caméra', 'Connecteur de charge'],
        'Apple': ['Écran iPhone', 'Batterie iPhone', 'Caméra iPhone', 'Haut-parleur']
      }
    }
  }), []);

  // 🔄 SINCRONIZACIÓN: Buscar modelos cuando cambia la marca
  useEffect(() => {
    console.log('🔄 ModeleField - Buscando modelos para:', {
      mainCategory,
      subCategory,
      selectedBrand
    });

    if (!mainCategory || !selectedBrand) {
      setFilteredModels([]);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      try {
        // 1. Verificar si la categoría existe
        const categoryData = ALL_MODELS_DATABASE[mainCategory];
        if (!categoryData) {
          console.warn(`❌ Categoría "${mainCategory}" no encontrada`);
          setFilteredModels([]);
          return;
        }

        let models = [];

        // 2. Buscar en subcategoría específica
        if (subCategory && categoryData[subCategory]) {
          const subCategoryData = categoryData[subCategory];
          if (subCategoryData[selectedBrand]) {
            models = subCategoryData[selectedBrand];
            console.log(`✅ Modelos encontrados en ${mainCategory}.${subCategory}.${selectedBrand}:`, models.length);
          }
        }

        // 3. Si no hay en subcategoría, buscar en toda la categoría
        if (models.length === 0) {
          Object.values(categoryData).forEach(subCat => {
            if (subCat[selectedBrand]) {
              models = [...models, ...subCat[selectedBrand]];
            }
          });
          models = [...new Set(models)]; // Eliminar duplicados
          console.log(`🔍 Modelos encontrados en ${mainCategory}.*.${selectedBrand}:`, models.length);
        }

        // 4. Ordenar alfabéticamente
        models.sort();

        setFilteredModels(models);

        // 5. Autoseleccionar si hay un solo modelo
        if (models.length === 1 && !postData[fieldName]) {
          console.log(`🤖 Autoseleccionando modelo único: ${models[0]}`);
          handleChangeInput({
            target: { name: fieldName, value: models[0] }
          });
        }

      } catch (error) {
        console.error('❌ Error en ModeleField:', error);
        setFilteredModels([]);
      } finally {
        setIsLoading(false);
      }
    }, 200); // Pequeño delay para mejor UX

    return () => clearTimeout(timer);
  }, [mainCategory, subCategory, selectedBrand, fieldName, postData, handleChangeInput]);

  // 🎨 RENDER
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        🛠️ {t?.('model') || 'Modèle'} 
        {selectedBrand && (
          <Badge bg="info" className="ms-2">
            {selectedBrand}
          </Badge>
        )}
      </Form.Label>

      {/* Mensaje de advertencia si no hay marca */}
      {!selectedBrand ? (
        <Alert variant="warning" className="py-2 mb-2">
          <small>
            <i className="fas fa-info-circle me-2"></i>
            {t?.('select_brand_first') || 'Sélectionnez d\'abord une marque'}
          </small>
        </Alert>
      ) : null}

      {/* Mostrar info de contexto */}
      {selectedBrand && mainCategory && (
        <div className="mb-2">
          <small className="text-muted">
            <i className="fas fa-tag me-1"></i>
            {mainCategory} {subCategory && `→ ${subCategory}`} → {selectedBrand}
          </small>
        </div>
      )}

      {/* SELECT DE MODELOS */}
      {selectedBrand ? (
        isLoading ? (
          <div className="text-center py-3">
            <Spinner animation="border" size="sm" className="me-2" />
            <small>{t?.('loading_models') || 'Chargement des modèles...'}</small>
          </div>
        ) : filteredModels.length > 0 ? (
          <>
            <Form.Select
              name={fieldName}
              value={postData[fieldName] || ''}
              onChange={handleChangeInput}
              disabled={isLoading}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="">
                {t?.('select_model') || `Sélectionnez un modèle ${selectedBrand}`}
              </option>

              {/* Agrupar si hay muchos modelos */}
              {filteredModels.length > 10 ? (
                <>
                  <optgroup label="Modèles populaires">
                    {filteredModels.slice(0, 8).map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Tous les modèles">
                    {filteredModels.slice(8).map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </optgroup>
                </>
              ) : (
                filteredModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))
              )}

              <option value="autre">
                {t?.('other_model') || 'Autre modèle'}
              </option>
            </Form.Select>

            <Form.Text className="text-muted">
              <small>
                <i className="fas fa-list me-1"></i>
                {filteredModels.length} {t?.('models_available') || 'modèles disponibles'}
              </small>
            </Form.Text>
          </>
        ) : (
          <Form.Control
            type="text"
            name={fieldName}
            value={postData[fieldName] || ''}
            onChange={handleChangeInput}
            placeholder={t?.('enter_model_manually') || `Entrez le modèle ${selectedBrand}`}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
        )
      ) : (
        <Form.Control
          type="text"
          name={fieldName}
          value={postData[fieldName] || ''}
          onChange={handleChangeInput}
          placeholder={t?.('select_brand_first') || 'Sélectionnez d\'abord une marque'}
          disabled
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      )}

      {/* CAMPO PARA "OTRO" MODELO */}
      {postData[fieldName] === 'autre' && (
        <div className="mt-3">
          <Form.Label className="text-primary">
            ✏️ {t?.('specify_model') || 'Spécifiez le modèle'}
          </Form.Label>
          <Form.Control
            type="text"
            name={`${fieldName}_custom`}
            value={postData[`${fieldName}_custom`] || ''}
            onChange={handleChangeInput}
            placeholder={t?.('enter_custom_model') || 'Entrez le nom exact du modèle'}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Form.Text className="text-info">
            <small>
              <i className="fas fa-lightbulb me-1"></i>
              {t?.('custom_model_hint') || 'Saisissez le modèle exact si il n\'est pas dans la liste'}
            </small>
          </Form.Text>
        </div>
      )}

      {/* INFO DE DEBUG (solo desarrollo) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2">
          <small className="text-muted">
            <i className="fas fa-bug me-1"></i>
            Debug: {mainCategory}.{subCategory}.{selectedBrand} → {filteredModels.length} modèles
          </small>
        </div>
      )}
    </Form.Group>
  );
};

export default ModeleField;