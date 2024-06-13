import React from "react";
import Items from "../item/Items";

function AccommodationsList({ accommodations }) {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Items accommodations={accommodations} />
    </div>
  );
}

export default AccommodationsList;
