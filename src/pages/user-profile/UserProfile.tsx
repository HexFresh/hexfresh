/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useRef} from 'react';
import {isEmpty} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import {Button, message, Input, DatePicker, Select, Modal, Tabs} from 'antd';
import {CircularProgress, Tab} from '@mui/material';
import {AimOutlined, EditOutlined, ProfileOutlined, StockOutlined} from '@ant-design/icons';

import {IUserProfile, IUserAccount, IDegree, IDistrict, IJobPosition, IProvince, IWard} from './interface';
import HeaderInternal from '../../components/layouts/Header/HeaderInternal';
import {BadgeList} from '../../components/badges/badge-list/badge-list.component';
import FresherStatistic from '../../components/fresher/statistic/fresher-statistic.component';
import {EmptyResult} from '../../components/results';
import {USER_PROFILE_TABS} from '../../constant';

import {
  createCurrentNewEmptyUserProfile,
  getCurrentUserAccount,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getAllDegree,
  getAllJobPosition,
} from '../../api/userProfile';
import {verifyResetPasswordRequest} from "../../api/verificationApi";
import {IRootDispatch, IRootStore} from '../../store/store';

import './user-profile.css';

const dateFormat = 'YYYY-MM-DD';
const BASE_ADDRESS_API_URL = 'https://provinces.open-api.vn/api';

function onlySpaces(str: string) {
  return str.trim().length === 0;
}

