import React from 'react'
import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap, EditorState } from "draft-js";

import { linkifyPlugin, linkifyDecorators } from '../TextEditor/DraftPlugins/LinkifyPlugin'
import ReadMoreBlock from '../TextEditor/CustomBlocks/ReadMoreBlock'
import TextEditor from '../TextEditor/DraftTextEditor'
import {createEditorState} from '../TextEditor/TextEditorUtils'

interface IProps {
    content?: any,
    placeholder?: string,
    className?: string,
    ref?:any;
}

const PreviewTextEditor : React.FC<IProps> = ({ ref, content, className, placeholder }) => {
    const editorRef = React.useRef(ref)

    const [editorState, setEditorState] = React.useState<EditorState>(EditorState.createEmpty());

    React.useEffect(() => {
        setEditorState(createEditorState(content, false, [linkifyDecorators]))
    }, [content])

    // plugins
    const plugins = [linkifyPlugin];

    //Custom Blocks
    // Add ReadMore Block to the Render Map
    const blockRenderMap = Map({
        'ReadMoreBlock': {
            // element is used during paste or html conversion to auto match your component;
            // it is also retained as part of this.props.children and not stripped out
            element: 'a',
            wrapper: <ReadMoreBlock onClickHandler={() =>  setEditorState(createEditorState(content, true, [linkifyDecorators]))} />,
        }
    });
    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

    return (
        <div>
            <TextEditor mode="Read"
                className={className || ''}
                placeholder={placeholder || ''}
                editorState={editorState}
                plugins={plugins}
                stripPastedStyles={true}
                editorRef={editorRef}
                blockRenderMap={extendedBlockRenderMap} />
        </div>
    )
}

export default PreviewTextEditor
