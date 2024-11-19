"use client"
import { useEffect, useState } from "react"
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";

export const ModalProvider = () => {

    const [ ismounted,setismounted] = useState(false);

    useEffect(() => {
        setismounted(true);
    },[])

    if(!ismounted){
        return null;
    }


    return(
        <>
        <InviteModal />
        <EditServerModal />
        </>
    )
}