import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import ListingItems from '../components/ListingItems';
import 'swiper/css/bundle';

const Home = () => {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])

  useEffect(()=>{
    const fetchOfferListings = async() => {
      try{
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings()
      }catch(error){
        console.log(error)
      }
    }

    const fetchRentListings = async() =>  {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json()
        setRentListings(data)
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSaleListings = async() => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        const data = await res.json()
        setSaleListings(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  },[])
  
  console.log(offerListings)
  console.log(saleListings)

  return (
    <div>
      {/* top side */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span><br/> place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          AirBiniBi is the best place to find your next perfect place to live <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font bold hover:underline'>Let's get started</Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerListings && offerListings.map((listing)=>
          <SwiperSlide key={listing._id}>
            <div className='h-[350px] flex justify-center'>
              <img src={listing.imageUrls[0]} alt="" className=' w-full object-cover'/>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
        
      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex-felx-col my-10 gap-8">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-700 hover:underline'> Show more listings</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listings)=> (
                <ListingItems listing={listings} key={listings._id}/>
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-700 hover:underline'> Show more listings</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listings)=> (
                <ListingItems listing={listings} key={listings._id}/>
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className='text-2xl font-semibold text-slate-700'>Recent offers</h2>
              <Link to={'/search?offer=true'} className='text-sm text-blue-700 hover:underline'> Show more listings</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listings)=> (
                <ListingItems listing={listings} key={listings._id}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home