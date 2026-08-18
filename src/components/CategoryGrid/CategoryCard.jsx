import React from 'react';
import styles from './CategoryGrid.module.css';

export function CategoryCard({ index, drawerNumber, material, items, description }) {
  return (
    <article
      className={styles.drawerCard}
      style={{ '--reveal-delay': `${index * 80}ms` }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.drawerIndex}>DRAWER {drawerNumber}</span>
        <div className={styles.cardMiniPull} aria-hidden="true"></div>
      </div>

      <h3 className={styles.cardTitle}>{material}</h3>
      <p className={styles.cardItems}>{items}</p>
      <p className={styles.cardDesc}>{description}</p>
      
      <div className={styles.cardFooter}>
        <span className={styles.cardExploreLink}>Explore material →</span>
      </div>
    </article>
  );
}
