"use client";

import { useState } from "react";

export default function StepperForm() {
  const steps = [
    {
      id: "name",
      type: "input",
      label: "Hi there, Please share your name?",
      inputType: "text",
      placeholder: "John Doe"
    },
    {
      id: "gender",
      type: "options",
      label: "Select your gender",
      options: ["Male", "Female", "Other"]
    },
    {
      id: "email",
      type: "input",
      label: "What is your email?",
      inputType: "email",
      placeholder: "name@mail.com"
    },
    {
      id: "hobbies",
      type: "options",
      label: "Choose your hobbies",
      options: ["Reading", "Sports", "Music", "Traveling"]
    },
    {
      id: "about",
      type: "textarea",
      label: "Tell us about yourself",
      placeholder: "Short introduction..."
    }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");

  const current = steps[stepIndex];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [current.id]: e.target.value });
    setError("");
  };

  const handleOptionSelect = (value) => {
    setFormData({ ...formData, [current.id]: value });
    setError("");
  };

  const validateStep = () => {
    const value = formData[current.id];
    if (!value || value === "") {
      setError("This field is required.");
      return false;
    }
    return true;
  };

  const next = () => {
    if (!validateStep()) return;
    if (stepIndex < steps.length - 1) setStepIndex(stepIndex + 1);
  };

  const prev = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const submit = () => {
    if (!validateStep()) return;
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
        <p className="text-sm text-gray-600 mb-4">
          Step {stepIndex + 1} of {steps.length}
        </p>

        {/* Slider */}
        <div className="relative overflow-hidden h-60">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${stepIndex * 100}%)` }}
          >
            {steps.map((step) => (
              <div key={step.id} className="w-full flex-shrink-0">
                <h2 className="text-xl font-semibold mb-4 text-gray-500">{step.label}</h2>

                {/* Input Field */}
                {(step.type === "input") && (
                  <input
                    type={step.inputType}
                    value={formData[step.id] || ""}
                    onChange={handleInputChange}
                    placeholder={step.placeholder}
                    className="w-full border rounded-lg p-2 text-black placeholder-gray-400 focus:outline-blue-500"
                  />
                )}

                {/* Textarea */}
                {(step.type === "textarea") && (
                  <textarea
                    rows={4}
                    value={formData[step.id] || ""}
                    onChange={handleInputChange}
                    placeholder={step.placeholder}
                    className="w-full border rounded-lg p-2 text-black placeholder-gray-400 focus:outline-blue-500"
                  />
                )}

                {/* Option Buttons */}
                {(step.type === "options") && (
                  <div className="grid grid-cols-2 gap-3">
                    {step.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(opt)}
                        className={`border rounded-lg py-2 text-gray-500 ${
                          formData[step.id] === opt
                            ? "bg-blue-600 text-white border-blue-600"
                            : "hover:bg-gray-600 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {error && <p className="text-red-600 mt-3 text-sm">{error}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={prev}
            disabled={stepIndex === 0}
            className="px-4 py-2 border rounded-lg disabled:opacity-40"
          >
            Previous
          </button>

          {stepIndex < steps.length - 1 ? (
            <button
              onClick={next}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-4 py-2 rounded-lg bg-green-600 text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
