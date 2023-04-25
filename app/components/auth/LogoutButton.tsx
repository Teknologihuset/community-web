import Link from "next/link";

export default function LogoutButton() {
    return <Link className="button is-dark-blue" href="/api/auth/logout">Log out</Link>
}