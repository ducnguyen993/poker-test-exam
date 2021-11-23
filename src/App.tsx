import React, { useEffect, useState } from 'react';
 
import './App.css';
import { buildDeck, mappingCardNumberToString, Rank, prepareRank } from './pocker.services';
 

function App() {
 
  const [cards, setCards] = useState<number[]>()
  const [rank, setRank] = useState<Rank>()
  const [strongestPokerHand, setStrongestPokerHand] = useState<Rank>()
  useEffect(() => {
  
    setCards(Array.from(Array(52).keys()));

  }, [])

  const onClick = () => {
    const cards = buildDeck();
    setCards(cards);
    const rank = prepareRank(cards.slice(0, 5));

    if ((strongestPokerHand?.rankValue ?? 0) < rank.rankValue) {
      setStrongestPokerHand(rank);
    }
    setRank(rank);
  };

  const onClickReset = () => {
    setStrongestPokerHand(undefined);
    setRank(undefined);
    setCards(Array.from(Array(52).keys()));
  };
  return (
    <div className="App">
      <header className="App-body">
        <button style={{ color: 'green',padding:20,fontSize:30 }} onClick={onClick}>
          Shuffled
        </button>
        <button style={{ color: 'red',padding:20,fontSize:30 }} onClick={onClickReset}>
          Reset
        </button>

        <p>Cards</p>
        <p>
          {cards && mappingCardNumberToString(cards)}
        </p>
        {rank && <p style={{ color: 'green' }}>Current poker hand rank</p>}
        <p>
          {rank?.rankDisplayString} {rank?.rankDescription}
        </p>
        {strongestPokerHand && <p style={{ color: 'lightcoral' }}>Strongest poker hand rank</p>}
        <p>
          {strongestPokerHand?.rankDisplayString} {strongestPokerHand?.rankDescription}
        </p>
       
      </header>
    </div>
  );
}

export default App;
