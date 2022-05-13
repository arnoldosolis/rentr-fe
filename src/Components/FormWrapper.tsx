import React from "react";

interface FormWrapperProps {
  variant?: "small" | "regular";
}

function FormWrapper({
  children,
  variant,
}: {
  children: any;
  variant: FormWrapperProps;
}) {
  return (
    <div
      style={{
        marginTop: "8px",
        margin: "auto",
        maxWidth: variant === "regular" ? "800px" : "400px",
        width: "100%",
      }}
    >
      {children}
    </div>
  );
}

export default FormWrapper;
