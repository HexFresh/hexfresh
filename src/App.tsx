import './App.css';
import Header from './components/Layouts/Header/Header';
import Carousel from './components/Layouts/carousel/Carousel';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/fontawesome-free-solid'
import MeteorShower from './components/Layouts/meteo-shower/MeteorShower';
import HeaderLandingPage from './components/Layouts/Header/Header';
import HeaderInternal from './components/Layouts/Header/HeaderInternal';

const DUMMY_DATA = [
  {
    id:1,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119224/hexfresh/planet-01_f7oul0.png'
  },
  {
    id:2,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png'
  },
  {
    id:3,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119221/hexfresh/planet-03_wfwlsb.png'
  },
  {
    id:4,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-10_gge1rp.png'
  },
  {
    id:5,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-11_elryxm.png'
  },{
    id:6,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-09_jvied4.png'
  }
  ,{
    id:7,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-07_luxrbe.png'
  }
  ,
  {
    id:8,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-05_rfn7ee.png'
  },
  {
    id:9,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-06_vu4km7.png'
  },
  {
    id:10,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png'
  },
  {
    id:11,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119225/hexfresh/planet-14_grmwxo.png'
  },
  {
    id:12,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-15_v6ehro.png'
  },
  {
    id:13,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-04_wnbcyx.png'
  },
/*   {
    id:14,
    images:''
  }, */
  {
    id:15,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-12_qsd428.png'
  },
  {
    id:16,
    images:'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-13_kg6vpd.png'
  },
]

function App() {
  var items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
  return (
    <div className="app">
      <MeteorShower/>
      <HeaderInternal/>
    {<Carousel items={DUMMY_DATA} active={0}/>}
    <div>

    <img className='footer' src='/footer.png' alt='footer background'/>
    <img className='character' src='/main.png' alt='main character'/>
    </div>
    </div>
  );
}

export default App;
