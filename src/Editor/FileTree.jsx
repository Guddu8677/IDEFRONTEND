import React, { useContext, useState } from 'react';
import { ProjectContext } from '../context/ProjectContext';

export default function FileTree() {
  const { project, setProject, createLocalFile, deleteFile } = useContext(ProjectContext);
  const [newName, setNewName] = useState('');

  const files = project.files || {};

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return alert('Enter a filename');
    createLocalFile(name);
    setNewName('');
  };

  return (
    <div className="filetree">
      <div className="filetree-header"><strong>Files</strong></div>
      <div className="filetree-create">
        <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. App.js" />
        <button onClick={handleCreate}>New</button>
      </div>

      <ul className="filetree-list">
        {Object.values(files).map(f => (
          <li key={f.id}>
            <button className="file-name" onClick={()=>{
              setProject(prev => ({...prev, selectedFileId: f.id}));
            }}>{f.name}</button>
            <button className="file-del" onClick={() => {
              if (window.confirm(`Delete ${f.name}?`)) deleteFile(f.id);
            }}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
