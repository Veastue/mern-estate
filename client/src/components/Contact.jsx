import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [landlord, setLandLord] = useState(null);
    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setMessage(e.target.value)
    }

    useEffect(()=>{
        const fetchLandLord = async() => {
            try {
                const res =  await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandLord(data)
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchLandLord();
    }, [])

  return (
    <>
        {landlord && (
            <div className='flex flex-col gap-2'>
                <p className='font-semibold'>Contact <span>{landlord.username}</span> for <span className='lowercase'>{listing.name}</span></p>

                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} placeholder='Enter your message here' className='w-full border p-3 rounded-lg'></textarea>
                <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-85'>
                    Send Message
                </Link>
            </div>
        )}
    </>
  )
}

export default Contact