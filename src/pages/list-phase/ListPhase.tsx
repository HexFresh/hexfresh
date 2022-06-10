import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import AppsIcon from '@mui/icons-material/Apps';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {PlusOutlined} from '@ant-design/icons';
import {CircularProgress} from '@mui/material';
import './list-phase.css';
import DragDrop from './DragDrop';
import {Modal, Input, Button, Select, message} from 'antd';
import {getPhasesOfProgram, createPhase, getImages} from '../../api/mentor/mentorApi';
import Leaderboard from './Leaderboard';

const {Option} = Select;

interface IPhase {
  id: string;
  name: string;
  imageId: string;
  index: number;
}

interface IImage {
  id: number;
  description: string;
  imageLink: string;
}

export default function ListPhase() {
  const [loading, setLoading] = useState(false);
  const [phases, setPhases] = useState<IPhase[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [planet, setPlanet] = useState<string>('1');
  const [keyword, setKeyword] = useState('');
  const [images, setImages] = useState<IImage[]>([]);

  const programId = useParams<{ programId: string }>().programId;

  const fetchPhases = async () => {
    const result = await getPhasesOfProgram(Number(programId), keyword);
    setPhases(result);
  };

  const fetchImages = async () => {
    const result = await getImages();
    setImages(result || []);
  };

  useEffect(() => {
    document.title = 'HexF - Phases';
    const fetchData = async () => {
      setLoading(true);
      await fetchImages();
      await fetchPhases();
      setLoading(false);
    };
    fetchData();
  }, [keyword]);

  const updatePhases = () => {
    fetchPhases().then((r) => {
      console.log(r);
    });
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    submitNewPhase();
  };

  const handleCancel = () => {
    setName('');
    setPlanet('1');
    setIsModalVisible(false);
  };

  const changeNewName = (e: any) => {
    setName(e.target.value);
  };

  function changePlanet(value: any) {
    setPlanet(value);
  }

  const findMaxIndex = (phases: IPhase[]) => {
    let maxIndex = 0;
    for (const phase of phases) {
      if (phase.index > maxIndex) {
        maxIndex = phase.index;
      }
    }
    return maxIndex;
  };

  const submitNewPhase = () => {
    if (name) {
      const newPhase = {
        title: name,
        imageId: planet,
        index: findMaxIndex(phases) + 1,
      };
      const handleCreatePhase = async () => {
        message.loading({content: 'Creating...'}).then(async () => {
          const result = await createPhase(Number(programId), newPhase);
          setPhases(result);
          message.success({content: 'Created', key: 'success'});
          setIsModalVisible(false);
          setName('');
        });
      };
      handleCreatePhase().then((r) => {
        console.log(r);
      });
    }
  };

  return (
    <div className="list-phase">
      <div className="container">
        <div className="menu">
          <Link to="/mentor/programs">
            <div className="logo">
              <img src="/logo.svg" width="40px" alt="logo"/>
            </div>
          </Link>
          <div className="menu-item active">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{timeout: 600}}
              title="Programs"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/programs">
                <AppsIcon sx={{width: 40, height: 40}}/>
              </Link>
            </Tooltip>
          </div>
          <div className="menu-item">
            <Tooltip
              TransitionComponent={Fade}
              TransitionProps={{timeout: 600}}
              title="Freshers"
              placement="right"
              arrow
            >
              <Link className="link apps" to="/mentor/freshers">
                <SchoolIcon sx={{width: 40, height: 40}}/>
              </Link>
            </Tooltip>
          </div>

          <div className="bottom">
            <div className="folder">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{timeout: 600}}
                title="Resources"
                placement="right"
                arrow
              >
                <FolderIcon sx={{width: 30, height: 30}}/>
              </Tooltip>
            </div>
            <div className="settings">
              <Tooltip
                TransitionComponent={Fade}
                TransitionProps={{timeout: 600}}
                title="Settings"
                placement="right"
                arrow
              >
                <SettingsIcon sx={{width: 30, height: 30}}/>
              </Tooltip>
            </div>
            <div className="avatar">
              <Avatar/>
            </div>
          </div>
        </div>
        <div className="page-content">
          <div className="top-bar">
            <img src="/logo.svg" width="30px" alt="logo"/>
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">
              <div className="name">Program's Detail</div>
              <div className="add-phase">
                <Button icon={<PlusOutlined/>} className="add-phase-btn" type="primary" onClick={showModal}>
                  Create a new phase
                </Button>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="filter-search">
              <div className="container">
                <div className="search">
                  <SearchIcon style={{width: '20px', height: '20px'}}/>
                  <InputBase
                    style={{fontSize: '14px', width: '100%'}}
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="filter"></div>
              </div>
            </div>
            <div className="phases">
              {loading ? (
                <CircularProgress/>
              ) : (
                <>
                  <div className="phases-left">
                    <div className="name-space">List phase</div>
                    <div className="container">
                      {phases.length === 0 ? (
                        <div className="img-404">
                          <img alt="img-404" style={{height: '200px'}} src="/no-records.png"/>
                        </div>
                      ) : (
                        <DragDrop phases={phases} programId={programId} updatePhases={updatePhases}/>
                      )}
                    </div>
                  </div>
                  <div className="leaderboard">
                    <div className="name-space">Leaderboard</div>
                    <Leaderboard programId={programId}/>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal"
        title="Create new phase"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button disabled={name === ''} key="submit" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Title</label>
            <Input style={{width: '100%', marginTop: '10px'}} value={name} onChange={changeNewName}/>
          </div>
          <div className="field">
            <label>Choose planet</label>
            <Select value={planet} style={{width: '100%', marginTop: '10px'}} onChange={changePlanet}>
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
    </div>
  );
}
