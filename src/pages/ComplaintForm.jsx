import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5"; // Location icon from react-icons

const ComplaintForm = () => {
  // Initial state for form data
  const initialFormData = {
    complaintTitle: "",
    complaintDescription: "",
    latitude: "",
    longitude: "",
    locality: "",
    city: "",
    state: "",
    department: "",
    image: null,
  };

  // State to hold form field values
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData);

  // Handle change for input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0], // Only allow one file
    });
  };

  // Handle department dropdown change
  const handleDepartmentChange = (e) => {
    setFormData({
      ...formData,
      department: e.target.value,
    });
  };

  // Get current location (latitude and longitude)
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setFormData({
          ...formData,
          latitude: latitude,
          longitude: longitude,
        });

        // Reverse geocoding to get the location details (locality, city, state)
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then((response) => response.json())
          .then((data) => {
            const address = data.address;
            setFormData((prevState) => ({
              ...prevState,
              locality: address.suburb || address.neighbourhood || address.road || 'N/A',
              city: address.city || address.town || address.village || 'N/A',
              state: address.state || 'N/A',
            }));
          })
          .catch((error) => {
            console.error("Error fetching location details:", error);
            alert("Failed to fetch location details.");
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now handle the form submission here (send data to an API or save to a database)
    console.log("Form Submitted", formData);

    // Clear the form by resetting it to the initial state
    setFormData(initialFormData);

    // Provide feedback or any additional logic
    alert("Complaint Submitted Successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex gap-8 justify-center">
      {/* Left Side */}
      <div className="flex flex-col gap-6 w-1/3 px-6">
        {/* How It Works */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">How It Works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Submit your complaint easily.</li>
            <li>We verify your issue quickly.</li>
            <li>Authorities take immediate action.</li>
          </ul>
        </div>

        {/* Why Report Issues */}
        <div className="bg-blue-500 shadow-md rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-semibold mb-4">Why Report Issues</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Improve your surroundings.</li>
            <li>Promote accountability.</li>
            <li>Build a better community.</li>
          </ul>
        </div>
      </div>

      {/* Right Side (Complaint Form) */}
      <div className="flex-1 bg-white shadow-lg rounded-2xl p-8 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Register Your Complaint</h2>

        {/* Complaint Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Complaint Title */}
          <div>
            <label className="text-gray-700 mb-2 block">Complaint Title</label>
            <input
              type="text"
              name="complaintTitle"
              value={formData.complaintTitle}
              onChange={handleInputChange}
              placeholder="Enter Complaint Title"
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-700 mb-2 block">Complaint Description</label>
            <textarea
              name="complaintDescription"
              value={formData.complaintDescription}
              onChange={handleInputChange}
              placeholder="Enter Complaint Description"
              className="border rounded-xl p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            ></textarea>
          </div>

          {/* Location Fields (Group) */}
          <div>
            <label className="text-gray-700 mb-2 block">Location</label>
            <div className="flex justify-between items-center mb-4">
              <button
                type="button"
                onClick={getCurrentLocation}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2 px-4 flex items-center gap-2"
              >
                <IoLocationSharp className="text-lg" />
                Get Current Location
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-gray-700 mb-2 block">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter Latitude"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter Longitude"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">Locality / Area</label>
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleInputChange}
                  placeholder="Enter Locality/Area"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter City"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
              <div>
                <label className="text-gray-700 mb-2 block">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter State"
                  className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  required
                />
              </div>
            </div>
          </div>

          {/* Department Dropdown */}
          <div>
            <label className="text-gray-700 mb-2 block">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleDepartmentChange}
              className="border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            >
              <option value="">Select Department</option>
              <option value="Public Health">Public Health</option>
              <option value="Traffic">Traffic</option>
              <option value="Water Supply">Water Supply</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Electricity">Electricity</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="text-gray-700 mb-2 block">Upload Image (if any)</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              className="border rounded-xl p-3 w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-3 mt-6"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComplaintForm;
