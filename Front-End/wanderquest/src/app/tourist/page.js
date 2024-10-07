import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function Tourist() {
    return (
        <div>
            <Navbar />
            <Link href="/iti">iti</Link>
            
            <Link href="/museums">museums</Link>
            <Link href="/activities">activities</Link>
            
            <h1>Tourist Page</h1>
            <p>Welcome to the Tourist page!</p>
        </div>
    );
};
