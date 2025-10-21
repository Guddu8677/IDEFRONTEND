import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import CodeEditor from './CodeEditor';

export default function MultiEditor() {
  const { project } = useContext(ProjectContext);
  const fileList = Object.values(project.files || {});
  const activeId = project.selectedFileId || (fileList[0] && fileList[0].id);

  // ensure selectedFileId exists
  // (update ProjectContext state if necessary)
  return (
    <div className="multieditor">
      <div className="tabs">
        {fileList.map(f => (
          <div key={f.id} className={`tab ${activeId === f.id ? 'active' : ''}`}>
            {f.name}
          </div>
        ))}
      </div>
      <div className="editor-area">
        <CodeEditor />
      </div>
    </div>
  );
}
