import { AuthProvider } from "./contexts/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastProvider } from "./contexts/ToastContext";
import { GameProvider } from "./contexts/GameContext";
import { ModalProvider } from "./contexts/ModalContext";
import { SearchProvider } from "./contexts/SearchContex";
import { AlertProvider } from "./contexts/AlertContext";
import { LoadingProvider } from "./contexts/LoadingContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <LoadingProvider>
            <ToastProvider>
              <AlertProvider>
                <ModalProvider>
                  <GameProvider>
                    <SearchProvider>
                      <Routes />
                    </SearchProvider>
                  </GameProvider>
                </ModalProvider>
              </AlertProvider>
            </ToastProvider>
          </LoadingProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
