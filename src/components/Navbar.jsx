import SignIn from "./SignIn";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="w-full flex justify-between items-center py-3 px-6 bg-[#020082] shadow-md sticky top-0 z-50">
            <Link to={`/dashboard`} className="text-2xl font-bold text-white">BillBoard</Link>
            <div className="flex items-center gap-4">
                <SignIn />
            </div>
        </nav>
    )
}