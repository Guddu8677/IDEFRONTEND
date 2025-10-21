import React from 'react';
import FileTree from '../Editor/FileTree';
import MultiEditor from '../Editor/MultiEditor';
import Preview from '../Preview/preview';
import {ProjectProvider} from '../context/ProjectContext'

export default function AppLayout() {
  return (
    <ProjectProvider>
      <div className="ide-root">
        <aside className="ide-left"><FileTree /></aside>
        <main className="ide-center"><MultiEditor /></main>
        <aside className="ide-right"><Preview /></aside>
      </div>
    </ProjectProvider>
  );
}
