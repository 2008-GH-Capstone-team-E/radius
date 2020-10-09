
import React from 'react';
import Routes from './routes'
import './css/style.css';
import SingleProperty from './components/SingleProperty';

const App = () => {
  return (
    <div>
      <SingleProperty/>
      <Routes />
    </div>
  )
}

export default App

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <p>
//          Our New Project
//         </p>
//       </header>
//     </div>
//   );
// }
