import { Card, message, Space } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';

import { PageContainer } from '@ant-design/pro-layout';
import { addArticle, queryTag, queryCategory, getArticleDetail } from '@/services/ant-design-pro/api';
import { history } from 'umi';
import Markdown from '../../../components/Markdown/Markdown';
import { useState } from 'react';

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

const getArticle = async (id) => {
  try {
    return  await getArticleDetail({ id, filter: 2 });
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

const ArticleForm = (props) => {

  const [articleInfo, setArticleInfo] = useState(false);

  let markdownThis = null;

  const bindMarkDownThis = (markdown) => {
    markdownThis = markdown;
  };

  const getContent = () => {
    return markdownThis.getMarkdownValue();
  };

  // getArticle(props.match.params.id).then(res => {
  //   setArticleInfo(res.data)
  // })

  return (
    <PageContainer waterMarkProps={
      { content: '王富贵' }
    }>
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          layout='vertical'
          initialValues={articleInfo}

          onFinish={(values) => {
            let content = getContent();
            if (content.length <= 1) {
              message.error('正文必须填~~');
              return false;
            }
            values.content = getContent();
            ArticleCreate(values);
          }}
        >

          {/* 判断时候更新*/}
          {props.values?.id &&
          <ProFormText
            width='md'
            label='ID'
            fieldProps={{ readonly }}
            name='id'
          />
          }


          <ProFormText
            width='md'
            label='标题'
            name='title'
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            placeholder='文章标题'
          />
          <ProFormText
            width='md'
            label='作者'
            name='author'
            rules={[
              {
                required: true,
                message: '请输入作者',
              },
            ]}
            placeholder='作者名字'
          />
          <ProFormText
            width='md'
            label='关键字'
            name='keyword'
            rules={[
              {
                required: true,
                message: '关键字不能为空',
              },
            ]}
            placeholder='关键字（seo检索）'
          />
          <ProFormText
            width='md'
            label='描述'
            name='desc'
            rules={[
              {
                required: true,
                message: '关键字不能为空',
              },
            ]}
            placeholder='关键字（seo检索）'
          />
          <ProFormText
            width='xl'
            label='封面图'
            name='img_url'
            rules={[
              {
                required: true,
                message: '封面不能为空',
              },
            ]}
            placeholder='封面图'
          />


          <ProFormSelect
            name='state'
            label='发布状态'
            valueEnum={{
              0: '草稿',
              1: '发布',
            }}
            placeholder='选择发布状态'
            rules={[{ required: true, message: '请选择发布状态' }]}
          />

          <ProFormSelect
            name='type'
            label='文章类型'
            valueEnum={{
              1: '普通文章',
              2: '简历',
              3: '管理员介绍',
            }}
            placeholder='请选择发布状态'
            rules={[{ required: true, message: '请选择发布状态' }]}
          />

          <ProFormSelect
            name='origin'
            label='文章类型'
            valueEnum={{
              0: '原创',
              1: '转载',
              2: '混合',
            }}
            placeholder='选择文章转载状态'
            rules={[{ required: true, message: '选择文章转载状态' }]}
          />

          <ProFormSelect.SearchSelect
            name='tags'
            label='标签选项'
            fieldProps={{
              labelInValue: false,
            }}

            request={getTags}

            rules={[{ required: true, message: '请选择标签' }]}
          />

          <ProFormSelect.SearchSelect
            name='category'
            label='文章分类'
            fieldProps={{
              labelInValue: false,
            }}
            request={getCategory}
            rules={[{ required: true, message: '请选择文章分类' }]}
          />
          <label> 正文 </label>
          <br />
          <Markdown
            bindMarkDownThis={bindMarkDownThis}
            value={props.values?.content || ''} />
          <br />
          <br />

        </ProForm>
      </Card>
    </PageContainer>
  )
    ;
};

export default ArticleForm;
