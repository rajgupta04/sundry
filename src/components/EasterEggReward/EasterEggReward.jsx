import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import styles from './EasterEggReward.module.css';

const SECRET_ARTIFACT = {
  id: 'brass-secret-01',
  category: 'Brass',
  drawerNumber: '00',
  name: 'Guildmaster Solid Brass Wax Seal & Stamp',
  shapeType: 'brass-pull',
  price: '₹0 (Gift)',
  priceNum: 0,
  description: 'Forged from solid C3604 brass with an engraved antique monogram. Hand-finished for sealing letters with natural beeswax.',
  dimensions: '75 mm · 210g · Solid Raw Brass',
  origin: 'Aligarh Guild Archive (1892)',
  process: 'Hand-chiseled & lathe turned',
  materialSpec: 'Solid C3604 Brass · Engraved Monogram',
  weight: '210 grams',
  finish: 'Antique patina'
};

export function EasterEggReward({ isOpen, onClose }) {
  const { applyDiscountCode, addToCart, openCart } = useCart();
  const { t } = useLanguage();
  const [eggCracked, setEggCracked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [hasClaimedGift, setHasClaimedGift] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Trigger crack animation after 400ms
      const timer = setTimeout(() => {
        setEggCracked(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setEggCracked(false);
      setIsCopied(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyVoucher = () => {
    applyDiscountCode('ATELIER15');
    setIsCopied(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 600);
  };

  const handleClaimArtifact = () => {
    addToCart(SECRET_ARTIFACT);
    setHasClaimedGift(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 600);
  };

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Easter egg celebratory reward">
      
      {/* Confetti Explosion Particles */}
      <div className={styles.confettiContainer} aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className={styles.confettiParticle}
            style={{
              '--x': `${(Math.random() - 0.5) * 600}px`,
              '--y': `${-Math.random() * 500 - 100}px`,
              '--rot': `${Math.random() * 720}deg`,
              '--delay': `${Math.random() * 0.3}s`,
              '--color': ['#D4AF37', '#E8C85A', '#F3E5AB', '#FFF', '#C9A93E', '#8A7322'][i % 6]
            }}
          />
        ))}
      </div>

      <div className={styles.modalCard}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close reward popup"
        >
          ✕
        </button>

        {/* EGG CRACKING ANIMATION STAGE */}
        <div className={styles.eggContainer}>
          <div className={`${styles.goldenEgg} ${eggCracked ? styles.eggBroken : ''}`}>
            <div className={styles.eggShellLeft}>
              <div className={styles.crackSparks}></div>
            </div>
            <div className={styles.eggShellRight}>
              <div className={styles.crackSparks}></div>
            </div>
            <div className={styles.eggCoreGlow}>✨</div>
          </div>
        </div>

        <div className={styles.rewardContent}>
          <div className={styles.hurrayBadge}>
            <span>🎉 HURRAY! SECRET VAULT UNLOCKED 🎉</span>
          </div>

          <h2 className={styles.title}>You Found the False Bottom!</h2>
          <p className={styles.subtext}>
            In traditional Indian cabinet joinery, master craftsmen hid their personal hallmark and prized tokens beneath the 5th runner. Here are your discovery rewards:
          </p>

          {/* REWARD 1: 15% DISCOUNT VOUCHER */}
          <div className={styles.voucherCard}>
            <div className={styles.voucherHeader}>
              <span className={styles.voucherTag}>SECRET REWARD 01</span>
              <span className={styles.voucherPercent}>15% OFF ATELIER VOUCHER</span>
            </div>
            <p className={styles.voucherDesc}>
              Enjoy an authentic 15% craftsman discount on your entire order.
            </p>
            <div className={styles.codeRow}>
              <span className={styles.codeBox}>ATELIER15</span>
              <button
                type="button"
                className={styles.applyBtn}
                onClick={handleApplyVoucher}
              >
                {isCopied ? '✓ 15% Applied!' : 'Apply to Tray (15% Off) →'}
              </button>
            </div>
          </div>

          {/* REWARD 2: SECRET 51ST ARTIFACT */}
          <div className={styles.giftCard}>
            <div className={styles.giftMeta}>
              <span className={styles.giftTag}>SECRET REWARD 02 · 51st ARTIFACT</span>
              <h4 className={styles.giftTitle}>Solid Brass Guildmaster Wax Seal (1892)</h4>
              <span className={styles.giftSpecs}>75 mm · 210g Solid Raw Brass · Aligarh Atelier Archive</span>
            </div>
            <button
              type="button"
              className={styles.claimGiftBtn}
              onClick={handleClaimArtifact}
              disabled={hasClaimedGift}
            >
              {hasClaimedGift ? '✓ Placed in Tray' : '+ Claim Free Artifact (₹0)'}
            </button>
          </div>

          <button
            type="button"
            className={styles.continueBtn}
            onClick={onClose}
          >
            Return to Exploring Cabinet
          </button>
        </div>

      </div>
    </div>
  );
}
