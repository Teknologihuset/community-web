import {BaseClient, Issuer} from "openid-client";

let client: BaseClient | undefined = undefined;

export async function EntraClient() {
    if (client) {
        console.log("Using existing client.")
        return client;
    }

    const configEndpoint = process.env.ENTRAOS_CONFIG as string;
    if (!configEndpoint) throw new Error("Configuration env variable not set.");

    const clientId = process.env.TEKNOLOGIHUSET_CLIENT_ID as string;
    if (!clientId) throw new Error("Config endpoint env variable not set.");

    const clientSecret = process.env.TEKNOLOGIHUSET_CLIENT_SECRET as string;
    if (!clientSecret) throw new Error("Config endpoint env variable not set.");

    const issuer = await Issuer.discover(configEndpoint);
    console.log('Discovered issuer %s %O', issuer.issuer, issuer.metadata);

    client = new issuer.Client({
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uris: ["http://localhost:3000/api/login/callback"],
        post_logout_redirect_uris: [ 'http://localhost:3000/' ],
        token_endpoint_auth_method: 'client_secret_post',
        token_endpoint_auth_signing_alg: "RS256",
        response_types: ["code id_token token"],
        grant_type: "authorization_code",
        scope: "openid email profile",
        response_mode: "fragment",
        default_max_age: 3600
    });

    return client;
}