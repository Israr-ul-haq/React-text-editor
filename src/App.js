import React, { useEffect, useState } from "react";

import {
  Route,
  Routes as Switch,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Swal from "sweetalert2";
import TextEditorComponent from "./Components/TextEditorComponent";
import Hello from "./Components/Hello";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:id/:lessonId" index element={<TextEditorComponent />} />
        {/* <Route path="/" element={<Hello />} /> */}
      </Routes>
    </>
  );
}

export default App;
