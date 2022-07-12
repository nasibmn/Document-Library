import axios from "axios";
import copy from "copy-to-clipboard";

// get docuemnts
const documents = async () => {
  const response = await axios.get(process.env.REACT_APP_DOCUMENT_URL);
  return response.data;
};

// upload docuemnt
const uploadDocumentService = async (userDocument) => {
  const response = await axios.post(
    process.env.REACT_APP_DOCUMENT_URL + "/upload",
    userDocument
  );
  return response.data;
};

// download docuemnt
const downloadDocumentService = async (documentId) => {
  const response = await axios.get(
    process.env.REACT_APP_DOCUMENT_URL + "/download",
    {
      params: { id: documentId },
      responseType: "blob",
    }
  );
  const filename =
    response.headers["content-disposition"].split("filename=")[1];
  const url = window.URL.createObjectURL(response.data);
  console.log(url);
  const link = document.createElement("a");
  const img = document.createElement("img");
  img.src = url;
  link.href = url;
  link.download = filename;
  link.click();
  link.remove();
};

// delete document
const deleteService = async (documentId) => {
  const response = await axios.delete(
    process.env.REACT_APP_DOCUMENT_URL + "/delete",
    {
      params: { id: documentId },
    }
  );
  return response.data;
};

// share link
const shareLinkService = async (documentId) => {
  const response = await axios.get(
    process.env.REACT_APP_DOCUMENT_URL + "/share-link",
    {
      params: { id: documentId },
    }
  );
  copy(response.data);
};

// disply shared document
const shareDocumentService = async ({ expire, k, docid }) => {
  const response = await axios.get(
    process.env.REACT_APP_DOCUMENT_URL + "/share-document",
    {
      params: { expire: expire, k: k, docid: docid },
    }
  );
  return response.data;
};

const DocumentService = {
  documents,
  uploadDocumentService,
  downloadDocumentService,
  shareLinkService,
  shareDocumentService,
  deleteService,
};

export default DocumentService;
