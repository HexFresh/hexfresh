import React from 'react';
import { Menu } from 'antd';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './phase-detail.css';

interface ITask {
  id: string;
  checklistId: number;
  typeId: number;
  title: string;
  index: number;
  point: number;
  isCompleted: boolean;
  isChecked: boolean;
  isActive: boolean;
}

interface IChecklist {
  id: number;
  phaseId: number;
  index: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
  tasks: ITask[];
}

const { SubMenu } = Menu;

const click = () => {
  console.log('click');
};

function PhaseDetail() {
  return (
    <div className="phase-detail">
      <div className="topbar"></div>
      <div className="container">
        <div className="sider">
          <div className="menu">
            <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
              <SubMenu key="sub1" title="Checklist 1">
                <Menu.Item key="1">Task 1</Menu.Item>
                <Menu.Item key="2">Task 2</Menu.Item>
                <Menu.Item key="3">Task 3</Menu.Item>
                <Menu.Item key="4">Task 4</Menu.Item>
                <Menu.Item key="5">Task 5</Menu.Item>
                <Menu.Item key="6">Task 6</Menu.Item>
                <Menu.Item key="7">Task 7</Menu.Item>
                <div className="add-btn">
                  <Button
                    onClick={click}
                    className="add-task-btn"
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                  >
                    Add Task
                  </Button>
                </div>
              </SubMenu>
              <SubMenu key="sub2" title="Checklist 2">
                <Menu.Item key="8">Task 8</Menu.Item>
                <Menu.Item key="9">Task 9</Menu.Item>
                <Menu.Item key="10">Task 10</Menu.Item>
                <Menu.Item key="11">Task 11</Menu.Item>
                <div className="add-btn">
                  <Button
                    onClick={click}
                    className="add-task-btn"
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                  >
                    Add Task
                  </Button>
                </div>
              </SubMenu>
              <SubMenu key="sub3" title="Checklist 3">
                <Menu.Item key="12">Task 12</Menu.Item>
                <Menu.Item key="13">Task 13</Menu.Item>
                <Menu.Item key="14">Task 14</Menu.Item>
                <Menu.Item key="15">Task 15</Menu.Item>
                <div className="add-btn">
                  <Button
                    onClick={click}
                    className="add-task-btn"
                    variant="outlined"
                    startIcon={<AddCircleIcon />}
                  >
                    Add Task
                  </Button>
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="add-btn">
            <Button
              className="add-checklist-btn"
              variant="outlined"
              startIcon={<AddCircleIcon />}
            >
              Add Checklist
            </Button>
          </div>
        </div>
        <div className="content">ABC</div>
      </div>
    </div>
  );
}

export default PhaseDetail;
