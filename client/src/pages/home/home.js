import React from "react";
import Container from "../../components/container/container";
import './home.css';

export default function Home() {
  return (
    <Container>
      <div id="homePageImageContainer">
        <img src="../images/tromboneBackground.jpeg" alt="trombone" id="homePageImage" />
      </div>
      <h1>
        Welcome!
      </h1>
      <p>
        Based on information gathered from museums and private collections across the globe, this database is dedicated to the cataloging of trombones made before 1800. From here, visitors can search the archive, see updated material and suggest new records.
      </p>
      <p>
        Though every effort has been made to provide visitors with current and precise information, the database make no guarantee concerning its accuracy. If you would like to suggest a correction or offer a new record, please use the contact page.
      </p>
    </Container>
  );
};
