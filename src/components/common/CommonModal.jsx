import React from 'react';
import { Modal } from 'antd';

export default function CommonModal({ 
  title, 
  open,
  onCancel, 
  onOk, 
  footer = null, 
  children 
}) {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      footer={footer}
      
    >
      {children}
    </Modal>
  );
}
