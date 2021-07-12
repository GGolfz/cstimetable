import ReactGA from 'react-ga'
import './style'
import App from './components/app'

ReactGA.initialize('G-FHDZRSZLCS')
ReactGA.pageview(window.location.pathname + window.location.search)

export default App
