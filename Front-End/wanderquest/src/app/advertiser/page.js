import Activity from "../../../components/activity";
import Navbar from "../../../components/Navbar";

export default function advertiser() {
    return (
        <div>
            <Navbar />
            <div>
                <Activity></Activity>
            </div>
            <h1>Advertiser Page</h1>
            <p>Welcome to the Advertiser page!</p>
        </div>
    );
}