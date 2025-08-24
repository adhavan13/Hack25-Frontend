import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function PostGrievanceModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    grievance_title: "",
    category: "Infrastructure",
    project_service_name: "",
    location: "",
    long_description: "",
    short_description: "",
    assigned_officer_department: "Public Works Department",
  });
  // Store the file object directly
  const [image, setImage] = useState(null); // File object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

  const categories = [
    "Agriculture and Allied Services",
    "Rural Development",
    "Irrigation and Flood Control",
  ];

  const departments = [
    "Public Works Department",
    "Health Department",
    "Education Department",
    "Water Board",
    "Electricity Board",
    "Transport Department",
    "Environment Department",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Convert image to base64 and store in state
  // Store the file object directly
  const handleImageChange = (e) => {
    console.log("🎯 handleImageChange triggered");
    console.log("📁 e.target:", e.target);
    console.log("📁 e.target.files:", e.target.files);
    console.log("📁 e.target.files.length:", e.target.files?.length);

    const file = e.target.files[0];
    console.log("📁 Selected file:", file);

    if (file) {
      console.log("✅ File details:", {
        name: file.name,
        size: file.size,
        type: file.type,
        constructor: file.constructor.name,
        lastModified: file.lastModified,
      });
      setImage(file);
      console.log("💾 File stored in state");
    } else {
      console.log("❌ No file selected or file is undefined");
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use FormData for multipart/form-data
      const fd = new FormData();
      fd.append("grievance_title", formData.grievance_title);
      fd.append("category", formData.category);
      fd.append("project_service_name", formData.project_service_name);
      fd.append("location", formData.location);
      fd.append("long_description", formData.long_description);
      fd.append("short_description", formData.short_description);
      fd.append(
        "assigned_officer_department",
        formData.assigned_officer_department
      );
      fd.append("grievance_id", `GRV${Date.now()}`);
      fd.append("date_of_submission", new Date().toISOString());
      fd.append("status", "Pending");
      fd.append("upvotes_count", 0);
      if (image) {
        fd.append("supporting_evidence", image); // Changed from "image" to "supporting_evidence"
      }

      await axios.post(
        "https://hack25-backend-x7el.vercel.app/api/grievance/addPost",
        fd,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowSuccessModal(true);
    } catch (err) {
      setShowFailureModal(true);
      // Show backend error if available, else generic message
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to submit grievance. Please try again."
      );
    }
    setLoading(false);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    onSuccess();
    onClose();
    resetForm();
  };

  const handleFailureClose = () => {
    setShowFailureModal(false);
  };

  const resetForm = () => {
    setFormData({
      grievance_title: "",
      category: "Infrastructure",
      project_service_name: "",
      location: "",
      long_description: "",
      short_description: "",
      assigned_officer_department: "Public Works Department",
    });
    setImage(null);
    setError("");
  };

  if (!isOpen) return null;

  // Responsive utility for mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <>
      <AnimatePresence>
        {/* Main Modal */}
        {isOpen && (
          <div
            className={`fixed inset-0 bg-black bg-opacity-10 z-50 flex items-center justify-center p-2 sm:p-4`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`bg-white rounded-3xl shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden ${
                isMobile ? "px-2" : ""
              }`}
            >
              {/* Header */}
              <div
                className={`relative bg-white px-4 sm:px-8 py-6 border-b border-gray-200 ${
                  isMobile ? "px-3" : ""
                }`}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h1 className="text-3xl font-bold text-black mb-2">
                  Submit Grievance
                </h1>
              </div>

              {/* Form Content */}
              <div
                className={`overflow-y-auto max-h-[calc(90vh-180px)] ${
                  isMobile ? "px-2" : ""
                }`}
              >
                <form
                  onSubmit={handleSubmit}
                  className={`p-4 sm:p-8 ${isMobile ? "px-2" : ""}`}
                >
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-start">
                      <svg
                        className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h4 className="font-semibold">Error</h4>
                        <p>{error}</p>
                      </div>
                    </div>
                  )}

                  {/* Basic Information Section */}
                  <div
                    className={`bg-gray-50 rounded-2xl p-4 sm:p-6 mb-8 ${
                      isMobile ? "px-2" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Basic Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Grievance Title{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="grievance_title"
                          value={formData.grievance_title}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter a clear, descriptive title"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          style={{ focusRingColor: "#72e3ad" }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Category <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        >
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleInputChange}
                          required
                          placeholder="Ward, area, or specific address"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Assigned Department
                        </label>
                        <select
                          name="assigned_officer_department"
                          value={formData.assigned_officer_department}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        >
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Description Section */}
                  <div
                    className={`bg-gray-50 rounded-2xl p-4 sm:p-6 mb-8 ${
                      isMobile ? "px-2" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Description & Details
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Short Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="short_description"
                          value={formData.short_description}
                          onChange={handleInputChange}
                          required
                          maxLength={100}
                          placeholder="Brief summary of the issue"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        />
                        <div className="flex justify-between mt-1">
                          <p className="text-xs text-gray-500">
                            Brief summary for quick understanding
                          </p>
                          <p className="text-xs text-gray-500">
                            {formData.short_description.length}/100
                          </p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Detailed Description{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="long_description"
                          value={formData.long_description}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          placeholder="Provide comprehensive details about the issue, its impact, timeline, and any previous attempts to resolve it..."
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all resize-none"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-black mb-2">
                          Project/Service Name
                        </label>
                        <input
                          type="text"
                          name="project_service_name"
                          value={formData.project_service_name}
                          onChange={handleInputChange}
                          placeholder="Related project or service (if applicable)"
                          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all"
                          onFocus={(e) =>
                            (e.target.style.borderColor = "#72e3ad")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "#d1d5db")
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Evidence Section */}
                  <div
                    className={`bg-gray-50 rounded-2xl p-4 sm:p-6 mb-8 ${
                      isMobile ? "px-2" : ""
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-black mb-4">
                      Supporting Evidence
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-4 sm:p-8 text-center bg-white hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                              className="w-8 h-8 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <p className="text-black font-semibold mb-1">
                            Upload Supporting Image
                          </p>
                          <p className="text-sm text-gray-600">
                            PNG, JPG, JPEG up to 10MB
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            Optional but recommended for faster resolution
                          </p>
                        </div>
                      </label>
                    </div>
                    {image && (
                      <div className="mt-4 p-4 bg-white border border-gray-200 rounded-xl flex items-center">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                          <svg
                            className="w-5 h-5 text-black"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-black">{image.name}</p>
                          <p className="text-sm text-gray-500">
                            Ready to upload
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Show preview of selected image */}
                    {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="max-w-xs rounded-xl mt-4"
                      />
                    )}
                  </div>

                  {/* Submit Section */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-8 py-3 text-black font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors order-2 sm:order-1"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-10 py-3 text-black font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl order-1 sm:order-2 flex items-center justify-center"
                      style={{ backgroundColor: "#72e3ad" }}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#5dd490")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#72e3ad")
                      }
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
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
                          Submitting Grievance...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            />
                          </svg>
                          Submit Grievance
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-15 z-[60] flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-8 text-center ${
                isMobile ? "px-2" : ""
              }`}
            >
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#72e3ad" }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Grievance Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your grievance has been successfully submitted. We'll review it
                and get back to you soon.
              </p>
              <button
                onClick={handleSuccessClose}
                className="w-full px-6 py-3 text-black font-semibold rounded-xl transition-all"
                style={{ backgroundColor: "#72e3ad" }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#5dd490")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#72e3ad")
                }
              >
                Continue
              </button>
            </motion.div>
          </div>
        )}

        {/* Failure Modal */}
        {showFailureModal && (
          <div className="fixed inset-0 bg-black bg-opacity-15 z-[60] flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-8 text-center ${
                isMobile ? "px-2" : ""
              }`}
            >
              <div className="w-16 h-16 bg-red-100 mx-auto mb-6 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">
                Submission Failed
              </h3>
              <p className="text-gray-600 mb-6">
                We couldn't submit your grievance. Please check your connection
                and try again.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleFailureClose}
                  className="flex-1 px-6 py-3 text-black font-medium bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                  Try Again
                </button>
                <button
                  onClick={() => {
                    setShowFailureModal(false);
                    onClose();
                  }}
                  className="flex-1 px-6 py-3 text-black font-semibold rounded-xl transition-all"
                  style={{ backgroundColor: "#72e3ad" }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#5dd490")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#72e3ad")
                  }
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}