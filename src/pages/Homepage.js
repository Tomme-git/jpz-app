import React from 'react';

function Homepage() {
  return (
    <>
      <div className="mini-hero">
        {/*<h1>Jyllands Park Zoo</h1>*/}
      </div>
      <main>
        <section className="welcome">
          <h2>Velkommen til vores app</h2>
          <p>Du kan:</p>
          <ul>
            <li>Sætte penge ind på din konto samt overføre penge til armbånd fra din konto</li>
            <li>Købe klippekort til forlystelser</li>
            <li>Se kort over Jyllands Park Zoo samt sidste lokation på armbånd</li>

          </ul>
        </section>
      </main>
    </>
  );
};

export default Homepage;