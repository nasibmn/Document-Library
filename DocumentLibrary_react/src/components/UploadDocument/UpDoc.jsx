import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { uploadDocument } from "../../features/DocumnentSlicer";

const UpDoc = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data, e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in Object.keys(data.file)) {
      formData.append("files", data.file[key]);
    }
    dispatch(uploadDocument(formData));
  };
  return (
    <>
      <button
        type="button"
        className="upload-doc btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        ADD DOCUMENTS
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add New Document
                </h5>
                <button
                  type="button"
                  className="btn-close shadow-none"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label mb-4 mt-4">
                    Upload Your Document
                    <p className="supports text-danger">
                      supported files: jpeg, jpg, png, docx, pdf, xlsx, txt
                    </p>
                  </label>
                  <input
                    multiple
                    {...register("file", {
                      required: "Please Select a Document",
                    })}
                    className="mb-3 form-control"
                    type="file"
                    id="formFile"
                  />
                  {errors.file && (
                    <span className="text-danger">{errors.file?.message}</span>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-btn btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  name="submit"
                  className="modal-btn btn btn-primary"
                >
                  Add Document
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpDoc;
