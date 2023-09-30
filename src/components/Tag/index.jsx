import "./style.css";
import { MiniContact } from "../MiniContact";
import { useContactStore } from "../../assets/utils/store/contact.store";
import { useTagStore } from "../../assets/utils/store/tag.store";
import { useRef, useEffect } from "react";

export function Tag({ tag }) {
  const { addTagToContact, deleteTagFromContact } = useContactStore();
  const { addContactToTag, deleteContactFromTag, deleteTag } = useTagStore();

  const contacts = useContactStore((state) => state.contacts);

  const inputIdContactRef = useRef(null);

  function handleSubmitMiniContact(event) {
    event.preventDefault();

    console.log("add MiniContact");

    const indexContact = parseInt(inputIdContactRef.current.value);

    addContactToTag(tag, contacts[indexContact]);
    addTagToContact(contacts[indexContact], tag);

    console.log(contacts[indexContact]);
    console.log(tag);
  }

  function handleOnClickMiniContact(_contact, _tag) {
    console.log("delete MiniContact");
    deleteTagFromContact(_contact, _tag);
    deleteContactFromTag(_tag, _contact);
  }

  function handleDeleteTag() {
    console.log("delete Tag");
    for (let idContact of tag.contacts) {
      deleteTagFromContact(
        contacts.find((contact) => contact.id === idContact),
        tag
      );
    }

    deleteTag(tag);
  }

  return (
    <li className="tagContainer">
      <button
        style={{ width: 18, background: "red", color: "white" }}
        onClick={handleDeleteTag}
      >
        X
      </button>
      <button
        style={{ width: 18, background: "red", color: "white" }}
        onClick={() => deleteTag(tag)}
      >
        XX
      </button>
      <span style={{ fontSize: 20, marginBottom: 20 }}>{tag.name}</span>
      <input
        ref={inputIdContactRef}
        type="text"
        name="inputContactId"
        style={{ width: 15, color: "black" }}
      />
      <button style={{ width: 18 }} onClick={handleSubmitMiniContact}>
        +
      </button>
      {
        <ul className="contactList">
          {tag.contacts.map((idContact) => (
            <MiniContact
              key={idContact}
              contact={contacts.find((contact) => contact.id === idContact)}
              onClick={() =>
                handleOnClickMiniContact(
                  contacts.find((contact) => contact.id === idContact),
                  tag
                )
              }
            />
          ))}
        </ul>
      }
    </li>
  );
}
