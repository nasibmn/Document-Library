import React from "react";
import DocumentsStyle from "./Documents.styled";
import Document from "../Document/Document";
import { useSelector } from "react-redux";

const Documents = () => {
  const { documents } = useSelector(({ docs }) => docs);

  return (
    <>
      <DocumentsStyle />
      <div className="row">
        {!documents ? (
          <h2 className="d-flex justify-content-center align-items-center">
            No Document To Show...
          </h2>
        ) : (
          documents.map((document, index) => (
            <div className="document col-sm-12 col-md-4" key={index}>
              <Document document={document} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Documents;
