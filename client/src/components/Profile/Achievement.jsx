import React from "react";
import image from "../blank-profile.png"

const HoverImage = () => {
  return (
    <div className="achievement">
      <img src={image} alt="Achievement" />
      <div className="achievement-description">
        Osiągnięcie 1 <br/>
        Opis
      </div>
    </div>
  );
};

export default HoverImage;
