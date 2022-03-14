import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './list-phase.css';
import { Modal, Button } from 'antd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Iphase {
  id: string;
  name: string;
  order: number;
}

export default function PhaseItem(props: any) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { phase } = props;

  const programId = useParams<{ programId: string }>().programId;

  useEffect(() => {}, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="phase-item">
      <div className="phase">
        <div className="left">
          <div className="cover-photo">
            <img
              src="https://photo-net-production-images.s3.amazonaws.com/18577502-lg.jpg"
              alt="cover"
            />
          </div>
          <Link to={`/mentor/programs/${programId}/phases/${phase.id}`}>
            <div className="phase-name">{phase.name}</div>
          </Link>
        </div>
        <div className="right">
          <IconButton aria-label="delete" size="small" onClick={handleClick}>
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Modal
        title="Create new phase"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
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
        <MenuItem onClick={showModal}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          {`Edit ${phase.name}`}
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          {`Delete ${phase.name}`}
        </MenuItem>
      </Menu>
    </div>
  );
}
