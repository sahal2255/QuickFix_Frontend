import React from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function CategoryForm() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('categoryName', values.categoryName);

      // Ensure categoryImage is an array and has at least one file
      if (values.categoryImage && values.categoryImage.length > 0) {
        formData.append('categoryImage', values.categoryImage[0].originFileObj);
      } else {
        console.log('No image file found');
      }

      // Log FormData entries
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      // Here, you would send formData to your server using fetch or axios
      // e.g., await axios.post('/your-api-endpoint', formData);

    } catch (error) {
      console.error('Failed to submit form:', error);
    }
  };

  const onFinishFailed = () => {
    console.log('Form submission failed');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white text-black rounded-lg shadow-lg">
      <Form
        form={form}
        name="categoryForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        {/* Category Name */}
        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: 'Please input the category name!' }]}
        >
          <Input className="p-2 bg-white text-black rounded" />
        </Form.Item>

        {/* Category Image */}
        <Form.Item
          label="Category Image"
          name="categoryImage"
          rules={[{ required: true, message: 'Please upload the category image!' }]}
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            // Handle event to extract file list
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            className="w-full p-2 bg-white text-black rounded"
            beforeUpload={() => false} // Prevent automatic upload
            listType="picture"
            maxCount={1} // Ensure only one file can be uploaded
          >
            <Button icon={<UploadOutlined />} className="bg-white text-black">
              Click to Upload
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-red-500 hover:bg-red-700 text-white w-full">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
