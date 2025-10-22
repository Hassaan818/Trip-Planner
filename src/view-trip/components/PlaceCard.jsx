import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { GetPlaceDetails } from '@/service/GlobalAPI';

import { PHOTO_REF_URL } from '@/service/GlobalAPI';


function PlaceCard({place}) {

  const [photoURL, setPhotoURL] = useState();
  
    useEffect(() => {
      place&&GetPlacePhoto();
    }, [place]);
    
    const GetPlacePhoto=async()=> {
  
      const data= {
         textQuery: place.placeName,
      }
  
      const result = await GetPlaceDetails(data).then(resp => {
        console.log(resp.data.places[0].photos[3].name);
  
        const photoURL = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name);
        setPhotoURL(photoURL);
      })
  
    }

  return (
    <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer"  style={{ width: '100%', minHeight: '200px' }}>

        <img src={photoURL?photoURL: "/assets/placeholder.png"} className='rounded-xl' style={{ width: '150px', height: '150px', objectFit: 'cover' }}/>
         
         <div> 
            <h2 className="font-bold text-lg text-[#271a14]">{place.placeName}</h2>
            <p className="text-sm text-[#844d31]">{place.placeDetails}</p>
            <h2 className="text-md mt-2 text-[#844d31]">⌛  {place.timeToExplore}</h2>
            <h2 className="text-md mt-2 text-[#844d31]">🎫 {place.ticketPricing}</h2>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName} target="_blank">
            <Button className='font-normal text-md p-0'>↗️  Get Directions</Button>
            </Link>

         </div>
    
    </div>  
  )
}

export default PlaceCard 