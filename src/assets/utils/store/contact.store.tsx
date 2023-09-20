import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

interface Contact {
  id: string;
  name: string;
  tags: Array<string>;
}

interface Tag {
  id: string;
  name: string;
  contacts: Array<string>;
}

type contactStore = {
  contacts: Array<Contact>;
  addContact: (name: Contact["name"]) => void;
  deleteContact: (contact: Contact) => void;
  addTagToContact: (contact: Contact, tag: Tag) => void;
  deleteTagFromContact: (contact: Contact, tag: Tag) => void;
  deleteAllTagsFromContact: (contact: Contact) => void;
};

export const useContactStore = create<contactStore>((set) => ({
  contacts: [],

  addContact: (name) =>
    set((state) => ({
      contacts: [...state.contacts, { id: uuidv4(), name: name, tags: [] }],
    })),

  deleteContact: (contact) =>
    set((state) => {
      if (!state.contacts.includes(contact)) {
        return state;
      }

      const indexContact = state.contacts.indexOf(contact);

      const tempContactList = [
        ...state.contacts.slice(0, indexContact),
        ...state.contacts.slice(indexContact + 1),
      ];

      return { ...state, contacts: tempContactList };
    }),

  addTagToContact: (contact, tag) =>
    set((state) => {
      if (!state.contacts.includes(contact)) {
        return state;
      }

      const indexContact = state.contacts.indexOf(contact);

      if (state.contacts[indexContact].tags.includes(tag.id)) {
        return state;
      }

      const tempTags = [...state.contacts[indexContact].tags, tag.id].sort();
      const tempContact = { ...state.contacts[indexContact], tags: tempTags };
      const tempContactList = [
        ...state.contacts.slice(0, indexContact),
        tempContact,
        ...state.contacts.slice(indexContact + 1),
      ];

      return { ...state, contacts: tempContactList };
    }),

  deleteTagFromContact: (contact, tag) =>
    set((state) => {
      if (!state.contacts.includes(contact)) {
        return state;
      }

      const indexContact = state.contacts.indexOf(contact);

      if (!state.contacts[indexContact].tags.includes(tag.id)) {
        return state;
      }

      const indexTag = state.contacts[indexContact].tags.indexOf(tag.id);

      const tempTags = [
        ...state.contacts[indexContact].tags.slice(0, indexTag),
        ...state.contacts[indexContact].tags.slice(indexTag + 1),
      ];

      const tempContact = { ...state.contacts[indexContact], tags: tempTags };

      const tempContactList = [
        ...state.contacts.slice(0, indexContact),
        tempContact,
        ...state.contacts.slice(indexContact + 1),
      ];

      return { ...state, contacts: tempContactList };
    }),

  deleteAllTagsFromContact: (contact) =>
    set((state) => {
      if (!state.contacts.includes(contact)) {
        return state;
      }

      const indexContact = state.contacts.indexOf(contact);

      const tempContactList = [
        ...state.contacts.slice(0, indexContact),
        { id: contact.id, name: contact.name, tags: [] },
        ...state.contacts.slice(indexContact + 1),
      ];

      return { ...state, contacts: tempContactList };
    }),
}));
