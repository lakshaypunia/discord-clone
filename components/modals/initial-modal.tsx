"use client"
import * as z from "zod";
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
    FormLabel,
    FormMessage
 } from "../ui/form";
 import { Input } from "../ui/input";
 import { Button } from "../ui/button";
import { useEffect, useState } from "react";

const formschema = z.object({
    name: z.string().min(1,{
        message:"server name is requried"
    }),
    imageUrl: z.string().min(1,{
        message:"image is requried"
    })
})

export const InitialModal = () => {
    // the particular usestate and useeffect is used to remove hydration error in our case there is no hydration error occuring but this to tackle it if it occurs
    const [isMounted,setisMounted] = useState(false)

    useEffect(() => {
        setisMounted(true)
    })

    const form =  useForm({
        resolver : zodResolver(formschema),
        defaultValues: {
            name: "",
            imageUrl : ""
        }
    })

    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formschema>) => {
        console.log(values);
    }

    if(!isMounted){
        return null!
    }

    return (
        <Dialog open>
            <DialogContent className="bg-white text-black p-0 overflow-hidden" >
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        customize your server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        give your server a personality with a name and a image you can always change it later
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                image upload system
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