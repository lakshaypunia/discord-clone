import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";


interface channelIdPageProps{
    params : {
        serverid : string;
        channelId : string;
    }
}

const ChannelIdPage = async({
    params
} :  channelIdPageProps) => {

    const profile = await currentProfile()

    if(!profile){
        return RedirectToSignIn
    }

    const channel = await db.channel.findUnique({
        where : {
            id : params.channelId
        }
    })

    const member =  await db.member.findFirst({
        where : {
            serverId : params.serverid,
            profileId : profile.id,
        }
    })

    if(!channel || !member){
        redirect("/");
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                name={channel.name}
                serverId={channel.serverId}
                type="channel" />
            <ChatMessages 
            member = {member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
                channelId : channel.id,
                serverId : channel.serverId
            }}
            paramKey="channelId"
            paramValue={channel.id} />
            <ChatInput name={channel.name} 
            type="channel"
            apiUrl="/api/socket/messages"
            query = {{
                channelId : channel.id,
                serverId : channel.serverId
            }} />
        </div>
    )
}

export default ChannelIdPage