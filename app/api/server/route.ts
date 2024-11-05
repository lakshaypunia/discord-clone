import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try{
        const { name,  imageUrl} = await req.json();
        const profile = await currentProfile();
    }catch(error){
        console.log("[SERVERS POST]", error);
        return new NextResponse("internal error",{status:500});
    }
}