import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './list-phase.css';
import { Modal, Button, message } from 'antd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePhase } from '../../api/mentor/mentorApi';

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

  const { phase, updatePhase } = props;

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

  const handleDeletePhase = async () => {
    message.loading({ content: 'Deleting...' }).then(async () => {
      await deletePhase(Number(programId), Number(phase.id));
      updatePhase();
      message.success({ content: 'Deleted', duration: 2 });
    });
  };

  return (
    <div className="phase-item">
      <div className="phase">
        <div className="left">
          <div className="cover-photo">
            <img src={phase?.image?.imageLink} alt="cover" />
          </div>
          <Link to={`/mentor/programs/${programId}/phases/${phase.id}`}>
            <div className="phase-name">{phase.title}</div>
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
          {`Edit ${phase.title}`}
        </MenuItem>
        <MenuItem onClick={handleDeletePhase}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          {`Delete ${phase.title}`}
        </MenuItem>
      </Menu>
    </div>
  );
}
