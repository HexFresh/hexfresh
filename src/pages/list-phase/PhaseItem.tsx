import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import './list-phase.css';
import {Modal, Button, message, Select, Input} from 'antd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deletePhase, updatePhase, getImages} from '../../api/mentor/mentorApi';

const {Option} = Select;

interface Iphase {
  id: string;
  title: string;
  index: number;
  imageId: string;
}

interface IImage {
  id: number;
  description: string;
  imageLink: string;
}

export default function PhaseItem(props: any) {
  const {phase, updatePhases} = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [updatedPhase, setUpdatedPhase] = useState<Iphase>(phase);
  const [disableTitle, setDisableTitle] = useState(true);
  const [disableImage, setDisableImage] = useState(true);
  const [images, setImages] = useState<IImage[]>([]);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const programId = useParams<{ programId: string }>().programId;

  useEffect(() => {
    const fetchImages = async () => {
      const reusult = await getImages("planet");
      setImages(reusult || []);
    };
    fetchImages();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const data = {...updatedPhase, imageId: Number(updatedPhase.imageId)};
    const handleUpdatePhase = async () => {
      message.loading({content: 'Updating...', key: 'update'}).then(async () => {
        await updatePhase(Number(programId), Number(phase.id), data);
        message.success({content: 'Updated', key: 'update'});
        updatePhases();
        setIsModalVisible(false);
      });
    };
    handleUpdatePhase();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeletePhase = async () => {
    message.loading({content: 'Deleting...'}).then(async () => {
      await deletePhase(Number(programId), Number(phase.id));
      updatePhases();
      message.success({content: 'Deleted', duration: 2});
    });
  };

  return (
    <div className="phase-item">
      <div className="phase">
        <div className="left">
          <div className="cover-photo">
            <img src={phase?.image?.imageLink} alt="cover"/>
          </div>
          <Link to={`/mentor/programs/${programId}/phases/${phase.id}`}>
            <div className="phase-name">{phase.title}</div>
          </Link>
        </div>
        <div className="right">
          <IconButton aria-label="delete" size="small" onClick={handleClick}>
            <MoreHorizIcon fontSize="small"/>
          </IconButton>
        </div>
      </div>
      <Modal
        title={`Update ${phase.title}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={disableTitle && disableImage}>
            Save
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Title</label>
            <Input
              value={updatedPhase.title}
              style={{marginBottom: '25px', marginTop: '6px'}}
              onChange={(e) => {
                setDisableTitle(phase.title === e.target.value);
                setUpdatedPhase({...updatedPhase, title: e.target.value});
              }}
            />
          </div>
          <div className="field">
            <label>Choose planet</label>
            <Select
              value={updatedPhase.imageId.toString()}
              style={{width: '100%', marginBottom: '25px', marginTop: '6px'}}
              onChange={(value) => {
                setDisableImage(phase.imageId === Number(value));
                setUpdatedPhase({...updatedPhase, imageId: value});
              }}
            >
              {images.map((image) => (
                <Option
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  key={image.id}
                  value={image.id.toString()}
                >
                  <img
                    style={{
                      width: '20px',
                      height: '20px',
                      objectFit: 'cover',
                      marginRight: '10px',
                    }}
                    src={image.imageLink}
                    alt="img"
                  />
                  {image.description || 'No description'}
                </Option>
              ))}
            </Select>
          </div>
        </div>
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
        transformOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      >
        <MenuItem onClick={showModal}>
          <ListItemIcon>
            <EditIcon fontSize="small"/>
          </ListItemIcon>
          {`Edit`}
        </MenuItem>
        <MenuItem onClick={handleDeletePhase}>
          <ListItemIcon>
            <DeleteIcon fontSize="small"/>
          </ListItemIcon>
          {`Delete`}
        </MenuItem>
      </Menu>
    </div>
  );
}
