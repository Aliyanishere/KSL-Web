import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "../src/Components/Login"
import BranchM from "../src/Components/BranchManager"
import Admin from "../src/Components/Dashboard"


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/Branchmanager">
            <BranchM />
          </Route>
        </Switch>
      </Router>
    </div>

  );
}

export default App;