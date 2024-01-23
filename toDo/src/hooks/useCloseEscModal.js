import { useEffect } from "react";

export function useCloseEscModal({ onOffModal }) {
  // * It will allow us to close the modal by clicking on the ESC key
  useEffect(() => {
    const closeModal = e => {
      if (e.key === 'Escape') onOffModal();
    };
    window.addEventListener('keydown', closeModal);
    return () => window.removeEventListener('keydown', closeModal);
  }, [onOffModal]);
}