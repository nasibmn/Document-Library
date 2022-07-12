import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getDocuments } from "./features/DocumnentSlicer";
import Dialogs from "./components/Dialogs/Dialogs";
import SharedDocument from "./components/SharedDocument/SharedDocument";

const App = () => {
  const { isDeleted, isUploaded } = useSelector(({ docs }) => docs);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(getDocuments());
  }, [dispatch, isDeleted, isUploaded]);
  return (
    <>
      <Navbar />
      <Dialogs />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="share-document" element={<SharedDocument />} />
        <Route
          path="*"
          element={
            <h5 className="d-flex justify-content-center align-items-center mt-5">
              This Page Does Not Exist...
            </h5>
          }
        />
      </Routes>
    </>
  );
};

export default App;
