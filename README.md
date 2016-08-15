# ReactRichTextEditor
React wrapper of [WangEditor](https://github.com/wangfupeng1988/wangEditor) based on [ReduxWebTemplate](https://github.com/ZhuGongpu/CodeSnippets/tree/master/ReduxWebTemplate).


## 注意事项

由于wangEditor上传文件时,默认支持选择多张,而且没有相关的接口用来设置。使用时,可以在`wangEditor.js`中将所有的`this.multiple = true;`替换为`this.multiple = false;`即可。


此外,需要将`wangEditor.js`中:
```js
// 跨域上传时，传cookie
xhr.withCredentials = true;
```
设置为`false`,否则会报错。