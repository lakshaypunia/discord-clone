import { currentUser, redirectToSignIn } from "@clerk/nextjs/server";
import { db } from "./db";
//refers to db.ts


export const initialProfile = async () => {
    const user = await currentUser();

    if (!user){
        redirectToSignIn()
        return null;
    }

    const profile =  await db.profile.findUnique({
        where: {
            uesrId : user.id
        }
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            uesrId : user.id,
            name :`${user.firstName} ${user.lastName}`,
            imageUrl : user.imageUrl,
            email: user.emailAddresses[0].emailAddress

        }
    });

    return newProfile;

}