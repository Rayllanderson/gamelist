import { AuthProvider } from "./contexts/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
