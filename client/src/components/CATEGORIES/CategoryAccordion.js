import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Accordion, Card, Button, Form, Badge } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';
 
// 🔄 Lazy load de componentes de subcategorías
const VehiculesSubcategories = lazy(() => import('./subcategories/VehiculesFields'));
const VetementsSubcategories = lazy(() => import('./subcategories/VetementsFields'));
const TelephonesSubcategories = lazy(() => import('./subcategories/TelephonesFields'));
const InformatiqueSubcategories = lazy(() => import('./subcategories/InformatiqueFields'));
const ElectromenagerSubcategories = lazy(() => import('./subcategories/ElectromenagerFields'));
const PiecesDetacheesSubcategories = lazy(() => import('./subcategories/PiecesDetacheesFields'));
const SanteBeauteSubcategories = lazy(() => import('./subcategories/SanteBeauteFields'));
const MeublesSubcategories = lazy(() => import('./subcategories/MeublesFields'));
const LoisirsSubcategories = lazy(() => import('./subcategories/LoisirsFields'));
const SportSubcategories = lazy(() => import('./subcategories/SportFields'));
const AlimentairesSubcategories = lazy(() => import('./subcategories/AlimentairesFields'));
const ServicesSubcategories = lazy(() => import('./subcategories/ServicesFields'));
const MateriauxSubcategories = lazy(() => import('./subcategories/MateriauxFields'));
const VoyagesSubcategories = lazy(() => import('./subcategories/VoyagesFields'));
const EmploiSubcategories = lazy(() => import('./subcategories/EmploiFields'));

