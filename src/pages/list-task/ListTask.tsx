/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {CircularProgress} from '@mui/material';
import {Tooltip, Button, Modal, Select, message, Input} from 'antd';
import './list-task.css';
import {
  getAllTask,
  getAllBadgesOfChecklist,
  getBadges,
  addAvailableBadgeToChecklist, addNewBadgeToChecklist, removeBadgeFromChecklist
} from "./api";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import Sidebar from "../../components/side-bar/Sidebar";
import {getChecklistById} from "../../api/mentor/mentorApi";

const {Option} = Select;

interface ITask {
  id: number;
  title: string;
  point: number;
}

interface IBadge {
  id: number;
  title: string;
  image: string;
}

interface IChecklist {
  title: string;
}

export default function ListTask() {
  const [checklistLoading, setChecklistLoading] = useState(false);
  const [badgesLoading, setBadgesLoading] = useState(false);
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [badges, setBadges] = useState<IBadge[] | []>([]);
  const [allBadges, setAllBadges] = useState<IBadge[] | []>([]);
  const [checklist, setChecklist] = useState<IChecklist | null>(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [addBadgeMode, setAddBadgeMode] = useState('available');
  const [selectedBadge, setSelectedBadge] = useState(null);

  const navigate = useNavigate();
  const {phaseId, programId, checklistId} = useParams<{ phaseId: string, programId: string, checklistId: string }>();
  const refInput = useRef<HTMLInputElement>(null);

  const fetchTasks = async () => {
    setChecklistLoading(true);
    const result = await getAllTask(checklistId);
    setTasks(result);
    setChecklistLoading(false);
  };

  const fetchBadges = async () => {
    setBadgesLoading(true);
    const result = await getAllBadgesOfChecklist(checklistId);
    setBadges(result);
    setBadgesLoading(false);
  }

  const fetchAllBadges = async () => {
    const result = await getBadges({keyword: '', limit: 100});
    setAllBadges(result.rows || []);
  }

  const fetchChecklist = async () => {
    const result = await getChecklistById(Number(phaseId), Number(checklistId));
    setChecklist(result);
  }

  useEffect(() => {
    document.title = 'HexF - List Checklist';
    fetchTasks();
    fetchBadges();
    fetchAllBadges();
    fetchChecklist();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (addBadgeMode === 'available') {
      if (!selectedBadge) {
        message.error({content: 'Please select a badge to add'});
      } else {
        handleAddAvailableBadgeToChecklist();
      }

    } else {
      if (!title || !description || !imageFile) {
        message.error({content: 'Please fill all fields'});
      } else {
        handleAddNewBadgeToChecklist();
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

  const handleAddAvailableBadgeToChecklist = async () => {
    const result = await addAvailableBadgeToChecklist(checklistId, selectedBadge);
    if (result) {
      message.success('Add badge successfully', 0.5);
      await fetchBadges();
      await fetchAllBadges();
      handleCancel();
    } else {
      message.error({content: 'Add badge failed'});
    }
  }

  const handleAddNewBadgeToChecklist = async () => {
    message.loading('Creating...').then(async () => {
      const data = new FormData();
      // @ts-ignore
      data.append('file', imageFile);
      data.append('upload_preset', 'qk9dvfij');
      const res = await axios.post(`https://api.cloudinary.com/v1_1/hexfresh/image/upload`, data);
      const result = await addNewBadgeToChecklist(checklistId, {
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
    await removeBadgeFromChecklist(checklistId, badgeId);
    message.success('Remove badge successfully', 0.5);
    await fetchBadges();
    await fetchAllBadges();
  }

  return (
    <div className="list-task">
      <div className="container">
        <Sidebar/>
        <div className="page-content">
          <div className="topbar">
            <img src="/logo.svg" width="30px" alt="logo"/>
            <p>Hexfresh</p>
          </div>
          <div className="name-page">
            <div className="container">{checklist?.title}</div>
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
          <div className="list-task-content">
            <div className="checklists">
              <div className={"checklists-title"}>Tasks</div>
              <div className="checklists-content">
                {
                  checklistLoading ? (<CircularProgress/>) : (tasks.length > 0 ? (
                    <div className={"checklists-content-container"}>
                      {
                        tasks.map((task, index) => (
                          <div className="checklist" key={index}
                          >
                            <div className="checklist-title">
                              {task.title}
                            </div>
                            <div className="checklist-number-of-tasks">
                              {task.point} points
                            </div>
                          </div>
                        ))
                      }
                    </div>) : (<div className={"checklists-content-container-no"}>No task found</div>))
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
            <Input value={title} onChange={(e) => setTitle(e.target.value)}/>
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
