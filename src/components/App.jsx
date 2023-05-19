import { Component } from 'react';
import { Section } from 'components/Section/Section';
import { Form } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './SearchForm/SearchForm';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount = () => {
    const storageData = localStorage.getItem('contact');
    if (storageData) this.setState({ contacts: JSON.parse(storageData) });
  };

  componentDidUpdate = (_, prevState) => {
    if (prevState.contacts.lenght !== this.state.contacts.length)
      localStorage.setItem('contact', JSON.stringify(this.state.contacts));
  };

  formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(6),
      name,
      number,
    };
    const isExist = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isExist) {
      return alert(`${name} is already in contacts`);
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  render() {
    const { contacts, filter } = this.state;

    const lowerCaseFilter = filter.toLowerCase();

    const findContacts = contacts.filter(item =>
      item.name.toLowerCase().includes(lowerCaseFilter)
    );

    return (
      <div className="container">
        <Section title="Phone Book">
          <Form onSubmit={this.formSubmitHandler}></Form>
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={findContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
