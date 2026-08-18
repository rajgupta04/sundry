import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useLanguage } from '../../context/LanguageContext';
import styles from './CraftSection.module.css';

const CRAFT_STORIES = [
  {
    materialKey: 'Brass',
    region: 'Aligarh, Uttar Pradesh',
    heritageKey: 'craftBrassHeritage',
    descKey: 'craftBrassDesc'
  },
  {
    materialKey: 'Glass',
    region: 'Firozabad, Uttar Pradesh',
    heritageKey: 'craftGlassHeritage',
    descKey: 'craftGlassDesc'
  },
  {
    materialKey: 'Linen',
    region: 'European Flax & Local Apiaries',
    heritageKey: 'craftLinenHeritage',
    descKey: 'craftLinenDesc'
  }
];

export function CraftSection() {
  const sectionRef = useScrollReveal();
  const { t } = useLanguage();

  return (
    <section id="craft" className={styles.section} ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>{t('whereThingsComeFrom', 'WHERE THINGS COME FROM')}</span>
          <h2 className={styles.title}>{t('craftTitle', 'Craft & Provenance')}</h2>
          <p className={styles.subline}>
            {t('craftSubline', 'We do not invent heritage or publish fabricated reviews. Instead, we publish the exact origins, materials, and workshop processes behind every batch.')}
          </p>
        </div>

        <div className={styles.craftGrid}>
          {CRAFT_STORIES.map((story, idx) => (
            <article
              key={story.materialKey}
              className={styles.craftCard}
              style={{ '--reveal-delay': `${idx * 120}ms` }}
            >
              <div className={styles.cardAccentLine} aria-hidden="true" />
              <div className={styles.cardHeader}>
                <span className={styles.materialTag}>{t(story.materialKey, story.materialKey)}</span>
                <span className={styles.regionTag}>{story.region}</span>
              </div>
              <h3 className={styles.traditionTitle}>{t(story.heritageKey)}</h3>
              <p className={styles.narrativeText}>{t(story.descKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