export default function UserProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [userAccount, setUserAccount] = useState<IUserAccount | null>(null);
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);
  const [displayFirstName, setDisplayFirstName] = useState<string>('');
  const [displayLastName, setDisplayLastName] = useState<string>('');
  const [displayEmail, setDisplayEmail] = useState<string>('');
  const [provinces, setProvinces] = useState<IProvince[] | []>([]);
  const [districts, setDistricts] = useState<IDistrict[] | []>([]);
  const [wards, setWards] = useState<IWard[] | []>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedWard, setSelectedWard] = useState<string | null>(null);
  const [selectedStreet, setSelectedStreet] = useState<string>('');
  const [degrees, setDegrees] = useState<IDegree[] | []>([]);
  const [jobPositions, setJobPositions] = useState<IJobPosition[] | []>([]);
  const [edit, setEdit] = useState(false);

  const roleId = localStorage.getItem('roleId');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const refInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<IRootDispatch>();
  const badge = useSelector((state: IRootStore) => (state.badge));
  const selectedTab = useSelector((state: IRootStore) => (state.app.selectedUserTab));
  const [tab, setTab] = useState<USER_PROFILE_TABS>(selectedTab);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    message.loading('Processing...').then(async () => {
      const response = await verifyResetPasswordRequest(oldPassword, newPassword);
      if (response) {
        message.success('Change password successfully');
        handleCancel()
      } else {
        message.error('Wrong old password');
        setOldPassword('');
      }
    });
  };

  const handleCancel = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setIsModalVisible(false);
  };


  const fetchUserAccount = async () => {
    const result = await getCurrentUserAccount();
    setUserAccount(result || null);
    setDisplayEmail(result?.email || '');
  };

  const fetchAllDegree = async () => {
    const result = await getAllDegree();
    setDegrees(result || []);
  };

  const fetchAllJobPosition = async () => {
    const result = await getAllJobPosition();
    setJobPositions(result || []);
  };

  const fetchUserProfile = async () => {
    const result = await getCurrentUserProfile();
    if (result === undefined) {
      const newUF = {
        address: {
          province: null,
          district: null,
          ward: null,
          street: null,
          country: 'Vietnam',
        },
      };
      await createCurrentNewEmptyUserProfile(newUF);
      await fetchUserProfile();
    } else {
      setUserProfile(result);
      setDisplayFirstName(result.firstName || '');
      setDisplayLastName(result.lastName || '');
      setSelectedProvince(result?.address?.province || null);
      setSelectedDistrict(result?.address?.district || null);
      setSelectedWard(result?.address?.ward || null);
      setSelectedStreet(result?.address?.street || '');
      await fetchProvinces();
      if (result?.address?.province?.split(',')[0]) {
        await fetchDistricts(result?.address?.province?.split(',')[0]);
        if (result?.address?.district.split(',')[0]) {
          await fetchWards(result?.address?.district?.split(',')[0]);
        }
      }
    }
  };

  const uploadNewAvatar = async (file: any) => {
    if (file) {
      message.loading('Uploading...').then(async () => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'qk9dvfij');
        const res = await axios.post(`https://api.cloudinary.com/v1_1/hexfresh/image/upload`, data);
        if (res) {
          message.success('Uploaded!', 0.5);
          await updateCurrentUserProfile({avatar: res.data.secure_url});
          await fetchUserProfile();
        }
      });
    }
  };

  const handleUpdateUserProfile = async () => {
    // @ts-ignore
    if (onlySpaces(userProfile.firstName)) {
      message.error('First name could not be empty');
      return;
    }
    // @ts-ignore
    if (onlySpaces(userProfile.lastName)) {
      message.error('Last name could not be empty');
      return;
    }
    message.loading('Updating...').then(async () => {
      const newUserProfile = {
        ...userProfile,
        address: {
          province: selectedProvince,
          district: selectedDistrict,
          ward: selectedWard,
          country: 'Vietnam',
          street: selectedStreet,
        },
      };

      const result = await updateCurrentUserProfile(newUserProfile);
      if (result) {
        message.success('Updated!', 0.5);
      }
      await fetchUserProfile();
      setEdit(false);
    });
  };

  const onDateOfBirthChange = (date: any, dateString: string) => {
    const newUserProfile = {...userProfile, dateOfBirth: dateString};
    setUserProfile(newUserProfile as IUserProfile);
  };

  const fetchProvinces = async () => {
    const rdata = await axios.get(`${BASE_ADDRESS_API_URL}/p/`);
    setProvinces(rdata.data);
  };

  const fetchDistricts = async (provinceCode: any) => {
    const rdata = await axios.get(`${BASE_ADDRESS_API_URL}/p/${provinceCode}`, {params: {depth: 2}});
    setDistricts(rdata.data.districts || []);
  };
  const fetchWards = async (districtCode: any) => {
    const rdata = await axios.get(`${BASE_ADDRESS_API_URL}/d/${districtCode}`, {params: {depth: 2}});
    setWards(rdata.data.wards || []);
  };

  const handleChangeProvince = async (value: string) => {
    setSelectedProvince(value);
    await fetchDistricts(value.split(',')[0]);
    setSelectedDistrict(null);
    setSelectedWard(null);
  };

  const handleChangeDistrict = async (value: string) => {
    setSelectedDistrict(value);
    await fetchWards(value.split(',')[0]);
    setSelectedWard(null);
  };

  const handleChangeWard = async (value: string) => {
    setSelectedWard(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUserAccount(), fetchUserProfile(), fetchAllDegree(), fetchAllJobPosition()])
      setLoading(false);
    };
    fetchData().then(() => {
      setLoading(false);
    });
    dispatch.badge.doFetchBadges();
  }, []);

  useEffect(() => {
    setTab(selectedTab);
  }, [selectedTab])

  return (
    <div className="user-profile-main">
      {
        localStorage.getItem('roleId') === '4' ? <HeaderInternal textColorClassName='txt-color-black'/> : (<></>)
      }
      <div className="user-profile">
        {loading ? (
          <CircularProgress/>
        ) : (
          <>
            <div className="user-profile__container">

              <div className="page-name">Your Profile</div>
              <div className="card-body">
                <div className="cover-img">
                  <div className="card__infor">
                    <div className="avatar">
                      <img
                        src={userProfile?.avatar || 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
                        alt="avt"
                      />
                      <Button
                        onClick={() => {
                          refInput.current?.click();
                        }}
                        className="edit-btn"
                        icon={<EditOutlined/>}
                        shape="circle"
                      >
                        <input
                          ref={refInput}
                          style={{display: 'none'}}
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            if (event.target.files) {
                              uploadNewAvatar(event.target.files[0]);
                            }
                          }}
                        />
                      </Button>
                    </div>
                    <div className="card-body__right">
                      <div className="card-body__right__name">{displayFirstName + ' ' + displayLastName}</div>
                      <div className="card-body__right__email">{displayEmail}</div>
                    </div>
                  </div>
                </div>

                <div className="open-modal">
                  <Button type="primary" className="open-modal-btn" onClick={showModal}>
                    Change Password
                  </Button>
                </div>
              </div>

              <div className="card-body">
                <Tabs defaultActiveKey={tab}>
                  {
                    roleId === '4' && (<Tabs.TabPane tab={<span>
                    <StockOutlined/>
                    Overview
                  </span>}
                                                     tabKey={USER_PROFILE_TABS.OVERVIEW}
                                                     key={USER_PROFILE_TABS.OVERVIEW}
                    >
                      <div className="card-body__container">
                        <FresherStatistic/>
                      </div>
                    </Tabs.TabPane>)
                  }
                  <Tabs.TabPane
                    tab={
                      <span>
                        <ProfileOutlined/>
                        Personal Information
                      </span>
                    }
                    tabKey={USER_PROFILE_TABS.INFORMATIONS}
                    key={USER_PROFILE_TABS.INFORMATIONS}
                  >
                    <div className="card-body__container">
                      <div className="personal-info">
                        <div className="info__title">Personal Information</div>
                        <div className="field">
                          <div className="field__title">Username</div>
                          <Input disabled value={userAccount?.username} className="input" placeholder="Username"/>
                        </div>
                        <div className="field">
                          <div className="field__title">First Name</div>
                          <Input
                            disabled={!edit}
                            value={userProfile?.firstName}
                            onChange={(e) => {
                              const newUserProfile = {...userProfile, firstName: e.target.value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            className="input"
                            placeholder="First Name"
                          />
                        </div>
                        <div className="field">
                          <div className="field__title">Last Name</div>
                          <Input
                            disabled={!edit}
                            value={userProfile?.lastName || ''}
                            onChange={(e) => {
                              const newUserProfile = {...userProfile, lastName: e.target.value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            className="input"
                            placeholder="Last Name"
                          />
                        </div>
                        <div className="field">
                          <div className="field__title">Date of birth</div>
                          <DatePicker
                            disabled={!edit}
                            defaultValue={moment(userProfile?.dateOfBirth || '2022-01-01', dateFormat)}
                            onChange={onDateOfBirthChange}
                            format={dateFormat}
                            placeholder="Due date"
                            className="input"
                          />
                        </div>
                        <div className="field">
                          <div className="field__title">Gender</div>
                          <Select
                            disabled={!edit}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            className="input"
                            placeholder="Gender"
                            onChange={(value) => {
                              const newUserProfile = {...userProfile, gender: value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            value={userProfile?.gender}
                          >
                            <Select.Option value="Male" key="0">
                              Male
                            </Select.Option>
                            <Select.Option value="Female" key="1">
                              Female
                            </Select.Option>
                            <Select.Option value="Other" key="2">
                              Other
                            </Select.Option>
                          </Select>
                        </div>

                        <div className="field">
                          <div className="field__title">Degree</div>
                          <Select
                            disabled={!edit}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            placeholder="Degree"
                            className="input"
                            onChange={(value) => {
                              const newUserProfile = {...userProfile, degreeId: value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            value={userProfile?.degree?.id}
                          >
                            {degrees.map((degree) => (
                              <Select.Option value={degree.id} key={degree.id}>
                                {degree.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>

                        <div className="field">
                          <div className="field__title">Job position</div>
                          <Select
                            disabled={true}
                            showSearch
                            optionFilterProp="children"
                            filterOption={(input: any, option: any) =>
                              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            className="input"
                            placeholder="Job position"
                            onChange={(value) => {
                              const newUserProfile = {...userProfile, jobPositionId: value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            value={userProfile?.job_position?.id}
                          >
                            {jobPositions.map((job) => (
                              <Select.Option value={job.id} key={job.id}>
                                {job.name}
                              </Select.Option>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="contact-info">
                        <div className="info__title">Contact Information</div>
                        <div className="field">
                          <div className="field__title">Email</div>
                          <Input disabled value={userAccount?.email || ''} className="input"/>
                        </div>
                        <div className="field">
                          <div className="field__title">Phone</div>
                          <Input
                            disabled={!edit}
                            value={userProfile?.phoneNumber || ''}
                            onChange={(e) => {
                              const newUserProfile = {...userProfile, phoneNumber: e.target.value};
                              setUserProfile(newUserProfile as IUserProfile);
                            }}
                            className="input"
                            placeholder="Phone"
                          />
                        </div>
                        <div className="field">
                          <div className="field__title">Address</div>
                          <div className="input">
                            <div className="select">
                              <Select
                                disabled={!edit}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                placeholder="Province"
                                style={{
                                  width: '100%',
                                }}
                                onChange={handleChangeProvince}
                                value={selectedProvince}
                              >
                                {provinces.map((province) => (
                                  <Select.Option value={`${province.code},${province.name}`} key={province.code}>
                                    {province.name}
                                  </Select.Option>
                                ))}
                              </Select>
                              <Select
                                disabled={!edit}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                placeholder="District"
                                style={{
                                  width: '100%',
                                }}
                                onChange={handleChangeDistrict}
                                value={selectedDistrict}
                              >
                                {districts.map((district) => (
                                  <Select.Option value={`${district.code},${district.name}`} key={district.code}>
                                    {district.name}
                                  </Select.Option>
                                ))}
                              </Select>
                              <Select
                                disabled={!edit}
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input: any, option: any) =>
                                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                placeholder="Ward"
                                style={{
                                  width: '100%',
                                }}
                                onChange={handleChangeWard}
                                value={selectedWard}
                              >
                                {wards.map((ward) => (
                                  <Select.Option value={`${ward.code},${ward.name}`} key={ward.code}>
                                    {ward.name}
                                  </Select.Option>
                                ))}
                              </Select>
                            </div>
                            <Input
                              disabled={!edit}
                              value={selectedStreet || ''}
                              onChange={(e) => setSelectedStreet(e.target.value)}
                              style={{
                                width: '100%',
                              }}
                              placeholder="Street"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="save-btn__container">
                        {edit ? (
                          <Button className="save-btn" onClick={handleUpdateUserProfile}>
                            Save
                          </Button>
                        ) : (
                          <Button className="edit-profile-btn" onClick={() => setEdit(true)}>
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  </Tabs.TabPane>
                  {
                    roleId === '4' && (<Tabs.TabPane
                      tab={
                        <span>
                        <AimOutlined/>
                        Badges
                      </span>
                      }
                      tabKey={USER_PROFILE_TABS.BADGES}
                      key={USER_PROFILE_TABS.BADGES}
                    >
                      <div className="card-body__container">
                        {isEmpty(badge?.badges) &&
                        !badge?.isFetchingBadges ?
                          <EmptyResult message="Your badges will displayed here."/> :
                          <BadgeList badges={badge?.badges} count={1} page={1}/>}
                      </div>
                    </Tabs.TabPane>)
                  }
                </Tabs>
              </div>
            </div>
          </>
        )}
      </div>
      <Modal
        className="modal"
        title="Change Password"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            disabled={oldPassword === '' || newPassword === '' || confirmPassword === '' || newPassword !== confirmPassword}
            key="submit"
            type="primary" onClick={handleOk}>
            Change Password
          </Button>,
        ]}
      >
        <div className="change-password-form">
          <div className="field">
            <div className={"title"}>Old password</div>
            <Input.Password style={{width: '100%', marginTop: '10px', marginBottom: "20px"}} value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}/>
          </div>
          <div className="field">
            <div className={"title"}>New password</div>
            <Input.Password style={{width: '100%', marginTop: '10px', marginBottom: "20px"}} value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}/>
          </div>
          <div className="field">
            <div className={"title"}>Confirm password</div>
            <div className={"input"}>
              <Input.Password
                style={{width: '100%', marginTop: '10px', marginBottom: "20px"}}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}/>
              {(confirmPassword !== newPassword && confirmPassword !== "" && newPassword !== "") && (
                <div style={{
                  marginTop: '-15px',
                  color: 'red',
                }} className={"validate"}>The password confirmation does not match</div>)}
            </div>

          </div>
        </div>
      </Modal>
    </div>
  );
}
