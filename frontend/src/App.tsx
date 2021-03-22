import { AuthProvider } from "./contexts/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>
            <Routes />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
