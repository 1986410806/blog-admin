import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, message, Tag, Image, Space, Popconfirm } from 'antd';
import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { queryArticle, delArticle } from '@/services/ant-design-pro/api';
import { history } from 'umi';

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

const articleDel = async (param) => {
  const hide = message.loading('正在添加');

  try {
    await delArticle(param);
    hide();
    message.info('删除成功');
  } catch (e) {
    hide();
    console.error(e);
    message.error(e.msg);
  }
};

const TableList = () => {

  /** 国际化配置 */
  const actionRef = useRef();
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      tip: '可跳转去博客详情页',
      key: 'title',
      render: (val) => {
        return (
          <a key='1'>{val}</a>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      valueType: 'text',
      key: 'author',
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      sorter: true,
      hideInForm: true,
      key: 'keyword',
      render: arr => (
        <span key={arr}>
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
      key: 'img_url',
      render: val => <Image shape='square' src={val} key={val} width={100} preview={{
        src: val,
      }}
                            fallback='data:image/png;base64,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'
      />,
    }
    ,
    {
      title: '标签',
      dataIndex: 'tags',
      key: 'tags',
      render: arr => (
        <span key={1}>
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
      key: 'category',
      width: 70,
      render: arr => (
        <span key={2}>
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
      key: 'state',
      width: 70,
      render: val => {
        // 文章发布状态 => 0 草稿，1 已发布
        if (val === 0) {
          return <Tag color='red' key={val}>草稿</Tag>;
        }
        if (val === 1) {
          return <Tag color='green' key={val}>已发布</Tag>;
        }
      },
    },
    {
      title: '评论是否处理过',
      dataIndex: 'comments',
      key: 'comments',

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
          return <Tag color='red' key={flag}>否</Tag>;
        }
        return <Tag color='green' key={flag}>是</Tag>;
      },
    },
    {
      title: '观看/点赞/评论',
      width: 120,
      key: 'meta',

      dataIndex: 'meta',
      render: val => (
        <div key={3}>
          <span>{val.views}</span> / <span>{val.likes}</span> / <span>{val.comments}</span>
        </div>
      ),
    },
    {
      title: '原创状态',
      dataIndex: 'origin',
      key: 'origin',
      width: 50,
      render: val => {
        // 文章转载状态 => 0 原创，1 转载，2 混合
        if (val === 0) {
          return <Tag color='green' key={val}>原创</Tag>;
        }
        if (val === 1) {
          return <Tag color='red' key={val}>转载</Tag>;
        }
        return <Tag key={val}>混合</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      sorter: true,
      valueType: 'dateTime',
      key: 'create_time',

    },
    {
      title: '操作',
      key: 'option',
      render: (_, record) => [
        <Space key={1}>
          <Button type='primary' size='small'
                  onClick={() => history.push('/article/edit/' + record._id)}
                  key={record.id}><EditOutlined key={record._id} /> 编辑</Button>

          <Popconfirm title='确定要删除吗?' onConfirm={() => {
            articleDel({ id: record._id });
            actionRef.current.reload();
          }}>
            <Button type='dashed' size='small'> <DeleteOutlined /> 删除</Button>
          </Popconfirm>
        </Space>,
      ],
    },

  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle='文章列表'
        search={false}
        actionRef={actionRef}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => history.push('/article/form')}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        rowKey='_id'
        request={getList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
