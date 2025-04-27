import React, { useState, useRef } from "react";
import {
  AlignLeft,
  MapPin,
  Building,
  Upload,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";

const RegisterComplaint = () => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    locality: "",
    city: "",
    state: "",
    department: "",
    image: null,
  });
//   console.log(formData);

  const [previewImage, setPreviewImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [activeField, setActiveField] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current location
 const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // First, update the lat/long fields immediately
          setFormData({
            ...formData,
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
          
          try {
            // Use reverse geocoding to get address details
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            
            if (response.ok) {
              const addressData = await response.json();
              const address = addressData.address;
              console.log(address);

              
              // Create a descriptive locality field from available address components
              let locality = "";
              if (address.county) locality += address.county;
              if (address.neighbourhood) locality += locality ? `, ${address.neighbourhood}` : address.neighbourhood;
              if (address.suburb) locality += locality ? `, ${address.suburb}` : address.suburb;
              
              // If we couldn't construct a locality from the above, try other fields
              if (!locality) {
                locality = address.locality || 
                          address.neighbourhood || 
                          address.suburb || 
                          address.village || 
                          address.hamlet || 
                          address.quarter || 
                          address.residential || 
                          "Unknown area";
              }
              
              // Update all location fields with the fetched data
              setFormData({
                ...formData,
                latitude: latitude.toString(),
                longitude: longitude.toString(),
                locality: locality,
                city: address.state_district || address.town || address.county || address.village || "",
                state: address.state || address.region || "",
              });
              
              // Success message
              setMessage("Location and address details captured successfully!");
            } else {
              // If geocoding fails, at least we have the coordinates
              setMessage("Location coordinates captured. Address details could not be retrieved.");
            }
          } catch (error) {
            console.error("Error fetching address details:", error);
            setMessage("Location coordinates captured. Address details could not be retrieved.");
          }
          
          setTimeout(() => setMessage(""), 3000);
        },
        (error) => {
          setError(
            "Failed to get your location. Please allow location access."
          );
          setTimeout(() => setError(""), 5000);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setTimeout(() => setError(""), 5000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);
  
    // Validation for required fields
    const requiredFields = [
      "title",
      "description",
      "latitude",
      "longitude",
      "locality",
      "department",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
  
    if (missingFields.length > 0) {
      setError(
        `Please provide all required fields: ${missingFields.join(", ")}`
      );
      setIsSubmitting(false);
      return;
    }
  
    try {
      // Prepare form data for multipart upload
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("latitude", formData.latitude);
      form.append("longitude", formData.longitude);
      form.append("locality", formData.locality);
      form.append("city", formData.city);
      form.append("state", formData.state);
      form.append("department", formData.department);
  
      if (formData.image) {
        form.append("image", formData.image);
      }
  
      const response = await Axios({
        ...SummaryApi.complainRegister,
        headers: {
          "Content-Type": "multipart/form-data", // Important for file upload
        },
        data: form,
      });
      console.log(response.data.message)
  
      // Success
      if (response.data.success) {
        toast.success("Complaint registered successfully!");
        setMessage(response.data.message);
  
        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          latitude: "",
          longitude: "",
          locality: "",
          city: "",
          state: "",
          department: "",
          image: null,
        });
        setPreviewImage(null);
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
  
      setIsSubmitting(false);
    } catch (error) {
        console.log(error)
      AxiosToastError(error);
      setIsSubmitting(false);
    }
  };

  const departments = [
    "Water Supply Department",
    "Sanitation & Waste Management Department",
    "Sewerage & Drainage Department",
    "Electricity / Street Lighting Department",
    "Roads & Public Works Department (PWD)",
    "Traffic Management Department",
    "Transport Department",
    "Health Department",
    "Fire & Emergency Services",
    "Town Planning / Building Department",
    "Revenue / Tax Department",
    "Encroachment / Enforcement Department",
    "Parks & Horticulture Department",
    "Pollution Control / Environment Department",
    "Animal Control / Veterinary Department",
    "Grievance Redressal / Complaint Cell",
    "Disaster Management Department",
    "Women & Child Safety Department",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-10">
      <div className="container mx-auto px-4">
        {/* Added page title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Citizen Complaint Portal
        </h1>

        {/* Added decorative elements */}
        <div className="relative max-w-6xl mx-auto mb-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-10"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Added info panel on the left */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                How It Works
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Fill in the complaint details with accurate information
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Provide your precise location for faster resolution
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Upload an image of the issue to help us assess better
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3 mt-1">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-gray-700">
                      Submit and track your complaint status online
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Why Report Issues?</h3>
              <p className="mb-3">
                Your complaints help us improve community services and address
                problems quickly.
              </p>
              <div className="bg-white/20 rounded-lg p-4 mt-4">
                <p className="font-medium">Average Resolution Time</p>
                <p className="text-2xl font-bold">48 hours</p>
                <div className="w-full bg-white/30 h-2 rounded-full mt-2 overflow-hidden">
                  <div className="bg-white h-full w-3/4 rounded-full"></div>
                </div>
                <p className="text-sm mt-2">
                  75% of issues resolved within target time
                </p>
              </div>
            </div>
          </div>

          {/* Complaint form - now taking 2/3 of the screen on larger displays */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
              {/* Decorative header */}
              <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-black opacity-10"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>

                  {/* Decorative circles */}
                  <div className="absolute top-6 right-12 w-16 h-16 bg-white rounded-full opacity-10 transform translate-x-2"></div>
                  <div className="absolute top-10 right-20 w-8 h-8 bg-white rounded-full opacity-10"></div>
                </div>

                {/* Complaint icon */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-full shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full p-3">
                    <AlignLeft size={24} className="text-white" />
                  </div>
                </div>
              </div>

              {/* Form container */}
              <div className="px-8 pt-12 pb-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">
                  Register Complaint
                </h2>
                <p className="text-center text-gray-600 mb-8 text-sm">
                  Submit your issue for quick resolution
                </p>

                {message && (
                  <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center animate-fadeIn">
                    <CheckCircle
                      size={18}
                      className="mr-2 text-green-500 flex-shrink-0"
                    />
                    <p className="text-sm">{message}</p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center animate-fadeIn">
                    <AlertCircle
                      size={18}
                      className="mr-2 text-red-500 flex-shrink-0"
                    />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Title */}
                  <div className="mb-5">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300"
                    >
                      Complaint Title*
                      {activeField === "title" && (
                        <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                      )}
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                          activeField === "title"
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      >
                        <AlignLeft
                          size={18}
                          className={
                            activeField === "title" ? "animate-wiggle" : ""
                          }
                        />
                      </div>
                      <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Brief title of your complaint"
                        value={formData.title}
                        onChange={handleChange}
                        onFocus={() => handleFocus("title")}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                          activeField === "title"
                            ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-5">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300"
                    >
                      Description*
                      {activeField === "description" && (
                        <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                      )}
                    </label>
                    <div className="relative">
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        placeholder="Detailed description of the issue"
                        value={formData.description}
                        onChange={handleChange}
                        onFocus={() => handleFocus("description")}
                        onBlur={handleBlur}
                        className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                          activeField === "description"
                            ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        required
                      ></textarea>
                    </div>
                  </div>

                  {/* Location Fields */}
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700 transition-all duration-300">
                        Location*
                      </label>
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center transition-colors duration-300"
                      >
                        <MapPin size={14} className="mr-1" />
                        Get Current Location
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div className="relative">
                        <input
                          type="text"
                          name="latitude"
                          placeholder="Latitude*"
                          value={formData.latitude}
                          onChange={handleChange}
                          onFocus={() => handleFocus("latitude")}
                          onBlur={handleBlur}
                          className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                            activeField === "latitude"
                              ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          required
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="longitude"
                          placeholder="Longitude*"
                          value={formData.longitude}
                          onChange={handleChange}
                          onFocus={() => handleFocus("longitude")}
                          onBlur={handleBlur}
                          className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                            activeField === "longitude"
                              ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <input
                        type="text"
                        name="locality"
                        placeholder="Locality/Area*"
                        value={formData.locality}
                        onChange={handleChange}
                        onFocus={() => handleFocus("locality")}
                        onBlur={handleBlur}
                        className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                          activeField === "locality"
                            ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleChange}
                          onFocus={() => handleFocus("city")}
                          onBlur={handleBlur}
                          className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                            activeField === "city"
                              ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          name="state"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleChange}
                          onFocus={() => handleFocus("state")}
                          onBlur={handleBlur}
                          className={`w-full pl-3 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                            activeField === "state"
                              ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Department */}
                  <div className="mb-5">
                    <label
                      htmlFor="department"
                      className="block text-sm font-medium text-gray-700 mb-1 transition-all duration-300"
                    >
                      Department*
                      {activeField === "department" && (
                        <span className="ml-1 inline-block w-1 h-1 bg-blue-500 rounded-full animate-pulse"></span>
                      )}
                    </label>
                    <div className="relative">
                      <div
                        className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${
                          activeField === "department"
                            ? "text-blue-500"
                            : "text-gray-400"
                        }`}
                      >
                        <Building
                          size={18}
                          className={
                            activeField === "department" ? "animate-wiggle" : ""
                          }
                        />
                      </div>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        onFocus={() => handleFocus("department")}
                        onBlur={handleBlur}
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg transition-all duration-300 ${
                          activeField === "department"
                            ? "border-blue-500 ring-2 ring-blue-200 shadow-sm"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept, index) => (
                          <option key={index} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Image (Optional)
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      className="hidden"
                      accept="image/*"
                    />
                    <div
                      onClick={triggerFileInput}
                      className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-300"
                    >
                      {previewImage ? (
                        <div className="relative w-full">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="mx-auto h-32 object-cover rounded"
                          />
                          <p className="text-xs text-gray-500 mt-2 text-center">
                            Click to change image
                          </p>
                        </div>
                      ) : (
                        <>
                          <Upload size={24} className="text-gray-400 mb-2" />
                          <p className="text-sm text-gray-500">
                            Click to upload an image
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-3 rounded-lg transition-all duration-300 flex items-center justify-center group relative overflow-hidden ${
                      isSubmitting
                        ? "opacity-90"
                        : "hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-102"
                    }`}
                  >
                    <span
                      className={`flex items-center transition-all duration-300 ${
                        isSubmitting ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <span>Submit Complaint</span>
                      <Send
                        size={18}
                        className="ml-2 transform group-hover:translate-x-1 transition-transform"
                      />
                    </span>

                    {isSubmitting && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Added stats section at bottom */}
        <div className="max-w-6xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-10 w-10 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">15,000+</h3>
              <p className="text-gray-600">Issues Resolved</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-10 w-10 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">48 Hours</h3>
              <p className="text-gray-600">Average Response Time</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <div className="text-blue-600 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-10 w-10 mx-auto"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">92%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600 text-sm">
          <p>© 2025 Citizen Complaint Portal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Add these custom animations to your global CSS or style tag
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes wiggle {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-5deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(5deg); }
    100% { transform: rotate(0deg); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-wiggle {
    animation: wiggle 0.4s ease-in-out;
  }
  
  .hover\\:scale-102:hover {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);

export default RegisterComplaint;