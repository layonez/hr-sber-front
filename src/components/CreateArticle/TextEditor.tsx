import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';

export default function TextEditor() {
  const editor = new EditorJS({
    holder: 'editorjs',

    tools: {
      header: Header,
      list: List,
    },
  });

  return <div id="editorjs"></div>;
}
