import _ from 'lodash'
import { EditorState, convertFromRaw, convertToRaw, genKey, SelectionState, CompositeDecorator } from 'draft-js'
import { extractLinks } from '@draft-js-plugins/linkify';


/**
 * check for empty editor state
 * @param {EditorState} state Editor State
 * @returns {boolean} true if the Editor state is empty
 */
export const isEditorEmpty = (state: EditorState) => {
    return (!state.getCurrentContent().hasText() || state.getCurrentContent().getPlainText().trim().length === 0)
}

/**
 * check for editor state
 * @param {EditorState} prevState Prev Editor State
 * * @param {EditorState} nextState Next Editor State
 * @returns {boolean} true if the Editor state is empity
 */
 export const isEditorEquals = (prevState: EditorState, nextState: EditorState) => {
    return (prevState.getCurrentContent().getPlainText().trim() === nextState.getCurrentContent().getPlainText().trim())
}

/**
 * get array of extracted links (urls)
 * @param {EditorState} state Editor State
 * @summary return [urls] if exist or empty []
 * @returns {Array<LinkifyIt.Match[]>} Array of urls
 */
export const ExtractUrls = (state: EditorState) => {
    const extractedUrls = extractLinks(state.getCurrentContent().getPlainText())
    if (extractedUrls) {
        return extractedUrls
    }
    return [];
}

/**
 * get the current state of the editor as a planText
 * @param {EditorState} editorState Editor State
 * @returns {string} Editor State as a plain Text
 */
export const getPlainText = (editorState: EditorState) => {
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const planText = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    return planText;
}

/**
 * Get Content(Editor State) as raw object
 * @param {EditorState} editorState 
 * @returns raw object
 */
export const getRawContent = (editorState: EditorState) => {
    const object = convertToRaw(editorState.getCurrentContent());
    //return the raw object
    return object;
}

/**
 * move foucs to the end of the editor
 * @param {EditorState} editorState Editor State
 * @returns {EditorState} Editor State
 */
const moveSelectionToEnd = (editorState: EditorState) => {
    const content = editorState.getCurrentContent();
    const blockMap = content.getBlockMap();

    const key = blockMap.last().getKey();
    const length = blockMap.last().getLength();

    // On Chrome and Safari, calling focus on contenteditable focuses the
    // cursor at the first character. This is something you don't expect when
    // you're clicking on an input element but not directly on a character.
    // Put the cursor back where it was before the blur.
    const selection = new SelectionState({
        anchorKey: key,
        anchorOffset: length,
        focusKey: key,
        focusOffset: length,
    });
    return EditorState.forceSelection(editorState, selection);
};

/**
 * create EditorState from an encoded content
 * @param {string} content encoded content
 * @param {boolean} fullContent
 * @param {Array} decorators Array of decorators
 * @summary if content is empity the state will be returns empity Editor state
 * @summary if fullContent is false the state will be returns based on ReadMore case
 * @returns {EditorState} Editor State
 */
export const createEditorState = (content: any, fullContent: boolean, decorators?: Array<any>) => {
    if (content) {
        const obj = _.cloneDeep(content)

        // check for Read more case
        if (fullContent === false) {
            const SmartBlocks = getSmartBlocks(obj, 415)
            obj.blocks = [...SmartBlocks.blocks]
            if (SmartBlocks.ReadmoreNeed) {
                obj.blocks.push(
                    {
                        key: genKey(),
                        text: "Read More",
                        type: "ReadMoreBlock",
                        depth: 0,
                        inlineStyleRanges: [],
                        entityRanges: [],
                        data: {}
                    }
                )
            }
        }
        //Extract decorators from the plugins
        if (decorators?.length) {
            const decoratorsArr: any = _.flattenDeep(decorators?.map((decorator: any) => decorator));
            const decorator = new CompositeDecorator(decoratorsArr);
            // return an Editor state based on the JS Object
            return moveSelectionToEnd(EditorState.createWithContent(convertFromRaw(obj), decorator))
        }
        // return an Editor state based on the JS Object
        return moveSelectionToEnd(EditorState.createWithContent(convertFromRaw(obj)))
    } else {
        // return an Empity Editor state
        return EditorState.createEmpty()
    }
}

/**
 * check & add if there is a need to preform Read more case
 * @param ContentObject 
 * @param {number} length 
 * @returns 
 */
const getSmartBlocks = (ContentObject: any, length: number): { blocks: Array<any>, ReadmoreNeed: boolean } => {
    const { blocks } = ContentObject
    let sum = 0;
    // compute every block length text
    for (let i = 0; i < blocks.length; i++) {
        sum = sum + blocks[i].text.length

        if (sum > length) {
            sum = sum - blocks[i].text.length

            for (let j = 0; j < blocks[i].text.length; j++) {

                sum = sum + 1;
                if (sum === length) {
                    blocks[i].text = blocks[i].text.slice(0, j) + '...'
                    return { blocks: blocks.slice(0, i + 1), ReadmoreNeed: true }
                }
            }
        }
    }
    return { blocks: blocks, ReadmoreNeed: false }
};
