import { DatePicker, Input, Select } from "antd";
import moment from "moment";
import { memo } from "react";
import { IAddress, IQuickUser, IUser } from "../../store/user/user-interface";

export const UserInformationTab = memo((
  {
    userProfile,
    userAccount,
    address,
    dateFormat = 'YYYY-MM-DD',
  }:
    {
      userAccount: IQuickUser,
      userProfile: IUser,
      dateFormat: string,
      address: IAddress,
    }
) => {
  return <div className="card-body__container">
    <div className="personal-info">
      <div className="info__title">Personal Information</div>
      <div className="field">
        <div className="field__title">Username</div>
        <Input disabled value={userAccount?.username} className="input" placeholder="Username" />
      </div>
      <div className="field">
        <div className="field__title">First Name</div>
        <Input
          disabled
          value={userProfile?.firstName}
          className="input"
          placeholder="First Name"
        />
      </div>
      <div className="field">
        <div className="field__title">Last Name</div>
        <Input
          disabled
          value={userProfile?.lastName || ''}
          className="input"
          placeholder="Last Name"
        />
      </div>
      <div className="field">
        <div className="field__title">Date of birth</div>
        <DatePicker
          disabled
          defaultValue={moment(userProfile?.dateOfBirth || '2022-01-01', dateFormat)}
          format={dateFormat}
          placeholder="Due date"
          className="input"
        />
      </div>
      <div className="field">
        <div className="field__title">Gender</div>
        <Select
          disabled
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="input"
          placeholder="Gender"
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
          disabled
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          placeholder="Degree"
          className="input"
          value={userProfile?.degree?.id}
        >
        </Select>
      </div>

      <div className="field">
        <div className="field__title">Job position</div>
        <Select
          disabled
          showSearch
          optionFilterProp="children"
          filterOption={(input: any, option: any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          className="input"
          placeholder="Job position"
          value={userProfile?.job_position?.id}
        >
        </Select>
      </div>
    </div>
    <div className="contact-info">
      <div className="info__title">Contact Information</div>
      <div className="field">
        <div className="field__title">Email</div>
        <Input disabled value={userAccount?.email || ''} className="input" />
      </div>
      <div className="field">
        <div className="field__title">Phone</div>
        <Input
          disabled
          value={userProfile?.phoneNumber || ''}
          className="input"
          placeholder="Phone"
        />
      </div>
      <div className="field">
        <div className="field__title">Address</div>
        <div className="input">
          <div className="select">
            <Select
              disabled
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Province"
              style={{
                width: '100%',
              }}
              value={address.province}
            >
            </Select>
            <Select
              disabled
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="District"
              style={{
                width: '100%',
              }}
              value={address.district}
            >
            </Select>
            <Select
              disabled
              showSearch
              optionFilterProp="children"
              filterOption={(input: any, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Ward"
              style={{
                width: '100%',
              }}
              value={address.ward}
            >
            </Select>
          </div>
          <Input
            disabled
            value={address.street || ''}
            style={{
              width: '100%',
            }}
            placeholder="Street"
          />
        </div>
      </div>
    </div>
  </div>
})