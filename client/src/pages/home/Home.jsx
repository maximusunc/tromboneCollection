import React from "react";
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from "../../components/container/Container";
import './home.css';
// import trombonePic from '../../images/tromboneBackground.jpeg';
// import tromboneCover from '../../images/trombone_cover.jpg';
import tromboneCover from './B&W Sackbut Cover Photo_4.png';

export default function Home() {
  const history = useHistory();

  return (
    <Container>
      <div id="homePageImageContainer">
        <img src={tromboneCover} alt="trombone" id="homePageImage" />
        <p id="photoCredit">Photo Credit: Katie Rose Hand</p>
      </div>
      <h1>
        Welcome!
      </h1>
      <div style={{ margin: '0% 13%' }}>
        <p>
          Based on information gathered from museums and private collections across the globe, this database is dedicated to the cataloging of trombones made before 1800. From here, visitors can search the archive, see updated material, and suggest new records.
        </p>
        <p>
          Though every effort has been made to provide visitors with current and precise information, the database makes no guarantee concerning accuracy. If you would like to suggest a correction or offer a new record, please use the contact page.
        </p>
      </div>
      <Button
        variant="contained"
        onClick={() => history.push('/instruments')}
        id="viewCollectionButton"
      >
        View the collection!
      </Button>
    </Container>
  );
};
