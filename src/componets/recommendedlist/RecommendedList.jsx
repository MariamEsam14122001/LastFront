// RecommendedList.js

import React from "react";
import Items from "../item/Items";

function RecommendedList({ recommendations }) {
  return (
    <div>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <h2>Recommended</h2>
      <Items accommodations={recommendations} />
    </div>
  );
}

export default RecommendedList;
