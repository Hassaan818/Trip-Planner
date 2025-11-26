import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `
      Generate a detailed travel plan starting from: Los Angeles, to destination: Las Vegas, for 3 days for a couple with a cheap budget.

      The plan must be returned **strictly in JSON format** with these three keys:
      - "hotels": (array of hotel objects)
      - "scenicStops": (array of scenic stop objects, even if empty)
      - "itinerary": (array of daily plans)

      If scenic or tourist stops are not applicable, return "scenicStops": [] — do not omit the key.
      
      Each scenic stop object must contain:
      "placeName", "placeDetails", "placeImageUrl", "geoCoordinates", "ticketPricing", and "timeToExplore".

      Do not include any explanation or text outside the JSON.
      `
                }
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: `{
    "hotels": [
        {
            "hotelName": "The D Las Vegas",
            "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",
            "price": "$50-$100 per night",
            "hotelImageUrl": "https://www.theDcasino.com/images/hero/main-hero-02.jpg",
            "geoCoordinates": "36.1695, -115.1438",
            "rating": "3.5 stars",
            "description": "A budget-friendly hotel located in downtown Las Vegas with a retro vibe. It features a casino, a pool, and several dining options."
        },
        {
            "hotelName": "Circus Circus Hotel",
            "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",
            "price": "$30-$80 per night",
            "hotelImageUrl": "https://www.circuscircus.com/images/hero.jpg",
            "geoCoordinates": "36.1372, -115.1628",
            "rating": "3 stars",
            "description": "Affordable lodging with a lively atmosphere. Features a theme park, casino, and multiple restaurants."
        }
    ],
    "scenicStops": [
        {
            "placeName": "Elmer's Bottle Tree Ranch",
            "placeDetails": "A quirky roadside attraction featuring trees made of colorful glass bottles.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/7/72/Bottle_Tree_Ranch_-_California.jpg",
            "geoCoordinates": "34.6658, -117.3405",
            "ticketPricing": "Free",
            "timeToExplore": "30-45 minutes"
        },
        {
            "placeName": "Mojave National Preserve",
            "placeDetails": "A scenic desert area with sand dunes, Joshua trees, and hiking trails — perfect for a nature break on your drive.",
            "placeImageUrl": "https://www.nps.gov/common/uploads/structured_data/3C7B5A3F-1DD8-B71B-0B20E21C3E7C1D5E.jpg",
            "geoCoordinates": "35.012, -115.473",
            "ticketPricing": "$15 per vehicle",
            "timeToExplore": "1-2 hours"
        },
        {
            "placeName": "Seven Magic Mountains",
            "placeDetails": "A colorful art installation of stacked painted boulders located near Las Vegas.",
            "placeImageUrl": "https://sevenmagicmountains.com/wp-content/uploads/2016/05/Seven-Magic-Mountains-Visit.jpg",
            "geoCoordinates": "35.8344, -115.2705",
            "ticketPricing": "Free",
            "timeToExplore": "30-45 minutes"
        }
    ],
    "itinerary": [
        {
            "day": "Day 1",
            "plan": [
                {
                    "time": "9:00 AM - 12:00 PM",
                    "placeName": "Fremont Street Experience",
                    "placeDetails": "A pedestrian-friendly street in downtown Las Vegas with a canopy of lights and street performers. It's a great place to start your trip and get a feel for the city's energy.",
                    "placeImageUrl": "https://www.fremontstreetexperience.com/images/fremont-street-experience.jpg",
                    "geoCoordinates": "36.1695,-115.1438",
                    "ticketPricing": "Free",
                    "timeToExplore": "2-3 hours"
                },
                {
                    "time": "1:00 PM - 3:00 PM",
                    "placeName": "Bellagio Conservatory & Botanical Gardens",
                    "placeDetails": "A stunning indoor garden with seasonal displays.",
                    "placeImageUrl": "https://www.bellagio.com/content/dam/MGM/bellagio/Photos/conservatory/hero.jpg",
                    "geoCoordinates": "36.1126, -115.1766",
                    "ticketPricing": "Free",
                    "timeToExplore": "1-2 hours"
                }
            ]
        },
        {
            "day": "Day 2",
            "plan": [
                {
                    "time": "10:00 AM - 1:00 PM",
                    "placeName": "Red Rock Canyon",
                    "placeDetails": "A scenic desert area with hiking trails and breathtaking views.",
                    "placeImageUrl": "https://www.redrockcanyonlv.org/wp-content/uploads/2021/03/redrock.jpg",
                    "geoCoordinates": "36.1352,-115.4275",
                    "ticketPricing": "$15 per vehicle",
                    "timeToExplore": "2-3 hours (depending on hiking)"
                }
            ]
        },
        {
            "day": "Day 3",
            "plan": [
                {
                    "time": "11:00 AM - 3:00 PM",
                    "placeName": "The Strip",
                    "placeDetails": "A famous stretch of Las Vegas Boulevard lined with hotels, casinos, and attractions.",
                    "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/e/e7/Las_Vegas_Strip.jpg",
                    "geoCoordinates": "36.1147,-115.1728",
                    "ticketPricing": "Free",
                    "timeToExplore": "3-4 hours (or more depending on activities)"
                }
            ]
        }
    ]
}`,
                },
            ],
        },
    ],
});
