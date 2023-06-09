import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WalletWidget from '../components/WalletWidget';
import AddIcon from '../images/add.svg';
import { getPostsData, buyTickets } from '../utils/firebaseUtils';

function Tickets() {
  const userId = 0;
  const notify = (ticketsBought, error = false) => toast(
    error ? `Der skete en fejl, prøv igen senere` : `${ticketsBought} klip købt!`,
    {
      type: "success",
      theme: "light",
      pauseOnFocusLoss: false,
      delay: 500,
      autoClose: 2000,
      position: "top-left"
    })

  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);

  const userUrl =
    `https://jpz-app-default-rtdb.europe-west1.firebasedatabase.app/userCurrency/${userId}.json`;

  // get data from firebase and assign to posts and isPosts variables (and isLoading
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const { posts, isPosts } = await getPostsData();
        setIsLoading(false);
        setPosts(posts);
        setIsPosts(isPosts);
      } catch (error) {
        console.log(error)
        setIsLoading(false);
        setIsPosts(false);
      }
    }
    fetchData();

  }, [walletAmount]);

  const [widgetKey, setWidgetKey] = useState(0);
  async function handleBuyTickets(amount, post) {
    try {
      const { walletCurrency, notifyParams } = await buyTickets(userUrl, amount, post);
      setWalletAmount(walletCurrency);
      notify(notifyParams.ticketsBought);
      setWidgetKey(widgetKey + 1)
    } catch (error) {
      console.error(error);
      notify(0, false, true);
    }
  };

  return (
    <main>
      <section>
        <h1>Klippekort</h1>
        <h4>Køb klippekort - Klippekort gælder for alle tilkoblede armbånd</h4>
        <h3 className="t-heading">Muligheder</h3>
        <div className="tickets-container">
          <div>
            <p>5 klip</p>
            <p>25 kr.</p>
            <div className="add-tickets">
              <button type="button" onClick={() => handleBuyTickets(5, 25)}><img src={AddIcon} height={20} alt="Tilføj penge ikon" /></button>
            </div>
          </div>
          <div>
            <p>11 klip</p>
            <p>50 kr.</p>
            <div className="add-tickets">
              <button type="button" onClick={() => handleBuyTickets(11, 50)}><img src={AddIcon} height={20} alt="Tilføj penge ikon" /></button>
            </div>
          </div>
        </div>
        <h3 className="t-heading">Dine klip</h3>
        <div className={`loading ${isLoading ? "show" : "hide"}`}></div>
        {isPosts ? (
          <>
            {
              posts.map((post) => (
                <div key={post.id} className="owned-tickets">
                  <p>Du har</p>
                  <div>
                    <p>{post.tickets} klip</p>
                  </div>
                </div>
              ))

            }
          </>
        ) : (
          <div className="owned-tickets">
            <p>Du har</p>
            <div>
              <p>0 klip</p>
            </div>
          </div>
        )}
      </section>
      <ToastContainer />
      <WalletWidget widgetKey={widgetKey} />
    </main>
  );
};

export default Tickets;