import React from "react";
import {connect} from "react-redux";
import {createSelector} from "reselect";
import {editorContentChange, togglePlaceholder} from "./actions";
import {selectEditorContent, selectShouldShowPlaceholder} from "./selectors";
import RichTextEditor from "components/WangEditor";

export class Editor extends React.Component {

    render() {
        //TODO: 异步加载token
        const uploadToken = "VDWt42uEpY7Q4ED4ZtePI_2XrD1WHwlbLhihPvei:HHxM9i_8JK1F-h_XYKfaYkgFRxE=:eyJzY29wZSI6ImRvZG8taW1hZ2VzIiwiZGVhZGxpbmUiOjE0Njg0OTU0MjF9";

        const {content, showPlaceholder, onChange, togglePlaceholder} = this.props;
        return (
            <div>
                <RichTextEditor uploadToken={uploadToken}
                  onChange={onChange.bind(this)}
                  showPlaceholder={showPlaceholder}
                  togglePlaceholder={togglePlaceholder}/>
                <p>Preview:</p>
                <div dangerouslySetInnerHTML={{
                    __html: content
                }}></div>
            </div>
        );
    }
}

const mapStateToProps = createSelector(selectEditorContent(), selectShouldShowPlaceholder(), (content, showPlaceholder) => ({content, showPlaceholder}));
function mapDispatchToProps(dispatch) {
    return {
        onChange: (content) => dispatch(editorContentChange(content)),
        togglePlaceholder: (show) => dispatch(togglePlaceholder(show))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
