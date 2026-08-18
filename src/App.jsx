import React from 'react';
import { Header } from './components/Header/Header';
import { HeroDrawer } from './components/HeroDrawer/HeroDrawer';
import { ProductDetail } from './components/ProductDetail/ProductDetail';
import { CategoryGrid } from './components/CategoryGrid/CategoryGrid';
import { CraftSection } from './components/CraftSection/CraftSection';
import { Footer } from './components/Footer/Footer';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { LocationLanguagePrompt } from './components/LocationLanguagePrompt/LocationLanguagePrompt';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import { useDarkMode } from './hooks/useDarkMode';
import styles from './App.module.css';

function MainLayout() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <div className={styles.appRoot}>
      <Header isDark={isDark} onToggleTheme={toggleDarkMode} />
      <main id="main-content">
        <HeroDrawer />
        <ProductDetail />
        <CategoryGrid />
        <CraftSection />
      </main>
      <Footer />
      <CartDrawer />
      <LocationLanguagePrompt />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </LanguageProvider>
  );
}

export default App;
