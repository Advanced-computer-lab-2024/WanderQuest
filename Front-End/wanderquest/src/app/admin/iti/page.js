'use client';
import ItineraryList from '../../../../components/Itineraries'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const ItineraryguestPages = () => {
    return (
        <div>
            <Navbar />
            <h1>Itinerary Page</h1>
            <ItineraryList role={"Admin"}/>
        </div>
    );
};

export default ItineraryguestPages;