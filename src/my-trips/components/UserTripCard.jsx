import { useState, useEffect } from 'react';
import { PHOTO_REF_URL } from '@/service/GlobalAPI';
import { GetPlaceDetails } from '@/service/GlobalAPI';
import { Link } from 'react-router-dom';

function UserTripCard({ trip, index }) {

const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);
  
  const GetPlacePhoto=async()=> {

    const data= {
       textQuery: trip?.userSelection?.location?.label,
    }

    const result = await GetPlaceDetails(data).then(resp => {
      console.log(resp.data.places[0].photos[3].name);

      const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
      setPhotoURL(photoURL);
    })

  }

  return (
    <Link to={'/view-trip/' + trip?.id}>
    <div className="hover:scale-105 transition-all hover:shadow-2xl" style={{ width: '100%', overflow: 'hidden', position: 'relative', padding: '12px', borderRadius: '10px'}}>
      {/* Image Container */}
      <div style={{ height: '230px', width: '100%', overflow: 'hidden', borderRadius: '10px' }}>
        <img src={photoURL ? photoURL : '/assets/placeholder.png'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Trip"/>
      </div>

      {/* Details Container */}
      <div style={{ marginTop: '5px'}}>
        <h1 className="font-bold text-xl text-[#4F5A2D] mt-3 mb-1">#{index + 1}</h1>
        <h2 className="font-bold text-lg text-[#271a14]">{trip?.userSelection?.location?.label}</h2>
        <h2 className="text-sm text-[#844d31] mt-1"> {trip?.userSelection?.noOfDays} Day(s) trip with a {trip?.userSelection?.budget} Budget for {trip?.userSelection?.people} </h2>
      </div>
    </div>
  </Link>
  )
}

export default UserTripCard
