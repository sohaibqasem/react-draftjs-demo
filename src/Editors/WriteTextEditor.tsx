import React from 'react'
import _ from 'lodash'
import { EditorState } from "draft-js";
import { linkifyPlugin } from '../TextEditor/DraftPlugins/LinkifyPlugin'


import TextEditor from '../TextEditor/DraftTextEditor'
interface IProps {
    editorState: EditorState;
    onChangeHandler: (state: EditorState) => void;
    placeholder?: string;
    className?: string;
    editorRef?: any;
}

const FeedEditor: React.FC<IProps> = ({ editorRef, editorState, onChangeHandler, className, placeholder }) => {
    const ref = React.useRef(editorRef||null)

    // plugins
    const plugins = [linkifyPlugin];

    return (
        <div>
            <TextEditor mode="Write"
                className={className || ''}
                placeholder={placeholder || ''}
                editorState={editorState}
                onChangeHandler={onChangeHandler}
                editorRef={ref}
                plugins={plugins}
                stripPastedStyles={true} />
        </div>
    )
}

export default FeedEditor
