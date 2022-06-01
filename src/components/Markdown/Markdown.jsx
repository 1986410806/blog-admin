import React from 'react';

import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';
import { upload } from '../../util/qiniu';
import { getQiniuToken as getQiniuTokenService } from '../../services/ant-design-pro/api';


class FromMarkdown extends React.Component {
  constructor(props) {
    super(props);
  }

  qiniuToken = '';

  componentDidMount = () => {
    // 组件挂载完成之后调用 注意一定要在组件挂载完成之后调用 否则会找不到注入的DOM
    let value = this.props?.value;
    value = value || '';

    const that = this;
    const vditor = new Vditor('vditor', {
      height: 1200,
      cdn:"https://fastly.jsdelivr.net/npm/vditor@" + "3.8.7",
      mode: 'ir', // 及时渲染模式
      placeholder: 'MarkDown edit',
      toolbar: [
        'emoji',
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'insert-before',
        'insert-after',
        '|',
        'upload',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'fullscreen',
        'edit-mode',
        {
          name: 'more',
          toolbar: [
            'both',
            'code-theme',
            'content-theme',
            'export',
            'outline',
            'preview',
            'devtools',
            'info',
            'help',
          ],
        },
        '|',
        {
          hotkey: '⌘-S',
          name: 'save',
          tipPosition: 's',
          tip: '保存',
          className: 'right',
          icon: `<img style='height: 16px' src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/save.svg'/>`,
          click() {
            console.log('click');
          },
        },
        {
          hotkey: '',
          name: 'publish',
          tipPosition: 's',
          tip: '发布文章',
          className: 'right',
          icon: `<img style='height: 16px' src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/publish.svg'/>`,
          click() {
            console.log('click');
          },
        },
      ],
      after() {
        vditor.setValue(value);
      },
      blur() {
        console.log('blur');
      },
      upload: {
        accept: 'image/*',
        multiple: false,
        filename(name) {
          return name
            .replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
            .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
            .replace('/\\s/g', '');
        },
        async handler(files) {
          const token = await that.getQiniuToken();
          upload(files[0], token, (path) => {
            const name = files[0] && files[0].name;
            let succFileText = '';
            if (vditor && vditor.vditor.currentMode === 'wysiwyg') {
              succFileText += `\n <img alt='${name}' src='${path}'>`;
            } else {
              succFileText += `  \n![${name}](${path})`;
            }
            document.execCommand('insertHTML', false, succFileText);
          });
        },
        url(files) { // 复制图片地址事件 需要现下载在上传
          console.log('url', files);
          // that.handleImageUpload(files);
        },
      },

    });
    console.log(vditor)
    this.vditor = vditor;
    // 绑定當前對象
    this.props.bindMarkDownThis(that);
  };


  async getQiniuToken() {

    // 优先使用父组件的token
    if (this.props?.getQiniuToken) {
      return this.props.getQiniuToken();
    }

    if (!this.qiniuToken) {
      const token = await getQiniuTokenService();
      this.qiniuToken = token.data;
    }
    return this.qiniuToken;

  }

  getMarkdownValue() {
    return this.vditor.getValue();
  }

  setMarkdownValue(val) {
    return this.vditor.setValue(val);
  }
 
  keypress(e) {
    e.stopPropagation();
  }

  render() {
    return (<div onKeyPress={e => {
      e.stopPropagation();
    }} id='vditor' />);
  }
}

export default FromMarkdown;
