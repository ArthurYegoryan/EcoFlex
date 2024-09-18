import "./ModalComponent.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { fontSizes } from "../../assets/styles/fontSizes";

const ModalComponent = ({ 
    onCloseHandler, 
    isOpen,
    title,
    body,
    bodyMaxHeight = "700px",
    bgcolor = 'background.paper',
    closeImageUrl = "img/x.svg"
}) => {
    const modalStyle = {
        position: 'absolute',  //  as 'absolute'
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
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
                            <img src={process.env.PUBLIC_URL + closeImageUrl} alt="close" />
                        </button>
                    </div>
                    {title &&
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <div className="modal-modal-title-div">
                                <div style={{ fontSize: fontSizes.modalTitle }} className="modal-modal-title-text">
                                    <span>{title}</span>
                                </div>                            
                            </div>
                        </Typography>
                    }
                    <div style={{ 
                            overflowY: "auto",
                            maxHeight: bodyMaxHeight 
                         }} 
                         className="modal-modal-body-div"
                    >
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