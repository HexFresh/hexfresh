import React, { useEffect, useState } from 'react';
import ListPhase from '../../components/list-phase/ListPhase';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import './mentor-checklist.css';

interface IProgram {
  id: string;
  name: string;
}

export default function MentorChecklist() {
  const [checklist, setChecklist] = useState<IProgram[] | []>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(checklist);

  useEffect(() => {
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
      {
        id: '5',
        name: 'Program 5',
      },
      {
        id: '6',
        name: 'Program 6',
      },
      {
        id: '7',
        name: 'Program 7',
      },
    ];
    setChecklist(data);
  }, []);

  return (
    <div className="checklist">
      <div className="container">
        <div className="left">
          <div className="top">
            <div className="coverphoto">
              <img
                src="https://i.pinimg.com/originals/62/2a/f1/622af1ce20783731327ba9365ae66ab8.jpg"
                alt="cover"
              />
            </div>
            <div className="logo">
              <img
                src="https://top10vietnam.top/wp-content/uploads/2021/10/Tong-hop-10-cong-ty-thiet-ke-logo-dep-uy-tin-chat-luong-tai-Ha-Noi-7.png"
                alt="logo"
              />
            </div>
            <p className="title">Checklist</p>
          </div>
          <div className="bottom">
            <div className="checklist">
              {checklist.map((item) => (
                <div key={item.id} className="program">
                  <div className="program__name">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="right">
          <div className="title-bar">
            <Tooltip title="Add New Phase">
              <IconButton color="primary" component="span">
                <AddIcon />
              </IconButton>
            </Tooltip>
            <div className="program__name">Check 1</div>
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          </div>

          <div className="list-phase">
            <ListPhase />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <ListItemIcon>
            <SchoolIcon fontSize="small" />
          </ListItemIcon>
          Freshers
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
