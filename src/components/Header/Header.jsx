import React from 'react';
import { DarkModeToggle } from '../DarkModeToggle/DarkModeToggle';
import { LanguageSelector } from '../LanguageSelector/LanguageSelector';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Header.module.css';

export function Header({ isDark, onToggleTheme }) {
  const { totalCount, toggleCart, formattedSubtotal } = useCart();
  const { t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <a href="#" className={styles.brand} aria-label="Sundry home">
          <span className={styles.brandName}>Sundry</span>
          <span className={styles.brandSubtitle}>{t('brandSubtitle', 'Cabinet of Goods')}</span>
        </a>

        <nav className={styles.nav} aria-label="Primary navigation">
          <a href="#drawer-detail" className={styles.navLink}>{t('navFeatured', 'Featured')}</a>
          <a href="#materials" className={styles.navLink}>{t('navMaterials', 'Materials (50)')}</a>
          <a href="#craft" className={styles.navLink}>{t('navCraft', 'Craft & Sourcing')}</a>
        </nav>

        <div className={styles.actions}>
          <LanguageSelector />

          {/* Cart / Tray Trigger Button */}
          <button
            type="button"
            className={styles.cartBtn}
            onClick={toggleCart}
            aria-label={`Open cabinet tray with ${totalCount} items`}
          >
            <span className={styles.cartIcon} aria-hidden="true">🛒</span>
            <span className={styles.cartLabel}>{t('tray', 'Tray')}</span>
            <span className={styles.cartBadge}>{totalCount}</span>
            {totalCount > 0 && (
              <span className={styles.cartSubtotal}>{formattedSubtotal}</span>
            )}
          </button>

          <DarkModeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
