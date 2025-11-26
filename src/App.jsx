import { useState } from 'react'
import './App.css'
import Hero from './components/custom/Hero.jsx';
import FeatureShowcase from './components/custom/ShowcaseFeatures';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/*Hero*/}
      <Hero/>
      <FeatureShowcase />
    </>
  )
}

export default App
