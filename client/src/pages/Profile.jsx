import React, {useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {getStorage, uploadBytesResumable, ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import {deleteUserFailure, deleteUserStart, deleteUserSucess, signOutUserFailure, signOutUserStart, signOutUserSucess, updateUserFailure, updateUserStart, updateUserSucess} from '../redux/user/userSlice'

const Profile = () => {
  const {currentUser, loading, error} = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log(currentUser)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(undefined)
  const [fileUploadError, setFileUploadError] = useState (false)
  const [formData, setFormData] = useState({})
  const [successUpdate, setSuccessUpdate] = useState(false)
  const dispatch = useDispatch();
  const [showListingError, setShowListingError] = useState(false)
  const [userListing, setUserListing] = useState([])
  console.log(userListing)
  /* console.log(successUpdate)
  console.log(error) */


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {

    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true)
      }
      ,
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
          setFormData({...formData, avatar:downloadUrl})
        });
      }
    )
  }

  const handleChange =(e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      console.log(data)
      if (data.statusCode !== 200){
        dispatch(updateUserFailure(data.message));
      };
      dispatch(updateUserSucess(data));
      return data;
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      console.log(error)
    } finally {
      if(error === null || undefined) {setSuccessUpdate(true)}
      setSuccessUpdate(false)
    }
  }

  const handleDeleteUser = async() => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch (`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.statusCode !== 200){
        dispatch(deleteUserFailure(data.message));
      }
      dispatch(deleteUserSucess(data))
    } catch (error){
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async() => {
    try{
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.statusCode !== 200){
        dispatch(signOutUserFailure(data.message))
      }
      dispatch(signOutUserSucess(data))
    }catch(error){
      dispatch(signOutUserFailure(error.message))
    }
  }

  const handleShowListings = async() => {
    try{
        setShowListingError(false)
        const res = await fetch(`/api/user/listing/${currentUser._id}`);
        const data = await res.json()
        console.log(data)
        if (data.statusCode !== 200){
          setShowListingError(true);
        }
        setUserListing(data)
        setShowListingError(false)
      }catch(error){
        setShowListingError(true)
    }
  };

  const handleListingDelete = async(listingId) => {
    try{
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE'
      });
      const data  = await res.json();
      if(data.statusCode !== 200){
        console.log(data.message)
      }
      setUserListing((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error){
      console.log(error.message)
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/.*'/>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar ||currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 border-2'/>
        <p className='text-sm self-center'>
          {fileUploadError ? 
            <span className='text-red-500'> Image upload error(must be 2mb or image file)</span> 
            : filePerc > 0 && filePerc < 100 
              ? <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span> 
              : filePerc === 100 
                ? <span className='text-green-700'>Image Uploaded sucessfully!</span> 
                : <span></span>
          }
        </p>

        <input defaultValue={currentUser.username} type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input defaultValue={currentUser.email} type="text" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>

        <button disabled={loading} type='submit' className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...': 'Update'}</button>
        <Link to={'/create-listing'} className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>create listing</Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <p className="text-red-500 mt-10">{error !== null  ? error : ''}</p>
      <p className='text-green-700'>{successUpdate === true ? 'Updated Sucessfully': ''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listing</button>
      <p className='text-red-700 mt-5'>{showListingError?'Error showing listings':''}</p>
      <div className='flex flex-col gap-4 border px-2'>
        <h1 className='text-center text-2xl font-semibold'>Your Listing</h1>
        {userListing && userListing.length>0 &&
          userListing.map((listings)=>
            <div key={listings._id} className="border rounded-lg p-3 flex justify-between items-center gap-4 px-2">
              <Link to={`/listing/${listings._id}`}>
                <img src={listings.imageUrls[0]} alt="listing cover" className='w-16 h-16 object-contain rounded-lg'/>
              </Link>
              <Link to={`/listing/${listings._id}`} className='flex-1 truncate'>
                <p className="text-slate-700 font-semibold flex-1 hover:underline truncate">{listings.name}</p>
              </Link>
              <div className='flex flex-col gap-1 w-20'>
                <button  onClick={()=>handleListingDelete(listings._id)} className='text-white uppercase w-full bg-red-700 rounded-lg'>Delete</button>
                <Link to={`/update-listing/${listings._id}`}>
                  <button className='text-white uppercase w-full bg-green-700 rounded-lg'>Edit</button>
                </Link>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Profile