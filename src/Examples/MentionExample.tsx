import { EditorState } from 'draft-js'
import { useState, useRef } from 'react'
import WriteTextEditor from '../Editors/MentionEditor/WriteTextEditor'
import FeedTextEditor from '../Editors/MentionEditor/PreviewTextEditor'
import { getRawContent } from '../TextEditor/TextEditorUtils'
import styles from '../App.module.scss'

const MentionEditorExample = () => {
    const [editorState, seteditorState] = useState<EditorState>(EditorState.createEmpty())
    const [raw, setraw] = useState<any>()
    const ref = useRef()
    return (
        <div>
            <div className={styles.App}>
                <p>Basic Ediotr with mention plugin</p>
                <WriteTextEditor
                    editorState={editorState}
                    onChangeHandler={seteditorState}
                    placeholder="Whats in your mind?"
                    ref={ref}
                    className={styles.Basic_Editor_Contianer}
                />
                <button onClick={() => setraw(getRawContent(editorState))} >Preview</button>
            </div>
            <div className={styles.App}>
                <p>Basic Ediotr with mention plugin in preview mode</p>
                <FeedTextEditor
                    content={raw}
                    placeholder="Whats in your mind?"
                    className={styles.Basic_Editor_Contianer}
                />
            </div>
        </div>
    )
}

export default MentionEditorExample
