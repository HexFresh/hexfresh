import React, { useEffect, useState } from 'react'
import { isEmpty, map } from 'lodash';
import { Card } from 'antd'
import 'antd/dist/antd.css';
import Title from 'antd/lib/typography/Title';
import { useDispatch, useSelector } from 'react-redux';
import { IRootDispatch, IRootStore } from '../../../store/store';

import './select-program.style.scss'
import { SelectProgramItem } from './select-program-item.component';
import { ProgramsModal } from './program-list-modal.component';

const SelectProgram = () => {
  const dispatch = useDispatch<IRootDispatch>();
  const { program } = useSelector((state: IRootStore) => state.programStore?.program);
  const { programs, isFetchingProgram } = useSelector((state: IRootStore) => state.programStore);
  const [ openModal, setOpenModal ] = useState<boolean>(false);

  useEffect(() => {
    isEmpty(programs) && dispatch.programStore.doFetchUserPrograms()
  }, [ dispatch.programStore, programs ])

  return (
    <>
      <div className='program-card'>
        <Card bordered={true} className='bg-glassmorphism border-card'>
          <Title className='txt-color-white' level={4}>Your current program</Title>
          <SelectProgramItem
            program={program}
            onToggleSelectProgramModal={() => setOpenModal(true)}
            enableSwitch />
        </Card>
      </div>
      <ProgramsModal
        programs={map(programs, program => program?.program)}
        isOpen={openModal}
        onCancel={() => {setOpenModal(false); console.log('123123123123123123');
        }}
        isLoading={isFetchingProgram}
      />
    </>
  )
}

export default SelectProgram;