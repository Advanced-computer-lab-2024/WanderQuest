'use client';
import Products from '../../../../components/Products'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component

const museumpage = () => {
    return (
        <div>
            <Navbar />
            <h1>Products Page</h1>
           <Products role={"Tourist"}/>
        </div>
    );
};

export default museumpage;