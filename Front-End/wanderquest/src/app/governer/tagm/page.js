'use client';

import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import TagManager from '../../../../components/TagManager';

const activitypage = () => {
    return (
        <div>
            <Navbar />
            <h1>tagm Page</h1>
            <TagManager></TagManager>
        </div>
    );
};

export default activitypage;