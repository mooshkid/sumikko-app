import React, { useState, useEffect } from "react";
import styles from "./Matching.module.css";

const items = [
  { id: 1, name: "Pedro", image: "/images/tokage.webp" },
  { id: 2, name: "Tonkatsu", image: "/images/tonkatsu.webp" },
  { id: 3, name: "Shirokuma", image: "/images/shirokuma.webp" },
];

const getRandomItem = () => items[Math.floor(Math.random() * items.length)];

const MatchingGame: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [randomItem, setRandomItem] = useState(() => getRandomItem());
  const [isMatching, setIsMatching] = useState<boolean>(false);

  // Reset the game state when the component mounts
  useEffect(() => {
    setRandomItem(getRandomItem()); // Reset to a new random item
    setMessage(""); // Clear any message
    setIsMatching(false); // Re-enable interactions
  }, []);

  const handleTextClick = (name: string) => {
    if (isMatching) return; // Prevent additional clicks while waiting for timeout

    setSelectedText(name);
    checkMatch(name);
  };

  const checkMatch = (text: string) => {
    if (text === randomItem.name) {
      setMessage("Correct Match!");
      setIsMatching(true); // Disable further interactions
      setTimeout(() => {
        setMessage("");
        setRandomItem(getRandomItem());
        setIsMatching(false); // Re-enable interactions
      }, 1000); // 1-second timeout
    } else {
      setMessage("Try Again!");
    }
    setSelectedText(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={randomItem.image} alt={randomItem.name} className={styles.image} />
      </div>
      <div className={styles.rightSide}>
        {items.map((item) => (
          <div key={item.id} className={styles.text} onClick={() => handleTextClick(item.name)}>
            {item.name}
          </div>
        ))}
      </div>
      <div className={styles.message}>
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default MatchingGame;
