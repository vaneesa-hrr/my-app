import { useState, useRef, useEffect } from 'react';
import styles from './modal.module.scss';

export default function Modal({ children, title, root }) {
  const ref = useRef(null);
  const [isClosing, setIsClosing] = useState(false); // Estado para manejar el cierre animado


  // Llamada para cerrar el modal después de la animación
  function callBack(e) {
    // Solo intentar remover el event listener si ref.current no es null
    if (ref.current) {
      ref.current.removeEventListener("animationend", callBack);
    }
    // Solo desmontar después de la animación
    setIsClosing(false);

    root.unmount(); // Si es necesario desmontar el modal
  }

  // Maneja el clic para iniciar la animación de salida
  function handleClick() {
    if (ref.current) {
      ref.current.classList.add(styles.fadeOut);  // Inicia la animación
      setIsClosing(true); // Marca como en proceso de cierre
      ref.current.addEventListener("animationend", callBack, { once: true });
    }
  }

  // Asegúrate de limpiar cualquier listener si el componente se desmonta
  useEffect(() => {
    // Limpia el listener al desmontar
    return () => {
      if (ref.current) {
        ref.current.removeEventListener("animationend", callBack);
      }
    };
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar y desmontar el componente.

  // No renderizar el modal si ya está en proceso de cierre
  if (isClosing) {
    return null; // El modal ya no será renderizado, pero la animación sigue
  }

  return (
    <div ref={ref} className={styles.modalContainer}>
      <div className={styles.modalView}>
        <div className={styles.modalHeader}>
          <div>{title}</div>
          <div>
            <button onClick={handleClick} className={styles.closeButton}>X</button>
          </div>
        </div>
        <div className={styles.modalContent}>{children}</div>
      </div>
    </div >
  );
}