import { FC } from 'react'

import ReadmoreEditor from './Examples/ReadmoreExample'
import BasicEditor from './Examples/EditorExample'

const App : FC = () => {
  
  return (
    <>
      <BasicEditor/>
      <ReadmoreEditor />
    </>
  );
}

export default App;
