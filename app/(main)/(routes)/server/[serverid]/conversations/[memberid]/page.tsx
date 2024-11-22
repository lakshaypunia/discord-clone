import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface MemberIdPageProps{
    params : {
        memberid : string;
        serverid : string
    }
}

const MemberIdpage = async({
    params
} : MemberIdPageProps) => {

    const profile = await currentProfile();

    if(!profile){
        return RedirectToSignIn
    }

    const currentMember = await db.member.findFirst({
        where : {
            serverId : params.serverid,
            profileId : profile.id
        },
        include : {
            profile : true
        },
    })

    if(!currentMember){
        return redirect("/")
    }

    const conversations = await getOrCreateConversation(currentMember.id,params.memberid)

    if(!conversations){
        return redirect(`/server/${params.serverid}`)
    }

    const { memberOne, memberTwo} = conversations;

    const otherMember = memberOne.profileId === profile.id? memberTwo : memberOne;




    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
            imageUrl={otherMember.profile.imageUrl}
            name={otherMember.profile.name}
            serverId={params.serverid}
            type="conversation" />
        </div>
    )
}

export default MemberIdpage