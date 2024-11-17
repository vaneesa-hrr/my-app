import './App.css';
import { openModal, openModalAccount } from './components/openmodal';

function App() {

  function handleOpenModal() {
    openModal();
  }

  function handleOpenModal2() {
    openModalAccount();
  }

  return (
    <div className="App">
      <button onClick={handleOpenModal}>Abrir modal</button>
      <button onClick={handleOpenModal2}>Abrir modal Cuenta</button>
    </div>
  );
}

export default App;
