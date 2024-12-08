'use client';
import adminprod from '../../../../components/adminprod'; // Adjust the import path as needed
import Navbar from '../../../../components/AdminNavBar'; // Assuming you have a Navbar component
import Products from '../../../../components/Products';

const edit = () => {
    return (
        <div>
            <Navbar />
            <h1>Products Page</h1>
           <Products role={"Admin"}></Products>
        </div>
    );
};

export default edit;