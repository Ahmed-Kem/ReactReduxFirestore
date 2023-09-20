import "./style.css";
import { MiniTag } from "../MiniTag";
import { useContactStore } from "../../assets/utils/store/contact.store";
import { useTagStore } from "../../assets/utils/store/tag.store";
import { useRef, useEffect } from "react";

export function Contact({ contact }) {
  const {
    addTagToContact,
    deleteTagFromContact,
    deleteAllTagsFromContact,
    deleteContact,
  } = useContactStore();
  const { tags, addContactToTag, deleteContactFromTag } = useTagStore();

  const inputIdTagRef = useRef(null);

  function handleSubmitMiniTag(event) {
    event.preventDefault();

    console.log("add MiniTag");

    const indexTag = parseInt(inputIdTagRef.current.value);

    addTagToContact(contact, tags[indexTag]);
    addContactToTag(tags[indexTag], contact);

    console.log(contact);
    console.log(tags[indexTag]);
  }

  function handleOnClickMiniTag(_contact, _tag) {
    console.log("delete MiniTag");
    deleteTagFromContact(_contact, _tag);
    deleteContactFromTag(_tag, _contact);
  }

  function handleDeleteContact() {
    console.log("delete Contact");
    for (let idTag of contact.tags) {
      deleteContactFromTag(
        tags.find((tag) => tag.id === idTag),
        contact
      );
    }

    deleteAllTagsFromContact(contact);
    deleteContact(contact);
  }

  const handleClearContact = () => {
    console.log("clear Contact");
    for (let idTag of contact.tags) {
      deleteContactFromTag(
        tags.find((tag) => tag.id === idTag),
        contact
      );
    }

    deleteAllTagsFromContact(contact);
  };

  const handleRemoveContact = () => {
    console.log("remove Contact");
    deleteContact(contact);
  };

  return (
    <li className="contactContainer" onDelete={handleClearContact}>
      <button
        style={{ width: 18, background: "red", color: "white" }}
        onClick={handleClearContact}
      >
        X
      </button>
      <button
        style={{ width: 18, background: "red", color: "white" }}
        onClick={handleRemoveContact}
      >
        XX
      </button>
      <span style={{ fontSize: 20, marginBottom: 20 }}>{contact.name}</span>
      <input
        ref={inputIdTagRef}
        type="text"
        name="inputTagId"
        style={{ width: 15, color: "black" }}
      />
      <button style={{ width: 18 }} onClick={handleSubmitMiniTag}>
        +
      </button>
      {
        <ul className="tagList">
          {contact.tags.map((idTag) => (
            <MiniTag
              key={idTag}
              tag={tags.find((tag) => tag.id === idTag)}
              onClick={() =>
                handleOnClickMiniTag(
                  contact,
                  tags.find((tag) => tag.id === idTag)
                )
              }
            />
          ))}
        </ul>
      }
    </li>
  );
}
