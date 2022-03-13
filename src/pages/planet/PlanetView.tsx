import React, { Component } from 'react'
import 'antd/dist/antd.css';
//import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import FooterFresher from '../../components/Layouts/footer/FooterFresher';
import { IRootStore, state } from '../../store/store';
import { connect } from 'react-redux';
import _ from 'lodash'
import TaskItem from '../../components/task/TaskItem';
import { ITask } from '../../interface/program-interface';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

interface IPlanetViewStates {
  selectedTask: ITask| null;
  defaultSelectedKeys:string;
  defaultOpenKeys:string;
}

interface IPlanetViewProps {
  selectedProgram?: typeof state.programStore.selectedProgram;
}

export class PlanetView extends Component<
  IPlanetViewProps,
  IPlanetViewStates
> {

  state = {
    selectedTask:null,
    defaultSelectedKeys:'',
    defaultOpenKeys:'',

  }

  componentDidMount = async () => {
    const {selectedProgram} = this.props;
    const selectedKey = selectedProgram&&selectedProgram.checklists[0].id;
    const firstTask = selectedProgram&&selectedProgram.checklists[0].tasks[0];
    console.log(selectedKey, firstTask);

    this.setState({
      defaultSelectedKeys:selectedKey,
      defaultOpenKeys:firstTask.id,
      selectedTask:firstTask,
    })
    
  }

  componentDidUpdate(preProps: IPlanetViewProps, preState: IPlanetViewStates) {
    //console.log(preProps,preState);
    
  }

  private _onChangeSelectedTask(task:ITask){
    if(task){
      this.setState({
        selectedTask: task,
      })
    }
    
  }

  render() {
    const { selectedProgram } = this.props;
    const {selectedTask, defaultOpenKeys, defaultSelectedKeys} = this.state;
   
    return (
      <Layout className='full-height'>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedProgram?.name}</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
            <Sider className="site-layout-background" width={300}>
              <Menu
                mode="inline"
                defaultSelectedKeys={[defaultSelectedKeys]}
                defaultOpenKeys={[defaultOpenKeys]}
                style={{ height: '100%' }}
              >
                {_.map(
                  selectedProgram.checklists,
                  (checklist) => <SubMenu key={checklist.id} icon={<NotificationOutlined />} title={checklist.name}>
                    {
                      _.map(
                        checklist.tasks,
                        (task) =>
                          <Menu.Item key={task.id} onClick={this._onChangeSelectedTask.bind(this, task)}>{task.name}</Menu.Item>
                      )
                    }
                  </SubMenu>
                )}
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}><TaskItem task={selectedTask}/></Content>
          </Layout>
        </Content>
        <FooterFresher />
      </Layout>
    )
  }
}

const mapStateToProps = (state: IRootStore) => ({
  selectedProgram: state.programStore.selectedProgram,
})

export default connect(mapStateToProps, null)(PlanetView);
