'use client';
import Products from '../../../../components/Products'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import { motion } from 'framer-motion';
import Foot from '../../../../components/foot';
const museumpage = () => {
    return (
        <div>
            <Navbar />
            <Products role={"Tourist"}/>
            <Foot/>
        </div>
    );
};

export default museumpage;