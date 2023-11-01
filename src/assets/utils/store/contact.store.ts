import { create } from "zustand";
import { firestore } from "./../../../firebase";
import { User } from "firebase/auth";

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
  user: User | null;
  contacts: Array<Contact>;
  isLoadingContact: boolean;
  initContactStore: (user: User) => void;
  addContact: (name: Contact["name"]) => void;
  deleteContact: (contact: Contact) => void;
  addTagToContact: (contact: Contact, tag: Tag) => void;
  deleteTagFromContact: (contact: Contact, tag: Tag) => void;
  deleteAllTagsFromContact: (contact: Contact) => void;
  resetContactStore: () => void;
};

export const useContactStore = create<contactStore>((set) => ({
  user: null,
  contacts: [],
  isLoadingContact: true,

  /*initContactStore: (_user) => {
    set((state) => {
      const unsubscribe = firestore
        .collection("Users")
        .doc(_user.uid)
        .collection("Contacts")
        .onSnapshot((snapshot) => {
          const updatedContacts: Contact[] = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Contact
          );
          set({
            contacts: updatedContacts,
            isLoadingContact: false,
          });
        });
      return { user: _user };
    });
  },*/

  initContactStore: (_user) => {
    set({ user: _user });

    return firestore
      .collection("Users")
      .doc(_user.uid)
      .collection("Contacts")
      .onSnapshot((snapshot) => {
        const updatedContacts: Contact[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Contact
        );
        set({
          contacts: updatedContacts,
          isLoadingContact: false,
        });
      });
  },

  addContact: (name) =>
    set((state) => {
      var ref = firestore
        .collection("Users")
        .doc(state.user?.uid)
        .collection("Contacts")
        .doc().id;

      firestore
        .collection("Users")
        .doc(state.user?.uid)
        .collection("Contacts")
        .doc(ref)
        .set({
          id: ref,
          name: name,
          tags: [],
        })
        .then(() => {})
        .catch((error) => {
          console.error("Error writing contact: ", error);
        });

      return state;
    }),

  deleteContact: (contact) =>
    set((state) => {
      if (state.contacts.includes(contact)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Contacts")
          .doc(contact.id)
          .delete()
          .then(() => {})
          .catch((error) => {
            console.error("Error removing contact: ", error);
          });
      }

      return state;
    }),

  addTagToContact: (contact, tag) =>
    set((state) => {
      if (state.contacts.includes(contact) && !contact.tags.includes(tag.id)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Contacts")
          .doc(contact.id)
          .update({ tags: [...contact.tags, tag.id] });
      }

      return state;
    }),

  deleteTagFromContact: (contact, tag) =>
    set((state) => {
      if (state.contacts.includes(contact) && contact.tags.includes(tag.id)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Contacts")
          .doc(contact.id)
          .update({ tags: contact.tags.filter((idTag) => idTag !== tag.id) });
      }

      return state;
    }),

  deleteAllTagsFromContact: (contact) =>
    set((state) => {
      if (state.contacts.includes(contact)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Contacts")
          .doc(contact.id)
          .update({ tags: [] });
      }

      return state;
    }),

  resetContactStore: () =>
    set({ contacts: [], user: null, isLoadingContact: true }),
}));
