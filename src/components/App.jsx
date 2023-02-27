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

  formSubmitHandler = NewContact => {          
    const includesName = this.state.contacts.find(
      contact => contact.name.toLocaleLowerCase() === NewContact.name.toLocaleLowerCase()
    );
      if (includesName) {
        return alert(`${NewContact.name} is already in contacts.`); 
       
      } else {      
       let myContact = { id: nanoid(), name: NewContact.name, number: NewContact.number };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, myContact],
      }));
    }; 
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