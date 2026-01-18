import './App.css'
import { Accordion } from './components/Accordion/Accordion'
import CardList from './components/CardList/CardList'
import { LoginForm } from './components/LoginForm/LoginForm'
import { useAppContext } from './hooks/useAppContext'

function App() {
  const {user} = useAppContext();

  return (
    <>
      {/* <JokeComponent /> */}
      {/* <Accordion /> */}
      {!user && <LoginForm />}
      {user && <CardList />}
    </>
  )
}

export default App