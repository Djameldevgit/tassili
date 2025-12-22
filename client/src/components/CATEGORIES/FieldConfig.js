// 📁 src/components/CATEGORIES/FieldConfig.js

export const FIELD_CONFIG = {
  // ============ IMMOBILIER ============
  'immobilier': {
    'vente': {
      'appartement': [
        'superficie', 'prix', 'nombrePieces', 'etage', 'ascenseur', 
        'parking', 'meuble', 'description'
      ],
      'villa': [
        'superficie', 'prix', 'nombrePieces', 'etages', 'jardin', 
        'piscine', 'garage', 'description'
      ],
      'terrain': [
        'superficie', 'prix', 'zonage', 'viabilise', 'description'
      ],
      'local': [
        'superficie', 'prix', 'activiteAutorisee', 'vitrine', 'description'
      ],
      'immeuble': [
        'superficie', 'prix', 'nombreEtages', 'nombreAppartements', 'description'
      ],
      'bungalow': [
        'superficie', 'prix', 'mobilite', 'capacite', 'description'
      ],
      'ferme': [
        'superficie', 'prix', 'typeFerme', 'equipements', 'description'
      ]
    },
    'location': {
      'appartement': [
        'superficie', 'loyer', 'caution', 'nombrePieces', 'etage', 
        'chargesComprises', 'meuble', 'description'
      ],
      'villa': [
        'superficie', 'loyer', 'caution', 'nombrePieces', 'etages', 
        'jardin', 'description'
      ],
      'local': [
        'superficie', 'loyer', 'activiteAutorisee', 'description'
      ],
      'bureau': [
        'superficie', 'loyer', 'nombreBureaux', 'climatisation', 'description'
      ]
    }
  },

  // ============ VEHICULES ============
  'vehicules': {
    'automobiles': [
      'marque', 'modele', 'annee', 'kilometrage', 'carburant', 
      'boiteVitesse', 'puissance', 'couleur', 'etat', 'prix'
    ],
    'motos': [
      'typeMoto', 'marque', 'modele', 'cylindree', 'annee', 
      'kilometrage', 'couleur', 'etat', 'prix'
    ],
    'utilitaires': [
      'marque', 'modele', 'typeUtilitaire', 'annee', 'kilometrage', 
      'chargeUtile', 'couleur', 'etat', 'prix'
    ],
    'fourgons': [
      'typeFourgon', 'marque', 'modele', 'volume', 'chargeUtile', 
      'annee', 'etat', 'prix'
    ],
    'camions': [
      'typeCamion', 'marque', 'modele', 'ptac', 'chargeUtile', 
      'annee', 'etat', 'prix'
    ],
    'bus': [
      'typeBus', 'marque', 'modele', 'nombrePlaces', 'annee', 'etat', 'prix'
    ],
    'engins': [
      'typeEngin', 'marque', 'modele', 'puissance', 'etatEngin', 
      'annee', 'prix'
    ],
    'tracteurs': [
      'typeTracteur', 'marque', 'modele', 'puissance', 'annee', 'etat', 'prix'
    ],
    'remorques': [
      'typeRemorque', 'dimensions', 'chargeUtile', 'marque', 'modele', 'prix'
    ],
    'quads': [
      'typeQuad', 'marque', 'modele', 'cylindree', 'annee', 'etat', 'prix'
    ],
    'bateaux': [
      'typeBateau', 'longueur', 'moteur', 'puissance', 'marque', 
      'modele', 'annee', 'prix'
    ],
    'pieces_vehicules': [
      'typePiece', 'marqueCompatible', 'modeleCompatible', 'etatPiece', 'prix'
    ]
  },

  // ============ TELEPHONES ============
  'telephones': {
    'smartphones': [
      'marque', 'modele', 'etat', 'capaciteStockage', 'couleur',
      'systemeExploitation', 'tailleEcran', 'ram', 'batterie', 'reseau',
      'capteurEmpreinte', 'faceid', 'doubleSim', 'typeChargeur', 'garantie', 'imei'
    ],
    'telephones_cellulaires': [
      'marque', 'modele', 'etat', 'couleur', 'typeTelephone',
      'reseau', 'doubleSim', 'batterie', 'garantie'
    ],
    'tablettes': [
      'marque', 'modele', 'etat', 'capaciteStockage', 'couleur',
      'systemeExploitation', 'tailleEcran', 'ram', 'batterie',
      'reseau', 'connectivite', 'garantie'
    ],
    'fixes_fax': [
      'typeAppareil', 'marque', 'modele', 'etat', 'couleur',
      'fonctions', 'connectivite', 'garantie'
    ],
    'smartwatchs': [
      'marque', 'modele', 'etat', 'couleur', 'systemeExploitation',
      'tailleEcran', 'batterie', 'compatible', 'fonctions', 'garantie'
    ],
    'protection_antichoc': [
      'typeProtection', 'marque', 'modeleCompatible', 'couleur',
      'materiau', 'etat'
    ],
    'ecouteurs_son': [
      'typeEcouteurs', 'marque', 'modele', 'couleur', 'connectivite',
      'micro', 'cancellationBruit', 'etat'
    ],
    'chargeurs_cables': [
      'typeAccessoire', 'marque', 'modeleCompatible', 'typeConnecteur',
      'longueur', 'puissance', 'couleur', 'etat'
    ],
    'supports_stabilisateurs': [
      'typeSupport', 'marque', 'modeleCompatible', 'materiau',
      'ajustable', 'etat'
    ],
    'manettes': [
      'typeManette', 'marque', 'modele', 'compatible',
      'connectivite', 'couleur', 'etat'
    ],
    'vr': [
      'typeVR', 'marque', 'modele', 'compatible', 'resolution',
      'champVision', 'etat'
    ],
    'power_banks': [
      'marque', 'modele', 'capacite', 'nombrePorts',
      'typeCharge', 'couleur', 'etat'
    ],
    'stylets': [
      'typeStylet', 'marque', 'modele', 'compatible',
      'pression', 'couleur', 'etat'
    ],
    'cartes_memoire': [
      'typeCarte', 'marque', 'capacite', 'vitesse',
      'classe', 'etat'
    ],
    'accessoires': [
      'typeAccessoire', 'marque', 'modele', 'compatible',
      'couleur', 'etat'
    ],
    'pieces_rechange': [
      'typePiece', 'marque', 'modeleCompatible', 'etat'
    ],
    'offres_abonnements': [
      'typeOffre', 'operateur', 'duree', 'dataIncluse',
      'appelsInclus', 'smsInclus', 'prixMensuel', 'engagement'
    ]
  },

  // ============ ELECTROMENAGER ============
  'electromenager': {
    'televiseurs': [
      'marque', 'modele', 'tailleEcran', 'typeEcran', 'smartTv',
      'resolution', 'etat', 'anneeFabrication', 'garantie'
    ],
    'refrigerateurs_congelateurs': [
      'typeAppareil', 'marque', 'modele', 'capacite', 'classeEnergetique',
      'typeFroid', 'etat', 'dimensions', 'garantie'
    ],
    'machines_laver': [
      'typeMachine', 'marque', 'modele', 'capacite', 'classeEnergetique',
      'vitesseEssorage', 'etat', 'programmes', 'garantie'
    ],
    'lave_vaisselles': [
      'marque', 'modele', 'capacite', 'classeEnergetique',
      'programmes', 'etat', 'garantie'
    ],
    'fours_cuisson': [
      'typeAppareil', 'marque', 'modele', 'typeCuisson', 'capacite',
      'classeEnergetique', 'etat', 'garantie'
    ],
    'climatisation': [
      'typeAppareil', 'marque', 'modele', 'puissance', 'typeClimatisation',
      'etat', 'garantie'
    ],
    'aspirateurs': [
      'typeAppareil', 'marque', 'modele', 'puissance', 'typeAspirateur',
      'etat', 'garantie'
    ],
    'chauffage': [
      'typeAppareil', 'marque', 'modele', 'puissance', 'typeChauffage',
      'etat', 'garantie'
    ],
    'chauffe_eau': [
      'typeAppareil', 'marque', 'modele', 'capacite', 'typeChauffage',
      'etat', 'garantie'
    ],
    'demodulateurs_box_tv': [
      'typeAppareil', 'marque', 'modele', 'compatible', 'etat', 'garantie'
    ],
    'paraboles_switch_tv': [
      'typeAppareil', 'marque', 'modele', 'compatible', 'etat'
    ],
    'abonnements_iptv': [
      'typeAbonnement', 'fournisseur', 'duree', 'nombreChaines', 'prix'
    ],
    'cameras_accessories': [
      'typeAppareil', 'marque', 'modele', 'resolution', 'etat'
    ],
    'audio': [
      'typeAppareil', 'marque', 'modele', 'puissance', 'connectivite', 'etat'
    ],
    'entretien_maison': [
      'typeAppareil', 'marque', 'modele', 'fonctions', 'etat'
    ]
  },

  // ============ INFORMATIQUE ============
  'informatique': {
    'ordinateurs_portables': [
      'marque', 'modele', 'processeur', 'ram', 'stockage', 'tailleEcran',
      'carteGraphique', 'systemeExploitation', 'etat', 'garantie', 'prix'
    ],
    'ordinateurs_bureau': [
      'marque', 'modele', 'processeur', 'ram', 'stockage', 'carteGraphique',
      'typeBoitier', 'systemeExploitation', 'etat', 'garantie', 'prix'
    ],
    'serveurs': [
      'typeServeur', 'marque', 'modele', 'processeur', 'ram', 'stockage',
      'hauteurU', 'etat', 'prix'
    ],
    'ecrans': [
      'marque', 'modele', 'tailleEcran', 'resolution', 'typeEcran',
      'refreshRate', 'etat', 'prix'
    ],
    'composants_pc': [
      'typeComposant', 'marque', 'modele', 'compatible', 'capacite', 'etat', 'prix'
    ],
    'imprimantes': [
      'typeImprimante', 'marque', 'modele', 'fonctions', 'connectivite', 'etat', 'prix'
    ],
    'reseau': [
      'typeEquipement', 'marque', 'modele', 'vitesse', 'ports', 'wifi', 'etat', 'prix'
    ],
    'stockage': [
      'typeStockage', 'marque', 'modele', 'capacite', 'interface', 'etat', 'prix'
    ],
    'onduleurs': [
      'typeAppareil', 'marque', 'modele', 'puissance', 'autonomie', 'etat', 'prix'
    ],
    'compteuses_billets': [
      'marque', 'modele', 'typeBillets', 'vitesseComptage', 'etat', 'prix'
    ],
    'claviers_souris': [
      'typePeripherique', 'marque', 'modele', 'connectivite', 'couleur', 'etat', 'prix'
    ],
    'casques_son': [
      'typeCasque', 'marque', 'modele', 'connectivite', 'couleur', 'etat', 'prix'
    ],
    'webcam': [
      'marque', 'modele', 'resolution', 'connectivite', 'etat', 'prix'
    ],
    'data_shows': [
      'marque', 'modele', 'resolution', 'luminosite', 'connectivite', 'etat', 'prix'
    ],
    'cables_adaptateurs': [
      'typeCable', 'longueur', 'connecteurDebut', 'connecteurFin', 'couleur', 'etat', 'prix'
    ],
    'stylets': [
      'typeStylet', 'marque', 'modele', 'compatible', 'couleur', 'etat', 'prix'
    ],
    'cartables_sacoches': [
      'typeSac', 'marque', 'modele', 'taille', 'materiau', 'couleur', 'etat', 'prix'
    ],
    'manettes': [
      'typeManette', 'marque', 'modele', 'compatible', 'connectivite', 'couleur', 'etat', 'prix'
    ],
    'vr': [
      'typeVR', 'marque', 'modele', 'resolution', 'compatible', 'etat', 'prix'
    ]
  },

  // ============ VETEMENTS ============
  'vetements': {
    'vetements_homme': [
      'typeVetement', 'marque', 'modele', 'taille', 'couleur', 'matiere',
      'etat', 'saison', 'prix'
    ],
    'vetements_femme': [
      'typeVetement', 'marque', 'modele', 'taille', 'couleur', 'matiere',
      'etat', 'saison', 'prix'
    ],
    'chaussures_homme': [
      'typeChaussure', 'marque', 'modele', 'pointure', 'couleur', 'matiere',
      'etat', 'prix'
    ],
    'chaussures_femme': [
      'typeChaussure', 'marque', 'modele', 'pointure', 'couleur', 'hauteurTalon',
      'matiere', 'etat', 'prix'
    ],
    'garcons': [
      'typeVetement', 'marque', 'modele', 'taille', 'couleur', 'ageCible',
      'etat', 'prix'
    ],
    'filles': [
      'typeVetement', 'marque', 'modele', 'taille', 'couleur', 'ageCible',
      'etat', 'prix'
    ],
    'bebe': [
      'typeVetement', 'marque', 'modele', 'taille', 'couleur', 'ageMois',
      'etat', 'prix'
    ],
    'tenues_pro': [
      'typeTenue', 'marque', 'modele', 'taille', 'couleur', 'secteur',
      'etat', 'prix'
    ],
    'sacs': [
      'typeSac', 'marque', 'modele', 'couleur', 'matiere', 'etat', 'prix'
    ],
    'montres': [
      'marque', 'modele', 'couleur', 'materielBracelet', 'etat', 'prix'
    ],
    'lunettes': [
      'marque', 'modele', 'couleurMonture', 'typeVerres', 'etat', 'prix'
    ],
    'bijoux': [
      'typeBijou', 'marque', 'modele', 'couleur', 'pierre', 'matiere', 'etat', 'prix'
    ]
  },

  // ============ SANTE & BEAUTE ============
  'sante_beaute': {
    'cosmetiques_beaute': [
      'typeProduit', 'marque', 'modele', 'typeCosmetique', 'typePeau',
      'contenance', 'utilisation', 'datePeremption', 'etat', 'prix'
    ],
    'parfums_deodorants_femme': [
      'typeParfum', 'marque', 'modele', 'familleOlfactive', 'contenance',
      'datePeremption', 'etat', 'prix'
    ],
    'parfums_deodorants_homme': [
      'typeParfum', 'marque', 'modele', 'familleOlfactive', 'contenance',
      'datePeremption', 'etat', 'prix'
    ],
    'parapharmacie_sante': [
      'typeProduit', 'marque', 'modele', 'typeComplement', 'contenance',
      'datePeremption', 'etat', 'prix'
    ]
  },

  // ============ MEUBLES ============
  'meubles': {
    'meubles_maison': [
      'typeMeuble', 'marque', 'modele', 'materiau', 'couleur', 'dimensions',
      'etat', 'prix'
    ],
    'decoration': [
      'typeDecoration', 'marque', 'modele', 'materiau', 'couleur', 'style',
      'dimensions', 'etat', 'prix'
    ],
    'vaisselle': [
      'typeVaisselle', 'marque', 'modele', 'materiau', 'nombrePieces',
      'etat', 'prix'
    ],
    'meubles_bureau': [
      'typeBureau', 'marque', 'modele', 'materiau', 'dimensions', 'couleur',
      'etat', 'prix'
    ],
    'rideaux': [
      'typeRideau', 'marque', 'modele', 'materiau', 'longueur', 'largeur',
      'couleur', 'etat', 'prix'
    ],
    'literie_linge': [
      'marque', 'modele', 'tailleLit', 'typeMatelas', 'materiauLinge',
      'couleur', 'etat', 'prix'
    ],
    'puericulture': [
      'typeProduit', 'marque', 'modele', 'ageEnfant', 'materiau',
      'couleur', 'securite', 'etat', 'prix'
    ],
    'tapis_moquettes': [
      'typeTapis', 'marque', 'modele', 'materiau', 'dimensions', 'couleur',
      'etat', 'prix'
    ],
    'meubles_exterieur': [
      'typeMeubleExterieur', 'marque', 'modele', 'materiau', 'resistanceMeteo',
      'dimensions', 'couleur', 'etat', 'prix'
    ],
    'fournitures_scolaires': [
      'typeFourniture', 'marque', 'modele', 'couleur', 'quantite', 'etat', 'prix'
    ],
    'luminaire': [
      'typeLuminaire', 'marque', 'modele', 'materiau', 'couleur', 'puissance',
      'typeAmpoule', 'etat', 'prix'
    ],
    'autre': [
      'descriptionSpecifique', 'marque', 'modele', 'dimensions', 'materiau', 'etat', 'prix'
    ]
  },

  // ============ LOISIRS ============
  'loisirs': {
    'animalerie': [
      'typeProduit', 'marque', 'modele', 'typeAnimal', 'etat', 'prix'
    ],
    'consoles_jeux_videos': [
      'typeConsole', 'marque', 'modele', 'etat', 'accessoires', 'prix'
    ],
    'livres_magazines': [
      'typeLivre', 'marque', 'modele', 'auteur', 'editeur', 'langue', 'etat', 'prix'
    ],
    'instruments_musique': [
      'typeInstrument', 'marque', 'modele', 'etat', 'prix'
    ],
    'jeux_loisirs': [
      'typeJeu', 'marque', 'modele', 'nombreJoueurs', 'ageCible', 'etat', 'prix'
    ],
    'jouets': [
      'typeJouet', 'marque', 'modele', 'ageCible', 'etat', 'prix'
    ],
    'chasse_peche': [
      'typeEquipement', 'marque', 'modele', 'typeChassePeche', 'etat', 'prix'
    ],
    'jardinage': [
      'typeEquipement', 'marque', 'modele', 'typeJardinage', 'etat', 'prix'
    ],
    'antiquites_collections': [
      'typeObjet', 'marque', 'modele', 'periode', 'etat', 'prix'
    ],
    'barbecue_grillades': [
      'typeBarbecue', 'marque', 'modele', 'materiau', 'dimensions', 'etat', 'prix'
    ],
    'vapes_chichas': [
      'typeProduit', 'marque', 'modele', 'typeVape', 'etat', 'prix'
    ],
    'produits_accesoires_ete': [
      'typeProduit', 'marque', 'modele', 'typeEte', 'etat', 'prix'
    ],
    'autre': [
      'description', 'marque', 'modele', 'typeLoisir', 'etat', 'prix'
    ]
  },

  // ============ SPORT ============
  'sport': {
    'football': [
      'typeEquipementFootball', 'marque', 'modele', 'taille', 'couleur',
      'etat', 'prix'
    ],
    'hand_voley_basket': [
      'sport', 'typeEquipementBallon', 'marque', 'modele', 'tailleBallon',
      'couleur', 'etat', 'prix'
    ],
    'sport_combat': [
      'typeSportCombat', 'typeEquipementCombat', 'marque', 'modele', 'taille',
      'protectionIncluse', 'etat', 'prix'
    ],
    'fitness_musculation': [
      'typeEquipementFitness', 'marque', 'modele', 'poidsMax', 'dimensions',
      'resistance', 'etat', 'prix'
    ],
    'natation': [
      'typeEquipementNatation', 'marque', 'modele', 'taille', 'matiere',
      'niveau', 'etat', 'prix'
    ],
    'velos_trotinettes': [
      'typeVehiculeSport', 'marque', 'modele', 'taille', 'ageUtilisateur',
      'typeFreins', 'etat', 'prix'
    ],
    'sports_raquette': [
      'typeSportRaquette', 'marque', 'modele', 'tailleRaquette', 'poidsRaquette',
      'tensionCorde', 'etat', 'prix'
    ],
    'sport_aquatiques': [
      'typeSportAquatique', 'typeEquipementAquatique', 'marque', 'modele',
      'taille', 'niveauAquatique', 'etat', 'prix'
    ]
  },

  // ============ ALIMENTAIRES ============
  'alimentaires': {
    'produits_laitiers': [
      'typeLaitier', 'marque', 'modele', 'contenance', 'datePeremption',
      'temperatureConservation', 'prix'
    ],
    'fruits_secs': [
      'typeFruitSec', 'marque', 'modele', 'conditionnement', 'origine',
      'quantite', 'prix'
    ],
    'graines_riz_cereales': [
      'typeGraine', 'marque', 'modele', 'quantite', 'conditionnement',
      'origine', 'prix'
    ],
    'sucres_produits_sucres': [
      'typeSucre', 'marque', 'modele', 'quantite', 'forme', 'prix'
    ],
    'boissons': [
      'typeBoisson', 'marque', 'modele', 'volume', 'alcool', 'prix'
    ],
    'viandes_poissons': [
      'typeViande', 'marque', 'modele', 'quantite', 'conditionnement',
      'congele', 'prix'
    ],
    'cafe_the_infusion': [
      'typeProduit', 'marque', 'modele', 'quantite', 'origine', 'prix'
    ],
    'complements_alimentaires': [
      'typeComplement', 'marque', 'modele', 'quantite', 'dureeValidite', 'prix'
    ],
    'miel_derives': [
      'typeProduit', 'marque', 'modele', 'quantite', 'origine', 'purete', 'prix'
    ],
    'fruits_legumes': [
      'typeProduit', 'marque', 'modele', 'quantite', 'frais', 'origine', 'prix'
    ],
    'ble_farine': [
      'typeFarine', 'marque', 'modele', 'quantite', 'typeMouture', 'origine', 'prix'
    ],
    'bonbons_chocolat': [
      'typeConfiserie', 'marque', 'modele', 'quantite', 'datePeremption', 'prix'
    ],
    'boulangerie_viennoiserie': [
      'typeProduit', 'marque', 'modele', 'quantite', 'frais', 'dateFabrication', 'prix'
    ],
    'ingredients_cuisine_patisserie': [
      'typeIngredient', 'marque', 'modele', 'quantite', 'datePeremption', 'prix'
    ],
    'noix_graines': [
      'typeNoix', 'marque', 'modele', 'quantite', 'conditionnement', 'decortique', 'prix'
    ],
    'plats_cuisines': [
      'typePlat', 'marque', 'modele', 'quantite', 'conditionnement', 'datePeremption', 'prix'
    ],
    'sauces_epices_condiments': [
      'typeProduit', 'marque', 'modele', 'quantite', 'piquant', 'prix'
    ],
    'oeufs': [
      'typeOeufs', 'marque', 'modele', 'quantite', 'calibre', 'datePonte', 'prix'
    ],
    'huiles': [
      'typeHuile', 'marque', 'modele', 'volume', 'viergeExtra', 'prix'
    ],
    'pates': [
      'typePates', 'marque', 'modele', 'quantite', 'composition', 'prix'
    ],
    'gateaux': [
      'typeGateau', 'marque', 'modele', 'quantite', 'frais', 'datePeremption', 'prix'
    ],
    'emballage': [
      'typeEmballage', 'marque', 'modele', 'quantite', 'materiel', 'dimensions', 'prix'
    ],
    'aliments_bebe': [
      'typeAliment', 'marque', 'modele', 'quantite', 'ageCible', 'prix'
    ],
    'aliments_dietetiques': [
      'typeProduit', 'marque', 'modele', 'quantite', 'regime', 'prix'
    ]
  },

  // ============ SERVICES ============
  'services': {
    'construction_travaux': [
      'typeTravaux', 'marque', 'modele', 'experience', 'zoneIntervention', 'prix'
    ],
    'ecoles_formations': [
      'typeFormation', 'marque', 'modele', 'domaine', 'dureeFormation', 'prix'
    ],
    'industrie_fabrication': [
      'typeServiceIndustrie', 'marque', 'modele', 'capaciteProduction', 'prix'
    ],
    'transport_demenagement': [
      'typeVehicule', 'marque', 'modele', 'capacite', 'zone', 'prix'
    ],
    'decoration_amenagement': [
      'typeServiceDecoration', 'marque', 'modele', 'style', 'references', 'prix'
    ],
    'publicite_communication': [
      'typeServiceCommunication', 'marque', 'modele', 'support', 'cibles', 'prix'
    ],
    'nettoyage_jardinage': [
      'typeServiceNettoyage', 'marque', 'modele', 'surface', 'frequence', 'prix'
    ],
    'froid_climatisation': [
      'typeServiceFroid', 'marque', 'modele', 'marques', 'garantie', 'prix'
    ],
    'traiteurs_gateaux': [
      'typeServiceTraiteur', 'marque', 'modele', 'specialite', 'capacite', 'prix'
    ],
    'medecine_sante': [
      'typeServiceSante', 'marque', 'modele', 'specialite', 'qualifications', 'prix'
    ],
    'reparation_auto_diagnostic': [
      'typeServiceAuto', 'marque', 'modele', 'marques', 'garantie', 'prix'
    ],
    'securite_alarme': [
      'typeServiceSecurite', 'marque', 'modele', 'systemes', 'certifications', 'prix'
    ],
    'projets_etudes': [
      'typeServiceProjet', 'marque', 'modele', 'domaine', 'delai', 'prix'
    ],
    'bureautique_internet': [
      'typeServiceBureautique', 'marque', 'modele', 'logiciels', 'support', 'prix'
    ],
    'location_vehicules': [
      'typeVehicule', 'marque', 'modele', 'conditions', 'prix'
    ],
    'menuiserie_meubles': [
      'typeServiceMenuiserie', 'marque', 'modele', 'materiaux', 'delai', 'prix'
    ],
    'impression_edition': [
      'typeServiceImpression', 'marque', 'modele', 'formats', 'quantite', 'prix'
    ],
    'hotellerie_restauration_salles': [
      'typeService', 'marque', 'modele', 'capacite', 'services', 'prix'
    ],
    'image_son': [
      'typeServiceImage', 'marque', 'modele', 'equipements', 'experience', 'prix'
    ],
    'comptabilite_economie': [
      'typeServiceComptabilite', 'marque', 'modele', 'specialite', 'logiciels', 'prix'
    ],
    'couture_confection': [
      'typeServiceCouture', 'marque', 'modele', 'specialite', 'delai', 'prix'
    ],
    'maintenance_informatique': [
      'typeServiceMaintenance', 'marque', 'modele', 'marques', 'diagnostic', 'prix'
    ],
    'reparation_electromenager': [
      'typeServiceElectromenager', 'marque', 'modele', 'marques', 'garantie', 'prix'
    ],
    'evenements_divertissement': [
      'typeServiceEvenement', 'marque', 'modele', 'typeEvenement', 'animation', 'prix'
    ],
    'paraboles_demos': [
      'typeServiceParabole', 'marque', 'modele', 'systemes', 'installation', 'prix'
    ],
    'reparation_electronique': [
      'typeServiceElectronique', 'marque', 'modele', 'appareils', 'garantie', 'prix'
    ],
    'services_etranger': [
      'typeServiceEtranger', 'marque', 'modele', 'pays', 'langues', 'delai', 'prix'
    ],
    'flashage_reparation_telephones': [
      'typeServiceFlashage', 'marque', 'modele', 'marques', 'garantie', 'prix'
    ],
    'juridique': [
      'typeServiceJuridique', 'marque', 'modele', 'domaine', 'langues', 'prix'
    ]
  },

  // ============ MATERIAUX ============
  'materiaux': {
    'materiel_professionnel': [
      'typeProfession', 'marque', 'modele', 'etatMateriel', 'prix'
    ],
    'outillage_professionnel': [
      'typeOutil', 'marque', 'modele', 'etatOutil', 'puissanceOutil', 'prix'
    ],
    'materiaux_construction': [
      'typeMateriau', 'marque', 'modele', 'quantite', 'qualite', 'prix'
    ],
    'matieres_premieres': [
      'typeMatiere', 'marque', 'modele', 'quantite', 'qualite', 'prix'
    ],
    'produits_hygiene': [
      'typeProduitHygiene', 'marque', 'modele', 'quantite', 'datePeremption', 'prix'
    ],
    'materiel_agricole': [
      'typeMaterielAgricole', 'marque', 'modele', 'puissance', 'etat', 'prix'
    ],
    'autre': [
      'descriptionSpecifique', 'marque', 'modele', 'typeMateriau', 'prix'
    ]
  },

  // ============ VOYAGES ============
  'voyages': {
    'voyage_organise': [
      'typeVoyage', 'marque', 'modele', 'destination', 'dureeVoyage', 'prix'
    ],
    'location_vacances': [
      'typeHebergement', 'marque', 'modele', 'capacite', 'equipements', 'prix'
    ],
    'hajj_omra': [
      'typeVoyageReligieux', 'marque', 'modele', 'periode', 'servicesInclus', 'prix'
    ],
    'reservations_visa': [
      'typeServiceVisa', 'marque', 'modele', 'pays', 'typeVisa', 'delai', 'prix'
    ],
    'sejour': [
      'typeSejour', 'marque', 'modele', 'duree', 'activites', 'prix'
    ],
    'croisiere': [
      'compagnie', 'marque', 'modele', 'duree', 'escales', 'prix'
    ],
    'autre': [
      'descriptionSpecifique', 'marque', 'modele', 'typeVoyage', 'prix'
    ]
  },

  // ============ EMPLOI ============
  'emploi': {
    'offres_emploi': [
      'typeContrat', 'marque', 'modele', 'poste', 'secteur', 'experienceRequise', 'salaire'
    ],
    'demandes_emploi': [
      'posteRecherche', 'marque', 'modele', 'secteur', 'typeContrat', 'experience', 'salaireSouhaite'
    ]
  },

  // ============ PIECES DETACHEES ============
  'pieces_detachees': {
    'pieces_automobiles': [
      'typePieceAuto', 'marque', 'modele', 'marqueCompatible', 'modeleCompatible', 'etatPiece', 'prix'
    ],
    'pieces_vehicules': [
      'typePieceVehicule', 'marque', 'modele', 'marqueCompatible', 'typeVehicule', 'etatPiece', 'prix'
    ],
    'pieces_moto': [
      'typePieceMoto', 'marque', 'modele', 'marqueCompatible', 'modeleCompatible', 'etatPiece', 'prix'
    ],
    'pieces_bateaux': [
      'typePieceBateau', 'marque', 'modele', 'marqueCompatible', 'modeleCompatible', 'etatPiece', 'prix'
    ],
    'alarme_securite': [
      'typeAlarme', 'marque', 'modele', 'fonctions', 'compatibleAvec', 'etat', 'prix'
    ],
    'nettoyage_entretien': [
      'typeProduit', 'marque', 'modele', 'application', 'contenance', 'etat', 'prix'
    ],
    'outils_diagnostics': [
      'typeOutil', 'marque', 'modele', 'fonctionsOutil', 'compatibleAvec', 'etat', 'prix'
    ],
    'lubrifiants': [
      'typeLubrifiant', 'marque', 'modele', 'viscosite', 'contenance', 'application', 'etat', 'prix'
    ]
  }
};

