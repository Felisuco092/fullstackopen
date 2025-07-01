import { useState } from 'react'

const Person = ({name, number}) => {
  return <p>{name} {number}</p>
}

const Filter = ({filter, setFilter}) => {
  return (
    <div>
        filter shown with<input value={filter} onChange={(event) => setFilter(event.target.value)}/>
    </div>
  )
}

const PersonForm = ({handleSubmit, newName, setNewName, number, setNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName}
            onChange={(event) => 
            setNewName(event.target.value)}/>
        </div>
        <div>number: <input value={number}
            onChange={(event) => 
            setNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({filterObject}) => {
  return (
    <>
      {filterObject.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "040-1234567"}
  ]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if(persons.some((person) => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: number}
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNumber('')
  }



  
  
  
  
  const filterObject = persons.filter(person => {
        return person.name.toLowerCase().startsWith(filter.toLowerCase())
      })

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter}/>
      <h2>add a new</h2>
      <PersonForm 
      handleSubmit={handleSubmit}
      newName={newName}
      setNewName={setNewName}
      number={number}
      setNumber={setNumber}
      />
      <h2>Numbers</h2>
      <Persons filterObject={filterObject} />
    </div>
  )
}

export default App