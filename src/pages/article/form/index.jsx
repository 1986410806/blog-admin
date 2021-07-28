import { Card, message } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';

import { PageContainer } from '@ant-design/pro-layout';
import { addArticle, queryTag, queryCategory } from '@/services/ant-design-pro/api';
import { history } from 'umi';
import Markdown from '../../../components/Markdown/Markdown';


/**
 * 添加节点
 *
 * @param fields
 */
const ArticleCreate = async (fields) => {

  const hide = message.loading('正在添加');

  try {
    await addArticle({ ...fields });
    hide();
    message.success('添加成功');
    history.push('/article');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


const ArticleForm = () => {
  return (
    <PageContainer>
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{
            marginTop: 8,
          }}
          name='basic'
          layout='vertical'
          initialValues={{
            public: '1',
          }}
          onFinish={async (values) => {
            ArticleCreate(values);
          }}
        >
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
            width='md'
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
              labelInValue: true,
            }}
            request={async ({ keyWords = '' }) => {
              const tags = await queryTag({ pageNum: 1, pageSize: 300, keyword: keyWords });
              return tags.data.list.map((item) => {
                return {
                  label: item.name, value: item._id
                }
              });
            }}
            rules={[{ required: true, message: '请选择标签' }]}
          />

          <ProFormSelect.SearchSelect
            name='tags'
            label='标签选项'
            fieldProps={{
              labelInValue: true,
            }}
            request={async ({ keyWords = '' }) => {
              const tags = await queryTag({ pageNum: 1, pageSize: 300, keyword: keyWords });
              return tags.data.list.map((item) => {
                return {
                  label: item.name, value: item._id
                }
              });
            }}
            rules={[{ required: true, message: '请选择标签' }]}
          />

          <ProFormSelect.SearchSelect
            name='category'
            label='文章分类'
            fieldProps={{
              labelInValue: true,
            }}
            request={async ({ keyWords = '' }) => {
              const tags = await queryCategory({ pageNum: 1, pageSize: 300, keyword: keyWords });
              return tags.data.list.map((item) => {
                return {
                  label: item.name, value: item._id
                }
              });
            }}
            rules={[{ required: true, message: '请选择文章分类' }]}
          />

        <Markdown />
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default ArticleForm;
