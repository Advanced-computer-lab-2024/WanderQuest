'use client';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import styles from '../../../Styles/Tourist.module.css'
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import Wishlist from '../../../components/Wishlist';
import Complaints from '../../../components/Complaints';
import Image from 'next/image';
import Mountains from '../../../imgs/Mountains.jpg';
import { Cookie } from 'next/font/google';
import {motion} from 'framer-motion';

import { useEffect } from 'react';
import Foot from "../../../components/foot";
import Cart from '../../../components/Cart';
import Checkout from '../../../components/Checkout';


const testimonials = [
    {
        image: "/cat1.jpg",
        name: "خالد كشميري",
        role: "Founder Fiko",
        text: "This travel website is very informative and easy to use. I like how they present various destination options and travel packages with clear details. Offering pictures and destination descriptions helps me decide where I want to visit."
    },
    {
        image: "/cat3.jpeg",
        name: "Sarah Johnson",
        role: "Travel Blogger",
        text: "The user experience is exceptional. I've used many travel platforms, but this one stands out for its intuitive design and comprehensive features. The booking process is seamless and transparent."
    },
    {
        image: "/cat2.webp",
        name: "Michael Chen",
        role: "Adventure Enthusiast",
        text: "What sets this platform apart is its attention to detail and the authentic local experiences it offers. The customer service is outstanding, and the travel recommendations are always spot-on."
    }
];




const cookie = Cookie({
  weight: '400',
  subsets: ['latin'],
});

