import { useState, useEffect } from 'react';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'sonner';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelOptions } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 20 && !formData?.location || !formData?.budget || !formData?.people) {
      toast("Please ensure all questions are answered!");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{people}', formData?.people)
      .replace('{budget}', formData?.budget)
      .replace('{totalDays}', formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`, {
      header: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      OnGenerateTrip();
    });
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    let parsedData;
    try {
      parsedData = JSON.parse(TripData);
    } catch (err) {
      console.error("❌ JSON Parsing Failed:", err);
      console.log("Raw AI response:", TripData);
      toast("Failed to parse AI response. Please try again!");
      setLoading(false);
      return;
    }

    console.log("✅ Parsed AI Trip Data:", parsedData);

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: parsedData,
      userEmail: user?.email,
      id: docId,
    });

    setLoading(false);
    navigate("/view-trip/" + docId);
  };
  const customStyles = {
    placeholder: (provided) => ({
      ...provided,
      color: '#844d31',
      fontWeight: 500
    })
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=1600&q=80')"
      }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl max-w-4xl w-full p-8">
        <h2
          className="font-bold text-blue-600 text-4xl text-center"
          style={{ fontFamily: 'Monotype Corsiva, cursive' }}
        >
          Share Your Travel Preferences 🗺️🏝️
        </h2>
        <p className="mt-3 text-gray-700 text-lg text-center">
          Describe your ideal travel experience, and we’ll design a personalized itinerary that fits your needs!
        </p>

        <div className="mt-10 flex flex-col gap-10">
          <div>
            <h2 className="text-lg font-medium text-gray-800">Preferred Destination</h2>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                place,
                onChange: (v) => { setPlace(v); handleInputChange('location', v) },
                styles: customStyles,
              }}
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800">Number of Days</h2>
            <Input
              placeholder="3"
              type="number"
              onChange={(e) => handleInputChange('noOfDays', e.target.value)}
            />
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800">Budget</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('budget', item.title)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition 
                  ${formData?.budget === item.title ? 'shadow-2xl border-blue-800' : ''}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-800">Traveling With</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange('people', item.people)}
                  className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg transition
                  ${formData?.people === item.people ? 'shadow-2xl border-blue-800' : ''}`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold text-lg text-gray-900">{item.title}</h2>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={OnGenerateTrip}
          >
            {loading ? (
              <AiOutlineLoading3Quarters className="h-6 w-6 animate-spin" />
            ) : (
              "Generate Trip"
            )}
          </Button>
        </div>

        <Dialog open={openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                {/* <img src="/assets/logo.svg" width={150} className="mx-auto" /> */}
                <h2 className="font-bold text-lg mt-5 text-center">
                  Continue with Google Authentication
                </h2>
                <Button
                  onClick={login}
                  className="w-full mt-5 bg-[#6b493c] text-white flex gap-2 items-center justify-center"
                >
                  <FcGoogle className="w-6 h-6" />
                  Sign In With Google
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;
