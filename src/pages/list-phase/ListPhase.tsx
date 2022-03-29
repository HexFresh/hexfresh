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
import { PlusOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';
import './list-phase.css';
import DragDrop from './DragDrop';
import { Modal, Input, Button, Select, message } from 'antd';
import { getPhasesOfProgram, createPhase } from '../../api/mentor/mentorApi';

const { Option } = Select;

interface IPhase {
  id: string;
  name: string;
  imageId: string;
  index: number;
}

export default function ListPhase() {
  const [loading, setLoading] = useState(false);
  const [phases, setphases] = useState<IPhase[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState<string>('');
  const [planet, setPlanet] = useState<string>('1');
  const [keyword, setKeyword] = useState('');

  const programId = useParams<{ programId: string }>().programId;

  const fetchPhases = async () => {
    setLoading(true);
    const result = await getPhasesOfProgram(Number(programId), keyword);
    setphases(result);
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'HexF - Phases';

    fetchPhases();
  }, [keyword]);

  const updatePhases = () => {
    fetchPhases();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    submitNewPhase();
  };

  const handleCancel = () => {
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
        message.loading({ content: 'Creating...' }).then(async () => {
          await createPhase(Number(programId), newPhase);
          fetchPhases();
          message.success({ content: 'Created', key: 'success' });
        });
      };
      handleCreatePhase();
      setIsModalVisible(false);
      setName('');
    }
  };

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
              <Link className="link apps" to="/mentor/programs">
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
            <div className="container">
              <div className="name">Phases</div>
              <div className="add-phase">
                <Button
                  icon={<PlusOutlined />}
                  className="add-phase-btn"
                  type="primary"
                  onClick={showModal}
                >
                  Create a new phase
                </Button>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="filter-search">
              <div className="container">
                <div className="search">
                  <SearchIcon style={{ width: '20px', height: '20px' }} />
                  <InputBase
                    style={{ fontSize: '14px', width: '100%' }}
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
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
                    <img style={{ height: '200px' }} src="/no-records.png" />
                  </div>
                ) : (
                  <DragDrop
                    phases={phases}
                    programId={programId}
                    updatePhases={updatePhases}
                  />
                )}
              </div>
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
          <Button key="submit" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}
      >
        <div className="form">
          <div className="field">
            <label>Title</label>
            <Input value={name} onChange={changeNewName} />
          </div>
          <div className="field">
            <label>Choose planet</label>
            <Select
              value={planet}
              style={{ width: '100%' }}
              onChange={changePlanet}
            >
              <Option value="1">Planet 1</Option>
              <Option value="2">Planet 2</Option>
              <Option value="3">Planet 3</Option>
              <Option value="4">Planet 4</Option>
              <Option value="5">Planet 5</Option>
              <Option value="6">Planet 6</Option>
              <Option value="7">Planet 7</Option>
              <Option value="8">Planet 8</Option>
              <Option value="9">Planet 9</Option>
              <Option value="10">Planet 10</Option>
              <Option value="11">Planet 11</Option>
              <Option value="12">Planet 12</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