const CategoryAccordion = ({ postData, handleChangeInput }) => {
  const { t, i18n } = useTranslation(['categories', 'subcategories']);
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [activeKey, setActiveKey] = useState(null);
  const [localPostData, setLocalPostData] = useState(postData);
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [loadedComponents, setLoadedComponents] = useState({});

  // 🔄 Sincronizar con cambios externos
  useEffect(() => {
    console.log('🔄 Accordion recibió postData:', postData);
    setLocalPostData(postData);
    
    // Expandir automáticamente si hay categoría seleccionada
    if (postData.categorie && !activeKey) {
      setActiveKey(postData.categorie);
    }
    
    // Si es immobilier y hay articleType, actualizar selectedOperation
    if (postData.categorie === 'immobilier' && postData.articleType) {
      setSelectedOperation(postData.articleType);
    }
  }, [postData]);

  // 🔄 Cargar componente bajo demanda
  const loadComponent = (categoryId) => {
    if (!loadedComponents[categoryId]) {
      setLoadedComponents(prev => ({ ...prev, [categoryId]: true }));
    }
  };

  // Mapeo de categorías a emojis
  const categoryEmojis = {
    'immobilier': '🏠',
    'vehicules': '🚗',
    'telephones': '📱',
    'informatique': '💻',
    'electromenager': '🔌',
    'piecesDetachees': '⚙️',
    'vetements': '👕',
    'alimentaires': '🍎',
    'sante_beaute': '💄',
    'meubles': '🛋️',
    'services': '🛠️',
    'materiaux': '🧱',
    'loisirs': '🎮',
    'emploi': '💼',
    'sport': '⚽',
    'voyages': '✈️'
  };

  // Datos de categorías principales
  const categories = [
    { id: 'immobilier', name: t('immobilier', { ns: 'categories' }) },
    { id: 'vehicules', name: t('automobiles', { ns: 'categories' }) },
    { id: 'telephones', name: t('telephones', { ns: 'categories' }) },
    { id: 'informatique', name: t('informatique', { ns: 'categories' }) },
    { id: 'electromenager', name: t('electromenager', { ns: 'categories' }) },
    { id: 'piecesDetachees', name: t('piecesDetachees', { ns: 'categories' }) },
    { id: 'vetements', name: t('vetements', { ns: 'categories' }) },
    { id: 'alimentaires', name: t('Alimentaires', { ns: 'categories' }) },
    { id: 'sante_beaute', name: t('sante_beaute', { ns: 'categories' }) },
    { id: 'meubles', name: t('meubles', { ns: 'categories' }) },
    { id: 'services', name: t('Services', { ns: 'categories' }) },
    { id: 'materiaux', name: t('Materiaux', { ns: 'categories' }) },
    { id: 'loisirs', name: t('loisirs', { ns: 'categories' }) },
    { id: 'emploi', name: t('emploi', { ns: 'categories' }) },
    { id: 'sport', name: t('Sport', { ns: 'categories' }) },
    { id: 'voyages', name: t('Voyage', { ns: 'categories' }) }
  ];

  // Datos especiales para Immobilier
  const immobilierOperations = [
    { id: 'vente', name: t('immobilier.operation.vente', { ns: 'subcategories' }) },
    { id: 'location', name: t('immobilier.operation.location', { ns: 'subcategories' }) },
    { id: 'location_vacances', name: t('immobilier.operation.location_vacances', { ns: 'subcategories' }) },
  ];

  const immobilierProperties = [
    { id: 'appartement', name: t('immobilier.property.appartement', { ns: 'subcategories' }) },
    { id: 'villa', name: t('immobilier.property.villa', { ns: 'subcategories' }) },
    { id: 'terrain', name: t('immobilier.property.terrain', { ns: 'subcategories' }) },
    { id: 'local', name: t('immobilier.property.local', { ns: 'subcategories' }) },
  ];

  // Filtrar categorías basadas en búsqueda
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🎯 FUNCIONES HANDLER (manteniendo la misma lógica)
  const handleCategorySelect = (categoryId) => {
    console.log('🎯 Seleccionando categoría:', categoryId);
    
    // Cargar componente bajo demanda
    loadComponent(categoryId);
    
    // Notificar al padre
    handleChangeInput({
      target: { name: 'categorie', value: categoryId }
    });
    
    // Para Immobilier, limpiar articleType y subCategory
    if (categoryId === 'immobilier') {
      handleChangeInput({
        target: { name: 'articleType', value: '' }
      });
      handleChangeInput({
        target: { name: 'subCategory', value: '' }
      });
      setSelectedOperation(null);
    } else {
      // Para otras categorías, limpiar subCategory
      handleChangeInput({
        target: { name: 'subCategory', value: '' }
      });
    }
    
    // Toggle del accordion
    if (activeKey === categoryId) {
      setActiveKey(null);
    } else {
      setActiveKey(categoryId);
    }
  };

  const handleSubcategorySelect = (subcategoryId) => {
    console.log('🎯 Seleccionando subcategoría:', subcategoryId);
    handleChangeInput({
      target: { name: 'subCategory', value: subcategoryId }
    });
  };

  const handleOperationSelect = (operationId) => {
    console.log('🏠 Seleccionando operación Immobilier:', operationId);
    setSelectedOperation(operationId);
    handleChangeInput({
      target: { name: 'articleType', value: operationId }
    });
    
    // Limpiar propiedad si se cambia operación
    if (localPostData.subCategory) {
      handleChangeInput({
        target: { name: 'subCategory', value: '' }
      });
    }
  };

  const handlePropertySelect = (propertyId) => {
    console.log('🏠 Seleccionando propiedad Immobilier:', propertyId);
    handleChangeInput({
      target: { name: 'subCategory', value: propertyId }
    });
  };

  const handleBackToOperations = () => {
    setSelectedOperation(null);
    handleChangeInput({
      target: { name: 'articleType', value: '' }
    });
    handleChangeInput({
      target: { name: 'subCategory', value: '' }
    });
  };

  // 🔄 Mapeo de componentes lazy por categoría
  const getLazySubcategoryComponent = (categoryId) => {
    const components = {
      vehicules: VehiculesSubcategories,
      vetements: VetementsSubcategories,
      telephones: TelephonesSubcategories,
      informatique: InformatiqueSubcategories,
      electromenager: ElectromenagerSubcategories,
      piecesDetachees: PiecesDetacheesSubcategories,
      sante_beaute: SanteBeauteSubcategories,
      meubles: MeublesSubcategories,
      loisirs: LoisirsSubcategories,
      sport: SportSubcategories,
      alimentaires: AlimentairesSubcategories,
      services: ServicesSubcategories,
      materiaux: MateriauxSubcategories,
      voyages: VoyagesSubcategories,
      emploi: EmploiSubcategories,
    };
    
    return components[categoryId] || null;
  };

  // 🔄 Renderizar contenido con lazy loading
  const renderLazySubcategories = (categoryId) => {
    const LazyComponent = getLazySubcategoryComponent(categoryId);
    
    if (!LazyComponent || !loadedComponents[categoryId]) {
      return (
        <div className="loading-placeholder">
          <div className="text-center py-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
              Chargement des sous-catégories...
            </span>
          </div>
        </div>
      );
    }

    return (
      <Suspense fallback={
        <div className="loading-placeholder">
          <div className="text-center py-3">
            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#6c757d' }}>
              Chargement des sous-catégories...
            </span>
          </div>
        </div>
      }>
        <LazyComponent 
          postData={localPostData}
          onSelect={handleSubcategorySelect}
        />
      </Suspense>
    );
  };

  // 🔄 Renderizar contenido especial para Immobilier
  const renderImmobilierContent = () => (
    <div className="immobilier-content mt-2">
      {!selectedOperation ? (
        <div className="operations-level">
          <div className="level-header mb-2">
            <h6 className="level-title fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
              <span className="me-2">📋</span>
              Sélectionnez une opération
            </h6>
            <p className="level-description mb-2" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
              Choisissez le type de transaction immobilière
            </p>
          </div>
          
          <div className="operations-list">
            {immobilierOperations.map((operation) => (
              <div 
                key={operation.id}
                className={`operation-item ${localPostData.articleType === operation.id ? 'selected' : ''}`}
                onClick={() => handleOperationSelect(operation.id)}
              >
                <div className="d-flex align-items-center">
                  <div className="operation-emoji me-3">
                    {operation.id === 'vente' ? '💰' : 
                     operation.id === 'location' ? '📅' : '🏖️'}
                  </div>
                  <div className="operation-info">
                    <div className="operation-name fw-medium" style={{ fontSize: '0.9rem' }}>
                      {operation.name}
                    </div>
                    <div className="operation-desc" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                      {operation.id === 'vente' ? 'Achat/Vente de biens' :
                       operation.id === 'location' ? 'Location à long terme' :
                       'Location saisonnière'}
                    </div>
                  </div>
                </div>
                {localPostData.articleType === operation.id && (
                  <div className="operation-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="properties-level">
          <div className="level-header mb-2">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <h6 className="level-title fw-bold mb-1" style={{ fontSize: '0.95rem' }}>
                  <span className="me-2">🏠</span>
                  Sélectionnez un type de bien
                </h6>
                <p className="level-description mb-2" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                  Opération: <span className="fw-bold">
                    {immobilierOperations.find(op => op.id === selectedOperation)?.name}
                  </span>
                </p>
              </div>
              <Button 
                variant="link" 
                className="btn-back p-0"
                onClick={handleBackToOperations}
                style={{ fontSize: '0.8rem' }}
              >
                ← Changer
              </Button>
            </div>
          </div>
          
          <div className="properties-list">
            {immobilierProperties.map((property) => (
              <div 
                key={property.id}
                className={`property-item ${localPostData.subCategory === property.id ? 'selected' : ''}`}
                onClick={() => handlePropertySelect(property.id)}
              >
                <div className="d-flex align-items-center">
                  <div className="property-emoji me-3">
                    {property.id === 'appartement' ? '🏢' : 
                     property.id === 'villa' ? '🏡' : 
                     property.id === 'terrain' ? '🌳' : '🏢'}
                  </div>
                  <div className="property-info">
                    <div className="property-name fw-medium" style={{ fontSize: '0.9rem' }}>
                      {property.name}
                    </div>
                    <div className="property-desc" style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                      {property.id === 'appartement' ? 'Appartements et studios' :
                       property.id === 'villa' ? 'Maisons et villas' :
                       property.id === 'terrain' ? 'Terrains et parcelles' :
                       'Locaux commerciaux'}
                    </div>
                  </div>
                </div>
                {localPostData.subCategory === property.id && (
                  <div className="property-check">✓</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Títulos para categorías
  const getCategoryTitle = (categoryId) => {
    const titles = {
      'vehicules': t('type_vehicle', { ns: 'subcategories' }),
      'vetements': t('type_clothing', { ns: 'subcategories' }),
      'telephones': t('type_phone', { ns: 'subcategories' }),
      'informatique': t('type_computer', { ns: 'subcategories' }),
      'electromenager': t('type_appliance', { ns: 'subcategories' }),
      'piecesDetachees': t('type_pieces_detachees', { ns: 'subcategories' }),
      'sante_beaute': t('type_sante_beautee', { ns: 'subcategories' }),
      'meubles': t('type_meubles', { ns: 'subcategories' }),
      'loisirs': t('type_loisirs', { ns: 'subcategories' }),
      'emploi': t('type_emploi', { ns: 'subcategories' }),
      'sport': t('type_sport', { ns: 'subcategories' }),
      'alimentaires': t('type_alimentaires', { ns: 'subcategories' }),
      'materiaux': t('type_materiaux', { ns: 'subcategories' }),
      'services': t('type_services', { ns: 'subcategories' }),
      'voyages': t('type_voyages', { ns: 'subcategories' })
    };
    
    return titles[categoryId] || t('select_subcategory', { ns: 'subcategories' });
  };

  return (
    <div className={`category-accordion ${isRTL ? 'rtl' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Barra de búsqueda */}
      <div className="search-container mb-4">
        <Form.Control
          type="text"
          placeholder={t('search_category', { ns: 'categories', defaultValue: '🔍 Rechercher une catégorie...' })}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          dir={isRTL ? 'rtl' : 'ltr'}
          size="sm"
        />
      </div>

      {/* Contador de resultados */}
      {searchTerm && (
        <div className="results-count mb-2">
          <Badge bg="light" text="dark" className="px-1 py-1">
            <span className="fw-bold" style={{ fontSize: '0.9rem' }}>
              {filteredCategories.length}
            </span>
            <span className="ms-1" style={{ fontSize: '0.85rem' }}>
              catégorie(s) trouvée(s)
            </span>
          </Badge>
        </div>
      )}

      {/* Accordion */}
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <Accordion.Item 
              key={category.id} 
              eventKey={category.id}
              className="category-accordion-item mb-1"
            >
              <Accordion.Header 
                onClick={() => handleCategorySelect(category.id)}
                className="category-header"
              >
                <div className="d-flex align-items w-100">
                  <span className="category-emoji">
                    {categoryEmojis[category.id]}
                  </span>
                  <div className="category-info ms-3 flex-grow-1">
                    <div className="category-name">
                      {category.name}
                    </div>
                    <div className="category-id">
                      {category.id}
                    </div>
                  </div>
                  <div className="category-actions">
                    {localPostData.categorie === category.id && (
                      <Badge bg="success" className="selected-badge me-2">
                        ✓
                      </Badge>
                    )}
                    <span className="expand-icon">
                      {activeKey === category.id ? <ChevronDown /> : <ChevronRight />}
                    </span>
                  </div>
                </div>
              </Accordion.Header>
              
              <Accordion.Body className="category-body">
                {localPostData.categorie === category.id && (
                  <>
                    {category.id === 'immobilier' ? (
                      renderImmobilierContent()
                    ) : (
                      renderLazySubcategories(category.id)
                    )}
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div className="no-results text-center py-4">
            <div className="no-results-icon mb-2" style={{ fontSize: '2rem' }}>
              🔍
            </div>
            <div className="no-results-title fw-bold mb-1" style={{ fontSize: '1rem' }}>
              Aucune catégorie trouvée
            </div>
            <div className="no-results-text" style={{ fontSize: '0.9rem', color: '#6c757d' }}>
              Essayez avec d'autres termes de recherche
            </div>
          </div>
        )}
      </Accordion>

      {/* Estado de selección */}
      {localPostData.categorie && (
        <div className="current-selection mt-2">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-primary bg-opacity-10 border-0 py-2">
              <h6 className="mb-0 fw-bold d-flex align-items-center" style={{ fontSize: '1rem' }}>
                <span className="me-2">✅</span>
                Sélection actuelle
              </h6>
            </Card.Header>
            <Card className="p-1">
              <div className="selection-details">
                <div className="selection-item mb-2">
                  <div className="selection-label" style={{ fontSize: '0.9rem' }}>Catégorie:</div>
                  <div className="selection-value fw-bold" style={{ fontSize: '1rem' }}>
                    <span className="me-2">{categoryEmojis[localPostData.categorie]}</span>
                    {categories.find(c => c.id === localPostData.categorie)?.name}
                  </div>
                </div>
                
                {localPostData.categorie === 'immobilier' && localPostData.articleType && (
                  <div className="selection-item mb-1">
                    <div className="selection-label" style={{ fontSize: '0.9rem' }}>Opération:</div>
                    <div className="selection-value fw-medium" style={{ fontSize: '0.95rem' }}>
                      <span className="me-2">
                        {localPostData.articleType === 'vente' ? '💰' : 
                         localPostData.articleType === 'location' ? '📅' : '🏖️'}
                      </span>
                      {immobilierOperations.find(op => op.id === localPostData.articleType)?.name}
                    </div>
                  </div>
                )}
              </div>
            </Card>
            <Card.Footer className="bg-light border-0 py-2">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={() => {
                  handleChangeInput({ target: { name: 'categorie', value: '' } });
                  handleChangeInput({ target: { name: 'subCategory', value: '' } });
                  handleChangeInput({ target: { name: 'articleType', value: '' } });
                  setActiveKey(null);
                  setSelectedOperation(null);
                  setLoadedComponents({});
                }}
                className="w-100"
                style={{ fontSize: '0.85rem' }}
              >
                Changer de catégorie
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}

      {/* Styles CSS actualizados con soporte para lazy loading */}
      <style>{`
        .category-accordion {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        /* Barra de búsqueda */
        .search-input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          font-size: 0.95rem;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          background-color: white;
          transition: all 0.2s ease;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #0d6efd;
          box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.1);
        }
        
        /* Ítem del accordion */
        .category-accordion-item {
          border: 1px solid #e9ecef;
          border-radius: 8px !important;
          overflow: hidden;
          margin-bottom: 4px;
        }
        
        /* Cabecera */
        .category-header {
          padding: 1rem 1.25rem !important;
          background-color: white !important;
          border: none !important;
        }
        
        .category-header:hover {
          background-color: #f8f9fa !important;
        }
        
        .category-accordion-item .accordion-button {
          padding: 0 !important;
          box-shadow: none !important;
        }
        
        .category-accordion-item .accordion-button:not(.collapsed) {
          background-color: transparent !important;
          color: inherit !important;
          box-shadow: none !important;
        }
        
        /* Iconos y texto */
        .category-emoji {
          font-size: 2rem;
          min-width: 40px;
        }
        
        .category-info {
          flex-grow: 1;
        }
        
        .category-name {
          font-size: 1.5rem;
          font-weight: 600;
          color: #212529;
        }
        
        .category-id {
          font-size: 0.85rem;
          color: #6c757d;
          margin-top: 2px;
        }
        
        .category-actions {
          display: flex;
          align-items: center;
        }
        
        .selected-badge {
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
        }
        
        .expand-icon {
          color: #6c757d;
        }
        
        /* Cuerpo del accordion */
        .category-body {
          background-color: #f8f9fa;
          border-top: 1px solid #e9ecef;
          animation: slideDown 0.3s ease-out;
        }
        
        /* Loading placeholder */
        .loading-placeholder {
          min-height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        /* Contenido Immobilier */
        .immobilier-content {
          animation: fadeIn 0.2s ease;
        }
        
        .operations-list, .properties-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .operation-item, .property-item {
          padding: 0.875rem 1rem;
          background-color: white;
          border-radius: 6px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .operation-item:hover, .property-item:hover {
          border-color: #dee2e6;
          transform: translateY(-1px);
        }
        
        .operation-item.selected, .property-item.selected {
          border-color: #0d6efd;
          background-color: #f8f9ff;
        }
        
        .operation-emoji, .property-emoji {
          font-size: 1.3rem;
          min-width: 36px;
          text-align: center;
        }
        
        .operation-info, .property-info {
          flex-grow: 1;
        }
        
        .operation-check, .property-check {
          color: #198754;
          font-weight: bold;
          font-size: 1.2rem;
        }
        
        .btn-back {
          text-decoration: none;
          color: #6c757d;
          font-size: 0.85rem;
        }
        
        .btn-back:hover {
          color: #0d6efd;
        }
        
        /* No results */
        .no-results {
          background-color: #f8f9fa;
          border-radius: 8px;
          padding: 2rem;
        }
        
        /* Current selection */
        .current-selection {
          animation: fadeIn 0.3s ease;
        }
        
        .selection-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        
        .selection-label {
          min-width: 100px;
          color: #6c757d;
          font-weight: 500;
        }
        
        .selection-value {
          flex-grow: 1;
          color: #212529;
        }
        
        /* Animations */
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 1000px;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .category-name {
            font-size: 0.95rem;
          }
          
          .category-body {
            padding: 1rem !important;
          }
          
          .operation-item, .property-item {
            padding: 0.75rem;
          }
        }
        
        /* RTL Support */
        .rtl .category-info {
          margin-right: 0.75rem;
          margin-left: 0;
        }
        
        .rtl .expand-icon {
          transform: scaleX(-1);
        }
        
        .rtl .selected-badge {
          margin-right: 0.5rem;
          margin-left: 0;
        }
      `}</style>
    </div>
  );
};

export default React.memo(CategoryAccordion);