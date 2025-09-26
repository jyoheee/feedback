function FeedbackList({ feedbacks }) {
  return (
    <ul>
      {feedbacks.map(fb => (
        <li key={fb.id}>{fb.text}</li>
      ))}
    </ul>
  );
}

export default FeedbackList;
