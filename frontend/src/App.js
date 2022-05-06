import { BrowserRouter, Link } from 'react-router-dom';
import M from "materialize-css"

import RoutesForm from './routes/Routes';


function App() {
  const logoutToken = () => {
    if (window.confirm("Are you Logout?")) {
      sessionStorage.removeItem("auth-token");
    } else {
      M.toast({ html: 'Function not executed' })
    }

  }
  return (
    <div>
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/miskatas">My katas</Link>
            </li>
            <li>
              <Link to="/" onClick={logoutToken}>Logout</Link>
            </li>
          </ul>
        </nav>
        <RoutesForm />
      </BrowserRouter>

    </div>
  );
}

export default App;