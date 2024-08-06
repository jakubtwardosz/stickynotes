import { useState, useEffect } from "react";
import NoteCard from "../components/NoteCard.jsx";

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${import.meta.env.VITE_API_URL}/notes`);

                // Sprawdź, czy odpowiedź jest poprawna
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const contentType = response.headers.get("Content-Type");

                // Sprawdź, czy odpowiedź jest JSON-em
                if (contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setNotes(data);
                } else {
                    throw new Error("Response is not in JSON format");
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {notes.length > 0 ? (
                notes.map((note) => (
                    <NoteCard note={note} key={note.id} />
                ))
            ) : (
                <div>No notes found</div>
            )}
        </div>
    );
};

export default NotesPage;
