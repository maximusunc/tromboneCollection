import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Container from "../components/container/Container";
import SearchField from "../components/ui/SearchField";

export default function NotFound() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    useEffect(() => {
        document.title = "Page not found · Historic Trombone Database";
        return () => { document.title = "Historic Trombone Database"; };
    }, []);

    function search(e) {
        e.preventDefault();
        navigate(query ? `/instruments?q=${encodeURIComponent(query)}` : "/instruments");
    }

    return (
        <Container>
            <h1 className="pageTitle">Page not found</h1>
            <p>
                There’s no page at <span className="mono">{pathname}</span>. It may have moved, or the address may be mistyped.
            </p>
            <form className="notFoundSearch" onSubmit={search} role="search">
                <SearchField value={query} onChange={(e) => setQuery(e.target.value)} />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>
            <ul className="notFoundLinks">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/instruments">Browse all instruments</Link></li>
                <li><Link to="/bibliography">Bibliography</Link></li>
                <li><Link to="/contact">Report a broken link</Link></li>
            </ul>
        </Container>
    );
}
