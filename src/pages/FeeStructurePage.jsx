
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import courseList from "../data/courseList";

const regions = ["Pakistan", "USD", "AED", "Riyal"];

const FeeStructurePage = () => {
  const [selectedRegion, setSelectedRegion] = useState("Pakistan");
  const [showOneTimeFee] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= PAGE START FROM TOP ================= */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    // fake delay for smooth professional loader
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const getCurrencyDisplay = (_region, fee) => {
    if (!fee) return "-";
    if (fee.includes("PKR")) return `Rs. ${fee.replace("PKR", "").trim()}`;
    if (fee.includes("$")) return `${fee}`;
    if (fee.includes("AED")) return `${fee}`;
    if (fee.toLowerCase().includes("riy")) return `${fee}`;
    return fee;
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="pt-[140px] min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Loading fee structure…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[140px] pb-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-white text-gray-900">
      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center text-purple-800 mb-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Fee Structure
      </motion.h1>

      <motion.p
        className="text-center max-w-3xl mx-auto mb-10 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Choose your region to view the course fee structure. You can also toggle
        to view one-time admission fees.
      </motion.p>

      {/* Region Switch */}
      <div className="flex justify-center gap-3 flex-wrap mb-8">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition shadow-md ${
              selectedRegion === region
                ? "bg-gradient-to-r from-purple-600 to-blue-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-purple-100 border border-purple-200"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Fee Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto">
        <table className="min-w-full rounded-xl overflow-hidden shadow-lg border border-purple-200">
          <thead className="bg-gradient-to-r from-purple-700 to-blue-800 text-white text-left text-sm font-semibold">
            <tr>
              <th className="py-4 px-4">Course</th>
              <th className="py-4 px-4">Duration</th>
              <th className="py-4 px-4">
                Monthly Fee ({selectedRegion})
              </th>
              {showOneTimeFee && (
                <th className="py-4 px-4">One-Time Fee</th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-purple-100 text-sm sm:text-base">
            {courseList.map((course, idx) => {
              if (!course.feeStructure) return null;

              let monthlyFee = "-";

              if (selectedRegion === "Pakistan") {
                monthlyFee = course.feeStructure.find((f) =>
                  f.includes("PKR")
                );
              } else if (selectedRegion === "USD") {
                monthlyFee = course.feeStructure.find((f) =>
                  f.includes("$")
                );
              } else if (selectedRegion === "AED") {
                monthlyFee = course.feeStructure.find((f) =>
                  f.includes("AED")
                );
              } else if (selectedRegion === "Riyal") {
                monthlyFee = course.feeStructure.find((f) =>
                  f.toLowerCase().includes("riy")
                );
              }

              return (
                <tr
                  key={idx}
                  className="hover:bg-purple-50 transition duration-200"
                >
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {course.title}
                  </td>
                  <td className="py-3 px-4">
                    {course.duration || "-"}
                  </td>
                  <td className="py-3 px-4 font-medium text-purple-700">
                    {getCurrencyDisplay(
                      selectedRegion,
                      monthlyFee || "-"
                    )}
                  </td>
                  {showOneTimeFee && (
                    <td className="py-3 px-4 text-gray-700">-</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Payment & Notes */}
      <div className="max-w-3xl mx-auto mt-12 text-gray-700 leading-relaxed">
        <h3 className="text-xl font-bold text-purple-800 mb-3">
          Payment Methods
        </h3>
        <ul className="list-disc list-inside mb-6">
          <li>Bank Transfer</li>
          <li>Easypaisa / JazzCash</li>
        </ul>

        <h3 className="text-xl font-bold text-purple-800 mb-3">
          Important Notes
        </h3>
        <ul className="list-disc list-inside">
          <li>Fees are non-refundable after the first class.</li>
          <li>Contact admin for fee assistance or queries.</li>
        </ul>
      </div>
    </div>
  );
};

export default FeeStructurePage;
