'use client';
import adminprod from '../../../../components/adminprod'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import Products from '../../../../components/Products';

const museumpages = () => {
    return (
        <div>
            <Navbar />
            <h1>product Page</h1>
           <Products role={"Admin"}></Products>
        </div>
    );
};

export default museumpages;