import { useState, useRef } from 'react';
import { FaCamera, FaTrash, FaImage } from 'react-icons/fa';
import './ImageUpload.css';

const ImageUpload = ({ currentImage, onImageChange, label, aspectRatio = '1/1' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      // Compress image if needed
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 800;
        let { width, height } = img;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL('image/jpeg', 0.8);
        onImageChange(compressedImage);
        setIsLoading(false);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleRemove = () => {
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      {label && <label className="image-upload-label">{label}</label>}

      <div
        className={`image-upload-zone ${isDragging ? 'dragging' : ''} ${currentImage ? 'has-image' : ''}`}
        style={{ aspectRatio }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
      >
        {isLoading ? (
          <div className="upload-loading">
            <div className="loading-spinner"></div>
            <span>Processing...</span>
          </div>
        ) : currentImage ? (
          <>
            <img src={currentImage} alt="Uploaded" className="uploaded-image" />
            <div className="image-overlay">
              <button
                type="button"
                className="change-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                <FaCamera /> Change
              </button>
              <button
                type="button"
                className="remove-image-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <FaTrash /> Remove
              </button>
            </div>
          </>
        ) : (
          <div className="upload-placeholder">
            <FaImage className="upload-icon" />
            <span className="upload-text">Click or drag image here</span>
            <span className="upload-hint">JPG, PNG (max 5MB)</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
