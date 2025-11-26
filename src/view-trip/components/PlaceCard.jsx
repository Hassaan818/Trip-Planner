import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalAPI';

function PlaceCard({ place }) {
  const [photoURL, setPhotoURL] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = { textQuery: place.placeName };
      const resp = await GetPlaceDetails(data);
      const photoRef = resp?.data?.places?.[0]?.photos?.[3]?.name;
      if (photoRef) {
        const url = PHOTO_REF_URL.replace('{NAME}', photoRef);
        setPhotoURL(url);
      }
    } catch (err) {
      console.error("Error fetching photo:", err);
    }
  };

  return (
    <div
      className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer"
      style={{ width: '100%', minHeight: '200px' }}
    >
      {/* Image container with hover weather overlay */}
      <div className="relative w-[150px] h-[150px] flex-shrink-0">
        <img
          src={photoURL ? photoURL : '/assets/placeholder.png'}
          className="rounded-xl w-full h-full object-cover"
          alt={place.placeName}
        />

        {/* Weather overlay on hover */}
        {place.weather && (
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white rounded-xl p-2 text-center">
            <p className="text-sm font-semibold">🌤 {place.weather.conditions}</p>
            <p className="text-xs mt-1">{place.weather.temperature}</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="flex flex-col justify-between">
        <div>
          <h2 className="font-bold text-lg text-[#271a14]">{place.placeName}</h2>
          <p className="text-sm text-[#844d31]">{place.placeDetails}</p>
          <h2 className="text-md mt-2 text-[#844d31]">⌛ {place.timeToExplore}</h2>
          <h2 className="text-md mt-2 text-[#844d31]">🎫 {place.ticketPricing}</h2>
        </div>

        <Link
          to={'https://www.google.com/maps/search/?api=1&query=' + place.placeName}
        >
          <Button className="font-normal text-md p-0">↗️ Get Directions</Button>
        </Link>
      </div>
    </div>
  );
}

export default PlaceCard;
