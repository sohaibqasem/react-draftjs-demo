import { FC } from 'react'

import ReadmoreEditor from './Examples/ReadmoreExample'
import BasicEditor from './Examples/EditorExample'
import MentionEditorExample from './Examples/MentionExample';

const App : FC = () => {
  
  return (
    <>
      <BasicEditor/>
      <ReadmoreEditor />
      <MentionEditorExample/>
    </>
  );
}

export default App;
