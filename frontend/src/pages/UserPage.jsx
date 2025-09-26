
import { useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

export default function UserPage() {
  const [feedbacks, setFeedbacks] = useState([]); // Add this state

  return (
    <div>
      <FeedbackForm setFeedbacks={setFeedbacks} />  {/* Pass setter to form */}
      <FeedbackList feedbacks={feedbacks} />        {/* Pass feedbacks to list */}
    </div>
  );
}


