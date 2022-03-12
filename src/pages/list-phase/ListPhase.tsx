import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Pagination from '@mui/material/Pagination';
import './list-phase.css';

interface Iphase {
  id: string;
  name: string;
}

export default function ListPhase() {
  const [phases, setphases] = useState<Iphase[] | []>([]);

  const programId = useParams<{ programId: string }>().programId;

  console.log({ phases, programId });

  useEffect(() => {
    document.title = 'Phases';
    const data = [
      {
        id: '1',
        name: 'phase 1',
      },
      {
        id: '2',
        name: 'phase 2',
      },
      {
        id: '3',
        name: 'phase 3',
      },
      {
        id: '4',
        name: 'phase 4',
      },
    ];
    setphases(data);
  }, []);

  return (
    <div className="list-phase">
      <div className="container">
        <div className="menu">
          <Link to="/mentor/programs">
            <div className="logo">
              <img src="/logo.svg" width="40px" alt="logo" />
            </div>
          </Link>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Programs"
              placement="right"
              arrow
            >
              <Link className="link" to="/mentor/programs">
                <AppsIcon sx={{ width: 40, height: 40 }} />
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Freshers"
              placement="right"
              arrow
            >
              <SchoolIcon sx={{ width: 40, height: 40 }} />
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
                <FolderIcon sx={{ width: 30, height: 30 }} />
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
                <SettingsIcon sx={{ width: 30, height: 30 }} />
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
            <div className="container">Phases</div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="filter">Filter</div>
              <div className="search">
                <SearchIcon />
                <InputBase placeholder="Search" />
              </div>
            </div>
          </div>
          <div className="phases">
            <div className="container">
              {phases.map((phase) => (
                <div className="phase" key={phase.id}>
                  <div className="cover-photo">
                    <img
                      src="https://photo-net-production-images.s3.amazonaws.com/18577502-lg.jpg"
                      alt="cover"
                    />
                  </div>
                  <div className="phase-name">{phase.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
