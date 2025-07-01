import { useState } from 'react'

const Person = ({name, number}) => {
  return <p>{name} {number}</p>
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
      <div>
        filter shown with<input value={filter} onChange={(event) => setFilter(event.target.value)}/>
      </div>
      <h2>add a new</h2>
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
      <h2>Numbers</h2>
      {filterObject.map((person) => <Person key={person.name} name={person.name} number={person.number}/>)}
    </div>
  )
}

export default App