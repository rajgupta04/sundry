import React from 'react';
import { ProductShape } from '../ProductShape/ProductShape';
import { getTranslatedProduct } from '../../data/productTranslations';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './ProductDetail.module.css';

const RAW_PRODUCTS = [
  {
    id: 'brass-01',
    category: 'Brass',
    drawerNumber: '01',
    name: 'Knurled drawer pull — 64 mm',
    shapeType: 'brass-pull',
    price: '₹1,450',
    priceNum: 1450,
    description:
      'Solid brass, sand-cast in Aligarh. The diamond knurling is machined on a lathe rather than stamped, giving deep purchase without sharp burrs. Left raw and uncoated so it will patina naturally with handling.',
    specs: [
      { label: 'Length', value: '64 mm center-to-center' },
      { label: 'Material', value: 'Solid C3604 brass' },
      { label: 'Process', value: 'Sand-cast & lathe knurled' },
      { label: 'Finish', value: 'Uncoated, natural patina' }
    ]
  },
  {
    id: 'glass-01',
    category: 'Glass',
    drawerNumber: '02',
    name: 'Borosilicate tumbler — 300 ml',
    shapeType: 'glass-tumbler',
    price: '₹1,100',
    priceNum: 1100,
    description:
      'Laboratory-grade borosilicate glass, mouth-blown into graphite molds in Firozabad. Chosen specifically for thermal shock resistance: withstands boiling water directly without pre-heating. Pure clarity with zero branding printed or etched on the body.',
    specs: [
      { label: 'Capacity', value: '300 ml / 10.1 fl oz' },
      { label: 'Material', value: 'Borosilicate 3.3 glass' },
      { label: 'Process', value: 'Mouth-blown, fire-polished rim' },
      { label: 'Thermal range', value: '-20°C to +150°C' }
    ]
  },
  {
    id: 'wax-01',
    category: 'Wax',
    drawerNumber: '04',
    name: 'Hand-dipped taper candle — Undyed',
    shapeType: 'wax-taper',
    price: '₹1,350',
    priceNum: 1350,
    description:
      'A proprietary blend of 70% unbleached beeswax and 30% soy wax. Dipped continuously over cotton wicks in small batches of twelve. Clean, dripless burn when kept away from direct draft. Natural honey-toned aroma without added fragrances.',
    specs: [
      { label: 'Burn time', value: 'Approximately 8 hours' },
      { label: 'Composition', value: '70% beeswax, 30% soy' },
      { label: 'Wick', value: '100% unbleached braided cotton' },
      { label: 'Additive', value: 'Zero paraffin, zero synthetics' }
    ]
  }
];

export function ProductDetail() {
  const sectionRef = useScrollReveal();
  const { addToCart } = useCart();
  const { language, t } = useLanguage();

  return (
    <section id="drawer-detail" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>{t('showDontClaim', "SHOW, DON'T CLAIM")}</span>
          <h2 className={styles.sectionTitle}>{t('insideCollection', 'Inside the collection')}</h2>
          <p className={styles.sectionDescription}>
            {t('insideCollectionSubline', 'Every object is built around its primary material. No decorative veneers, no deceptive finishes, no synthetic fillers. All prices in Indian Rupees (₹).')}
          </p>
        </div>

        <div className={styles.detailGrid}>
          {RAW_PRODUCTS.map((rawProduct, idx) => {
            const product = getTranslatedProduct(rawProduct, language);
            return (
              <article
                key={product.id}
                className={styles.detailCard}
                style={{ '--reveal-delay': `${idx * 100}ms` }}
              >
                <div className={styles.visualContainer}>
                  <ProductShape type={product.shapeType} className={styles.cardShape} />
                </div>

                <div className={styles.contentContainer}>
                  <div className={styles.tagPriceRow}>
                    <span className={styles.materialTag}>{t(product.category, product.category)}</span>
                    <span className={styles.priceTag}>{product.price}</span>
                  </div>

                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>

                  <div className={styles.specTable}>
                    {product.specs.map((s, sIdx) => (
                      <div key={sIdx} className={styles.specRow}>
                        <span className={styles.specKey}>{s.label}</span>
                        <span className={styles.specVal}>{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className={styles.actionRow}>
                    <button
                      type="button"
                      className={styles.addToCartBtn}
                      onClick={() => addToCart(product)}
                      aria-label={`Add ${product.name} to tray for ${product.price}`}
                    >
                      {t('placeInTray', '+ Place in Tray')} ({product.price})
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
