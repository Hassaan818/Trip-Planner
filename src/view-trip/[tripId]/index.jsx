import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { toast } from "sonner";
import InfoSection from "@/view-trip/components/InfoSection";
import Hotels from "@/view-trip/components/Hotels";
import Itinerary from "@/view-trip/components/Itinerary";
import Footer from "@/components/custom/Footer";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);


  /**
   * Used to get trip information form the firebase db
   */
  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const tripData = docSnap.data();
      setTrip(tripData);      
    } else {
      toast("No trip found!");
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-44 xl: px-56">
      {/*Information Section/Image*/}

      <InfoSection trip={trip} />

      {/*Recommended Hotels */}

      <Hotels trip={trip} />

      {/*Daily Itinerary */}

      <Itinerary trip={trip} />

      {/*Footer*/}

      <Footer trip={trip} />
    </div>
  );
}

export default ViewTrip;
