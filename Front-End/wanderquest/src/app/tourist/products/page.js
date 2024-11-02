'use client';
import Products from '../../../../components/Products'; // Adjust the import path as needed
import Navbar from '../../../../components/Navbar'; // Assuming you have a Navbar component
import {motion} from 'framer-motion';
const museumpage = () => {
    return (
        <div>
            <Navbar />
            <motion.p
  style={{ border: '0px solid black' ,width:400}}
  animate={{ scale: 2.5,  color: '#ff2994', x: 1450 }}
  transition={{duration:0.5}}
>
  Products Page
</motion.p>

           <Products role={"Tourist"}/>
        </div>
    );
};

export default museumpage;