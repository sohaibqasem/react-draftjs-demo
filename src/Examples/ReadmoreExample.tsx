import styles from '../App.module.scss'
import FeedTextEditor from '../Editors/PreviewTextEditor'
const rawObject = {
    blocks: [
      {
        "key": "8i033",
        "text": "Aliquip cupidatat www.google.com officia voluptate ex duis cupidatat irure culpa culpa ad aliquip magna irure. Ut non dolor incididunt sunt in. Velit consectetur excepteur dolor ipsum et id ea consectetur et quis. Magna cupidatat cupidatat aute Lorem pariatur velit duis commodo nostrud enim. Amet consectetur dolor sit incididunt sit tempor ex nisi nostrud proident non ea. Nostrud magna ullamco irure aliquip cillum culpa commodo cillum incididunt ullamco sint.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "eduj",
        "text": "Sit tempor ad ex enim duis dolor labore consectetur ipsum irure. Sint veniam dolore in incididunt ipsum ut fugiat enim nisi mollit non aliqua. Magna aliquip labore laborum dolore nostrud ex velit excepteur. Sit nostrud ut reprehenderit eiusmod ipsum est non anim non consequat.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
      {
        "key": "9a5t1",
        "text": "Pariatur et anim enim elit commodo velderit google.com Lorem aliqua deserunt laborum nulla tempor et excepteur ad dolore. Officia proident exercitation velit amet cillum velit nulla eiusmod cillum minim. Ex consectetur est dolor Lorem ea et minim proident. Veniam fugiat anim esse officia Lorem. Nulla aliquip excepteur anim amet anim magna. Sit cupidatat voluptate sit ex labore nulla aliquip sunt commodo fugiat deserunt.",
        "type": "unstyled",
        "depth": 0,
        "inlineStyleRanges": [],
        "entityRanges": [],
        "data": {}
      },
    ],
    entityMap: {}
  }
const ReadmoreExample = () => {
    return (
        <div className={styles.App}>
        <p>Read More Case</p>
        <FeedTextEditor
          content={rawObject}
          ref={null}
          className={styles.ReadMore_Editor_Contianer} />
      </div>
    )
}

export default ReadmoreExample
