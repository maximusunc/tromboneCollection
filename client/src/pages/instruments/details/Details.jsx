import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../utils/API.js';
import Container from '../../../components/container/Container';
import TromboneDetail from './tromboneDetail/TromboneDetail';

export default function Details() {
    const [tromboneDetails, setTromboneDetails] = useState({});

    useEffect(() => {
        var id = window.location.href.split('/')[4];
        API.getTrombone(id)
            .then(res => setTromboneDetails(res.data))
            .catch(err => console.log(err));
    }, []);


    return (
        <Container>
            {tromboneDetails.maker &&
                <div>
                    <TromboneDetail
                        trombone={tromboneDetails}
                    />
                    
                    <div id="detailsLinks">
                        <Link to="/instruments" className="link" id="backLink">Back</Link>

                        <Link to={'/api/details/' + window.location.href.split('/')[4]} className="link">Printable Version</Link>
                    </div>
                </div>
            }
        </Container>
    );
};
