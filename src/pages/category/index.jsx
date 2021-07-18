import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';

import { queryCategory, addCategory, delCategory } from '@/services/ant-design-pro/api';


const getList = async (params) => {
  try {
    const list = await queryCategory(params);
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
    await addCategory(fields);
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
 * @param text,
 * @param record
 * @return bool
 */

const handleRemove = async (text, record) => {
  const hide = message.loading('正在删除');
  if (!text) return true;

  try {
    await delCategory({
      id: record._id,
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};


const TableList = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const actionRef = useRef();
  const [currentRow, setCurrentRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /** 国际化配置 */

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: '分类名',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
      valueType:"datetime"
    },
    {
      title: '操作',
      render: (text, record) => (
        <Popconfirm title="确定要删除吗?" onConfirm={() => {
          handleRemove(text, record);
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}>
          <a href="#">Delete</a>
        </Popconfirm>
      ),
    },
  ];


  return (
    <PageContainer>
      <ProTable
        headerTitle='标签列表'
        actionRef={actionRef}
        rowKey='_id'
        search={{
          labelWidth: 120,
        }}
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
          console.log(value);
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
