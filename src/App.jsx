import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from './firebase';
import { collection, onSnapshot, orderBy, query, limit, getDocs } from "firebase/firestore";
import './App.css'


function App() {

  const [messages, setMessages] = useState([]);
  let key = 0;
  
  async function initialize(){
    const subscribe = onSnapshot(query(collection(db, "feelings"), orderBy("time", "asc")), (snapshot) => {
        snapshot.forEach((doc) => { 
          if (messages.length > 7) {
            messages.shift();
          }
          // @ts-ignore
          messages.push(doc.data()["message"]);
        });
        setMessages([...messages]);
      });
  
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="messages">
      {messages.map((messages) => {
        return <h1>{messages}</h1>
      })}
    </div>
  )
}

export default App
