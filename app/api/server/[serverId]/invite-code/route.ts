import {v4 as uuidv4} from "uuid"
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";



export async function PATCH(
    req : Request,
    { params } : { params: {serverId : string}}
){
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unautorized", { status : 401})
        }

        if(!params.serverId){
            return new NextResponse("Server id missing", {status : 400})
        }

        const server = await db.server.update({
            where: {
                id : params.serverId,
                profileId : profile.id
            },

            data: {
                invideCode : uuidv4(),
            }
        })

        return NextResponse.json(server)

    } catch(error){
        console.log("[SERVER ID]" , error);
        return new NextResponse("Internal Error", { status:500});
    }
}