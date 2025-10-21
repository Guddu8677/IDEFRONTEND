import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProjectContext } from '../context/ProjectContext';

export default function CodeEditor() {
  const { project, updateFileContent, setProject } = useContext(ProjectContext);
  const selectedId = project.selectedFileId || Object.keys(project.files || {})[0];
  const selectedFile = selectedId ? project.files[selectedId] : null;
  const taRef = useRef(null);
  const [value, setValue] = useState(selectedFile?.content || '');

  useEffect(() => {
    setValue(selectedFile?.content || '');
    if (taRef.current) taRef.current.focus();
  }, [selectedFile?.id]);

  if (!selectedFile) {
    return <div className="editor-empty">Select or create a file to edit</div>;
  }

  const onChange = (e) => {
    setValue(e.target.value);
    updateFileContent(selectedFile.id, e.target.value);
  };

  return (
    <div className="codebox">
      <div className="codebox-header">{selectedFile.name}</div>
      <textarea
        ref={taRef}
        className="code-textarea"
        value={value}
        onChange={onChange}
        spellCheck="false"
      />
    </div>
  );
}
