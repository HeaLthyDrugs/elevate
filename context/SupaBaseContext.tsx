import { client } from "@/utils/supabaseClient";
import { useAuth } from "@clerk/clerk-expo";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { createContext, useContext, useEffect } from "react";

type ProviderProps = {
    userId: string | null;
    createBoard: (title: string, background: string) => Promise<any>;
    getBoards: () => Promise<any>;
    getBoardInfo: (boardId: string) => Promise<any>;
    // updateBoard: (board: Board) => Promise<any>;
    deleteBoard: (id: string) => Promise<any>;
    getBoardLists: (boardId: string) => Promise<any>;
    addBoardList: (boardId: string, title: string, position?: number) => Promise<any>;
    // updateBoardList: (list: TaskList, newname: string) => Promise<any>;
    deleteBoardList: (id: string) => Promise<any>;
    getListCards: (listId: string) => Promise<any>;
    addListCard: (
        listId: string,
        boardId: string,
        title: string,
        position?: number,
        image_url?: string | null
    ) => Promise<any>;
    // updateCard: (task: Task) => Promise<any>;
    assignCard: (cardId: string, userId: string) => Promise<any>;
    deleteCard: (id: string) => Promise<any>;
    getCardInfo: (id: string) => Promise<any>;
    findUsers: (search: string) => Promise<any>;
    addUserToBoard: (boardId: string, userId: string) => Promise<any>;
    getBoardMember: (boardId: string) => Promise<any>;
    getRealtimeCardSubscription: (
        id: string,
        handleRealtimeChanges: (update: RealtimePostgresChangesPayload<any>) => void
    ) => any;
    uploadFile: (
        filePath: string,
        base64: string,
        contentType: string
    ) => Promise<string | undefined>;
    getFileFromPath: (path: string) => Promise<string | undefined>;
    setUserPushToken: (token: string) => Promise<any>;
};

const SupabaseContext = createContext<Partial<ProviderProps>>({});

export function useSupabase() {
    return useContext(SupabaseContext);
}

export const SupabaseProvider = ({ children }: any) => {
    const { userId } = useAuth();

    useEffect(() => {
        setRealtimeAuth();
    }, []);

    const setRealtimeAuth = async () => {
        const clerkToken = await window.Clerk.session?.getToken({
            template: 'supabase',
        });

        client.realtime.setAuth(clerkToken!);
    };
}


