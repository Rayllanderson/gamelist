import { AuthProvider } from "./hooks/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastProvider } from "./hooks/ToastContext";
import { GameProvider } from "./hooks/GameContext";
import { ModalProvider } from "./hooks/ModalContext";
import { SearchProvider } from "./hooks/SearchContex";
import { AlertProvider } from "./hooks/AlertContext";
import { LoadingProvider } from "./hooks/LoadingContext";

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
