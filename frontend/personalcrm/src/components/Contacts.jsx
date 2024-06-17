// // eslint-disable

// import axios from 'axios';
// import React, { useEffect, useRef, useState } from 'react';
// import { Link } from "react-router-dom";
// import { Button, Card } from "react-bootstrap";
// import { FaTrash } from "react-icons/fa";
// import {useGSAP} from "@gsap/react";
// import {gsap} from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// import LocomotiveScroll from 'locomotive-scroll';

// gsap.registerPlugin(ScrollTrigger);

// function Contacts() {
//   // const refCards = useRef(null);
//   const [contacts, setContacts] = useState([]);
//   const cardsRef = useRef([]);

//   useEffect(()=>{
//     const fetchContact = async () => {
//       const response = await axios.get("http://localhost:5000/contacts");
//       console.log(response.data);
//       setContacts(response.data);
//       // const el = refCards.current;
//     }
//     fetchContact();

//   }, [setContacts]);


//   useEffect(() => {
//     const scroll = new LocomotiveScroll();

//     gsap.fromTo(cardsRef.current, {
//       opacity: 0,
//       scale: 0.5,
//     }, {
//       opacity: 1,
//       scale: 1,
//       duration: 0.7,
//       ease: "power1.out",
//       stagger: 0.2,
//       // scrollTrigger: {
//       //   trigger: ".cards",
//       //   start: "top 80%",
//       //   end: "bottom 20%",
//       //   scrub: true,
//       //   markers:true,
//       // }
//     });
  
//     cardsRef.current.forEach(card => {
//       gsap.to(card, {
//         scale: 1.05,
//         duration: 0.3,
//         ease: "power1.inOut",
//         paused: true,
        
//       });
//     });

//     cardsRef.current.forEach(card => {
//       card.addEventListener("mouseenter", () => {
//         gsap.to(card, { scale: 1.05, duration: 0.3 });
//       });
//       card.addEventListener("mouseleave", () => {
//         gsap.to(card, { scale: 1, duration: 0.3 });
//       });
//     });

//   }, [contacts]);



//   useEffect(()=>{
    
//   }, [])



//   console.log(contacts);


//   function getGroupColour(group) {
//       switch (group) {
//       case "Family" :
//         return "lightblue";
//       case "Team": 
//         return "lightgreen";
//      case "Project": 
//         return "lightcoral";
//      default:
//         return "lightgray"; 
//     }
//   }


//   return (
//     <>
//     <style type="text/css">
//         {`
//         .btn-flat {
//           background-color: black;
//           color: white;
//         }
//         .btn-flat:hover {
//           background-color: gray;
//           color: black;
//         }
//         .btn-center: {
//           display:flex;
//           justify-content:center;
//           align-items:center
//         }
        
//         `}
//       </style>
//     <div className='w-full min-h-screen bg-black'>
//     <div className="container">
//       <h1 className='w-[50%] m-5 text'>Contacts</h1>
//       <div className='flex mb-5 flex-wrap gap-4 cards'>
//       {contacts.map((contact, index) => (
//         <Card key={contact._id} className="mb-3" style={{ backgroundColor: getGroupColour(contact.group), width: "18rem", position: 'relative', cursor: "pointer"}} ref={el => cardsRef.current[index] = el} >
//         <FaTrash className="delete-icon relative left-[90%] mt-[8px]"/>

//           <Card.Body>
//             <Card.Title>{contact.name}</Card.Title>
//             <Card.Text>Email: {contact.email}</Card.Text>
//             <Card.Text>Phone: {contact.phone}</Card.Text>
//             <Card.Text>Group: {contact.group}</Card.Text>
//           </Card.Body>
//         </Card>
//       ))}
//       </div>
//       <Link to="/contacts/create">
//         <Button variant="flat" className="mb-3">Create New Contact</Button>
//       </Link>
//     </div>
//     </div>
//     </>
//   )
// }

// export default Contacts


// eslint-disable

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

gsap.registerPlugin(ScrollTrigger);

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await axios.get("http://localhost:5000/contacts");
      console.log(response.data);
      setContacts(response.data);
    }
    fetchContact();
  }, [setContacts]);



  useEffect(() => { 

    gsap.fromTo(cardsRef.current, {
      opacity: 0,
      y: 100,
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power1.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".cards",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
        
      }
    });

    cardsRef.current.forEach(card => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: "power1.inOut",
        paused: true,
      });
    });

    cardsRef.current.forEach(card => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, { scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)", duration: 0.3 });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, { scale: 1, boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", duration: 0 });
      });
    });
  }, [contacts]);


  function getGroupColour(group) {
    switch (group) {
      case "Family":
        return "lightblue";
      case "Team":
        return "lightgreen";
      case "Project":
        return "lightcoral";
      default:
        return "lightgray";
    }
  }

  return (
    <>
      <style type="text/css">
        {`
          .btn-flat {
            background-color: black;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 25px;
          }
          .btn-flat:hover {
            background-color: gray;
            color: black;
          }
          .container {
            padding: 2rem;
          }
          .cards {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .card {
            transition: all 0.2s ease-in-out;
            cursor: pointer;
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .card:hover {
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      <div className='w-full min-h-screen bg-[cyan]'>

      </div>

      <div className="w-full min-h-screen bg-black">
        <div className="container">
          <h1 className="text-white">Contacts</h1>
          <div className="cards">
            {contacts.map((contact, index) => (
              <Card key={contact._id} className="card mb-3" style={{ backgroundColor: getGroupColour(contact.group), width: "18rem", position: 'relative' }} ref={el => cardsRef.current[index] = el}>
                <FaTrash className="delete-icon relative left-[90%] mt-[8px]" />
                <Card.Body>
                  <Card.Title>{contact.name}</Card.Title>
                  <Card.Text>Email: {contact.email}</Card.Text>
                  <Card.Text>Phone: {contact.phone}</Card.Text>
                  <Card.Text>Group: {contact.group}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
          <Link to="/contacts/create">
            <Button variant="flat" className="mt-5">Create New Contact</Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Contacts;



