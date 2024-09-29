import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "locomotive-scroll/dist/locomotive-scroll.css";

gsap.registerPlugin(ScrollTrigger);

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const cardsRef = useRef([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      const response = await axios.get("http://localhost:5000/contacts");
      setContacts(response.data);
    };
    fetchContact();
  }, [setContacts]);
  useEffect(() => {
    const animations = gsap.matchMedia();

    animations.add("(min-width: 800px)", () => {
      const scrollTriggerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contacts",
          start: "center 60%",
          end: "center 41%",
          scrub: 3,
        },
      });

      if (document.getElementById("first") && document.getElementById("second") && document.getElementById("third")) {
        scrollTriggerTl.to("#first", { x: 325, opacity: 1, ease: "power1.in", duration: 1 }, "anim");
        scrollTriggerTl.to("#second", { x: -300, opacity: 1, delay: 0.4, duration: 1, ease: "power1.in" }, "anim");
        scrollTriggerTl.to("#third", { opacity: 1, delay: 0.7, x: 200, ease: "power1.in", duration: 1 }, "anim");
      }

      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power1.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".cards",
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: ".cards-container",
        start: "top 50%",
        end: "top 35%",
        toggleActions: "play reverse play reverse",
        onEnter: () => gsap.to(".main", { backgroundColor: "gray", color: "black" }),
        onLeaveBack: () => gsap.to(".main", { backgroundColor: "white", color: "black" }),
      });
    });

    animations.add("(max-width: 799px)", () => {
      const scrollTriggerTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".contacts",
          start: "center 60%",
          end: "center 41%",
          scrub: 3,
        },
      });

      if (document.getElementById("first") && document.getElementById("second") && document.getElementById("third")) {
        scrollTriggerTl.to("#first", { x: 150, opacity: 1, ease: "power1.in", duration: 1 }, "anim");
        scrollTriggerTl.to("#second", { x: -150, opacity: 1, delay: 0.4, duration: 1, ease: "power1.in" }, "anim");
        scrollTriggerTl.to("#third", { opacity: 1, delay: 0.7, x: 100, ease: "power1.in", duration: 1 }, "anim");
      }

      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power1.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".cards",
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          }
        );
      }

      ScrollTrigger.create({
        trigger: ".cards-container",
        start: "top 50%",
        end: "top 35%",
        toggleActions: "play reverse play reverse",
        onEnter: () => gsap.to(".main", { backgroundColor: "gray", color: "black" }),
        onLeaveBack: () => gsap.to(".main", { backgroundColor: "white", color: "black" }),
      });
    });

    animations.add("(max-width: 600px)", () => {
      ScrollTrigger.getAll().forEach((st) => st.kill()); 
      gsap.killTweensOf(cardsRef.current); 
    });

    return () => {
      animations.revert(); 
    };
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/contacts/${id}`);
      setContacts(contacts.filter((contact) => contact._id !== id));
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("There was an error deleting the contact!", error);
    }
  };

  return (
    <div className="main">
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
            background-color: white;
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

      <div className="contacts w-full min-h-screen flex flex-col justify-center items-center gap-5 ">
        <h1
          id="first"
          className="sm:text-[6.5rem] md:text-[7.2rem] lg:text-[8rem] text-[4rem] pr-[2rem] font-frPlaywrite"
        >
          Already
        </h1>
        <h1
          id="second"
          className="sm:text-[6rem] md:text-[7rem] lg:text-[7.5rem] text-[4.5rem] ml-[6rem] font-frPlaywrite"
        >
          Exisiting
        </h1>
        <h1
          id="third"
          className="sm:text-[6.5rem] md:text-[6rem] lg:text-[7.5rem] text-[4.5rem] font-frPlaywrite"
        >
          Contacts
        </h1>
      </div>

      <div className="w-full min-h-screen cards-container">
        {showPopup && (
          <div className="popup flex items-center justify-center w-full shadow">
            Contact deleted successfully!
          </div>
        )}
        <div className="container">
          {contacts.length === 0 ? (
            <div className="mt-[8rem] flex items-center justify-center flex-col bg-white shadow hover:shadow-indigo-500/40">
              <h2 className="text-2xl font-bold">No Contacts stored</h2>
              <p>
                Click on the "Create New Contact" button below to add a new
                contact!
              </p>
            </div>
          ) : (
            <div className="cards mt-11">
              {contacts.map((contact, index) => (
                <Card
                  key={contact._id}
                  className="card mb-3"
                  style={{
                    backgroundColor: getGroupColour(contact.group),
                    width: "18rem",
                    position: "relative",
                  }}
                  ref={(el) => (cardsRef.current[index] = el)}
                >
                  <FaTrash
                    className="delete-icon relative left-[90%] mt-[8px]"
                    onClick={() => handleDelete(contact._id)}
                  />
                  <Card.Body>
                    <Card.Title>{contact.name}</Card.Title>
                    <Card.Text>Email: {contact.email}</Card.Text>
                    <Card.Text>Phone: {contact.phone}</Card.Text>
                    <Card.Text>Group: {contact.group}</Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          <Link to="/contacts/createone">
            <Button variant="flat" className="mt-5 text-auPlywrite">
              Create New Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
