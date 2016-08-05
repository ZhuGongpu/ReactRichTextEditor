import React, {PropTypes} from "react";
import CSSModules from 'react-css-modules';
import Editor from "wangeditor";
import styles from "./index.scss";

class RichTextEditor extends React.Component {

    constructor(props) {
        super(props);
        this.editor = null;
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        //关闭wangEditor log
        // Editor.config.printLog = false;
        this.editor = new Editor(this.refs.editor);

        //TODO init
        this.editor.config.menus = [
            'bold',
            'underline',
            'italic',
            'strikethrough',
            'eraser',
            'forecolor',
            'bgcolor',
            '|',
            'quote',
            'fontfamily',
            'fontsize',
            'head',
            'unorderlist',
            'orderlist',
            'alignleft',
            'aligncenter',
            'alignright',
            '|',
            'link',
            'unlink',
            // 'table',
            // 'emotion',
            // '|',
            'img',
            // 'video',
            // 'location',
            // 'insertcode',
            '|',
            'undo',
            'redo',
            'fullscreen'
        ];
        this.editor.onchange = this.onChange;

        this.editor.config.uploadImgUrl = "http://upload.qiniu.com/";
        this.editor.config.uploadParams = {
            "key": `wang-editor/${this.uuid()}`,
            "token": this.props.uploadToken
        };
        this.editor.config.uploadImgFileName = 'file';

        this.editor.config.uploadImgFns.onload = (result) => {

            //更新key, 否则上传其他图片时,key未更新
            this.editor.config.uploadParams.key = `wang-editor/${this.uuid()}`;

            result = JSON.parse(result);
            console.log("onLoad: %o", result);
            const imageURL = `http://dodo-images.qiniudn.com/${result.key}`;
            console.log("原文件名: %o", this.editor.uploadImgOriginalName);
            console.log("URL: %o, key: %o", imageURL, result.key);

            this.editor.command(null, 'insertHtml', `<img src="${imageURL}" alt="${this.editor.uploadImgOriginalName}" style="max-width: 100%" />`);
        };

        this.editor.config.uploadImgFns.onerror = (request) => {
            console.error("onError: %o", request)
            //TODO: 提示上传失败
        };

        this.editor.create();
        this.editor.$txt.focus(() => {
            this.props.togglePlaceholder(this.shouldShowPlaceholder());
            console.log("$txt focus");
        }).click(() => {
            this.props.togglePlaceholder(this.shouldShowPlaceholder());
            console.log("$txt click");
        })
    }

    uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x'
                    ? r
                    : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    onChange() {
        this.props.togglePlaceholder(this.shouldShowPlaceholder());
        if (this.props.onChange) {
            this.props.onChange(this.editor.$txt);
        }
    }

    shouldShowPlaceholder() {
        return !(this.editor && this.editor.$txt && this.editor.$txt.formatText().length > 0)
    }

    render() {
        return (
            <div styleName="editor-container">
                <div ref='editor' styleName="editor">
                    {
                      /*this.props.showPlaceholder
                        ? this.props.placeholder
                        : null*/}
                </div>
            </div>
        );
    }
}

RichTextEditor.propTypes = {
    uploadToken: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    togglePlaceholder: PropTypes.func.isRequired,
    placeholder: PropTypes.node,
    showPlaceholder: PropTypes.bool
};

RichTextEditor.defaultProps = {
    uploadToken: "",
    // showPlaceholder: true,
    // placeholder: <div styleName='placeholder'>请输入内容...</div>
};

export default CSSModules(RichTextEditor, styles);
