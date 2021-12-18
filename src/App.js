import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./containers/Main/Main";
import DetectFaces from "./containers/DetectFaces/DetectFaces";
import UploadImages from "./containers/UploadImages/UploadImages";
import FindFaces from './containers/FindFaces/FindFaces';

function App() {
  return (
    <Routes>
      {/* <Route path="/matchfaces" element={<MatchFaces />}></Route> */}
      <Route path="/*" element={<Main />}>
        <Route path="" element={<UploadImages />}></Route>
        <Route path="detectfaces" element={<DetectFaces />}></Route>
        <Route path="findfaces" element={<FindFaces />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
