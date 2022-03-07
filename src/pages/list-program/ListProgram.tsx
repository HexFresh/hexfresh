import React, { useEffect, useState } from 'react';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import './list-program.css';

interface IProgram {
  id: string;
  name: string;
}

export default function ListProgram() {
  const [programs, setPrograms] = useState<IProgram[] | []>([]);

  console.log(programs);

  useEffect(() => {
    document.title = 'Programs';
    const data = [
      {
        id: '1',
        name: 'Program 1',
      },
      {
        id: '2',
        name: 'Program 2',
      },
      {
        id: '3',
        name: 'Program 3',
      },
      {
        id: '4',
        name: 'Program 4',
      },
    ];
    setPrograms(data);
  }, []);

  return (
    <div className="list-program">
      <div className="container">
        <div className="menu">
          <div className="logo">
            <img src="/logo.svg" width="40px" alt="logo" />
          </div>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
              title="Programs"
              placement="right"
              arrow
            >
              <AppsIcon sx={{ width: 40, height: 40 }} />
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
            <div className="container">Programs</div>
          </div>
        </div>
      </div>
    </div>
  );
}
