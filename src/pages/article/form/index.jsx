import { Button, Card, message } from 'antd';
import ProForm, { ProFormSelect, ProFormText, ProFormUploadButton } from '@ant-design/pro-form';

import { PageContainer } from '@ant-design/pro-layout';
import { addArticle, queryTag, queryCategory, getArticleDetail, updateArticle } from '@/services/ant-design-pro/api';
import { history } from 'umi';
import { getQiniuToken as getQiniuTokenService } from '@/services/ant-design-pro/api';
import { upload } from '@/util/qiniu';
import Markdown from '../../../components/Markdown/Markdown';
import React from 'react';


/**
 * 添加节点
 *
 * @param fields
 */
const ArticleCreate = async (fields) => {

  const hide = message.loading('正在添加');

  fields.tags = fields.tags.join(',');
  fields.category = fields.category.join(',');

  try {
    await addArticle({ ...fields });
    hide();
    message.success('添加成功');
    history.push('/article/list');
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
const ArticleUpdate = async (fields) => {

  const hide = message.loading('正在添加');

  fields.tags = fields.tags.join(',');
  fields.category = fields.category.join(',');

  try {
    await updateArticle({ ...fields });
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

const getArticle = async (id) => {
  try {
    return await getArticleDetail({ id, filter: 2 });
  } catch (error) {
    console.error(error);
    message.error('文章详情加载失败！');
    return false;
  }
};

const getTags = async ({ keyword = '' }) => {
  try {
    const tags = await queryTag({ pageNum: 1, pageSize: 300, keyword: keyword });
    return tags.data.list.map((item) => {
      return {
        label: item.name, value: item._id,
      };
    });
  } catch (error) {
    console.error(error);
    message.error('标签加载失败！');
    return false;
  }
};

const getCategory = async ({ keyword = '' }) => {
  try {
    const category = await queryCategory({ pageNum: 1, pageSize: 300, keyword: keyword });
    return category.data.list.map((item) => {
      return {
        label: item.name, value: item._id,
      };
    });
  } catch (error) {
    console.error(error);
    message.error('分类加载失败！');
    return false;
  }
};


export class ArticleForm extends React.Component {
  aId = 0;

  constructor(props) {
    super(props);
    // 存在参数为编辑
    if (this.props.match.params?.id) {
      this.aId = this.props.match.params?.id;
    }
  };

  formRef = React.createRef();

  qiniuToken;

  getQiniuToken = async () => {
    if (!this.qiniuToken) {
      const token = await getQiniuTokenService();
      this.qiniuToken = token.data;
    }
    return this.qiniuToken;

  };

  componentDidMount = () => {
    if (this.aId) {
      getArticle(this.aId).then(res => {
        this.formRef?.current?.setFieldsValue({
          id: res.data._id,
          title: res.data.title,
          author: res.data.author,
          desc: res.data.desc,
          img_url: res.data.img_url,
          origin: res.data.origin,
          keyword: res.data.keyword.join(','),
          type: res.data.type,
          state: res.data.state,
          tags: res.data.tags.map(res => {
            return res._id;
          }),
          category: res.data.category.map(res => {
            return res._id;
          }),
        });
        this.setContent(res.data.content);
      });
    }
  };

  setImgUrl = (path) => {
    this.formRef?.current?.setFieldsValue({
      img_url: path,
    });
  };

  bindMarkDownThis = (markdown) => {
    this.markdownThis = markdown;
  };
  getContent = () => {
    return this.markdownThis.getMarkdownValue();
  };
  setContent = (val) => {
    return this.markdownThis.setMarkdownValue(val);
  };

  render() {

    const submit = (values) => {
      let content = this.getContent();
      if (content.length <= 1) {
        message.error('正文必须填~~');
        return false;
      }
      values.content = this.getContent();

      this.aId === 0 ?
        ArticleCreate(values) : // 新增
        ArticleUpdate(values);// 更新
    };

    return (<PageContainer waterMarkProps={
        { content: '王富贵' }
      }>
        <Card bordered={false}>
          <ProForm
            hideRequiredMark
            style={{
              marginTop: 8,
            }}
            layout='vertical'
            formRef={this.formRef}
            onFinish={submit}

          >

            {/* 判断时候更新*/}
            {this.aId !== 0 &&
            <ProFormText
              width='md'
              label='ID'
              readonly
              name='id'
              fieldProps={{ onkeydown: (e) => e.preventDefault(e) }}

            />
            }


            {/*<ProFormText*/}
            {/*  width='md'*/}
            {/*  label='标题'*/}
            {/*  name='title'*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: '请输入标题',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*  placeholder='文章标题'*/}
            {/*  fieldProps={{ onPressEnter: (e) => e.preventDefault(e) }}*/}
            {/*/>*/}

            {/*<ProForm.Item label='正文'>*/}
            {/*  <Markdown*/}
            {/*    bindMarkDownThis={this.bindMarkDownThis}*/}
            {/*    getQiniuToken={this.getQiniuToken}*/}
            {/*    value={this.props.values?.content || ''} />*/}
            {/*</ProForm.Item>*/}

            <ProFormUploadButton
              label='封面图'
              name="img_url"
              max={1}
              fieldProps={{
                width:"lg",
                listType: 'picture-card',
              }}
              action={async (file) => {
                const token = await this.getQiniuToken();
                upload(file, token, this.setImgUrl);
              }}
              // extra={<ProFormText
              //   width='xl'
              //   label='URL'
              //   readonly
              //   name='img_url'
              //   rules={[
              //     {
              //       required: true,
              //       message: '封面不能为空',
              //     },
              //   ]}
              //   placeholder='封面图'
              //   fieldProps={{ onPressEnter: (e) => e.preventDefault(e) }}
              // />}
            />


            {/*<ProFormText*/}
            {/*  width='md'*/}
            {/*  label='作者'*/}
            {/*  name='author'*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: '请输入作者',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*  placeholder='作者名字'*/}
            {/*  fieldProps={{ onPressEnter: (e) => e.preventDefault(e) }}*/}

            {/*/>*/}
            {/*<ProFormText*/}
            {/*  width='md'*/}
            {/*  label='关键字'*/}
            {/*  name='keyword'*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: '关键字不能为空',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*  placeholder='关键字（seo检索）'*/}
            {/*  fieldProps={{ onPressEnter: (e) => e.preventDefault(e) }}*/}

            {/*/>*/}
            {/*<ProFormText*/}
            {/*  width='md'*/}
            {/*  label='描述'*/}
            {/*  name='desc'*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: '关键字不能为空',*/}
            {/*    },*/}
            {/*  ]}*/}
            {/*  placeholder='关键字（seo检索）'*/}
            {/*  fieldProps={{ onPressEnter: (e) => e.preventDefault(e) }}*/}
            {/*/>*/}


            {/*<ProFormSelect*/}
            {/*  name='state'*/}
            {/*  label='发布状态'*/}
            {/*  options={[*/}
            {/*    { value: 0, label: '草稿' },*/}
            {/*    { value: 1, label: '发布' },*/}
            {/*  ]}*/}
            {/*  placeholder='选择发布状态'*/}
            {/*  rules={[{ required: true, message: '请选择发布状态' }]}*/}
            {/*/>*/}

            {/*<ProFormSelect*/}
            {/*  name='type'*/}
            {/*  label='文章类型'*/}
            {/*  options={[*/}
            {/*    {*/}
            {/*      label: '普通文章', value: 1,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: '简历', value: 2,*/}
            {/*    },*/}
            {/*    {*/}
            {/*      label: '管理员介绍', value: 3,*/}
            {/*    },*/}

            {/*  ]}*/}
            {/*  placeholder='请选择发布状态'*/}
            {/*  rules={[{ required: true, message: '请选择发布状态' }]}*/}
            {/*/>*/}

            {/*<ProFormSelect*/}
            {/*  name='origin'*/}
            {/*  label='文章类型'*/}
            {/*  options={[*/}
            {/*    { label: '原创', value: 0 },*/}
            {/*    { label: '转载', value: 1 },*/}
            {/*    { label: '混合', value: 2 },*/}
            {/*  ]}*/}
            {/*  placeholder='选择文章转载状态'*/}
            {/*  rules={[{ required: true, message: '选择文章转载状态' }]}*/}
            {/*/>*/}

            {/*<ProFormSelect.SearchSelect*/}
            {/*  name='tags'*/}
            {/*  label='标签选项'*/}
            {/*  fieldProps={{*/}
            {/*    labelInValue: false,*/}
            {/*  }}*/}

            {/*  request={getTags}*/}

            {/*  rules={[{ required: true, message: '请选择标签' }]}*/}
            {/*/>*/}

            {/*<ProFormSelect.SearchSelect*/}
            {/*  name='category'*/}
            {/*  label='文章分类'*/}
            {/*  fieldProps={{*/}
            {/*    labelInValue: false,*/}
            {/*  }}*/}
            {/*  request={getCategory}*/}
            {/*  rules={[{ required: true, message: '请选择文章分类' }]}*/}
            {/*/>*/}
          </ProForm>
        </Card>


      </PageContainer>
    );
  }
}


export default ArticleForm;
