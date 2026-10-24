import React, { useState } from 'react';

export default function Gallery({ images, alt }) {
    const [current, setCurrent] = useState(0);

    if (!images.length) {
        return (
            <div className="galleryEmpty" role="img" aria-label="No photograph on file">
                <svg width="120" height="36" viewBox="0 0 120 36" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                    <path d="M4 12h82M4 24h82M86 12c10 0 14-6 22-8v28c-8-2-12-8-22-8M30 12v12M60 12v12" />
                </svg>
                <span>No photograph on file</span>
            </div>
        );
    }

    return (
        <div className="gallery">
            <a href={images[current]} target="_blank" rel="noreferrer noopener" className="galleryMain">
                <img src={images[current]} alt={`${alt}, photograph ${current + 1} of ${images.length}`} />
            </a>
            {images.length > 1 && (
                <div className="galleryThumbs">
                    {images.map((image, i) => (
                        <button
                            key={image}
                            type="button"
                            aria-label={`Show photograph ${i + 1}`}
                            aria-pressed={i === current}
                            onClick={() => setCurrent(i)}
                        >
                            <img src={image} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
