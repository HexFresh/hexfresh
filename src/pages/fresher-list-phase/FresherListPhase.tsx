import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Apps, School, Settings, Folder, Search } from '@mui/icons-material';
import { Avatar, Tooltip, Fade, InputBase, CircularProgress } from '@mui/material';
import './fresher-list-phase.css';
import { getAllPhaseOfFresher } from '../../api/mentor/review/api';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface IFresherPhase {
  id: number;
  completedPercentage: number;
  isCompleted: boolean;
  numberOfCompletedChecklists: number;
  phase: IPhase;
  phaseId: number;
  programId: number;
}

interface IPhase {
  id: number;
  title: string;
  image: IImage;
}

interface IImage {
  id: number;
  imageLink: string;
}

export default function FresherListPhase() {
  const [loading, setLoading] = useState(false);
  const [phases, setphases] = useState<IFresherPhase[] | []>([]);

  console.log(phases);

  const fresherId = useParams<{ fresherId: string }>().fresherId;

  const fetchPhases = async () => {
    setLoading(true);
    const result = await getAllPhaseOfFresher(fresherId);
    setphases(result || []);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'HexF - List Phase of Fresher';
    fetchPhases();
  }, []);

  return (
    <div className="fresher-list-phase">
      <div className="container">
        <div className="menu">
          <Link to="/mentor/programs">
            <div className="logo">
              <img src="/logo.svg" width="40px" alt="logo" />
            </div>
          </Link>
          <div className="menu-item">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Programs"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/programs">
                <Apps sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Freshers"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/freshers">
                <School sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>

          <div className="bottom">
            <div className="folder">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Resources"
                placement="right"
                arrow
              >
                <Folder sx={{ width: 30, height: 30 }} />
              </Tooltip>
            </div>
            <div className="settings">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                title="Settings"
                placement="right"
                arrow
              >
                <Settings sx={{ width: 30, height: 30 }} />
              </Tooltip>
            </div>
            <div className="avatar">
              <Avatar />
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo" />
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">
              <div className="name">List phase of fresher</div>
              <div className="add-phase"></div>
            </div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="search">
                <Search style={{ width: '20px', height: '20px' }} />
                <InputBase style={{ fontSize: '14px', width: '100%' }} placeholder="Search" />
              </div>
              <div className="filter"></div>
            </div>
          </div>
          <div className="phases">
            <div className="container">
              {loading ? (
                <CircularProgress className="circular-progress" />
              ) : phases.length === 0 ? (
                <div className="img-404">
                  <img alt="img-404" style={{ height: '200px' }} src="/no-records.png" />
                </div>
              ) : (
                <div className="fresher-phases-list">
                  {phases.map((phase, index) => (
                    <div className="fresher-phase" key={index}>
                      <div className="left">
                        <img
                          src={phase.phase.image.imageLink}
                          alt="img"
                          style={{
                            width: '50px',
                            height: '50px',
                          }}
                        />
                        <div className="fresher-phase-name">{phase.phase.title}</div>
                      </div>
                      <div className="right" style={{ width: 50, height: 50 }}>
                        <CircularProgressbar
                          value={phase.completedPercentage}
                          maxValue={1}
                          text={`${phase.completedPercentage * 100}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
