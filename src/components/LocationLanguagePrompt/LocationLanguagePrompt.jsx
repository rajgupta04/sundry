import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './LocationLanguagePrompt.module.css';

const STATE_LANGUAGE_MAP = [
  { state: 'West Bengal', code: 'bn', langName: 'বাংলা (Bengali)', greeting: 'স্বাগতম' },
  { state: 'Maharashtra', code: 'mr', langName: 'मराठी (Marathi)', greeting: 'स्वागत आहे' },
  { state: 'Punjab', code: 'pa', langName: 'ਪੰਜਾਬੀ (Punjabi)', greeting: 'ਜੀ ਆਇਆਂ ਨੂੰ' },
  { state: 'Karnataka', code: 'kn', langName: 'ಕನ್ನಡ (Kannada)', greeting: 'ಸ್ವಾಗತ' },
  { state: 'Tamil Nadu', code: 'ta', langName: 'தமிழ் (Tamil)', greeting: 'வரவேற்கிறோம்' },
  { state: 'Telangana & AP', code: 'te', langName: 'తెలుగు (Telugu)', greeting: 'స్వాగతం' },
  { state: 'Uttar Pradesh & Delhi', code: 'hi', langName: 'हिन्दी (Hindi)', greeting: 'स्वागत है' },
  { state: 'Jammu & Kashmir', code: 'ur', langName: 'اردو (Urdu)', greeting: 'خوش آمدید' }
];

export function LocationLanguagePrompt() {
  const { language, setLanguage, languages } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [detectedState, setDetectedState] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showStatePicker, setShowStatePicker] = useState(false);

  useEffect(() => {
    // Listen for manual trigger from Language dropdown
    const handleOpenEvent = () => {
      setDetectedState(null);
      setShowStatePicker(false);
      setIsVisible(true);
    };
    window.addEventListener('sundry-open-loc-prompt', handleOpenEvent);

    // Check if user has already made a location/language choice in localStorage
    try {
      const dismissed = localStorage.getItem('sundry-loc-prompt-dismissed');
      if (dismissed) return;
    } catch {}

    // Automatically prompt location detection after gentle 1.2s delay on first visit
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => {
      window.removeEventListener('sundry-open-loc-prompt', handleOpenEvent);
      clearTimeout(timer);
    };
  }, []);

  const detectLocationByGPS = () => {
    if (!navigator.geolocation) {
      setShowStatePicker(true);
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        let matched = null;

        // Approximate geographic bounding mapping for Indian states
        if (lat >= 21.5 && lat <= 27.5 && lng >= 85.5 && lng <= 89.8) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'bn'); // West Bengal
        } else if (lat >= 15.5 && lat <= 22.0 && lng >= 72.5 && lng <= 80.9) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'mr'); // Maharashtra
        } else if (lat >= 29.5 && lat <= 32.5 && lng >= 73.8 && lng <= 77.0) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'pa'); // Punjab
        } else if (lat >= 11.5 && lat <= 18.5 && lng >= 74.0 && lng <= 78.6) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'kn'); // Karnataka
        } else if (lat >= 8.0 && lat <= 13.5 && lng >= 76.2 && lng <= 80.4) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'ta'); // Tamil Nadu
        } else if (lat >= 13.5 && lat <= 19.9 && lng >= 76.8 && lng <= 84.8) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'te'); // Telangana / AP
        } else if (lat >= 32.0 && lat <= 37.0 && lng >= 73.0 && lng <= 80.0) {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'ur'); // J&K
        } else {
          matched = STATE_LANGUAGE_MAP.find(s => s.code === 'hi'); // North/Central India default
        }

        setIsDetecting(false);
        if (matched) {
          setDetectedState(matched);
        } else {
          setShowStatePicker(true);
        }
      },
      (err) => {
        setIsDetecting(false);
        setShowStatePicker(true);
      },
      { timeout: 8000 }
    );
  };

  const handleSwitchLanguage = (langCode) => {
    setLanguage(langCode);
    dismissPrompt();
  };

  const dismissPrompt = () => {
    setIsVisible(false);
    try {
      localStorage.setItem('sundry-loc-prompt-dismissed', 'true');
    } catch {}
  };

  if (!isVisible) return null;

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true" aria-label="Location and language selector">
      <div className={styles.modalCard}>
        
        {/* Brass Header Handle Decoration */}
        <div className={styles.brassPin}></div>

        <button
          type="button"
          className={styles.closeBtn}
          onClick={dismissPrompt}
          aria-label="Dismiss location popup"
        >
          ✕
        </button>

        {/* Initial Prompt / Asking State */}
        {!detectedState && !showStatePicker && (
          <div className={styles.promptBody}>
            <div className={styles.locationIconWrap}>
              <span className={styles.locationIcon}>📍</span>
            </div>

            <span className={styles.tag}>LOCATION PREFERENCE</span>
            <h3 className={styles.title}>Browse in Your Regional Language?</h3>
            <p className={styles.subtitle}>
              Sundry supports 9 Indian languages. Allow location detection to view honest handcrafted goods in your state's native language, or choose manually.
            </p>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.primaryDetectBtn}
                onClick={detectLocationByGPS}
                disabled={isDetecting}
              >
                {isDetecting ? 'Detecting Location...' : '📍 Detect My State & Language'}
              </button>

              <button
                type="button"
                className={styles.secondaryPickerBtn}
                onClick={() => setShowStatePicker(true)}
              >
                Choose State Manually →
              </button>

              <button
                type="button"
                className={styles.skipBtn}
                onClick={dismissPrompt}
              >
                Continue in {currentLangObj.native}
              </button>
            </div>
          </div>
        )}

        {/* Detected State Prompt State */}
        {detectedState && (
          <div className={styles.promptBody}>
            <div className={styles.greetingPill}>
              <span>{detectedState.greeting}</span>
            </div>

            <span className={styles.tag}>LOCATION DETECTED</span>
            <h3 className={styles.title}>Visiting from {detectedState.state}?</h3>
            <p className={styles.subtitle}>
              Would you like to switch the cabinet interface and all 50 workshop items to <strong>{detectedState.langName}</strong>?
            </p>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.primaryDetectBtn}
                onClick={() => handleSwitchLanguage(detectedState.code)}
              >
                Switch to {detectedState.langName}
              </button>

              <button
                type="button"
                className={styles.secondaryPickerBtn}
                onClick={dismissPrompt}
              >
                Continue in {currentLangObj.native} ({currentLangObj.label})
              </button>
            </div>
          </div>
        )}

        {/* Manual State Picker State */}
        {showStatePicker && (
          <div className={styles.promptBody}>
            <span className={styles.tag}>SELECT YOUR REGION</span>
            <h3 className={styles.title}>Select Your State Language</h3>
            <p className={styles.subtitle}>
              Choose a region to adapt all catalog titles, workshop descriptions, and cart currency to your preference:
            </p>

            <div className={styles.statesGrid}>
              {STATE_LANGUAGE_MAP.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  className={`${styles.stateItemBtn} ${language === item.code ? styles.stateItemActive : ''}`}
                  onClick={() => handleSwitchLanguage(item.code)}
                >
                  <span className={styles.stateRegionName}>{item.state}</span>
                  <span className={styles.stateNativeLang}>{item.langName}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className={styles.skipBtn}
              onClick={dismissPrompt}
              style={{ marginTop: '16px' }}
            >
              Continue in {currentLangObj.native} ({currentLangObj.label})
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
