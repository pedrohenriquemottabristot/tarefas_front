import Cadastrar_Produtos from './components/cadastrar_produto';
import Menu_Superior from './components/MenuSuperior';
import Manutencao_Produtos from './components/manutencao_produtos';
import FormularioLogin from './components/login';
import Cadastrar_Usuarios from './components/cadastrar_usuario';
import FeedbackForm from './components/feedback';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';

const ProtectedRoute = ({ children }) => {
  const { autenticado } = useAuth();
  const navigate = useNavigate(); // Utilize useNavigate for programmatic navigation

  if (!autenticado) {
    navigate('/login'); // Redirect to login on unauthorized access
    return null;
  }

  return children;
};

const RoutesWithAuth = () => {
  const { autenticado } = useAuth();

  return (
    <Router>
      {autenticado && <Menu_Superior />}
      <Routes>
        <Route path="/login" element={<FormularioLogin />} />
        <Route path="/" element={autenticado ? (<Cadastrar_Produtos /> // Use replace to prevent history stack issues
            ) : <FormularioLogin />}
        />
        <Route path="/tarefas" element={<ProtectedRoute><Cadastrar_Produtos /></ProtectedRoute>} />
        <Route path="/manutencao" element={<ProtectedRoute><Manutencao_Produtos /></ProtectedRoute>} />
        <Route path="/user" element={<ProtectedRoute><Cadastrar_Usuarios /></ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute><FeedbackForm/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <RoutesWithAuth />
    </AuthProvider>
  );
};

export default App;
