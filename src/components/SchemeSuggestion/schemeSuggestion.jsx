"use client";
import React, { useState } from "react";

export default function Questions() {
  const [schemes, setSchemes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    panId: "",
    aadharId: "",
    age: "",
    address: "",
    gender: "",
    location: "",
    area: "",
    maritalStatus: "",
    occupation: "",
    monthlyIncome: "",
    educationLevel: "",
    financialGoal: "",
    riskAppetite: "",
    duration: "",
    digitalUsage: "",
    ownLandForAgriculture: "",
    taxPayer: "",
    numberOfChildren: "",
    numberOfGirlChildrenUnder10: "",
    creditScore: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formData);
    
    // Simulate API response for demo
    const mockSchemes = [
      "Public Provident Fund (PPF)",
      "National Savings Certificate (NSC)", 
      "Employee Provident Fund (EPF)"
    ];
    setSchemes(mockSchemes);
  };

  const handleDiscard = () => {
    setFormData({
      name: "",
      phoneNumber: "",
      panId: "",
      aadharId: "",
      age: "",
      address: "",
      gender: "",
      location: "",
      area: "",
      maritalStatus: "",
      occupation: "",
      monthlyIncome: "",
      educationLevel: "",
      financialGoal: "",
      riskAppetite: "",
      duration: "",
      digitalUsage: "",
      ownLandForAgriculture: "",
      taxPayer: "",
      numberOfChildren: "",
      numberOfGirlChildrenUnder10: "",
      creditScore: "",
    });
  };

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#72e3ad] focus:ring-2 focus:ring-[#72e3ad]/20 transition-all duration-200 bg-white text-gray-900";
  const labelClasses = "text-sm font-medium text-gray-700 mb-2 block";
  const selectClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#72e3ad] focus:ring-2 focus:ring-[#72e3ad]/20 transition-all duration-200 bg-white text-gray-900 appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-light text-gray-900 mb-3">
            User Details Form
          </h1>
          <div className="w-16 h-0.5 bg-[#72e3ad] mx-auto"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
          <div className="space-y-8">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className={labelClasses}>PAN ID</label>
                  <input
                    type="text"
                    name="panId"
                    value={formData.panId}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter PAN ID"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Aadhar ID</label>
                  <input
                    type="text"
                    name="aadharId"
                    value={formData.aadharId}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter Aadhar ID"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter age"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Gender</label>
                  <div className="flex space-x-6 mt-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={formData.gender === "Male"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#72e3ad] border-gray-300 focus:ring-[#72e3ad]"
                      />
                      <span className="ml-2 text-gray-700">Male</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={formData.gender === "Female"}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#72e3ad] border-gray-300 focus:ring-[#72e3ad]"
                      />
                      <span className="ml-2 text-gray-700">Female</span>
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter full address"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Location Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Location Type</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select location type</option>
                    <option value="Rural">Rural</option>
                    <option value="Urban">Urban</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Area</label>
                  <select
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select area</option>
                    <option value="Erode">Erode</option>
                    <option value="Namakkal">Namakkal</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Professional Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Marital Status</label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select marital status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Occupation</label>
                  <select
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select occupation</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Labour">Labour</option>
                    <option value="Electrician">Electrician</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Salaried Employee High">Salaried Employee High</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Salaried Employee Low">Salaried Employee Low</option>
                    <option value="Self Employed">Self Employed</option>
                    <option value="Government Employee">Government Employee</option>
                    <option value="Retired">Retired</option>
                    <option value="Government Retired">Government Retired</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Monthly Income</label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter monthly income"
                  />
                </div>

                <div>
                  <label className={labelClasses}>Education Level</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select education level</option>
                    <option value="Graduated">Graduated</option>
                    <option value="12th">12th Standard</option>
                    <option value="10th">10th Standard</option>
                    <option value="5th">5th Standard</option>
                    <option value="none">No Formal Education</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Financial Profile
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Financial Goal</label>
                  <select
                    name="financialGoal"
                    value={formData.financialGoal}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select financial goal</option>
                    <option value="Retirement">Retirement</option>
                    <option value="Investment">Investment</option>
                    <option value="Savings">Savings</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Risk Appetite</label>
                  <select
                    name="riskAppetite"
                    value={formData.riskAppetite}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select risk appetite</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Investment Duration</label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select duration</option>
                    <option value="Short">Short Term</option>
                    <option value="Mid">Medium Term</option>
                    <option value="Long">Long Term</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Credit Score</label>
                  <input
                    type="number"
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter credit score"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Additional Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Digital Usage</label>
                  <select
                    name="digitalUsage"
                    value={formData.digitalUsage}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Own Land for Agriculture</label>
                  <select
                    name="ownLandForAgriculture"
                    value={formData.ownLandForAgriculture}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Tax Payer</label>
                  <select
                    name="taxPayer"
                    value={formData.taxPayer}
                    onChange={handleChange}
                    className={selectClasses}
                  >
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className={labelClasses}>Number of Children</label>
                  <input
                    type="number"
                    name="numberOfChildren"
                    value={formData.numberOfChildren}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter number of children"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={labelClasses}>Number of Girl Children Under 10</label>
                  <input
                    type="number"
                    name="numberOfGirlChildrenUnder10"
                    value={formData.numberOfGirlChildrenUnder10}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Enter number of girl children under 10"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 pt-8 border-t border-gray-200 sm:flex-row sm:justify-between sm:gap-0">
              <button
                type="button"
                onClick={handleDiscard}
                className="w-full sm:w-auto px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 font-medium"
              >
                Clear Form
              </button>

              <button
                type="submit"
                onClick={() => {
                  handleSubmit();
                  setIsOpen(true);
                }}
                className="w-full sm:w-auto px-8 py-3 bg-[#72e3ad] text-black rounded-lg hover:bg-[#5dd299] focus:outline-none focus:ring-2 focus:ring-[#72e3ad]/50 transition-all duration-200 font-medium shadow-sm mb-2 sm:mb-0"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 bg-white border-t border-gray-200 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ height: "50%" }}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-medium text-gray-900">Recommended Schemes</h2>
              <p className="text-sm text-gray-600 mt-1">Based on your profile analysis</p>
            </div>
            <button
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors duration-200"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {schemes.length > 0 ? (
              <div className="space-y-3">
                {schemes.map((scheme, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-100 rounded-lg border border-gray-200 hover:border-[#72e3ad] transition-colors duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{scheme}</h3>
                      <p className="text-sm text-gray-600 mt-1">Tailored to your financial profile</p>
                    </div>
                    <button className="ml-4 px-4 py-2 bg-[#72e3ad] text-black rounded-lg hover:bg-[#5dd299] focus:outline-none focus:ring-2 focus:ring-[#72e3ad]/50 transition-all duration-200 font-medium text-sm">
                      Calculate Returns
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p>No schemes available</p>
                  <p className="text-sm">Submit the form to see recommendations</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Backdrop for drawer */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}