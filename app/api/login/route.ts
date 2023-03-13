import {NextRequest, NextResponse} from "next/server";
import {generators, Issuer} from "openid-client";
import {EntraClient} from "#/app/state/server";
import {redirect} from "next/navigation";
import cookie from 'cookie';

export async function GET(req: NextRequest, res: NextResponse) {
    const code_verifier = generators.codeVerifier();
    const code_challenge = generators.codeChallenge(code_verifier);
    const nonce = generators.nonce();
    const state = generators.state();

    const client = await EntraClient();

    const authorizationUrl = client.authorizationUrl({
        response_type: "code",
        response_mode: "fragment",
        client_id: client.metadata.client_id,
        scope: 'openid email profile',
        code_challenge,
        code_challenge_method: 'S256',
        state,
        nonce
    });

    console.log("Redirecting to: ", authorizationUrl)
    redirect(authorizationUrl);
}