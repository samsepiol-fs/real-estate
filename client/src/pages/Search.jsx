import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {

    const navigate = useNavigate();
    const [sideBarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const offerFromUrl = urlParams.get('offer');
        const furnishedFromUrl = urlParams.get('furnished');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            offerFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ) {
            setSideBarData ( {
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                offer: offerFromUrl === 'true' ? true : false,
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            });
        }

        const fetcListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setListings(data);
            setLoading(false);
        }

        fetcListings();
        
    }, [location.search])

    const handleChange = (e) => {
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarData({...sideBarData, type: e.target.id});
        } else if (e.target.id === 'searchTerm') {
            setSideBarData({...sideBarData, searchTerm: e.target.value});
        } else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({
                ...sideBarData, 
                [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false,
            });
        } else if (e.target.id === 'sort_order') {
            
            const sort = e.target.value.split('_')[0];
            const order = e.target.value.split('_')[1];
            setSideBarData({...sideBarData, sort, order});
            console.log(sort, order);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sideBarData.searchTerm);
        urlParams.set('type', sideBarData.type);
        urlParams.set('parking', sideBarData.parking);
        urlParams.set('furnished', sideBarData.furnished);
        urlParams.set('offer', sideBarData.offer);
        urlParams.set('sort', sideBarData.sort);
        urlParams.set('order', sideBarData.order);

        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen md:w-1/3">
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className="flex items-center gap-2">
                    <label className='whitespace-nowrap font-semibold'> Search Term: </label>
                    <input 
                        type="text" 
                        placeholder='Search...'
                        id='searchTerm'
                        className='border rounded-lg p-3 w-full'
                        value={sideBarData.searchTerm}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'> Type: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="all" className='w-5' 
                            onChange={handleChange}
                            checked={sideBarData.type === 'all'}
                        />
                        <span>Rent & Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="rent" className='w-5'
                            onChange={handleChange}
                            checked={sideBarData.type === 'rent'}
                        
                        />
                        <span>Rent</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="sale" className='w-5'
                            onChange={handleChange}
                            checked={sideBarData.type === 'sale'}
                        />
                        <span>Sale</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="offer" className='w-5'
                            onChange={handleChange}
                            checked={sideBarData.offer === true}
                        />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap items-center">
                    <label className='font-semibold'> Amenities: </label>
                    <div className="flex gap-2">
                        <input type="checkbox" id="parking" className='w-5'
                            onChange={handleChange}
                            checked={sideBarData.parking === true}
                        />
                        <span>Parking Spot</span>
                    </div>
                    <div className="flex gap-2">
                        <input type="checkbox" id="furnished" className='w-5'
                            onChange={handleChange}
                            checked={sideBarData.furnished === true}
                        />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <label className='font-semibold'> Sort: </label>
                    <select
                        onChange={handleChange}
                        defaultValue={'created_at_desc'}
                        id="sort_order" 
                        className='border rounded-lg p-3'
                    >
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button 
                    className='bg-slate-700 
                    text-white rounded-lg 
                    uppercase hover:opacity-95 p-3'
                >
                    Search
                </button>
            </form>
        </div>

        <div className="md:w-2/3">
            <h1 
                className='text-3xl font-semibold
                border-b p-3 text-slate-700 mt-5'
            >
                Listing Results: 
            </h1>
            <div className="p-7 flex flex-wrap gap-4">
                {!loading && listings.length === 0 && (
                    <p className='text-slate-700 text-xl text-center w-full'>No listing found!</p>
                )}
                {
                    !loading && listings && listings.map((listing) => (
                        <ListingItem key={listing._id} listing = {listing} />
                    ))
                }
            </div>

        </div>
    </div>
  )
}
