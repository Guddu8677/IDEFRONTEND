import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const { token } = useContext(AuthContext);

  const [project, setProject] = useState(() => {
    try {
      const raw = localStorage.getItem('project');
      return raw ? JSON.parse(raw) : { id: null, name: 'Untitled', files: {
        'index.html': { id: 'index.html', name: 'index.html', type: 'html', content: '<h1>Hello world</h1>' },
        'style.css': { id: 'style.css', name: 'style.css', type: 'css', content: 'body{font-family:Arial}' },
        'script.js': { id: 'script.js', name: 'script.js', type: 'js', content: 'console.log("Hello")' }
      } };
    } catch {
      return { id: null, name: 'Untitled', files: {} };
    }
  });

  useEffect(() => {
    localStorage.setItem('project', JSON.stringify(project));
  }, [project]);

  const createLocalFile = (name) => {
    const id = `${name}-${Date.now()}`;
    const ext = name.split('.').pop().toLowerCase();
    const type = ext === 'js' ? 'js' : ext === 'css' ? 'css' : ext === 'html' ? 'html' : 'text';
    setProject(prev => ({
      ...prev,
      files: { ...prev.files, [id]: { id, name, type, content: '' } }
    }));
  };

  const updateFileContent = (fileId, content) => {
    setProject(prev => ({
      ...prev,
      files: { ...prev.files, [fileId]: { ...prev.files[fileId], content } }
    }));
  };

  const deleteFile = (fileId) => {
    setProject(prev => {
      const copy = { ...prev.files };
      delete copy[fileId];
      return { ...prev, files: copy };
    });
  };

  
  const saveProjectToServer = async () => {
    if (!token) throw new Error('Not authenticated');
    const API = process.env.REACT_APP_API_URL || '';
    if (!project.id) {
    
      const res = await fetch(`${API}/api/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: project.name }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Create project failed');
      setProject(prev => ({ ...prev, id: data._id, files: data.files || prev.files }));
      return data;
    } else {
 
      const res = await fetch(`${API}/api/projects/${project.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ files: project.files }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      return data;
    }
  };

  const loadProjectFromServer = async (projectId) => {
    if (!token) throw new Error('Not authenticated');
    const API = process.env.REACT_APP_API_URL || '';
    const res = await fetch(`${API}/api/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Load failed');
    setProject({ id: data._id, name: data.name, files: data.files || {} });
    return data;
  };

  return (
    <ProjectContext.Provider value={{
      project,
      setProject,
      createLocalFile,
      updateFileContent,
      deleteFile,
      saveProjectToServer,
      loadProjectFromServer,
    }}>
      {children}
    </ProjectContext.Provider>
  );
}
