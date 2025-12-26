// storeConstants.js - Archivo completo corregido

// Tipos de acción para el store
export const STORE_TYPES = {
  CREATE_STORE: 'CREATE_STORE',
  GET_STORES: 'GET_STORES',
  GET_STORE: 'GET_STORE',
  UPDATE_STORE: 'UPDATE_STORE',
  DELETE_STORE: 'DELETE_STORE',
  CHANGE_PLAN: 'CHANGE_PLAN',
  LOADING_STORE: 'LOADING_STORE',
  ERROR_STORE: 'ERROR_STORE',
}

// Constantes individuales (para compatibilidad)
export const STORE_CREATE_REQUEST = 'STORE_CREATE_REQUEST'
export const STORE_CREATE_SUCCESS = 'STORE_CREATE_SUCCESS'
export const STORE_CREATE_FAIL = 'STORE_CREATE_FAIL'
export const STORE_CREATE_RESET = 'STORE_CREATE_RESET'

export const STORE_GET_REQUEST = 'STORE_GET_REQUEST'
export const STORE_GET_SUCCESS = 'STORE_GET_SUCCESS'
export const STORE_GET_FAIL = 'STORE_GET_FAIL'

export const STORE_UPDATE_REQUEST = 'STORE_UPDATE_REQUEST'
export const STORE_UPDATE_SUCCESS = 'STORE_UPDATE_SUCCESS'
export const STORE_UPDATE_FAIL = 'STORE_UPDATE_FAIL'
export const STORE_UPDATE_RESET = 'STORE_UPDATE_RESET'

// Para planes de tienda
export const STORE_PLANS = {
  BASIC_50: {
    id: 'basic_50',
    name: 'Store Basic 50',
    credits: 50,
    storage: 100,
    price: 50,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Free'
  },
  BASIC_100: {
    id: 'basic_100',
    name: 'Store Basic 100',
    credits: 100,
    storage: 200,
    price: 100,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Free'
  },
  BASIC_150: {
    id: 'basic_150',
    name: 'Store Basic 150',
    credits: 150,
    storage: 300,
    price: 150,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Free'
  },
  SILVER_200: {
    id: 'silver_200',
    name: 'Store Silver 200',
    credits: 200,
    storage: 400,
    price: 200,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Pro'
  },
  SILVER_300: {
    id: 'silver_300',
    name: 'Store Silver 300',
    credits: 300,
    storage: 600,
    price: 300,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Pro'
  },
  SILVER_500: {
    id: 'silver_500',
    name: 'Store Silver 500',
    credits: 500,
    storage: 1000,
    price: 500,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Pro'
  },
  SILVER_750: {
    id: 'silver_750',
    name: 'Store Silver 750',
    credits: 750,
    storage: 1500,
    price: 750,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Pro'
  },
  GOLD_1000: {
    id: 'gold_1000',
    name: 'Store Gold 1000',
    credits: 1000,
    storage: 2000,
    price: 1000,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Premium'
  },
  GOLD_1500: {
    id: 'gold_1500',
    name: 'Store Gold 1500',
    credits: 1500,
    storage: 3000,
    price: 1500,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Premium'
  },
  GOLD_2000: {
    id: 'gold_2000',
    name: 'Store Gold 2000',
    credits: 2000,
    storage: 4000,
    price: 2000,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Premium'
  },
  GOLD_3000: {
    id: 'gold_3000',
    name: 'Store Gold 3000',
    credits: 3000,
    storage: 4000,
    price: 3000,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Premium'
  },
  GOLD_6000: {
    id: 'gold_6000',
    name: 'Store Gold 6000',
    credits: 6000,
    storage: 12000,
    price: 6000,
    features: ['Site Builder', 'Nom de domaine', 'Store à la une Listing'],
    type: 'Premium'
  }
}

export const DURATION_OPTIONS = [
  { value: 1, label: '1 Mois' },
  { value: 2, label: '2 Mois' },
  { value: 3, label: '3 Mois' },
  { value: 4, label: '4 Mois' },
  { value: 5, label: '5 Mois' },
  { value: 6, label: '6 Mois' },
  { value: 7, label: '7 Mois' },
  { value: 8, label: '8 Mois' },
  { value: 9, label: '9 Mois' },
  { value: 10, label: '10 Mois' },
  { value: 11, label: '11 Mois' },
  { value: 12, label: '12 Mois' }
]

export const CATEGORIES = [
  'Automobiles & Véhicules',
  'Informatique',
  'Meubles & Maison',
  'Matériaux & Equipement',
  'Téléphonie & Accessoires',
  'Pièces détachées',
  'Electroménager & Electronique',
  'Vêtements & Mode',
  'Santé & Beauté',
  'Loisirs & Divertissements',
  "Offres & Demandes d'emploi",
  'Immobilier',
  'Services',
  'Voyages',
  'Alimentaire',
  'Sport'
]