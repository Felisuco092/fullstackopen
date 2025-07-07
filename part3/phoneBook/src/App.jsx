import { useState, useEffect } from 'react'
import notesManagement from './services/notes'

const NotificationSuccess = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const NotificationError = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Person = ({name, number, handleDelete, id}) => {
  return (
    <>
      {name} {number}
      <button onClick={handleDelete(name, id)}>delete</button>
      <br />
    </>
  )
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

const Persons = ({filterObject, handleDelete}) => {
  return (
    <>
      {filterObject.map((person) => <Person 
        key={person.name} name={person.name} number={person.number}
        handleDelete={handleDelete} id={person.id}/>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    notesManagement
      .getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = `${newName} is already added to phonebook, replace the old with a new one?`
    if(persons.some((person) => person.name === newName )) {
      if(confirm(message)) {
        const personFind = persons.find((person) => person.name === newName)
        const newPerson = {...personFind, number: number}
        notesManagement
          .update(personFind.id, newPerson)
          .then((serverResponse) => {
            const indexPerson = persons.findIndex(person => person.id === personFind.id)
            const copyPersons = [...persons]
            copyPersons[indexPerson] = newPerson
            setPersons(copyPersons)
          })
          .catch((error) => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            },3000)
            setPersons(persons.filter((person) => person.name !== newName))
          })
      }
    } else {
      const newPerson = { name: newName, number: number}
      notesManagement
        .create(newPerson)
        .then(serverResponse =>  {
          setPersons(persons.concat(serverResponse))
          setSuccessMessage(
          `Added ${newName}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Error: ${error.response.data.error}`)
            setTimeout(() => {
              setErrorMessage(null)
            },3000)
        })
    }
    setNewName('')
    setNumber('')
  }


  const handleDelete = (name, id) => {
    return () => {
      if(confirm(`Delete ${name} ?`)) {
        notesManagement
          .deleteNote(id)
          .then(deletedNote => {
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch((error) => {
            setPersons(persons.filter((person) => person.name !== name))
          })
      }
    }
  }
  
  
  
  
  const filterObject = persons.filter(person => {
        return person.name.toLowerCase().includes(filter.toLowerCase())
      })

  

  return (
    <div>
      <h2>Phonebook</h2>
      <NotificationSuccess message={successMessage} />
      <NotificationError message={errorMessage} />
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
      <Persons filterObject={filterObject} handleDelete={handleDelete}/>
    </div>
  )
}

export default App