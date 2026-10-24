import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import API from '../../../utils/API.js';
import Container from '../../../components/container/Container';
import TromboneDetail from './tromboneDetail/TromboneDetail';

export default function Details() {
    const { id } = useParams();
    const [tromboneDetails, setTromboneDetails] = useState({});

    useEffect(() => {
        API.getTrombone(id)
            .then(res => setTromboneDetails(res.data))
            .catch(err => console.log(err));
    }, [id]);


    return (
        <Container>
            {tromboneDetails.maker &&
                <div>
                    <TromboneDetail
                        trombone={tromboneDetails}
                    />
                    
                    <div id="detailsLinks">
                        <Link to="/instruments" className="link" id="backLink">Back</Link>

                        <Link to={'/api/details/' + id} className="link">Printable Version</Link>
                    </div>
                </div>
            }
        </Container>
    );
};
