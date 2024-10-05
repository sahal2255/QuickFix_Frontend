// src/components/common/CommonAlert.js
import { Modal } from 'antd';

export const CommonSweetAlert = (title, content, onOk, onCancel) => {
  Modal.confirm({
    title: title,
    content: content,
    okText: 'Confirm',
    cancelText: 'Cancel',
    onOk() {
      if (typeof onOk === 'function') {
        onOk();
      }
    },
    onCancel() {
      if (typeof onCancel === 'function') {
        onCancel();
      }
    }
  });
};
