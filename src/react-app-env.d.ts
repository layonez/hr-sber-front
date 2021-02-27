/// <reference types="react-scripts" />
declare module '*.md' {
  const value: string; // markdown is just a string
  export default value;
}

declare module '@editorjs/header' {
  const value: any;
  export default value;
}

declare module '@editorjs/list' {
  const value: any;
  export default value;
}
