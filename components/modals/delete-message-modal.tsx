"use client"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle} from "../ui/dialog"

import qs from "query-string"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";




export const DelelteMessageModal = () => {

    const { isOpen ,data ,  onClose , type, } = useModal();


    const {apiUrl,query } = data;

    const url = qs.stringifyUrl({
       url :apiUrl || "",
       query,
    })
    
    const [isloading,setisloading] = useState(false);

    const onClick = async () => {
        try{
            setisloading(true)

            await axios.delete(url)
            
            onClose();      
        }catch(error){
            console.log(error);
        }finally {
            setisloading(false)
        }
    }


    const isModalOpen = isOpen && type === "deleteMessage"

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete Message
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        The message will be permanently deleted.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                        disabled={isloading}
                        onClick={onClose}
                        variant="ghost">
                            Cancel
                        </Button>
                        <Button
                        disabled={isloading}
                        variant="primary"
                        onClick={onClick}>
                            Confirm
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}