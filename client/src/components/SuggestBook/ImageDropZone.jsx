import React, { useState } from 'react';
import axios from 'axios';

function ImageDropZone({ onUploadSuccess }) {
    const [imageSrc, setImageSrc] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target.result);
            reader.readAsDataURL(file);

            // Upload the file to the server
            const formData = new FormData();
            formData.append('cover', file);

            axios.post('http://localhost:5000/upload-cover', formData)
                .then(response => {
                    if (response.data.fileName) {
                        onUploadSuccess(response.data.fileName); // Callback to pass the file name
                    }
                })
                .catch(error => {
                    console.error('Error uploading cover:', error);
                });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className='dropZone' onDrop={handleDrop} onDragOver={handleDragOver}>
            {imageSrc ? (
                <img src={imageSrc} alt="Dropped" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
                <p>Przeciągnij i upuść obrazek tutaj</p>
            )}
        </div>
    );
}

export default ImageDropZone;
