import { AuthProvider } from "./contexts/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastProvider } from "./contexts/ToastContext";
import { GameProvider } from "./contexts/GameContext";
import { ModalProvider } from "./contexts/ModalContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <ModalProvider>
            <GameProvider>
             <Routes />
            </GameProvider>
            </ModalProvider>
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
