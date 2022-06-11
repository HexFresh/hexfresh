import './App.css';
import Carousel from './components/layouts/carousel/Carousel';
import MeteorShower from './components/layouts/meteo-shower/MeteorShower';
import HeaderInternal from './components/layouts/Header/HeaderInternal';
import ProgressCard from './components/layouts/goalcard/ProgressCard';
import {Navigate, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import ListFresher from './pages/list-fresher/ListFresher';
import PlanetView from './pages/planet/PlanetView';
import ListPhase from './pages/list-phase/ListPhase';
import PhaseDetail from './pages/phase-detail/PhaseDetail';
import {IRootDispatch, IRootStore} from './store/store';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {IUserStore} from './store/user/user-store';
import {onMessageListener} from './utils/firebaseInit';
import FresherListPhase from './pages/fresher-list-phase/FresherListPhase';
import ReviewTask from './pages/review-task/ReviewTask';
import FresherLeaderboard from './pages/fresher-leaderboard/FresherLeaderboard';
import UserProfile from './pages/user-profile/UserProfile';
import Messages from './pages/messages/messages';
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import {Notifications} from './pages/notifications/notifications';
import Badges from './pages/badges/badges';
import ListChecklist from "./pages/list-checklist/ListChecklist";
import ListTask from "./pages/list-task/ListTask";
//import io from "socket.io-client";

const Home = () => {
  return (
    <div className="app">
      <MeteorShower/>
      <HeaderInternal/>
      <ProgressCard/>
      {<Carousel/>}
      <div>
        <img className="footer" src="/footer.png" alt="footer background"/>
        <img className="character" src="/main.png" alt="main character"/>
      </div>
    </div>
  );
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<IRootDispatch>();
  const auth: IUserStore = useSelector<IRootStore>((state) => state.user);
  const roleId: number = Number(useSelector<IRootStore>((state) => state.user.roleId)) || Number(localStorage.getItem('roleId')) || 0;

  if (!auth.token && location.pathname !== '/signin' && location.pathname !== '/planets' && location.pathname !== '/') {
    dispatch.location.startAt(location.pathname + location.search);
  }

  useEffect(() => {

    const initialFunc = async () => {
      await dispatch.user.checkAutoLoginV2({dispatch, navigate, location});
      await dispatch.user.fetchProfileUsers();
      // push notification
      onMessageListener()
      .then((payload) => {
        console.log('Notification: ');
        console.log(payload);
      })
      .catch((err) => console.log('Notification fail: ', err));
    }

    initialFunc();

  }, []);

  const routeWithoutSignIn = (
    <Routes>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="*" element={<Navigate to="/signin"/>}/>
    </Routes>
  );

  const routerWithSignIn = (
    <Routes>
      {
        roleId === 3 ? (<><Route path="/" element={<Navigate to="/planets"/>}/>
          <Route path="messages" element={<Messages/>}/>
          <Route path="notifications" element={<Notifications/>}/>

          <Route path="/mentor/programs" element={<ListProgram/>}/>
          <Route path="/mentor/programs/:programId/phases" element={<ListPhase/>}/>
          <Route path="/mentor/programs/:programId/phases/:phaseId" element={<ListChecklist/>}/>
          <Route path="/mentor/programs/:programId/phases/:phaseId/edit" element={<PhaseDetail/>}/>
          <Route path="/mentor/programs/:programId/phases/:phaseId/checklist/:checklistId" element={<ListTask/>}/>

          <Route path="/mentor/freshers" element={<ListFresher/>}/>
          <Route path="/mentor/freshers/:fresherId" element={<FresherListPhase/>}/>
          <Route path="/mentor/freshers/:fresherId/phase/:phaseId" element={<ReviewTask/>}/>

          <Route path="/user/profile" element={<UserProfile/>}/>

          <Route path="*" element={<Navigate to="/mentor/programs"/>}/>
        </>) : (<>
          <Route path="/" element={<Navigate to="/planets"/>}/>
          <Route path="planets" element={<Home/>}/>
          <Route path="messages" element={<Messages/>}/>
          <Route path="notifications" element={<Notifications/>}/>
          <Route path="badges" element={<Badges/>}/>
          <Route path="planets/:planetId" element={<PlanetView/>}/>

          <Route path="/leaderboard" element={<FresherLeaderboard/>}/>

          <Route path="/user/profile" element={<UserProfile/>}/>

          <Route path="*" element={<Navigate to="/"/>}/>
        </>)
      }
    </Routes>
  );

  const routeContent = auth.token !== null ? routerWithSignIn : routeWithoutSignIn;

  return <>{routeContent}</>;
}

export default App;
