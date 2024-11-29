"use client"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle} from "../ui/dialog"

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const DelelteServerModal = () => {

    const { isOpen ,data ,  onClose , type, } = useModal();
    const router = useRouter();


    const { server } = data;
    
    const [isloading,setisloading] = useState(false);
    const onClick = async () => {
        try{
            setisloading(true)

            await axios.delete(`/api/server/${server?.id}`)
            
            onClose();
            router.refresh();
            router.push("/");
            

        }catch(error){
            console.log(error);
        }finally {
            setisloading(false)
        }
    }


    const isModalOpen = isOpen && type === "deleteServer"

    return(
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Delete server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="font-semibold text-indigo-500">{server?.name}</span> will be permanently deleted.
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