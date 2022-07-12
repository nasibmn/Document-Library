import React from "react";
// import { Link } from "react-router-dom";
import DocumentStyle from "./Document.styled";
import { useDispatch } from "react-redux";
import { FileIcon, defaultStyles } from "react-file-icon";
import {
  reset,
  downloadDocument,
  shareLink,
  deleteDocument,
} from "../../features/DocumnentSlicer";
const Document = ({ document }) => {
  const dispatch = useDispatch();
  const documentType = document.docType.replace(".", "");
  const removeDocument = (id, e) => {
    dispatch(deleteDocument(id));
    e.preventDefault();
  };
  return (
    <>
      <DocumentStyle />
      <div className="card">
        <div className="embedContainer">
          <embed
            onContextMenu={(e) => e.preventDefault()}
            className="card-img-top"
            // "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
            // it's better to use our online domain than localhost to manage display
            src={
              process.env.REACT_APP_IMAGE_URL + document.docUrl + "#toolbar=0"
            }
          ></embed>
        </div>
        <div className="card-body">
          <h5 className="card-title mt-4">
            {document.documentName.split(".")[0]}
          </h5>
          <div className="card-text mb-1 mt-2">
            <div className="icons">
              <FileIcon
                extension={documentType}
                {...defaultStyles[documentType]}
              />
            </div>
            <span>Upload Date: {document.dateEntered.split("T")[0]}</span>
            <span>Downloads: {document.noOfDownload}</span>
          </div>
          <div className="btn-group">
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(downloadDocument(document.id));
                dispatch(reset());
              }}
              className="btn btn-primary"
            >
              Download
            </button>

            <button
              className="btn btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                dispatch(shareLink(document?.id));
                dispatch(reset());
              }}
            >
              Create Link
            </button>
            <button
              className="btn btn-secondary"
              onClick={(e) => removeDocument(document.id, e)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Document;
