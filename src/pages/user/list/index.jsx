import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm,Tag } from 'antd';
import React, { useState, useRef, Fragment } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';

import { queryUser } from '@/services/ant-design-pro/api';


const getList = async (params) => {
  try {
    const list = await queryUser(params);
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



const TableList = () => {
  const actionRef = useRef();
  const [selectedRowsState, setSelectedRows] = useState([]);

  /** 国际化配置 */

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机',
      dataIndex: 'phone',
    },
    {
      title: '头像',
      dataIndex: 'img_url',
    },
    {
      title: '个人介绍',
      width: 250,
      dataIndex: 'introduce',
    },
    {
      title: '类型',
      dataIndex: 'type',
      // 0：管理员 1：其他用户
      render: val =>
        !val ? <Tag color="green">管理员</Tag> : <Tag color="blue">其他用户</Tag>,
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'datatime',
      sorter: true,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <Popconfirm title='Sure to delete?' onConfirm={() => {
            handleRemove(text);
            actionRef.current.reload();
          }}>
            <Button type='dashed' size='small'> <DeleteOutlined /> 删除</Button>
          </Popconfirm>
        </Fragment>
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
        request={getList}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
    </PageContainer>
  );
};

export default TableList;
