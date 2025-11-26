import React from "react";

export default function About() {
  return (
    <div className="w-full bg-[#f7f3ef] text-[#462F26]">
      {/* ---------- HEADER SECTION ---------- */}
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1
          className="text-5xl font-bold mb-6"
          style={{ fontFamily: "Times New Roman, serif" }}
        >
          About{" "}
          <span className="italic" style={{ fontFamily: "Monotype Corsiva" }}>
            AI Trip Planner
          </span>
        </h1>

        <p className="text-xl leading-relaxed text-[#5c463e] max-w-3xl mx-auto">
          AI Trip Planner is built to redefine the way you explore the world. We
          transform your travel dreams into smart, personalized, beautifully
          crafted itineraries — powered by advanced AI and real-time data.
        </p>
      </div>

      {/* ---------- OUR MISSION ---------- */}
      <div className="bg-white py-16 shadow-inner">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg text-[#5c463e] leading-relaxed">
            Planning a trip shouldn’t feel overwhelming — searching countless
            blogs, checking weather, calculating travel time, or guessing the
            best places to visit. Our mission is simple:
            <br />
            <span className="font-bold">
              Make travel planning effortless, intelligent, and enjoyable.
            </span>
          </p>
        </div>
      </div>

      {/* ---------- WHAT WE OFFER ---------- */}
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-semibold text-center mb-12">
            What Makes Us Different?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                🧠 AI-Powered Trip Generation
              </h3>
              <p className="text-[#5c463e]">
                Simply enter your destination, number of people, trip style
                (family, friends, solo), and duration. Our AI instantly creates
                a complete travel plan tailored to your preferences.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                📍 Famous Places & Scenic Spots
              </h3>
              <p className="text-[#5c463e]">
                Discover top attractions, hidden gems, and must-visit scenic
                points based on real-time popularity and reviews.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                🌤️ Live Weather Updates
              </h3>
              <p className="text-[#5c463e]">
                Your itinerary adapts to weather conditions so you always enjoy
                the best experience.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                🔍 Smart Search with Google APIs
              </h3>
              <p className="text-[#5c463e]">
                Search any location with Google Places — get ratings, photos,
                travel routes, distances, and timing with unmatched accuracy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                🏨 Hotel & Food Recommendations
              </h3>
              <p className="text-[#5c463e]">
                Automatically find hotels and restaurants matched to your budget
                and travel style.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold mb-3">
                📘 Saved Trips & Travel Log
              </h3>
              <p className="text-[#5c463e]">
                Save your trips, revisit past journeys, track memories, and
                continue planning anytime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- OUR STORY ---------- */}
      <div className="bg-[#efe9e3] py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold mb-6">Our Story</h2>
          <p className="text-lg text-[#5c463e] leading-relaxed">
            AI Trip Planner started with a simple thought —
            <span className="italic">
              “Why does planning a trip take hours when AI can do it in
              seconds?”
            </span>
            <br />
            <br />
            Today, we combine cutting-edge AI models, Google’s mapping
            ecosystem, and travel insights to give users a smarter, faster, and
            more enjoyable way to plan their adventures.
          </p>
        </div>
      </div>

      {/* ---------- FINAL CTA ---------- */}
      <div className="py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Plan Your Next Journey?
        </h2>
        <p className="text-lg text-[#5c463e] mb-8">
          Let our AI craft the perfect trip for you — effortlessly.
        </p>

        <a
          href="/"
          className="px-8 py-3 rounded-lg bg-[#462F26] text-white text-lg hover:bg-[#805545] transition"
        >
          Start Planning Now
        </a>
      </div>
    </div>
  );
}
