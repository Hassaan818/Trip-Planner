/* eslint-disable react/prop-types */
import PlaceCard from "@/view-trip/components/PlaceCard";

function Itinerary({ trip }) {
  console.log("itenary:", trip)
  return (
    <div>
      <h2 className="text-2xl mt-10 text-[#271a14]" style={{ fontWeight: 500 }}>
        <i>Daily Itinerary</i>
      </h2>

      <div className="mt-6">
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="mt-3" key={index}>
            <h2
              className="font-medium text-xl text-[#271a14] mt-8"
              style={{ fontWeight: 600 }}
            >
              {item.day}
            </h2>

            {/* 🌤 Show weather if available */}
            {/* {item.weatherData && (
              <h5 className="text-sm text-gray-700 mb-2 mt-2">
                <span className="font-medium">Weather:</span>{" "}
                <strong>{item.weatherData.conditions}, {item.weatherData.temperature}</strong>
              </h5>
            )} */}

            <div className="grid md:grid-cols-2 gap-5">
              {item.plan.map((place, index) => (
                <div className="my-3" key={index}>
                  <h2
                    className="font-medium text-sm text-[#4F5A2D]"
                    style={{ fontWeight: 600 }}
                  >
                    {place.time}
                  </h2>
                  <PlaceCard place={{ ...place, weather: item.weatherData }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
