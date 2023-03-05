import {NextRequest} from "next/server";
import {redirect} from "next/navigation";

export async function GET(req: NextRequest, { params }: any) {
    console.log("Login-callback")
    console.log("Params:", params)

    redirect("/community")
}
