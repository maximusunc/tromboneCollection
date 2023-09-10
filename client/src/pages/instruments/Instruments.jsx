import React, { useContext } from 'react';
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import Trombones from '../../components/trombones/Trombones';
import Loading from '../../components/loading';

import TromboneContext from '../../context/trombones';

export default function Instruments() {
    const trombones = useContext(TromboneContext);

    return (
        <Container>
            <SearchBar />
            <h2>Instruments:</h2>

            {trombones.loaded ? (
                <section className="tromboneList">
                    <ul style={{ padding: 0 }}>
                        {trombones.filtered.map((trombone) => (
                            <Trombones
                                key={trombone._id}
                                id={trombone._id}
                                maker={trombone.maker}
                                date={trombone.date}
                                link={"/details/" + trombone._id}
                            />
                        ))}
                    </ul>
                </section>
            ) : (
                <>
                    {trombones.error ? (
                        <h4>{trombones.error}</h4>
                    ) : (
                        <Loading message="Loading..." positionStatic />
                    )}
                </>
            )}
        </Container>
    );
}
