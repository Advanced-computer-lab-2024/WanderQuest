"use client";
import styles from '../../../Styles/SelectionPage.module.css';
import { useRouter } from 'next/navigation'; // Correct import

const SelectionPage = () => {
    const router = useRouter();

    const handleRedirect = (page) => {
        router.push(page); // Navigate to the selected page
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Choose Profile</h1>
            <div className={styles.buttonGroup}>
                <button
                    className={styles.button}
                    onClick={() => handleRedirect('/profileInfo/seller')}
                >
                    Seller
                </button>
                <button
                    className={styles.button}
                    onClick={() => handleRedirect('/profileInfo/tourist')}
                >
                    Tourist
                </button>
                <button
                    className={styles.button}
                    onClick={() => handleRedirect('/profileInfo/advertiser')}
                >
                    Advertiser
                </button>

                <button
                    className={styles.button}
                    onClick={() => handleRedirect('/profileInfo/tourGuide')}
                >
                    Tour Guide
                </button>
            </div>
        </div>
    );
};

export default SelectionPage;
