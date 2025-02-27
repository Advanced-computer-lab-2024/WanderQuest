"use client";

import React, { useEffect, useState } from 'react';
import styles from '/styles/museum.css';
import Navbar from '../../../../components/Navbar';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Museums = (Props) => {
    const [Tags,setTags]=useState([]);
    const [museums, setMuseums] = useState([]);
    const [filteredtags, setFilteredtags] = useState([]);
    const [filteredmuseums, setFilteredmuseums] = useState([]);
    const [search, setSearch] = useState('');
    const role='Tourist';
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    // http://localhost:4000/admin/tags

    const handlefilter = (tag) => {
        if (filteredtags.includes(tag)) {
            const temp = filteredtags.filter(t => t !== tag);
            setFilteredtags(temp);
        } else {
            setFilteredtags([...filteredtags, tag]);
        }
    };
    useEffect(() => {
        fetch('http://localhost:4000/tourismGovernor/tags')
            .then(res => res.json())
            .then(data => {
                setTags(data);
                console.log(data);
                  // Set both state values at the start
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                
            });
    }, []);
    const filtertags = () => {
        if (filteredtags.length > 0) {
            const tempmu = museums.filter(museum => 
                museum.tags && museum.tags.some(t => filteredtags.includes(t.type))
            );
            
            setFilteredmuseums(tempmu);
        } else {
            setFilteredmuseums([...museums]);
        }
    };

    useEffect(() => {
        filtertags();
    }, [filteredtags, museums]);

    useEffect(() => {
        fetch('http://localhost:4000/tourist/upcomingPlaces')
            .then(res => res.json())
            .then(data => {
                setMuseums(data);
                setFilteredmuseums(data);
                setLoading(false);  // Set both state values at the start
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMuseums([]);
                setLoading(false);
            });
    }, []);
    const handlesearch = () => {
        const newprod = museums.filter((prod) => {
            return search.toLowerCase() === '' || 
                   prod.title.toLowerCase().includes(search.toLowerCase()) ||  // Uncommented title search
                   (prod.tags && prod.tags.some(tag => 
                       tag.type.toLowerCase().includes(search.toLowerCase())  // Changed === to includes() for partial matches
                   ));
        });
        setFilteredmuseums(newprod);
    };

    const view=(id)=>{
        router.push(`http://localhost:3000/tourist/musuem/${id}`);
    }
    const images ={'Eiffel Tower':'/eiflle.jpg',
        'Pyramids of Giza':'/pyramids.jpg',
        'Taj Mahal ':'/m.jpg',
        'Sydney Opera House ':'/sydney.jpg',
        'The Great Egyptian Museum ':'/egy.jpg'
        
        };

useEffect(() => {
   handlesearch();
  }, [search]);

    const clearsearch=()=>{
        setFilteredmuseums(museums);
    }
    const ClearFilters=()=>{
        setFilteredmuseums(museums);
    }
    if (loading) {return<>
        <script src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></script> 
        <dotlottie-player style={{
      width: '300px',
      height: '300px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }}
      src="https://lottie.host/8558e83b-4d60-43da-b678-870ab799685b/uAzMRqjTlu.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
        </>}
  return (<div style={{marginTop: '80px'}} >
    <Navbar />
    <div className="welcome-container" style={{
      position: 'absolute',
      top: '45%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1,
      textAlign: 'center',
      color: 'white',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      width: '100%'
    }}>
      <h1 style={{
        fontSize: '4rem',
        marginBottom: '1rem',
        width: '80%',
        margin: '0 auto'
      }}>Welcome to Historical Places</h1>
      <p style={{
        fontSize: '1.8rem'
      }}>Explore magnificent historical landmarks and cultural treasures from around the globe, where every site tells a unique story of our past.</p>
    </div>
    <img src="/meusuem.jpg" className='musuem-image' />
    {role === "Tourist" && (
                    <div className='search-container'>
                        <input
                            className='search-input'
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder='Search museums...'
                        />
                    </div>
                )}
    
    <div className='page-container'>
        <div className='sidebar'>
            <div className='sidebar-content'>
                <h1>Filters</h1>
                <div className='tags-container'>
                    <h4>Tags</h4>
                    {Tags.map((tag, index) => (
                        <div key={index} className='tag-item'>
                            <input
                                type="checkbox"
                                id={`tag-${index}`}
                                onClick={() => handlefilter(tag.type)}
                            />
                            <label htmlFor={`tag-${index}`}>{tag.type}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>  
 
        <div className='museums-grid'>
            {Array.isArray(filteredmuseums) && filteredmuseums.length > 0 ? (
                filteredmuseums.map((museum) => (
                    <div className='museum-card' key={museum.id}>
                        <img src={images[museum.title]}  alt={museum.title} className='musuem-image1' />
                        <div style={{padding: '1rem'}}>
                        <h2 className='museum-name'>{museum.title}</h2>
                        <p className='museum-description'>{museum.description}</p>
                        <p className='museum-location'>{museum.location}</p>
                        <div className='museum-footer' onClick={()=>view(museum._id)}>
                            <button className='view-button'>
                                view
                            </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No museums found</p>
            )}
        </div>
    </div>
</div>);

}

export default Museums;
