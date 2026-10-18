import { useState, useEffect } from 'react'
import axios from 'axios'
import Number from './components/Number'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
    useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  
  const personsToShow = persons.filter(person =>
  person.name.toLowerCase().includes(newFilter.toLowerCase())
)
  const addPerson = (event) => {
    event.preventDefault()

    const alreadyExists = persons.some(
      person => person.name === newName
    )

    if(alreadyExists) {
      alert(`${newName} is already added to the phonebook!`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

    const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) =>
  {
    setNewFilter(event.target.value)
  }



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handler={handleFilterChange} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <ul>

        {personsToShow.map((person) => (
          <Number key={person.id} person={person} />
        ))}
      </ul>
    </div>
  )
}

export default App