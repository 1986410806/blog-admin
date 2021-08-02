import React, { Component, useRef } from 'react';
import {
  ProFormText,
  ProFormTextArea,
  ModalForm, ProFormUploadButton, ProFormSelect, ProFormDateRangePicker,
} from '@ant-design/pro-form';
import { getQiniuToken as getQiniuTokenService, addProject, updateProject } from '../../../services/ant-design-pro/api';
import { message } from 'antd';
import { history } from 'umi';
import { upload } from '../../../util/qiniu';


/**
 * 添加节点
 *
 * @param fields
 */
const ProjectCreate = async (fields) => {
  const hide = message.loading('正在添加');
  let dateRange = fields.dateRange;
  fields.start_time = dateRange[0];
  fields.end_time = dateRange[1];
  fields.img = fields.img[0].url;
  delete fields.dateRange;

  console.log(fields);
  try {
    await addProject({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    console.error(error);
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新文章
 *
 * @param fields
 */
const ProjectUpdate = async (fields) => {

  const hide = message.loading('正在添加');

  let dateRange = fields.dateRange;
  fields.start_time = dateRange[0];
  fields.end_time = dateRange[1];
  fields.img = fields.img[0].url;
  delete fields.dateRange;

  try {


    await updateProject({ ...fields });
    hide();
    message.success('更新成功');
    history.push('/article/list');
    return true;
  } catch (error) {
    hide();
    console.error(error);
    message.error('更新失败请重试！');
    return false;
  }
};


class UpdateForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
  };

  formRef = useRef();

  componentDidMount() {
    const props = this.props;

    // 初始化表单参数
    this.formRef?.current?.setFieldsValue({
      id: props.values?._id,
      title: props.values?.title,
      content: props.values?.content,
      url: props.values?.url,
      dateRange: [props.values?.start_time, props.values?.end_time],
      img: props.values?.img ? [{ path: props.values?.img }] : [],
      state: props.values?.state,

    });
  }


  setImgUrl = (path) => {
    this.formRef?.current?.setFieldsValue({
      img: [{
        'url': path,
      }],
    });
  };

  render() {

    const props = this.props;
    return (
      <ModalForm
        formRef={this.formRef}
        onVisibleChange={(b) => {
          this.formRef.current?.resetFields();
          props.onCancel && props.onCancel(b);
        }}
        visible={props.visible}
        title={props.title}
        onFinish={values => {
          props.values?.id ? ProjectUpdate(values) : ProjectCreate(values);

          props.onOk();
        }}
      >
        {props.values?._id &&
        <ProFormText
          width='md'
          label='ID'
          readonly
          name='id'
          fieldProps={{ onkeydown: (e) => e.preventDefault(e) }}
        />
        }
        <ProFormText
          name='title'
          label='标题'
          width='md'
          rules={[
            {
              required: true,
              message: '请输入标题！',
            },
          ]}
        />
        <ProFormText
          name='url'
          width='md'
          placeholder='链接'
          rules={[
            {
              required: true,
              message: '链接不能为空！',
            },
          ]}
        />
        <ProFormUploadButton
          label='封面图'
          name='img'
          max={1}
          fieldProps={{
            width: 'lg',
            listType: 'picture-card',
          }}
          action={async (file) => {
            const token = await getQiniuTokenService();
            upload(file, token.data, setImgUrl);
          }}
          rules={[
            {
              required: true,
              message: '请上传封面图',
            },
          ]}
        />
        <ProFormTextArea
          name='content'
          width='lg'
          label='内容'
          placeholder='请输入至少五个字符'
        />
        <ProFormDateRangePicker name='dateRange' label='日期区间' />

        <ProFormSelect
          name='state'
          label='选择状态'
          options={[
            { value: 1, label: '已完成' },
            { value: 2, label: '正在进行中' },
            { value: 3, label: '没完成' },
          ]}
          placeholder='选择项目状态'
          rules={[
            {
              required: true,
              message: '请选择项目状态',
            },
          ]}
        />
      </ModalForm>
    );
  }
}

export default UpdateForm;
