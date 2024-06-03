import { Link } from "react-router-dom";

const MenuSuperior = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark sticky-top" style={{ backgroundColor: "#54B435" }}>
      <div className="container">
        <Link to="/" className="navbar-brand" style={{ fontSize: "24px" }}> {/* Increased font size */}
          <span style={{ fontFamily: "Poppins, sans-serif" }}>FAST SUPERMARKET</span> {/* Modern uppercase font */}
        </Link>
        <ul className="navbar-nav">
        <li className="nav-item">
            <Link to="/user" className="nav-link">Cadastrar Usuário</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link">Incluir Produto</Link>
          </li>

          <li className="nav-item">
            <Link to="/manutencao" className="nav-link">Manutenção de Produtos</Link>
          </li>
         
          <li className="nav-item">
            <Link to="/feedback" className="nav-link">Feedback</Link>
          </li>
          <li className="nav-item">
            <button className="btn btn-sm btn-outline-secondary">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;
