// camposComun/ModeleField.js - CON SINCRONIZACIÓN
import React, { useState, useEffect } from 'react';
import { Form, Alert, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ModeleField = ({ 
  selectedCategory,
  selectedSubCategory,
  selectedBrand, // ← Esto viene de postData.marque via FieldRenderer
  postData, 
  handleChangeInput,
  name = 'modele',
  label = 'Modèle',
  isRTL
}) => {
  const { t } = useTranslation();
  const [filteredModels, setFilteredModels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // 🔍 DEBUG: Ver qué marca tenemos
  useEffect(() => {
    console.log('🔧 ModeleField - Marca actual:', selectedBrand);
  }, [selectedBrand]);
  
  // 📦 BASE DE DATOS DE MODELOS (simplificada)
  const allModelsByCategoryAndBrand = {
    // ============ 🚗 AUTOMOBILES ============
    'vehicules': {
      'automobiles': {
        'Toyota': ['Corolla', 'Yaris', 'RAV4', 'Hilux', 'Land Cruiser Prado', 'Camry', 'C-HR', 'Prius', 'Auris', 'Avensis'],
        'Renault': ['Clio', 'Megane', 'Captur', 'Kadjar', 'Talisman', 'Duster', 'Kangoo', 'Twingo', 'Scénic', 'Espace'],
        'Peugeot': ['208', '308', '3008', '5008', 'Partner', '2008', '508', '3008', 'Rifter', 'Expert'],
        'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'GLC', 'GLE', 'Classe B', 'Classe G', 'Vito', 'Sprinter'],
        'BMW': ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5', 'X6', 'Série 7', 'Z4', 'i8'],
        'Hyundai': ['i10', 'i20', 'i30', 'Tucson', 'Santa Fe', 'Kona', 'Elantra', 'Accent', 'Getz'],
        'Kia': ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Sorento', 'Stonic', 'Niro', 'Seltos', 'Carnival'],
        'Dacia': ['Sandero', 'Logan', 'Duster', 'Lodgy', 'Spring', 'Jogger'],
        'Citroën': ['C3', 'C4', 'C5 Aircross', 'Berlingo', 'C-Elysée', 'DS3', 'DS4', 'Jumpy'],
        'Ford': ['Fiesta', 'Focus', 'Kuga', 'Puma', 'EcoSport', 'Mondeo', 'Transit', 'Ranger']
      },
      'motos': {
        'Honda': ['CBR600RR', 'CBR1000RR', 'CB500F', 'CB650R', 'Africa Twin', 'Gold Wing', 'CRF250L', 'SH300i'],
        'Yamaha': ['YZF-R1', 'YZF-R6', 'MT-07', 'MT-09', 'XMAX 300', 'Ténéré 700', 'WR250R', 'NMAX'],
        'Suzuki': ['GSX-R1000', 'GSX-R750', 'V-Strom 650', 'Burgman 400', 'Hayabusa', 'SV650', 'DR-Z400'],
        'Kawasaki': ['Ninja ZX-10R', 'Ninja 650', 'Z900', 'Versys 650', 'KLX250', 'Vulcan S', 'Ninja 400'],
        'BMW Motorrad': ['R 1250 GS', 'S 1000 RR', 'F 850 GS', 'R nineT', 'C 400 X', 'K 1600 GTL']
      },
      'utilitaires': {
        'Mercedes-Benz': ['Sprinter', 'Vito', 'Citan', 'Actros', 'Atego'],
        'Renault': ['Master', 'Trafic', 'Kangoo', 'Alaskan'],
        'Ford': ['Transit', 'Ranger', 'Transit Custom', 'F-MAX'],
        'Fiat': ['Ducato', 'Doblò', 'Talento', 'Fullback'],
        'Peugeot': ['Boxer', 'Partner', 'Expert', 'Landtrek']
      },
      'camions': {
        'Mercedes-Benz': ['Actros', 'Arocs', 'Antos', 'Atego'],
        'Volvo': ['FH', 'FM', 'FE', 'FL'],
        'Scania': ['R-series', 'S-series', 'G-series', 'P-series'],
        'MAN': ['TGX', 'TGS', 'TGM', 'TGL'],
        'Iveco': ['Stralis', 'Trakker', 'Eurocargo', 'Daily']
      }
    },
  
    // ============ 📱 TÉLÉPHONES ============
    'telephones': {
      'smartphones': {
        'Samsung': [
          'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy A54', 'Galaxy A34',
          'Galaxy Z Flip5', 'Galaxy Z Fold5', 'Galaxy Note 20', 'Galaxy S21 FE'
        ],
        'Apple': [
          'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14 Pro Max',
          'iPhone 14 Pro', 'iPhone 14', 'iPhone 13', 'iPhone SE (3rd gen)'
        ],
        'Xiaomi': [
          'Redmi Note 12 Pro', 'Redmi Note 12', 'Xiaomi 13 Pro', 'Xiaomi 13',
          'Poco X5 Pro', 'Poco F5', 'Redmi 12C', 'Mi 11 Lite'
        ],
        'Oppo': [
          'Reno 8 Pro', 'Reno 8', 'Find X5 Pro', 'Find X5', 'A96', 'A77', 'A57'
        ],
        'Huawei': [
          'P50 Pro', 'Mate 50 Pro', 'Nova 10 Pro', 'P40 Lite', 'Y9a', 'Enjoy 20e'
        ],
        'Condor': [
          'Plume L5', 'Plume P8 Pro', 'Plume P8', 'Griffe G6', 'Allure A9',
          'Infinity F1', 'Phoenix P1'
        ]
      },
      'tablettes': {
        'Samsung': [
          'Galaxy Tab S9 Ultra', 'Galaxy Tab S9+', 'Galaxy Tab S9', 'Galaxy Tab A8',
          'Galaxy Tab S7 FE', 'Galaxy Tab S6 Lite'
        ],
        'Apple': [
          'iPad Pro 12.9"', 'iPad Pro 11"', 'iPad Air', 'iPad 10', 'iPad Mini',
          'iPad 9'
        ],
        'Lenovo': [
          'Tab P11 Pro', 'Tab P11', 'Tab M10', 'Yoga Tab 13', 'Tab K10'
        ],
        'Huawei': [
          'MatePad Pro', 'MatePad 11', 'MatePad T10', 'MediaPad M6'
        ]
      }
    },
  
    // ============ 💻 INFORMATIQUE ============
    'informatique': {
      'ordinateurs_portables': {
        'Lenovo': [
          'ThinkPad X1 Carbon', 'ThinkPad T14', 'IdeaPad 5', 'Yoga 9i', 'Legion 5 Pro',
          'ThinkBook 14', 'IdeaPad Gaming 3', 'Yoga Slim 7'
        ],
        'HP': [
          'Pavilion 15', 'Envy x360', 'Spectre x360', 'Omen 16', 'ProBook 450',
          'EliteBook 840', 'Victus 16', 'Pavilion Gaming 15'
        ],
        'Dell': [
          'XPS 13', 'XPS 15', 'Inspiron 15', 'Latitude 5420', 'Alienware m15',
          'Vostro 3510', 'Precision 3560', 'G15 Gaming'
        ],
        'Apple': [
          'MacBook Pro 16"', 'MacBook Pro 14"', 'MacBook Air M2', 'MacBook Air M1',
          'MacBook Pro 13"'
        ],
        'Asus': [
          'ZenBook 14', 'VivoBook 15', 'ROG Zephyrus G14', 'TUF Gaming A15',
          'ExpertBook B9', 'ROG Strix G17'
        ],
        'Acer': [
          'Aspire 5', 'Swift 3', 'Nitro 5', 'Predator Helios 300', 'TravelMate P4',
          'Spin 5', 'ConceptD 3'
        ]
      },
      'ordinateurs_bureau': {
        'Dell': [
          'OptiPlex 3090', 'Precision 3640', 'XPS 8940', 'Inspiron 3880',
          'Alienware Aurora R13'
        ],
        'HP': [
          'Pavilion TP01', 'ProDesk 400', 'EliteDesk 800', 'Omen 45L',
          'Victus Gaming 15L'
        ],
        'Apple': [
          'iMac 24"', 'Mac Mini', 'Mac Studio', 'Mac Pro'
        ],
        'Asus': [
          'ROG Strix GA35', 'ExpertCenter D7', 'ProArt Station PD5'
        ]
      },
      'ecrans': {
        'Samsung': [
          'Odyssey G9', 'CRG9', 'U28R550', 'S24F350', 'T55', 'C27F390',
          'Odyssey G7', 'Smart Monitor M7'
        ],
        'LG': [
          'UltraGear 27GN800', 'UltraFine 4K', '27UK850', '24MK600',
          'UltraWide 34WN780', '32UN880'
        ],
        'Dell': [
          'UltraSharp U2720Q', 'P2722H', 'S2721DS', 'Alienware AW3423DW',
          'UltraSharp U3818DW'
        ],
        'HP': [
          'Pavilion 27', 'EliteDisplay E243', 'Omen 27i', 'Z27k G3'
        ]
      }
    },
  
    // ============ 🏠 ÉLECTROMÉNAGER ============
    'electromenager': {
      'televiseurs': {
        'Samsung': [
          'QLED QN90B', 'Crystal UHD AU8000', 'The Frame 2023', 'Neo QLED QN85B',
          'OLED S95B', 'TU7000', 'AU9000', 'Q60B'
        ],
        'LG': [
          'OLED C3', 'OLED G3', 'NanoCell NANO80', 'UHD 4K UN7000',
          'QNED QNED80', 'OLED B3', 'Smart TV UQ75'
        ],
        'Sony': [
          'BRAVIA XR A80K', 'BRAVIA XR X90K', 'BRAVIA X80K', 'BRAVIA X85K',
          'BRAVIA X95K'
        ],
        'TCL': [
          'C735', 'C635', 'P735', 'C825', '4K Android TV', 'Mini LED C935'
        ],
        'IRIS': [
          'Smart TV 4K UHD', 'LED TV Full HD', 'Android TV 43"', 'Ultra Slim 32"'
        ]
      },
      'refrigerateurs_congelateurs': {
        'Whirlpool': [
          'W7X 97OX INV', 'MaxiCool 345L', 'FrostFree 280L', 'Side by Side 615L',
          'Inverter 400L'
        ],
        'Bosch': [
          'KGN39XW30', 'GSV33VW31', 'VarioPerfect', 'KIR81AF30',
          'NoFrost KGN39XI30'
        ],
        'LG': [
          'InstaView Door-in-Door', 'DoorCooling+', 'Smart Inverter 450L',
          'Side by Side 635L'
        ],
        'Brandt': [
          'BFD6320W', 'BFC5200W', 'Inverter 380L', 'No Frost 320L',
          'Americain 550L'
        ]
      },
      'machines_laver': {
        'Whirlpool': [
          'FSCR10432', 'TDLR 7020', 'FreshCare 8kg', 'Inverter 10kg',
          'EcoSilence 7kg'
        ],
        'Bosch': [
          'WAX32M40', 'WAN28M80', 'Serie 6', 'Serie 8', 'PerfectDry',
          'WAV28KH8'
        ],
        'Indesit': [
          'BWSA 61051', 'BWSB 51051', 'EcoTime', 'Power Clean 7kg'
        ],
        'Samsung': [
          'WW10T534DAW', 'WW90T534DAW', 'AddWash', 'QuickDrive',
          'Ecobubble'
        ]
      }
    },
  
    // ============ 👕 VÊTEMENTS ============
    'vetements': {
      'vetements_homme': {
        'Zara': ['Basic Tee', 'Premium Chinos', 'TRF Jeans', 'Join Life Shirt', 'Overshirt'],
        'H&M': ['Divided Jeans', 'Premium Quality Shirt', 'Conscious Sweater', 'L.O.G.G. Hoodie'],
        'Celio': ['Classic Shirt', 'Smart Pants', 'Urban Jacket', 'Essential Polo'],
        'Nike': ['Dri-FIT T-Shirt', 'Jordan Hoodie', 'Tech Fleece Joggers', 'Sportswear Shorts']
      },
      'chaussures': {
        'Nike': ['Air Force 1', 'Air Max 90', 'Jordan 1', 'Dunk Low', 'Blazer'],
        'Adidas': ['Superstar', 'Stan Smith', 'Ultraboost 22', 'Gazelle', 'Samba'],
        'Puma': ['Suede Classic', 'Cali Sport', 'RS-X', 'Future Rider'],
        'Converse': ['Chuck Taylor All Star', 'Chuck 70', 'Run Star Hike']
      }
    },
  
    // ============ 💄 SANTÉ & BEAUTÉ ============
    'sante_beaute': {
      'parfums': {
        'Dior': ['Sauvage', 'J\'adore', 'Miss Dior', 'Homme', 'Poison'],
        'Chanel': ['N°5', 'Coco Mademoiselle', 'Bleu de Chanel', 'Chance', 'Gabrielle'],
        'Lancôme': ['La Vie Est Belle', 'Idôle', 'Trésor', 'Miracle'],
        'Yves Rocher': ['Nature', 'Comme une Evidence', 'Rose', 'Violette']
      }
    },
  
    // ============ 🛋️ MEUBLES ============
    'meubles': {
      'canapes': {
        'IKEA': ['KIVIK', 'VALLENTUNA', 'FÄRLÖV', 'LANDSKRONA', 'EKTORP'],
        'BUT': ['Cumulus', 'Stratus', 'Nimbus', 'Plume', 'Aurore'],
        'Fly': ['Manhattan', 'Brooklyn', 'Queens', 'Bronx']
      },
      'lits': {
        'IKEA': ['MALM', 'HEMNES', 'BRIMNES', 'NORDLI', 'SLATTUM'],
        'Kitea': ['Sultan', 'Calif', 'Emir', 'Pacha'],
        'Conforama': ['Morphée', 'Hypnos', 'Thanatos', 'Oniros']
      }
    },
  
    // ============ 🎮 LOISIRS ============
    'loisirs': {
      'consoles': {
        'Sony PlayStation': ['PS5', 'PS5 Digital Edition', 'PS4 Pro', 'PS4 Slim', 'PS4'],
        'Microsoft Xbox': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S'],
        'Nintendo': ['Nintendo Switch OLED', 'Nintendo Switch', 'Nintendo Switch Lite', 'Wii U']
      }
    },
  
    // ============ 🏋️ SPORT ============
    'sport': {
      'raquettes_tennis': {
        'Wilson': ['Pro Staff', 'Blade', 'Burn', 'Clash', 'Ultra'],
        'Babolat': ['Pure Drive', 'Pure Aero', 'Pure Strike', 'Boost'],
        'Head': ['Speed', 'Radical', 'Prestige', 'Graphene 360+'],
        'Yonex': ['EZONE', 'VCORE', 'ASTREL', 'PERCEPT']
      }
    },
  
    // ============ 🔩 PIÈCES DÉTACHÉES ============
    'pieces_detachees': {
      'pneus': {
        'Michelin': ['Pilot Sport 4', 'Primacy 4', 'Energy Saver', 'Latitude Sport 3'],
        'Continental': ['PremiumContact 6', 'SportContact 7', 'EcoContact 6', 'AllSeasonContact'],
        'Pirelli': ['P Zero', 'Cinturato P7', 'Scorpion Verde', 'Angel GT'],
        'Bridgestone': ['Potenza RE-71R', 'Turanza T005', 'Dueler H/P Sport', 'Ecopia EP500']
      }
    }
  };
  
  // 🔄 SINCRONIZACIÓN: Cuando cambia la marca, buscar modelos
  useEffect(() => {
    console.log('🔄 ModeleField buscando modelos para:', {
      category: selectedCategory,
      subCategory: selectedSubCategory,
      brand: selectedBrand
    });
    
    if (!selectedCategory || !selectedBrand) {
      setFilteredModels([]);
      return;
    }
    
    setIsLoading(true);
    
    // Simular carga (en producción sería inmediato)
    const timer = setTimeout(() => {
      try {
        const categoryData = allModelsByCategoryAndBrand[selectedCategory];
        if (!categoryData) {
          setFilteredModels([]);
          return;
        }
        
        let models = [];
        
        // Buscar en subcategoría específica
        if (selectedSubCategory && categoryData[selectedSubCategory]) {
          models = categoryData[selectedSubCategory][selectedBrand] || [];
        }
        
        // Si no hay, buscar en toda la categoría
        if (models.length === 0) {
          Object.values(categoryData).forEach(subCatData => {
            if (subCatData[selectedBrand]) {
              models = [...models, ...subCatData[selectedBrand]];
            }
          });
          models = [...new Set(models)]; // Eliminar duplicados
        }
        
        console.log(`✅ Encontrados ${models.length} modelos para ${selectedBrand}`);
        setFilteredModels(models);
        
        // 🔥 OPCIÓN EXTRA: Si solo hay un modelo, seleccionarlo automáticamente
        if (models.length === 1 && !postData[name]) {
          console.log('🎯 Seleccionando automáticamente el único modelo');
          handleChangeInput({
            target: { name, value: models[0] }
          });
        }
        
      } catch (error) {
        console.error('❌ Error cargando modelos:', error);
        setFilteredModels([]);
      } finally {
        setIsLoading(false);
      }
    }, 300); // Pequeño delay para simular carga
    
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedSubCategory, selectedBrand]);
  
  // 🎨 RENDER
  return (
    <Form.Group className="mt-3">
      <Form.Label>🛠️ {t(label)}</Form.Label>
      
      {/* Mensaje si no hay marca */}
      {!selectedBrand ? (
        <Alert variant="warning" className="py-2 mb-2">
          <small>
            <i className="bi bi-info-circle me-2"></i>
            {t('select_brand_first', 'Sélectionnez d\'abord une marque')}
          </small>
        </Alert>
      ) : null}
      
      {/* Mostrar marca seleccionada */}
      {selectedBrand && (
        <div className="mb-2">
          <small className="text-muted">
            <i className="bi bi-tag me-1"></i>
            Marque sélectionnée: <strong>{selectedBrand}</strong>
          </small>
        </div>
      )}
      
      {/* Select de modelos */}
      {selectedBrand ? (
        isLoading ? (
          <div className="text-center py-2">
            <Spinner animation="border" size="sm" className="me-2" />
            <small>Chargement des modèles...</small>
          </div>
        ) : filteredModels.length > 0 ? (
          <>
            <Form.Select
              name={name}
              value={postData[name] || ''}
              onChange={handleChangeInput}
              disabled={isLoading}
            >
              <option value="">{t('select_model', 'Sélectionnez un modèle')}</option>
              {filteredModels.map((model) => (
                <option key={model} value={model}>{model}</option>
              ))}
              <option value="autre">{t('other_model', 'Autre modèle')}</option>
            </Form.Select>
            <Form.Text className="text-muted">
              <small>{filteredModels.length} modèles disponibles</small>
            </Form.Text>
          </>
        ) : (
          <Form.Control
            type="text"
            name={name}
            value={postData[name] || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_model_manually', 'Entrez le modèle manuellement')}
            disabled={isLoading}
          />
        )
      ) : (
        <Form.Control
          type="text"
          name={name}
          value={postData[name] || ''}
          onChange={handleChangeInput}
          placeholder={t('select_brand_first', 'Sélectionnez d\'abord une marque')}
          disabled
        />
      )}
      
      {/* Campo para "otro" modelo */}
      {postData[name] === 'autre' && (
        <Form.Control
          type="text"
          name={`${name}_custom`}
          value={postData[`${name}_custom`] || ''}
          onChange={handleChangeInput}
          placeholder={t('specify_model', 'Précisez le modèle')}
          className="mt-2"
        />
      )}
    </Form.Group>
  );
};

export default ModeleField;