import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'


const Filter = ({ newFilter, handleNewFilter }) =>
  <div><p>filter shown with <input value={newFilter} onChange={handleNewFilter} /></p></div>

const PersonForm = ({ newName, handleNewName, addPerson, newNumber, handleNewNumber }) => {
  return (
    <form className="personForm" onSubmit={addPerson}>
      <div>name: <input value={newName} onChange={handleNewName} /></div>
      <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Persons = ({ personsToShow, deletePerson }) =>
  personsToShow.map(p => <Person key={p.id} person={p} deletePerson={deletePerson} />)

const Person = ({ person, deletePerson }) => {
  return (
    <div>
      <p>{person.name} {person.number} <button value={person.id} onClick={deletePerson}>delete</button></p>
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) return null
  return <div className="notification">{message}</div>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  const notificationMessage = (message) => {
    setNewMessage(message)
    setTimeout(() => {
      setNewMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber
    }

    const existingPerson = persons.find(p => p.name === newName)   // undefined if lauseessa false

    if (existingPerson && window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one`)) {
      personService
        .update(existingPerson.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
          notificationMessage(`Information of ${newName} the number has been changed`)
        })
        .catch(error => {
          // alert(`${existingPerson.name} ${existingPerson.number} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== existingPerson.id))
          notificationMessage(`Information of ${existingPerson.name} has already been removed from server`)
        })
    }

    if (!existingPerson) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notificationMessage(`Added ${newName}`)
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const deletedPerson = persons.find(p => p.id === Number(event.target.value))

    if (window.confirm(`Delete ${deletedPerson.name} ${deletedPerson.number} ?`)) {
      personService
        .remove(deletedPerson.id)
      setPersons(persons.filter(p => p.id !== deletedPerson.id))
      notificationMessage(`${deletedPerson.name} has been removed`)
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleNewFilter = (event) => setNewFilter(event.target.value)

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} />
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} handleNewName={handleNewName} addPerson={addPerson}
        newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App