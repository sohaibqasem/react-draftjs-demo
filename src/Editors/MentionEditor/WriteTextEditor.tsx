import React from 'react';
import { EditorState } from "draft-js";
import _ from 'lodash';

// Draft TextEditor
import TextEditor from '../../TextEditor/DraftTextEditor';

import MentionMyNetworks, { MyNetworkMentionPlugin } from './MentionMyNetworks';

interface IProps {
    editorState: EditorState;
    onChangeHandler: (state: EditorState) => void;
    placeholder?: string;
    className?: string;
    ref?: any;
}

const FeedEditor: React.FC<IProps> = ({ ref, editorState, onChangeHandler, className, placeholder }) => {
    // editor ref
    const editorRef = React.useRef(ref || null);


    const { MyNetworkSuggestions, MyNetworkPlugin } = MyNetworkMentionPlugin(true);

    // plugins Array
    const plugins = [MyNetworkPlugin];


    return (
        <div>
            <TextEditor mode="Write"
                className={className || ''}
                placeholder={placeholder || ''}
                editorState={editorState}
                onChangeHandler={onChangeHandler}
                editorRef={editorRef}
                plugins={plugins}
                stripPastedStyles={true} />

            {/* My Network Suggestions*/}
            {MentionMyNetworks(MyNetworkSuggestions)}
        </div>
    )
};

export default FeedEditor;
