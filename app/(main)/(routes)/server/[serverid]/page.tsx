import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface ServerIdPageProps {
    params : {
        serverid : string;
    }
}




const Serverpage = async({
    params
} : ServerIdPageProps) => {

    const profile = await currentProfile();

    if(!profile){
        return RedirectToSignIn
    }

    const server = await db.server.findUnique({
        where : {
            id : params.serverid,
            members : {
                some : {
                    profileId : profile.id,
                }
            }
        },
        include : {
            channels : {
                where : {
                    name : "general"
                },
                orderBy : {
                    createdAt : "asc"
                }
            }
        }
    })

    const initialChannel = server?.channels[0];

    console.log("this is server" , server)

    if(initialChannel?.name !== "general"){
        return null;
    }

    return redirect(`/server/${params.serverid}/channels/${initialChannel?.id}`)
}


export default Serverpage