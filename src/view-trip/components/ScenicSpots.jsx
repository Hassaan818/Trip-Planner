/* eslint-disable react/prop-types */
import PlaceCard from "@/view-trip/components/PlaceCard";

function ScenicStops({ trip }) {
  console.log("scenicStops:", trip);

  return (
    <div>
      <h2 className="text-2xl mt-10 text-[#271a14]" style={{ fontWeight: 500 }}>
        <i>Scenic Stops Along the Route</i>
      </h2>

      <div className="mt-6">
        {trip.tripData?.scenicStops && trip.tripData.scenicStops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5">
            {trip.tripData.scenicStops.map((place, index) => (
              <div className="my-3" key={index}>
                <PlaceCard place={place} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 mt-2">
            No scenic stops found along this route.
          </p>
        )}
      </div>
    </div>
  );
}

export default ScenicStops;
