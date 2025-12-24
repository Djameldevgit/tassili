import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaStore, FaHome, FaCar, FaTools, FaMobileAlt, 
  FaLaptop, FaTv, FaTshirt, FaHeart, FaCouch, 
  FaGamepad, FaFutbol, FaBriefcase, FaIndustry, 
  FaUtensils, FaPlane, FaConciergeBell,
  FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const rowsContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
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

  const itemsPerRow = isMobile ? 8 : 9;
  const firstRow = categoriesData.slice(0, itemsPerRow);
  const secondRow = categoriesData.slice(itemsPerRow);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

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

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
      updateScrollButtons();
    }
  };

  const renderIconRow = (row, rowIndex) => {
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: isMobile ? 'flex-start' : 'center',
          gap: isMobile ? '12px' : '24px', // 🔼 MÁS ESPACIO EN EJE X
          padding: isMobile ? '8px 12px' : '12px 20px', // 🔼 MÁS PADDING LATERAL
          flexShrink: 0,
          minWidth: isMobile ? 'min-content' : 'auto',
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
              width: isMobile ? '90px' : '110px' // 🔼 MÁS ANCHO
            }}
          >
            {/* ICONO MÁS GRANDE */}
            <div
              style={{
                width: isMobile ? '80px' : '100px', // 🔼 MÁS GRANDE
                height: isMobile ? '80px' : '100px', // 🔼 MÁS GRANDE
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}cc 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                marginBottom: '4px',
                overflow: 'hidden'
              }}
            >
              <category.icon 
                size={isMobile ? 42 : 52} // 🔼 ICONO MÁS GRANDE
                style={{ 
                  color: 'white',
                  transform: 'scale(1.2)' // 🔼 MÁS ESCALA
                }} 
              />
              
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                pointerEvents: 'none'
              }} />
            </div>

            <div style={{
              textAlign: 'center',
              width: '100%',
              height: isMobile ? '30px' : '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{
                fontSize: isMobile ? '0.75rem' : '0.85rem',
                fontWeight: '600',
                color: '#333',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: '1.1',
                padding: '0 2px',
                maxWidth: '100%',
                wordBreak: 'break-word'
              }}>
                {category.name.length > 15 ? `${category.name.substring(0, 13)}...` : category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="category-grid-container">
      <div style={{
        position: 'relative',
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '12px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)',
        padding: '4px 0 8px 0'
      }}>
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          style={{
            display: 'block',
            padding: '4px 0',
            overflowX: isMobile ? 'auto' : 'visible',
            overflowY: 'hidden',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            position: 'relative'
          }}
        >
          <div ref={rowsContainerRef} style={{ position: 'relative' }}>
            {renderIconRow(firstRow, 0)}
            
            <div style={{
              height: '0.3px',
              background: 'rgba(0,0,0,0.03)',
              margin: '2px 16px 3px 16px' // 🔼 MÁS MARGEN LATERAL
            }} />

            {renderIconRow(secondRow, 1)}
          </div>
        </div>

        {isMobile && (
          <>
            {canScrollLeft && (
              <button
                onClick={scrollLeft}
                style={{
                  position: 'absolute',
                  left: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                <FaChevronLeft size={12} />
              </button>
            )}

            {canScrollRight && (
              <button
                onClick={scrollRight}
                style={{
                  position: 'absolute',
                  right: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                <FaChevronRight size={12} />
              </button>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '6px',
              padding: '2px 0 6px 0',
              position: 'relative',
              zIndex: 10
            }}>
              {[0, 1, 2].map((dot, index) => {
                const isActive = index === Math.floor(scrollPosition / 300);
                return (
                  <div
                    key={index}
                    style={{
                      width: isActive ? '6px' : '4px',
                      height: isActive ? '6px' : '4px',
                      borderRadius: '50%',
                      background: isActive ? '#999' : '#ddd',
                      transition: 'all 0.3s ease'
                    }}
                  />
                );
              })}
            </div>
          </>
        )}

        <div style={{ display: 'none' }}></div>
      </div>

      <style>{`
        .category-grid-container ::-webkit-scrollbar {
          display: none;
        }
        .category-grid-container a:active div:first-child {
          transform: scale(0.95);
        }
        .category-grid-container * {
          touch-action: manipulation;
        }
        @media (max-width: 380px) {
          .category-grid-container a {
            width: 85px !important;
          }
          .category-grid-container a > div:first-child {
            width: 75px !important;
            height: 75px !important;
          }
          .category-grid-container svg {
            width: 38px !important;
            height: 38px !important;
          }
        }
        @media (min-width: 768px) {
          .category-grid-container a {
            width: 120px !important;
          }
          .category-grid-container a > div:first-child {
            width: 110px !important;
            height: 110px !important;
          }
          .category-grid-container svg {
            width: 58px !important;
            height: 58px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CategorySlider;