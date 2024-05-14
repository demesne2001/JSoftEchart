import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from './Component/Sales-Efficiency-Analysis-Dashboard/Dashboard/Dashboard';
import DetailedScreen from './Component/SecondScreen/DetailedScreen';
import './Component/Assets/css/bootstrap-select.min.css'
import './Component/Assets/css/bootstrap.min.css'
import './Component/Assets/css/charts.min.css'
import './Component/Assets/css/font-awesome-all.min.css'
import './Component/Assets/css/reset.css'
import './Component/Assets/css/style copy.css'
import './Component/Assets/css/Custom.css'
import './Component/Assets/css/slick.css'
import './Component/Assets/css/responsive.css'
import Main from './Component/Login/Main';


function App() {
  return (
    
      <Router>
        <div>
          <Routes>
            <Route exact path='/Home' element={<Dashboard />}></Route>
            <Route exact path='/graph-detail' element={<DetailedScreen />}></Route>
            <Route exact path='/' element={<Main />}></Route>
          </Routes>
        </div>
      </Router>

  );
}

export default App;
