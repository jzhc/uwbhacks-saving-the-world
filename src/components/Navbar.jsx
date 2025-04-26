import Button from "./Button"

const handleSignIn = () => alert("Sign In clicked");
const handleSignOut = () => alert("Sign Out clicked");

export default function NavBar() {
    return (
        <nav className="w-full flex justify-between items-center p-4 bg-[#020082] shadow-md sticky top-0 z-50">
            <div className="text-2xl font-bold text-white">All Initiatives</div>
            <div className="flex items-center gap-4">
                <Button onClick={handleSignIn}>Sign In</Button>
                <Button onClick={handleSignOut} variant="secondary">Sign Out</Button>
            </div>
        </nav>
    )
}