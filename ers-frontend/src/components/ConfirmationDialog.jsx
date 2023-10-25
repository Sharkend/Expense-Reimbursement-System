import React, { useState } from 'react';

const ConfirmationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openDialog = () => {
      setIsOpen(true);
    };
  
    const closeDialog = () => {
      setIsOpen(false);
    };
  
    const handleConfirmation = () => {
      // TODO: Implement the confirmation action here.
      console.log("hi");
    };
  
    return (
      <div className="confirmation-dialog">
        {isOpen && (
          <div className="confirmation-dialog-modal">
            <div className="confirmation-dialog-header">
              <h1>Confirmation Dialog</h1>
            </div>
            <div className="confirmation-dialog-body">
              <p>Are you sure you want to do this?</p>
            </div>
            <div className="confirmation-dialog-footer">
              <button className="btn btn-primary" onClick={handleConfirmation}>
                Yes
              </button>
              <button className="btn btn-secondary" onClick={closeDialog}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ConfirmationDialog;