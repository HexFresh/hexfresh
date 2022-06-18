/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {Tooltip, Button, Modal, Select, message, Input} from 'antd';
import './list-checklist.css';
import {
  getAllChecklist,
  getAllBadgesOfPhase,
  getBadges,
  addAvailableBadgeToPhase, addNewBadgeToPhase, removeBadgeFromPhase
} from "./api";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import Sidebar from "../../components/side-bar/Sidebar";

const {Option} = Select;

interface IChecklist {
  id: number;
  title: string;
  numberOfTasks: number;
}

interface IBadge {
  id: number;
  title: string;
  image: string;
}

export default function ListChecklist() {
  const [checklistLoading, setChecklistLoading] = useState(false);
  const [badgesLoading, setBadgesLoading] = useState(false);
  const [checklists, setChecklists] = useState<IChecklist[] | []>([]);
  const [badges, setBadges] = useState<IBadge[] | []>([]);
  const [allBadges, setAllBadges] = useState<IBadge[] | []>([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [addBadgeMode, setAddBadgeMode] = useState('available');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const navigate = useNavigate();
  const {phaseId, programId} = useParams<{ phaseId: string, programId: string }>();
  const refInput = useRef<HTMLInputElement>(null);

  const fetchChecklists = async () => {
    setChecklistLoading(true);
    const result = await getAllChecklist(phaseId);
    console.log('result: ', result);
    setChecklists(result);
    setChecklistLoading(false);
  };

  const fetchBadges = async () => {
    setBadgesLoading(true);
    const result = await getAllBadgesOfPhase(phaseId);
    setBadges(result);
    setBadgesLoading(false);
  }

  const fetchAllBadges = async () => {
    const result = await getBadges({keyword: '', limit: 100});
    setAllBadges(result.rows || []);
  }

  useEffect(() => {
    document.title = 'HexF - List Checklist';
    fetchChecklists();
    fetchBadges();
    fetchAllBadges();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (addBadgeMode === 'available') {
      if (!selectedBadge) {
        message.error({content: 'Please select a badge to add'});
      } else {
        handleAddAvailableBadgeToPhase();
      }

    } else {
      if (!title || !description || !imageFile) {
        message.error({content: 'Please fill all fields'});
      } else {
        handleAddNewBadgeToPhase();
      }
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setTitle('');
    setDescription('');
    setImageFile(null);
    setSelectedBadge(null);
    setAddBadgeMode('available');
  };

  const uploadNewBadgeImage = (file: any) => {
    if (file) {
      setImageFile(file);
    }
  };

  const handleAddAvailableBadgeToPhase = async () => {
    const result = await addAvailableBadgeToPhase(phaseId, selectedBadge);
    if (result) {
      message.success('Add badge successfully', 0.5);
      await fetchBadges();
      await fetchAllBadges();
      handleCancel();
    } else {
      message.error({content: 'Add badge failed'});
    }
  }

  const handleAddNewBadgeToPhase = async () => {
    message.loading('Creating...').then(async () => {
      const data = new FormData();
      // @ts-ignore
      data.append('file', imageFile);
      data.append('upload_preset', 'qk9dvfij');
      const res = await axios.post(`https://api.cloudinary.com/v1_1/hexfresh/image/upload`, data);
      const result = await addNewBadgeToPhase(phaseId, {
        title, description, image: res.data.secure_url
      })
      console.log(result);
      if (result) {
        message.success('Add badge successfully', 0.5);
        await fetchBadges();
        await fetchAllBadges();
        handleCancel();
      }
    });
  }

  const handleRemoveBadge = async (badgeId: any) => {
    await removeBadgeFromPhase(phaseId, badgeId);
    message.success('Remove badge successfully', 0.5);
    await fetchBadges();
    await fetchAllBadges();
  }

  return (
    <div className="list-checklist">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo"/>
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">Phase Detail</div>
          </div>
          <div className="filter-search">
            <div className="container">
              <div className="search">
              </div>
              <div className="filter">
                <Button type={"primary"}
                        onClick={() => navigate(`/mentor/programs/${programId}/phases/${phaseId}/edit`)}>
                  Edit mode
                </Button>
              </div>
            </div>
          </div>
          <div className="list-checklist-content">
            <div className="checklists">
              <div className={"checklists-title"}>Checklists</div>
              <div className="checklists-content">
                {
                  checklistLoading ? (<CircularProgress/>) : (checklists.length > 0 ? (
                    <div className={"checklists-content-container"}>
                      {
                        checklists.map((checklist, index) => (
                          <div className="checklist" key={index}
                               onClick={() => navigate(`/mentor/programs/${programId}/phases/${phaseId}/checklist/${checklist.id}`)}>
                            <div className="checklist-title">
                              {checklist.title}
                            </div>
                            <div className="checklist-number-of-tasks">
                              {checklist.numberOfTasks} task(s)
                            </div>
                          </div>
                        ))
                      }
                    </div>) : (<div className={"checklists-content-container-no"}>No checklist found</div>))
                }
              </div>
            </div>
            <div className="badges">
              <div className={"badges-title"}>Badges</div>
              <div className="badges-content">
                {
                  badgesLoading ? (<CircularProgress/>) : (<div className={"badges-content-container"}>
                    <div className={"badges-content-container-wrap"}>
                      {badges.map(badge => {
                        return (<div key={badge.id} className="badge">
                            <Tooltip title={badge.title}>
                              <div className="badge-left">
                                <div className="badge-avatar">
                                  <img style={{
                                    maxWidth: '100px', maxHeight: '100px', objectFit: 'cover',
                                  }}
                                       src={badge.image}
                                       alt=""/>
                                </div>
                              </div>
                            </Tooltip>
                            <div className="badge-right">
                              <Tooltip className={"remove-btn"} title="remove">
                                <Button shape="circle" onClick={() => handleRemoveBadge(badge.id)}
                                        icon={<DeleteOutlined/>}/>
                              </Tooltip>
                            </div>
                          </div>
                        )
                      })}
                      <div onClick={showModal} className={"add-new-btn"}>+</div>
                    </div>
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="modal"
        title="Add badge to phase"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[<Button key="back" onClick={handleCancel}>
          Cancel
        </Button>, <Button key="create" type="primary" onClick={handleOk}>
          Create
        </Button>,]}
      >
        <div style={{display: 'flex'}}>
          <div style={{width: '150px'}}>
            Mode
          </div>
          <Select value={addBadgeMode} style={{width: '100%'}} onChange={(value) => setAddBadgeMode(value)}>
            <Option value="available">Available badge</Option>
            <Option value="new">Add new badge</Option>
          </Select>
        </div>

        {addBadgeMode === 'available' ? (<div style={{display: 'flex', marginTop: '20px'}}>
          <div style={{width: '150px'}}>
            Badge
          </div>
          <Select placeholder={"Select badge"} value={selectedBadge} style={{width: '100%'}}
                  onChange={(value) => setSelectedBadge(value)}>
            {allBadges.map(badge => {
              return (<Option style={{
                display: 'flex', alignItems: 'center',
              }} key={badge.id} value={badge.id}>
                <img style={{
                  width: '20px', height: '20px', objectFit: 'cover', marginRight: '10px',
                }} src={badge.image} alt=""/>
                {badge.title}
              </Option>)
            })}
          </Select>
        </div>) : (<div className="form-add-badge">
          <div style={{display: 'flex', marginTop: '20px'}}>
            <div style={{width: '150px'}}>Title</div>
            <Input value={title} onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setTitle(e.target.value)}/>
          </div>
          <div style={{display: 'flex', marginTop: '20px'}}>
            <div style={{width: '150px'}}>Description</div>
            <Input value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div style={{display: 'flex', marginTop: '20px'}}>
            <div style={{width: '150px'}}>Image</div>
            <div style={{width: '100%'}}>
              {imageFile === null ? <></> : (
                <img src={URL.createObjectURL(imageFile)} alt="img" style={{width: '200px', marginBottom: '20px'}}/>)}
              <Button
                style={{width: '100%'}}
                onClick={() => {
                  refInput.current?.click();
                }}
                className="edit-btn"
                icon={imageFile === null ? <PlusOutlined/> : <EditOutlined/>}
              >
                <input
                  ref={refInput}
                  style={{display: 'none'}}
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files) {
                      uploadNewBadgeImage(event.target.files[0]);
                      // @ts-ignore
                      event.target.value = null;
                    }
                  }}
                />
              </Button>
            </div>
          </div>
        </div>)}
      </Modal>
    </div>
  );
}
