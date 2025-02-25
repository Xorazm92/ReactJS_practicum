import React from "react";
import './App.css';
import Header from "./components/header/Header";
import heroImg from "./assets/hero.svg";
import { ServiceCard } from "./components/service-card/ServiceCard";

function App() {
  const [state, setState] = React.useState(0);
  return (
    <>
      <Header />
      <section className="hero">
        <div className="container">
          <div className="hero_block">
            <h2>Bring everyone together to build better products.</h2>
            <div>
              <img src={heroImg} alt="img" />
            </div>
          </div>
        </div>
      </section>
      <section className="service">
        <div className="container">
          <div className="service_block">
            <h2>What's different about Manage?</h2>
            <div>
              <ServiceCard
                number={"1"}
                title={"Track company-wide progress"}
                text={
                  "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again."
                }
              />
            </div>
          </div>
          <div>
            <ServiceCard
              number={"1"}
              title={"Track company-wide progress"}
              text={
                "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again."
              }
            />
          </div>
          <div>
            <ServiceCard
              number={"1"}
              title={"Track company-wide progress"}
              text={
                "See how your day-to-day tasks fit into the wider vision. Go from tracking progress at the milestone level all the way done to the smallest of details. Never lose sight of the bigger picture again."
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
