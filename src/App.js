import React from "react";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import About from "./About";
import Layout from "./Layout";
import EditPost from "./EditPost";
import { Route, Routes} from "react-router-dom";
import { DataProvider } from "./context/DataContext";


function App() {
  return (
    <DataProvider>
      <Routes>
        <Route path="/" element={ <Layout />} >
          <Route index element={ <Home />} />
       
          <Route path="post">
            <Route index element={<NewPost/>}></Route>
            <Route index path=":id" element={<PostPage/>} />
          </Route>

          <Route path="edit" >
            <Route index path=":id" element={<EditPost/>} />
          </Route>
        
          <Route path="about" element={<About/>} />
          <Route path="*" element={<Missing/>} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
