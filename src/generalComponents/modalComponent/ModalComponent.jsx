import "./ModalComponent.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const ModalComponent = ({ 
    onCloseHandler, 
    isOpen,
    title,
    body,
    bgcolor = 'background.paper'
}) => {
    const modalStyle = {
        position: 'absolute',  //  as 'absolute'
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 400,
        bgcolor: bgcolor, // 'background.paper'
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
  
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onCloseHandler}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div className="modal-close-button-div">
                        <button onClick={onCloseHandler} className="modal-close-button">
                            <img src={process.env.PUBLIC_URL + "img/x.svg"} alt="close" />
                        </button>
                    </div>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div className="modal-modal-title-div">
                            <div className="modal-modal-title-text">
                                <span>{title}</span>
                            </div>                            
                        </div>
                    </Typography>
                    <div className="modal-modal-body-div">
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {body}
                        </Typography>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default ModalComponent;