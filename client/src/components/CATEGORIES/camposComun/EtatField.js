import React, { useState, useEffect, useMemo } from 'react';
import { Form, Badge, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const MarqueField = ({ 
  selectedCategory,
  selectedSubCategory,
  postData, 
  handleChangeInput,
  name = 'marque',
  label = 'brand'
}) => {
  const { t } = useTranslation('camposcomunes');
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // 📦 BASE DE DATOS COMPLETA DE MARCAS POR CATEGORÍA Y SUBCATEGORÍA
  const allBrandsByCategory = useMemo(() => ({
    // ============ 🏠 IMMOBILIER ============
    'immobilier': {
      'appartements': ['Cosider', 'Groupe Hasnaoui', 'Eurl Bâtiment', 'Immobiliaire', 'Particulier', 'Promoteur local', 'SNC', 'SARL', 'ETRHB Haddad', 'GICA Immobilier'],
      'villas': ['Cosider', 'Groupe Hasnaoui', 'Architecte privé', 'Particulier', 'Promotion immobilière', 'Groupe Benamor', 'Entreprise familiale', 'Société de promotion'],
      'terrains': ['Domaine public', 'Particulier', 'Société foncière', 'Héritage', 'ANB', 'APC', 'Commune', 'Wali'],
      'locaux_commerciaux': ['Promoteur commercial', 'Société immobilière', 'Particulier', 'Groupe Benamor', 'Groupe Hasnaoui', 'Centre commercial'],
      'bureaux': ['Promoteur bureautique', 'Société immobilière', 'Particulier', 'Groupe Cosider', 'Groupe Hasnaoui', 'Zone d\'activité'],
      'garages_parkings': ['Promoteur', 'Copropriété', 'Particulier', 'Société de parking', 'Gestion immobilière'],
      'fermes': ['Agriculteur', 'Héritage', 'Société agricole', 'Périmètre irrigué', 'Domaine agricole', 'ANB'],
      'default': ['Cosider', 'Groupe Hasnaoui', 'Eurl Bâtiment', 'Immobiliaire', 'Particulier', 'Promoteur local']
    },
  
    // ============ 🚗 AUTOMOBILES & VÉHICULES ============
    'vehicules': {
      'automobiles': [
        'Toyota', 'Renault', 'Peugeot', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen',
        'Fiat', 'Hyundai', 'Kia', 'Chevrolet', 'Dacia', 'Citroën', 'Ford', 'Opel',
        'Nissan', 'Mitsubishi', 'Seat', 'Skoda', 'Suzuki', 'Honda', 'Mazda',
        'Volvo', 'Jaguar', 'Land Rover', 'Porsche', 'Lexus', 'Infiniti', 'Mini',
        'Smart', 'Alfa Romeo', 'DS', 'Lada', 'Geely', 'Chery', 'BYD'
      ],
      'motos': [
        'Honda', 'Yamaha', 'Suzuki', 'Kawasaki', 'BMW Motorrad', 'Ducati', 'KTM',
        'Harley-Davidson', 'Piaggio', 'Vespa', 'Sym', 'Keeway', 'Benelli', 'Aprilia',
        'Moto Guzzi', 'Triumph', 'Royal Enfield', 'MV Agusta', 'Husqvarna', 'Beta'
      ],
      'utilitaires': [
        'Mercedes-Benz', 'Ford', 'Renault', 'Fiat', 'Peugeot', 'Citroën', 'Volkswagen',
        'Iveco', 'Toyota', 'Nissan', 'Isuzu', 'Mitsubishi', 'Opel', 'Dacia', 'Hyundai'
      ],
      'camions': [
        'Mercedes-Benz', 'Volvo', 'Scania', 'MAN', 'Iveco', 'Renault Trucks', 'DAF',
        'Kenworth', 'Peterbilt', 'Mack', 'Foton', 'Shacman', 'Howo', 'Dongfeng'
      ],
      'engins': [
        'Caterpillar', 'Komatsu', 'Volvo CE', 'JCB', 'Liebherr', 'Case', 'New Holland',
        'Bobcat', 'Hitachi', 'Hyundai CE', 'Doosan', 'Kobelco', 'Terex', 'SANY'
      ],
      'tracteurs': [
        'John Deere', 'New Holland', 'Case IH', 'Massey Ferguson', 'Fendt', 'Valtra',
        'Deutz-Fahr', 'Kubota', 'Mahindra', 'Claas', 'Landini', 'McCormick', 'Same'
      ],
      'remorques': [
        'Ifor Williams', 'Bockmann', 'Knott', 'SARL', 'Bremach', 'Kögel', 'Schmitz',
        'Fruehauf', 'Lamberet', 'Chereau', 'Krone', 'Wielton'
      ],
      'quads': [
        'Yamaha', 'Honda', 'Can-Am', 'Polaris', 'Kawasaki', 'Suzuki', 'CFMOTO',
        'Arctic Cat', 'Kymco', 'Hisun', 'Linhai', 'Bashan'
      ],
      'bateaux': [
        'Beneteau', 'Jeanneau', 'Bavaria', 'Dufour', 'Lagoon', 'Princess', 'Sunseeker',
        'Sea Ray', 'Bayliner', 'Yamaha', 'Suzuki Marine', 'Mercury', 'Honda Marine'
      ],
      'caravanes': [
        'Knaus', 'Fendt', 'Hobby', 'Dethleffs', 'Bürstner', 'Tabbert', 'Weinsberg',
        'Caravelair', 'Sterckeman', 'Rapido'
      ],
      'default': [
        'Toyota', 'Renault', 'Peugeot', 'Mercedes-Benz', 'BMW', 'Honda', 'Yamaha'
      ]
    },
  
    // ============ 📱 TÉLÉPHONES & ACCESSOIRES ============
    'telephones': {
      'smartphones': [
        'Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Huawei', 'Condor', 'Realme', 'OnePlus',
        'Vivo', 'Tecno', 'Infinix', 'Nokia', 'Google Pixel', 'Sony', 'LG', 'Motorola',
        'Honor', 'Asus', 'Lenovo', 'Alcatel', 'ZTE', 'Meizu', 'BlackBerry', 'CAT'
      ],
      'tablettes': [
        'Samsung', 'Apple', 'Lenovo', 'Huawei', 'Xiaomi', 'Amazon', 'Microsoft',
        'Condor', 'Acer', 'Asus', 'Dell', 'HP', 'Toshiba', 'Sony', 'Google'
      ],
      'accessoires': [
        'Samsung', 'Apple', 'Xiaomi', 'Anker', 'Belkin', 'Spigen', 'UAG', 'Case-Mate',
        'Mophie', 'JBL', 'Sony', 'Bose', 'Sennheiser', 'Logitech', 'Razer', 'Baseus'
      ],
      'telephones_fixes': [
        'Panasonic', 'Philips', 'Gigaset', 'SNC', 'Alcatel', 'VTech', 'Geant', 'Binatone',
        'Switel', 'Commodore', 'KX-TG'
      ],
      'montres_connectees': [
        'Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Fitbit', 'Garmin', 'Amazfit', 'Realme',
        'Fossil', 'Michael Kors', 'Suunto', 'Polar', 'Withings', 'Garmin'
      ],
      'gps': [
        'TomTom', 'Garmin', 'Mio', 'Magellan', 'Navman', 'Waze', 'Google Maps', 'Sygic'
      ],
      'default': [
        'Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Huawei', 'Condor'
      ]
    },
  
    // ============ 💻 INFORMATIQUE ============
    'informatique': {
      'ordinateurs_portables': [
        'Lenovo', 'HP', 'Dell', 'Apple', 'Asus', 'Acer', 'Condor', 'MSI', 'Razer',
        'Microsoft Surface', 'Huawei', 'Xiaomi', 'Toshiba', 'Fujitsu', 'Samsung',
        'LG', 'Google Chromebook', 'Medion', 'Packard Bell', 'Gateway'
      ],
      'ordinateurs_bureau': [
        'Dell', 'HP', 'Apple', 'Asus', 'Acer', 'MSI', 'Lenovo', 'Condor', 'CyberpowerPC',
        'iBuyPower', 'Origin PC', 'Falcon Northwest', 'Puget Systems', 'CLX Gaming'
      ],
      'ecrans': [
        'Samsung', 'LG', 'Dell', 'HP', 'BenQ', 'Acer', 'Philips', 'Asus', 'MSI',
        'ViewSonic', 'AOC', 'Lenovo', 'Eizo', 'NEC', 'Sharp', 'iiyama', 'Gigabyte'
      ],
      'composants_pc': [
        'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Kingston', 'Seagate', 'Western Digital',
        'Crucial', 'G.Skill', 'Thermaltake', 'Cooler Master', 'Noctua', 'EVGA', 'ASUS',
        'Gigabyte', 'MSI', 'ASRock', 'Zotac', 'PNY', 'Sapphire', 'XFX', 'PowerColor'
      ],
      'imprimantes': [
        'HP', 'Canon', 'Epson', 'Brother', 'Xerox', 'Lexmark', 'Samsung', 'Ricoh',
        'Kyocera', 'OKI', 'Konica Minolta', 'Sharp', 'Pantum'
      ],
      'reseau': [
        'TP-Link', 'Cisco', 'Netgear', 'D-Link', 'Asus', 'Linksys', 'Ubiquiti',
        'MikroTik', 'Huawei', 'Zyxel', 'Synology', 'QNAP', 'Buffalo', 'Tenda'
      ],
      'stockage': [
        'Western Digital', 'Seagate', 'Toshiba', 'SanDisk', 'Kingston', 'Crucial',
        'Samsung', 'LaCie', 'Transcend', 'ADATA', 'PNY', 'Verbatim', 'HP', 'Dell'
      ],
      'peripheriques': [
        'Logitech', 'Razer', 'SteelSeries', 'Corsair', 'Microsoft', 'Apple',
        'HP', 'Dell', 'Asus', 'Acer', 'BenQ', 'Wacom', 'Trust', 'Genius'
      ],
      'logiciels': [
        'Microsoft', 'Adobe', 'Autodesk', 'Corel', 'Avast', 'Kaspersky', 'Norton',
        'McAfee', 'ESET', 'Bitdefender', 'WinRAR', 'WinZip', 'VLC', 'Winamp'
      ],
      'default': [
        'Lenovo', 'HP', 'Dell', 'Apple', 'Asus', 'Acer', 'Condor'
      ]
    },
  
    // ============ 🏠 ÉLECTROMÉNAGER ============
    'electromenager': {
      'televiseurs': [
        'Samsung', 'LG', 'Sony', 'Panasonic', 'TCL', 'Hisense', 'IRIS', 'Continental',
        'Sharp', 'Philips', 'Toshiba', 'Skyworth', 'Changhong', 'Vizio', 'Insignia',
        'Sceptre', 'Element', 'Westinghouse', 'Funai'
      ],
      'refrigerateurs_congelateurs': [
        'Whirlpool', 'Bosch', 'LG', 'Samsung', 'Brandt', 'De Dietrich', 'IRIS',
        'Beko', 'Electrolux', 'Haier', 'Miele', 'Liebherr', 'Sharp', 'GE',
        'Frigidaire', 'Kenmore', 'Maytag', 'Hotpoint', 'Indesit'
      ],
      'machines_laver': [
        'Whirlpool', 'Bosch', 'Indesit', 'Brandt', 'Beko', 'Samsung', 'LG',
        'Electrolux', 'Miele', 'Candy', 'Hoover', 'Ariston', 'Vestel', 'Panasonic',
        'Sharp', 'Haier', 'GE', 'Maytag'
      ],
      'lave_vaisselles': [
        'Bosch', 'Miele', 'Siemens', 'Whirlpool', 'Brandt', 'Samsung', 'LG',
        'Electrolux', 'Indesit', 'Candy', 'Ariston', 'Panasonic', 'Maytag',
        'KitchenAid', 'Frigidaire', 'GE'
      ],
      'fours_cuisson': [
        'Brandt', 'De Dietrich', 'Whirlpool', 'Bosch', 'Miele', 'Siemens',
        'Samsung', 'LG', 'Electrolux', 'Hotpoint', 'Ariston', 'Panasonic',
        'GE', 'Frigidaire', 'Maytag', 'KitchenAid'
      ],
      'climatisation': [
        'Daikin', 'Carrier', 'Mitsubishi Electric', 'LG', 'Samsung', 'Toshiba',
        'Gree', 'Midea', 'Chigo', 'General', 'Hitachi', 'Panasonic', 'Fujitsu',
        'York', 'Lennox', 'Rheem', 'Trane', 'Goodman'
      ],
      'aspirateurs': [
        'Rowenta', 'Dyson', 'Philips', 'Bosch', 'Miele', 'Black+Decker',
        'Electrolux', 'Samsung', 'LG', 'Hoover', 'Karcher', 'Shark', 'Bissell',
        'Eureka', 'Oreck', 'Kirby'
      ],
      'chauffage': [
        'Atlantic', 'De Dietrich', 'Chaffoteaux', 'Frisquet', 'Saunier Duval',
        'Vaillant', 'Bosch', 'Ariston', 'Thermor', 'Rinnai', 'Rheem', 'A.O. Smith',
        'Bradford White', 'Noritz'
      ],
      'chauffe_eau': [
        'Atlantic', 'Thermor', 'De Dietrich', 'Ariston', 'Chaffoteaux', 'Fagor',
        'Saunier Duval', 'Vaillant', 'Rinnai', 'Rheem', 'A.O. Smith', 'Stiebel Eltron'
      ],
      'cafetieres': [
        'Nespresso', 'Krups', 'DeLonghi', 'Philips', 'Bosch', 'Siemens', 'Miele',
        'Senseo', 'Tassimo', 'Dolce Gusto', 'Lavazza', 'Saeco', 'Jura'
      ],
      'mixeurs_robots': [
        'Moulinex', 'Kenwood', 'Bosch', 'Philips', 'Tefal', 'Braun', 'KitchenAid',
        'Magimix', 'Robot Coupe', 'Ninja', 'Vitamix', 'Blendtec'
      ],
      'default': [
        'Samsung', 'LG', 'Bosch', 'Whirlpool', 'Brandt', 'IRIS', 'Moulinex'
      ]
    },
  
    // ============ 👕 VÊTEMENTS & MODE ============
    'vetements': {
      'vetements_homme': [
        'Zara', 'H&M', 'Celio', 'Jack & Jones', 'LC Waikiki', 'Mango', 'Pull & Bear',
        'Bershka', 'Stradivarius', 'Next', 'Massimo Dutti', 'UNIQLO', 'Levi\'s', 'Diesel',
        'Armani', 'Hugo Boss', 'Ralph Lauren', 'Tommy Hilfiger', 'Lacoste', 'Benetton'
      ],
      'vetements_femme': [
        'Zara', 'H&M', 'Mango', 'LC Waikiki', 'Stradivarius', 'Bershka', 'Pull & Bear',
        'Oysho', 'Naf Naf', 'Desigual', 'Promod', 'Etam', 'Cache Cache', 'Jennyfer',
        'Maje', 'Sandro', 'Claudie Pierlot', 'The Kooples', 'Comptoir des Cotonniers'
      ],
      'chaussures': [
        'Nike', 'Adidas', 'Puma', 'Converse', 'Geox', 'Timberland', 'Clarks',
        'Ecco', 'Skechers', 'Vans', 'Steve Madden', 'Cat', 'Dr. Martens',
        'Birkenstock', 'Crocs', 'Salomon', 'New Balance', 'Asics', 'Reebok'
      ],
      'sacs_accessoires': [
        'Louis Vuitton', 'Chanel', 'Gucci', 'Longchamp', 'Kipling', 'Michael Kors',
        'Coach', 'Furla', 'Prada', 'Dior', 'Hermès', 'Balenciaga', 'Saint Laurent',
        'Fendi', 'Burberry', 'Versace', 'Tumi', 'Samsonite', 'Eastpak'
      ],
      'bijoux': [
        'Pandora', 'Swarovski', 'Cartier', 'Tiffany & Co.', 'Bvlgari', 'Chopard',
        'Rolex', 'Omega', 'Tag Heuer', 'Seiko', 'Casio', 'Festina', 'Swatch',
        'Fossil', 'Daniel Wellington', 'Michael Kors', 'Guess', 'Emporio Armani'
      ],
      'sportswear': [
        'Nike', 'Adidas', 'Puma', 'Under Armour', 'Reebok', 'New Balance',
        'Asics', 'Fila', 'Ellesse', 'Kappa', 'Diadora', 'Umbro', 'Joma', 'Mizuno'
      ],
      'lingerie': [
        'Victoria\'s Secret', 'Etam', 'Aubade', 'Chantelle', 'Simone Perele',
        'Passionata', 'Huit', 'Lejaby', 'PrimaDonna', 'Wacoal'
      ],
      'enfant': [
        'Zara Kids', 'H&M Kids', 'Okaidi', 'Obaïbi', 'JACADI', 'Catimini', 'IKKS',
        'Petit Bateau', 'Absorba', 'Du Pareil au Même', 'Tartine et Chocolat'
      ],
      'default': [
        'Zara', 'H&M', 'Nike', 'Adidas', 'LC Waikiki'
      ]
    },
  
    // ============ 💄 SANTÉ & BEAUTÉ ============
    'sante_beaute': {
      'cosmetiques': [
        'L\'Oréal', 'Nivea', 'Garnier', 'Maybelline', 'MAC', 'Estée Lauder',
        'Clinique', 'Lancôme', 'Dior', 'Chanel', 'Yves Saint Laurent', 'Shiseido',
        'Clarins', 'Guerlain', 'La Prairie', 'Sisley', 'Biotherm', 'Vichy'
      ],
      'parfums': [
        'Dior', 'Chanel', 'Lancôme', 'Yves Rocher', 'Guerlain', 'Jean Paul Gaultier',
        'Paco Rabanne', 'Armani', 'Versace', 'Dolce & Gabbana', 'Calvin Klein',
        'Hugo Boss', 'Ralph Lauren', 'Burberry', 'Prada', 'Gucci', 'Hermès'
      ],
      'soins_visage': [
        'Vichy', 'La Roche-Posay', 'Bioderma', 'Cetaphil', 'Eucerin', 'Avène',
        'CeraVe', 'Neutrogena', 'Nuxe', 'Caudalie', 'Filorga', 'Esthederm',
        'Payot', 'SVR', 'Ducray', 'A-Derma', 'Mustela'
      ],
      'soins_cheveux': [
        'L\'Oréal Professionnel', 'Schwarzkopf', 'Kerastase', 'Redken', 'Wella',
        'Dessange', 'Jean Louis David', 'Phyto', 'Ducray', 'Klorane', 'René Furterer',
        'Rene Guinot', 'Rahua', 'Moroccanoil', 'Olaplex', 'Oribe'
      ],
      'hygiene': [
        'Oral-B', 'Colgate', 'Sensodyne', 'Signal', 'Gillette', 'Schick',
        'Veet', 'Nair', 'Philips', 'Braun', 'Remington', 'Panasonic', 'Conair',
        'Wahl', 'Babyliss', 'Rowenta'
      ],
      'maquillage': [
        'Maybelline', 'L\'Oréal', 'MAC', 'NYX', 'Revlon', 'Max Factor', 'Bourjois',
        'Sephora', 'Essence', 'Catrice', 'Kiko Milano', 'Huda Beauty', 'Fenty Beauty',
        'Charlotte Tilbury', 'Pat McGrath', 'NARS'
      ],
      'default': [
        'L\'Oréal', 'Nivea', 'Garnier', 'Dior', 'Chanel'
      ]
    },
  
    // ============ 🛋️ MEUBLES & DÉCORATION ============
    'meubles': {
      'salon': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama', 'Roche Bobois', 'Ligne Roset',
        'Maisons du Monde', 'Alinéa', 'Mobalpa', 'Cuisine Schmidt', 'Habitat',
        'Milan Décoration', 'Sofas Center', 'Castro', 'Domus Linea'
      ],
      'chambre': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama', 'Décibelle', 'Mobalpa',
        'Bébé Confort', 'Picwic', 'Nature & Découvertes', 'Pleyel', 'Simmons',
        'Tempur', 'Emma', 'Bultex', 'Dunlopillo'
      ],
      'cuisine': [
        'IKEA', 'Schmidt', 'Cuisinella', 'Mobalpa', 'Cuisine Plus', 'Cillit',
        'Poggenpohl', 'Bulthaup', 'SieMatic', 'Valcucine', 'Boffi', 'Arclinea',
        'Lube', 'Fournier', 'Cevital Cuisine'
      ],
      'bureau': [
        'IKEA', 'Fly', 'BUT', 'Conforama', 'Musterring', 'Herman Miller',
        'Steelcase', 'Knoll', 'Haworth', 'Humanscale', 'Vitra', 'Fritz Hansen',
        'Bolia', 'Lensvelt', 'Gispen'
      ],
      'jardin': [
        'But', 'Jardiland', 'Truffaut', 'Leroy Merlin', 'Castorama', 'IKEA',
        'Outsunny', 'Keter', 'Suncast', 'Lifetime', 'Rubbermaid', 'Biohort',
        'Hartman', 'Grill Company', 'Weber'
      ],
      'decoration': [
        'Maisons du Monde', 'Habitat', 'La Redoute', 'Zara Home', 'H&M Home',
        'Cultura', 'Nature & Découvertes', 'Sostrene Grene', 'Gifi', 'Action',
        'Muji', 'West Elm', 'Crate & Barrel', 'Pottery Barn'
      ],
      'eclairage': [
        'Philips', 'Osram', 'IKEA', 'Flos', 'Artemide', 'Louis Poulsen',
        'WAC Lighting', 'Kichler', 'Progress Lighting', 'Feiss'
      ],
      'tapis': [
        'IKEA', 'Maisons du Monde', 'La Redoute', 'Milan Décoration', 'Nanimarquina',
        'The Rug Company', 'Jaipur Rugs', 'Kas Rugs', 'Moooi', 'Flooring Innovations'
      ],
      'default': [
        'IKEA', 'Fly', 'Kitea', 'BUT', 'Conforama'
      ]
    },
  
    // ============ 🎮 LOISIRS & DIVERTISSEMENTS ============
    'loisirs': {
      'jeux_video': [
        'Sony PlayStation', 'Microsoft Xbox', 'Nintendo', 'Steam', 'Ubisoft',
        'Electronic Arts', 'Activision', 'Rockstar Games', 'Epic Games',
        'Blizzard Entertainment', 'Square Enix', 'Capcom', 'Bandai Namco',
        'Sega', 'Konami', 'Take-Two Interactive', 'Warner Bros Games'
      ],
      'instruments': [
        'Yamaha', 'Fender', 'Gibson', 'Roland', 'Casio', 'Korg', 'Shure',
        'Sennheiser', 'Bose', 'Marshall', 'Peavey', 'Ibanez', 'ESP',
        'PRS', 'Taylor', 'Martin', 'Kawai', 'Steinway', 'Selmer'
      ],
      'livres': [
        'Dar Echihab', 'ENAG', 'ANEP', 'Casbah Editions', 'Barzakh', 'Chihab',
        'Tafsir', 'El Ikhtilef', 'El Maarifa', 'Alger Livres', 'SNED',
        'Office des Publications Universitaires', 'Entreprise Nationale du Livre'
      ],
      'films_musique': [
        'Warner Bros', 'Universal', 'Disney', 'Sony Pictures', '20th Century Studios',
        'Netflix', 'Amazon Prime', 'Spotify', 'Apple Music', 'Deezer',
        'YouTube Music', 'Tidal', 'Pandora', 'SoundCloud', 'Bandcamp'
      ],
      'sports_loisirs': [
        'Decathlon', 'Go Sport', 'Intersport', 'Nike', 'Adidas', 'Puma',
        'Wilson', 'Spalding', 'Head', 'Babolat', 'Yonex', 'Prince', 'Dunlop',
        'Slazenger', 'Pennington', 'Bushnell'
      ],
      'collection': [
        'Funko Pop', 'Hot Wheels', 'Lego', 'Playmobil', 'Barbie', 'Mattel',
        'Hasbro', 'Bandai', 'Gundam', 'McFarlane Toys', 'NECA',
        'Good Smile Company', 'Kotobukiya', 'Sideshow Collectibles'
      ],
      'art_creativite': [
        'Faber-Castell', 'Staedtler', 'Canson', 'Strathmore', 'Winsor & Newton',
        'Royal Talens', 'Liquitex', 'Golden', 'Daler-Rowney', 'Sennelier'
      ],
      'default': [
        'Sony PlayStation', 'Microsoft Xbox', 'Nintendo'
      ]
    },
  
    // ============ 🏋️ SPORT ============
    'sport': {
      'football': [
        'Nike', 'Adidas', 'Puma', 'Umbro', 'Kappa', 'Joma', 'Mitre', 'Select',
        'Diadora', 'Lotto', 'Errea', 'Macron', 'Uhlsport', 'Reusch'
      ],
      'fitness': [
        'Decathlon', 'Nike', 'Adidas', 'Reebok', 'Under Armour', 'Technogym',
        'Life Fitness', 'Precor', 'Bowflex', 'NordicTrack', 'ProForm',
        'Cybex', 'Hammer Strength', 'Matrix Fitness'
      ],
      'combat': [
        'Everlast', 'Venum', 'Fairtex', 'Twins Special', 'Top King', 'Hayabusa',
        'Adidas', 'Nike', 'Rival', 'Cleto Reyes', 'Grant', 'Winning'
      ],
      'randonnee': [
        'The North Face', 'Columbia', 'Salomon', 'Merrell', 'Quechua', 'Mammut',
        'Arc\'teryx', 'Patagonia', 'Jack Wolfskin', 'Marmot', 'Black Diamond',
        'Osprey', 'Gregory', 'Deuter', 'Lowa'
      ],
      'velo': [
        'Decathlon', 'Scott', 'Trek', 'Specialized', 'Giant', 'Cannondale',
        'Bianchi', 'Pinarello', 'Merida', 'Cube', 'GT', 'Santa Cruz',
        'Yeti', 'Pivot', 'Orbea'
      ],
      'natation': [
        'Arena', 'Speedo', 'Nabaiji', 'Zoggs', 'TYR', 'Mad Wave', 'Adidas',
        'Nike', 'Aqua Sphere', 'Finis', 'Maru'
      ],
      'tennis': [
        'Wilson', 'Babolat', 'Head', 'Yonex', 'Prince', 'Dunlop', 'Technifibre',
        'Volkl', 'Pacific', 'Gamma', 'Solinco'
      ],
      'basketball': [
        'Spalding', 'Wilson', 'Molten', 'Nike', 'Adidas', 'Under Armour',
        'Rawlings', 'Champion', 'Baden'
      ],
      'default': [
        'Decathlon', 'Nike', 'Adidas', 'Puma'
      ]
    },
  
    // ============ 🍎 ALIMENTAIRES ============
    'alimentaires': {
      'produits_laitiers': [
        'Cevital', 'Ifri', 'Samouss', 'Groupe Benamor', 'Laïbdel', 'Bimo',
        'Djouzia', 'Lactalis', 'Danone', 'Nestlé', 'Yoplait', 'President',
        'Bel', 'Babybel', 'Kiri'
      ],
      'boissons': [
        'Ifri', 'Cevital', 'Cristal', 'Hamoud', 'Saïda', 'Ouled El Bahri',
        'Coca-Cola', 'Pepsi', 'Monster', 'Red Bull', 'Fanta', 'Sprite',
        'Schweppes', 'Orangina', 'Oasis'
      ],
      'epicerie': [
        'Cevital', 'Bimo', 'Laïbdel', 'Mazafran', 'Groupe Benamor', 'Djouzia',
        'Samouss', 'Lazreg', 'Tipaza', 'SIDI BOUZID', 'VITAM'
      ],
      'viandes': [
        'Soficome', 'Sarl Metidji', 'Laïbdel', 'Dounia', 'Terroirs d\'Algérie',
        'Ferme Chaoui', 'Boucherie Halal', 'Viande du Sud', 'Boucherie Traditionnelle'
      ],
      'fruits_legumes': [
        'Terroirs d\'Algérie', 'Agrisal', 'Fermes locales', 'Producteurs directs',
        'Marché de gros', 'Agriculture biologique', 'Coopérative agricole'
      ],
      'patisserie': [
        'Bimo', 'Laïbdel', 'Mazafran', 'Gâteau d\'Algérie', 'Pâtisserie traditionnelle',
        'Brioche Dorée', 'Paul', 'Kouglof', 'Boulangerie artisanale'
      ],
      'huiles': [
        'Cevital', 'Mazafran', 'Ifri', 'Samouss', 'Huilerie Moderne',
        'Huile d\'olive locale', 'Huilerie Traditionnelle'
      ],
      'default': [
        'Cevital', 'Ifri', 'Samouss', 'Groupe Benamor', 'Laïbdel', 'Bimo'
      ]
    },
  
    // ============ 🧱 MATÉRIAUX DE CONSTRUCTION ============
    'materiaux': {
      'ciment': [
        'Lafarge', 'Biskria Ciment', 'GICA', 'Ain Touta', 'Sigus', 'Zahana',
        'Ciment de la Mitidja', 'Ciment de Tiaret', 'Ciment de Tebessa'
      ],
      'acier': [
        'Sider', 'Tosyali', 'Bellara', 'Metal SPA', 'Ferrailles locales',
        'ArcelorMittal', 'Tata Steel', 'Nippon Steel', 'POSCO'
      ],
      'carrelage': [
        'Cevital Bâtiment', 'Sika', 'Weber', 'Mapei', 'Keraben', 'Porcelanosa',
        'Roca', 'Villeroy & Boch', 'Marazzi', 'Iris Ceramica', 'Flaviker'
      ],
      'bois': [
        'Bois exotiques', 'Bois locaux', 'Contreplaqué importé', 'MDF', 'Agencement',
        'Leroy Merlin', 'Castorama', 'Brico Dépôt', 'Point P'
      ],
      'peinture': [
        'Reynaers', 'Jotun', 'Sikkens', 'Dulux', 'Ripolin', 'Mipal', 'Socer',
        'Tollens', 'Seigneurie', 'V33', 'Zolpan'
      ],
      'isolation': [
        'Isover', 'Rockwool', 'Knauf', 'URSA', 'Paroc', 'Actis', 'Saint-Gobain',
        'Kingspan', 'Recticel', 'Synthos'
      ],
      'sanitaires': [
        'Roca', 'Villeroy & Boch', 'Grohe', 'Hansgrohe', 'Kohler', 'American Standard',
        'Duravit', 'Ideal Standard', 'Porcher'
      ],
      'electricite': [
        'Legrand', 'Schneider Electric', 'ABB', 'Siemens', 'Hager', 'GE',
        'Eaton', 'Mersen', 'Nexans'
      ],
      'default': [
        'Lafarge', 'Biskria Ciment', 'Cevital Bâtiment', 'Sika', 'Weber'
      ]
    },
  
    // ============ 🛠️ SERVICES ============
    'services': {
      'construction': [
        'Entreprise BTP', 'Artisan local', 'Architecte', 'Bureau d\'études',
        'Société de promotion', 'Entreprise générale', 'Maçon', 'Carreleur',
        'Plâtrier', 'Charpentier'
      ],
      'transport': [
        'Transporteur local', 'Société de déménagement', 'Livraison rapide',
        'Taxi', 'Location véhicule', 'Messagerie', 'Logistique', 'Déménageur'
      ],
      'nettoyage': [
        'Société de nettoyage', 'Agent d\'entretien', 'Services à domicile',
        'Nettoyage industriel', 'Femme de ménage', 'Entreprise de propreté'
      ],
      'reparation': [
        'Artisan réparateur', 'Service après-vente', 'Technicien agréé',
        'Bricoleur professionnel', 'Réparateur indépendant', 'Atelier agréé'
      ],
      'formation': [
        'Centre de formation', 'Formateur indépendant', 'École privée',
        'Université', 'Organisme certifié', 'Institut spécialisé',
        'Académie', 'Cours particuliers'
      ],
      'jardinage': [
        'Paysagiste', 'Jardinier', 'Entreprise d\'espaces verts', 'Arboriste',
        'Tonte de pelouse', 'Élagage', 'Entretien de jardin'
      ],
      'informatique': [
        'Dépannage informatique', 'Développeur web', 'Graphiste', 'Community Manager',
        'Maintenance réseau', 'Formation informatique', 'Support technique'
      ],
      'default': [
        'Particulier', 'Entreprise locale', 'Freelance', 'Société agréée'
      ]
    },
  
    // ============ ✈️ VOYAGES ============
    'voyages': {
      'vols': [
        'Air Algérie', 'Tassili Airlines', 'Air France', 'Turkish Airlines',
        'Emirates', 'Qatar Airways', 'Lufthansa', 'British Airways', 'Vueling',
        'Ryanair', 'EasyJet', 'Royal Air Maroc', 'Tunisair', 'EgyptAir'
      ],
      'hotels': [
        'Hilton', 'Sheraton', 'Marriott', 'Ibis', 'Novotel', 'Mövenpick',
        'Golden Tulip', 'Radisson Blu', 'Sofitel', 'Accor', 'Best Western',
        'Holiday Inn', 'Four Seasons', 'Ritz-Carlton', 'InterContinental'
      ],
      'agences_voyage': [
        'Air Algérie Voyages', 'Best Travel', 'Sahara Voyages', 'Tassili Travel',
        'Algérie Tours', 'Travel Service', 'Jet Tours', 'Nouvelles Frontières',
        'Fram', 'Club Med'
      ],
      'location_voitures': [
        'Europcar', 'Hertz', 'Avis', 'Sixt', 'Budget', 'Local rent-a-car',
        'Taxi longue distance', 'Enterprise', 'Alamo', 'National'
      ],
      'croisieres': [
        'MSC Croisières', 'Costa Croisières', 'Royal Caribbean', 'Norwegian Cruise Line',
        'Celebrity Cruises', 'Carnival', 'Princess Cruises', 'Holland America Line'
      ],
      'circuits': [
        'Voyage culturel', 'Tour opérateur', 'Agence locale', 'Guide touristique',
        'Excursion organisée', 'Pèlerinage', 'Safari'
      ],
      'default': [
        'Air Algérie', 'Tassili Airlines', 'Air France', 'Turkish Airlines'
      ]
    },
  
    // ============ 💼 EMPLOI ============
    'emploi': {
      'informatique': [
        'Microsoft', 'IBM', 'Oracle', 'SAP', 'Capgemini', 'Sofrecom', 'Altran',
        'Samsung Engineering', 'STMicroelectronics', 'Google', 'Amazon', 'Apple',
        'Facebook', 'Twitter', 'LinkedIn'
      ],
      'construction': [
        'Cosider', 'Groupe Hasnaoui', 'Sacyr', 'Mota-Engil', 'Tebessa BTP',
        'Entreprise publique', 'TPF', 'Colas', 'Vinci', 'Bouygues'
      ],
      'sante': [
        'CHU', 'EPSP', 'Cliniques privées', 'Laboratoires', 'Pharmacies',
        'Cabinet médical', 'Hôpital', 'Clinique', 'Centre de santé', 'Laboratoire d\'analyses'
      ],
      'education': [
        'Universités', 'Écoles privées', 'Centres de formation', 'Ministère de l\'Éducation',
        'Tutorat privé', 'École internationale', 'Lycée', 'Collège', 'École primaire'
      ],
      'commerce': [
        'Cevital', 'Groupe Benamor', 'Carrefour', 'Ardis', 'Unilever', 'Procter & Gamble',
        'Nestlé', 'Coca-Cola', 'PepsiCo', 'Mars', 'Mondelez'
      ],
      'banque': [
        'BADR', 'CPA', 'BNA', 'BC', 'Credit Populaire', 'Société Générale',
        'BNP Paribas', 'HSBC', 'Citibank', 'Barclays'
      ],
      'industrie': [
        'Sonatrach', 'Sonelgaz', 'Groupe Cevital', 'Groupe Benamor', 'ENIEM',
        'ENIEM', 'SNVI', 'SAFEX', 'SERPORT'
      ],
      'default': [
        'Particulier', 'PME', 'Grande entreprise', 'Startup', 'ONG'
      ]
    },
  
    // ============ 🔩 PIÈCES DÉTACHÉES ============
    'pieces_detachees': {
      'auto_moto': [
        'Bosch', 'Valeo', 'Delphi', 'Magneti Marelli', 'NGK', 'Denso', 'Febi Bilstein',
        'Textar', 'TRW', 'ATE', 'Brembo', 'Mahle', 'Kolbenschmidt', 'Pierburg',
        'Hella', 'BorgWarner', 'ZF', 'Continental'
      ],
      'electromenager': [
        'Bosch', 'Samsung', 'LG', 'Whirlpool', 'Electrolux', 'Miele', 'Brandt',
        'IRIS', 'De Dietrich', 'BSH', 'Arçelik', 'Vestel', 'Grundig', 'AEG'
      ],
      'informatique': [
        'Intel', 'AMD', 'NVIDIA', 'Corsair', 'Kingston', 'Seagate', 'Western Digital',
        'ASUS', 'Gigabyte', 'MSI', 'Samsung', 'Crucial', 'G.Skill', 'Cooler Master'
      ],
      'telephones': [
        'Samsung', 'Apple', 'Xiaomi', 'Huawei', 'Original', 'Générique', 'OEM',
        'LG', 'Sony', 'Nokia', 'Motorola', 'HTC', 'BlackBerry'
      ],
      'industrie': [
        'Siemens', 'ABB', 'Schneider Electric', 'Rockwell', 'Omron', 'Festo', 'SMC',
        'Parker', 'Bosch Rexroth', 'Danfoss', 'Wago', 'Phoenix Contact'
      ],
      'maison': [
        'Legrand', 'Schneider', 'Hager', 'Vachette', 'Somfy', 'Atlantic', 'De Dietrich',
        'Saunier Duval', 'Vaillant', 'Roca', 'Grohe', 'Hansgrohe'
      ],
      'default': [
        'Bosch', 'Valeo', 'Delphi', 'Magneti Marelli', 'Samsung', 'LG', 'Générique'
      ]
    },
  
    // ============ 🎨 ART & ANTIQUITÉS ============
    'art_antiquites': {
      'tableaux': [
        'Artiste local', 'Peintre renommé', 'École algérienne', 'Art contemporain',
        'Calligraphie arabe', 'Miniature', 'Aquarelle', 'Huile sur toile', 'Acrylique'
      ],
      'sculptures': [
        'Artisan traditionnel', 'Sculpteur moderne', 'Bronze', 'Bois sculpté',
        'Pierre taillée', 'Marbre', 'Céramique', 'Terre cuite', 'Résine'
      ],
      'antiquites': [
        'Artisanat traditionnel', 'Tapisserie', 'Céramique', 'Cuivre travaillé',
        'Bijoux anciens', 'Mobilier ancien', 'Objets de collection', 'Monnaies anciennes'
      ],
      'tapis': [
        'Tapis de Ghardaïa', 'Tapis de Tlemcen', 'Tapis berbère', 'Kelim',
        'Tapisserie d\'Aït Hichem', 'Tapis de Kairouan', 'Tapis persan', 'Tapis turc'
      ],
      'livres_anciens': [
        'Manuscrit ancien', 'Livre rare', 'Édition limitée', 'Première édition',
        'Livre dédicacé', 'Ouvrage historique', 'Document ancien'
      ],
      'default': [
        'Artiste local', 'Artisan traditionnel', 'Collection privée'
      ]
    },
  
    // ============ 🐾 ANIMAUX ============
    'animaux': {
      'chiens': [
        'Berger Allemand', 'Labrador', 'Rottweiler', 'Bulldog', 'Chihuahua',
        'Caniche', 'Bergers locaux', 'Husky', 'Golden Retriever', 'Beagle',
        'Boxer', 'Dalmatien', 'Doberman', 'Shiba Inu', 'Carlin'
      ],
      'chats': [
        'Persan', 'Siamois', 'Main Coon', 'Bengal', 'Sphynx', 'Chats de gouttière',
        'British Shorthair', 'Ragdoll', 'Abyssin', 'Birman', 'Norvégien', 'Scottish Fold'
      ],
      'oiseaux': [
        'Canaris', 'Perruches', 'Perroquets', 'Pigeons voyageurs', 'Paons',
        'Inséparables', 'Cacatoès', 'Ara', 'Calopsitte', 'Diamant mandarin'
      ],
      'chevaux': [
        'Pur-sang arabe', 'Barb', 'Cheval de sport', 'Poneys', 'Ânes',
        'Pur-sang anglais', 'Quarter Horse', 'Cheval de trait', 'Frison'
      ],
      'accessoires': [
        'Royal Canin', 'Purina', 'Pedigree', 'Frolic', 'Whiskas', 'Equipement professionnel',
        'Pedigree', 'Hill\'s', 'Iams', 'Eukanuba', 'Acana', 'Orijen'
      ],
      'poissons': [
        'Poisson rouge', 'Guppy', 'Scalaire', 'Discus', 'Cichlidé', 'Bettas',
        'Corydoras', 'Néon', 'Platy', 'Molly', 'Koi'
      ],
      'default': [
        'Éleveur local', 'Particulier', 'Animalerie', 'Refuge'
      ]
    },
  
    // ============ 🎓 FORMATION ============
    'formation': {
      'universite': [
        'Université d\'Alger', 'USTHB', 'École Polytechnique', 'ENP', 'ENSSMAL',
        'Écoles privées', 'Université de Blida', 'Université d\'Oran', 'Université de Constantine'
      ],
      'langues': [
        'British Council', 'Institut Français', 'Goethe-Institut', 'Cervantes',
        'Centres de langues privés', 'Alliance Française', 'Wall Street English',
        'Berlitz', 'EF Education First'
      ],
      'informatique': [
        'Simplon', 'Udemy', 'Coursera', 'edX', 'Formations certifiantes',
        'Bootcamps locaux', 'OpenClassrooms', 'Udacity', 'Pluralsight', 'LinkedIn Learning'
      ],
      'metiers': [
        'OFPPT', 'Centres de formation professionnelle', 'Chambres de métiers',
        'Artisans formateurs', 'CFA', 'GRETA', 'AFPA'
      ],
      'soutien_scolaire': [
        'Acadomia', 'Complétude', 'Anacours', 'Keepschool', 'Prof particulier',
        'Cours Legendre', 'Cours Ado'
      ],
      'default': [
        'Centre agréé', 'Formateur indépendant', 'École privée', 'Organisme public'
      ]
    }
  }), []);
  
  // 🔄 Filtra las marcas
  useEffect(() => {
    const filterBrands = async () => {
      if (!selectedCategory) {
        setFilteredBrands([]);
        return;
      }
      
      setLoading(true);
      
      // Simular carga asíncrona
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const categoryBrands = allBrandsByCategory[selectedCategory];
      
      if (!categoryBrands) {
        setFilteredBrands([]);
        setLoading(false);
        return;
      }
      
      let brands = [];
      
      if (typeof categoryBrands === 'object' && !Array.isArray(categoryBrands)) {
        if (selectedSubCategory && categoryBrands[selectedSubCategory]) {
          brands = categoryBrands[selectedSubCategory];
        } else if (categoryBrands.default) {
          brands = categoryBrands.default;
        }
      } else if (Array.isArray(categoryBrands)) {
        brands = categoryBrands;
      }
      
      // Limitar a 20 marcas para no saturar
      if (brands.length > 20) {
        brands = brands.slice(0, 20);
      }
      
      setFilteredBrands(brands);
      setLoading(false);
    };
    
    filterBrands();
  }, [selectedCategory, selectedSubCategory, allBrandsByCategory]);
  
  // Manejar cambio de marca
  const handleBrandChange = (e) => {
    const value = e.target.value;
    handleChangeInput(e);
    
    // Si selecciona "otro", enfocar el campo personalizado
    if (value === 'autre') {
      setTimeout(() => {
        const customField = document.querySelector(`[name="${name}_custom"]`);
        if (customField) customField.focus();
      }, 100);
    }
  };
  
  // Seleccionar marca rápida
  const handleQuickSelect = (brand) => {
    handleChangeInput({
      target: {
        name: name,
        value: brand
      }
    });
  };
  
  return (
    <div className="marque-field-container">
      <Form.Group className="mt-3">
        <Form.Label className="d-flex justify-content-between align-items-center">
          <span>
            🏷️ {t(label)}
            <span className="text-danger ms-1">*</span>
          </span>
          
          {filteredBrands.length > 0 && (
            <Badge bg="info" className="fs-6">
              {t('available_brands', { count: filteredBrands.length })}
            </Badge>
          )}
        </Form.Label>
        
        {/* Estado de carga */}
        {loading ? (
          <div className="text-center py-3">
            <Spinner size="sm" animation="border" className="me-2" />
            <span className="text-muted">{t('messages.loading_brands')}</span>
          </div>
        ) : !selectedCategory ? (
          <div className="alert alert-warning py-2">
            <small>{t('select_category_first')}</small>
          </div>
        ) : filteredBrands.length > 0 ? (
          <>
            {/* Select principal */}
            <Form.Select
              name={name}
              value={postData[name] || ''}
              onChange={handleBrandChange}
              required
              className="mb-2"
            >
              <option value="">{t('select_brand')}</option>
              
              {/* Mostrar marcas populares primero */}
              {filteredBrands.slice(0, 10).map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
              
              <option value="autre">{t('other_brand')}</option>
            </Form.Select>
            
            {/* Badges de selección rápida */}
            <div className="d-flex flex-wrap gap-1 mt-2 mb-3">
              {filteredBrands.slice(0, 6).map((brand) => (
                <Badge 
                  key={brand}
                  bg={postData[name] === brand ? "primary" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => handleQuickSelect(brand)}
                  style={{ cursor: 'pointer' }}
                >
                  {brand}
                </Badge>
              ))}
            </div>
            
            {/* Información contextual */}
            <Form.Text className="text-muted d-block mb-2">
              <small>
                {t('categories.' + (selectedCategory || 'default'), selectedCategory || '')}
                {selectedSubCategory && ` › ${selectedSubCategory}`}
              </small>
            </Form.Text>
          </>
        ) : (
          <div className="alert alert-warning py-2">
            <small>{t('no_brands_available')}</small>
          </div>
        )}
        
        {/* Campo para marca personalizada */}
        {postData[name] === 'autre' && (
          <div className="mt-3">
            <Form.Label className="text-primary">
              ✏️ {t('brand_custom')}
            </Form.Label>
            <Form.Control
              type="text"
              name={`${name}_custom`}
              value={postData[`${name}_custom`] || ''}
              onChange={handleChangeInput}
              placeholder={t('specify_brand')}
              required={postData[name] === 'autre'}
              className="border-primary"
            />
            <Form.Text className="text-info">
              <small>{t('hints.brand_not_listed')}</small>
            </Form.Text>
          </div>
        )}
        
        {/* Validación */}
        {!postData[name] && (
          <Form.Text className="text-danger">
            <small>{t('validation.brand_required')}</small>
          </Form.Text>
        )}
        
        {postData[name] === 'autre' && !postData[`${name}_custom`] && (
          <Form.Text className="text-danger">
            <small>{t('validation.custom_brand_required')}</small>
          </Form.Text>
        )}
      </Form.Group>
    </div>
  );
};

export default React.memo(MarqueField);