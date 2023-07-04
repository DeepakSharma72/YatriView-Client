import React, { createContext, useState } from 'react'

export const DialogContext = createContext(-1);


export function DialogContextProvider(props) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <DialogContext.Provider value={{open, setOpen, handleClickOpen, handleClose}}>
            {props.children}
        </DialogContext.Provider>
    )
}
