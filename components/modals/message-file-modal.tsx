"use client"
import axios from "axios"
import * as z from "zod";
import qs from "query-string"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle} from "../ui/dialog"
import { Form,
    FormControl,
    FormField,
    FormItem,
 } from "../ui/form";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
import dynamic from "next/dynamic";

const FileUpload = dynamic(() => import("../file-upload").then((mod) => mod.FileUpload), { 
    ssr: false 
  });

const formschema = z.object({
    fileUrl: z.string().min(1,{
        message:"attachment is requried"
    })
})


export const MessageFileModal = () => {

    const {isOpen, onClose,type,data} = useModal();

    const{apiUrl,query} = data;

    
    const router = useRouter();

    const isModalOpen = isOpen && type === "messageFile"

    const form =  useForm({
        resolver : zodResolver(formschema),
        defaultValues: {
            fileUrl : ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formschema>) => {
        try{
            const url = qs.stringifyUrl({
                url : apiUrl || "",
                query
            })
            
            await axios.post(url,{
                ...values,
                content : values.fileUrl
            });

            form.reset();
            router.refresh();
            onClose();
        }catch(error){
            console.log(error);
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                control={form.control}
                                name = "fileUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            //the endpoint props is used to define which type of data we want to upload like image for sever we use serveimage as we have defined it in core.ts
                                             endpoint="messageFile"
                                             value={field.value}
                                             onChange = {field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />  
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4 ">
                            <Button variant="primary" disabled={isLoading}>
                                Send
                            </Button>

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}