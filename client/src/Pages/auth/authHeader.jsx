import { Link } from "react-router-dom";

export const AuthHeader = () => {
    return (
        <div className="container mx-auto flex bg-gray-100 px-4 md:px-8 py-4">
           <Link to={"/"} className="text-2xl font-bold text-yellow-700">Gramo</Link>
        </div>
    );
}