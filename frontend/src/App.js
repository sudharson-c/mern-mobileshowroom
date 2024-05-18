import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Mobiles from './pages/Mobiles';
import Add from './pages/Add';
import Update from './pages/Update'
import './style.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Mobiles}></Route>
        <Route path='/add' Component={Add}></Route>
        <Route path='/update/:id' Component={Update}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
