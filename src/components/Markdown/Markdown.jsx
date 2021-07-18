import React from 'react';

import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';

class FromMarkdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editValue: '',
    };
  }

  componentDidMount() {
    // 组件挂载完成之后调用 注意一定要在组件挂载完成之后调用 否则会找不到注入的DOM
    this.createVidtor({ value: this.state.editValue });
  }

  // 创建编辑器 下面会详解
  createVidtor = params => {
    let { value } = params;
    value = value || ' ';
    const vditor = new Vditor('vditor', {
      height: 300,
      mode: 'ir', // 及时渲染模式
      placeholder: 'React Vditor',
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
          icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/save.svg'/>`,
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
          icon: `<img style="height: 16px" src='https://img.58cdn.com.cn/escstatic/docs/imgUpload/idocs/publish.svg'/>`,
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
        handler(files) {
          function callback(path) {
            const name = files[0] && files[0].name;
            let succFileText = '';
            if (vditor && vditor.vditor.currentMode === 'wysiwyg') {
              succFileText += `\n <img alt=${name} src="${path}">`;
            } else {
              succFileText += `  \n![${name}](${path})`;
            }
            document.execCommand('insertHTML', false, succFileText);
          }
          // that.handleImageUpload(files, callback);
        },
        url(files) {
          // that.handleImageUpload(files);
        },
      },
    });
    this.vditor = vditor;
    return vditor;
  };

  render() {
    return (<div id="vditor" />);
  }
}

export default FromMarkdown;
