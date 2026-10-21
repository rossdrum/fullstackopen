import { useState, useEffect } from "react";
import Number from "./components/Number";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (notification === null) return;

    const timeoutId = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  useEffect(() => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  }, []);

  const deletePersons = (id) => {
    const person = persons.find((n) => n.id === id);
    personService
      .deletePerson(id)
      .then(() => {
        setPersons((currentPersons) =>
          currentPersons.filter((person) => person.id !== id),
        );
      })

      .catch((error) => {
        if (error.response?.status === 404) {
          setNotification({
            message: `${person.name} has already been removed from the server`,
            type: "error",
          });
          setPersons((currentPersons) =>
            currentPersons.filter((n) => n.id !== id),
          );
        }
      });
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()),
  );

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${existingPerson.name} already exists, do you wish to update their number?`,
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newNumber };

        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons((currentPersons) =>
              currentPersons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person,
              ),
            );
            setNotification({
              message: `Updated ${returnedPerson.name}'s number`,
            });
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              setNotification({
                message: `${existingPerson.name} has already been removed from the server`,
                type: "error",
              });

              setPersons((currentPersons) =>
                currentPersons.filter(
                  (person) => person.id !== existingPerson.id,
                ),
              );
            }
          });
      }

      return;
    }

    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };

    personService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNotification({ message: `Added ${returnedPerson.name}` });
      setNewName("");
      setNewNumber("");
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification?.message} type={notification?.type} />
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
          <Number
            key={person.id}
            person={person}
            deletePerson={() => deletePersons(person.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
