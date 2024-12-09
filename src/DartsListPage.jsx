import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./DartsListPage.css";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

function DartsListPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("https://darts.sulla.hu/darts");
        setPlayers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const deletePlayer = async (id) => {
    try {
      await axios.delete(`https://darts.sulla.hu/darts/${id}`);
      setPlayers(players.filter((player) => player.id !== id));
      alert("Játékos sikeresen törölve.");
    } catch (error) {
      alert("Hiba történt a törlés során.");
    }
  };

  if (loading) {
    return <p>Betöltés alatt...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Darts Játékosok</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {players.map((player) => (
          <div className="col" key={player.id}>
            <div className="card h-100">
              <div className="card-body text-center">
                <h5 className="card-title text-primary">{player.name}</h5>
                <p className="text-muted">
                  <strong>Születési év:</strong> {player.birth_date || "N/A"}
                </p>
                <p className="text-danger">
                  <strong>Világbajnoki címek:</strong> {player.world_ch_won || 0}
                </p>

                <img
                  src={player.image_url || "https://via.placeholder.com/400"}
                  alt={player.name}
                  className="card-img-top"
                  style={{
                    maxHeight: "250px",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              <div className="card-footer d-flex justify-content-center align-items-center">
                <Link
                  to={`/DartsMod/${player.id}`}
                  className="btn btn-warning btn-sm d-flex justify-content-center align-items-center mx-2"
                >
                  <i className="bi bi-pencil"></i>
                </Link>
                <a
                  href={player.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-success btn-sm d-flex justify-content-center align-items-center mx-2"
                >
                  <i className="bi bi-person-fill"></i>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DartsListPage;
