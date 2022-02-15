import './App.css';
import Header from './components/Layouts/Header/Header';
import Carousel from './components/Layouts/carousel/Carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'

function App() {
  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  return (
    <div className="app">
      <Header/>
    {<Carousel items={items} active={0}/>}
    </div>
  );
}

export default App;
