import React, { useEffect } from "react";
import SharedDocumentStyle from "./SharedDocument.styled";
import {
  downloadDocument,
  shareDocument,
} from "../../features/DocumnentSlicer";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useDispatch, useSelector } from "react-redux";

const SharedDocument = () => {
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(window.location.search);
  const expire = queryParams.get("expire");
  const k = queryParams.get("k"); // token to controll the expiration date, generated in the backend
  const docid = queryParams.get("id"); // doc id to render
  useEffect(() => {
    return () => dispatch(shareDocument({ expire, k, docid }));
  }, [dispatch, expire, k, docid]);
  const { isShared, message, sharedDocument } = useSelector(({ docs }) => docs);
  if (isShared) {
    return (
      <h1 className="d-flex justify-content-center align-items-center text-danger mt-5">
        {message}
      </h1>
    );
  }
  const { id, docType, docUrl, documentName, dateEntered, noOfDownload } =
    sharedDocument;
  const documentType = docType.replace(".", "");
  return (
    <div>
      <SharedDocumentStyle />
      <div className="container mt-4">
        <div className="card">
          <div className="embedContainer">
            <embed
              className="card-img-top"
              // "https://drive.google.com/viewerng/viewer?embedded=true&url=" +
              // it's better to use our online domain than localhost to manage display
              // iframe or embed does not support all document display
              src={
                docUrl &&
                process.env.REACT_APP_IMAGE_URL + docUrl + "#toolbar=0"
              }
            ></embed>
          </div>
          <div className="card-body">
            <h5 className="card-title mt-4">{documentName.split(".")[0]}</h5>
            <div className="card-text mb-1 mt-2">
              <div className="icons">
                <FileIcon
                  extension={documentType}
                  {...defaultStyles[documentType]}
                />
              </div>
              <span>Upload Date: {dateEntered.split("T")[0]}</span>
              <span>Downloads: {noOfDownload}</span>
            </div>
            <div className="btn-group">
              <button
                onClick={() => {
                  dispatch(downloadDocument(id));
                }}
                className="btn btn-primary"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDocument;
