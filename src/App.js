import React, {useState, useEffect} from 'react'
import './App.css';
import data from './data.json'

function App() {
  const [types, setTypes] = useState(Object.keys(data))
  const [selectedType, setSelectedType] = useState(types ? types[0] : '')
  const [stats, setStats] = useState({atkSpeed: 1, damage: 1, hull: 1})

  useEffect(() => {
    console.log('stats')
  },[stats])

  const handleOnClick = (e) => {
    const newStats = {...stats}
    newStats[e.target.value] = newStats[e.target.value] + 1
    setStats(newStats)
  }

  return (
    <div className="App">
      <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
        { types.map(type => <option key={type} value={type}>{type}</option>) }
      </select>
      <div className="main-container">
        <div className="stats">
          <div className="stats-title">
            <div className="stats-title-text">Attack Speed : {stats.atkSpeed}</div>
            <div className="stats-title-text">Damage : {stats.damage}</div>
            <div className="stats-title-text">Hull : {stats.hull}</div>
          </div>
          <div className="stats-plus">
            <button className="plus-button" value="atkSpeed" onClick={(e) => handleOnClick(e)}>+</button>
            <button className="plus-button" value="damage" onClick={(e) => handleOnClick(e)}>+</button>
            <button className="plus-button" value="hull" onClick={(e) => handleOnClick(e)}>+</button>
          </div>
        </div>

        <div className="tree">
        {
          data[selectedType].map( item => {
            const progress = {
              atkSpeed: stats.atkSpeed * 100 / item.requirements.atkSpeed,
              damage: stats.damage * 100 / item.requirements.damage,
              hull: stats.hull * 100 / item.requirements.hull
            }
            const reqPassed = progress.atkSpeed >= 100 && progress.damage >= 100 && progress.hull >= 100

            return(
              <div className="skill-container" key={item.name}>
                <div className={`img-container ${reqPassed ? "allowed" : ""}`}>
                  { !reqPassed &&
                    <div className="colored">
                      <div className="colored-1" style={{height: `${progress.atkSpeed}%`}}></div>
                      <div className="colored-2" style={{height: `${progress.damage}%`}}></div>
                      <div className="colored-3" style={{height: `${progress.hull}%`}}></div>
                    </div>
                  }
                  <img src={process.env.PUBLIC_URL + "./icons/" + item.icon} alt={item.name} />
                </div>
                <div className="img-tooltip">{item.name}</div>
              </div>
            )}
          )
        }
        </div>
      </div>
    </div>
  );
}

export default App;
