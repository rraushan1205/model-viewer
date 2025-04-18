import React, { useRef, useState } from 'react';
import '@google/model-viewer';
import './App.css';

function App() {
  const modelRef = useRef(null);
  const [modelUrl, setModelUrl] = useState(null);

  const handleZoom = (factor) => {
    const modelViewer = modelRef.current;
    if (modelViewer) {
      const currentZoom = modelViewer.cameraOrbit.split(' ')[2];
      let newZoom = parseFloat(currentZoom.replace('m', '')) + factor;
      newZoom = Math.max(1, Math.min(newZoom, 10));
      modelViewer.cameraOrbit = `0deg 75deg ${newZoom}m`;
    }
  };

  const handleRotate = (angle) => {
    const modelViewer = modelRef.current;
    if (modelViewer) {
      const currentAzimuth = modelViewer.cameraOrbit.split(' ')[0];
      let newAzimuth = parseFloat(currentAzimuth.replace('deg', '')) + angle;
      modelViewer.cameraOrbit = `${newAzimuth}deg 75deg 2.5m`;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.glb')) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    } else {
      alert('Please upload a valid .glb file');
    }
  };

  return (
    <div className="App">
      <h1>Interactive 3D Model Viewer</h1>

      <input type="file" accept=".glb" onChange={handleFileChange} />
      <br /><br />

      {modelUrl && (
        <model-viewer
          ref={modelRef}
          src={modelUrl}
          alt="User uploaded 3D model"
          auto-rotate
          camera-controls
          style={{ width: '600px', height: '400px' }}
        ></model-viewer>
      )}

      {modelUrl && (
        <div className="controls">
          <button onClick={() => handleZoom(-0.5)}>🔍 Zoom In</button>
          <button onClick={() => handleZoom(0.5)}>🔎 Zoom Out</button>
          <button onClick={() => handleRotate(-30)}>⤴️ Rotate Left</button>
          <button onClick={() => handleRotate(30)}>⤵️ Rotate Right</button>
        </div>
      )}
    </div>
  );
}

export default App;
