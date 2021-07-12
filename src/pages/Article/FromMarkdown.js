import React from 'react';
import { Input } from 'antd';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import './style.less';

class FromMarkdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      smde: null,
    };
  }

  componentDidMount() {
    this.state.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender(plainText) {
        return marked(plainText, {
          renderer: new marked.Renderer(),
          gfm: true,
          pedantic: false,
          sanitize: false,
          tables: true,
          breaks: true,
          smartLists: true,
          smartypants: true,
          highlight(code) {
            return highlight.highlightAuto(code).value;
          },
        });
      },
    });
  }

  render() {
    return (
      <Input.TextArea
        id="editor"
        style={{ marginBottom: 20 }}
        size="large"
        rows={6}
        autoSize={{ minRows: 15 }}
        placeholder="文章内容，支持 markdown 格式 "
        name="content"
        value={this.props.content}
        onChange={this.props.handleChangeContent}
      />
    );
  }
}

export default FromMarkdown;
