import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle'


const Listing = () => {
    SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingId = params.listingId
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        console.log(data)
        if (data.sucess === false) {
          setError(true);
          setLoading(false);
        } 
        setListing(data);
        setError(false)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <main className='max-w-full flex justify-center'>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong...</p>}
        {listing && !loading && !error && (
            <div className='max-w-7xl'>
                <Swiper navigation>
                    {listing.imageUrls.map((url)=>
                        <SwiperSlide key={url}>
                            <div className="h-[550px] flex justify-center">
                                <img src={url} alt="url-image" className='h-full w-full' />
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        )}
    </main>
  );
};

export default Listing;
