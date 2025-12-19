import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaHome, FaCar, FaTools, FaMobileAlt, 
  FaLaptop, FaTv, FaTshirt, FaHeart, FaCouch, 
  FaGamepad, FaFutbol, FaBriefcase, FaIndustry, 
  FaUtensils, FaPlane, FaConciergeBell,
  FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Categorías optimizadas
const categoriesData = [
  { id: 1, name: 'Boutiques', slug: 'boutiques', icon: FaStore, color: '#667eea' },
  { id: 2, name: 'Immobilier', slug: 'immobilier', icon: FaHome, color: '#f093fb' },
  { id: 3, name: 'Automobiles & Véhicules', slug: 'automobiles', icon: FaCar, color: '#f5576c' },
  { id: 4, name: 'Pièces détachées', slug: 'pieces-detachees', icon: FaTools, color: '#48c6ef' },
  { id: 5, name: 'Téléphones & Accessoires', slug: 'telephones', icon: FaMobileAlt, color: '#6a11cb' },
  { id: 6, name: 'Informatique', slug: 'informatique', icon: FaLaptop, color: '#37ecba' },
  { id: 7, name: 'Électroménager & Électronique', slug: 'electromenager', icon: FaTv, color: '#ff9a9e' },
  { id: 8, name: 'Vêtements & Mode', slug: 'vetements', icon: FaTshirt, color: '#a18cd1' },
  { id: 9, name: 'Santé & Beauté', slug: 'sante-beaute', icon: FaHeart, color: '#fbc2eb' },
  { id: 10, name: 'Meubles & Maison', slug: 'meubles', icon: FaCouch, color: '#667eea' },
  { id: 11, name: 'Loisirs & Divertissements', slug: 'loisirs', icon: FaGamepad, color: '#f093fb' },
  { id: 12, name: 'Sport', slug: 'sport', icon: FaFutbol, color: '#f5576c' },
  { id: 13, name: 'Emploi', slug: 'emploi', icon: FaBriefcase, color: '#48c6ef' },
  { id: 14, name: 'Matériaux & Équipement', slug: 'materiaux', icon: FaIndustry, color: '#6a11cb' },
  { id: 15, name: 'Alimentaires', slug: 'alimentaires', icon: FaUtensils, color: '#37ecba' },
  { id: 16, name: 'Voyages', slug: 'voyages', icon: FaPlane, color: '#ff9a9e' },
  { id: 17, name: 'Services', slug: 'services', icon: FaConciergeBell, color: '#a18cd1' },
];

