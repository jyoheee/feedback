import React from "react";
import { Star } from "lucide-react";

export default function FeedbackCard({ fb }) {
  const { name, category, rating = 0, message, createdAt } = fb;
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold">{name || "Anonymous"}</p>
          <p className="text-sm text-gray-500">{category || "General"}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            ))}
          </div>
          {createdAt && <span className="text-xs text-gray-400">{new Date(createdAt).toLocaleString()}</span>}
        </div>
      </div>

      <p className="text-gray-700 mt-3 whitespace-pre-wrap">{message}</p>
    </div>
  );
}
