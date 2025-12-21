import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Categorías con emojis
const categoriesData = [
  { id: 1, name: 'Boutiques', slug: 'boutiques', emoji: '🏪', color: '#667eea' },
  { id: 2, name: 'Immobilier', slug: 'immobilier', emoji: '🏠', color: '#f093fb' },
  { id: 3, name: 'Automobiles & Véhicules', slug: 'automobiles', emoji: '🚗', color: '#f5576c' },
  { id: 4, name: 'Pièces détachées', slug: 'pieces-detachees', emoji: '🔧', color: '#48c6ef' },
  { id: 5, name: 'Téléphones & Accessoires', slug: 'telephones', emoji: '📱', color: '#6a11cb' },
  { id: 6, name: 'Informatique', slug: 'informatique', emoji: '💻', color: '#37ecba' },
  { id: 7, name: 'Électroménager & Électronique', slug: 'electromenager', emoji: '📺', color: '#ff9a9e' },
  { id: 8, name: 'Vêtements & Mode', slug: 'vetements', emoji: '👕', color: '#a18cd1' },
  { id: 9, name: 'Santé & Beauté', slug: 'sante-beaute', emoji: '💄', color: '#fbc2eb' },
  { id: 10, name: 'Meubles & Maison', slug: 'meubles', emoji: '🛋️', color: '#667eea' },
  { id: 11, name: 'Loisirs & Divertissements', slug: 'loisirs', emoji: '🎮', color: '#f093fb' },
  { id: 12, name: 'Sport', slug: 'sport', emoji: '⚽', color: '#f5576c' },
  { id: 13, name: 'Emploi', slug: 'emploi', emoji: '💼', color: '#48c6ef' },
  { id: 14, name: 'Matériaux & Équipement', slug: 'materiaux', emoji: '🏗️', color: '#6a11cb' },
  { id: 15, name: 'Alimentaires', slug: 'alimentaires', emoji: '🍎', color: '#37ecba' },
  { id: 16, name: 'Voyages', slug: 'voyages', emoji: '✈️', color: '#ff9a9e' },
  { id: 17, name: 'Services', slug: 'services', emoji: '🔔', color: '#a18cd1' },
];

const CategorySliderEmoji = () => {
  const [isMobile, setIsMobile] = useState(false);
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

  // Renderizar fila de emojis (SIN HOVER)
  const renderEmojiRow = (row, rowIndex) => {
    const marginBottom = rowIndex === 0 ? (isMobile ? '8px' : '10px') : '0px';
    
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '4px' : '20px',
          padding: isMobile ? '8px 8px' : '12px 15px',
          flexShrink: 0,
          minWidth: isMobile ? 'min-content' : 'auto',
          marginBottom: marginBottom
        }}
      >
        {row.map((category) => (
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
              width: isMobile ? '75px' : '95px'
            }}
          >
            {/* Círculo del emoji - SIN EFECTOS HOVER */}
            <div
              style={{
                width: isMobile ? '70px' : '85px',
                height: isMobile ? '70px' : '85px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}10 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                border: `2px solid ${category.color}20`,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                marginBottom: '8px',
                transition: 'transform 0.2s ease'
              }}
            >
              <span 
                style={{ 
                  fontSize: isMobile ? '2.2rem' : '2.5rem', // Tamaño emoji
                  lineHeight: 1,
                  filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))'
                }}
              >
                {category.emoji}
              </span>
            </div>

            {/* Nombre abreviado */}
            <div style={{
              textAlign: 'center',
              width: '100%'
            }}>
              <span style={{
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                fontWeight: '600',
                color: '#444',
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                padding: '0 2px',
                lineHeight: '1.2'
              }}>
                {category.name.length > 12 ? `${category.name.substring(0, 10)}...` : category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="category-grid-container">
      {/* Card contenedor único */}
      <div style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.06)'
      }}>
        {/* Contenido con scroll horizontal en mobile */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'block',
            padding: isMobile ? '12px 0' : '20px 0',
            overflowX: isMobile ? 'auto' : 'visible',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            position: 'relative',
            minHeight: isMobile ? 'auto' : '180px'
          }}
        >
          {/* Contenedor de filas para centrar botones */}
          <div ref={rowsContainerRef} style={{
            position: 'relative'
          }}>
            {/* Primera fila */}
            {renderEmojiRow(firstRow, 0)}

            {/* Segunda fila */}
            {renderEmojiRow(secondRow, 1)}
          </div>
        </div>

        {/* Botones de scroll solo en mobile */}
        {isMobile && (
          <>
            {/* Botón izquierdo */}
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <FaChevronLeft size={18} color="white" />
              </button>
            )}

            {/* Botón derecho */}
            {canScrollRight && (
              <button
                onClick={scrollRight}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'white',
                  transition: 'all 0.2s ease'
                }}
              >
                <FaChevronRight size={18} color="white" />
              </button>
            )}

            {/* Indicadores de scroll (dots) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              padding: '8px 0 12px 0',
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

        {/* Footer minimalista */}
        <div style={{
          padding: isMobile ? '8px 12px' : '10px 20px',
          borderTop: '1px solid rgba(0,0,0,0.04)',
          background: 'rgba(248, 249, 250, 0.4)',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: isMobile ? '0.75rem' : '0.85rem',
            color: '#666',
            fontWeight: '500'
          }}>
           
          </div>
        </div>
      </div>

      {/* Estilos CSS */}
      <style>{`
        /* Ocultar scrollbar pero mantener funcionalidad */
        .category-grid-container ::-webkit-scrollbar {
          display: none;
        }
        
        /* Solo efecto de press para mobile/touch */
        .category-grid-container a:active div:first-child {
          transform: scale(0.95);
          transition: transform 0.1s ease;
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
        
        /* Gradientes en los bordes del scroll (solo mobile) */
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
            width: 65px !important;
          }
          
          .category-grid-container a > div:first-child {
            width: 58px !important;
            height: 58px !important;
          }
          
          .category-grid-container a > div:first-child span {
            font-size: 1.8rem !important;
          }
          
          /* Botones más pequeños en pantallas muy pequeñas */
          .category-grid-container button {
            width: 32px !important;
            height: 32px !important;
          }
          
          .category-grid-container button svg {
            width: 16px !important;
            height: 16px !important;
          }
        }
        
        /* Smooth transitions solo para elementos necesarios */
        .category-grid-container button,
        .category-grid-container a:active div:first-child {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Mejor visualización en PCs grandes */
        @media (min-width: 1200px) {
          .category-grid-container > div {
            max-width: 1400px !important;
          }
        }
        
        /* Sin efectos hover para PCs */
        @media (hover: hover) and (pointer: fine) {
          .category-grid-container a div:first-child,
          .category-grid-container a span {
            transition: none !important;
          }
        }
        
        /* Asegurar que los emojis se muestren correctamente */
        .category-grid-container span[role="img"] {
          display: inline-block;
          font-style: normal;
        }
      `}</style>
    </div>
  );
};

export default CategorySliderEmoji;