import React, { useRef }  from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm,
} from '@ant-design/pro-form';

const UpdateForm = (props) => {
  const formRef = useRef();
  return (
    <ModalForm
      formRef={formRef}
      onVisibleChange={(b) =>{
        formRef.current?.resetFields();
        props.onCancel && props.onCancel(b)
      }}
      visible={props.visible}
      title={props.title}
      onFinish={props.onSubmit}
      initialValues={{
        title: props.values?.name,
        desc: props.values?.desc ,
      }}
    >
      <ProFormText
        name='name'
        label='标签名称'
        width='md'
        rules={[
          {
            required: true,
            message: '请输入标签！',
          },
        ]}
      />
      <ProFormTextArea
        name='desc'
        width='md'
        label='规则描述'
        placeholder='请输入至少五个字符'
      />
    </ModalForm>
  );
};

export default UpdateForm;
