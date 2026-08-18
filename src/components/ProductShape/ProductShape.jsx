import React from 'react';
import styles from './ProductShape.module.css';

export function ProductShape({ type = 'brass-pull', className = '' }) {
  // Category-based fallback or specialized rendering
  if (type === 'brass-pull') {
    return (
      <div className={`${styles.frame} ${styles.brassFrame} ${className}`} aria-label="Brass knurled drawer pull">
        <div className={styles.brassPullComp}>
          <div className={styles.brassMountLeft}></div>
          <div className={styles.brassRod}>
            <div className={styles.knurlingPattern}></div>
          </div>
          <div className={styles.brassMountRight}></div>
        </div>
      </div>
    );
  }

  if (type === 'glass-tumbler') {
    return (
      <div className={`${styles.frame} ${styles.glassFrame} ${className}`} aria-label="Borosilicate glass tumbler">
        <div className={styles.glassTumblerComp}>
          <div className={styles.glassBody}>
            <div className={styles.glassRim}></div>
            <div className={styles.glassReflection}></div>
            <div className={styles.glassBase}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'wax-taper') {
    return (
      <div className={`${styles.frame} ${styles.waxFrame} ${className}`} aria-label="Hand-dipped beeswax candle">
        <div className={styles.waxTaperComp}>
          <div className={styles.flame}></div>
          <div className={styles.wick}></div>
          <div className={styles.waxBody}>
            <div className={styles.waxHighlight}></div>
          </div>
          <div className={styles.waxHolder}></div>
        </div>
      </div>
    );
  }

  // Generic and specialized representations based on prefix
  if (type.startsWith('brass')) {
    return (
      <div className={`${styles.frame} ${styles.brassFrame} ${className}`} aria-label="Brass object illustration">
        <div className={styles.brassGenericComp}>
          <div className={styles.brassPlate}>
            <div className={styles.brassKnurledDetail}></div>
            <div className={styles.brassInlayLine}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type.startsWith('glass')) {
    return (
      <div className={`${styles.frame} ${styles.glassFrame} ${className}`} aria-label="Glass object illustration">
        <div className={styles.glassGenericComp}>
          <div className={styles.glassVessel}>
            <div className={styles.glassRim}></div>
            <div className={styles.glassReflection}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type.startsWith('linen')) {
    return (
      <div className={`${styles.frame} ${styles.linenFrame} ${className}`} aria-label="Linen fabric illustration">
        <div className={styles.linenComp}>
          <div className={styles.linenFoldLayer1}></div>
          <div className={styles.linenFoldLayer2}>
            <div className={styles.linenWeaveTexture}></div>
          </div>
        </div>
      </div>
    );
  }

  if (type.startsWith('wax')) {
    return (
      <div className={`${styles.frame} ${styles.waxFrame} ${className}`} aria-label="Beeswax candle illustration">
        <div className={styles.waxGenericComp}>
          <div className={styles.flameSmall}></div>
          <div className={styles.wick}></div>
          <div className={styles.waxPillarBlock}></div>
        </div>
      </div>
    );
  }

  if (type.startsWith('paper')) {
    return (
      <div className={`${styles.frame} ${styles.paperFrame} ${className}`} aria-label="Paper stationery illustration">
        <div className={styles.paperComp}>
          <div className={styles.paperSheetBack}></div>
          <div className={styles.paperSheetFront}>
            <div className={styles.paperGridLines}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.frame} ${className}`}>
      <div className={styles.placeholderDot}></div>
    </div>
  );
}
