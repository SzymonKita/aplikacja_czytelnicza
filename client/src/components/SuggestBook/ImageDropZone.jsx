import React, { useState } from 'react';

function ImageDropZone() {
    const [imageSrc, setImageSrc] = useState(null);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => setImageSrc(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div className='dropZone'
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            
        >
            {imageSrc ? (
                <img src={imageSrc} alt="Dropped" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            ) : (
                <p>Drag & Drop an image here</p>
            )}
        </div>
    );
}

export default ImageDropZone;
