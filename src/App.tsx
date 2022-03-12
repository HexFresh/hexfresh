import './App.css';
import Header from './components/layouts/Header/Header';
import Carousel from './components/layouts/carousel/Carousel';
import MeteorShower from './components/layouts/meteo-shower/MeteorShower';
import HeaderInternal from './components/layouts/Header/HeaderInternal';
import ProgressCard from './components/layouts/goalcard/ProgressCard';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import PlanetView from './pages/planet/PlanetView';
import MentorChecklist from './pages/mentor-checklist/MentorChecklist';
import ListPhase from './pages/list-phase/ListPhase';
import PhaseDetail from './pages/phase-detail/PhaseDetail';
import { IRootDispatch, IRootStore } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IUserStore } from './store/user/user-store';

const DUMMY_DATA = [
  {
    id: 1,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119224/hexfresh/planet-01_f7oul0.png'
  },
  {
    id: 2,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png'
  },
  {
    id: 3,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119221/hexfresh/planet-03_wfwlsb.png'
  },
  {
    id: 4,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-10_gge1rp.png'
  },
  {
    id: 5,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-11_elryxm.png'
  }, {
    id: 6,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-09_jvied4.png'
  }
  , {
    id: 7,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-07_luxrbe.png'
  }
  ,
  {
    id: 8,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-05_rfn7ee.png'
  },
  {
    id: 9,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119273/hexfresh/planet-06_vu4km7.png'
  },
  {
    id: 10,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119226/hexfresh/planet-02_qjswvd.png'
  },
  {
    id: 11,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119225/hexfresh/planet-14_grmwxo.png'
  },
  {
    id: 12,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-15_v6ehro.png'
  },
  {
    id: 13,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-04_wnbcyx.png'
  },
  /*   {
      id:14,
      images:''
    }, */
  {
    id: 15,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-12_qsd428.png'
  },
  {
    id: 16,
    images: 'https://res.cloudinary.com/droruloek/image/upload/v1643119222/hexfresh/planet-13_kg6vpd.png'
  },
]
const Home = () => {
  return (
    <div className="app">
      <MeteorShower />
      <HeaderInternal />
      <ProgressCard />
      {<Carousel items={DUMMY_DATA} active={0} />}
      <div>

        <img className='footer' src='/footer.png' alt='footer background' />
        <img className='character' src='/main.png' alt='main character' />
      </div>
    </div>
  );
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<IRootDispatch>();
  const auth: IUserStore = useSelector<IRootStore>(state => state.user);

  console.log(auth, 'auth');
  if (!auth.token && (location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/courses' && location.pathname !== '/')) {
    console.log(location.pathname + location.search, 'inititate...');
    dispatch.locationStore.startAt(location.pathname + location.search);
  }
  useEffect(() => {
    dispatch.user.checkAutoLogin({ dispatch, navigate, location });
  }, []);

  const routeWithoutSignIn = (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Navigate to='/signin' />} />
    </Routes>
  );

  const routerWithSignIn = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mentor/programs" element={<ListProgram />} />
      <Route
            path="/mentor/programs/:programId/phases"
            element={<ListPhase />}
          />
          <Route
            path="/mentor/programs/:programId/phases/:phaseId"
            element={<PhaseDetail />}
          />

      <Route path="/planet" element={<PlanetView />} />
      <Route path="/mentor/planet/:id" element={<MentorChecklist />} />
    </Routes>
  );

  const routeContent = auth.token !== null ? routerWithSignIn : routeWithoutSignIn;

  return (
    <>
      {routeContent}
    </>
  );
}

export default App;
