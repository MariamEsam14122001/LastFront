// AccommodationList.jsx
import React from "react";
import Itemacco from "./Itemaccomodation";
import styles from "./itemsaccomodation.module.css";

const Itemsacco = ({ datasets = [], onDelete }) => {
  return (
    <div className={styles["card-container"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="row  row-cols-2 g-2">
        {datasets.map((dataset) => (
          <div className="col" key={dataset.id}>
            <Itemacco
              id={dataset.id}
              description={dataset.description}
              price={dataset.price}
              location={dataset.location}
              image={dataset.image}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemsacco;
