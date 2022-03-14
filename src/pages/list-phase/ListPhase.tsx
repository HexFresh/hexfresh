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
import './list-phase.css';
import DragDrop from './DragDrop';
import { Modal, Input, Button, Select } from 'antd';

const { Option } = Select;

const data = [
  {
    id: '1',
    name: 'phase 1',
    order: 1,
  },
  {
    id: '2',
    name: 'phase 2',
    order: 2,
  },
  {
    id: '3',
    name: 'phase 3',
    order: 3,
  },
  {
    id: '4',
    name: 'phase 4',
    order: 4,
  },
  {
    id: '5',
    name: 'phase 5',
    order: 5,
  },
  {
    id: '6',
    name: 'phase 6',
    order: 6,
  },
  {
    id: '7',
    name: 'phase 7',
    order: 7,
  },
];

interface Iphase {
  id: string;
  name: string;
  order: number;
}

export default function ListPhase() {
  const [phases, setphases] = useState<Iphase[] | []>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState<string>('');

  const programId = useParams<{ programId: string }>().programId;

  console.log({ phases, programId });

  useEffect(() => {
    document.title = 'Phases';
    setphases(data);
  }, []);

  const updatePhase = (phases: Iphase[]) => {
    const newPhases = [...phases];
    setphases(newPhases);
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

  function handleChangePlanet(value: any) {
    console.log(`selected ${value}`);
  }

  const submitNewPhase = () => {
    if (name) {
      const newPhase = {
        id: phases.length + 1 + '',
        name: name,
        order: phases.length + 1,
      };
      const newPhases = [...phases, newPhase];
      setphases(newPhases);
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
                <div className="filter">Filter</div>
                <div className="search">
                  <SearchIcon />
                  <InputBase placeholder="Search" />
                </div>
              </div>
            </div>
            <div className="phases">
              <div className="container">
                <DragDrop
                  phases={phases}
                  programId={programId}
                  updatePhase={updatePhase}
                />
              </div>
            </div>
          </div>
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
        <div className="form">
          <div className="field">
            <label>Name</label>
            <Input value={name} onChange={changeNewName} />
            <br />
            <br />
            <label>Choose planet</label>
            <Select
              defaultValue="lucy"
              style={{ width: '100%' }}
              onChange={handleChangePlanet}
            >
              <Option value="jack" style={{ height: '80px', display: 'flex' }}>
                <img
                  style={{ width: '80px', height: '80px', marginRight: '10px' }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"
                  alt=""
                />
                Hello
              </Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
