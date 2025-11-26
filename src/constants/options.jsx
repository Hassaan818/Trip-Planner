export const SelectTravelOptions = [
    {
        id: 1,
        title: 'Solo Traveler',
        desc: 'Embark on a journey of self-discovery',
        icon: '🧳',
        people: '1 person',
    },
    {
        id: 2,
        title: 'Travel Duo',
        desc: 'Experience the world side by side',
        icon: '🥂',
        people: '2 people',
    },
    {
        id: 3,
        title: 'Family',
        desc: 'Create cherished memories',
        icon: '🏡',
        people: '3 to 5 people',
    },
    {
        id: 4,
        title: 'Group of Friends',
        desc: 'Enjoy the thrill of adventure',
        icon: '🎉',
        people: '5 to 10 people',
    },
];

export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Economical',
        desc: 'Travel smart, spend less',
        icon: '💸',
    },
    {
        id: 2,
        title: 'Standard',
        desc: 'Balanced comfort and cost',
        icon: '💵',
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Ultimate & limitless luxury',
        icon: '💎',
    },
];



export const AI_PROMPT = `
Generate a detailed travel plan for the following details:
- Location: {location}
- Duration: {totalDays} days
- Travelers: {people}
- Budget: {budget}

The response must be returned **strictly in JSON format** with the following three top-level keys:
1. "hotels" (array of hotel objects)
2. "scenicStops" (array of scenic stop objects — can be empty [])
3. "itinerary" (array of daily plans)

If any of these sections are not applicable, return them as an empty array (e.g., "scenicStops": []).

Each hotel object must include:
"hotelName", "hotelAddress", "price", "hotelImageUrl", "geoCoordinates", "rating", "description".

Each scenic stop object must include:
"placeName", "placeDetails", "placeImageUrl", "geoCoordinates", "ticketPricing", "timeToExplore".

Each day in the itinerary must include:
"day", "plan" (array of activities), and each activity object should include:
"time", "placeName", "placeDetails", "placeImageUrl", "geoCoordinates", "ticketPricing", "timeToExplore", and a "weatherData" field describing the expected weather for that day.

Do not include any text, explanation, markdown, or extra formatting outside the JSON object.
`;