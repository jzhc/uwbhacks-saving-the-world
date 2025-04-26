import InitiativeForm from "../components/InitiativeForm";
import NavBar from "../components/navbar";

import { useFireAuthWithKick } from "../hooks/useFireAuth";

export default function CreateInitiative() {
    const [user, initializing] = useFireAuthWithKick()

    return (
        <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <NavBar />
            <div className="flex pt-12 items-center justify-center">
                <div className="w-full max-w-3xl">
                    <InitiativeForm />
                </div>
            </div>
        </div>
    )
}