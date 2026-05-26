
import React, { useState } from "react";
import axios from "axios";

const UserWinner = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // handle file select
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // upload function
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const res = await axios.post(
        "http://localhost:5000/api/upload", // change to your backend URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Upload success:", res.data);
      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E0A] text-white font-sans p-6 md:p-12 flex justify-center items-center">
      <div className="max-w-5xl w-full space-y-8">

        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Claim Your Impact
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">
            Congratulations on your tournament win! Verify your scorecard below to process your reward and charitable donation.
          </p>
        </div>

        {/* Top Status Card */}
        <div className="bg-black border border-[#1C231E] rounded-3xl p-6 md:p-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#4ADE80]">Status</span>
              <h2 className="text-2xl font-semibold mt-1">Verification in Progress</h2>
            </div>
            <div className="md:text-right">
              <span className="text-[11px] text-gray-500 font-medium block">Reward Amount</span>
              <span className="text-3xl font-bold text-[#4ADE80]">$2,500.00</span>
            </div>
          </div>

          {/* Progress Timeline */}
          <div className="relative flex justify-between items-center max-w-3xl mx-auto px-4">
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-[#1C231E]" />
            <div className="absolute top-5 left-0 w-1/2 h-[2px] bg-gradient-to-r from-[#4ADE80] to-[#22C55E]" />

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border-2 border-[#4ADE80] flex items-center justify-center">
                ✔
              </div>
              <span className="text-xs text-[#4ADE80] mt-2">Verification</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400">
                2
              </div>
              <span className="text-xs text-gray-400 mt-2">Approval</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center text-gray-400">
                3
              </div>
              <span className="text-xs text-gray-400 mt-2">Payout</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Upload Section */}
          <div className="lg:col-span-2 bg-black border border-dashed border-[#2A352E] rounded-3xl p-8 flex flex-col items-center justify-center text-center">

            <h3 className="text-xl font-semibold mb-2">Upload Scorecard</h3>
            <p className="text-gray-400 text-sm mb-6">
              Upload PNG, JPG, or PDF file (max 10MB)
            </p>

            {/* File Input */}
            <label className="bg-[#4ADE80] text-black font-bold px-6 py-3 rounded-xl cursor-pointer hover:bg-[#22C55E]">
              Select File
              <input
                type="file"
                className="hidden"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={handleFileChange}
              />
            </label>

            {/* File name preview */}
            {file && (
              <p className="text-xs text-gray-400 mt-3">
                Selected: {file.name}
              </p>
            )}

            {/* Upload button */}
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-4 bg-white text-black px-5 py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Upload Scorecard"}
            </button>
          </div>

          {/* Right info cards */}
          <div className="space-y-4">

            <div className="bg-black border border-[#1C231E] rounded-2xl p-4">
              <h4 className="text-xs font-bold text-gray-300">Authenticity Scan</h4>
              <p className="text-xs text-gray-400 mt-1">
                AI verifies tournament data automatically.
              </p>
            </div>

            <div className="bg-black border border-[#1C231E] rounded-2xl p-4">
              <h4 className="text-xs font-bold text-gray-300">Charity Allocation</h4>
              <p className="text-xs text-gray-400 mt-1">
                Choose donation impact project.
              </p>
            </div>

            <div className="bg-black border border-[#1C231E] rounded-2xl p-4">
              <h4 className="text-xs font-bold text-gray-300">Final Review</h4>
              <p className="text-xs text-gray-400 mt-1">
                Manual review for high-value rewards.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWinner;