import React, { useState } from 'react';
import { PRODUCTS } from '../../data/products';
import { getTranslatedProduct } from '../../data/productTranslations';
import { ProductShape } from '../ProductShape/ProductShape';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CategoryGrid.module.css';

const CATEGORIES = [
  {
    drawerNumber: '01',
    material: 'Brass',
    itemsCount: '10 objects',
    origin: 'Aligarh, Uttar Pradesh',
    summary: 'Sand-cast solid brass. Lathe knurled, unlacquered for natural patina.'
  },
  {
    drawerNumber: '02',
    material: 'Glass',
    itemsCount: '10 objects',
    origin: 'Firozabad, Uttar Pradesh',
    summary: 'Laboratory-grade borosilicate 3.3. Thermal shock safe and crystal clear.'
  },
  {
    drawerNumber: '03',
    material: 'Linen',
    itemsCount: '10 objects',
    origin: 'Normandy & Baltic Flax',
    summary: '100% long-staple flax yarn. Washed with river pumice, zero chemical softeners.'
  },
  {
    drawerNumber: '04',
    material: 'Wax',
    itemsCount: '10 objects',
    origin: 'Local Apiaries & Soy Blend',
    summary: '70/30 unbleached beeswax and soy. Natural honey aroma, zero paraffin.'
  },
  {
    drawerNumber: '05',
    material: 'Paper',
    itemsCount: '10 objects',
    origin: 'Vat Rag Mills & Heidelberg Press',
    summary: 'Cotton-rag offcuts and acid-free fiber. Opens flat, fountain pen friendly.'
  }
];

export function CategoryGrid() {
  const [activeMaterial, setActiveMaterial] = useState('Brass');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const sectionRef = useScrollReveal();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  const filteredProducts = PRODUCTS.filter(p => p.category === activeMaterial);
  const activeCategoryInfo = CATEGORIES.find(c => c.material === activeMaterial);

  return (
    <section id="materials" className={styles.section} ref={sectionRef}>
      <div className="container">
        
        {/* Section Header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.tag}>{t('materialsTag', 'THE FULL CABINET · 50 OBJECTS')}</span>
            <span className={styles.statusBadge}>{t('itemsPerDrawer', '10 Items per Drawer')}</span>
          </div>
          <h2 className={styles.title}>{t('sortedByMaterial', 'Sorted by material')}</h2>
          <p className={styles.subline}>
            {t('materialSectionSubline', 'Not by room, not by use — by what it is made of. Select any drawer below to pull out its full 10-piece tray of honest, verified goods. All prices in Indian Rupees (₹).')}
          </p>
        </div>

        {/* Five Material Drawer Cards (The Cabinet Top) */}
        <div className={styles.drawersRow} role="tablist" aria-label="Material cabinet drawers">
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeMaterial === cat.material;
            return (
              <button
                key={cat.material}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`drawer-panel-${cat.material}`}
                className={`${styles.drawerCard} ${isActive ? styles.drawerCardActive : ''}`}
                style={{ '--reveal-delay': `${idx * 60}ms` }}
                onClick={() => setActiveMaterial(cat.material)}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.drawerIndex}>{t('drawer', 'DRAWER')} {cat.drawerNumber}</span>
                  <div className={`${styles.cardMiniPull} ${isActive ? styles.pullActive : ''}`} aria-hidden="true"></div>
                </div>

                <h3 className={styles.cardTitle}>{t(cat.material, cat.material)}</h3>
                <div className={styles.cardMetaRow}>
                  <span className={styles.cardItems}>{cat.itemsCount}</span>
                  <span className={styles.cardOrigin}>{cat.origin.split(',')[0]}</span>
                </div>
                
                <p className={styles.cardDesc}>{cat.summary}</p>
                
                <div className={styles.cardFooter}>
                  <span className={styles.cardExploreLink}>
                    {isActive ? t('trayOpen', 'Tray open ↓') : t('pullDrawer', 'Pull drawer →')}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* THE OPEN DRAWER TRAY (All 10 items for the selected material) */}
        <div
          id={`drawer-panel-${activeMaterial}`}
          role="tabpanel"
          className={styles.openTrayContainer}
        >
          <div className={styles.trayHeader}>
            <div className={styles.trayTitleGroup}>
              <div className={styles.trayBadge}>
                {t('drawer', 'DRAWER')} {activeCategoryInfo?.drawerNumber} · {t(activeMaterial, activeMaterial).toUpperCase()} {t('tray', 'TRAY').toUpperCase()}
              </div>
              <h3 className={styles.trayHeading}>
                10 {t(activeMaterial, activeMaterial)} objects in current batch
              </h3>
              <p className={styles.traySubtext}>
                Crafted in {activeCategoryInfo?.origin} · Guaranteed solid {activeMaterial.toLowerCase()} with zero synthetic veneers.
              </p>
            </div>

            <div className={styles.trayStats}>
              <span className={styles.statPill}>{t('verifiableProvenance', '100% Verifiable Provenance')}</span>
              <span className={styles.statPill}>{t('noSynthetics', 'No Plastics / Synthetics')}</span>
            </div>
          </div>

          {/* 10 Products Grid */}
          <div className={styles.productsGrid}>
            {filteredProducts.map((rawProd) => {
              const prod = getTranslatedProduct(rawProd, language);
              return (
                <article
                  key={prod.id}
                  className={styles.productCard}
                  tabIndex="0"
                  role="region"
                  aria-label={prod.name}
                >
                  <div
                    className={styles.productShapeWrap}
                    onClick={() => setSelectedProduct(prod)}
                    title="Click to view complete workshop specifications"
                  >
                    <ProductShape type={prod.shapeType} />
                    <span className={styles.quickInspectTag}>{t('inspectSpecs', 'Inspect specs ↗')}</span>
                  </div>

                  <div className={styles.productInfo}>
                    <div className={styles.productNamePrice}>
                      <h4
                        className={styles.productTitle}
                        onClick={() => setSelectedProduct(prod)}
                      >
                        {prod.name}
                      </h4>
                      <span className={styles.productPrice}>{prod.price}</span>
                    </div>

                    <p className={styles.productShortDesc}>{prod.description}</p>

                    <div className={styles.productSpecsList}>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>{t('dimensions', 'Dimension')}:</span>
                        <span className={styles.specValue}>{prod.dimensions}</span>
                      </div>
                      <div className={styles.specItem}>
                        <span className={styles.specLabel}>{t('toolingProcess', 'Process')}:</span>
                        <span className={styles.specValue}>{prod.process}</span>
                      </div>
                    </div>

                    <div className={styles.cardActionsRow}>
                      <button
                        type="button"
                        className={styles.specInspectBtn}
                        onClick={() => setSelectedProduct(prod)}
                      >
                        {t('specsBtn', 'Specs')}
                      </button>
                      <button
                        type="button"
                        className={styles.cardAddBtn}
                        onClick={() => addToCart(prod)}
                        aria-label={`Add ${prod.name} to tray for ${prod.price}`}
                      >
                        {t('placeInTray', '+ Place in Tray')} ({prod.price})
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* PRODUCT SPECIFICATION MODAL */}
        {selectedProduct && (() => {
          const prodModal = getTranslatedProduct(selectedProduct, language);
          return (
            <div
              className={styles.modalBackdrop}
              onClick={() => setSelectedProduct(null)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-product-title"
            >
              <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className={styles.modalCloseBtn}
                  onClick={() => setSelectedProduct(null)}
                  aria-label="Close specification modal"
                >
                  ✕
                </button>

                <div className={styles.modalInner}>
                  <div className={styles.modalVisual}>
                    <ProductShape type={prodModal.shapeType} className={styles.modalShape} />
                    <div className={styles.modalPriceTag}>{prodModal.price}</div>
                    <button
                      type="button"
                      className={styles.modalAddToCartBtn}
                      onClick={() => {
                        addToCart(prodModal);
                        setSelectedProduct(null);
                      }}
                    >
                      {t('placeInTray', '+ Place in Tray')} ({prodModal.price})
                    </button>
                  </div>

                  <div className={styles.modalDetails}>
                    <span className={styles.modalDrawerTag}>
                      {t('drawer', 'DRAWER')} {prodModal.drawerNumber} · {t(prodModal.category, prodModal.category).toUpperCase()}
                    </span>
                    <h3 id="modal-product-title" className={styles.modalTitle}>
                      {prodModal.name}
                    </h3>
                    <p className={styles.modalDesc}>{prodModal.description}</p>

                    <div className={styles.specGrid}>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('materialGrade', 'Material Grade')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.materialSpec}</span>
                      </div>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('workshopOrigin', 'Workshop Origin')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.origin}</span>
                      </div>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('dimensions', 'Dimensions')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.dimensions}</span>
                      </div>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('weight', 'Weight')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.weight}</span>
                      </div>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('toolingProcess', 'Tooling & Process')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.process}</span>
                      </div>
                      <div className={styles.modalSpecBlock}>
                        <span className={styles.modalSpecKey}>{t('surfaceFinish', 'Surface Finish')}</span>
                        <span className={styles.modalSpecVal}>{prodModal.finish}</span>
                      </div>
                    </div>

                    <div className={styles.modalFooterNote}>
                      <span>{t('modalNote', 'Verifiable workshop batch. Direct insured dispatch in Indian Rupees.')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}
