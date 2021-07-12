import React from 'react';
import { Input, Select, Button, notification } from 'antd';
import { connect } from 'dva';
import './style.less';
import FromMarkdown from '@/pages/Article/FromMarkdown';

@connect(({ article, tag, category }) => ({
  article,
  tag,
  category,
}))
class ArticleCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
      changeType: false,
      title: '',
      author: 'biaochenxuying',
      keyword: '',
      content: '',
      desc: '',
      img_url: '',
      // eslint-disable-next-line react/no-unused-state
      origin: 0, // 0 原创，1 转载，2 混合
      state: 1, // 文章发布状态 => 0 草稿，1 已发布
      type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
      tags: '',
      category: '',
      tagsDefault: [],
      categoryDefault: [],
    };
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeContent = this.handleChangeContent.bind(this);
  }

  componentDidMount() {
    this.handleSearchTag();
    this.handleSearchCategory();
  }

  handleSubmit = () => {
    const { dispatch, article } = this.props;
    const {
      title,
      keyword,
      author,
      changeType,
      desc,
      content,
      state,
      type,
      tags,
      category,
      pageNum,
      pageSize,
      // eslint-disable-next-line camelcase
      img_url,
    } = this.state;
    // eslint-disable-next-line react/prop-types
    const { articleDetail } = article;
    let keyword1 = '';

    if (title) {
      notification.error({
        message: '文章标题不能为空',
      });
      return;
    }
    if (!keyword) {
      notification.error({
        message: '文章关键字不能为空',
      });
      return;
    }
    if (!content) {
      notification.error({
        message: '文章内容不能为空',
      });
      return;
    }

    if (keyword instanceof Array) {
      keyword1 = keyword.join(',');
    }

    this.setState({
      loading: true,
    });
    // 修改
    if (changeType) {
      const params = {
        id: articleDetail._id,
        title,
        author,
        desc,
        keyword: keyword1,
        content,
        img_url,
        origin,
        state,
        type,
        tags,
        category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/updateArticle',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code === 0) {
          notification.success({
            message: res.message,
          });
          this.setState({
            // eslint-disable-next-line react/no-unused-state
            visible: false,
            changeType: false,
            title: '',
            author: 'biaochenxuying',
            keyword: '',
            content: '',
            desc: '',
            img_url: '',
            // eslint-disable-next-line react/no-unused-state
            origin: 0, // 0 原创，1 转载，2 混合
            state: 1, // 文章发布状态 => 0 草稿，1 已发布
            type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
            tags: '',
            category: '',
            tagsDefault: [],
            categoryDefault: [],
          });
          this.handleSearch(pageNum, pageSize);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    } else {
      // 添加
      const params = {
        title,
        author,
        desc,
        keyword: keyword1,
        content,
        img_url,
        origin,
        state,
        type,
        tags,
        category,
      };
      new Promise(resolve => {
        dispatch({
          type: 'article/addArticle',
          payload: {
            resolve,
            params,
          },
        });
      }).then(res => {
        if (res.code === 0) {
          notification.success({
            message: res.message,
          });
          this.setState({
            loading: false,
            // eslint-disable-next-line react/no-unused-state
            chnageType: false,
          });
          // this.handleSearch(this.state.pageNum, this.state.pageSize);
        } else {
          notification.error({
            message: res.message,
          });
        }
      });
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleTagChange = value => {
    const tags = value.join();
    this.setState({
      tagsDefault: value,
      tags,
    });
  };

  handleCategoryChange = value => {
    const category = value.join();
    this.setState({
      categoryDefault: value,
      category,
    });
  };

  handleChangeState = value => {
    this.setState({
      state: value,
    });
  };

  handleChangeOrigin = value => {
    this.setState({
      origin: value,
    });
  };

  handleChangeType = value => {
    this.setState({
      type: value,
    });
  };

  handleSearchTag = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const { state } = this.state;
    const params = {
      keyword: state.keywordCom,
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'tag/queryTag',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleSearchCategory = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const { state } = this.state;
    const params = {
      keyword: state.keyword,
      pageNum: state.pageNum,
      pageSize: state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'category/queryCategory',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleChangeContent = event => {
    this.setState({
      content: event.target.value,
    });
  };

  render() {
    const { category, tag } = this.props;
    const { tagList } = tag;
    const { categoryList } = category;
    const children = [];
    const categoryChildren = [];
    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i];
      children.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i];
      categoryChildren.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    const originDefault = '原创';
    const stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
    const typeDefault = '普通文章'; // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    const categoryDefault = [];
    const tagsDefault = [];
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 10,
    };

    return (
      <div>
        <Input
          style={normalCenter}
          addonBefore="标题"
          size="large"
          placeholder="标题"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="作者"
          size="large"
          placeholder="作者"
          name="author"
          value={this.state.author}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="关键字"
          size="large"
          placeholder="关键字"
          name="keyword"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="描述"
          size="large"
          placeholder="描述"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}
        />
        <Input
          style={normalCenter}
          addonBefore="封面链接"
          size="large"
          placeholder="封面链接"
          name="img_url"
          value={this.state.img_url}
          onChange={this.handleChange}
        />

        <Select
          style={{ width: 200, marginBottom: 20 }}
          placeholder="选择发布状态"
          defaultValue={stateDefault}
          onChange={this.handleChangeState}
        >
          {/*  0 草稿，1 发布 */}
          <Select.Option value="0">草稿</Select.Option>
          <Select.Option value="1">发布</Select.Option>
        </Select>

        <Select
          style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="选择文章类型"
          defaultValue={typeDefault}
          onChange={this.handleChangeType}
        >
          {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
          <Select.Option value="1">普通文章</Select.Option>
          <Select.Option value="2">简历</Select.Option>
          <Select.Option value="3">管理员介绍</Select.Option>
        </Select>

        <Select
          style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="选择文章转载状态"
          defaultValue={originDefault}
          onChange={this.handleChangeOrigin}
        >
          {/* 0 原创，1 转载，2 混合 */}
          <Select.Option value="0">原创</Select.Option>
          <Select.Option value="1">转载</Select.Option>
          <Select.Option value="2">混合</Select.Option>
        </Select>

        <Select
          allowClear
          mode="multiple"
          style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
          placeholder="标签"
          defaultValue={tagsDefault}
          value={this.state.tagsDefault}
          onChange={this.handleTagChange}
        >
          {children}
        </Select>
        <Select
          allowClear
          mode="multiple"
          style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
          placeholder="文章分类"
          defaultValue={categoryDefault}
          value={this.state.categoryDefault}
          onChange={this.handleCategoryChange}
        >
          {categoryChildren}
        </Select>
        <div>
          <Button
            onClick={() => {
              this.handleSubmit();
            }}
            loading={this.state.loading}
            style={{ marginBottom: '10px' }}
            type="primary"
          >
            提交
          </Button>
        </div>

        <div title="添加与修改文章" width="1200px">
          <FromMarkdown value={this.state.content} handleChangeContent={this.handleChangeContent} />
        </div>
      </div>
    );
  }
}

export default ArticleCreate;
