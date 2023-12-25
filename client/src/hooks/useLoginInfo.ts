import { useContext } from "react";
import { Context } from "@/contexts/LoginStatusProvider";

export function useLoginInfo() {
    const loginInfo = useContext(Context)
    if (loginInfo == null) {
        throw new Error('useLoginStatus must be used within a ThemeProvider')
    }
    return loginInfo
}