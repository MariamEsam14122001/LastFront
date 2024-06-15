import React, { useState } from "react";
import Header from "../../componets/header/Header.jsx";
import OwnerHeader from "../../componets/header/OwnerHeader.jsx";
import Footer from "../../componets/footer/Footer.jsx";
import Question from "../../componets/question/Question";
import styles from "../../componets/question/Question.module.css";
import { useSelector } from "react-redux";

const Support = () => {
  const role = useSelector((state) => state.auth.role);

  const questions = [
    {
      question: "What is second home in second ?",
      answer:
        " it is a website that provides Apartment rental service for expariate students and workers when you are in place through one click ,it offers you various Apartments with variousfeatures and services that you are looking for .",
    },
    {
      question: " What are the available payment methods ?",
      answer:
        " so far , we are providing immediate payment and vodafon cash until we gain the trust of the customer and allow direct payment via visa",
    },
    {
      question:
        "Can i cancel the appartment reservation and recover the amount paid after payment ?",
      answer:
        " Yes, the amount paid can be refunded within a week only if the apartment is not received and resided , but if the appartment is received ,it can not be refunded",
    },
    {
      question:
        " What are the features provided by second home from other compiting sites ?",
      answer:
        "the customer can see the whole apartment with VR technology . if the customer wants to book a jion apartment , he can know their residents trough the sites and know the impression of others about them the customer can knoe the apartments that are close to his workplace or university and live with those who accompany him in the same work or university  He can inform us whether he is harassed by his partners or the owner of the apartment in order to deal with the matter and improve",
    },
    {
      question:
        "If I own an apartment , what drives me to rent it with you , and what benefites will I get ?",
      answer:
        "we allow you to display your apartment with vr technology , which makes it displayed to the customers in a clear and good way witout your need to take them to it. Guarntee acheived thruogh safe dealing with us , who bears the responsbility of paying the customer required amount without wasting your right. providing clients from all governorates to reserve your apartment , and get an appropriate percentage Of the rental price from you.",
    },
    // Add more questions here
  ];
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggleExpansion = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {role === "owner" ? <OwnerHeader /> : <Header />}

      <div>
        {questions.map((q, index) => (
          <Question
            key={index}
            question={q.question}
            answer={q.answer}
            expanded={index === expandedIndex}
            onToggleExpansion={() => handleToggleExpansion(index)}
          />
        ))}
      </div>
      <div className={styles["foot"]}>
        <Footer />
      </div>
    </div>
  );
};
export default Support;
