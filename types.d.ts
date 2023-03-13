import {JWT} from "next-auth/jwt";

interface RebelToken extends JWT {
    access_token: string
    expires_at: number
    refresh_token: string
    id_token: string
    version: string
    user: User | AdapterUser | undefined
}
