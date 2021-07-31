import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';

import { queryProject,delProject } from '../../services/ant-design-pro/api';


const getList = async (params) => {
  try {
    const list = await queryProject(params);
    return {
      total: list.data.count,
      data: list.data.list,
      success: true,
    };
  } catch (e) {
    console.error(e);
    message.error(e.msg);
  }
};

/**
 * 添加标签
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addTag(fields);
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除
 *
 * @param
 */

const handleRemove = async (text) => {
  const hide = message.loading('正在删除');

  try {
    await delProject({
      id: text._id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    console.error(error);
    message.error('删除失败，请重试');
    return false;
  }
};


const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /** 国际化配置 */

  const columns = [
    {
      title: '标题',
      width: 150,
      dataIndex: 'title',
    },
    {
      title: '内容',
      width: 350,
      dataIndex: 'content',
    },
    {
      title: 'url',
      width: 100,
      dataIndex: 'url',
    },
    {
      title: '封面图',
      width: 50,
      dataIndex: 'img',
      render: val => <Avatar shape="square" src={val} size={40} icon="user" />,
    },
    {
      title: '状态',
      dataIndex: 'state', // 状态 1 是已经完成 ，2 是正在进行，3 是没完成
      render: val => {
        // 状态 1 是已经完成 ，2 是正在进行，3 是没完成
        if (val === 1) {
          return <Tag color="green">已经完成</Tag>;
        }
        if (val === 2) {
          return <Tag color="red">正在进行</Tag>;
        }
        return <Tag>没完成</Tag>;
      },
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      valueType: 'datetime',
      sorter: true,
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      sorter: true,
      valueType: 'datetime',
    },
    {
      title: '操作',
      width: 150,
      render: (text, record) => (
        <div>
          <Fragment>
            <a onClick={() => this.showModal(record)}>修改</a>
          </Fragment>
          <Popconfirm title='Sure to delete?' onConfirm={() => {
            handleRemove(text);
            actionRef.current.reload();
          }}>
            <Button type='dashed' size='small'> <DeleteOutlined /> 删除</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];


  return (
    <PageContainer>
      <ProTable
        headerTitle='标签列表'
        actionRef={actionRef}
        rowKey='_id'
        search={false}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增
          </Button>,
        ]}
        request={getList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />

      <UpdateForm
        title='新增标签'
        onSubmit={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={(b) => {
          handleModalVisible(b);
          b === false && setCurrentRow(undefined);
        }}
        visible={createModalVisible}
        values={{}}
      />


      <UpdateForm
        title='编辑标签'
        onSubmit={async (value) => {
          const success = await handleUpdate(value);

          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          b === false && setCurrentRow(undefined);
        }}
        visible={updateModalVisible}
        values={currentRow || {}}
      />

    </PageContainer>
  );
};

export default TableList;
