import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="spinner-container">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Place your SVG path data here */}
                <path
                    d="M50 10a40 40 0 1 0 0 80 40 40 0 1 0 0-80zm0 6a34 34 0 1 1 0 68 34 34 0 1 1 0-68zm0 6v52m26-26H24"
                    fill="#FFF"
                    stroke="#070707"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};

export default LoadingSpinner;
