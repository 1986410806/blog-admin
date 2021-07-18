import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer, Avatar,Tag } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ProDescriptions from '@ant-design/pro-descriptions';
import UpdateForm from './components/UpdateForm';
import { addRule, updateRule, removeRule } from './service';
import { queryArticle } from '@/services/ant-design-pro/api';


const getList = async (pageSize, current) => {
  try {
    const list = await queryArticle({ pageSize, current });
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
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
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
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
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
      title: '标题',
      dataIndex: 'title',
      tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      valueType: 'text',
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      sorter: true,
      hideInForm: true,
      render: arr => (
        <span>
              {arr.map(item => (
                <span color='magenta' key={item}>
                  {item}
                </span>
              ))}
            </span>
      ),
    },
    {
      title: '封面图',
      dataIndex: 'img_url',
      render: val => <Avatar shape='square' src={val} size={40} icon='user' />,
    }
    ,
    {
      title: '标签',
      dataIndex: 'tags',
      render: arr => (
        <span>
              {
                arr.map(item => (
                <Tag color='cyan' key={item.id}>
                  {item.name}
                </Tag>
              ))
              }
      </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'category',
      width: 70,
      render: arr => (
        <span>
              {arr.map(item => (
                <Tag color='blue' key={item.id}>
                  {item.name}
                </Tag>
              ))}
            </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'state',
      width: 70,
      render: val => {
        // 文章发布状态 => 0 草稿，1 已发布
        if (val === 0) {
          return <Tag color='red'>草稿</Tag>;
        }
        if (val === 1) {
          return <Tag color='green'>已发布</Tag>;
        }
      },
    },
    {
      title: '评论是否处理过',
      dataIndex: 'comments',
      width: 50,
      render: comments => {
        let flag = 1;
        const { length } = comments;
        if (length) {
          for (let i = 0; i < length; i++) {
            flag = comments[i].is_handle;
          }
        }
        // 新添加的评论 是否已经处理过 => 1 是 / 2 否
        if (flag === 2) {
          return <Tag color='red'>否</Tag>;
        }
        return <Tag color='green'>是</Tag>;
      },
    },
    {
      title: '观看/点赞/评论',
      width: 120,
      dataIndex: 'meta',
      render: val => (
        <div>
          <span>{val.views}</span> | <span>{val.likes}</span> | <span>{val.comments}</span>
        </div>
      ),
    },
    {
      title: '原创状态',
      dataIndex: 'origin',
      width: 50,
      render: val => {
        // 文章转载状态 => 0 原创，1 转载，2 混合
        if (val === 0) {
          return <Tag color='green'>原创</Tag>;
        }
        if (val === 1) {
          return <Tag color='red'>转载</Tag>;
        }
        return <Tag>混合</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
      valueType: "dateTime"
    },
    {
      title: '操作',
      render: (_, record) => [
        <a
          key='config'
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          修改
        </a>,
        <a href='#'>
          评论
        </a>,
        <a href='#'>
          详情
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle='文章列表'
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
            <PlusOutlined /> 新建
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

      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type='primary'>批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title='新建规则'
        width='400px'
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width='md'
          name='name'
        />
        <ProFormTextArea width='md' name='desc' />
      </ModalForm>
      <UpdateForm
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
          setCurrentRow(undefined);
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
