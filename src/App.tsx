import './App.scss';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CoinWatchList from './pages/CoinWatchList';
import SingleCrypto from './pages/SingleCrypto';
import Footer from './components/Footer';


const App = () => {
  
  return (
    <Router basename='/'>
      <div className="site-wrapper">

      <Header title='Zurrency'/>

        <Routes>
          <Route path='/' element={ <Home />}/>
          <Route path='/about' element={ <About />}/>
          <Route path='/watchlist' element={ <CoinWatchList />}/>
          <Route path='/single-crypto/:symbol' element={ <SingleCrypto />}/>
        </Routes>

      <Footer creator='Jonny Nguyen'/>
      
      </div>
    </Router>
  );
}

export default App;
