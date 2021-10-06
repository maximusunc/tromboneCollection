import React, { useState, useEffect } from 'react';
import API from '../../utils/API.js';
import Container from '../../components/container/Container';
import SearchBar from '../../components/searchBar/SearchBar';
import Trombones from '../../components/trombones/Trombones';
import useSearchBar from '../../utils/useSearchBar';

export default function Instruments() {
    const [trombones, setTrombones] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const searchBar = useSearchBar();
    const [loaded, setLoaded] = useState(false);

    function chronSort(tbones) {
        tbones.sort((a, b) => {
            if (!a.date || !b.date) {
                return 0;
            }
            let [date1] = a.date.match(/\d{4}|\d{2}/);
            let [date2] = b.date.match(/\d{4}|\d{2}/);
            if (date1.length === 2) {
                date1 *= 100;
            }
            if (date2.length === 2) {
                date2 *= 100;
            }
            return date1 - date2;
        });
        return tbones;
    }

    useEffect(() => {
        API.getTrombones()
            .then(res => {
                const sortedTrombones = chronSort(res.data);
                setTrombones(sortedTrombones);
                setFiltered(sortedTrombones);
                setLoaded(true);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        const filteredTrombones = trombones.filter((tbone) => 
            tbone.maker.toLowerCase().indexOf(searchBar.maker.toLowerCase()) !== -1 && 
            tbone.type.indexOf(searchBar.type) !== -1 &&
            tbone.date.indexOf(searchBar.date) !== -1 &&
            tbone.pitch.toLowerCase().startsWith(searchBar.pitch.toLowerCase()));
        setFiltered(filteredTrombones);
    }, [searchBar.maker, searchBar.type, searchBar.date, searchBar.pitch]);

    return (
        <Container>
            <SearchBar
                searchBar={searchBar}
            />
            <h2>Instruments:</h2>

            {loaded ? 
                <section className="tromboneList">
                    <ul style={{ padding: 0 }}>
                        {filtered.map((trombone) => (
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
            :
                <h5>Loading...</h5>
            }
        </Container>
    );
}
