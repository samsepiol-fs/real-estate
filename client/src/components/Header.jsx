import { FaSearch, FaHome, FaQuestion, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

export default function Header() {
    const {currentUser} = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');

        if(searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to={'/'}>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>real</span>
                    <span className='text-slate-700'>Estate.com</span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input 
                    type="text"
                    placeholder='Search..' 
                    className='bg-transparent focus:outline-none w-24 sm:w-64'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button>
                    <FaSearch  className='text-slate-600' />
                </button>
            </form>
            <ul className='flex gap-6 items-center text-slate-500'>
                <Link to='/'>
                    <li className='hidden sm:inline hover:underline' >
                        <div className=' flex flex-col items-center'>
                            <FaHome className='rounded-full h-6 w-6 object-cover'/>
                            <span className='mt-1 text-slate-700 uppercase hover:underline text-xs font-semibold'> home </span>
                        </div>
                    </li>
                </Link>
                <Link to='/about'>
                    <li className='hidden hover:underline' >
                        <div className="flex flex-col items-center">
                            <FaQuestion className='rounded-full h-6 w-6 object-cover'/>
                            <span className='mt-1 text-slate-700 uppercase hover:underline text-xs font-semibold'> about </span>
                        </div>
                    </li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? 
                    (<li>
                        <div className=' flex flex-col items-center'>
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt="profile" />
                            <span className='mt-1 text-slate-700 uppercase hover:underline text-xs font-semibold'> you </span>
                        </div>
                    </li>)
                    :(<li className='hidden sm:inline hover:underline' >
                        <div className="flex flex-col items-center">
                            <FaSignInAlt className='rounded-full h-6 w-6 object-cover'/>
                            <span className='mt-1 text-slate-700 uppercase hover:underline text-xs font-semibold'> Sign In </span>
                        </div>
                    </li>)}
                </Link>
            </ul>
        </div>
    </header>
  )
}
