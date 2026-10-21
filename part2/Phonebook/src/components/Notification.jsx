const Notification = ({ message, type }) => {
  if (!message) return null

  return (
    <div className={`notification ${type}`} role="status">
      {message}
    </div>
  )
}

export default Notification
