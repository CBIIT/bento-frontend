import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { formatCartAddMessage } from '@bento-core/cart';

/**
 * Explore CPI cart toast.
 * Body portal keeps it visible above the Explore Modal; styling matches the
 * Global Search CPI MUI snackbar. Dropdown closes on option click so the toast
 * does not need width hacks to avoid overlap.
 */
const SuccessIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
    style={{ display: 'block', fill: 'currentColor' }}
  >
    <path d="M20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4C12.76,4 13.5,4.11 14.2, 4.31L15.77,2.74C14.61,2.26 13.34,2 12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0, 0 22,12M7.91,10.08L6.5,11.5L11,16L21,6L19.59,4.58L11,13.17L7.91,10.08Z" />
  </svg>
);

const CartToast = ({
  open,
  count,
  alreadyInCartCount = 0,
  onClose,
}) => {
  useEffect(() => {
    if (!open) {
      return undefined;
    }
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="snackBar exploreCpiCartToast"
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '24px',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
    >
      <div
        className="snackBarMessage"
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#323232',
          color: '#fff',
          padding: '6px 16px',
          borderRadius: '4px',
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
          minWidth: 288,
          maxWidth: 568,
          boxSizing: 'border-box',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 400,
          fontSize: '0.875rem',
          lineHeight: 1.43,
          letterSpacing: '0.01071em',
        }}
      >
        <span
          className="snackBarMessageIcon"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginRight: 8,
            color: '#fff',
            flexShrink: 0,
          }}
        >
          <SuccessIcon />
        </span>
        <span className="snackBarText">
          {formatCartAddMessage(count, alreadyInCartCount)}
        </span>
      </div>
    </div>,
    document.body,
  );
};

export default CartToast;
