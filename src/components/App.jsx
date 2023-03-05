import { Component } from 'react';
import { nanoid } from "nanoid"; 
import css from './App.module.css';
import { GlobalStyle } from './GlobalStyles';
import Form from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';



export class App extends Component {
  state = {
    contacts: [],
     filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
    this.setState({ contacts: [] });    
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }  
}

formSubmitHandler = (data, resetForm) => {
    const { name, number } = data;
    const { contacts } = this.state;
    const newContact = contacts.find(contact => contact.name === name);

    if (newContact) {
      return alert(`${name} is already in contacts`);
    } else {
      const contact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
      resetForm();
    }
  };
  

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

    getContact = () =>{
       const { filter, contacts } = this.state;  
       return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );    
  };


  onFilterChange = event => {
      const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
     const { filter} = this.state;
     const searchContacts = this.getContact();
     return (
      <div className={css.container}>
         <GlobalStyle />        
        <Form onSubmit={this.formSubmitHandler} />        
        <div>
          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.onFilterChange}/>
          <ContactList
            contacts={searchContacts}
            onDeleteContact={this.deleteContact}            
          />          
        </div>
      </div>
    );
  }
}