import React from 'react';
import { EditorState } from "draft-js";

// Plugins
import { MyNetworkMentionPlugin } from './MentionMyNetworks';

// Text Editor
import TextEditor from '../../TextEditor/DraftTextEditor';
// Text Editor Utils
import { createEditorState } from '../../TextEditor/TextEditorUtils';

interface IProps {
    content?: string,
    schemaVersion?: string,
    placeholder?: string,
    className?: string,
    ref?: any;
}

const PreviewTextEditor: React.FC<IProps> = ({ ref, content, className, placeholder }) => {
    const editorRef = React.useRef(ref);

    const [editorState, setEditorState] = React.useState<EditorState>(EditorState.createEmpty());

    const { MyNetworkDecorators, MyNetworkPlugin } = MyNetworkMentionPlugin(false);

    React.useEffect(() => {
        setEditorState(createEditorState(content || '', false, [ MyNetworkDecorators]));
    }, [content]);

    // plugins
    const plugins = [MyNetworkPlugin];

    return (
        <div>
            <TextEditor mode="Read"
                className={className || ''}
                placeholder={placeholder || ''}
                editorState={editorState}
                plugins={plugins}
                stripPastedStyles={true}
                editorRef={editorRef} />
        </div>
    )
};

export default PreviewTextEditor;