const CategorySlider = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const rowsContainerRef = useRef(null);

  // Configuración responsive
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Reset scroll position en mobile
      if (mobile && scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
        setScrollPosition(0);
        updateScrollButtons();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configuración inicial de filas
  const itemsPerRow = isMobile ? 8 : 9;
  const firstRow = categoriesData.slice(0, itemsPerRow);
  const secondRow = categoriesData.slice(itemsPerRow);

  // Actualizar estado de botones de scroll
  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Scroll functions para mobile
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  // Manejar scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      updateScrollButtons();
    }
  };

  // Renderizar fila de iconos
  const renderIconRow = (row, rowIndex) => {
    const marginBottom = rowIndex === 0 ? (isMobile ? '4px' : '6px') : '0px';
    
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '4px' : '20px', // 🔽 REDUCIDO de 25px a 20px para PCs
          padding: isMobile ? '4px 8px' : '10px 15px', // 🔽 REDUCIDO padding para PCs
          flexShrink: 0,
          minWidth: isMobile ? 'min-content' : 'auto',
          marginBottom: marginBottom
        }}
      >
        {row.map((category) => {
          const isHovered = hoveredId === category.id;
          
          return (
            <Link
              key={`${category.id}-${rowIndex}`}
              to={`/category/${category.slug}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
                width: isMobile ? '68px' : '85px' // 🔽 Reducido para PCs
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onTouchStart={() => setHoveredId(category.id)}
              onTouchEnd={() => setTimeout(() => setHoveredId(null), 150)}
            >
              {/* Círculo del icono */}
              <div
                style={{
                  width: isMobile ? '62px' : '75px', // 🔽 Reducido para PCs
                  height: isMobile ? '62px' : '75px',
                  borderRadius: '50%',
                  background: isHovered
                    ? `linear-gradient(135deg, ${category.color} 0%, ${category.color} 100%)`
                    : `linear-gradient(135deg, ${category.color}15 0%, ${category.color}08 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                  border: isHovered 
                    ? `2px solid ${category.color}`
                    : `2px solid ${category.color}20`,
                  boxShadow: isHovered
                    ? `0 6px 20px ${category.color}40`
                    : '0 3px 10px rgba(0,0,0,0.08)',
                  transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                  marginBottom: '6px' // 🔽 Reducido
                }}
              >
                <category.icon 
                  size={isMobile ? 30 : 36} // 🔽 Reducido para PCs
                  style={{ 
                    color: isHovered ? 'white' : category.color,
                    transition: 'all 0.2s ease'
                  }} 
                />
              </div>

              {/* Nombre abreviado */}
              <div style={{
                textAlign: 'center',
                width: '100%'
              }}>
                <span style={{
                  fontSize: isMobile ? '0.68rem' : '0.75rem', // 🔽 Reducido para PCs
                  fontWeight: '600',
                  color: isHovered ? category.color : '#444',
                  display: 'block',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  padding: '0 2px'
                }}>
                  {category.name.length > 12 ? `${category.name.substring(0, 10)}...` : category.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="category-grid-container">
      {/* Card contenedor único - MENOS PADDING/MARGIN */}
      <div style={{
        position: 'relative',
        maxWidth: '1300px', // 🔽 REDUCIDO de 1400px
        margin: '0 auto',
        background: 'white',
        borderRadius: '18px', // 🔽 Reducido
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)', // 🔽 Sombras más sutiles
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)'
      }}>
        {/* Contenido con scroll horizontal en mobile */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'block',
            padding: isMobile ? '8px 0' : '15px 0', // 🔽 REDUCIDO para PCs
            overflowX: isMobile ? 'auto' : 'visible',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            position: 'relative',
            minHeight: isMobile ? 'auto' : '160px' // 🔽 REDUCIDO para PCs
          }}
        >
          {/* Contenedor de filas para centrar botones */}
          <div ref={rowsContainerRef} style={{
            position: 'relative'
          }}>
            {/* Primera fila */}
            {renderIconRow(firstRow, 0)}

            {/* Segunda fila */}
            {renderIconRow(secondRow, 1)}
          </div>
        </div>

        {/* Botones de scroll solo en mobile - MEJOR CENTRADO Y MÁS ESTILIZADOS */}
        {isMobile && (
          <>
            {/* Botón izquierdo - ESTILIZADO Y CENTRADO */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '50%', // CENTRADO VERTICALMENTE
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: 'white'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.4)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                <FaChevronLeft size={16} color="white" />
              </button>
            )}

            {/* Botón derecho - ESTILIZADO Y CENTRADO */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%', // CENTRADO VERTICALMENTE
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: 'white'
                }}
                onTouchStart={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(0.92)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.4)';
                }}
                onTouchEnd={(e) => {
                  e.currentTarget.style.transform = 'translateY(-50%)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }}
              >
                <FaChevronRight size={16} color="white" />
              </button>
            )}

            {/* Indicadores de scroll (dots) - MEJOR ESTILIZADOS */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              padding: '6px 0 10px 0',
              position: 'relative',
              zIndex: 10
            }}>
              {[0, 1, 2].map((dot, index) => {
                const isActive = index === Math.floor(scrollPosition / 300);
                return (
                  <div
                    key={index}
                    style={{
                      width: isActive ? '8px' : '6px',
                      height: isActive ? '8px' : '6px',
                      borderRadius: '50%',
                      background: isActive 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                        : '#e0e0e0',
                      transition: 'all 0.3s ease',
                      transform: isActive ? 'scale(1.1)' : 'scale(1)'
                    }}
                  />
                );
              })}
            </div>
          </>
        )}

        {/* Footer minimalista - MENOS PADDING */}
        <div style={{
          padding: isMobile ? '6px 10px' : '8px 15px', // 🔽 REDUCIDO
          borderTop: '1px solid rgba(0,0,0,0.03)',
          background: 'rgba(248, 249, 250, 0.3)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px', // 🔽 Reducido
            fontSize: isMobile ? '0.7rem' : '0.75rem', // 🔽 Reducido
            color: '#666',
            fontWeight: '500'
          }}>
            <span style={{ fontSize: '0.8rem' }}>•</span> {/* 🔽 Reducido */}
            <span>Toutes catégories</span>
            <span style={{ fontSize: '0.8rem' }}>•</span>
          </div>
        </div>
      </div>

      {/* Estilos CSS mejorados */}
      <style>{`
        /* Ocultar scrollbar pero mantener funcionalidad */
        .category-grid-container ::-webkit-scrollbar {
          display: none;
        }
        
        /* Efectos de hover y active mejorados */
        .category-grid-container a:active div:first-child {
          transform: scale(0.94) !important;
          transition: transform 0.1s ease !important;
        }
        
        /* Animación de ripple para touch */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        /* Prevenir zoom en doble tap */
        .category-grid-container * {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Mejorar rendimiento */
        .category-grid-container {
          contain: content;
        }
        
        /* Gradientes en los bordes del scroll (solo mobile) - MEJOR VISUAL */
        @media (max-width: 767px) {
          .category-grid-container > div > div:first-child::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
            pointer-events: none;
            z-index: 15;
          }
          
          .category-grid-container > div > div:first-child::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 100%;
            background: linear-gradient(to left, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%);
            pointer-events: none;
            z-index: 15;
          }
        }
        
        /* Optimización para pantallas muy pequeñas */
        @media (max-width: 380px) {
          .category-grid-container a {
            width: 60px !important;
          }
          
          .category-grid-container a > div:first-child {
            width: 52px !important;
            height: 52px !important;
          }
          
          .category-grid-container svg {
            width: 22px !important;
            height: 22px !important;
          }
          
          /* Botones más pequeños en pantallas muy pequeñas */
          .category-grid-container button {
            width: 30px !important;
            height: 30px !important;
          }
          
          .category-grid-container button svg {
            width: 14px !important;
            height: 14px !important;
          }
        }
        
        /* Smooth transitions */
        .category-grid-container * {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Mejor visualización en PCs grandes */
        @media (min-width: 1200px) {
          .category-grid-container > div {
            max-width: 1300px !important;
          }
        }
        
        /* Efecto hover para botones en mobile */
        @media (hover: hover) and (pointer: fine) {
          .category-grid-container button:hover {
            transform: translateY(-50%) scale(1.05) !important;
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CategorySlider;