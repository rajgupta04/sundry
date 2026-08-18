import React from 'react';
import styles from './DarkModeToggle.module.css';

export function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      className={styles.toggleBtn}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to daylight theme' : 'Switch to warm lamplight theme'}
      title={isDark ? 'Daylight (Light mode)' : 'Warm lamplight (Dark mode)'}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '☀' : '☾'}
      </span>
      <span className={styles.label}>
        {isDark ? 'Daylight' : 'Lamplight'}
      </span>
    </button>
  );
}
