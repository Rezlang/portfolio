import React, { useState } from 'react';
import {
  FileUploadContainer,
  FormField,
  InputLabel,
  DragDropText,
  UploadFileBtn,
  FilePreviewContainer,
  PreviewList,
  FileMetaData,
  RemoveFileIcon,
  PreviewContainer,
  ImagePreview,
} from './file-upload.styles.js';

const FileUpload = ({ accept, label, multiple, onSubmit }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setUploadedFiles(Array.from(files));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(uploadedFiles);
  };

  return (
    <FileUploadContainer>
      <InputLabel htmlFor="file-upload">{label}</InputLabel>
      <DragDropText>Drag and drop your files anywhere or</DragDropText>
      <UploadFileBtn>
        <i className="fas fa-file-upload" />
        <span>Upload {multiple ? 'files' : 'a file'}</span>
      </UploadFileBtn>
      <FormField
        type="file"
        id="file-upload"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
      />
      <FilePreviewContainer>
        <PreviewList>
          {uploadedFiles.map((file, index) => (
            <PreviewContainer key={index}>
              <div>
                <ImagePreview src={URL.createObjectURL(file)} alt={file.name} />
                <FileMetaData isImageFile={file.type.startsWith('image/')}>
                  <p>{file.name}</p>
                  <aside>
                    <span>{Math.round(file.size / 1000)} kb</span>
                    <RemoveFileIcon
                      className="fas fa-trash-alt"
                      onClick={() => {
                        const newFiles = [...uploadedFiles];
                        newFiles.splice(index, 1);
                        setUploadedFiles(newFiles);
                      }}
                    />
                  </aside>
                </FileMetaData>
              </div>
            </PreviewContainer>
          ))}
        </PreviewList>
      </FilePreviewContainer>
      <UploadFileBtn type="submit" onClick={handleSubmit}>
        Submit
      </UploadFileBtn>
    </FileUploadContainer>
  );
};

export default FileUpload;