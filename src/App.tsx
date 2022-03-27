import './App.css';
import Header from './components/layouts/Header/Header';
import Carousel from './components/layouts/carousel/Carousel';
import MeteorShower from './components/layouts/meteo-shower/MeteorShower';
import HeaderInternal from './components/layouts/Header/HeaderInternal';
import ProgressCard from './components/layouts/goalcard/ProgressCard';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import PlanetView from './pages/planet/PlanetView';
import ListPhase from './pages/list-phase/ListPhase';
import PhaseDetail from './pages/phase-detail/PhaseDetail';
import { IRootDispatch, IRootStore } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IUserStore } from './store/user/user-store';

const Home = () => {
  return (
    <div className="app">
      <MeteorShower />
      <HeaderInternal />
      <ProgressCard />
      {<Carousel />}
      <div>
        <img className="footer" src="/footer.png" alt="footer background" />
        <img className="character" src="/main.png" alt="main character" />
      </div>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<IRootDispatch>();
  const auth: IUserStore = useSelector<IRootStore>((state) => state.user);

  if (!auth.token && (
    location.pathname !== '/signin' 
    && location.pathname !== '/planets'
    && location.pathname !== '/')) {
    console.log(location.pathname + location.search, 'inititate...');
    dispatch.location.startAt(location.pathname + location.search);
  }

  useEffect(() => {
    dispatch.user.checkAutoLoginV2({ dispatch, navigate, location });
  }, []);

  const routeWithoutSignIn = (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
    </Routes>
  );

  const routerWithSignIn = (
    <Routes>
      <Route  path="/" element={<Navigate to="/planets" />} />
      <Route path="planets" element={<Home />} />
      <Route  path="planets/:planetId" element={<PlanetView />} />
      <Route path="/mentor/programs" element={<ListProgram />} />
      <Route
        path="/mentor/programs/:programId/phases"
        element={<ListPhase />}
      />
      <Route
        path="/mentor/programs/:programId/phases/:phaseId"
        element={<PhaseDetail />}
      />

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );

  const routeContent =
    auth.token !== null ? routerWithSignIn : routeWithoutSignIn;

  return <>{routeContent}</>;
}

export default App;
