import { AuthProvider } from "./contexts/AuthContext";
import './globals.css';
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import ToastContainer from "./components/ToastContainer/ToastContainer";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
