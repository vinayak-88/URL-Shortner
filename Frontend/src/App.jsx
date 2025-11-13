import Body from "./Components/Body";
import NotFound from "./Components/NotFound"
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
