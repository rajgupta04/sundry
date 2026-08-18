import React, { useState, useEffect, useRef } from 'react';
import { ProductShape } from '../ProductShape/ProductShape';
import { getTranslatedProduct } from '../../data/productTranslations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './HeroDrawer.module.css';

const RAW_FEATURED_ITEMS = [
  {
    id: 'brass-01',
    category: 'Brass',
    drawerNumber: '01',
    name: 'Drawer pull, knurled edge',
    shapeType: 'brass-pull',
    price: '₹1,450',
    priceNum: 1450,
    desc: 'Solid brass, sand-cast in Aligarh. The knurling is cut on a lathe, not stamped. Uncoated — it will patina naturally with handling.',
    specs: '64 mm · Sand-cast · Raw brass'
  },
  {
    id: 'glass-01',
    category: 'Glass',
    drawerNumber: '02',
    name: 'Borosilicate tumbler, 300 ml',
    shapeType: 'glass-tumbler',
    price: '₹1,100',
    priceNum: 1100,
    desc: 'Lab-grade borosilicate glass. Thin-walled, won\'t crack with boiling water. No logo, no branding on the glass itself.',
    specs: '300 ml · Thermal shock safe · Clear'
  },
  {
    id: 'wax-01',
    category: 'Wax',
    drawerNumber: '04',
    name: 'Wax-dipped taper, undyed',
    shapeType: 'wax-taper',
    price: '₹1,350',
    priceNum: 1350,
    desc: 'Beeswax and soy blend, hand-dipped in small batches. Burns about 8 hours. The color is the natural wax — no dye or fragrance added.',
    specs: '8 hr burn · Hand-dipped · Natural wax'
  }
];

export function HeroDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  useEffect(() => {
    if (isOpen) return;

    const el = heroRef.current;
    if (!el) return;

    const handleScrollOrTouch = () => {
      setIsOpen(true);
    };

    el.addEventListener('wheel', handleScrollOrTouch, { passive: true, once: true });
    el.addEventListener('touchstart', handleScrollOrTouch, { passive: true, once: true });

    return () => {
      el.removeEventListener('wheel', handleScrollOrTouch);
      el.removeEventListener('touchstart', handleScrollOrTouch);
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <section className={styles.heroSection} ref={heroRef} aria-label="Cabinet drawer hero">
      <div className="container">
        
        {/* Helper cue above cabinet */}
        <div className={styles.cabinetLabelContainer}>
          <span className={styles.cabinetCabinetTag}>{t('drawer01Tag', 'DRAWER 01 — FEATURED GOODS')}</span>
          <span className={styles.cabinetStateBadge}>
            {isOpen ? t('drawerOpenState', 'Drawer open') : t('drawerClosedState', 'Scroll or tap CTA to open')}
          </span>
        </div>

        {/* 3D Viewport container with perspective */}
        <div className={styles.drawerViewport}>
          <div className={`${styles.drawerAssembly} ${isOpen ? styles.assemblyOpen : ''}`}>
            
            {/* DRAWER FACE (Front panel that hinges down) */}
            <div
              className={`${styles.drawerFace} ${isOpen ? styles.faceOpen : ''}`}
              aria-hidden={isOpen}
            >
              <div className={styles.brassHandleBar}>
                <div className={styles.brassHandlePull}></div>
              </div>

              <span className={styles.label}>SUNDRY</span>
              <h1 className={styles.headline}>
                {t('heroHeadline', 'A cabinet of considered goods')}
              </h1>
              <p className={styles.subline}>
                {t('heroSubline', 'Brass hardware, glassware, linens, candles, and stationery — 50 objects sorted by material, not by room. Direct workshop dispatch.')}
              </p>
              
              <div className={styles.ctaGroup}>
                <button
                  type="button"
                  className={styles.primaryCta}
                  onClick={() => setIsOpen(true)}
                  aria-label="Open the cabinet drawer to inspect featured objects"
                >
                  <span className={styles.ctaText}>{t('openCabinetCta', 'Open the cabinet')}</span>
                  <span className={styles.ctaArrow} aria-hidden="true">↓</span>
                </button>
              </div>

              <div className={styles.drawerFaceFooter}>
                <span className={styles.spec}>{t('catalogCountSpec', '50 CATALOG OBJECTS')}</span>
                <span className={styles.specDot}>·</span>
                <span className={styles.spec}>{t('solidMaterialsSpec', 'SOLID MATERIALS ONLY')}</span>
                <span className={styles.specDot}>·</span>
                <span className={styles.spec}>{t('directDispatchSpec', 'DIRECT DISPATCH (₹)')}</span>
              </div>
            </div>

            {/* DRAWER INTERIOR (Revealed objects inside) */}
            <div
              className={`${styles.drawerInterior} ${isOpen ? styles.interiorOpen : ''}`}
              aria-hidden={!isOpen}
            >
              <div className={styles.interiorHeader}>
                <div className={styles.interiorTitleGroup}>
                  <span className={styles.interiorTag}>{t('insideDrawer01', 'INSIDE DRAWER 01')}</span>
                  <h2 className={styles.interiorHeading}>
                    {t('threeFeaturedItems', 'Three featured items from the 50-piece collection')}
                  </h2>
                </div>
                <div className={styles.interiorActions}>
                  <a href="#materials" className={styles.browseAllLink}>
                    {t('browseAll50Goods', 'Browse all 50 goods ↓')}
                  </a>
                  <button
                    type="button"
                    className={styles.closeDrawerBtn}
                    onClick={toggleDrawer}
                    aria-label="Close the cabinet drawer"
                  >
                    {t('closeDrawer', 'Close drawer ✕')}
                  </button>
                </div>
              </div>

              <div className={styles.goodsGrid}>
                {RAW_FEATURED_ITEMS.map((rawItem) => {
                  const item = getTranslatedProduct(rawItem, language);
                  return (
                    <article key={item.id} className={styles.goodItem}>
                      <div className={styles.shapeWrapper}>
                        <ProductShape type={item.shapeType} />
                      </div>
                      <div className={styles.goodMeta}>
                        <div className={styles.goodHeaderRow}>
                          <span className={styles.materialTag}>{t(item.category, item.category)}</span>
                          <span className={styles.goodPrice}>{item.price}</span>
                        </div>
                        <h3 className={styles.goodName}>{item.name}</h3>
                        <p className={styles.goodDesc}>{item.description || item.desc}</p>
                        
                        <div className={styles.goodActionRow}>
                          <span className={styles.specsText}>{item.specs || item.process}</span>
                          <button
                            type="button"
                            className={styles.addToTrayBtn}
                            onClick={() => addToCart(item)}
                            aria-label={`Add ${item.name} to tray for ${item.price}`}
                          >
                            {t('addBtn', '+ Add')} {item.price}
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* SHADOW ELEMENT */}
            <div
              className={`${styles.drawerShadow} ${isOpen ? styles.shadowOpen : ''}`}
              aria-hidden="true"
            />

          </div>
        </div>

      </div>
    </section>
  );
}
