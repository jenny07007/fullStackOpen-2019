import React from "react";

const Notification = ({ type, message }) => {
  if (!message) return;
  return (
    <div className={`${type.slice(0, -1).toLowerCase()} message`}>
      {type} {message}
    </div>
  );
};

export default Notification;
