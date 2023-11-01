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

type tagStore = {
  user: User | null;
  tags: Array<Tag>;
  isLoadingTag: boolean;
  initTagStore: (user: User) => void;
  addTag: (name: Tag["name"]) => void;
  deleteTag: (tag: Tag) => void;
  addContactToTag: (tag: Tag, contact: Contact) => void;
  deleteContactFromTag: (tag: Tag, contact: Contact) => void;
  deleteAllContactsFromTag: (tag: Tag) => void;
  resetTagStore: () => void;
};

export const useTagStore = create<tagStore>((set) => ({
  user: null,
  tags: [],
  isLoadingTag: true,

  /* initTagStore: (_user) => {
    set((state) => {
      const unsubscribe = firestore
        .collection("Users")
        .doc(_user.uid)
        .collection("Tags")
        .onSnapshot((snapshot) => {
          const updatedTags: Tag[] = snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              }) as Tag
          );
          set({ tags: updatedTags, isLoadingTag: false });
        });
      return { user: _user };
    });
  },*/

  initTagStore: (_user) => {
    set({ user: _user });

    return firestore
      .collection("Users")
      .doc(_user.uid)
      .collection("Tags")
      .onSnapshot((snapshot) => {
        const updatedTags: Tag[] = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            }) as Tag
        );
        set({ tags: updatedTags, isLoadingTag: false });
      });
  },

  addTag: (name) =>
    set((state) => {
      var ref = firestore
        .collection("Users")
        .doc(state.user?.uid)
        .collection("Tags")
        .doc().id;

      firestore
        .collection("Users")
        .doc(state.user?.uid)
        .collection("Tags")
        .doc(ref)
        .set({
          id: ref,
          name: name,
          contacts: [],
        })
        .then(() => {
          console.log("Tag successfully written!");
        })
        .catch((error) => {
          console.error("Error writing tag: ", error);
        });

      return state;
    }),

  deleteTag: (tag) =>
    set((state) => {
      if (state.tags.includes(tag)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Tags")
          .doc(tag.id)
          .delete()
          .then(() => {
            console.log("Tag successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing tag: ", error);
          });
      }

      return state;
    }),

  addContactToTag: (tag, contact) =>
    set((state) => {
      if (state.tags.includes(tag) && !tag.contacts.includes(contact.id)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Tags")
          .doc(tag.id)
          .update({ contacts: [...tag.contacts, contact.id] });
      }

      return state;
    }),

  deleteContactFromTag: (tag, contact) =>
    set((state) => {
      if (state.tags.includes(tag) && tag.contacts.includes(contact.id)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Tags")
          .doc(tag.id)
          .update({
            contacts: tag.contacts.filter(
              (idContact) => idContact !== contact.id
            ),
          });
      }

      return state;
    }),

  deleteAllContactsFromTag: (tag) =>
    set((state) => {
      if (state.tags.includes(tag)) {
        firestore
          .collection("Users")
          .doc(state.user?.uid)
          .collection("Tags")
          .doc(tag.id)
          .update({ contacts: [] });
      }

      return state;
    }),

  resetTagStore: () => set({ tags: [], user: null, isLoadingTag: true }),
}));
