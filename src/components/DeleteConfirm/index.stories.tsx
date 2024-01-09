import React, { useState } from 'react';

import { DeleteOutlined } from '@ant-design/icons';
import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

import DeleteConfirm, { DeleteConfirm as DeleteConfirmBaseComponent } from './index';

interface Props {
  onDeleteFunction: () => void;
  setInputValueFunction: () => void;
  openBoolean: () => void;
  openModalFunction: () => void;
  closeModalFunction: () => void;
}

interface ConfirmArgs {
  deleteType: string;
  deleteName: string;
  icon:  string;
  onDelete: () => void;
  inputValue: string | number;
  setInputValue: () => void;
  open: boolean;
  openModal: () => void,
  closeModal :() => void,
}

const DeleteConfirmWrapper = (args: ConfirmArgs) => {
  const [open, setOpen] = useState(true);

  return <DeleteConfirm {...args} open={open} closeModal={() => setOpen(false)} />;
};

const meta: Meta<typeof DeleteConfirmBaseComponent> = {
  component: DeleteConfirmWrapper,
  title: 'Components/Delete and Confirm',
  render: args => <DeleteConfirmWrapper {...args} />,
};

export const Default = () => (
  <DeleteConfirm
    deleteType="environment"
    deleteName="Forty-two"
    onDelete={(e: Event) => action('Delete confirmed')(e)}
  />
);

export const WithConfirmationBlocked = ({
  onDeleteFunction,
  setInputValueFunction,
  openBoolean,
  openModalFunction,
  closeModalFunction,
}: Props) => (
  <DeleteConfirmBaseComponent
    icon={<DeleteOutlined />}
    deleteType="environment"
    deleteName="Forty-two"
    onDelete={onDeleteFunction}
    inputValue=""
    setInputValue={setInputValueFunction}
    open={openBoolean}
    openModal={openModalFunction}
    closeModal={closeModalFunction}
    icon=""
  />
);

export default meta;
