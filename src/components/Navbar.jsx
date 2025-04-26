import Button from "./Button"

const handleSignIn = () => alert("Sign In clicked");
const handleSignOut = () => alert("Sign Out clicked");
import { postInitiative } from "../../apis/initiative";
import Auth from "../pages/Auth";
import SignIn from "./SignIn";

export default function NavBar() {
    return (
        <nav className="w-full flex justify-between items-center p-4 bg-[#020082] shadow-md sticky top-0 z-50">
            <div className="text-2xl font-bold text-white">All Initiatives</div>
            <div className="flex items-center gap-4">
                <SignIn></SignIn>
            </div>
        </nav>
    )
}