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

type tagStore = {
  tags: Array<Tag>;
  addTag: (name: Tag["name"]) => void;
  deleteTag: (tag: Tag) => void;
  addContactToTag: (tag: Tag, contact: Contact) => void;
  deleteContactFromTag: (tag: Tag, contact: Contact) => void;
  deleteAllContactsFromTag: (tag: Tag) => void;
};

export const useTagStore = create<tagStore>((set) => ({
  tags: [],

  addTag: (name) =>
    set((state) => ({
      tags: [...state.tags, { id: uuidv4(), name: name, contacts: [] }],
    })),

  deleteTag: (tag) =>
    set((state) => ({
      tags: state.tags.filter((t) => t !== tag),
    })),

  addContactToTag: (tag, contact) =>
    set((state) => {
      if (!state.tags.includes(tag)) {
        return state;
      }

      const indexTag = state.tags.indexOf(tag);

      if (state.tags[indexTag].contacts.includes(contact.id)) {
        return state;
      }

      const tempContacts = [
        ...state.tags[indexTag].contacts,
        contact.id,
      ].sort();
      const tempTag = { ...state.tags[indexTag], contacts: tempContacts };
      const tempTagList = [
        ...state.tags.slice(0, indexTag),
        tempTag,
        ...state.tags.slice(indexTag + 1),
      ];

      return { ...state, tags: tempTagList };
    }),

  deleteContactFromTag: (tag, contact) =>
    set((state) => {
      if (!state.tags.includes(tag)) {
        return state;
      }

      const indexTag = state.tags.indexOf(tag);

      if (!state.tags[indexTag].contacts.includes(contact.id)) {
        return state;
      }

      const indexContact = state.tags[indexTag].contacts.indexOf(contact.id);

      const tempContacts = [
        ...state.tags[indexTag].contacts.slice(0, indexContact),
        ...state.tags[indexTag].contacts.slice(indexContact + 1),
      ];

      const tempTag = { ...state.tags[indexTag], contacts: tempContacts };

      const tempTagList = [
        ...state.tags.slice(0, indexTag),
        tempTag,
        ...state.tags.slice(indexTag + 1),
      ];

      return { ...state, tags: tempTagList };
    }),

  deleteAllContactsFromTag: (tag) =>
    set((state) => {
      if (!state.tags.includes(tag)) {
        return state;
      }

      const indexTag = state.tags.indexOf(tag);

      const tempTag = { ...state.tags[indexTag], contacts: [] };

      const tempTagList = [
        ...state.tags.slice(0, indexTag),
        tempTag,
        ...state.tags.slice(indexTag + 1),
      ];

      return { ...state, tags: tempTagList };
    }),
}));
