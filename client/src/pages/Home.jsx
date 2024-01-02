import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import SwiperCore from 'swiper';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`);
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-500'>perfect</span> 
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          realEstate.com will help you find your home fast, easy and comfortable.
          <br />
          Our expert support is always available.
        </div>
        <Link 
          to={'/search'}
          className='text-blue-800 font-bold hover:underline text-xs sm:text-sm'
        >
            Let's start now...
        </Link>
      </div>
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && 
          offerListings.map((listing) => (
            <SwiperSlide>
              <div 
                className="h-[500px]" 
                key={listing._id}
                style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}
              ></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div 
        className="max-w-6xl mx-auto p-3
        flex flex-col gap-8 my-10"
      >
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="flex justify-between mb-2 my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent offers
                </h2>
                <Link 
                  to={`/search?offer=true`}
                  className='text-sm text-blue-800 hover:underline '
                >
                  see all{'>'}
                </Link>
              </div>
              <div className="flex flex-wrap gap-4 mx-auto">
                {
                  offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} /> 
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="flex justify-between mb-2 my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent places for rent
                </h2>
                <Link 
                  to={`/search?type=rent`}
                  className='text-sm text-blue-800 hover:underline '
                >
                  see all{'>'}
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} /> 
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="flex justify-between mb-2 my-3">
                <h2 className='text-2xl font-semibold text-slate-600'>
                  Recent places for sale
                </h2>
                <Link 
                  to={`/search?type=sale`}
                  className='text-sm text-blue-800 hover:underline '
                >
                  see all{'>'}
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} /> 
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}
