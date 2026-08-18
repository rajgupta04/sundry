import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { EasterEggReward } from '../EasterEggReward/EasterEggReward';
import styles from './Footer.module.css';

export function Footer() {
  const [clickCount, setClickCount] = useState(0);
  const [showFalseBottom, setShowFalseBottom] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const { t } = useLanguage();

  const handleLogoClick = (e) => {
    e.preventDefault();
    const next = clickCount + 1;
    setClickCount(next);

    if (next >= 5) {
      setShowFalseBottom(true);
      setShowRewardModal(true);
      setClickCount(5);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <button
              type="button"
              className={`${styles.footerLogoBtn} ${clickCount > 0 ? styles.logoCracking : ''}`}
              onClick={handleLogoClick}
              title="Tap 5 times to crack the cabinet's antique master seal"
              aria-label="Sundry brand footer logo"
            >
              <span className={styles.footerLogoText}>Sundry</span>
              {clickCount > 0 && clickCount < 5 && (
                <span className={styles.crackBadge}>
                  🔨 {clickCount}/5 (Tap {5 - clickCount} more times!)
                </span>
              )}
            </button>
            <p className={styles.footerTagline}>
              {t('footerTagline', 'A considered-goods shop. 50 objects across Brass, Glass, Linen, Wax, and Paper.')}
            </p>
          </div>

          <div className={styles.footerNavGroup}>
            <div className={styles.footerCol}>
              <h4 className={styles.colHeading}>Cabinet Trays</h4>
              <ul className={styles.linkList}>
                <li><a href="#materials">01 · {t('Brass', 'Brass')} (10)</a></li>
                <li><a href="#materials">02 · {t('Glass', 'Glass')} (10)</a></li>
                <li><a href="#materials">03 · {t('Linen', 'Linen')} (10)</a></li>
                <li><a href="#materials">04 · {t('Wax', 'Wax')} (10)</a></li>
                <li><a href="#materials">05 · {t('Paper', 'Paper')} (10)</a></li>
              </ul>
            </div>

            <div className={styles.footerCol}>
              <h4 className={styles.colHeading}>Principles</h4>
              <ul className={styles.linkList}>
                <li><span>Zero Synthetics</span></li>
                <li><span>Verifiable Workshops</span></li>
                <li><span>No Paid Reviews</span></li>
                <li><span>Honest Restraint</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* THE FALSE BOTTOM EASTER EGG COMPARTMENT */}
        <div className={`${styles.falseBottom} ${showFalseBottom ? styles.falseBottomOpen : ''}`}>
          <div className={styles.falseBottomContent}>
            <div className={styles.falseBottomBadge}>
              <span className={styles.falseBottomKey}>{t('secretCompartment', 'SECRET COMPARTMENT:')}</span>
              <span className={styles.falseBottomTag}>AUTHENTIC JOINERY</span>
              <button
                type="button"
                className={styles.viewRewardAgainBtn}
                onClick={() => setShowRewardModal(true)}
              >
                🎉 View Secret Rewards (15% Voucher &amp; Free Gift)
              </button>
            </div>
            <p className={styles.falseBottomMsg}>
              {t('easterEggMsg', '"You found the cabinet\'s false bottom. In traditional woodcraft, a secret drawer beneath the bottom runner stores the master craftsman\'s mark." — S.')}
            </p>
            <button
              type="button"
              className={styles.closeEggBtn}
              onClick={() => {
                setShowFalseBottom(false);
                setClickCount(0);
              }}
            >
              Slide closed ✕
            </button>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.antiTrackingNote}>
            {t('noTracking', 'No tracking cookies. No telemetry. No newsletter popup. Just 50 considered goods.')}
          </p>
          <div className={styles.metaInfo}>
            <span>© 2026 Sundry</span>
            <span className={styles.metaDot}>·</span>
            <span>Single-page React / CSS 3D</span>
          </div>
        </div>

      </div>

      {/* CELEBRATORY HURRAY & EGG CRACKING REWARD MODAL */}
      <EasterEggReward
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
      />
    </footer>
  );
}