export default function Tourist() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [slideDirection, setSlideDirection] = useState('next');

    const router = useRouter();
    const [isWishlistOpen, setIsWishlistOpen] = useState(false);
    const [isComplaintsOpen, setIsComplaintsOpen] = useState(false);
    const [promoCode, setPromoCode] = useState({ code: '', discount: '', type: '' });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:4000/tourist/codes', {
            method: 'GET',
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setPromoCode(data);
                setIsLoading(false);
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:4000/tourist/birthday', {
            method: 'POST',
            credentials: 'include',
        })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                console.log('Birthday data:', data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);



    const handleRedirect = () => {
        router.push('/tourist/iti');
    };
    const handleRedirectp = () => {
        router.push('/tourist/products');
    };
    const handleRedirectm = () => {
        router.push('/tourist/musuem');
    };
    const handleRedirectac = () => {
        router.push('/tourist/activity');
    };
    const handleRedirectcomp = () => {
        router.push('/tourist/complaint');
    };
    const handleRedirectviewcomp = () => {
        router.push('/tourist/viewComplaint');

    };
    const handleRedirectHist = () => {
        router.push('/tourist/history');
    };
    const handleRedirec = () => {
        router.push('/tourist/mybookings');
    };
    const handleRedirechotel = () => {
        router.push('/tourist/Hotels');
    };
    const handleRedirecflight = () => {
        router.push('/tourist/Flights');
    };
    const handleRedirectransport = () => {
        router.push('/tourist/transportation');
    };
    const handleRedirectProfile = () => {
        router.push('/tourist/profile');
    };

    const handleRedirectWishlist = () => {
        setIsWishlistOpen(true);
    };

    const handleViewComplaints = () => {
        setIsComplaintsOpen(true);
    };
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTestimonial((prev) => 
                prev === testimonials.length - 1 ? 0 : prev + 1
            );
        }, 5000);
    
        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <Navbar  />
            <div className={styles.container}>
                {promoCode.promoCodes && (
                    <div style={{
                        backgroundColor: 'black',
                        color: 'white',
                        overflow: 'hidden',
                        position: 'relative',
                        paddingTop: '5px',
                        width: '100%',
                        height: '30px'
                    }}>
                        {!isLoading  && (
                            <motion.div
                                style={{
                                    whiteSpace: 'nowrap',
                                    gap: '10px',
                                    fontSize: '14px',
                                    width: 'max-content'
                                }}
                                initial={{ x: '-100%' }}
                                animate={{ x: '100vw' }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: 'linear'
                                }}
                            >
                                SPECIAL OFFER: Use code "{promoCode.promoCodes.code}" for {promoCode.promoCodes.discount} {promoCode.promoCodes.type === "PERCENTAGE" ? '%' : 'USD'} OFF on all bookings! <span 
                                    style={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigator.clipboard.writeText(promoCode.promoCodes.code)}
                                >
                                    Click here
                                </span> to copy code! Limited time only! 
                            </motion.div>
                        )}
                    </div>
                )}
                <div className={styles.heroSection}>
                    {(() => {
                        const [currentImage, setCurrentImage] = useState(0);
                        
                        useEffect(() => {
                            const interval = setInterval(() => {
                                setCurrentImage(current => 
                                    current === 3 ? 0 : current + 1
                                );
                            }, 5000);
                            
                            return () => clearInterval(interval);
                        }, []);

                        const images = [
                            {
                                src: '/6.jpg',
                                alt: 'Mountain landscape with starry night sky'
                            },
                            {
                                src: '/norway.webp', 
                                alt: 'Beautiful tropical beach'
                            },
                            {
                                src: '/alps.jpg',
                                alt: 'Ancient Indonesian temple'
                            },
                            {
                                src: '/ice.jpg',
                                alt: 'Traditional Indonesian cultural performance'
                            },
                            {
                                src: '/volcano.jpg',
                                alt: 'Traditional Indonesian cultural performance'
                            },
                            {
                                src: '/ice.jpg',
                                alt: 'Traditional Indonesian cultural performance'
                            }
                        ];

                        return images.map((image, index) => (
                            <Image
                                key={index}
                                className={`${styles.heroImage} ${
                                    currentImage === index ? styles.active : ''
                                }`}
                                src={image.src}
                                alt={image.alt}
                                fill
                                priority
                                style={{
                                    opacity: currentImage === index ? 1 : 0,
                                    transition: 'opacity 1s ease-in-out'
                                }}
                            />
                        ));
                    })()}
                    
                 
                <motion.div intial={{opacity:0, y:-200 , x:200}} animate={{opacity:1, y:90, x:0}} transition={{duration:1.0, delay:0.2}} 
                 style={{ fontFamily: 'Roboto', fontSize: '8.5rem' ,color:'white', marginLeft:'130px',marginRight:'0px'}}>
                    <span className={styles.heroTitle} style={{ fontFamily: 'Roboto' }}>Welcome to WanderQuest!</span>
                    <br />
                    <span className={styles.heroSubtitle} style={{ fontFamily: 'Roboto', fontSize: '3.5rem' }}>where you discover the world and its hidden treasures</span>
                </motion.div>


                </div>
                    <motion.div className={styles.stats} initial={{opacity:0, y:-200}} animate={{opacity:1, y:-50}} transition={{duration:1.0, delay:0.2}}
                    >
                        <div className={styles.stat}>
                        <div className={styles.statNumber}>10M+</div>
                            <p className={styles.statLabel}>Happy Customers</p>
                        </div>
                        <div className={styles.stat}>
                        <div className={styles.statNumber}>11+</div>
                            <p className={styles.statLabel}>Years of Experience</p>
                        </div>
                        <div className={styles.stat} >
                        <div className={styles.statNumber}>10M+</div>
                            <p className={styles.statLabel}>Destinations</p>
                        </div>
                        <div className={styles.stat}>
                        <div className={styles.statNumber}>4.9</div>
                            <p className={styles.statLabel}>Average Rating</p>
                        </div>

                </motion.div>





                <motion.div 
                    className={styles.explore}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 20
                    }}
                >
                    <motion.div 
                        className={styles.sectionHeader}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                            delay: 0.2, 
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <h2>Explore the World</h2>
                        <p>Discover destinations to hidden gems. Whether you're a seasoned</p>
                    </motion.div>
                    
                    <motion.div 
                        className={styles.tourGrid}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                            delay: 0.3,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <motion.div 
                            className={styles.tourCard1}
                            whileHover={{ 
                                scale: 1.03,
                                y: -5,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15
                                }
                            }}
                        >
                            <img src="/volcano.jpg" alt="Bromo, East Java" />
                            <div className={styles.cardContent}>
                                <h3>Bromo, East Java</h3>
                                <p>Bromo Tengger Tour</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className={styles.tourCard1}
                            whileHover={{ 
                                scale: 1.03,
                                y: -5,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15
                                }
                            }}
                        >
                            <img src="/alps.jpg" alt="Denpasar, Bali" />
                            <div className={styles.cardContent}>
                                <h3>Denpasar, Bali</h3>
                                <p>Bali Beach Tourism</p>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div 
                        className={styles.tourGrid2}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                            delay: 0.4,
                            duration: 0.8,
                            type: "spring",
                            stiffness: 100,
                            damping: 20
                        }}
                    >
                        <motion.div 
                            className={styles.tourCard2}
                            whileHover={{ 
                                scale: 1.03,
                                y: -5,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15
                                }
                            }}
                        >
                            <img src="/maldives.jpg" alt="Lampung, South Sumatra" />
                            <div className={styles.cardContent}>
                                <h3>Lampung, South Sumatra</h3>
                                <p>Sumatra Tourism</p>
                            </div>
                        </motion.div>

                        <motion.div 
                            className={styles.tourCard2}
                            whileHover={{ 
                                scale: 1.03,
                                y: -5,
                                transition: {
                                    duration: 0.3,
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15
                                }
                            }}
                        >
                            <img src="/bridge.jpg" alt="Jogjakarta, Central Java" />
                            <div className={styles.cardContent}>
                                <h3>Jogjakarta, Central Java</h3>
                                <p>Borobudur Temple Tour</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

           

