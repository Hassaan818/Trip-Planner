import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalAPI";

import { PHOTO_REF_URL } from "@/service/GlobalAPI";

function HotelCard({ hotel }) {
  const [photoURL, setPhotoURL] = useState();
  const navigate = useNavigate();

  const handleViewRoutes = () => {
    navigate("/routes", { state: { hotel } });
  };

  useEffect(() => {
    hotel && GetPlacePhoto();
  }, [hotel]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotelName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);

      const photoURL = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      setPhotoURL(photoURL);
    });
  };

  return (
    <div
      className="relative hover:scale-105 transition-all cursor-pointer mt-5 hover:shadow-2xl"
      style={{ position: "relative", padding: "10px", borderRadius: "10px" }}
    >
      <img
        src={photoURL ? photoURL : "/assets/placeholder.png"}
        className="rounded-xl h-[220px] w-full object-cover"
      />

      <div className="my-3 flex flex-col gap-2">
        <h2 className="font-medium" style={{ fontWeight: 600 }}>
          {hotel?.hotelName}
        </h2>
        <h2 className="text-xs text-[#844d31]" style={{ fontWeight: 500 }}>
          📍{hotel?.hotelAddress}
        </h2>
        <h2 className="text-sm text-[#844d31]" style={{ fontWeight: 500 }}>
          💰{hotel?.price}
        </h2>
        <h2 className="text-sm text-[#844d31]" style={{ fontWeight: 500 }}>
          ⭐{hotel?.rating}
        </h2>

        <Button
          onClick={handleViewRoutes}
          className="mt-3 bg-[#4caf50] hover:bg-[#388e3c] text-white"
        >
          View Routes
        </Button>
      </div>
    </div>
  );
}

export default HotelCard;
