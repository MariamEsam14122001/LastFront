// AccommodationList.jsx
import React from "react";
import Itemdect from "./Itemdectivated";
import styles from "./itemsdectivated.module.css";

const Itemsdect = ({ datasets = [], onDelete }) => {
  return (
    <div className={styles["card-container"]}>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="row  row-cols-2 g-2">
        {datasets.map((dataset) => (
          <div className="col" key={dataset.id}>
            <Itemdect
              id={dataset.id}
              name={dataset.name}
              age={dataset.age}
              email={dataset.email}
              image={dataset.image}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itemsdect;
