import './App.css';
import Carousel from './components/layouts/carousel/Carousel';
import MeteorShower from './components/layouts/meteo-shower/MeteorShower';
import HeaderInternal from './components/layouts/Header/HeaderInternal';
import ProgressCard from './components/layouts/goalcard/ProgressCard';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import ListFresher from './pages/list-fresher/ListFresher';
import PlanetView from './pages/planet/PlanetView';
import ListPhase from './pages/list-phase/ListPhase';
import PhaseDetail from './pages/phase-detail/PhaseDetail';
import rootStore, { IRootDispatch, IRootStore } from './store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IUserStore } from './store/user/user-store';
import { getCurrentToken, onMessageListener } from './utils/firebaseInit';
import { initSocket } from './utils/socketioInit';
import FresherListPhase from './pages/fresher-list-phase/FresherListPhase';
import ReviewTask from './pages/review-task/ReviewTask';
import FresherLeaderboard from './pages/fresher-leaderboard/FresherLeaderboard';
import UserProfile from './pages/user-profile/UserProfile';
//import io from "socket.io-client";

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

  if (!auth.token && location.pathname !== '/signin' && location.pathname !== '/planets' && location.pathname !== '/') {
    console.log(location.pathname + location.search, 'inititate...');
    dispatch.location.startAt(location.pathname + location.search);
  }

  useEffect(() => {
    dispatch.user.checkAutoLoginV2({ dispatch, navigate, location });
    const accessToken = rootStore.getState().user.token;
    if (accessToken) {
      const socket = initSocket(accessToken);
      socket.emit('signin', 'Auto sign in');
    } else {
      console.log('no access token');
    }

    // push notification
    console.log('Noctification Token: ', getCurrentToken());
    onMessageListener()
      .then((payload) => {
        console.log('Notification: ');
        console.log(payload);
      })
      .catch((err) => console.log('Notification fail: ', err));
  }, []);

  const routeWithoutSignIn = (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="*" element={<Navigate to="/signin" />} /> */}
    </Routes>
  );

  const routerWithSignIn = (
    <Routes>
      <Route path="/" element={<Navigate to="/planets" />} />
      <Route path="planets" element={<Home />} />
      <Route path="planets/:planetId" element={<PlanetView />} />

      <Route path="/leaderboard" element={<FresherLeaderboard />} />

      <Route path="/mentor/programs" element={<ListProgram />} />
      <Route path="/mentor/programs/:programId/phases" element={<ListPhase />} />
      <Route path="/mentor/programs/:programId/phases/:phaseId" element={<PhaseDetail />} />

      <Route path="/mentor/freshers" element={<ListFresher />} />
      <Route path="/mentor/freshers/:fresherId" element={<FresherListPhase />} />
      <Route path="/mentor/freshers/:fresherId/phase/:phaseId" element={<ReviewTask />} />

      <Route path="/user/profile" element={<UserProfile />} />

      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  );

  const routeContent = auth.token !== null ? routerWithSignIn : routeWithoutSignIn;

  return <>{routeContent}</>;
}

export default App;
