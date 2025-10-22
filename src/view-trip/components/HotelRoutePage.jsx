import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
  TrafficLayer,
  Marker,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px",
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: true,
  mapTypeControl: true,
  fullscreenControl: true,
  gestureHandling: "greedy",
};

const routeColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

function HotelRoutePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const hotel = state?.hotel;

  const mapRef = useRef(null);
  const lastRecalcRef = useRef(0);
  const spokenStepsRef = useRef(new Set());
  const prevLocationRef = useRef(null);

  const [origin, setOrigin] = useState(null);
  const [heading, setHeading] = useState(null);
  const [directionsResult, setDirectionsResult] = useState(null);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [steps, setSteps] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(null);
  const [isNavigating, setIsNavigating] = useState(true);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places", "geometry"],
  });

  const getDestination = () => {
    if (!hotel?.geoCoordinates) return null;
    const [lat, lng] = hotel.geoCoordinates
      .split(",")
      .map((v) => parseFloat(v.trim()));
    return { lat, lng };
  };

  const speakInstruction = (text) => {
    if (!("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text.replace(/<[^>]+>/g, ""));
    utter.lang = "en-US";
    window.speechSynthesis.speak(utter);
  };

  const calculateHeading = (from, to) => {
    if (!window.google?.maps?.geometry) return 0;
    const fromLatLng = new window.google.maps.LatLng(from.lat, from.lng);
    const toLatLng = new window.google.maps.LatLng(to.lat, to.lng);
    return window.google.maps.geometry.spherical.computeHeading(
      fromLatLng,
      toLatLng
    );
  };

  const getDirections = (userLoc, force = false) => {
    if (!isLoaded) return;
    const destination = getDestination();
    if (!destination) return;

    const now = Date.now();
    if (!force && now - lastRecalcRef.current < 3000) return;
    lastRecalcRef.current = now;

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLoc,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: "bestguess",
        },
      },
      (result, status) => {
        if (status === "OK" && result?.routes?.length) {
          setDirectionsResult(result);
          const routeToUse =
            result.routes[selectedRouteIndex] || result.routes[0];
          const legs = routeToUse?.legs || [];
          const aggregatedSteps = legs.flatMap((leg) => leg.steps || []);
          setSteps(aggregatedSteps);
        } else {
          console.error("Directions request failed:", status);
        }
      }
    );
  };

  useEffect(() => {
    if (!hotel) {
      navigate("/");
      return;
    }
    if (!isLoaded) return;

    let watchId = null;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setOrigin(userLoc);
          setHeading(pos.coords.heading || null);
          prevLocationRef.current = userLoc;
          getDirections(userLoc, true);
          if (mapRef.current) {
            mapRef.current.panTo(userLoc);
            mapRef.current.setZoom(16);
          }
        },
        (error) => console.error("Geolocation error:", error.message),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const userLoc = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          let newHeading = pos.coords.heading;
          if (newHeading === null && prevLocationRef.current) {
            newHeading = calculateHeading(prevLocationRef.current, userLoc);
          }
          prevLocationRef.current = userLoc;

          setOrigin(userLoc);
          setHeading(newHeading || 0);

          if (mapRef.current && isNavigating) {
            mapRef.current.panTo(userLoc);
            try {
              mapRef.current.setTilt(45);
            } catch {}
          }

          getDirections(userLoc);

          if (steps.length > 0) {
            let nearestIdx = null;
            let nearestDist = Infinity;
            steps.forEach((step, idx) => {
              const stepLoc = step.start_location;
              const dist =
                window.google.maps.geometry.spherical.computeDistanceBetween(
                  new window.google.maps.LatLng(userLoc.lat, userLoc.lng),
                  stepLoc
                );
              if (dist < nearestDist) {
                nearestDist = dist;
                nearestIdx = idx;
              }
            });
            if (nearestIdx !== null) {
              setActiveStepIndex(nearestIdx);
              if (!spokenStepsRef.current.has(nearestIdx) && nearestDist < 50) {
                spokenStepsRef.current.add(nearestIdx);
                speakInstruction(steps[nearestIdx].instructions);
              }
            }
          }
        },
        (error) => console.error("Geolocation watch error:", error),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }

    return () => {
      if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    };
  }, [hotel, isLoaded, selectedRouteIndex, isNavigating, steps]);

  useEffect(() => {
    if (!directionsResult) return;
    const route =
      directionsResult.routes[selectedRouteIndex] || directionsResult.routes[0];
    const legs = route?.legs || [];
    const aggregatedSteps = legs.flatMap((leg) => leg.steps || []);
    setSteps(aggregatedSteps);
  }, [selectedRouteIndex, directionsResult]);

  if (!isLoaded || !origin)
    return <div className="p-10">Loading map...</div>;

  const arrowIcon = {
    path: "M0 -2 L1 -1 L1 1 L0 2 L-1 1 L-1 -1 Z",
    fillColor: "#4285F4",
    fillOpacity: 1,
    scale: 8,
    strokeColor: "white",
    strokeWeight: 1,
    rotation: heading || 0,
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50">
      {/* Sidebar */}
      <div className="lg:w-1/4 w-full bg-white p-4 rounded-xl shadow h-fit max-h-[600px] overflow-auto">
        <h2 className="text-lg font-bold mb-4">
          Driving to {hotel?.hotelName || "Destination"}
        </h2>

        <button
          onClick={() => setIsNavigating((s) => !s)}
          className="mb-4 w-full px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isNavigating ? "Stop Navigation" : "Start Navigation"}
        </button>

        <h3 className="font-semibold mb-2">Routes</h3>
        {directionsResult?.routes?.map((route, idx) => (
          <button
            key={idx}
            onClick={() => {
              setSelectedRouteIndex(idx);
              if (origin) getDirections(origin, true);
            }}
            className={`w-full text-left mb-2 p-3 rounded-lg border transition ${
              idx === selectedRouteIndex
                ? "bg-green-600 text-white border-green-700"
                : "bg-gray-50 hover:bg-gray-100 border-gray-300"
            }`}
          >
            <div className="font-semibold">Route {idx + 1}</div>
            <div className="text-sm">
              {route.legs[0].distance.text} • {route.legs[0].duration.text}
            </div>
          </button>
        ))}

        <h3 className="font-semibold mt-4 mb-2">Turn-by-turn</h3>
        <div className="bg-gray-50 p-3 rounded-lg max-h-80 overflow-auto">
          {steps.length === 0 && (
            <div className="text-sm text-gray-500">No steps yet</div>
          )}
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`mb-3 p-2 rounded ${
                idx === activeStepIndex ? "bg-yellow-200" : ""
              }`}
            >
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: step.instructions }}
              />
              <div className="text-xs text-gray-600">
                {step.distance?.text} • {step.duration?.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="lg:w-3/4 w-full rounded-xl overflow-hidden shadow">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={16}
          options={mapOptions}
          onLoad={(map) => (mapRef.current = map)}
          onUnmount={() => (mapRef.current = null)}
        >
          <TrafficLayer />

          {origin && (
            <Marker
              position={origin}
              icon={{
                ...arrowIcon,
                rotation: heading || 0,
              }}
            />
          )}

          {getDestination() && (
            <Marker
              position={getDestination()}
              title={hotel?.hotelName || "Destination"}
            />
          )}

          {directionsResult?.routes?.map((route, idx) => (
            <DirectionsRenderer
              key={idx}
              directions={directionsResult}
              options={{
                routeIndex: idx,
                suppressMarkers: false,
                preserveViewport: true,
                polylineOptions: {
                  strokeColor:
                    idx === selectedRouteIndex
                      ? routeColors[idx % routeColors.length]
                      : `${routeColors[idx % routeColors.length]}80`,
                  strokeOpacity: idx === selectedRouteIndex ? 1 : 0.5,
                  strokeWeight: idx === selectedRouteIndex ? 6 : 4,
                },
              }}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}

export default HotelRoutePage;
