// fieldsConfig.js - Configuración central de campos por categoría

export const FieldConfig = {
  
  immobilier: {
    vente: {
      appartement: ['superficie', 'prix', 'nombrePieces', 'etage', 'ascenseur', 'description'],
      villa: ['superficie', 'prix', 'nombrePieces', 'etages', 'jardin', 'piscine', 'description'],
      terrain: ['superficie', 'prix', 'zonage', 'description'],
      local: ['superficie', 'prix', 'description']
    },
    location: {
      appartement: ['superficie', 'loyer', 'nombrePieces', 'etage', 'caution', 'description', 'garage', 'meuble'],
      villa: ['superficie', 'loyer', 'nombrePieces', 'etages', 'jardin', 'caution', 'description', 'garage'],
      terrain: ['superficie', 'loyer', 'zonage', 'description'],
      local: ['superficie', 'loyer', 'description']
    },
    location_vacances: {
      appartement: ['superficie', 'loyer', 'nombrePieces', 'etage', 'dureeMinimum', 'description'],
      villa: ['superficie', 'loyer', 'nombrePieces', 'jardin', 'dureeMinimum', 'description'],
      terrain: ['superficie', 'loyer', 'zonage', 'description']
    }
  },

  
    'electromenager': {
      'televiseurs': {
        baseFields: ['marque', 'modele', 'tailleEcran', 'resolution', 'typeEcran', 'smartTv', 'connectivite', 'anneeFabrication', 'garantie', 'etat'],
        conditional: {}
      },
       
  
        'refrigerateurs_congelateurs': {
          baseFields: ['typeAppareil', 'marque', 'modele', 'capacite', 'classeEnergetique', 'typeFroid', 'dimensions', 'couleur', 'anneeFabrication', 'etat'],
          conditional: {}
        },
        'machines_laver': {
          baseFields: ['typeMachine', 'marque', 'modele', 'capacite', 'classeEnergetique', 'vitesseEssorage', 'programmes', 'dimensions', 'anneeFabrication', 'etat'],
          conditional: {}
        },
      'demodulateurs_box_tv': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'compatible', 'connectivite', 'etat', 'prix'],
        conditional: {}
      },
      'paraboles_switch_tv': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'diametreParabole', 'compatible', 'etat', 'prix'],
        conditional: {}
      },
      'abonnements_iptv': {
        baseFields: ['typeAbonnement', 'fournisseur', 'duree', 'nombreChaines', 'compatible', 'prix'],
        conditional: {}
      },
      'cameras_accessories': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'resolution', 'connectivite', 'etat', 'prix'],
        conditional: {}
      },
      'audio': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'puissance', 'connectivite', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'refrigerateurs_congelateurs': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'capacite', 'classeEnergetique', 'dimensions', 'etat', 'prix'],
        conditional: {}
      }
      },
    // ============ INFORMATIQUE ============
    'informatique': {
      'ordinateurs_portables': {
        baseFields: ['typeOrdinateur', 'marque', 'modele', 'processeur', 'ram', 'stockage', 'tailleEcran', 'etat', 'prix'],
        conditional: {}
      },
      'ordinateurs_bureau': {
        baseFields: ['typeOrdinateur', 'marque', 'modele', 'processeur', 'ram', 'stockage', 'typeBoitier', 'etat', 'prix'],
        conditional: {}
      },
      'serveurs': {
        baseFields: ['typeServeur', 'marque', 'modele', 'processeur', 'ram', 'stockage', 'hauteurU', 'etat', 'prix'],
        conditional: {}
      },
      'ecrans': {
        baseFields: ['marque', 'modele', 'tailleEcran', 'resolution', 'typeEcran', 'etat', 'prix'],
        conditional: {}
      },
      'composants_pc_fixe': {
        baseFields: ['typeComposant', 'marque', 'modele', 'compatible', 'capacite', 'etat', 'prix'],
        conditional: {}
      },
      'composants_pc_portable': {
        baseFields: ['typeComposant', 'marque', 'modele', 'compatible', 'capacite', 'etat', 'prix'],
        conditional: {}
      },
      'composants_serveur': {
        baseFields: ['typeComposant', 'marque', 'modele', 'compatible', 'capacite', 'hauteurU', 'etat', 'prix'],
        conditional: {}
      },
      'imprimantes_cartouches': {
        baseFields: ['typeImprimante', 'marque', 'modele', 'fonctions', 'connectivite', 'etat', 'prix'],
        conditional: {}
      },
      'reseau_connexion': {
        baseFields: ['typeEquipement', 'marque', 'modele', 'vitesse', 'ports', 'wifi', 'etat', 'prix'],
        conditional: {}
      },
      'stockage_externe_racks': {
        baseFields: ['typeStockage', 'marque', 'modele', 'capacite', 'interface', 'format', 'etat', 'prix'],
        conditional: {}
      },
      'onduleurs_stabilisateurs': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'puissance', 'autonomie', 'etat', 'prix'],
        conditional: {}
      },
      'compteuses_billets': {
        baseFields: ['marque', 'modele', 'typeBillets', 'vitesseComptage', 'etat', 'prix'],
        conditional: {}
      },
      'claviers_souris': {
        baseFields: ['typePeripherique', 'marque', 'modele', 'connectivite', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'casques_son': {
        baseFields: ['typeCasque', 'marque', 'modele', 'connectivite', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'webcam_videoconference': {
        baseFields: ['marque', 'modele', 'resolution', 'connectivite', 'etat', 'prix'],
        conditional: {}
      },
      'data_shows': {
        baseFields: ['marque', 'modele', 'resolution', 'luminosite', 'connectivite', 'etat', 'prix'],
        conditional: {}
      },
      'cables_adaptateurs': {
        baseFields: ['typeCable', 'longueur', 'connecteurDebut', 'connecteurFin', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'stylets_tablettes': {
        baseFields: ['typeStylet', 'marque', 'modele', 'compatible', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'cartables_sacoches': {
        baseFields: ['typeSac', 'marque', 'modele', 'taille', 'materiau', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'manettes_simulateurs': {
        baseFields: ['typeManette', 'marque', 'modele', 'compatible', 'connectivite', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'vr': {
        baseFields: ['typeVR', 'marque', 'modele', 'resolution', 'compatible', 'etat', 'prix'],
        conditional: {}
      }
    },
  
  
    'vehicules': {
      'automobiles': {
        baseFields: ['marque', 'modele', 'annee', 'kilometrage', 'carburant', 'boiteVitesse', 'puissance', 'prix'],
        conditional: {}
      },
      'motos': {
        baseFields: ['typeMoto', 'marque', 'modele', 'cylindree', 'annee', 'kilometrage', 'prix'],
        conditional: {}
      },
      'utilitaires': {
        baseFields: ['marque', 'modele', 'typeUtilitaire', 'annee', 'kilometrage', 'chargeUtile', 'prix'],
        conditional: {}
      },
      'fourgons': {
        baseFields: ['typeFourgon', 'marque', 'modele', 'annee', 'kilometrage', 'volume', 'chargeUtile', 'prix'],
        conditional: {}
      },
      'camions': {
        baseFields: ['typeCamion', 'marque', 'modele', 'annee', 'kilometrage', 'chargeUtile', 'ptac', 'prix'],
        conditional: {}
      },
      'bus': {
        baseFields: ['typeBus', 'marque', 'modele', 'annee', 'kilometrage', 'nombrePlaces', 'prix'],
        conditional: {}
      },
      'engins': {
        baseFields: ['typeEngin', 'marque', 'modele', 'annee', 'etatEngin', 'puissance', 'prix'],
        conditional: {}
      },
      'tracteurs': {
        baseFields: ['typeTracteur', 'marque', 'modele', 'annee', 'kilometrage', 'puissance', 'prix'],
        conditional: {}
      },
      'remorques': {
        baseFields: ['typeRemorque', 'marque', 'modele', 'annee', 'chargeUtile', 'dimensions', 'prix'],
        conditional: {}
      },
      'quads': {
        baseFields: ['typeQuad', 'marque', 'modele', 'cylindree', 'annee', 'kilometrage', 'prix'],
        conditional: {}
      },
      'bateaux': {
        baseFields: ['typeBateau', 'marque', 'modele', 'annee', 'longueur', 'moteur', 'puissance', 'prix'],
        conditional: {}
      },
      'pieces_vehicules': {
        baseFields: ['typePiece', 'marqueCompatible', 'modeleCompatible', 'etatPiece', 'prix'],
        conditional: {}
      }
    },
  
    // FieldConfig.js - VERSIÓN SIMPLIFICADA Y FUNCIONAL
  
    'immobilier': {
      'vente': {
        baseFields: ['superficie', 'prix', 'description'],
        conditional: {
          'appartement': ['nombrePieces', 'etage', 'ascenseur', 'parking', 'meuble'],
          'villa': ['nombrePieces', 'jardin', 'piscine', 'garage', 'etages'],
          'terrain': ['zonage', 'viabilise', 'pente'],
          'local': ['superficie', 'activiteAutorisee', 'vitrine'],
          'immeuble': ['nombreEtages', 'nombreAppartements'],
          'bungalow': ['mobilite', 'capacite'],
          'terrain_agricole': ['zonage', 'viabilise'],
          'default': []  // ← NO poner campos aquí
        }
      },
      
      'location': {
        baseFields: ['superficie', 'loyer', 'caution', 'dureeBail', 'description'],
        conditional: {
          'appartement': ['nombrePieces', 'etage', 'ascenseur', 'parking', 'meuble', 'chargesComprises'],
          'villa': ['nombrePieces', 'jardin', 'piscine', 'garage', 'etages'],
          'local': ['activiteAutorisee', 'vitrine'],
          'terrain': ['zonage'],
          'immeuble': ['nombreEtages', 'nombreAppartements'],
          'bungalow': ['mobilite', 'capacite'],
          'default': []
        }
      },
      
      'location_vacances': {
        baseFields: ['superficie', 'capacite', 'loyer', 'dureeMinimum', 'description'],
        conditional: {
          'appartement': ['etage', 'meuble', 'equipements'],
          'villa': ['jardin', 'piscine', 'etages', 'equipements'],
          'bungalow': ['mobilite', 'capacite', 'equipements'],
          'local': ['activiteAutorisee', 'vitrine'],
          'immeuble': ['nombreAppartements'],
          'default': ['description', 'capacite']
        }
      },
      
      'cherche_location': {
        baseFields: ['superficie', 'nombrePieces', 'budgetMax', 'description'],
        conditional: {
          'appartement': ['etage', 'ascenseur', 'meuble'],
          'villa': ['jardin', 'etages'],
          'local': ['activiteAutorisee'],
          'bungalow': ['mobilite'],
          'default': ['description']
        }
      },
      
      'cherche_achat': {
        baseFields: ['superficie', 'nombrePieces', 'budgetMax', 'description'],
        conditional: {
          'appartement': ['etage', 'ascenseur'],
          'villa': ['jardin', 'etages'],
          'terrain': ['zonage', 'viabilise'],
          'local': ['activiteAutorisee'],
          'bungalow': ['mobilite'],
          'default': ['description']
        }
      }
    },
  
    // ============ IMMOBILIER ============
    // ============ VÊTEMENTS & MODE ============
    'vetements': {
      'vetements_homme': {
        baseFields: ['typeVetement', 'taille', 'couleur', 'marque', 'matiere', 'etat', 'prix'],
        conditional: {
          // Puedes agregar condiciones como:
          // 'typeVetement': {
          //   'costume': ['couleurSecondaire', 'pochePoitrine'],
          //   'chemise': ['typeCol', 'manches']
          // }
        }
      },
      'vetements_femme': {
        baseFields: ['typeVetement', 'taille', 'couleur', 'marque', 'matiere', 'etat', 'prix'],
        conditional: {}
      },
      'chaussures_homme': {
        baseFields: ['typeChaussure', 'pointure', 'couleur', 'marque', 'matiere', 'etat', 'prix'],
        conditional: {}
      },
      'chaussures_femme': {
        baseFields: ['typeChaussure', 'pointure', 'couleur', 'marque', 'hauteurTalon', 'etat', 'prix'],
        conditional: {}
      },
      'garcons': {
        baseFields: ['typeVetement', 'taille', 'couleur', 'ageCible', 'etat', 'prix'],
        conditional: {}
      },
      'filles': {
        baseFields: ['typeVetement', 'taille', 'couleur', 'ageCible', 'etat', 'prix'],
        conditional: {}
      },
      'bebe': {
        baseFields: ['typeVetement', 'taille', 'couleur', 'ageMois', 'etat', 'prix'],
        conditional: {}
      },
      'tenues_pro': {
        baseFields: ['typeTenue', 'taille', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'sacs': {
        baseFields: ['typeSac', 'couleur', 'marque', 'matiere', 'etat', 'prix'],
        conditional: {}
      },
      'montres': {
        baseFields: ['marque', 'couleur', 'materielBracelet', 'etat', 'prix'],
        conditional: {}
      },
      'lunettes': {
        baseFields: ['couleurMonture', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'bijoux': {
        baseFields: ['typeBijou', 'couleur', 'pierre', 'matiere', 'etat', 'prix'],
        conditional: {}
      }
    },
    'sante_beaute': {
      'cosmetiques_beaute': {
        baseFields: ['typeProduit', 'marque', 'contenance', 'typeCosmetique', 'utilisation', 'typePeau', 'spf', 'composition', 'conservation', 'ouvert', 'prix'],
        conditional: {
          // Ejemplos de campos condicionales futuros
          // 'typeCosmetique': {
          //   'fond_teint_liquide': ['nuance', 'couverture'],
          //   'rouge_levres_liquide': ['finish', 'durabilite']
          // }
        }
      },
      'parfums_deodorants_femme': {
        baseFields: ['typeParfum', 'familleOlfactive', 'typeDeodorant', 'marque', 'contenance', 'genre', 'conservation', 'ouvert', 'prix'],
        conditional: {}
      },
      'parfums_deodorants_homme': {
        baseFields: ['typeParfum', 'familleOlfactive', 'typeDeodorant', 'marque', 'contenance', 'genre', 'conservation', 'ouvert', 'prix'],
        conditional: {}
      },
      'parapharmacie_sante': {
        baseFields: ['typeProduit', 'marque', 'contenance', 'typeComplement', 'datePeremption', 'conservation', 'composition', 'ouvert', 'prix'],
        conditional: {}
      }
    },
  
    // ============ ALIMENTAIRES & BOISSONS ============
    'alimentaires': {
      'produits_laitiers': {
        baseFields: ['typeLaitier', 'contenance', 'datePeremption', 'temperatureConservation', 'prix'],
        conditional: {}
      },
      'fruits_secs': {
        baseFields: ['typeFruitSec', 'conditionnement', 'origine', 'quantite', 'prix'],
        conditional: {}
      },
      'graines_riz_cereales': {
        baseFields: ['typeGraine', 'quantite', 'conditionnement', 'origine', 'prix'],
        conditional: {}
      },
      'sucres_produits_sucres': {
        baseFields: ['typeSucre', 'quantite', 'forme', 'marque', 'prix'],
        conditional: {}
      },
      'boissons': {
        baseFields: ['typeBoisson', 'volume', 'marque', 'alcool', 'prix'],
        conditional: {}
      },
      'viandes_poissons': {
        baseFields: ['typeViande', 'quantite', 'conditionnement', 'congele', 'prix'],
        conditional: {}
      },
      'cafe_the_infusion': {
        baseFields: ['typeProduit', 'quantite', 'marque', 'origine', 'prix'],
        conditional: {}
      },
      'complements_alimentaires': {
        baseFields: ['typeComplement', 'quantite', 'marque', 'dureeValidite', 'prix'],
        conditional: {}
      },
      'miel_derives': {
        baseFields: ['typeProduit', 'quantite', 'origine', 'purete', 'prix'],
        conditional: {}
      },
      'fruits_legumes': {
        baseFields: ['typeProduit', 'quantite', 'frais', 'origine', 'prix'],
        conditional: {}
      },
      'ble_farine': {
        baseFields: ['typeFarine', 'quantite', 'typeMouture', 'origine', 'prix'],
        conditional: {}
      },
      'bonbons_chocolat': {
        baseFields: ['typeConfiserie', 'quantite', 'marque', 'datePeremption', 'prix'],
        conditional: {}
      },
      'boulangerie_viennoiserie': {
        baseFields: ['typeProduit', 'quantite', 'frais', 'dateFabrication', 'prix'],
        conditional: {}
      },
      'ingredients_cuisine_patisserie': {
        baseFields: ['typeIngredient', 'quantite', 'marque', 'datePeremption', 'prix'],
        conditional: {}
      },
      'noix_graines': {
        baseFields: ['typeNoix', 'quantite', 'conditionnement', 'decortique', 'prix'],
        conditional: {}
      },
      'plats_cuisines': {
        baseFields: ['typePlat', 'quantite', 'conditionnement', 'datePeremption', 'prix'],
        conditional: {}
      },
      'sauces_epices_condiments': {
        baseFields: ['typeProduit', 'quantite', 'marque', 'piquant', 'prix'],
        conditional: {}
      },
      'oeufs': {
        baseFields: ['typeOeufs', 'quantite', 'calibre', 'datePonte', 'prix'],
        conditional: {}
      },
      'huiles': {
        baseFields: ['typeHuile', 'volume', 'marque', 'viergeExtra', 'prix'],
        conditional: {}
      },
      'pates': {
        baseFields: ['typePates', 'quantite', 'marque', 'composition', 'prix'],
        conditional: {}
      },
      'gateaux': {
        baseFields: ['typeGateau', 'quantite', 'frais', 'datePeremption', 'prix'],
        conditional: {}
      },
      'emballage': {
        baseFields: ['typeEmballage', 'quantite', 'materiel', 'dimensions', 'prix'],
        conditional: {}
      },
      'aliments_bebe': {
        baseFields: ['typeAliment', 'quantite', 'marque', 'ageCible', 'prix'],
        conditional: {}
      },
      'aliments_dietetiques': {
        baseFields: ['typeProduit', 'quantite', 'marque', 'regime', 'prix'],
        conditional: {}
      }
    },
    // ============ MATÉRIAUX & ÉQUIPEMENTS PROFESSIONNELS ============
    'materiaux': {
      'materiel_professionnel': {
        baseFields: ['typeProfession', 'marqueMateriel', 'modeleMateriel', 'etatMateriel', 'prix'],
        conditional: {}
      },
      'outillage_professionnel': {
        baseFields: ['typeOutil', 'marqueOutil', 'etatOutil', 'puissanceOutil', 'prix'],
        conditional: {}
      },
      'materiaux_construction': {
        baseFields: ['typeMateriau', 'quantiteMateriau', 'qualiteMateriau', 'formatMateriau', 'prix'],
        conditional: {}
      },
      'matieres_premieres': {
        baseFields: ['typeMatiere', 'quantiteMatiere', 'qualiteMatiere', 'origineMatiere', 'prix'],
        conditional: {}
      },
      'produits_hygiene': {
        baseFields: ['typeProduitHygiene', 'marqueProduit', 'quantiteProduit', 'datePeremption', 'prix'],
        conditional: {}
      },
      'materiel_agricole': {
        baseFields: ['typeMaterielAgricole', 'marqueMaterielAgricole', 'puissanceAgricole', 'etatAgricole', 'prix'],
        conditional: {}
      },
      'autre': {
        baseFields: ['descriptionSpecifique', 'prix'],
        conditional: {}
      }
    },
  
  
  
  
  
  
    // ============ MEUBLES & MAISON ============
    'meubles': {
      // Configuración por SUB-CATEGORÍA (subCategory)
      'meubles_maison': {
        baseFields: ['typeMeuble', 'materiau', 'couleur', 'etat', 'prix'],
        conditional: {} // Opcional, si necesitas condicionales por articleType
      },
      'decoration': {
        baseFields: ['typeDecoration', 'materiau', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'vaisselle': {
        baseFields: ['typeVaisselle', 'materiau', 'nombrePieces', 'etat', 'prix'],
        conditional: {}
      },
      'meubles_bureau': {
        baseFields: ['typeBureau', 'materiau', 'dimensions', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'rideaux': {
        baseFields: ['typeRideau', 'materiau', 'longueurRideau', 'largeurRideau', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'literie_linge': {
        baseFields: ['tailleLit', 'typeMatelas', 'materiauLinge', 'couleur', 'nombrePiecesLinge', 'etat', 'prix'],
        conditional: {}
      },
      'puericulture': {
        baseFields: ['ageEnfant', 'typeProduitPuériculture', 'materiau', 'couleur', 'etat', 'securite', 'prix'],
        conditional: {}
      },
      'tapis_moquettes': {
        baseFields: ['typeTapis', 'formeTapis', 'materiau', 'dimensions', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'meubles_exterieur': {
        baseFields: ['typeMeubleExterieur', 'materiau', 'resistanceMeteo', 'couleur', 'dimensions', 'etat', 'prix'],
        conditional: {}
      },
      'fournitures_scolaires': {
        baseFields: ['typeFourniture', 'marque', 'couleur', 'quantite', 'etat', 'prix'],
        conditional: {}
      },
      'luminaire': {
        baseFields: ['typeLuminaire', 'materiau', 'couleur', 'puissance', 'typeAmpoule', 'etat', 'prix'],
        conditional: {}
      },
      'autre': {
        baseFields: ['descriptionSpecifique', 'dimensions', 'materiau', 'etat', 'prix'],
        conditional: {}
      }
    },
  
    // ============ LOISIRS & DIVERTISSEMENTS ============
    'loisirs': {
      'animalerie': {
        baseFields: ['typeProduit', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'consoles_jeux_videos': {
        baseFields: ['typeConsole', 'marque', 'modele', 'etat', 'prix'],
        conditional: {}
      },
      'livres_magazines': {
        baseFields: ['typeLivre', 'auteur', 'editeur', 'etat', 'prix'],
        conditional: {}
      },
      'instruments_musique': {
        baseFields: ['typeInstrument', 'marque', 'modele', 'etat', 'prix'],
        conditional: {}
      },
      'jeux_loisirs': {
        baseFields: ['typeJeu', 'nombreJoueurs', 'ageCible', 'etat', 'prix'],
        conditional: {}
      },
      'jouets': {
        baseFields: ['typeJouet', 'ageCible', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'chasse_peche': {
        baseFields: ['typeEquipement', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'jardinage': {
        baseFields: ['typeEquipement', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'antiquites_collections': {
        baseFields: ['typeObjet', 'periode', 'etat', 'prix'],
        conditional: {}
      },
      'barbecue_grillades': {
        baseFields: ['typeBarbecue', 'materiau', 'dimensions', 'etat', 'prix'],
        conditional: {}
      },
      'vapes_chichas': {
        baseFields: ['typeProduit', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'produits_accesoires_ete': {
        baseFields: ['typeProduit', 'marque', 'etat', 'prix'],
        conditional: {}
      },
      'autre': {
        baseFields: ['description', 'etat', 'prix'],
        conditional: {}
      }
    },
  
    // ============ SPORT ============
    // ============ SPORT & LOISIRS ============
    'sport': {
      'football': {
        baseFields: ['typeEquipementFootball', 'marqueSport', 'tailleEquipement', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'hand_voley_basket': {
        baseFields: ['sportType', 'typeEquipementBallon', 'marqueBallon', 'tailleBallon', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'sport_combat': {
        baseFields: ['typeSportCombat', 'typeEquipementCombat', 'tailleCombat', 'protectionIncluse', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'fitness_musculation': {
        baseFields: ['typeEquipementFitness', 'poidsMax', 'dimensionsFitness', 'resistance', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'natation': {
        baseFields: ['typeEquipementNatation', 'tailleNatation', 'matiereNatation', 'niveau', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'velos_trotinettes': {
        baseFields: ['typeVehiculeSport', 'tailleVehicule', 'ageUtilisateur', 'typeFreins', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'sports_raquette': {
        baseFields: ['typeSportRaquette', 'tailleRaquette', 'poidsRaquette', 'tensionCorde', 'etatEquipement', 'prix'],
        conditional: {}
      },
      'sport_aquatiques': {
        baseFields: ['typeSportAquatique', 'typeEquipementAquatique', 'tailleAquatique', 'niveauAquatique', 'etatEquipement', 'prix'],
        conditional: {}
      }
    },
  
    // ============ TÉLÉPHONES & ACCESSOIRES ============
    'telephones': {
      'smartphones': {
        baseFields: ['marque', 'modele', 'etat', 'capaciteStockage', 'couleur', 'systemeExploitation', 'tailleEcran', 'ram', 'batterie', 'reseau', 'capteurEmpreinte', 'faceid', 'doubleSim', 'typeChargeur', 'garantie', 'imei', 'prix'],
        conditional: {}
      },
      'telephones_cellulaires': {
        baseFields: ['marque', 'modele', 'etat', 'couleur', 'typeTelephone', 'reseau', 'doubleSim', 'batterie', 'garantie', 'prix'],
        conditional: {}
      },
      'tablettes': {
        baseFields: ['marque', 'modele', 'etat', 'capaciteStockage', 'couleur', 'systemeExploitation', 'tailleEcran', 'ram', 'batterie', 'reseau', 'connectivite', 'garantie', 'prix'],
        conditional: {}
      },
      'fixes_fax': {
        baseFields: ['typeAppareil', 'marque', 'modele', 'etat', 'couleur', 'fonctions', 'connectivite', 'garantie', 'prix'],
        conditional: {}
      },
      'smartwatchs': {
        baseFields: ['marque', 'modele', 'etat', 'couleur', 'systemeExploitation', 'tailleEcran', 'batterie', 'compatible', 'fonctions', 'garantie', 'prix'],
        conditional: {}
      },
      'protection_antichoc': {
        baseFields: ['typeProtection', 'marque', 'modeleCompatible', 'couleur', 'materiau', 'etat', 'prix'],
        conditional: {}
      },
      'ecouteurs_son': {
        baseFields: ['typeEcouteurs', 'marque', 'modele', 'couleur', 'connectivite', 'micro', 'cancellationBruit', 'etat', 'prix'],
        conditional: {}
      },
      'chargeurs_cables': {
        baseFields: ['typeAccessoire', 'marque', 'modeleCompatible', 'typeConnecteur', 'longueur', 'puissance', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'supports_stabilisateurs': {
        baseFields: ['typeSupport', 'marque', 'modeleCompatible', 'materiau', 'ajustable', 'etat', 'prix'],
        conditional: {}
      },
      'manettes': {
        baseFields: ['typeManette', 'marque', 'modele', 'compatible', 'connectivite', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'vr': {
        baseFields: ['typeVR', 'marque', 'modele', 'compatible', 'resolution', 'champVision', 'etat', 'prix'],
        conditional: {}
      },
      'power_banks': {
        baseFields: ['marque', 'modele', 'capacite', 'nombrePorts', 'typeCharge', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'stylets': {
        baseFields: ['typeStylet', 'marque', 'modele', 'compatible', 'pression', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'cartes_memoire': {
        baseFields: ['typeCarte', 'marque', 'capacite', 'vitesse', 'classe', 'etat', 'prix'],
        conditional: {}
      },
      'accessoires': {
        baseFields: ['typeAccessoire', 'marque', 'modele', 'compatible', 'couleur', 'etat', 'prix'],
        conditional: {}
      },
      'pieces_rechange': {
        baseFields: ['typePiece', 'marque', 'modeleCompatible', 'etat', 'prix'],
        conditional: {}
      },
      'offres_abonnements': {
        baseFields: ['typeOffre', 'operateur', 'duree', 'dataIncluse', 'appelsInclus', 'smsInclus', 'prixMensuel', 'engagement', 'prix'],
        conditional: {}
      }
    },
  
  
    'services': {
      'construction_travaux': {
        baseFields: ['typeTravaux', 'experienceConstruction', 'referencesConstruction', 'zoneIntervention', 'prix'],
        conditional: {}
      },
      'ecoles_formations': {
        baseFields: ['typeFormation', 'domaineFormation', 'dureeFormation', 'diplomeDelivre', 'prix'],
        conditional: {}
      },
      'industrie_fabrication': {
        baseFields: ['typeServiceIndustrie', 'capaciteProduction', 'equipementsIndustrie', 'certificationsIndustrie', 'prix'],
        conditional: {}
      },
      'transport_demenagement': {
        baseFields: ['typeVehiculeTransport', 'capaciteTransport', 'zoneTransport', 'assuranceTransport', 'prix'],
        conditional: {}
      },
      'decoration_amenagement': {
        baseFields: ['typeServiceDecoration', 'styleDecoration', 'referencesDecoration', 'budgetDecoration', 'prix'],
        conditional: {}
      },
      'publicite_communication': {
        baseFields: ['typeServiceCommunication', 'supportCommunication', 'ciblesCommunication', 'campagnesRealisees', 'prix'],
        conditional: {}
      },
      'nettoyage_jardinage': {
        baseFields: ['typeServiceNettoyage', 'surfaceNettoyage', 'frequenceNettoyage', 'materielNettoyage', 'prix'],
        conditional: {}
      },
      'froid_climatisation': {
        baseFields: ['typeServiceFroid', 'marquesFroid', 'garantieFroid', 'urgenceFroid', 'prix'],
        conditional: {}
      },
      'traiteurs_gateaux': {
        baseFields: ['typeServiceTraiteur', 'specialiteTraiteur', 'capaciteTraiteur', 'menuTraiteur', 'prix'],
        conditional: {}
      },
      'medecine_sante': {
        baseFields: ['typeServiceSante', 'specialiteSante', 'qualificationsSante', 'consultationSante', 'prix'],
        conditional: {}
      },
      'reparation_auto_diagnostic': {
        baseFields: ['typeServiceAuto', 'marquesAuto', 'garantieAuto', 'diagnosticAuto', 'prix'],
        conditional: {}
      },
      'securite_alarme': {
        baseFields: ['typeServiceSecurite', 'systemesSecurite', 'certificationsSecurite', 'monitoringSecurite', 'prix'],
        conditional: {}
      },
      'projets_etudes': {
        baseFields: ['typeServiceProjet', 'domaineProjet', 'delaiProjet', 'livrablesProjet', 'prix'],
        conditional: {}
      },
      'bureautique_internet': {
        baseFields: ['typeServiceBureautique', 'logicielsBureautique', 'supportBureautique', 'reseauBureautique', 'prix'],
        conditional: {}
      },
      'location_vehicules': {
        baseFields: ['typeVehiculeLocation', 'modeleLocation', 'conditionsLocation', 'assuranceLocation', 'prix'],
        conditional: {}
      },
      'menuiserie_meubles': {
        baseFields: ['typeServiceMenuiserie', 'materiauxMenuiserie', 'realisationsMenuiserie', 'delaiMenuiserie', 'prix'],
        conditional: {}
      },
      'impression_edition': {
        baseFields: ['typeServiceImpression', 'equipementsImpression', 'formatsImpression', 'quantiteImpression', 'prix'],
        conditional: {}
      },
      'hotellerie_restauration_salles': {
        baseFields: ['typeServiceHotellerie', 'capaciteHotellerie', 'equipementsHotellerie', 'servicesHotellerie', 'prix'],
        conditional: {}
      },
      'image_son': {
        baseFields: ['typeServiceImage', 'equipementsImage', 'experienceImage', 'realisationsImage', 'prix'],
        conditional: {}
      },
      'comptabilite_economie': {
        baseFields: ['typeServiceComptabilite', 'specialiteComptabilite', 'logicielsComptabilite', 'clientsComptabilite', 'prix'],
        conditional: {}
      },
      'couture_confection': {
        baseFields: ['typeServiceCouture', 'specialiteCouture', 'realisationsCouture', 'delaiCouture', 'prix'],
        conditional: {}
      },
      'maintenance_informatique': {
        baseFields: ['typeServiceMaintenance', 'marquesMaintenance', 'diagnosticMaintenance', 'urgenceMaintenance', 'prix'],
        conditional: {}
      },
      'reparation_electromenager': {
        baseFields: ['typeServiceElectromenager', 'marquesElectromenager', 'garantieElectromenager', 'depannageElectromenager', 'prix'],
        conditional: {}
      },
      'evenements_divertissement': {
        baseFields: ['typeServiceEvenement', 'typeEvenement', 'equipementsEvenement', 'animationEvenement', 'prix'],
        conditional: {}
      },
      'paraboles_demos': {
        baseFields: ['typeServiceParabole', 'systemesParabole', 'installationParabole', 'maintenanceParabole', 'prix'],
        conditional: {}
      },
      'reparation_electronique': {
        baseFields: ['typeServiceElectronique', 'appareilsElectronique', 'garantieElectronique', 'diagnosticElectronique', 'prix'],
        conditional: {}
      },
      'services_etranger': {
        baseFields: ['typeServiceEtranger', 'paysService', 'languesService', 'delaiService', 'prix'],
        conditional: {}
      },
      'flashage_reparation_telephones': {
        baseFields: ['typeServiceFlashage', 'marquesFlashage', 'garantieFlashage', 'delaiFlashage', 'prix'],
        conditional: {}
      },
      'juridique': {
        baseFields: ['typeServiceJuridique', 'domaineJuridique', 'languesJuridique', 'honorairesJuridique', 'prix'],
        conditional: {}
      }
    },
    'emploi': {
      'offres_emploi': {
        baseFields: ['typeContrat', 'poste', 'secteurActivite', 'experienceRequise', 'niveauEtude', 'lieuTravail', 'salaire', 'missions', 'competencesRequises', 'contactRecruteur', 'prix'],
        conditional: {}
      },
      'demandes_emploi': {
        baseFields: ['posteRecherche', 'secteurRecherche', 'typeContratSouhaite', 'experienceProfessionnelle', 'niveauEtude', 'competences', 'disponibilite', 'pretentionsSalariales', 'contactCandidat', 'prix'],
        conditional: {}
      }
    },
  
  
    // En tu FieldConfig.js - AÑADE ESTO DESPUÉS DE 'emploi':
  
    // ============ PIÈCES DÉTACHÉES ============
    'pieces_detachees': {
      'pieces_automobiles': {
        baseFields: ['typePieceAuto', 'marqueCompatible', 'modeleCompatible', 'anneeCompatible', 'etatPiece', 'originePiece', 'garantiePiece', 'prix'],
        conditional: {}
      },
      'pieces_vehicules': {
        baseFields: ['typePieceVehicule', 'marqueCompatible', 'modeleCompatible', 'typeVehicule', 'etatPiece', 'garantiePiece', 'prix'],
        conditional: {}
      },
      'pieces_moto': {
        baseFields: ['typePieceMoto', 'marqueCompatible', 'modeleCompatible', 'cylindreeCompatible', 'etatPiece', 'garantiePiece', 'prix'],
        conditional: {}
      },
      'pieces_bateaux': {
        baseFields: ['typePieceBateau', 'marqueCompatible', 'modeleCompatible', 'longueurBateau', 'etatPiece', 'garantiePiece', 'prix'],
        conditional: {}
      },
      'alarme_securite': {
        baseFields: ['typeAlarme', 'marqueAlarme', 'fonctionsAlarme', 'compatibleAvec', 'etat', 'garantie', 'prix'],
        conditional: {}
      },
      'nettoyage_entretien': {
        baseFields: ['typeProduit', 'marqueProduit', 'application', 'contenance', 'etat', 'prix'],
        conditional: {}
      },
      'outils_diagnostics': {
        baseFields: ['typeOutil', 'marqueOutil', 'fonctionsOutil', 'compatibleAvec', 'etat', 'garantie', 'prix'],
        conditional: {}
      },
      'lubrifiants': {
        baseFields: ['typeLubrifiant', 'marqueLubrifiant', 'viscosite', 'contenance', 'application', 'etat', 'prix'],
        conditional: {}
      }
    },
  
    // ============ VOYAGES & TOURISME ============
   // ✅ SOLUCIÓN - FieldConfig.js CORREGIDO
  // En tu FieldConfig.js - COMPLETO PARA VOYAGES
  // FieldConfig.js - ACTUALIZADO para que coincida con los nombres REALES
  'voyages': {
    'voyage_organise': {
      baseFields: [
        'typeVoyage',
        'destination',          // ← Cambié: destinationType → destination
        'dureeVoyage',         // ← Agregué
        'dateDepart',          // ← Cambié: startDate → dateDepart
        'transportVoyage',     // ← Agregué
        'hebergementVoyage',   // ← Agregué
        'pricePerPerson',      // ← Mantengo (debería ser campo común)
        'contactPhone'         // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'location_vacances': {
      baseFields: [
        'typeHebergement',         // ← SÍ existe
        'capaciteHebergement',     // ← Cambié: capacity → capaciteHebergement
        'equipementsHebergement',  // ← Cambié: equipments → equipementsHebergement
        'localisationHebergement', // ← Cambié: wilayaLocation → localisationHebergement
        'periodeLocation',         // ← Cambié: startDateLocation/endDateLocation → periodeLocation
        'pricePerNight',           // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'hajj_omra': {
      baseFields: [
        'typeVoyageReligieux',     // ← SÍ existe
        'periodeVoyage',           // ← Cambié: hajjPeriod → periodeVoyage
        'servicesInclus',          // ← Cambié: servicesIncludedHajj → servicesInclus
        'guideReligieux',          // ← Agregué
        'logementProche',          // ← Agregué
        'pricePerPersonHajj',      // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'reservations_visa': {
      baseFields: [
        'typeServiceVisa',         // ← SÍ existe
        'paysVisa',                // ← Cambié: destinationCountry → paysVisa
        'typeVisa',                // ← Cambié: visaType → typeVisa
        'delaiVisa',               // ← Cambié: processingTime → delaiVisa
        'suiviDossier',            // ← Cambié: urgentService → suiviDossier
        'priceVisa',               // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'sejour': {
      baseFields: [
        'typeSejour',              // ← SÍ existe
        'dureeSejour',             // ← Cambié: durationSejour → dureeSejour
        'activitesSejour',         // ← Cambié: activities → activitesSejour
        'formuleSejour',           // ← Agregué
        'publicCible',             // ← Agregué
        'priceSejour',             // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'croisiere': {
      baseFields: [
        'compagnieCroisiere',      // ← Cambié: cruiseCompany → compagnieCroisiere
        'dureeCroisiere',          // ← Cambié: durationCruise → dureeCroisiere
        'escalesCroisiere',        // ← Cambié: destinationCruise → escalesCroisiere
        'typeCabine',              // ← Cambié: cabinType → typeCabine
        'priceCruise',             // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    },
    
    'autre': {
      baseFields: [
        'descriptionSpecifique',   // ← SÍ existe
        'serviceType',             // ← ¿Existe? NO en tu VoyagesFields actual
        'price',                   // ← Mantengo (debería ser campo común)
        'contactPhone'             // ← Mantengo (debería ser campo común)
      ],
      conditional: {}
    }
  }
  
  }
  // FieldConfig.js - AGREGAR ESTAS FUNCIONES AL FINAL
  
  export const getVisibleFields = (mainCategory, subCategory, articleType = '') => {
    // Tu código original de getVisibleFields aquí
    if (!mainCategory || !FieldConfig[mainCategory]) return [];
    
    const categoryConfig = FieldConfig[mainCategory];
    
    // Para immobilier, necesitamos articleType
    if (mainCategory === 'immobilier') {
      if (!articleType || !categoryConfig[articleType]) return [];
      return categoryConfig[articleType][subCategory] || [];
    }
    
    // Para otras categorías
    return categoryConfig[subCategory]?.baseFields || [];
  };
   export const FIELD_STEP_MAPPING = {
      // ============ PASO 2: DESCRIPCIÓN ============
      'description': [
        // Campos generales de descripción
        'title', 'description', 'descripcion', 'details',
        
        // Campos de identificación
        'marque', 'brand', 'modele', 'model', 'type', 'categorie_specifique',
        
        // Características físicas
        'taille', 'size', 'dimensions', 'longueur', 'largeur', 'hauteur',
        'capacite', 'capacity', 'volume', 'poids', 'weight',
        'couleur', 'color', 'materiau', 'material',
        
        // Específicos de vehículos
        'annee', 'year', 'kilometrage', 'mileage', 'carburant', 'fuel',
        'boiteVitesse', 'transmission', 'puissance', 'power', 'cylindree',
        
        // Específicos de inmuebles
        'superficie', 'area', 'nombrePieces', 'rooms', 'etage', 'floor',
        'jardin', 'garden', 'piscine', 'pool', 'garage',
        
        // Específicos de electrónica
        'tailleEcran', 'screenSize', 'resolution', 'ram', 'stockage', 'storage',
        'processeur', 'processor', 'batterie', 'battery',
        
        // Específicos de ropa
        'pointure', 'shoeSize', 'ageCible', 'targetAge',
        
        // Estado
        'etat', 'condition', 'etatPiece', 'etatEngin', 'etatAppareil'
      ],
      
      // ============ PASO 3: PRECIO ============
      'price': [
        // Todos los campos de precio
        'prix', 'price', 'loyer', 'rent', 'cout', 'cost',
        'pricePerPerson', 'pricePerNight', 'salaire', 'salary',
        'budgetMax', 'maxBudget', 'caution', 'deposit',
        
        // Negociación y condiciones
        'negociable', 'negotiable', 'echange', 'exchange',
        'conditionsPaiement', 'paymentTerms'
      ],
      
      // ============ PASO 4: CONTACTO ============
      'contact': [
        // Campos de localización
        'wilaya', 'commune', 'ville', 'city', 'adresse', 'address',
        'zone', 'region', 'localisation',
        
        // Campos de contacto
        'telefono', 'phone', 'numeroTelephone', 'contactPhone',
        'email', 'contactEmail', 'whatsapp',
        
        // Información del vendedor/usuario
        'nomVendeur', 'sellerName', 'contactPerson'
      ]
    };
    
    /**
     * 🔥 FUNCIÓN PRINCIPAL: Obtener campos por paso
     * @param {Array} allFields - Todos los campos de FieldConfig
     * @param {String} step - 'description', 'price', o 'contact'
     * @returns {Array} - Campos filtrados para ese paso
     */
    export const getFieldsForStep = (allFields, step) => {
      if (!allFields || !Array.isArray(allFields)) return [];
      
      const stepKeywords = FIELD_STEP_MAPPING[step] || [];
      
      return allFields.filter(field => {
        // Buscar coincidencia con palabras clave del paso
        const fieldLower = field.toLowerCase();
        return stepKeywords.some(keyword => 
          fieldLower.includes(keyword.toLowerCase()) ||
          keyword.toLowerCase().includes(fieldLower)
        );
      });
    };
    
    /**
     * 🔥 FUNCIÓN: Dividir todos los campos en 3 grupos (descripción, precio, contacto)
     * @param {Array} allFields - Todos los campos de FieldConfig
     * @returns {Object} - Campos organizados por paso
     */
    export const organizeFieldsBySteps = (allFields) => {
      if (!allFields || !Array.isArray(allFields)) {
        return { description: [], price: [], contact: [] };
      }
      
      const descriptionFields = getFieldsForStep(allFields, 'description');
      const priceFields = getFieldsForStep(allFields, 'price');
      const contactFields = getFieldsForStep(allFields, 'contact');
      
      // Campos que no coinciden con ningún paso (por defecto a descripción)
      const remainingFields = allFields.filter(field => 
        !descriptionFields.includes(field) &&
        !priceFields.includes(field) &&
        !contactFields.includes(field)
      );
      
      return {
        description: [...descriptionFields, ...remainingFields],
        price: priceFields,
        contact: contactFields
      };
    };
    
    /**
     * 🔥 FUNCIÓN: Validar campos OBLIGATORIOS por paso
     * @param {Object} postData - Datos del formulario
     * @param {Array} stepFields - Campos requeridos para el paso
     * @param {String} stepName - Nombre del paso para mensajes de error
     * @returns {Object} - { isValid: boolean, missingFields: Array, message: string }
     */
    export const validateStepFields = (postData, stepFields, stepName) => {
      if (!stepFields || stepFields.length === 0) {
        return { isValid: true, missingFields: [], message: '' };
      }
      
      const missingFields = [];
      
      stepFields.forEach(field => {
        const value = postData[field];
        if (value === undefined || value === null || value === '' || 
            (Array.isArray(value) && value.length === 0)) {
          missingFields.push(field);
        }
      });
      
      const isValid = missingFields.length === 0;
      
      let message = '';
      if (!isValid) {
        const stepNames = {
          'description': 'Descripción',
          'price': 'Precio',
          'contact': 'Contacto'
        };
        
        message = `Completa los campos de ${stepNames[stepName] || stepName}: ${missingFields.join(', ')}`;
      }
      
      return { isValid, missingFields, message };
    };
    
    /**
     * 🔥 FUNCIÓN: Generar configuración completa para MultiStepFormManager
     * @param {String} mainCategory - Categoría principal
     * @param {String} subCategory - Subcategoría
     * @param {String} articleType - Tipo de artículo (solo para immobilier)
     * @returns {Object} - Configuración completa para los 5 pasos
     */
    export const getCompleteStepConfig = (mainCategory, subCategory, articleType) => {
      // Importar dinámicamente tu FieldConfig existente
      const { getVisibleFields } = require('./FieldConfig');
      
      // 1. Obtener TODOS los campos de FieldConfig
      const allFields = getVisibleFields(mainCategory, subCategory, articleType);
      
      // 2. Organizar en pasos 2, 3 y 4
      const { description, price, contact } = organizeFieldsBySteps(allFields);
      
      // 3. Configuración final
      return {
        // Paso 1: Solo categoría (siempre igual)
        step1: {
          name: 'categorias',
          description: 'Selecciona categoría y subcategoría',
          fields: [], // No hay campos específicos
          validators: [
            (formData) => formData.categorie && formData.subCategory,
            (formData) => {
              if (formData.categorie === 'immobilier') {
                return !!formData.articleType;
              }
              return true;
            }
          ]
        },
        
        // Paso 2: Campos de descripción
        step2: {
          name: 'descripcion',
          description: 'Información del producto/servicio',
          fields: description,
          validators: [
            (postData) => validateStepFields(postData, ['title', 'description'], 'description').isValid
          ]
        },
        
        // Paso 3: Campos de precio
        step3: {
          name: 'precio',
          description: 'Precio y condiciones',
          fields: price,
          validators: [
            (postData) => validateStepFields(postData, ['prix', 'price', 'loyer'], 'price').isValid
          ]
        },
        
        // Paso 4: Campos de contacto
        step4: {
          name: 'contacto',
          description: 'Ubicación y contacto',
          fields: contact,
          validators: [
            (formData) => formData.wilaya && formData.commune && formData.telefono
          ]
        },
        
        // Paso 5: Imágenes (siempre igual)
        step5: {
          name: 'imagenes',
          description: 'Imágenes del producto',
          fields: [], // No hay campos, solo imágenes
          validators: [
            (images) => images.length >= 1 && images.length <= 10
          ]
        }
      };
    };
    
    // 🔥 Exportar todo
 