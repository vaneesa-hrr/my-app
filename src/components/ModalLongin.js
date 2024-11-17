import styles from './modal.module.scss';

export default function ModalLogin() {
  return <div className={styles.loadingContainer}>
    <div className={styles.loadingView}>Loading...</div>
  </div>;
}