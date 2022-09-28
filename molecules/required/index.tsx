import React from "react";

export const Required = ({ value = "", message = "❌ Required" }) => {
  if (value.length > 0) return <></>;

  return (
    <p
      style={{
        margin: "5px 0 0 0",
      }}
    >
      {message}
    </p>
  );
};
