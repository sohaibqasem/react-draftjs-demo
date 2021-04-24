import React, { SyntheticEvent } from "react";
import { EditorState, DraftBlockRenderMap } from "draft-js";
import Editor, { EditorPlugin } from "@draft-js-plugins/editor";

import 'draft-js/dist/Draft.css';

import styles from './DraftTextEditor.module.scss'


interface IProps {
    mode: 'Read' | 'Write',
    editorState: EditorState,
    onChangeHandler?: (state: EditorState) => void,
    onBlurHandler?: (event: SyntheticEvent) => void,
    blockRenderMap?: DraftBlockRenderMap,
    stripPastedStyles?: boolean,
    plugins?: Array<EditorPlugin>,
    editorRef: React.RefObject<Editor>,
    className?: string
    placeholder?: string,
}

const DraftTextEditor: React.FC<IProps> = ({ mode, editorState, plugins, editorRef, onChangeHandler, onBlurHandler, blockRenderMap, stripPastedStyles, placeholder, className }) => {

    // foucs on the Text Editor in Write Mode
    React.useEffect(() => {
        if (mode === "Write") {
            setTimeout(() => {
                editorRef?.current && editorRef.current.focus()
            }, 500)
        }
    }, [])

    // on Change handler
    const onChange = (state: EditorState) => {
        onChangeHandler && onChangeHandler(state)
    }

    // on Blur handler
    const onBlur = (event: SyntheticEvent) => {
        onBlurHandler && onBlurHandler(event)
    }

    return (
        <>
            { mode === "Write" ? // TextEditor in Write(Edit) Mode
                <div className={`text-muted fs-small ${styles.editor} ${className ? className : ''}`}>
                    <Editor
                        placeholder={placeholder}
                        editorState={editorState}
                        onBlur={onBlur}
                        onChange={onChange}
                        plugins={plugins}
                        ref={editorRef}
                        stripPastedStyles={stripPastedStyles || false}
                    />
                </div>
                : // TextEditor in Read(Preview) Mode
                <div className={`text-muted fs-small ${styles.editor} ${className ? className : ''}`}>
                    <Editor
                        editorState={editorState}
                        onChange={onChange}
                        plugins={plugins}
                        readOnly={true}
                        ref={editorRef}
                        blockRenderMap={blockRenderMap}
                        stripPastedStyles={stripPastedStyles || false}
                    />
                </div>
            }
        </>
    )
}

export default DraftTextEditor
