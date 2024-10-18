import React from 'react';
import Loader1 from '../../../public/Funnel.gif'; // Assuming the path is correct

const PreLoader = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <p className="mb-4 text-lg">Loading...</p>
                <img src={Loader1} alt="Loading" className="mx-auto" />
            </div>
        </div>
    );
};

export default PreLoader;
