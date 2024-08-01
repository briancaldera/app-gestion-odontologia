import {Modal as MuiModal, ModalClose, ModalDialog} from '@mui/joy'
import React from "react";

const Modal = ({
                   ariaLabelledBy,
                   ariaDescribedBy,
                   open,
                   onClose = () => {
                   }, children, ...props
               }) => {

    return (
        <MuiModal
            aria-labelledby={ariaLabelledBy}
            aria-describedby={ariaDescribedBy}
            open={open}
            onClose={onClose}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            {...props}
        >
            <ModalDialog
                variant={"plain"}
                sx={{
                    maxWidth: 500,
                    minHeight: 100,
                }}
            >
                <ModalClose variant="plain" sx={{m: 1}}/>
                {children}
            </ModalDialog>
        </MuiModal>
    )
}

export default Modal
