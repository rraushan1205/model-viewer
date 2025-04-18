import React from "react";
import "@google/model-viewer";

function App() {
  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <model-viewer
        src="/ast.glb"
        alt="A 3D model of an astronaut"
        auto-rotate
        camera-controls
        style={{ width: "600px", height: "600px" }}
      ></model-viewer>
    </div>
  );
}

export default App;
