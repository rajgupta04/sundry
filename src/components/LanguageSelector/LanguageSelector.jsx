import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LanguageSelector.module.css';

export function LanguageSelector() {
  const { language, setLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTriggerLocationDetect = () => {
    setIsOpen(false);
    try {
      localStorage.removeItem('sundry-loc-prompt-dismissed');
      window.dispatchEvent(new CustomEvent('sundry-open-loc-prompt'));
    } catch {}
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.triggerBtn} ${isOpen ? styles.triggerActive : ''}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select website language"
        title="Language / भाषा"
      >
        <span className={styles.globeIcon} aria-hidden="true">🌐</span>
        <span className={styles.langLabel}>{currentLangObj.native}</span>
        <span className={styles.arrowIcon} aria-hidden="true">{isOpen ? '▴' : '▾'}</span>
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu} role="listbox" aria-label="Available languages">
          <li
            className={styles.locationDetectOption}
            onClick={handleTriggerLocationDetect}
          >
            <span>📍 Detect from Location</span>
          </li>
          <li className={styles.divider}></li>
          {languages.map((l) => (
            <li
              key={l.code}
              role="option"
              aria-selected={l.code === language}
              className={`${styles.langOption} ${l.code === language ? styles.optionActive : ''}`}
              onClick={() => {
                setLanguage(l.code);
                setIsOpen(false);
              }}
            >
              <span className={styles.nativeName}>{l.native}</span>
              <span className={styles.engName}>{l.label}</span>
              {l.code === language && <span className={styles.checkMark}>✓</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
