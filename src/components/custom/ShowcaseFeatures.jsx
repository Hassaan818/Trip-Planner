import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const features = [
  {
    title: "AI-Powered Trip Planner",
    description: "Generate a personalized travel plan using Gemini AI — optimized for budget, preferences, and time.",
    image: "/assets/background/image31.png",
  },
  {
    title: "Smart Hotel Recommendations",
    description: "Find the best hotels matched to your destination, budget, and style — automatically.",
    image: "/assets/background/image32.png",
  },
  {
    title: "Scenic Routes & Stops",
    description: "Discover beautiful roadside attractions and hidden gems between your destinations.",
    image: "/assets/background/image33.png",
  },
  {
    title: "Travel Logs & Memories",
    description: "Save your journeys, add notes, and revisit your past adventures anytime.",
    image: "/assets/background/image34.png",
  },
];

export default function FeatureShowcase() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="py-20 bg-[#f7f3ef]">
      <h2 className="text-4xl font-semibold text-center text-[#462F26] mb-10">
        ✨ Explore What Our App Can Do
      </h2>
      <div className="max-w-4xl mx-auto px-6">
        <Slider {...settings}>
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <img
                src={f.image}
                alt={f.title}
                className="rounded-2xl shadow-lg w-full md:w-3/4 mx-auto mb-6"
              />
              <h3 className="text-2xl font-bold text-[#462F26] mb-3">{f.title}</h3>
              <p className="text-[#5c463e] text-lg">{f.description}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
