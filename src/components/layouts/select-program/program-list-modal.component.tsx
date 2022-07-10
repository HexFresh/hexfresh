import { Button, List, Modal } from "antd";
import { isEmpty } from "lodash";
import { memo, useCallback, useMemo } from "react";
import { IProgram } from "../../../interface/program-interface";
import { EmptyResult } from "../../results";
import { SelectProgramItem } from "./select-program-item.component";

import './program-list-modal.style.scss';
import { useDispatch, useSelector } from "react-redux";
import { IRootDispatch, IRootStore } from "../../../store/store";

export const ProgramsModal = memo((
  {
    programs,
    onCancel,
    isOpen,
    isLoading,
  }: {
    programs: IProgram[],
    onCancel: any,
    isLoading: boolean,
    isOpen: boolean,
  }
) => {
  const dispatch = useDispatch<IRootDispatch>();
  const { program: currentProggram } = useSelector((state: IRootStore) => state.programStore);

  const handleChangeProgram = useCallback(async (program: IProgram) => {
    if (currentProggram?.programId !== program?.id) {
      await dispatch.programStore.doFetchProgramByProgramId(program.id);
    }
    onCancel();
  }, [currentProggram?.programId, dispatch.programStore, onCancel])

  const actions = useMemo(() => ([
    <Button key="back" onClick={onCancel}>
      Close
    </Button>
  ]), [onCancel]);

  const modalContent = isEmpty(programs) ?
    <EmptyResult message="Your list program will display here." /> :
    <List
      bordered
      dataSource={programs}
      renderItem={(item) => {
        return <List.Item key={item.id} onClick={() => { handleChangeProgram(item) }}>
          <SelectProgramItem program={item} txtColor='black' />
        </List.Item>
      }}
    />;

  return <Modal
    title='View list programs'
    visible={isOpen}
    onCancel={onCancel}
    footer={actions}
  >
    {modalContent}
  </Modal>;
})

ProgramsModal.displayName = 'ProgramsModal';