<motion.div 
    className={styles.productsSection}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
>
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '0 2rem'
    }}>
        <motion.h2 
            style={{
                margin: 0,
                textAlign: 'left',
                width: '100%'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
        >
            Featured Products
        </motion.h2>
        <motion.button 
            style={{
                background: 'none',
                border: 'none',
                borderBottom: '2px solid #000',
                padding: '0.5rem 0',
                cursor: 'pointer',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
            }}
            onClick={handleRedirectp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
        >
            View all products
        </motion.button>
    </div>
    
    <motion.div 
        className={styles.productsGrid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
    >
        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/batik.jpg" 
                alt="Traditional Batik"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Traditional Batik</h3>
                <p className={styles.price}>$49.99</p>
                <p className={styles.description}>
                    Handcrafted Indonesian Batik made with natural dyes and traditional patterns.
                </p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/wood.jpg" 
                alt="Wooden Sculpture"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Balinese Wood Carving</h3>
                <p className={styles.price}>$129.99</p>
                <p className={styles.description}>
                    Intricately carved wooden sculpture depicting traditional Balinese stories.
                </p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/silver.webp" 
                alt="Silver Jewelry"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Silver Jewelry Set</h3>
                <p className={styles.price}>$89.99</p>
                <p className={styles.description}>
                    Handcrafted silver jewelry featuring traditional Indonesian designs.
                </p>
            </div>
        </motion.div>
    </motion.div>
</motion.div>


<motion.div 
    className={styles.activitiesSection}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
>
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '0 2rem'
    }}>
        <motion.h2 
            style={{
                margin: 0,
                textAlign: 'left',
                width: '100%'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
        >
            Featured Activities
        </motion.h2>
        <motion.button 
            style={{
                background: 'none',
                border: 'none',
                borderBottom: '2px solid #000',
                padding: '0.5rem 0',
                cursor: 'pointer',
                fontSize: '1rem',
                whiteSpace: 'nowrap'
            }}
            onClick={handleRedirectac}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
        >
            View all activities
        </motion.button>
    </div>
    
    <motion.div 
        className={styles.productsGrid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
    >
        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/surfing.jpg" 
                alt="Surfing in Bali"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Surfing in Bali</h3>
                <p className={styles.price}>$75 per person</p>
                <p className={styles.description}>
                    Catch the perfect wave with professional instructors at Bali's most beautiful beaches.
                </p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/hiking.jpg" 
                alt="Mount Bromo Hiking"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Mount Bromo Sunrise Trek</h3>
                <p className={styles.price}>$120 per person</p>
                <p className={styles.description}>
                    Experience breathtaking views with a guided sunrise hike up Mount Bromo.
                </p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.productCard}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/diving.jpg" 
                alt="Scuba Diving"
                width={300}
                height={200}
                className={styles.productImage}
            />
            <div className={styles.productContent}>
                <h3>Raja Ampat Diving</h3>
                <p className={styles.price}>$150 per person</p>
                <p className={styles.description}>
                    Discover the underwater paradise of Raja Ampat with certified diving instructors.
                </p>
            </div>
        </motion.div>
    </motion.div>
</motion.div>











<motion.div 
    className={styles.testimonialSection}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: "easeOut" }}
>
    <motion.h2 
        className={styles.testimonialHeader}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
    >
        What Our Travelers Say
    </motion.h2>
    <motion.div 
        className={styles.testimonialContainer}
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
    >
        {testimonials.map((testimonial, index) => (
            <div
                key={index}
                className={`${styles.testimonial} ${
                    currentTestimonial === index ? styles.active : 
                    index < currentTestimonial ? styles.prev : styles.next
                }`}
            >
                <div className={styles.testimonialProfile}>
                    <Image 
                        src={testimonial.image}
                        alt={`${testimonial.name} profile`}
                        width={80}
                        height={80}
                        className={styles.profileImage}
                    />
                    <div className={styles.profileInfo}>
                        <h3>{testimonial.name}</h3>
                        <p>{testimonial.role}</p>
                    </div>
                </div>
                <p className={styles.testimonialText}>
                    {testimonial.text}
                </p>
            </div>
        ))}
        <div className={styles.testimonialIndicators}>
            {testimonials.map((_, index) => (
                <span
                    key={index}
                    className={`${styles.indicator} ${
                        currentTestimonial === index ? styles.activeIndicator : ''
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                />
            ))}
        </div>
    </motion.div>
</motion.div>




<motion.div 
    className={styles.blogSection}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
>
    <motion.h2 
        className={styles.blogTitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
    >
        Our Blog
    </motion.h2>
    <motion.h1 
        className={styles.blogHeader}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
    >
        Our travel memories
    </motion.h1>
    
    <motion.div 
        className={styles.blogGrid}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
    >
        <motion.div 
            className={styles.blogCard}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/hiking3.jpg" 
                alt="Person standing near forest stream"
                width={600}
                height={400}
                className={styles.blogImage}
            />
            <div className={styles.blogContent}>
                <p className={styles.blogDate}>Nov 14, 2022</p>
                <h3 className={styles.blogCardTitle}>2023 Travel Trends – what you need to know</h3>
                <p className={styles.blogExcerpt}>
                    The 2023 travel trends are a reflection of the world's evolving travel preferences and behaviors. As the global travel landscape continues to recover from the challenges of the past few years, travelers are seeking new experiences and destinations that offer a mix of adventure, relaxation, and cultural immersion.
                </p>
            </div>
        </motion.div>

        <motion.div 
            className={styles.blogCard}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Image 
                src="/jeep.jpg" 
                alt="Jeep driving through muddy forest road"
                width={600}
                height={400}
                className={styles.blogImage}
            />
            <div className={styles.blogContent}>
                <p className={styles.blogDate}>Nov 18, 2022</p>
                <h3 className={styles.blogCardTitle}>Jeep Adventure is a new attraction for tourists visiting Garut</h3>
                <p className={styles.blogExcerpt}>
                    Jeep Adventure is a new attraction for tourists visiting Garut. The sensation is very fun and exciting.
                </p>
            </div>
        </motion.div>
    </motion.div>
    
    {/* <motion.button 
        className={styles.viewMoreButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
    >
        View more
    </motion.button> */}
</motion.div>

          


            </div>

            {/* Updated Wishlist Sliding Panel */}
            <div className={`${styles.wishlistContainer} ${isWishlistOpen ? styles.visible : ''}`}>
                <div className={`${styles.wishlistPanel} ${isWishlistOpen ? styles.open : ''}`}>
                    <button 
                        className={styles.closeButton}
                        onClick={() => setIsWishlistOpen(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>My Wishlist</h2>
                    <Wishlist role='Tourist' />
                </div>
            </div>

            {/* Complaints Sliding Panel */}
            <div className={`${styles.complaintsContainer} ${isComplaintsOpen ? styles.visible : ''}`}>
                <div className={`${styles.complaintsPanel} ${isComplaintsOpen ? styles.open : ''}`}>
                    <button 
                        className={styles.closeButton}
                        onClick={() => setIsComplaintsOpen(false)}
                    >
                        <IoClose />
                    </button>
                    <h2>My Complaints</h2>
                    <Complaints role='Tourist' />
                </div>
            </div>
            
            <Foot />
        </>
    );
};
