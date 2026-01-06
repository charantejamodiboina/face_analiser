import React from "react"
import Image from "next/image";
import img from "../../public/faceanalyser.webp"
import SmartSelfie from "./SkinanalyserCamera";
const skin_analysis_results = [
  { name: "Acne", rating: 1.0, level: "Low", priority: "LOW", confidence: "High" },
  { name: "Blackheads Whiteheads", rating: 2.0, level: "Low", priority: "LOW", confidence: "High" },
  { name: "Pigmentation", rating: 3.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Redness", rating: 4.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Texture", rating: 5.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Oiliness", rating: 6.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Dryness", rating: 7.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Wrinkles", rating: 10.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Dark Circles", rating: 8.0, level: "Low", priority: "LOW", confidence: "Low" },
  { name: "Uneven Tone", rating: 6.85, level: "Even", priority: "LOW", confidence: "High" },
  { name: "Under Eye Puffiness", rating: 6.47, level: "Moderate", priority: "HIGH", confidence: "High" },
  { name: "Firmness", rating: 9.75, level: "Very Low Firmness", priority: "LOW", confidence: "Medium" }
]
const getBorderColor = (rating) => {
  if (rating <= 4) return "border-green-500 hover:bg-green-100";
  if (rating <= 7) return "border-yellow-500 hover:bg-yellow-100";
  return "border-red-500 hover:bg-red-100";
};
const FaceAnalyser = () => {

  return (


    <div className="flex flex-col lg:flex-row gap-10 w-full">
      {/* Left panel */}
      <div className="w-full lg:w-2/5 bg-gray-200 flex justify-center items-center">
        <SmartSelfie />
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-3/5 bg-white flex flex-col justify-center items-center p-6 lg:p-10">
        <p className="mb-5 lg:m-10 text-xl lg:text-2xl font-bold text-gray-600">
          Live Diagnostic Results
        </p>

        <div className="flex flex-wrap justify-center text-gray-500 border border-gray-300 rounded">
          {skin_analysis_results.map((i) => (
            <div key={i.name} className="flex flex-col items-center m-4 w-24">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${getBorderColor(
                  i.rating
                )}`}
              >
                <p className="text-lg font-bold">{i.rating}</p>
              </div>
              <p className="mt-2 text-center break-words text-sm lg:text-base">
                {i.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default FaceAnalyser