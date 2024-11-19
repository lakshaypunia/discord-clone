import { Server } from "@prisma/client";
import { create } from "zustand";



export type ModalType = "createServer" | "invite" | "editServer" | "Members";

interface ModalData {

    server?: Server
}

interface ModalStore {
    type : ModalType | null;
    data : ModalData;
    isOpen : boolean;
    onOpen : (type: ModalType , data? : ModalData) => void;
    onClose: () => void;

}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data : {},
    isOpen: false,
    onOpen: (type , data = {}) => {
        set({ isOpen: true, type, data: { ...data } });
        console.log("data has been taken");
        console.log("this is the data", data)
    },
    onClose: () => set({ type : null, isOpen : false})

}))
