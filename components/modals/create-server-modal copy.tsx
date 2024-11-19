"use client"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
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
    FormLabel,
    FormMessage
 } from "../ui/form";
 import { Input } from "../ui/input";
 import { Button } from "../ui/button";
 import { FileUpload } from "../file-upload";

const formschema = z.object({
    name : z.string().min(1,{
        message : "The name of the server cannot be empty" 
    }),
    imageUrl : z.string().min(1,{
        message : "Image url for the server cannot be empty"
    })
})



export const CreateServerModal = () => {

   

    const form = useForm({
        resolver: zodResolver(formschema),
        defaultValues : {
            name : "",
            imageUrl : ""
        }
    })
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: any) => {
        try{
            const response = await axios.post("/api/server",values);

            form.reset();
            window.location.href = `/server/${response.data.id}`
        }catch(error){
            console.log(error);
        }
    }


    return(
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        create new server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        give your server a personality with a name and a image you can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField 
                                control={form.control}
                                name = "imageUrl"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload
                                            //the endpoint props is used to define which type of data we want to upload like image for sever we use serveimage as we have defined it in core.ts
                                             endpoint="serverImage"
                                             value={field.value}
                                             onChange = {field.onChange} />
                                        </FormControl>
                                    </FormItem>
                                )} />  
                            </div>

                            <FormField 
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel
                                    className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                                        Server name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                        disabled={isLoading}
                                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                        placeholder="Enter server name"
                                        {...field}>
                                        
                                        </Input>
                                    </FormControl>
                                    <FormMessage></FormMessage>
                                </FormItem>
                            )} />
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4 ">
                            <Button variant="primary" disabled={isLoading}>
                                Create
                            </Button>

                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
