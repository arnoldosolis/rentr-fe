import React from "react";
import { ButtonContainer, PropertyContainer } from "../styles/Property.styles";
import AddProperty from "../Components/AddProperty";

function Property() {
  return (
    <PropertyContainer>
      <ButtonContainer>
        <AddProperty />
      </ButtonContainer>
    </PropertyContainer>
  );
}

export default Property;
