"use client"

import { 
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import { io as ClientIO} from "socket.io-client"

type SocketContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socket : any | null;
    isConnected : boolean
}

const SocketContext = createContext<SocketContextType>({
    socket : null,
    isConnected : false
});

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ 
    children
 } : {
    children : React.ReactNode
}) => {
    const [socket, setSocket] = useState(null);
    const [ isConnected, setisconnected] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const socektInstance = new (ClientIO as any)(process.env.NEXT_PUBLIC_SITE_URL!,{
            path : "/api/socket/io",
            addTrailingSlash : false,
        });

        socektInstance.on("connect", () => {
            setisconnected(true);
        });

        socektInstance.on("disconnect", () => {
            setisconnected(false);
        })

        setSocket(socektInstance)

        return () => {
            socektInstance.disconnect();
        }

    },[]);


    return (
        <SocketContext.Provider value={{socket , isConnected}}>
            {children}
        </SocketContext.Provider>
    )
}