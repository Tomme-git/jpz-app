import React, { useState, useEffect, useRef } from 'react';
import { getPostsData, addYearCard } from '../utils/firebaseUtils';
import { NavLink } from 'react-router-dom';
import defaultProfilePicture from '../images/default-pfp.png';
import { ToastContainer, toast } from 'react-toastify';
import AddYearCard from '../images/card-add.svg';
import Checkmark from '../images/checkmark.svg';

function Yearcards() {
  const notify = (name, error = false) => toast(
    error ? `Der skete en fejl, prøv igen senere` : `Årskort oprettet for ${name}`,
    {
      type: "success",
      theme: "light",
      pauseOnFocusLoss: false,
      delay: 500,
      autoClose: 2000,
      position: "top-left"
    })

  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', ageGroup: '' });

  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
  const [yearCards, setYearCards] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { posts, isPosts, yearCards } = await getPostsData();
        setIsLoading(false);
        setPosts(posts);
        setIsPosts(isPosts);
        setYearCards(yearCards)
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        setIsPosts(false);
      }
    }
    fetchData();
  }, [yearCards, setYearCards]);

  const userId = 0;
  const userUrl =
    `https://jpz-app-default-rtdb.europe-west1.firebasedatabase.app/userCurrency/${userId}.json`;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log(formData);
  };

  async function handleAddYearCard(e) {
    e.preventDefault();
    try {
      const { yearCards, notifyParams } = await addYearCard(userUrl, formData.name, formData.ageGroup);
      setYearCards(yearCards);
      notify(notifyParams.name);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      notify("", true);
      handleCloseModal();
    }
  };

  const handleOpenModal = () => {
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      dialogRef.current.close();
    }
  };

  return (
    <main>
      <div className={`loading ${isLoading ? "show" : "hide"}`}></div>
      <section className="year-cards">
        <h1>Årskort</h1>
        {isPosts ? (
          <>
            {posts.map((post) => (
              post.yearCards ?
                post.yearCards.map((card, cardIndex) => (
                  <div key={cardIndex} className="year-card">
                    {card.active === "yes" ?
                      <div className="card-status active-card">
                        <div><img src={Checkmark} height={20} alt="checkmark" /><p>Aktivt årskort</p></div>
                      </div>
                      :
                      <div className="card-status inactive-card">
                        <div><p>Årskort ikke aktivt</p></div>
                      </div>
                    }
                    <div className="profile">
                      <img src={defaultProfilePicture} alt="årskort billede" />
                      <div>
                        <div className="card-owner">
                          <p><b>{card.name}</b></p>
                          <p>{card.type}</p>
                        </div>
                        <div className="card-details">
                          <p><b>Udløbsdato</b></p>
                          <p>{card.endDate}</p>
                        </div>
                      </div>
                    </div>
                    <div className="barcode">123456789</div>
                  </div>
                ))
                :
                <div>
                  <p>Ingen årskort oprettet</p>
                </div>
            ))}
            <>
              <div className="buy_year-card" data-open-modal onClick={handleOpenModal}><img height={45} src={AddYearCard} alt="Add Year Card" /></div>
              <dialog ref={dialogRef} data-modal onClick={handleOutsideClick}>
                <div>
                  <h3>Køb årskort</h3>
                  <form>
                    <label htmlFor="name">Navn</label>
                    <input name="name" value={formData.name} placeholder="Navn" onChange={handleChange} />
                    <label htmlFor="ageGroup">Aldersgruppe</label>
                    <select name="ageGroup" value={formData.ageGroup} onChange={handleChange}>
                      <option defaultValue disabled value="">Vælg aldersgruppe</option>
                      <option value="Voksen">Voksen - kr. 385,-</option>
                      <option value="Barn, 2-11 år">Barn, 2-11 år - kr. 250,-</option>
                      <option value="Barn, 0-1 år">Barn, 0-1 år - Gratis</option>
                      <option value="Senior, 65+ år">Senior, 65+ år - kr. 365,-</option>
                    </select>
                    <button type="submit" onClick={handleAddYearCard}>Køb</button>
                  </form>
                  <div className="close-modal" data-close-modal onClick={handleCloseModal}><p>X</p></div>
                </div>
              </dialog>
            </>
          </>
        ) : (
          <div>
            <p>Ingen brugerdata fundet kontakt: +45 97 16 61 20</p>
          </div>
        )}
      </section>
      <ToastContainer />
    </main >
  );
};

export default Yearcards;