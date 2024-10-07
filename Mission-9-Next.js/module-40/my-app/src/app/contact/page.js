import React from "react";
import HeaderStyle from "./Contact.module.css";

export const metadata = {
  title: "Contact Us",
  description: "know about us",
};

const ContactPage = () => {
  return (
    <div>
      <h1 className={`${HeaderStyle.header}`}>Contact Page</h1>
    </div>
  );
};

export default ContactPage;
