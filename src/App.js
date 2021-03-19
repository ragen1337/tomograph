import {useState} from "react";

import {Schemes} from './constants';

import {FanScheme, ParallelScheme} from "./components";

import styles from './style.module.css';

function App() {
  const [currentScheme, setCurrentScheme] = useState('ParallelScheme');
  console.log(currentScheme);

  return (
    <div className={styles.mainPageWrapper}>
      <div className={styles.schemeSwitcher}>
        {
          Schemes.map( (scheme) => (
            <div
              className={styles.switcherVariant}
              onClick={() => setCurrentScheme(scheme.value)}
              style={currentScheme === scheme.value ? {background: 'pink'} : {} }
            >
              {scheme.name}
            </div>
          ))
        }
      </div>
      {(currentScheme === 'ParallelScheme') && <ParallelScheme />}
      {(currentScheme === 'FanScheme') && <FanScheme />}
    </div>
  );
}

export default App;
