import React, { useState, useEffect } from 'react';
import { Form,  Badge  } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
 
 

const Subcategories = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation('subcategories');
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('operation');
 
  // Determinar qué subcatégories mostrar según la catégorie principale
  const mainCategory = postData.categorie;

  useEffect(() => {
    // Resetear subcategorías al cambiar la categoría principal
    handleChangeInput({
      target: {
        name: 'subCategory',
        value: ''
      }
    });
    handleChangeInput({
      target: {
        name: 'articleType',
        value: ''
      }
    });
    setActiveTab('operation');
     
  }, [mainCategory]);

  // emojes
  const immobilierOperations = [
    { id: 'vente', name: t('immobilier.operation.vente'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>💰</span>, tip: t('tips.vente'), color: 'success' },
    { id: 'location', name: t('immobilier.operation.location'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🏠</span>, tip: t('tips.location'), color: 'primary' },
    { id: 'location_vacances', name: t('immobilier.operation.location_vacances'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🏖️</span>, tip: t('tips.location_vacances'), color: 'warning' },
    { id: 'cherche_location', name: t('immobilier.operation.cherche_location'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🔍</span>, tip: t('tips.cherche_location'), color: 'info' },
    { id: 'cherche_achat', name: t('immobilier.operation.cherche_achat'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🔎</span>, tip: t('tips.cherche_achat'), color: 'secondary' }
  ];
//ejmoes
  const immobilierProperties = [
    { id: 'appartements', name: t('immobilier.property.appartement'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🏢</span>, tip: t('tips.appartement'), color: 'primary' },
    { id: 'local', name: t('immobilier.property.local'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🏪</span>, tip: t('tips.local'), color: 'secondary' },
    { id: 'villa', name: t('immobilier.property.villa'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🏡</span>, tip: t('tips.villa'), color: 'success' },
    { id: 'terrain', name: t('immobilier.property.terrain'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>📐</span>, tip: t('tips.terrain'), color: 'warning' },
    { id: 'terrain_agricole', name: t('immobilier.property.terrain_agricole'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>🌾</span>, tip: t('tips.terrain_agricole'), color: 'dark' },
    { id: 'immeuble', name: t('immobilier.property.immeuble'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🏬</span>, tip: t('tips.immeuble'), color: 'info' },
    { id: 'bungalow', name: t('immobilier.property.bungalow'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🏕️</span>, tip: t('tips.bungalow'), color: 'danger' }
  ];
 
  // En tu archivo SubCategories.js - AÑADE ESTO:

 
 // IMPJES
 const vehiculesCategories = [
  { id: 'voitures', name: t('vehicules.categories.voitures'), icon: <span style={{ fontSize: '24px' }}>🚗</span>, color: 'primary' },
  { id: 'utilitaires', name: t('vehicules.categories.utilitaire'), icon: <span style={{ fontSize: '24px' }}>🚐</span>, color: 'secondary' },
  { id: 'motos', name: t('vehicules.categories.motos'), icon: <span style={{ fontSize: '24px' }}>🏍️</span>, color: 'success' },
  { id: 'quads', name: t('vehicules.categories.quads'), icon: <span style={{ fontSize: '24px' }}>🛵</span>, color: 'warning' },
  { id: 'fourgons', name: t('vehicules.categories.fourgon'), icon: <span style={{ fontSize: '24px' }}>🚚</span>, color: 'info' },
  { id: 'camions', name: t('vehicules.categories.camion'), icon: <span style={{ fontSize: '24px' }}>🚛</span>, color: 'dark' },
  { id: 'bus', name: t('vehicules.categories.bus'), icon: <span style={{ fontSize: '24px' }}>🚌</span>, color: 'danger' },
  { id: 'engins', name: t('vehicules.categories.engin'), icon: <span style={{ fontSize: '24px' }}>⚙️</span>, color: 'primary' },
  { id: 'tracteurs', name: t('vehicules.categories.tracteurs'), icon: <span style={{ fontSize: '24px' }}>🚜</span>, color: 'success' },
  { id: 'remorques', name: t('vehicules.categories.remorques'), icon: <span style={{ fontSize: '24px' }}>🚛</span>, color: 'secondary' },
  { id: 'bateaux', name: t('vehicules.categories.bateaux'), icon: <span style={{ fontSize: '24px' }}>🚤</span>, color: 'info' }
];

  // emojess
  const vetementsCategories = [
    { id: 'vetements_homme', name: t('vetements.categories.vetements_homme'), icon: '👔', color: 'primary' },
    { id: 'vetements_femme', name: t('vetements.categories.vetements_femme'), icon: '👗', color: 'danger' },
    { id: 'chaussures_homme', name: t('vetements.categories.chaussures_homme'), icon: '👞', color: 'secondary' },
    { id: 'chaussures_femme', name: t('vetements.categories.chaussures_femme'), icon: '👠', color: 'warning' },
    { id: 'garcons', name: t('vetements.categories.garcons'), icon: '👦', color: 'info' },
    { id: 'filles', name: t('vetements.categories.filles'), icon: '👧', color: 'danger' },
    { id: 'bebe', name: t('vetements.categories.bebe'), icon: '👶', color: 'success' },
    { id: 'tenues_pro', name: t('vetements.categories.tenues_pro'), icon: '👔', color: 'dark' },
    { id: 'sacs', name: t('vetements.categories.sacs'), icon: '👜', color: 'warning' },
    { id: 'montres', name: t('vetements.categories.montres'), icon: '⌚', color: 'secondary' },
    { id: 'lunettes', name: t('vetements.categories.lunettes'), icon: '👓', color: 'info' },
    { id: 'bijoux', name: t('vetements.categories.bijoux'), icon: '💎', color: 'primary' }
];
  // emojess
  const telephonesCategories = [
    { id: 'smartphones', name: t('telephones.categories.smartphones'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>📱</span>, color: 'primary', emoji: '📱' },
    { id: 'telephones_cellulaires', name: t('telephones.categories.telephones_cellulaires'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📞</span>, color: 'secondary', emoji: '📞' },
    { id: 'tablettes', name: t('telephones.categories.tablettes'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>📟</span>, color: 'success', emoji: '📟' },
    { id: 'fixes_fax', name: t('telephones.categories.fixes_fax'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>☎️</span>, color: 'warning', emoji: '☎️' },
    { id: 'smartwatchs', name: t('telephones.categories.smartwatchs'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>⌚</span>, color: 'info', emoji: '⌚' },
    { id: 'protection_antichoc', name: t('telephones.categories.protection_antichoc'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>🛡️</span>, color: 'dark', emoji: '🛡️' },
    { id: 'ecouteurs_son', name: t('telephones.categories.ecouteurs_son'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🎧</span>, color: 'primary', emoji: '🎧' },
    { id: 'chargeurs_cables', name: t('telephones.categories.chargeurs_cables'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>⚡</span>, color: 'warning', emoji: '⚡' },
    { id: 'supports_stabilisateurs', name: t('telephones.categories.supports_stabilisateurs'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📐</span>, color: 'secondary', emoji: '📐' },
    { id: 'manettes', name: t('telephones.categories.manettes'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🎮</span>, color: 'danger', emoji: '🎮' },
    { id: 'vr', name: t('telephones.categories.vr'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🥽</span>, color: 'info', emoji: '🥽' },
    { id: 'power_banks', name: t('telephones.categories.power_banks'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🔋</span>, color: 'success', emoji: '🔋' },
    { id: 'stylets', name: t('telephones.categories.stylets'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>✏️</span>, color: 'dark', emoji: '✏️' },
    { id: 'cartes_memoire', name: t('telephones.categories.cartes_memoire'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>💾</span>, color: 'primary', emoji: '💾' },
    { id: 'accessoires', name: t('telephones.categories.accessoires'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🎁</span>, color: 'secondary', emoji: '🎁' },
    { id: 'pieces_rechange', name: t('telephones.categories.pieces_rechange'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🔧</span>, color: 'warning', emoji: '🔧' },
    { id: 'offres_abonnements', name: t('telephones.categories.offres_abonnements'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📅</span>, color: 'info', emoji: '📅' }
  ];

  // imojess
  const informatiqueCategories = [
    { id: 'ordinateurs_portables', name: t('informatique.categories.ordinateurs_portables'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>💻</span>, color: 'primary', emoji: '💻' },
    { id: 'ordinateurs_bureau', name: t('informatique.categories.ordinateurs_bureau'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🖥️</span>, color: 'secondary', emoji: '🖥️' },
    { id: 'serveurs', name: t('informatique.categories.serveurs'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>🗄️</span>, color: 'dark', emoji: '🗄️' },
    { id: 'ecrans', name: t('informatique.categories.ecrans'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🖥️</span>, color: 'info', emoji: '🖥️' },
    { id: 'composants_pc_fixe', name: t('informatique.categories.composants_pc_fixe'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>⚙️</span>, color: 'warning', emoji: '⚙️' },
    { id: 'composants_pc_portable', name: t('informatique.categories.composants_pc_portable'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>💻</span>, color: 'success', emoji: '💻' },
    { id: 'composants_serveur', name: t('informatique.categories.composants_serveur'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>💽</span>, color: 'danger', emoji: '💽' },
    { id: 'imprimantes_cartouches', name: t('informatique.categories.imprimantes_cartouches'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🖨️</span>, color: 'primary', emoji: '🖨️' },
    { id: 'reseau_connexion', name: t('informatique.categories.reseau_connexion'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📡</span>, color: 'info', emoji: '📡' },
    { id: 'stockage_externe_racks', name: t('informatique.categories.stockage_externe_racks'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>💾</span>, color: 'secondary', emoji: '💾' },
    { id: 'onduleurs_stabilisateurs', name: t('informatique.categories.onduleurs_stabilisateurs'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🔌</span>, color: 'warning', emoji: '🔌' },
    { id: 'compteuses_billets', name: t('informatique.categories.compteuses_billets'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>💰</span>, color: 'success', emoji: '💰' },
    { id: 'claviers_souris', name: t('informatique.categories.claviers_souris'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>⌨️</span>, color: 'dark', emoji: '⌨️' },
    { id: 'casques_son', name: t('informatique.categories.casques_son'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🎧</span>, color: 'primary', emoji: '🎧' },
    { id: 'webcam_videoconference', name: t('informatique.categories.webcam_videoconference'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📹</span>, color: 'info', emoji: '📹' },
    { id: 'data_shows', name: t('informatique.categories.data_shows'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📽️</span>, color: 'secondary', emoji: '📽️' },
    { id: 'cables_adaptateurs', name: t('informatique.categories.cables_adaptateurs'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🔌</span>, color: 'warning', emoji: '🔌' },
    { id: 'stylets_tablettes', name: t('informatique.categories.stylets_tablettes'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>✏️</span>, color: 'success', emoji: '✏️' },
    { id: 'cartables_sacoches', name: t('informatique.categories.cartables_sacoches'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>💼</span>, color: 'primary', emoji: '💼' },
    { id: 'manettes_simulateurs', name: t('informatique.categories.manettes_simulateurs'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🎮</span>, color: 'danger', emoji: '🎮' },
    { id: 'vr', name: t('informatique.categories.vr'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🥽</span>, color: 'info', emoji: '🥽' }
  ];

  // emojess
  const electromenagerCategories = [
    { id: 'televiseurs', name: t('electromenager.categories.televiseurs'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>📺</span>, color: 'primary', emoji: '📺' },
    { id: 'demodulateurs_box_tv', name: t('electromenager.categories.demodulateurs_box_tv'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📦</span>, color: 'secondary', emoji: '📦' },
    { id: 'paraboles_switch_tv', name: t('electromenager.categories.paraboles_switch_tv'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🛰️</span>, color: 'success', emoji: '🛰️' },
    { id: 'abonnements_iptv', name: t('electromenager.categories.abonnements_iptv'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📅</span>, color: 'info', emoji: '📅' },
    { id: 'cameras_accessories', name: t('electromenager.categories.cameras_accessories'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>📷</span>, color: 'warning', emoji: '📷' },
    { id: 'audio', name: t('electromenager.categories.audio'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🔊</span>, color: 'danger', emoji: '🔊' },
    { id: 'refrigerateurs_congelateurs', name: t('electromenager.categories.refrigerateurs_congelateurs'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>❄️</span>, color: 'primary', emoji: '❄️' },
    { id: 'machines_laver', name: t('electromenager.categories.machines_laver'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🧼</span>, color: 'info', emoji: '🧼' },
    { id: 'lave_vaisselles', name: t('electromenager.categories.lave_vaisselles'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🍽️</span>, color: 'secondary', emoji: '🍽️' },
    { id: 'fours_cuisson', name: t('electromenager.categories.fours_cuisson'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🔥</span>, color: 'warning', emoji: '🔥' },
    { id: 'chauffage_climatisation', name: t('electromenager.categories.chauffage_climatisation'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🌡️</span>, color: 'success', emoji: '🌡️' },
    { id: 'appareils_cuisine', name: t('electromenager.categories.appareils_cuisine'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🍳</span>, color: 'danger', emoji: '🍳' },
    { id: 'aspirateurs_nettoyeurs', name: t('electromenager.categories.aspirateurs_nettoyeurs'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🧹</span>, color: 'primary', emoji: '🧹' },
    { id: 'repassage', name: t('electromenager.categories.repassage'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>♨️</span>, color: 'warning', emoji: '♨️' },
    { id: 'beaute_hygiene', name: t('electromenager.categories.beaute_hygiene'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>💄</span>, color: 'info', emoji: '💄' },
    { id: 'machines_coudre', name: t('electromenager.categories.machines_coudre'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🧵</span>, color: 'secondary', emoji: '🧵' },
    { id: 'telecommandes', name: t('electromenager.categories.telecommandes'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>📱</span>, color: 'dark', emoji: '📱' },
    { id: 'securite_gps', name: t('electromenager.categories.securite_gps'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🔒</span>, color: 'primary', emoji: '🔒' },
    { id: 'composants_electroniques', name: t('electromenager.categories.composants_electroniques'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🔌</span>, color: 'warning', emoji: '🔌' },
    { id: 'pieces_rechange', name: t('electromenager.categories.pieces_rechange'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🔧</span>, color: 'secondary', emoji: '🔧' },
    { id: 'autre', name: t('electromenager.categories.autre'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>❓</span>, color: 'info', emoji: '❓' }
  ];

// En tu archivo SubCategories.js - AÑADE ESTO:

const piecesDetacheesCategories = [
  { id: 'pieces_automobiles', name: t('pieces_detachees.categories.pieces_automobiles'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🚗</span>, color: 'primary', emoji: '🚗' },
  { id: 'pieces_vehicules', name: t('pieces_detachees.categories.pieces_vehicules'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🚚</span>, color: 'secondary', emoji: '🚚' },
  { id: 'pieces_moto', name: t('pieces_detachees.categories.pieces_moto'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🏍️</span>, color: 'danger', emoji: '🏍️' },
  { id: 'pieces_bateaux', name: t('pieces_detachees.categories.pieces_bateaux'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🛥️</span>, color: 'info', emoji: '🛥️' },
  { id: 'alarme_securite', name: t('pieces_detachees.categories.alarme_securite'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🚨</span>, color: 'warning', emoji: '🚨' },
  { id: 'nettoyage_entretien', name: t('pieces_detachees.categories.nettoyage_entretien'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🧼</span>, color: 'success', emoji: '🧼' },
  { id: 'outils_diagnostics', name: t('pieces_detachees.categories.outils_diagnostics'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>🔧</span>, color: 'dark', emoji: '🔧' },
  { id: 'lubrifiants', name: t('pieces_detachees.categories.lubrifiants'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🛢️</span>, color: 'primary', emoji: '🛢️' }
];


// imojes
const santeBeauteCategories = [
  { id: 'cosmetiques_beaute', name: t('sante_beaute.categories.cosmetiques_beaute'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>💄</span>, color: 'pink', emoji: '💄' },
  { id: 'parfums_deodorants_femme', name: t('sante_beaute.categories.parfums_deodorants_femme'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🌸</span>, color: 'danger', emoji: '🌸' },
  { id: 'parfums_deodorants_homme', name: t('sante_beaute.categories.parfums_deodorants_homme'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🌿</span>, color: 'primary', emoji: '🌿' },
  { id: 'parapharmacie_sante', name: t('sante_beaute.categories.parapharmacie_sante'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>💊</span>, color: 'success', emoji: '💊' }
];

// IMOJESS
const meublesCategories = [
  { id: 'meubles_maison', name: t('meubles.categories.meubles_maison'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🛋️</span>, color: 'primary', emoji: '🛋️' },
  { id: 'decoration', name: t('meubles.categories.decoration'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🎨</span>, color: 'warning', emoji: '🎨' },
  { id: 'vaisselle', name: t('meubles.categories.vaisselle'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🍽️</span>, color: 'info', emoji: '🍽️' },
  { id: 'meubles_bureau', name: t('meubles.categories.meubles_bureau'), icon: <span style={{ fontSize: '24px', color: '#343a40' }}>💼</span>, color: 'dark', emoji: '💼' },
  { id: 'rideaux', name: t('meubles.categories.rideaux'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🪟</span>, color: 'success', emoji: '🪟' },
  { id: 'literie_linge', name: t('meubles.categories.literie_linge'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🛏️</span>, color: 'secondary', emoji: '🛏️' },
  { id: 'puericulture', name: t('meubles.categories.puericulture'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>👶</span>, color: 'pink', emoji: '👶' },
  { id: 'tapis_moquettes', name: t('meubles.categories.tapis_moquettes'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>🧶</span>, color: 'brown', emoji: '🧶' },
  { id: 'meubles_exterieur', name: t('meubles.categories.meubles_exterieur'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🌳</span>, color: 'success', emoji: '🌳' },
  { id: 'fournitures_scolaires', name: t('meubles.categories.fournitures_scolaires'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📚</span>, color: 'info', emoji: '📚' },
  { id: 'luminaire', name: t('meubles.categories.luminaire'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>💡</span>, color: 'warning', emoji: '💡' },
  { id: 'autre', name: t('meubles.categories.autre'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📦</span>, color: 'secondary', emoji: '📦' }
];

// EMOJES
const loisirsCategories = [
  { id: 'animalerie', name: t('loisirs.categories.animalerie'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🐾</span>, color: 'success', emoji: '🐾' },
  { id: 'consoles_jeux_videos', name: t('loisirs.categories.consoles_jeux_videos'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🎮</span>, color: 'primary', emoji: '🎮' },
  { id: 'livres_magazines', name: t('loisirs.categories.livres_magazines'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>📚</span>, color: 'info', emoji: '📚' },
  { id: 'instruments_musique', name: t('loisirs.categories.instruments_musique'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🎸</span>, color: 'warning', emoji: '🎸' },
  { id: 'jeux_loisirs', name: t('loisirs.categories.jeux_loisirs'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🎲</span>, color: 'danger', emoji: '🎲' },
  { id: 'jouets', name: t('loisirs.categories.jouets'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>🧸</span>, color: 'pink', emoji: '🧸' },
  { id: 'chasse_peche', name: t('loisirs.categories.chasse_peche'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🎣</span>, color: 'success', emoji: '🎣' },
  { id: 'jardinage', name: t('loisirs.categories.jardinage'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🌻</span>, color: 'green', emoji: '🌻' },
  { id: 'antiquites_collections', name: t('loisirs.categories.antiquites_collections'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>🏺</span>, color: 'brown', emoji: '🏺' },
  { id: 'barbecue_grillades', name: t('loisirs.categories.barbecue_grillades'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🍖</span>, color: 'danger', emoji: '🍖' },
  { id: 'vapes_chichas', name: t('loisirs.categories.vapes_chichas'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>💨</span>, color: 'secondary', emoji: '💨' },
  { id: 'produits_accesoires_ete', name: t('loisirs.categories.produits_accesoires_ete'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🏖️</span>, color: 'warning', emoji: '🏖️' },
  { id: 'autre', name: t('loisirs.categories.autre'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🎭</span>, color: 'secondary', emoji: '🎭' }
];
 

// imojes
const sportCategories = [
  { id: 'football', name: t('sport.categories.football'), icon: <span style={{ fontSize: '24px' }}>⚽</span>, color: 'success', emoji: '⚽' },
  { id: 'hand_voley_basket', name: t('sport.categories.hand_voley_basket'), icon: <span style={{ fontSize: '24px' }}>🏀</span>, color: 'primary', emoji: '🏀' },
  { id: 'sport_combat', name: t('sport.categories.sport_combat'), icon: <span style={{ fontSize: '24px' }}>🥊</span>, color: 'danger', emoji: '🥊' },
  { id: 'fitness_musculation', name: t('sport.categories.fitness_musculation'), icon: <span style={{ fontSize: '24px' }}>💪</span>, color: 'warning', emoji: '💪' },
  { id: 'natation', name: t('sport.categories.natation'), icon: <span style={{ fontSize: '24px' }}>🏊</span>, color: 'info', emoji: '🏊' },
  { id: 'velos_trotinettes', name: t('sport.categories.velos_trotinettes'), icon: <span style={{ fontSize: '24px' }}>🚲</span>, color: 'secondary', emoji: '🚲' },
  { id: 'sports_raquette', name: t('sport.categories.sports_raquette'), icon: <span style={{ fontSize: '24px' }}>🎾</span>, color: 'success', emoji: '🎾' },
  { id: 'sport_aquatiques', name: t('sport.categories.sport_aquatiques'), icon: <span style={{ fontSize: '24px' }}>🚤</span>, color: 'info', emoji: '🚤' }
];

// Emojzesss 
const alimentairesCategories = [
  { id: 'produits_laitiers', name: t('alimentaires.categories.produits_laitiers'), icon: <span style={{ fontSize: '24px', color: '#f8f9fa' }}>🥛</span>, color: 'light', emoji: '🥛' },
  { id: 'fruits_secs', name: t('alimentaires.categories.fruits_secs'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>🥜</span>, color: 'brown', emoji: '🥜' },
  { id: 'graines_riz_cereales', name: t('alimentaires.categories.graines_riz_cereales'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🌾</span>, color: 'warning', emoji: '🌾' },
  { id: 'sucres_produits_sucres', name: t('alimentaires.categories.sucres_produits_sucres'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>🍬</span>, color: 'pink', emoji: '🍬' },
  { id: 'boissons', name: t('alimentaires.categories.boissons'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🥤</span>, color: 'info', emoji: '🥤' },
  { id: 'viandes_poissons', name: t('alimentaires.categories.viandes_poissons'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🍖</span>, color: 'danger', emoji: '🍖' },
  { id: 'cafe_the_infusion', name: t('alimentaires.categories.cafe_the_infusion'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>☕</span>, color: 'brown', emoji: '☕' },
  { id: 'complements_alimentaires', name: t('alimentaires.categories.complements_alimentaires'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>💊</span>, color: 'success', emoji: '💊' },
  { id: 'miel_derives', name: t('alimentaires.categories.miel_derives'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🍯</span>, color: 'warning', emoji: '🍯' },
  { id: 'fruits_legumes', name: t('alimentaires.categories.fruits_legumes'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🍎</span>, color: 'success', emoji: '🍎' },
  { id: 'ble_farine', name: t('alimentaires.categories.ble_farine'), icon: <span style={{ fontSize: '24px', color: '#f8f9fa' }}>🌾</span>, color: 'light', emoji: '🌾' },
  { id: 'bonbons_chocolat', name: t('alimentaires.categories.bonbons_chocolat'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>🍫</span>, color: 'brown', emoji: '🍫' },
  { id: 'boulangerie_viennoiserie', name: t('alimentaires.categories.boulangerie_viennoiserie'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🥐</span>, color: 'warning', emoji: '🥐' },
  { id: 'ingredients_cuisine_patisserie', name: t('alimentaires.categories.ingredients_cuisine_patisserie'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🧂</span>, color: 'secondary', emoji: '🧂' },
  { id: 'noix_graines', name: t('alimentaires.categories.noix_graines'), icon: <span style={{ fontSize: '24px', color: '#795548' }}>🌰</span>, color: 'brown', emoji: '🌰' },
  { id: 'plats_cuisines', name: t('alimentaires.categories.plats_cuisines'), icon: <span style={{ fontSize: '24px', color: '#dc3545' }}>🍲</span>, color: 'danger', emoji: '🍲' },
  { id: 'sauces_epices_condiments', name: t('alimentaires.categories.sauces_epices_condiments'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🌶️</span>, color: 'warning', emoji: '🌶️' },
  { id: 'oeufs', name: t('alimentaires.categories.oeufs'), icon: <span style={{ fontSize: '24px', color: '#f8f9fa' }}>🥚</span>, color: 'light', emoji: '🥚' },
  { id: 'huiles', name: t('alimentaires.categories.huiles'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🫒</span>, color: 'warning', emoji: '🫒' },
  { id: 'pates', name: t('alimentaires.categories.pates'), icon: <span style={{ fontSize: '24px', color: '#f8f9fa' }}>🍝</span>, color: 'light', emoji: '🍝' },
  { id: 'gateaux', name: t('alimentaires.categories.gateaux'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>🎂</span>, color: 'pink', emoji: '🎂' },
  { id: 'emballage', name: t('alimentaires.categories.emballage'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📦</span>, color: 'secondary', emoji: '📦' },
  { id: 'aliments_bebe', name: t('alimentaires.categories.aliments_bebe'), icon: <span style={{ fontSize: '24px', color: '#e83e8c' }}>👶</span>, color: 'pink', emoji: '👶' },
  { id: 'aliments_dietetiques', name: t('alimentaires.categories.aliments_dietetiques'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🥗</span>, color: 'success', emoji: '🥗' }
];
 
 
// EMOJES
const servicesCategories = [
  { id: 'construction_travaux', name: t('services.categories.construction_travaux'), icon: <span style={{ fontSize: '24px' }}>🏗️</span>, color: 'warning', emoji: '🏗️' },
  { id: 'ecoles_formations', name: t('services.categories.ecoles_formations'), icon: <span style={{ fontSize: '24px' }}>📚</span>, color: 'info', emoji: '📚' },
  { id: 'industrie_fabrication', name: t('services.categories.industrie_fabrication'), icon: <span style={{ fontSize: '24px' }}>🏭</span>, color: 'dark', emoji: '🏭' },
  { id: 'transport_demenagement', name: t('services.categories.transport_demenagement'), icon: <span style={{ fontSize: '24px' }}>🚚</span>, color: 'primary', emoji: '🚚' },
  { id: 'decoration_amenagement', name: t('services.categories.decoration_amenagement'), icon: <span style={{ fontSize: '24px' }}>🎨</span>, color: 'pink', emoji: '🎨' },
  { id: 'publicite_communication', name: t('services.categories.publicite_communication'), icon: <span style={{ fontSize: '24px' }}>📢</span>, color: 'info', emoji: '📢' },
  { id: 'nettoyage_jardinage', name: t('services.categories.nettoyage_jardinage'), icon: <span style={{ fontSize: '24px' }}>🧹</span>, color: 'success', emoji: '🧹' },
  { id: 'froid_climatisation', name: t('services.categories.froid_climatisation'), icon: <span style={{ fontSize: '24px' }}>❄️</span>, color: 'info', emoji: '❄️' },
  { id: 'traiteurs_gateaux', name: t('services.categories.traiteurs_gateaux'), icon: <span style={{ fontSize: '24px' }}>🎂</span>, color: 'warning', emoji: '🎂' },
  { id: 'medecine_sante', name: t('services.categories.medecine_sante'), icon: <span style={{ fontSize: '24px' }}>🏥</span>, color: 'danger', emoji: '🏥' },
  { id: 'reparation_auto_diagnostic', name: t('services.categories.reparation_auto_diagnostic'), icon: <span style={{ fontSize: '24px' }}>🔧</span>, color: 'primary', emoji: '🔧' },
  { id: 'securite_alarme', name: t('services.categories.securite_alarme'), icon: <span style={{ fontSize: '24px' }}>🔒</span>, color: 'dark', emoji: '🔒' },
  { id: 'projets_etudes', name: t('services.categories.projets_etudes'), icon: <span style={{ fontSize: '24px' }}>📋</span>, color: 'info', emoji: '📋' },
  { id: 'bureautique_internet', name: t('services.categories.bureautique_internet'), icon: <span style={{ fontSize: '24px' }}>💻</span>, color: 'secondary', emoji: '💻' },
  { id: 'location_vehicules', name: t('services.categories.location_vehicules'), icon: <span style={{ fontSize: '24px' }}>🚗</span>, color: 'primary', emoji: '🚗' },
  { id: 'menuiserie_meubles', name: t('services.categories.menuiserie_meubles'), icon: <span style={{ fontSize: '24px' }}>🪚</span>, color: 'brown', emoji: '🪚' },
  { id: 'impression_edition', name: t('services.categories.impression_edition'), icon: <span style={{ fontSize: '24px' }}>🖨️</span>, color: 'dark', emoji: '🖨️' },
  { id: 'hotellerie_restauration_salles', name: t('services.categories.hotellerie_restauration_salles'), icon: <span style={{ fontSize: '24px' }}>🏨</span>, color: 'warning', emoji: '🏨' },
  { id: 'esthetique_beaute', name: t('services.categories.esthetique_beaute'), icon: <span style={{ fontSize: '24px' }}>💄</span>, color: 'pink', emoji: '💄' },
  { id: 'image_son', name: t('services.categories.image_son'), icon: <span style={{ fontSize: '24px' }}>🎬</span>, color: 'info', emoji: '🎬' },
  { id: 'comptabilite_economie', name: t('services.categories.comptabilite_economie'), icon: <span style={{ fontSize: '24px' }}>💰</span>, color: 'success', emoji: '💰' },
  { id: 'couture_confection', name: t('services.categories.couture_confection'), icon: <span style={{ fontSize: '24px' }}>🧵</span>, color: 'danger', emoji: '🧵' },
  { id: 'maintenance_informatique', name: t('services.categories.maintenance_informatique'), icon: <span style={{ fontSize: '24px' }}>💻</span>, color: 'primary', emoji: '💻' },
  { id: 'reparation_electromenager', name: t('services.categories.reparation_electromenager'), icon: <span style={{ fontSize: '24px' }}>🔌</span>, color: 'warning', emoji: '🔌' },
  { id: 'evenements_divertissement', name: t('services.categories.evenements_divertissement'), icon: <span style={{ fontSize: '24px' }}>🎉</span>, color: 'info', emoji: '🎉' },
  { id: 'paraboles_demos', name: t('services.categories.paraboles_demos'), icon: <span style={{ fontSize: '24px' }}>🛰️</span>, color: 'secondary', emoji: '🛰️' },
  { id: 'reparation_electronique', name: t('services.categories.reparation_electronique'), icon: <span style={{ fontSize: '24px' }}>🔌</span>, color: 'primary', emoji: '🔌' },
  { id: 'services_etranger', name: t('services.categories.services_etranger'), icon: <span style={{ fontSize: '24px' }}>🌍</span>, color: 'success', emoji: '🌍' },
  { id: 'flashage_reparation_telephones', name: t('services.categories.flashage_reparation_telephones'), icon: <span style={{ fontSize: '24px' }}>📱</span>, color: 'info', emoji: '📱' },
  { id: 'flashage_installation_jeux', name: t('services.categories.flashage_installation_jeux'), icon: <span style={{ fontSize: '24px' }}>🎮</span>, color: 'warning', emoji: '🎮' },
  { id: 'juridique', name: t('services.categories.juridique'), icon: <span style={{ fontSize: '24px' }}>⚖️</span>, color: 'dark', emoji: '⚖️' }
];
//  emojes
const voyagesCategories = [
  { id: 'voyage_organise', name: t('voyages.categories.voyage_organise'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>✈️</span>, color: 'primary', emoji: '✈️' },
  { id: 'location_vacances', name: t('voyages.categories.location_vacances'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🏠</span>, color: 'success', emoji: '🏠' },
  { id: 'hajj_omra', name: t('voyages.categories.hajj_omra'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🕋</span>, color: 'info', emoji: '🕋' },
  { id: 'reservations_visa', name: t('voyages.categories.reservations_visa'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🛂</span>, color: 'warning', emoji: '🛂' },
  { id: 'sejour', name: t('voyages.categories.sejour'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🏨</span>, color: 'secondary', emoji: '🏨' },
  { id: 'croisiere', name: t('voyages.categories.croisiere'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>🚢</span>, color: 'info', emoji: '🚢' },
  { id: 'autre', name: t('voyages.categories.autre'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🧳</span>, color: 'secondary', emoji: '🧳' }
];
//emojes
const materiauxCategories = [
  { id: 'materiel_professionnel', name: t('materiaux.categories.materiel_professionnel'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>🔧</span>, color: 'primary', emoji: '🔧' },
  { id: 'outillage_professionnel', name: t('materiaux.categories.outillage_professionnel'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>🛠️</span>, color: 'secondary', emoji: '🛠️' },
  { id: 'materiaux_construction', name: t('materiaux.categories.materiaux_construction'), icon: <span style={{ fontSize: '24px', color: '#ffc107' }}>🧱</span>, color: 'warning', emoji: '🧱' },
  { id: 'matieres_premieres', name: t('materiaux.categories.matieres_premieres'), icon: <span style={{ fontSize: '24px', color: '#17a2b8' }}>⛏️</span>, color: 'info', emoji: '⛏️' },
  { id: 'produits_hygiene', name: t('materiaux.categories.produits_hygiene'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🧼</span>, color: 'success', emoji: '🧼' },
  { id: 'materiel_agricole', name: t('materiaux.categories.materiel_agricole'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>🚜</span>, color: 'success', emoji: '🚜' },
  { id: 'autre', name: t('materiaux.categories.autre'), icon: <span style={{ fontSize: '24px', color: '#6c757d' }}>📦</span>, color: 'secondary', emoji: '📦' }
];
// emojoes
const emploiCategories = [
  { id: 'offres_emploi', name: t('emploi.categories.offres_emploi'), icon: <span style={{ fontSize: '24px', color: '#007bff' }}>💼</span>, color: 'primary', emoji: '💼' },
  { id: 'demandes_emploi', name: t('emploi.categories.demandes_emploi'), icon: <span style={{ fontSize: '24px', color: '#28a745' }}>👨‍💼</span>, color: 'success', emoji: '👨‍💼' }
];






// Obtener las categorías actuales según la categoría principal
  
const getCurrentCategories = () => {
  switch(mainCategory) {
    case 'immobilier':
      return activeTab === 'operation' ? immobilierOperations : immobilierProperties;
    case 'automobiles':
      return vehiculesCategories;
    case 'vetements':
      return vetementsCategories;
    case 'telephones':
      return telephonesCategories;
    case 'informatique':
      return informatiqueCategories;
    case 'electromenager':
      return electromenagerCategories; 
      case 'piecesDetachees':
        return piecesDetacheesCategories; 
  
    case 'sante_beaute':
      return santeBeauteCategories;
    case 'meubles':
      return meublesCategories;
    case 'loisirs':
      return loisirsCategories;
    case 'emploi':
      return emploiCategories;
    case 'sport':
      return sportCategories;
    case 'alimentaires':
      return alimentairesCategories;
    case 'materiaux':
      return materiauxCategories;
    case 'services':
      return servicesCategories;
    case 'voyages':
      return voyagesCategories;
    default:
      return [];
  }
};

 

// Manejar cambio en el select
const handleSelectChange = (e) => {
  const value = e.target.value;
  const fieldName = mainCategory === 'immobilier' && activeTab === 'property' 
    ? 'articleType' 
    : 'subCategory';
  
  handleChangeInput({
    target: {
      name: fieldName,
      value: value || ''
    }
  });
};

// Renderizar según la categoría principal
const renderCategoryContent = () => {
  const currentCategories = getCurrentCategories();

  // Para Immobilier, mostrar tabs
  if (mainCategory === 'immobilier') {
    return (
      <div className="mt-4">
        {/* Tabs pour opération/propriété */}
        <div className="mb-4">
          <div className={`nav nav-tabs ${isRTL ? 'flex-row-reverse' : ''}`}>
            <button
              className={`nav-link ${activeTab === 'operation' ? 'active' : ''}`}
              onClick={() => setActiveTab('operation')}
            >
              📋 {t('type_operation', 'Type d\'opération')}
            </button>
            <button
              className={`nav-link ${activeTab === 'property' ? 'active' : ''}`}
              onClick={() => setActiveTab('property')}
            >
              🏠 {t('type_property', 'Type de bien')}
            </button>
          </div>
        </div>

        <h6 className={`mb-3 ${isRTL ? 'text-end' : ''}`}>
          {activeTab === 'operation' ? t('type_operation') : t('type_property')}
        </h6>

        {/* Select para las subcategorías */}
        <Form.Group className="mb-3">
          <Form.Select
            value={mainCategory === 'immobilier' && activeTab === 'property' 
              ? postData.subCategory  || '' 
              : postData.articleType|| ''}
            onChange={handleSelectChange}
            className="form-select-lg"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <option value="">
              {activeTab === 'operation' 
                ? t('select_operation', 'Sélectionnez une opération...') 
                : t('select_property', 'Sélectionnez un type de bien...')}
            </option>
            {currentCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
    );
  }

  // Para otras categorías, mostrar título específico
  const titles = {
    'automobiles': t('type_vehicle'),
    'vetements': t('type_clothing'),
    'telephones': t('type_phone'),
    'informatique': t('type_computer'),
    'electromenager': t('type_appliance'),
    'piecesDetachees' : t('piecesDetachees' , 'Type de pieces detachees '),

    'sante_beaute': t('type_sante_beaute', 'Type de produit santé & beauté'),
    'meubles': t('type_meubles', 'Type de meuble & maison'),
    'loisirs': t('type_loisirs', 'Type de loisirs & divertissements'),
    'emploi': t('type_emploi', 'Type d\'offre/emploi'),
    'sport': t('type_sport', 'Type de sport'),
    'alimentaires': t('type_alimentaires', 'Type de produit alimentaire'),
    'materiaux': t('type_materiaux', 'Type de matériaux & équipement'),
    'services': t('type_services', 'Type de service'),
    'voyages': t('type_voyages', 'Type de voyage')
  };

  return (
    <div className="mt-4">
      <h6 className={`mb-3 ${isRTL ? 'text-end' : ''}`}>
        {titles[mainCategory] || t('select_subcategory')}
      </h6>
      
      {/* Select para las subcategorías */}
      <Form.Group className="mb-3">
        <Form.Select
          value={postData.subCategory || ''}
          onChange={handleSelectChange}
          className="form-select-lg"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          <option value="">
            {t('select_subcategory_option', 'Sélectionnez une sous-catégorie...')}
          </option>
          {currentCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </div>
  );
};

// Afficher seulement si une catégorie principale est sélectionnée
if (!mainCategory) {
  return (
    <div className={`alert alert-info ${isRTL ? 'text-end' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      ⚠️ {t('select_category_first', 'Veuillez d\'abord sélectionner une catégorie principale')}
    </div>
  );
}

return (
  <div className={`${isRTL ? 'rtl' : 'ltr'}`}>
  

    {/* Contenido específico de la categoría */}
    {renderCategoryContent()}

    {/* Para categorías que no tienen subcategorías predefinidas */}
    {getCurrentCategories().length === 0 && mainCategory && (
      <div className="mt-4">
        <Form.Group>
      
          <Form.Control
            type="text"
            name="subCategory"
            value={postData.subCategory || ''}
            onChange={handleChangeInput}
            placeholder={t('enter_subcategory_placeholder', 'Entrez votre sous-catégorie...')}
            className="form-control-lg"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <Form.Text className={`text-muted ${isRTL ? 'text-end d-block' : ''}`}>
            💡 {t('custom_subcategory_tip', 'Cette catégorie n\'a pas de sous-catégories prédéfinies')}
          </Form.Text>
        </Form.Group>
      </div>
    )}

   

    <style>
      {`
        .rtl { direction: rtl; text-align: right; }
        .ltr { direction: ltr; text-align: left; }
        
        .rtl .me-2 { margin-left: 0.5rem !important; margin-right: 0 !important; }
        .rtl .ms-2 { margin-right: 0.5rem !important; margin-left: 0 !important; }
        
        .nav-tabs .nav-link {
          color: #6c757d;
          border: none;
          padding: 0.5rem 1rem;
          margin: 0 0.25rem;
          background: none;
        }
        .nav-tabs .nav-link.active {
          color: #0d6efd;
          border-bottom: 2px solid #0d6efd;
          font-weight: bold;
        }
        .nav-tabs .nav-link:hover {
          color: #0d6efd;
        }
        
        .form-select-lg {
          padding: 0.75rem 1rem;
          font-size: 1.1rem;
          border-radius: 0.5rem;
          border: 2px solid #dee2e6;
        }
        
        .form-select-lg:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
      `}
    </style>
  </div>
  
 
  );
};


export default React.memo(Subcategories);