import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DocumentService from "./DocumentService";

const initialState = {
  documents: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDeleted: false,
  isUploaded: false,
  message: "",
  isShared: false,
  sharedDocument: {
    id: "",
    dateEntered: "",
    documentName: "",
    noOfDownload: "",
    docType: "",
    docUrl: null,
  },
};

// Upload Document
export const uploadDocument = createAsyncThunk(
  "docs/uploadDocument",
  async (userDocument, thunkAPI) => {
    try {
      return await DocumentService.uploadDocumentService(userDocument);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Download Document
export const downloadDocument = createAsyncThunk(
  "docs/downloadDocument",
  async (documentId, thunkAPI) => {
    try {
      return await DocumentService.downloadDocumentService(documentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// share link
export const shareLink = createAsyncThunk(
  "docs/shareLink",
  async (documentId, thunkAPI) => {
    try {
      return await DocumentService.shareLinkService(documentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// share link
export const deleteDocument = createAsyncThunk(
  "docs/deleteDocument",
  async (documentId, thunkAPI) => {
    try {
      return await DocumentService.deleteService(documentId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// share Document
export const shareDocument = createAsyncThunk(
  "docs/shareDocument",
  async ({ expire, k, docid }, thunkAPI) => {
    try {
      return await DocumentService.shareDocumentService({ expire, k, docid });
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get documents from api
export const getDocuments = createAsyncThunk(
  "docs/getDocuments",
  async (thunkAPI) => {
    try {
      return await DocumentService.documents();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// document slices
export const documentsSlice = createSlice({
  name: "docs",
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDocuments.pending, (state) => {
        state.isSuccess = false;
        state.isLoading = true;
      })
      .addCase(getDocuments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.documents = action.payload;
      })
      .addCase(getDocuments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadDocument.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isUploaded = false;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUploaded = true;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.isUploaded = false;
        state.message = action.payload;
      })
      .addCase(downloadDocument.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(downloadDocument.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = action.payload;
      })
      .addCase(downloadDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(shareLink.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(shareLink.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Temporary Link Copied to Clipboard";
      })
      .addCase(shareLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.tempUrl = "";
      })
      .addCase(shareDocument.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(shareDocument.fulfilled, (state, action) => {
        state.isShared = false;
        state.isLoading = false;
        state.message = "";
        state.sharedDocument = action.payload;
      })
      .addCase(shareDocument.rejected, (state, action) => {
        state.isShared = true;
        state.isLoading = false;
        state.message = action.payload;
        state.sharedDocument = null;
      })
      .addCase(deleteDocument.pending, (state) => {
        state.isLoading = true;
        state.isDeleted = false;
      })
      .addCase(deleteDocument.fulfilled, (state) => {
        state.message = "Document Deleted Successfully!";
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = documentsSlice.actions;
export default documentsSlice.reducer;