// 🔥 FUNCIÓN para obtener campos específicos
export const getVisibleFields = (mainCategory, subCategory, articleType = null) => {
  console.log('🔍 FieldConfig.getVisibleFields:', {
    mainCategory,
    subCategory,
    articleType
  });

  if (!mainCategory || !FIELD_CONFIG[mainCategory]) {
    console.log('⚠️ Categoría no encontrada:', mainCategory);
    return [];
  }

  // Para immobilier (tiene articleType)
  if (mainCategory === 'immobilier' && articleType) {
    const fields = FIELD_CONFIG[mainCategory][articleType]?.[subCategory];
    console.log(`🏠 Campos para ${mainCategory}.${articleType}.${subCategory}:`, fields);
    return fields || [];
  }

  // Para otras categorías
  const fields = FIELD_CONFIG[mainCategory]?.[subCategory];
  console.log(`📋 Campos para ${mainCategory}.${subCategory}:`, fields);
  return fields || [];
};

// 🔥 FUNCIÓN para validar campos requeridos
export const getRequiredFields = (mainCategory, subCategory) => {
  const baseRequired = ['title', 'description', 'price', 'telephone', 'wilaya'];
  
  const categoryRequired = {
    'vehicules': ['marque', 'modele', 'annee'],
    'telephones': ['marque', 'modele', 'etat'],
    'electromenager': ['marque', 'modele', 'etat'],
    'informatique': ['marque', 'modele', 'etat'],
    'vetements': ['marque', 'modele', 'taille'],
    'immobilier': ['superficie', 'prix'],
    'meubles': ['marque', 'modele', 'dimensions'],
    'sport': ['marque', 'modele', 'taille'],
    'voyages': ['marque', 'modele', 'destination']
  };
  
  return [...baseRequired, ...(categoryRequired[mainCategory] || [])];
};