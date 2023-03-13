import {getToken} from "next-auth/jwt"
import {log} from "util";

export default async function handler(req: any, res: any) {
    const home = process.env.NEXTAUTH_URL as string;
    if (!home) throw new Error("NEXTAUTH_URL not set");

    const token = await getToken({ req })
    if (token) {
        console.log("JSON Web Token", JSON.stringify(token, null, 2))
    } else {
        console.log("No tokens.")
        return res.redirect(home)
    }

    // Next-Auth 4.x does not support federated logout
    // TODO: Remove this when
    res.setHeader("Set-Cookie", [
        "next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT",
        "__Secure-next-auth.session-token=deleted; path=/; Secure; expires=Thu, 01 Jan 1970 00:00:00 GMT",
    ]);

    const url = `https://sso.entraos.io/oauth2/logout?id_token_hint=
        ${token.idToken}&post_logout_redirect_uri=${encodeURIComponent(home)}`

    // federated logout through IDP
    const logout = await fetch(url);
    console.log("RebelSSO logout: %s %s", logout.status, logout.statusText)

    return res.redirect(home);
}
