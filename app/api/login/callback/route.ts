import {NextRequest} from "next/server";
import {redirect} from "next/navigation";
import cookie from 'cookie';

export async function GET(req: NextRequest) {
    console.log("Login-callback")
    const { searchParams } = new URL(req.url);
    console.log("Params:", searchParams)

    redirect("/community")
}
