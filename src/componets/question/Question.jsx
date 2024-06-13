import React from "react";
import styles from "./Question.module.css"; // Import your CSS module styles

function Question({ question, answer, expanded, onToggleExpansion }) {
  return (
    <div className={styles.questionContainer}>
      <div className={styles.question}>{question}</div>
      {expanded && <div className={styles.answer}>{answer}</div>}
      <button onClick={onToggleExpansion} className={styles.showMoreButton}>
        {expanded ? "" : ""}
      </button>
    </div>
  );
}

export default Question;
