"use client"
import { useEffect, useState } from "react"
import { InviteModal } from "../modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "../modals/Create-channel-model";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { DelelteServerModal } from "../modals/delete-server-modal";

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
        <MembersModal />
        <CreateChannelModal />
        <LeaveServerModal />
        <DelelteServerModal />
        </>
    )
}