import React, { Component } from 'react';
import { Table, Divider, Button } from 'antd';
import request from '../../../utils/request';
import { connect } from 'dva';


@connect(({ category, loading }) => ({
  category,
  getCategoryList: loading.effects['category/getCategoryList']
}))
export default class CategoryTable extends Component {

  render() {
    const { dispatch, category } = this.props

    const onShowSizeChange = (current, size) => {
      dispatch({
        type: 'category/list',
        payload: {
          ...category.paging,
          limit: size
        }
      })
    }

    const onChange = (page, pageSize) => {
      dispatch({
        type: 'category/list',
        payload: {
          ...category.paging,
          page: page
        }
      })
    }

    const updateItem = (data) => {
      console.log(data)
      dispatch({
        type: 'category/update',
        payload: {
          id: data
        }
      })
    }

    const removeItem = (id) => {
      dispatch({
        type: 'category/del',
        payload: {
          id: id
        }
      })
    }

    const pagination = {
      showSizeChanger: true,
      showTotal: (total, range) => (
        <Button> 总页数 {total}</Button>
      ),
      onShowSizeChange: onShowSizeChange,
      onChange: onChange,
      defaultCurrent: 1,
      current: category.paging.page,
      PageSize: category.paging.limit,
      pageSizeOptions: ['4', '10', '20', '30', '40'],
      total: category.paging.total,
    }

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '插入时间',
        dataIndex: 'created_at',
        key: 'created_at',
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.created_at - b.created_at,
      },
      {
        title: '修改时间',
        dataIndex: 'updated_at',
        key: 'updated_at',
        // defaultSortOrder: 'descend',
        // sorter: (a, b) => a.updated_at.length - b.updated_at.length,
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render: (text, value) => (
          <span>
            <Button type="info" onClick={(e) => updateItem(value)}
                    icon="edit"> 编辑 </Button>
            <Divider type="vertical"/>
            <Button type="info" onClick={(e) => removeItem(value.id)}
                    icon="close"> 删除 </Button>
            </span>
        ),
      },
    ];

    return (
      <div>
        <Table columns={columns} dataSource={category.list} rowKey={record => record.id}
               bordered loading={!category.list} pagination={pagination}/>
      </div>
    )
  }
}
