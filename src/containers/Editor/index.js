import React from "react";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {editorContentChange} from "./actions";
import {selectEditorContent} from "./selectors";
import WangEditor from "components/WangEditor";

export class Editor extends React.Component {

    render() {
        //TODO: 异步加载token
        const uploadToken = "VDWt42uEpY7Q4ED4ZtePI_2XrD1WHwlbLhihPvei:HHxM9i_8JK1F-h_XYKfaYkgFRxE=:eyJzY29wZSI6ImRvZG8taW1hZ2VzIiwiZGVhZGxpbmUiOjE0Njg0OTU0MjF9";

        const {content, onChange} = this.props;
        const previewContent = content
            ? content.html()
            : null;
        console.log("Preview: %O", previewContent); //TODO: ERROR 刷新不及时
        return (
            <div>
                <WangEditor uploadToken={uploadToken} onChange={onChange.bind(this)} content={content}/>
                <p>Preview:</p>
                <div dangerouslySetInnerHTML={{
                    __html: previewContent
                }}></div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(selectEditorContent(), content => ({content}));
function mapDispatchToProps(dispatch) {
    return {
        onChange: (content) => dispatch(editorContentChange(content))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
