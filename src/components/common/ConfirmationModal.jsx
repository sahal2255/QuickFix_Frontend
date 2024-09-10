import React from "react";
import CommonModal from "./CommonModal";
export default function ConfirmationModal({ isVisible, message, onConfirm, onCancel }){
    return (
        <CommonModal open={isVisible} onCancel={onCancel}>
            <div className="p-6 text-center">
                <p>{message}</p>
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={onConfirm}
                    >
                        Confirm
                    </button>
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </CommonModal>
    )
}