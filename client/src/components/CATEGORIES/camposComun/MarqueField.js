// MarqueField.js - CON MÁS LOGGING
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MarqueField = ({ 
  selectedCategory,
  selectedSubCategory,
  postData, 
  handleChangeInput,
  name = 'marque',
  label = 'Marque du produit'
}) => {
  const { t } = useTranslation();
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [debugInfo, setDebugInfo] = useState({});
  
  // 🔍 DEBUG: Ver qué props estamos recibiendo
  useEffect(() => {
    console.log('🔍 MarqueField recibió:', {
      selectedCategory,
      selectedSubCategory,
      tieneCategoria: !!selectedCategory,
      tieneSubCategoria: !!selectedSubCategory,
      categoriaTipo: typeof selectedCategory,
      subCategoriaTipo: typeof selectedSubCategory,
      categoriaValor: selectedCategory,
      subCategoriaValor: selectedSubCategory
    });
    
    setDebugInfo({
      categoria: selectedCategory,
      subCategoria: selectedSubCategory,
      timestamp: new Date().toISOString()
    });
  }, [selectedCategory, selectedSubCategory]);
  
  // 📦 Base de datos - SIMPLIFICADA PARA DEBUG
  const allBrandsByCategory = {
    // ============ 🏠 IMMOBILIER ============
    'immobilier': {
      'appartements': ['Cosider', 'Groupe Hasnaoui', 'Eurl Bâtiment', 'Immobiliaire', 'Particulier', 'Promoteur local'],
      'villas': ['Cosider', 'Groupe Hasnaoui', 'Architecte privé', 'Particulier', 'Promotion immobilière'],
      'terrains': ['Domaine public', 'Particulier', 'Société foncière', 'Héritage'],
      'locaux_commerciaux': ['Promoteur commercial', 'Société immobilière', 'Particulier'],
      'bureaux': ['Promoteur bureautique', 'Société immobilière', 'Particulier'],
      'garages_parkings': ['Promoteur', 'Copropriété', 'Particulier'],
      'fermes': ['Agriculteur', 'Héritage', 'Société agricole'],
      'default': ['Cosider', 'Groupe Hasnaoui', 'Eurl Bâtiment', 'Immobiliaire', 'Particulier']
    },
  
    // ============ 🚗 AUTOMOBILES & VÉHICULES ============
    'vehicules': {
      'automobiles': [
        'Toyota', 'Renault', 'Peugeot', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen',
        'Fiat', 'Hyundai', 'Kia', 'Chevrolet', 'Dacia', 'Citroën', 'Ford', 'Opel',
        'Nissan', 'Mitsubishi', 'Seat', 'Skoda', 'Suzuki', 'Honda', 'Mazda'
      ],
      'motos': [
        'Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW Motorrad', 'Ducati', 'KTM',
        'Harley-Davidson', 'Piaggio', 'Vespa', 'Sym', 'Keeway', 'Benelli', 'Aprilia'
      ],
      'utilitaires': [
        'Mercedes-Benz', 'Ford', 'Renault', 'Fiat', 'Peugeot', 'Citroën', 'Volkswagen',
        'Iveco', 'Toyota', 'Nissan', 'Isuzu', 'Mitsubishi'
      ],
      'camions': [
        'Mercedes-Benz', 'Volvo', 'Scania', 'MAN', 'Iveco', 'Renault Trucks', 'DAF',
        'Kenworth', 'Peterbilt', 'Mack'
      ],
      'engins': [
        'Caterpillar', 'Komatsu', 'Volvo CE', 'JCB', 'Liebherr', 'Case', 'New Holland',
        'Bobcat', 'Hitachi', 'Hyundai CE', 'Doosan'
      ],
      'tracteurs': [
        'John Deere', 'New Holland', 'Case IH', 'Massey Ferguson', 'Fendt', 'Valtra',
        'Deutz-Fahr', 'Kubota', 'Mahindra', 'Claas'
      ],
      'remorques': [
        'Ifor Williams', 'Bockmann', 'Knott', 'SARL', 'Bremach', 'Kögel', 'Schmitz',
        'Fruehauf', 'Lamberet'
      ],
      'quads': [
        'Yamaha', 'Honda', 'Can-Am', 'Polaris', 'Kawasaki', 'Suzuki', 'CFMOTO',
        'Arctic Cat', 'Kymco'
      ],
      'bateaux': [
        'Beneteau', 'Jeanneau', 'Bavaria', 'Dufour', 'Lagoon', 'Princess', 'Sunseeker',
        'Sea Ray', 'Bayliner', 'Yamaha', 'Suzuki Marine'
      ],
      'default': [
        'Toyota', 'Renault', 'Peugeot', 'Mercedes-Benz', 'BMW', 'Honda', 'Yamaha'
      ]
    },
  
    // ============ 📱 TÉLÉPHONES & ACCESSOIRES ============
    'telephones': {
      'smartphones': [
        'Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Huawei', 'Condor', 'Realme', 'OnePlus',
        'Vivo', 'Tecno', 'Infinix', 'Nokia', 'Google Pixel', 'Sony', 'LG', 'Motorola'
      ],
      'tablettes': [
        'Samsung', 'Apple', 'Lenovo', 'Huawei', 'Xiaomi', 'Amazon', 'Microsoft',
        'Condor', 'Acer', 'Asus'
      ],
      'accessoires': [
        'Samsung', 'Apple', 'Xiaomi', 'Anker', 'Belkin', 'Spigen', 'UAG', 'Case-Mate',
        'Mophie', 'JBL', 'Sony', 'Bose'
      ],
      'telephones_fixes': [
        'Panasonic', 'Philips', 'Gigaset', 'SNC', 'Alcatel', 'VTech', 'Geant'
      ],
      'montres_connectees': [
        'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Fitbit', 'Garmin', 'Amazfit', 'Realme'
      ],
      'default': [
        'Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Huawei', 'Condor'
      ]
    },
  
    // ============ 💻 INFORMATIQUE ============
    'informatique': {
      'ordinateurs_portables': [
        'Lenovo', 'HP', 'Dell', 'Apple', 'Asus', 'Acer', 'Condor', 'MSI', 'Razer',
        'Microsoft Surface', 'Huawei', 'Xiaomi', 'Toshiba', 'Fujitsu'
      ],
      'ordinateurs_bureau': [
        'Dell', 'HP', 'Apple', 'Asus', 'Acer', 'MSI', 'Lenovo', 'Condor', 'CyberpowerPC',
        'iBuyPower', 'Origin PC'
      ],
      'ecrans': [
        'Samsung', 'LG', 'Dell', 'HP', 'BenQ', 'Acer', 'Philips', 'Asus', 'MSI',
        'ViewSonic', 'AOC', 'Lenovo'
      ],
      'composants_pc': [
        'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Kingston', 'Seagate', 'Western Digital',
        'Crucial', 'G.Skill', 'Thermaltake', 'Cooler Master', 'Noctua', 'EVGA', 'ASUS',
        'Gigabyte', 'MSI', 'ASRock'
      ],
      'imprimantes': [
        'HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Lexmark', 'Samsung', 'Ricoh'
      ],
      'reseau': [
        'TP-Link', 'Cisco', 'Netgear', 'D-Link', 'Asus', 'Linksys', 'Ubiquiti',
        'MikroTik', 'Huawei'
      ],
      'stockage': [
        'Western Digital', 'Seagate', 'Toshiba', 'SanDisk', 'Kingston', 'Crucial',
        'Samsung', 'LaCie', 'Transcend'
      ],
      'peripheriques': [
        'Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft', 'Apple',
        'HP', 'Dell', 'Asus'
      ],
      'default': [
        'Lenovo', 'HP', 'Dell', 'Apple', 'Asus', 'Acer', 'Condor'
      ]
    },
  
    // ============ 🏠 ÉLECTROMÉNAGER ============
    'electromenager': {
      'televiseurs': [
        'Samsung', 'LG', 'Sony', 'Panasonic', 'TCL', 'Hisense', 'IRIS', 'Continental',
        'Sharp', 'Philips', 'Toshiba', 'Skyworth', 'Changhong'
      ],
      'refrigerateurs_congelateurs': [
        'Whirlpool', 'Bosch', 'LG', 'Samsung', 'Brandt', 'De Dietrich', 'IRIS',
        'Beko', 'Electrolux', 'Haier', 'Miele', 'Liebherr', 'Sharp'
      ],
      'machines_laver': [
        'Whirlpool', 'Bosch', 'Indesit', 'Brandt', 'Beko', 'Samsung', 'LG',
        'Electrolux', 'Miele', 'Candy', 'Hoover', 'Ariston', 'Vestel'
      ],
      'lave_vaisselles': [
        'Bosch', 'Miele', 'Siemens', 'Whirlpool', 'Brandt', 'Samsung', 'LG',
        'Electrolux', 'Indesit', 'Candy', 'Ariston'
      ],
      'fours_cuisson': [
        'Brandt', 'De Dietrich', 'Whirlpool', 'Bosch', 'Miele', 'Siemens',
        'Samsung', 'LG', 'Electrolux', 'Hotpoint', 'Ariston'
      ],
      'climatisation': [
        'Daikin', 'Carrier', 'Mitsubishi Electric', 'LG', 'Samsung', 'Toshiba',
        'Gree', 'Midea', 'Chigo', 'General', 'Hitachi', 'Panasonic'
      ],
      'aspirateurs': [
        'Rowenta', 'Dyson', 'Philips', 'Bosch', 'Miele', 'Black+Decker',
        'Electrolux', 'Samsung', 'LG', 'Hoover', 'Karcher'
      ],
      'chauffage': [
        'Atlantic', 'De Dietrich', 'Chaffoteaux', 'Frisquet', 'Saunier Duval',
        'Vaillant', 'Bosch', 'Ariston', 'Thermor'
      ],
      'chauffe_eau': [
        'Atlantic', 'Thermor', 'De Dietrich', 'Ariston', 'Chaffoteaux', 'Fagor',
        'Saunier Duval', 'Vaillant'
      ],
      'default': [
        'Samsung', 'LG', 'Bosch', 'Whirlpool', 'Brandt', 'IRIS', 'Moulinex'
      ]
    },
  
    // ============ 👕 VÊTEMENTS & MODE ============
    'vetements': {
      'vetements_homme': [
        'Zara', 'H&M', 'Celio', 'Jack & Jones', 'LC Waikiki', 'Mango', 'Pull & Bear',
        'Bershka', 'Stradivarius', 'Next', 'Massimo Dutti', 'UNIQLO', 'Levi\'s', 'Diesel'
      ],
      'vetements_femme': [
        'Zara', 'H&M', 'Mango', 'LC Waikiki', 'Stradivarius', 'Bershka', 'Pull & Bear',
        'Oysho', 'Naf Naf', 'Desigual', 'Promod', 'Etam', 'Cache Cache', 'Jennyfer'
      ],
      'chaussures': [
        'Nike', 'Adidas', 'Puma', 'Converse', 'Geox', 'Timberland', 'Clarks',
        'Ecco', 'Skechers', 'Vans', 'Steve Madden', 'Cat', 'Dr. Martens'
      ],
      'sacs_accessoires': [
        'Louis Vuitton', 'Chanel', 'Gucci', 'Longchamp', 'Kipling', 'Michael Kors',
        'Coach', 'Furla', 'Prada', 'Dior', 'Hermès', 'Balenciaga', 'Saint Laurent'
      ],
      'bijoux': [
        'Pandora', 'Swarovski', 'Cartier', 'Tiffany & Co.', 'Bvlgari', 'Chopard',
        'Rolex', 'Omega', 'Tag Heuer', 'Seiko', 'Casio', 'Festina'
      ],
      'sportswear': [
        'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'New Balance',
        'Asics', 'Fila', 'Ellesse', 'Kappa', 'Diadora'
      ],
      'default': [
        'Zara', 'H&M', 'Nike', 'Adidas', 'LC Waikiki'
      ]
    },
  
    // ============ 💄 SANTÉ & BEAUTÉ ============
    'sante_beaute': {
      'cosmetiques': [
        'L\'Oréal', 'Nivea', 'Garnier', 'Maybelline', 'MAC', 'Estée Lauder',
        'Clinique', 'Lancôme', 'Dior', 'Chanel', 'Yves Saint Laurent', 'Shiseido'
      ],
      'parfums': [
        'Dior', 'Chanel', 'Lancôme', 'Yves Rocher', 'Guerlain', 'Jean Paul Gaultier',
        'Paco Rabanne', 'Armani', 'Versace', 'Dolce & Gabbana', 'Calvin Klein'
      ],
      'soins_visage': [
        'Vichy', 'La Roche-Posay', 'Bioderma', 'Cetaphil', 'Eucerin', 'Avène',
        'CeraVe', 'Neutrogena', 'Nuxe', 'Caudalie', 'Filorga'
      ],
      'soins_cheveux': [
        'L\'Oréal Professionnel', 'Schwarzkopf', 'Kerastase', 'Redken', 'Wella',
        'Dessange', 'Jean Louis David', 'Phyto', 'Ducray', 'Klorane'
      ],
      'hygiene': [
        'Oral-B', 'Colgate', 'Sensodyne', 'Signal', 'Gillette', 'Schick',
        'Veet', 'Nair', 'Philips', 'Braun'
      ],
      'default': [
        'L\'Oréal', 'Nivea', 'Garnier', 'Dior', 'Chanel'
      ]
    },
  
    // ============ 🛋️ MEUBLES & DÉCORATION ============
    'meubles': {
      'salon': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama', 'Roche Bobois', 'Ligne Roset',
        'Maisons du Monde', 'Alinéa', 'Mobalpa', 'Cuisine Schmidt'
      ],
      'chambre': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama', 'Décibelle', 'Mobalpa',
        'Bébé Confort', 'Picwic', 'Nature & Découvertes'
      ],
      'cuisine': [
        'IKEA', 'Schmidt', 'Cuisinella', 'Mobalpa', 'Cuisine Plus', 'Cillit',
        'Poggenpohl', 'Bulthaup', 'SieMatic'
      ],
      'bureau': [
        'IKEA', 'Fly', 'BUT', 'Conforama', 'Musterring', 'Herman Miller',
        'Steelcase', 'Knoll', 'Haworth'
      ],
      'jardin': [
        'But', 'Jardiland', 'Truffaut', 'Leroy Merlin', 'Castorama', 'IKEA',
        'Outsunny', 'Keter', 'Suncast'
      ],
      'decoration': [
        'Maisons du Monde', 'Habitat', 'La Redoute', 'Zara Home', 'H&M Home',
        'Cultura', 'Nature & Découvertes', 'Sostrene Grene'
      ],
      'default': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama'
      ]
    },
  
    // ============ 🎮 LOISIRS & DIVERTISSEMENTS ============
    'loisirs': {
      'jeux_video': [
        'Sony PlayStation', 'Microsoft Xbox', 'Nintendo', 'Steam', 'Ubisoft',
        'Electronic Arts', 'Activision', 'Rockstar Games', 'Epic Games'
      ],
      'instruments': [
        'Yamaha', 'Fender', 'Gibson', 'Roland', 'Casio', 'Korg', 'Shure',
        'Sennheiser', 'Bose', 'Marshall', 'Peavey'
      ],
      'livres': [
        'Dar Echihab', 'ENAG', 'ANEP', 'Casbah Editions', 'Barzakh', 'Chihab',
        'Tafsir', 'El Ikhtilef', 'El Maarifa'
      ],
      'films_musique': [
        'Warner Bros', 'Universal', 'Disney', 'Sony Pictures', '20th Century Studios',
        'Netflix', 'Amazon Prime', 'Spotify', 'Apple Music', 'Deezer'
      ],
      'sports_loisirs': [
        'Decathlon', 'Go Sport', 'Intersport', 'Nike', 'Adidas', 'Puma',
        'Wilson', 'Spalding', 'Head', 'Babolat'
      ],
      'collection': [
        'Funko Pop', 'Hot Wheels', 'Lego', 'Playmobil', 'Barbie', 'Mattel',
        'Hasbro', 'Bandai', 'Gundam'
      ],
      'default': [
        'Sony PlayStation', 'Microsoft Xbox', 'Nintendo'
      ]
    },
  
    // ============ 🏋️ SPORT ============
    'sport': {
      'football': [
        'Nike', 'Adidas', 'Puma', 'Umbro', 'Kappa', 'Joma', 'Mitre', 'Select'
      ],
      'fitness': [
        'Decathlon', 'Nike', 'Adidas', 'Reebok', 'Under Armour', 'Technogym',
        'Life Fitness', 'Precor', 'Bowflex'
      ],
      'combat': [
        'Everlast', 'Venum', 'Fairtex', 'Twins Special', 'Top King', 'Hayabusa',
        'Adidas', 'Nike'
      ],
      'randonnee': [
        'The North Face', 'Columbia', 'Salomon', 'Merrell', 'Quechua', 'Mammut',
        'Arc\'teryx', 'Patagonia', 'Jack Wolfskin'
      ],
      'velo': [
        'Decathlon', 'Scott', 'Trek', 'Specialized', 'Giant', 'Cannondale',
        'Bianchi', 'Pinarello', 'Merida'
      ],
      'natation': [
        'Arena', 'Speedo', 'Nabaiji', 'Zoggs', 'TYR', 'Mad Wave', 'Adidas'
      ],
      'tennis': [
        'Wilson', 'Babolat', 'Head', 'Yonex', 'Prince', 'Dunlop', 'Technifibre'
      ],
      'default': [
        'Decathlon', 'Nike', 'Adidas', 'Puma'
      ]
    },
  
    // ============ 🍎 ALIMENTAIRES ============
    'alimentaires': {
      'produits_laitiers': [
        'Cevital', 'Ifri', 'Samouss', 'Groupe Benamor', 'Laïbdel', 'Bimo',
        'Djouzia', 'Lactalis', 'Danone', 'Nestlé'
      ],
      'boissons': [
        'Ifri', 'Cevital', 'Cristal', 'Hamoud', 'Saïda', 'Ouled El Bahri',
        'Coca-Cola', 'Pepsi', 'Monster', 'Red Bull'
      ],
      'epicerie': [
        'Cevital', 'Bimo', 'Laïbdel', 'Mazafran', 'Groupe Benamor', 'Djouzia',
        'Samouss', 'Lazreg'
      ],
      'viandes': [
        'Soficome', 'Sarl Metidji', 'Laïbdel', 'Dounia', 'Terroirs d\'Algérie'
      ],
      'fruits_legumes': [
        'Terroirs d\'Algérie', 'Agrisal', 'Fermes locales', 'Producteurs directs'
      ],
      'patisserie': [
        'Bimo', 'Laïbdel', 'Mazafran', 'Gâteau d\'Algérie', 'Pâtisserie traditionnelle'
      ],
      'default': [
        'Cevital', 'Ifri', 'Samouss', 'Groupe Benamor', 'Laïbdel', 'Bimo'
      ]
    },
  
    // ============ 🧱 MATÉRIAUX DE CONSTRUCTION ============
    'materiaux': {
      'ciment': [
        'Lafarge', 'Biskria Ciment', 'GICA', 'Ain Touta', 'Sigus', 'Zahana'
      ],
      'acier': [
        'Sider', 'Tosyali', 'Bellara', 'Metal SPA', 'Ferrailles locales'
      ],
      'carrelage': [
        'Cevital Bâtiment', 'Sika', 'Weber', 'Mapei', 'Keraben', 'Porcelanosa',
        'Roca', 'Villeroy & Boch'
      ],
      'bois': [
        'Bois exotiques', 'Bois locaux', 'Contreplaqué importé', 'MDF', 'Agencement'
      ],
      'peinture': [
        'Reynaers', 'Jotun', 'Sikkens', 'Dulux', 'Ripolin', 'Mipal', 'Socer'
      ],
      'isolation': [
        'Isover', 'Rockwool', 'Knauf', 'URSA', 'Paroc', 'Actis'
      ],
      'default': [
        'Lafarge', 'Biskria Ciment', 'Cevital Bâtiment', 'Sika', 'Weber'
      ]
    },
  
    // ============ 🛠️ SERVICES ============
    'services': {
      'construction': [
        'Entreprise BTP', 'Artisan local', 'Architecte', 'Bureau d\'études',
        'Société de promotion'
      ],
      'transport': [
        'Transporteur local', 'Société de déménagement', 'Livraison rapide',
        'Taxi', 'Location véhicule'
      ],
      'nettoyage': [
        'Société de nettoyage', 'Agent d\'entretien', 'Services à domicile',
        'Nettoyage industriel'
      ],
      'reparation': [
        'Artisan réparateur', 'Service après-vente', 'Technicien agréé',
        'Bricoleur professionnel'
      ],
      'formation': [
        'Centre de formation', 'Formateur indépendant', 'École privée',
        'Université', 'Organisme certifié'
      ],
      'default': [
        'Particulier', 'Entreprise locale', 'Freelance', 'Société agréée'
      ]
    },
  
    // ============ ✈️ VOYAGES ============
    'voyages': {
      'vols': [
        'Air Algérie', 'Tassili Airlines', 'Air France', 'Turkish Airlines',
        'Emirates', 'Qatar Airways', 'Lufthansa', 'British Airways', 'Vueling', 'Ryanair'
      ],
      'hotels': [
        'Hilton', 'Sheraton', 'Marriott', 'Ibis', 'Novotel', 'Mövenpick',
        'Golden Tulip', 'Radisson Blu', 'Sofitel'
      ],
      'agences_voyage': [
        'Air Algérie Voyages', 'Best Travel', 'Sahara Voyages', 'Tassili Travel',
        'Algérie Tours', 'Travel Service'
      ],
      'location_voitures': [
        'Europcar', 'Hertz', 'Avis', 'Sixt', 'Budget', 'Local rent-a-car',
        'Taxi longue distance'
      ],
      'croisieres': [
        'MSC Croisières', 'Costa Croisières', 'Royal Caribbean', 'Norwegian Cruise Line',
        'Celebrity Cruises'
      ],
      'default': [
        'Air Algérie', 'Tassili Airlines', 'Air France', 'Turkish Airlines'
      ]
    },
  
    // ============ 💼 EMPLOI ============
    'emploi': {
      'informatique': [
        'Microsoft', 'IBM', 'Oracle', 'SAP', 'Capgemini', 'Sofrecom', 'Altran',
        'Samsung Engineering', 'STMicroelectronics'
      ],
      'construction': [
        'Cosider', 'Groupe Hasnaoui', 'Sacyr', 'Mota-Engil', 'Tebessa BTP',
        'Entreprise publique'
      ],
      'sante': [
        'CHU', 'EPSP', 'Cliniques privées', 'Laboratoires', 'Pharmacies',
        'Cabinet médical'
      ],
      'education': [
        'Universités', 'Écoles privées', 'Centres de formation', 'Ministère de l\'Éducation',
        'Tutorat privé'
      ],
      'commerce': [
        'Cevital', 'Groupe Benamor', 'Carrefour', 'Ardis', 'Unilever', 'Procter & Gamble'
      ],
      'default': [
        'Particulier', 'PME', 'Grande entreprise', 'Startup', 'ONG'
      ]
    },
  
    // ============ 🔩 PIÈCES DÉTACHÉES ============
    'pieces_detachees': {
      'auto_moto': [
        'Bosch', 'Valeo', 'Delphi', 'Magneti Marelli', 'NGK', 'Denso', 'Febi Bilstein',
        'Textar', 'TRW', 'ATE', 'Brembo'
      ],
      'electromenager': [
        'Bosch', 'Samsung', 'LG', 'Whirlpool', 'Electrolux', 'Miele', 'Brandt',
        'IRIS', 'De Dietrich'
      ],
      'informatique': [
        'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Kingston', 'Seagate', 'Western Digital',
        'ASUS', 'Gigabyte', 'MSI'
      ],
      'telephones': [
        'Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Original', 'Générique', 'OEM'
      ],
      'industrie': [
        'Siemens', 'ABB', 'Schneider Electric', 'Rockwell', 'Omron', 'Festo', 'SMC'
      ],
      'default': [
        'Bosch', 'Valeo', 'Delphi', 'Magneti Marelli', 'Samsung', 'LG', 'Générique'
      ]
    },
  
    // ============ 🎨 ART & ANTIQUITÉS ============
    'art_antiquites': {
      'tableaux': [
        'Artiste local', 'Peintre renommé', 'École algérienne', 'Art contemporain',
        'Calligraphie arabe'
      ],
      'sculptures': [
        'Artisan traditionnel', 'Sculpteur moderne', 'Bronze', 'Bois sculpté',
        'Pierre taillée'
      ],
      'antiquites': [
        'Artisanat traditionnel', 'Tapisserie', 'Céramique', 'Cuivre travaillé',
        'Bijoux anciens'
      ],
      'tapis': [
        'Tapis de Ghardaïa', 'Tapis de Tlemcen', 'Tapis berbère', 'Kelim',
        'Tapisserie d\'Aït Hichem'
      ],
      'default': [
        'Artiste local', 'Artisan traditionnel', 'Collection privée'
      ]
    },
  
    // ============ 🐾 ANIMAUX ============
    'animaux': {
      'chiens': [
        'Berger Allemand', 'Labrador', 'Rottweiler', 'Bulldog', 'Chihuahua',
        'Caniche', 'Bergers locaux'
      ],
      'chats': [
        'Persan', 'Siamois', 'Main Coon', 'Bengal', 'Sphynx', 'Chats de gouttière'
      ],
      'oiseaux': [
        'Canaris', 'Perruches', 'Perroquets', 'Pigeons voyageurs', 'Paons'
      ],
      'chevaux': [
        'Pur-sang arabe', 'Barb', 'Cheval de sport', 'Poneys', 'Ânes'
      ],
      'accessoires': [
        'Royal Canin', 'Purina', 'Pedigree', 'Frolic', 'Whiskas', 'Equipement professionnel'
      ],
      'default': [
        'Éleveur local', 'Particulier', 'Animalerie', 'Refuge'
      ]
    },
  
    // ============ 🎓 FORMATION ============
    'formation': {
      'universite': [
        'Université d\'Alger', 'USTHB', 'École Polytechnique', 'ENP', 'ENSSMAL',
        'Écoles privées'
      ],
      'langues': [
        'British Council', 'Institut Français', 'Goethe-Institut', 'Cervantes',
        'Centres de langues privés'
      ],
      'informatique': [
        'Simplon', 'Udemy', 'Coursera', 'edX', 'Formations certifiantes',
        'Bootcamps locaux'
      ],
      'metiers': [
        'OFPPT', 'Centres de formation professionnelle', 'Chambres de métiers',
        'Artisans formateurs'
      ],
      'default': [
        'Centre agréé', 'Formateur indépendant', 'École privée', 'Organisme public'
      ]
    }
  };
  // 🔄 Filtra las marcas
  useEffect(() => {
    console.log('🔄 MarqueField useEffect ejecutándose con:', {
      selectedCategory,
      selectedSubCategory
    });
    
    if (!selectedCategory) {
      console.log('❌ No hay categoría seleccionada');
      setFilteredBrands([]);
      return;
    }
    
    console.log('📂 Buscando categoría:', selectedCategory);
    const categoryBrands = allBrandsByCategory[selectedCategory];
    
    if (!categoryBrands) {
      console.log(`❌ Categoría '${selectedCategory}' no encontrada en allBrandsByCategory`);
      console.log('📊 Categorías disponibles:', Object.keys(allBrandsByCategory));
      setFilteredBrands([]);
      return;
    }
    
    console.log('✅ Categoría encontrada:', categoryBrands);
    
    // Verificar tipo de datos
    if (typeof categoryBrands === 'object' && !Array.isArray(categoryBrands)) {
      console.log('📁 Categoría tiene subcategorías (objeto)');
      console.log('🎯 Subcategoría solicitada:', selectedSubCategory);
      console.log('📋 Subcategorías disponibles:', Object.keys(categoryBrands));
      
      if (selectedSubCategory && categoryBrands[selectedSubCategory]) {
        const brands = categoryBrands[selectedSubCategory];
        console.log(`✅ Encontradas ${brands.length} marcas para ${selectedSubCategory}:`, brands);
        setFilteredBrands(brands);
      } else if (categoryBrands.default) {
        console.log(`⚠️ Usando marcas 'default' para ${selectedCategory}`);
        setFilteredBrands(categoryBrands.default);
      } else {
        console.log(`❌ No hay marcas para ${selectedSubCategory} ni default`);
        setFilteredBrands([]);
      }
    } else if (Array.isArray(categoryBrands)) {
      console.log('📄 Categoría es array simple');
      setFilteredBrands(categoryBrands);
    } else {
      console.log('❌ Formato no reconocido');
      setFilteredBrands([]);
    }
  }, [selectedCategory, selectedSubCategory]);
  
  // 🎨 Render con información de debug
  return (
    <div className="marque-field-container">
   
      <Form.Group className="mt-3">
        <Form.Label>
          🏷️ {t(label, 'Marque')} 
          <small className="text-muted ms-2">
            ({filteredBrands.length} marque disponible)
          </small>
        </Form.Label>
        
        {filteredBrands.length > 0 ? (
          <div>
            <Form.Select
              name={name}
              value={postData[name] || ''}
              onChange={handleChangeInput}
              required
            >
              <option value="">{t('select_brand', 'Sélectionnez une marque')}</option>
              
              {filteredBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
              
              <option value="autre">{t('other_brand', 'Autre (précisez ci-dessous)')}</option>
            </Form.Select>
            
            <Form.Text className="text-muted">
              <small>
                Catégorie: <strong>{selectedCategory}</strong> | 
                Sous-catégorie: <strong>{selectedSubCategory}</strong>
              </small>
            </Form.Text>
          </div>
        ) : (
          <>
            <Form.Control
              type="text"
              name={name}
              value={postData[name] || ''}
              onChange={handleChangeInput}
              placeholder={t('enter_brand', 'Entrez la marque du produit')}
              required
            />
            <Form.Text className="text-danger">
              <small>
                ⚠️ Aucune marque prédéfinie pour cette combinaison.<br/>
                Categorie: {selectedCategory || 'non définie'}, 
                Sous-catégorie: {selectedSubCategory || 'non définie'}
              </small>
            </Form.Text>
          </>
        )}
        
        {/* Campo para "otra" marca */}
        {postData[name] === 'autre' && (
          <Form.Control
            type="text"
            name={`${name}_custom`}
            value={postData[`${name}_custom`] || ''}
            onChange={handleChangeInput}
            placeholder={t('specify_brand', 'Précisez le nom de la marque')}
            className="mt-2"
          />
        )}
      </Form.Group>
    </div>
  );
};

export default MarqueField;