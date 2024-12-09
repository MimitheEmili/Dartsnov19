import React, { useState } from 'react';
import axios from 'axios';
import './DartsCreate.css';

function DartsCreate() {
  const [playerName, setPlayerName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [worldChWon, setWorldChWon] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState(''); // Kép előnézet

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(file); // Mentjük el a fájlt
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Fájl URL létrehozása
      };
      reader.readAsDataURL(file); // Fájl beolvasása
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Az adatok kiírása a console-ra
    console.log('Játékos neve:', playerName);
    console.log('Születési dátum:', birthDate);
    console.log('Nyert világbajnokságok száma:', worldChWon);
    console.log('Kép URL:', imageUrl);

    const newPlayer = {
      name: playerName,
      birth_date: birthDate,
      world_ch_won: worldChWon,
      image_url: imageUrl, // Kép fájl URL-je
    };

    try {
      const response = await axios.post('https://your-api-endpoint.com/players', newPlayer);
      console.log('Új játékos sikeresen hozzáadva:', response.data);
      alert('Játékos sikeresen hozzáadva!');

      setPlayerName('');
      setBirthDate('');
      setWorldChWon('');
      setImageUrl('');
      setImagePreview('');
    } catch (error) {
      console.error('Hiba történt a játékos hozzáadása során:', error);
      alert('Hiba történt a játékos hozzáadása során.');
    }
  };

  return (
    <div>
      <div className='h1format'>
        <h1>Új Darts Játékos Felvitele</h1>
      </div>
      <form className='kulsoresz' onSubmit={handleSubmit}>
        <div>
          <div className='bentiresz'>
            <div>
              <label>Játékos neve:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Születési dátum:</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Nyert világbajnokságai:</label>
              <input
                type="text"
                value={worldChWon}
                onChange={(e) => setWorldChWon(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Kép feltöltése:</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              {imagePreview && <img src={imagePreview} alt="Kép előnézete" style={{ width: '200px', marginTop: '10px' }} />}
            </div>
            <div className='felvetelgomb'>
              <button type="submit">Felvitel</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DartsCreate;
