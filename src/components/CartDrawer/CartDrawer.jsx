import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { getTranslatedProduct } from '../../data/productTranslations';
import { ProductShape } from '../ProductShape/ProductShape';
import styles from './CartDrawer.module.css';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalCount,
    formattedSubtotal,
    discountCode,
    formattedDiscount,
    formattedTotal,
    clearCart
  } = useCart();

  const { language, t } = useLanguage();
  const [checkoutSuccess, setCheckoutSuccess] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    if (!isCartOpen) {
      setCheckoutSuccess(null);
    }
  }, [isCartOpen]);

  const handleProceedToDispatch = () => {
    const orderData = {
      orderId: `SND-${Math.floor(100000 + Math.random() * 900000)}`,
      itemCount: totalCount,
      totalAmount: formattedTotal || formattedSubtotal,
      discountUsed: discountCode ? '15% Secret Atelier Voucher' : null,
      date: new Date().toLocaleDateString(language === 'en' ? 'en-IN' : language, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      dispatchedItems: [...items]
    };

    setCheckoutSuccess(orderData);
    clearCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className={styles.backdrop} onClick={closeCart} role="dialog" aria-modal="true" aria-label="Shopping tray">
      <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Header */}
        <div className={styles.header}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.brassHandleSmall}></div>
            <span className={styles.drawerTag}>{t('cartTag', 'CABINET DISPATCH TRAY')}</span>
            <h2 className={styles.title}>
              {checkoutSuccess
                ? t('dispatchConfirmed', 'Dispatch Confirmed')
                : `${t('yourSelection', 'Your Selection')} (${totalCount})`}
            </h2>
          </div>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={closeCart}
            aria-label="Close cart tray"
          >
            ✕
          </button>
        </div>

        {/* ================= CHECKOUT SUCCESS VIEW (ON-THEME) ================= */}
        {checkoutSuccess ? (
          <div className={styles.successContainer}>
            <div className={styles.successSealBox}>
              <div className={styles.brassSeal}>
                <span className={styles.sealMark}>✓</span>
              </div>
            </div>

            <span className={styles.successTag}>{t('dispatchConfirmed', 'DISPATCH INITIATED')}</span>
            <h3 className={styles.successTitle}>{t('orderRouted', 'Order Routed to Workshops')}</h3>
            <p className={styles.successMsg}>
              Your order of <strong>{checkoutSuccess.itemCount} items</strong> ({checkoutSuccess.totalAmount}) has been transmitted directly to our partner craftsmen.
            </p>

            <div className={styles.orderSummaryCard}>
              <div className={styles.orderSummaryRow}>
                <span className={styles.summaryLabel}>{t('orderRef', 'Order Reference')}</span>
                <span className={styles.summaryValueRef}>{checkoutSuccess.orderId}</span>
              </div>
              <div className={styles.orderSummaryRow}>
                <span className={styles.summaryLabel}>{t('totalPaid', 'Total Paid')}</span>
                <span className={styles.summaryValueTotal}>{checkoutSuccess.totalAmount}</span>
              </div>
              {checkoutSuccess.discountUsed && (
                <div className={styles.orderSummaryRow}>
                  <span className={styles.summaryLabel}>Reward Applied</span>
                  <span className={styles.summaryValue}>{checkoutSuccess.discountUsed}</span>
                </div>
              )}
              <div className={styles.orderSummaryRow}>
                <span className={styles.summaryLabel}>{t('dispatchDate', 'Dispatch Date')}</span>
                <span className={styles.summaryValue}>{checkoutSuccess.date}</span>
              </div>
              <div className={styles.orderSummaryRow}>
                <span className={styles.summaryLabel}>{t('packaging', 'Packaging')}</span>
                <span className={styles.summaryValue}>{t('packagingVal', '100% Plastic-free corrugated box')}</span>
              </div>
              <div className={styles.orderSummaryRow}>
                <span className={styles.summaryLabel}>{t('workshops', 'Workshops')}</span>
                <span className={styles.summaryValue}>{t('workshopsVal', 'Aligarh & Firozabad Ateliers')}</span>
              </div>
            </div>

            <div className={styles.successNote}>
              <span>{t('dispatchNote', 'A dispatch receipt has been generated. Cart has been reset.')}</span>
            </div>

            <button
              type="button"
              className={styles.returnCabinetBtn}
              onClick={closeCart}
            >
              {t('returnCabinet', 'Return to Cabinet')}
            </button>
          </div>
        ) : (
          /* ================= NORMAL CART VIEW ================= */
          <>
            <div className={styles.itemsList}>
              {items.length === 0 ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIconBox}>
                    <div className={styles.emptyBrassDot}></div>
                  </div>
                  <h3 className={styles.emptyHeading}>{t('emptyTrayHeading', 'Your tray is empty')}</h3>
                  <p className={styles.emptyText}>
                    {t('emptyTrayText', 'No goods are currently in your tray. Select any drawer in the cabinet to add items.')}
                  </p>
                  <button
                    type="button"
                    className={styles.browseBtn}
                    onClick={() => {
                      closeCart();
                      const el = document.getElementById('materials');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {t('inspectCabinetGoods', 'Inspect Cabinet Goods →')}
                  </button>
                </div>
              ) : (
                items.map(({ product: rawProduct, quantity }) => {
                  const product = getTranslatedProduct(rawProduct, language);
                  const itemTotal = (product.priceNum * quantity).toLocaleString('en-IN');
                  return (
                    <article key={product.id} className={styles.cartItem}>
                      <div className={styles.itemShapeWrap}>
                        <ProductShape type={product.shapeType} className={styles.miniShape} />
                      </div>

                      <div className={styles.itemDetails}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemMaterialTag}>{t(product.category, product.category)}</span>
                          <button
                            type="button"
                            className={styles.removeBtn}
                            onClick={() => removeFromCart(product.id)}
                            aria-label={`Remove ${product.name} from tray`}
                          >
                            {t('remove', 'Remove')}
                          </button>
                        </div>

                        <h4 className={styles.itemName}>{product.name}</h4>
                        <span className={styles.itemUnitPrice}>{product.price} each</span>

                        <div className={styles.itemFooter}>
                          <div className={styles.quantityControl}>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(product.id, quantity - 1)}
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className={styles.qtyValue}>{quantity}</span>
                            <button
                              type="button"
                              className={styles.qtyBtn}
                              onClick={() => updateQuantity(product.id, quantity + 1)}
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>

                          <span className={styles.itemSubtotal}>₹{itemTotal}</span>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Footer with Subtotal, Discount & Checkout */}
            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotalRow}>
                  <span className={styles.subtotalLabel}>{t('subtotal', 'Subtotal')}</span>
                  <span className={styles.subtotalValue}>{formattedSubtotal}</span>
                </div>

                {discountCode && (
                  <div className={styles.discountRow}>
                    <span className={styles.discountLabel}>🎉 Secret Voucher ({discountCode})</span>
                    <span className={styles.discountVal}>{formattedDiscount}</span>
                  </div>
                )}

                {discountCode && (
                  <div className={styles.totalRow}>
                    <span className={styles.totalLabel}>Final Payable</span>
                    <span className={styles.totalValue}>{formattedTotal}</span>
                  </div>
                )}

                <div className={styles.shippingNote}>
                  <span>✓ Direct workshop packaging from Aligarh &amp; Firozabad</span>
                  <span>✓ Surface insured delivery across India · Zero plastic wrap</span>
                </div>

                <button
                  type="button"
                  className={styles.checkoutBtn}
                  onClick={handleProceedToDispatch}
                >
                  <span>{t('proceedToDispatch', 'Proceed to Dispatch')}</span>
                  <span>{discountCode ? formattedTotal : formattedSubtotal}</span>
                </button>

                <div className={styles.secondaryActions}>
                  <button type="button" className={styles.clearBtn} onClick={clearCart}>
                    {t('clearTray', 'Clear entire tray')}
                  </button>
                  <button type="button" className={styles.continueBtn} onClick={closeCart}>
                    {t('continueExploring', 'Continue exploring cabinet →')}
                  </button>
                </div>
              </div>
            )}
          </>
        )}

      </aside>
    </div>
  );
}
