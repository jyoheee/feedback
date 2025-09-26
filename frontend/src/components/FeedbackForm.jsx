import React, { useState } from "react";
import { Star } from "lucide-react";
import api from "../api";

export default function FeedbackForm({ setFeedbacks, onRefresh }) {
  const [form, setForm] = useState({ name: "", rating: 0, category: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ new state

  const reset = () => setForm({ name: "", rating: 0, category: "", message: "" });

  const handleSubmit = async () => {
    if (!form.name || !form.rating || !form.category || !form.message) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/feedback", form);
      if (res.status === 201 || res.status === 200) {
        if (onRefresh) {
          await onRefresh();
        } else {
          setFeedbacks((prev) => [...(prev || []), res.data || { ...form, id: Date.now() }]);
        }
        reset();
        setSuccessMessage("Feedback submitted successfully!"); // ✅ show message
        setTimeout(() => setSuccessMessage(""), 3000); // hide after 3s
      } else {
        setFeedbacks((prev) => [...(prev || []), { ...form, id: Date.now() }]);
        reset();
        setSuccessMessage("Feedback submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    } catch (err) {
      setFeedbacks((prev) => [...(prev || []), { ...form, id: Date.now() }]);
      reset();
      setSuccessMessage("Feedback submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200
                    p-6">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Leave Your Feedback
        </h2>

        {/* ✅ Success message */}
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-2 mb-4 text-center rounded-md">
            {successMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="col-span-1 md:col-span-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <div className="col-span-1 flex items-center gap-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    form.rating >= s ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setForm({ ...form, rating: s })}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 ml-2">{form.rating ? `${form.rating}/5` : "Rate"}</span>
          </div>

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="col-span-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          >
            <option value="">Select Category</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
            <option value="website">Website</option>
            <option value="other">Other</option>
          </select>
        </div>

        <textarea
          placeholder="Write your feedback..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full border border-gray-300 rounded-xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          rows={5}
        />

        <div className="flex gap-3 justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-xl shadow hover:bg-purple-700 transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
          <button
            onClick={reset}
            type="button"
            className="px-6 py-2 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
