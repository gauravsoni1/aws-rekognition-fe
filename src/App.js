import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./containers/Main/Main";
import MatchFaces from "./containers/MatchFaces/MatchFaces";
import UploadImages from "./containers/UploadImages/UploadImages";
import DetectFaces from "./containers/DetectFaces/DetectFaces";
import PpeDetection from "./containers/PpeDetection/PpeDetection";

function App() {
  return (
    <Routes>
      {/* <Route path="/matchfaces" element={<MatchFaces />}></Route> */}
      <Route path="/*" element={<Main />}>
        <Route path="" element={<UploadImages />}></Route>
        <Route path="matchfaces" element={<MatchFaces />}></Route>
        <Route path="detectfaces" element={<DetectFaces />}></Route>
        <Route path="ppedetection" element={<PpeDetection />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
