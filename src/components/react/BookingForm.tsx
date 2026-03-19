import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const TOUR_TYPES = [
  "Day Trip",
  "Multi-Day Package",
  "Car Hire",
  "Guide Only",
] as const;

const DESTINATIONS = ["Agra", "Delhi", "Jaipur"] as const;

const CONTACT_METHODS = ["Email", "Phone", "WhatsApp"] as const;

interface FormData {
  tourType: string;
  destinations: string[];
  travelDate: string;
  travelers: string;
  requirements: string;
  name: string;
  email: string;
  phone: string;
  contactMethod: string;
}

const INITIAL_FORM: FormData = {
  tourType: "",
  destinations: [],
  travelDate: "",
  travelers: "1",
  requirements: "",
  name: "",
  email: "",
  phone: "",
  contactMethod: "Email",
};

const TOTAL_STEPS = 4;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function BookingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const toggleDestination = (dest: string) => {
    setForm((prev) => ({
      ...prev,
      destinations: prev.destinations.includes(dest)
        ? prev.destinations.filter((d) => d !== dest)
        : [...prev.destinations, dest],
    }));
    setErrors((prev) => ({ ...prev, destinations: undefined }));
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!form.tourType) newErrors.tourType = "Please select a tour type";
      if (form.destinations.length === 0)
        newErrors.destinations = "Please select at least one destination";
    }

    if (step === 2) {
      if (!form.travelDate) newErrors.travelDate = "Please select a travel date";
      if (!form.travelers || Number(form.travelers) < 1)
        newErrors.travelers = "Please enter number of travelers";
    }

    if (step === 3) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!isValidEmail(form.email))
        newErrors.email = "Please enter a valid email address";
      if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    console.log("Booking form submitted:", form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-800 dark:bg-green-900/20"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-8 w-8 text-green-600 dark:text-green-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-300">
          Inquiry Submitted!
        </h3>
        <p className="text-green-700 dark:text-green-400">
          Thank you for your interest. We will get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress indicator */}
      <div className="mb-8 flex items-center justify-between">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => {
          const stepNum = i + 1;
          const isActive = stepNum === step;
          const isComplete = stepNum < step;

          return (
            <div key={stepNum} className="flex flex-1 items-center">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isActive
                    ? "bg-amber-600 text-white"
                    : isComplete
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400"
                      : "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-500"
                }`}
              >
                {isComplete ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              {stepNum < TOTAL_STEPS && (
                <div
                  className={`mx-2 h-0.5 flex-1 rounded transition-colors ${
                    isComplete
                      ? "bg-amber-400"
                      : "bg-stone-200 dark:bg-stone-700"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Form steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                Choose Your Experience
              </h3>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Tour Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {TOUR_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField("tourType", type)}
                      className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                        form.tourType === type
                          ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          : "border-stone-200 text-stone-600 hover:border-stone-300 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                {errors.tourType && (
                  <p className="mt-1 text-sm text-red-600">{errors.tourType}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Destinations *
                </label>
                <div className="flex gap-3">
                  {DESTINATIONS.map((dest) => (
                    <label
                      key={dest}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border-2 px-4 py-3 text-sm font-medium transition-colors ${
                        form.destinations.includes(dest)
                          ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          : "border-stone-200 text-stone-600 hover:border-stone-300 dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={form.destinations.includes(dest)}
                        onChange={() => toggleDestination(dest)}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          form.destinations.includes(dest)
                            ? "border-amber-500 bg-amber-500"
                            : "border-stone-300 dark:border-stone-600"
                        }`}
                      >
                        {form.destinations.includes(dest) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-3 w-3 text-white"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </span>
                      {dest}
                    </label>
                  ))}
                </div>
                {errors.destinations && (
                  <p className="mt-1 text-sm text-red-600">{errors.destinations}</p>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                Trip Details
              </h3>

              <div>
                <label
                  htmlFor="travelDate"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Travel Date *
                </label>
                <input
                  id="travelDate"
                  type="date"
                  value={form.travelDate}
                  onChange={(e) => updateField("travelDate", e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
                />
                {errors.travelDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.travelDate}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="travelers"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Number of Travelers *
                </label>
                <input
                  id="travelers"
                  type="number"
                  min="1"
                  max="50"
                  value={form.travelers}
                  onChange={(e) => updateField("travelers", e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
                />
                {errors.travelers && (
                  <p className="mt-1 text-sm text-red-600">{errors.travelers}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="requirements"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Special Requirements
                </label>
                <textarea
                  id="requirements"
                  rows={3}
                  value={form.requirements}
                  onChange={(e) => updateField("requirements", e.target.value)}
                  placeholder="Dietary needs, mobility assistance, special interests..."
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white dark:placeholder:text-stone-500"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                Your Contact Information
              </h3>

              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
                >
                  Phone / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none placeholder:text-stone-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 dark:border-stone-600 dark:bg-stone-800 dark:text-white dark:placeholder:text-stone-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
                  Preferred Contact Method
                </label>
                <div className="flex gap-3">
                  {CONTACT_METHODS.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateField("contactMethod", method)}
                      className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors ${
                        form.contactMethod === method
                          ? "border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                          : "border-stone-200 text-stone-600 hover:border-stone-300 dark:border-stone-700 dark:text-stone-400"
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
                Review Your Inquiry
              </h3>

              <div className="divide-y divide-stone-200 rounded-lg border border-stone-200 dark:divide-stone-700 dark:border-stone-700">
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Tour Type
                  </p>
                  <p className="mt-1 text-stone-900 dark:text-white">
                    {form.tourType}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Destinations
                  </p>
                  <p className="mt-1 text-stone-900 dark:text-white">
                    {form.destinations.join(", ")}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Travel Date
                  </p>
                  <p className="mt-1 text-stone-900 dark:text-white">
                    {form.travelDate}
                  </p>
                </div>
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Travelers
                  </p>
                  <p className="mt-1 text-stone-900 dark:text-white">
                    {form.travelers}
                  </p>
                </div>
                {form.requirements && (
                  <div className="px-5 py-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                      Special Requirements
                    </p>
                    <p className="mt-1 text-stone-900 dark:text-white">
                      {form.requirements}
                    </p>
                  </div>
                )}
                <div className="px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500 dark:text-stone-400">
                    Contact
                  </p>
                  <p className="mt-1 text-stone-900 dark:text-white">
                    {form.name}
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {form.email} &middot; {form.phone}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Preferred: {form.contactMethod}
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="rounded-lg border border-stone-300 px-5 py-2.5 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 dark:border-stone-600 dark:text-stone-300 dark:hover:bg-stone-800"
          >
            Back
          </button>
        ) : (
          <div />
        )}

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={nextStep}
            className="rounded-lg bg-amber-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-amber-600 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700"
          >
            Submit Inquiry
          </button>
        )}
      </div>
    </div>
  );
}
