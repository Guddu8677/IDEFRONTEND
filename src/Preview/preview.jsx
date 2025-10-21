import React, { useContext, useMemo } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function Preview() {
  const { project } = useContext(ProjectContext);
  const files = project.files || {};

  const hasReact = Object.values(files).some(f => f.name.endsWith('.jsx') || f.name.endsWith('.js'));

  const sandpackFiles = useMemo(() => {
    const out = {};
    Object.values(files).forEach(f => {
      const path = `/${f.name}`;
      out[path] = { code: f.content || '' };
    });
    // ensure an App.js if not present for sandpack
    if (!out['/App.js'] && out['/index.html']) {
      out['/App.js'] = { code: `export default function App(){ return <div dangerouslySetInnerHTML={{__html: \`${files[Object.keys(files).find(k=>files[k].name==='index.html')]?.content || ''}\`}}/> }` };
    }
    return out;
  }, [files]);

  if (hasReact) {
    return (
      <div className="preview-shell">
        <Sandpack template="react" files={sandpackFiles} options={{ autorun: true, showConsole: true }} />
      </div>
    );
  }

  
  const htmlFile = Object.values(files).find(f => f.name === 'index.html');
  const cssFile = Object.values(files).find(f => f.name === 'style.css');
  const jsFile = Object.values(files).find(f => f.name === 'script.js');

  const srcDoc = `
    <html>
    <head><style>${cssFile?.content || ''}</style></head>
    <body>${htmlFile?.content || ''}<script>try{${jsFile?.content || ''}}catch(e){document.body.innerHTML += '<pre style="color:red;">' + e + '</pre>'}</script></body>
    </html>
  `;

  return (
    <div className="preview-shell">
      <iframe title="preview" srcDoc={srcDoc} sandbox="allow-scripts" className="preview-iframe" />
    </div>
  );
}
