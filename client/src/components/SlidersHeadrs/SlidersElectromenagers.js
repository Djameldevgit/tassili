import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mitad = Math.floor(categoriesData.length / 2);
  const firstRow = categoriesData.slice(0, mitad);
  const secondRow = categoriesData.slice(mitad);

  const syncScroll = (direction) => {
    if (scrollRef1.current && scrollRef2.current) {
      const itemWidth = isMobile ? 88 : 108;
      const scrollAmount = itemWidth * 2 * direction;
      scrollRef1.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      scrollRef2.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (!scrollRef1.current || !scrollRef2.current) return;
    
    const scroll1 = scrollRef1.current.scrollLeft;
    const scroll2 = scrollRef2.current.scrollLeft;
    const minScroll = Math.min(scroll1, scroll2);
    setCanScrollLeft(minScroll > 5);
    
    const maxScroll1 = scrollRef1.current.scrollWidth - scrollRef1.current.clientWidth;
    const maxScroll2 = scrollRef2.current.scrollWidth - scrollRef2.current.clientWidth;
    const canRight1 = scroll1 < maxScroll1 - 5;
    const canRight2 = scroll2 < maxScroll2 - 5;
    setCanScrollRight(canRight1 || canRight2);
  };

  return (
    <div className="category-grid-container">
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        border: '1px solid rgba(0,0,0,0.04)',
        padding: '8px 0 12px 0'
      }}>
        <div style={{ position: 'relative' }}>
          {/* PRIMERA FILA */}
          <div style={{ position: 'relative' }}>
            <div
              ref={scrollRef1}
              onScroll={handleScroll}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                padding: '6px 12px',
                gap: '8px',
                scrollbarWidth: 'none',
                alignItems: 'flex-start'
              }}
            >
              {firstRow.map((category) => (
                <CategoryItem key={category.id} category={category} isMobile={isMobile} />
              ))}
            </div>
          </div>
          
          {/* SEPARADOR CASI INVISIBLE */}
          <div style={{
            height: '0.5px',
            background: 'rgba(0,0,0,0.03)',
            margin: '2px 12px 4px 12px' // MÍNIMO MARGEN
          }} />
          
          {/* SEGUNDA FILA */}
          <div style={{ position: 'relative' }}>
            <div
              ref={scrollRef2}
              onScroll={handleScroll}
              style={{
                display: 'flex',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                WebkitOverflowScrolling: 'touch',
                padding: '4px 12px 6px 12px', // Padding reducido arriba
                gap: '8px',
                scrollbarWidth: 'none',
                alignItems: 'flex-start'
              }}
            >
              {secondRow.map((category) => (
                <CategoryItem key={category.id} category={category} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>

        {isMobile && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '12px',
            marginTop: '8px'
          }}>
            {canScrollLeft && (
              <button
                onClick={() => syncScroll(-1)}
                style={{
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
                onClick={() => syncScroll(1)}
                style={{
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
          </div>
        )}
      </div>

      <style>{`
        .category-grid-container ::-webkit-scrollbar {
          display: none;
        }
        .category-grid-container * {
          touch-action: manipulation;
        }
      `}</style>
    </div>
  );
};

const CategoryItem = ({ category, isMobile }) => (
  <Link
    to={`/category/${category.slug}`}
    style={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: isMobile ? '84px' : '94px'
    }}
  >
    <div style={{
      width: isMobile ? '74px' : '84px',
      height: isMobile ? '74px' : '84px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${category.color} 0%, ${category.color}cc 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      marginBottom: '6px',
      overflow: 'hidden'
    }}>
      <div style={{ 
        fontSize: isMobile ? '3rem' : '3.4rem',
        transform: 'scale(1.25)',
      }}>
        {category.emoji}
      </div>
    </div>
    <div style={{ 
      height: '32px', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    }}>
      <span style={{
        fontSize: isMobile ? '0.72rem' : '0.8rem',
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        lineHeight: '1.1',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {category.name}
      </span>
    </div>
  </Link>
);

export default CategorySliderEmoji;