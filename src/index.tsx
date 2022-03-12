import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import ListProgram from './pages/list-program/ListProgram';
import PlanetView from './pages/planet/PlanetView';
import { Provider } from 'react-redux';
import rootStore from './store/store';
import MentorChecklist from './pages/mentor-checklist/MentorChecklist';
import ListPhase from './pages/list-phase/ListPhase';
import PhaseDetail from './pages/phase-detail/PhaseDetail';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/signin" element={<SignIn />} />
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
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
