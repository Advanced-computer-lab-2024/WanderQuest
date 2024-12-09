'use client';
import Products from '../../../../components/Products'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import {motion} from 'framer-motion';
const museumpage = () => {
    return (
        <div>
            <Navbar />
            <Products role={"Tourist"}/>
        </div>
    );
};

export default museumpage;