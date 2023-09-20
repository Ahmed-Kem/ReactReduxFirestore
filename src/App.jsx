import "./App.css";
import { useContactStore } from "./assets/utils/store/contact.store";
import { useEffect, useState } from "react";
import { Contact } from "./components/Contact";
import { Tag } from "./components/Tag";
import { useTagStore } from "./assets/utils/store/tag.store";

function App() {
  const { addContact, contacts } = useContactStore();
  const { addTag, tags } = useTagStore();
  const [contactName, setContactName] = useState("");
  const [tagName, setTagName] = useState("");

  function handleChangeContact(event) {
    setContactName(event.target.value);
  }

  function handleChangeTag(event) {
    setTagName(event.target.value);
  }

  function handleSubmitContact(event) {
    event.preventDefault();
    addContact(contactName);
    console.log(contacts);
    console.log(tags);
  }

  function handleSubmitTag(event) {
    event.preventDefault();
    addTag(tagName);
    console.log(contacts);
    console.log(tags);
  }

  return (
    <div
      style={{
        background: "#262626",
        height: "100vw",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h2 style={{ marginTop: 20 }}>Contacts</h2>
        <form onSubmit={handleSubmitContact}>
          <input
            type="text"
            name="contactName"
            onChange={handleChangeContact}
            value={contactName.value}
            style={{ color: "black" }}
          />
          <input
            type="submit"
            style={{ background: "white", color: "black", marginTop: 20 }}
            value={"+"}
          />
        </form>
        <ul style={{ marginTop: 20 }}>
          {contacts.map((contact) => (
            <Contact key={contact.id} contact={contact} />
          ))}
        </ul>
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <h2 style={{ marginTop: 20 }}>Tags</h2>
        <form onSubmit={handleSubmitTag}>
          <input
            type="text"
            name="tagName"
            onChange={handleChangeTag}
            value={tagName.value}
            style={{ color: "black" }}
          />
          <input
            type="submit"
            style={{ background: "white", color: "black", marginTop: 20 }}
            value={"+"}
          />
        </form>
        <ul style={{ marginTop: 20 }}>
          {tags.map((tag) => (
            <Tag key={tag.id} tag={tag} />
          ))}
        </ul>
      </div>
      *
    </div>
  );
}

export default App;
