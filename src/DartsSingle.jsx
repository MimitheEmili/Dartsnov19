import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export const DartsSingle = () => {
    const { dartsId } = useParams();
    const [dartsPlayer, setDartsPlayer] = useState({});
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
                setDartsPlayer(response.data);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor:", error);
            } finally {
                setPending(false);
            }
        };
        fetchData();
    }, [dartsId]);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isPending ? (
                <div className="spinner-border" role="status">
                    <span className="sr-only">Betöltés...</span>
                </div>
            ) : (
                <div>
                    <h2>Darts Játékos: {dartsPlayer.name || "N/A"}</h2>
                    {dartsPlayer.name ? (
                        <div className="card col-sm-3 d-inline-block m-1 p-2">
                            <p className="text-dark">Név: {dartsPlayer.name}</p>
                            <p className="text-dark">Születési dátum: {dartsPlayer.birth_date || "N/A"}</p>
                            <p className="text-dark">Világbajnoki címek: {dartsPlayer.world_ch_won || 0}</p>
                            <div>
                                <Link
                                    to={dartsPlayer.profile_url || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="d-block mb-3"
                                >
                                    Profil link
                                </Link>
                                <img
                                    src={dartsPlayer.image_url || "https://via.placeholder.com/400x800"}
                                    alt={dartsPlayer.name || "Placeholder"}
                                    className="img-fluid"
                                    style={{ width: "200px", cursor: "pointer" }}
                                />
                            </div>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <Link to="/darts">
                                    <i className="bi bi-backspace-fill fs-2"></i>
                                </Link>
                                <Link to={`/mod-darts/${dartsId}`}>
                                    <i className="bi bi-pencil-square fs-2"></i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <p>Nincs elérhető adat erről a darts játékosról.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DartsSingle;
