import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn} from 'react-icons/md'

const ListingItems = ({listing}) => {
  return (
    <div className=" bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0] === 'https://example.com/images/kekeke'? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk9k7e5_vnxzRMCPSXXDIOKZoz-F1HTHx47g&usqp=CAU' : listing.imageUrls[0] }/>
            <div className="p-3 flex flex-col gap-2">
                <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
                <div className="flex items-center gap-1">
                    <MdLocationOn className='h-4 min-w-4 text-green-700'/>
                    <p className='text-sm text-gray-700 truncate'>{listing.address}</p>
                </div>
                <p className='text-sm text-gray-600 line-clamp-3'>{listing.description}</p>
                <div className="text-slate-700 flex gap-4 items-center">
                    <div className="font-bold text-xs">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds`: `${listing.bedrooms} bed`}
                    </div>
                    <div className="font-bold text-xs">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} bathroom`: `${listing.bathrooms} bathroom`}
                    </div>
                </div>
                <p className="text-slate-500 mt-2 font-semibold">
                    $
                    {listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US') }
                    {listing.type == 'rent' && '/ month' }
                </p>
            </div>
        </Link>
    </div>
  )
}

export default ListingItems