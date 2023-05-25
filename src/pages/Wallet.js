import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Wallet() {
  const userId = 0;
  const notify = (amountAdded, person) => toast(
    `${amountAdded} kr. overført ${person ? "til " + person + "s armbånd" : ""}`,
    {
      type: "success",
      theme: "light",
      pauseOnFocusLoss: false,
      delay: 500,
      autoClose: 1500,
      position: "top-left"
    })

  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);
  const [armbandAmount, setArmbandAmount] = useState(0)

  const userUrl =
    `https://jpz-app-default-rtdb.europe-west1.firebasedatabase.app/userCurrency/${userId}.json`;

  // get data from firebase and assign to post variable
  useEffect(() => {
    async function getPosts() {
      setIsLoading(true);

      try {
        const url =
          "https://jpz-app-default-rtdb.europe-west1.firebasedatabase.app/userCurrency.json";

        // wait until "response" gets positive response from database
        const response = await fetch(url);
        // assign json data (array of products) into the "data" variable
        const data = await response.json();

        // check if products exist
        if (data !== null) {
          const postsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          //setTimeout(() => {
          setIsLoading(false);
          setPosts(postsArray);
          setWalletAmount(data["walletCurrency"]);
          console.log(walletAmount);
          //}, 1500);
        } else {
          setIsLoading(false);
          setIsPosts(false);
        }

      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsPosts(false);
      }

    }
    getPosts();
  }, [walletAmount, setWalletAmount, armbandAmount, setArmbandAmount]);

  async function addMoney(amount, post) {
    const updatedWalletCurrency = post.walletCurrency + amount;

    const updatedArray = {
      walletCurrency: updatedWalletCurrency,
      armbands: post.armbands,
    };

    const response = await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedArray),
    });

    const data = await response.json();

    console.log(post.armbands);
    notify(amount);
    setWalletAmount(updatedWalletCurrency);

    console.log(data);
    console.log(post.walletCurrency + amount);
    console.log(`you've added ${amount}`);
  };

  async function moneyToArmband(amount, armband, post) {
    const updatedWalletCurrency = post.walletCurrency - amount;
    const updatedArmbandCurrency = armband.armbandCurrency + amount;

    const lengthskeren = post.armbands;
    let updatedArmbands = {};
    for (let i = 0; i < lengthskeren.length; i++) {
      if (post.armbands[i].user === armband.user) {
        updatedArmbands[i] = { "user": armband.user, "armbandCurrency": armband.armbandCurrency + amount };
      } else {
        updatedArmbands[i] = { "user": post.armbands[i].user, "armbandCurrency": post.armbands[i].armbandCurrency };
      };
    };
    const updatedArray = {
      walletCurrency: updatedWalletCurrency,
      armbands: updatedArmbands,
    };
    console.log(updatedArray);

    const response = await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedArray),
    });

    const data = await response.json();

    notify(amount, armband.user);
    setWalletAmount(updatedWalletCurrency);
    setArmbandAmount(updatedArmbandCurrency);

    console.log(data);
    console.log(updatedArmbandCurrency);
    console.log(updatedWalletCurrency);
  };

  return (
    <main>
      <div className={`loading ${isLoading ? "show" : "hide"}`}></div>
      <div>
        <h1>Din pung</h1>
        <h4>Tank op eller overfør penge til armbånd</h4>
        {isPosts ? (
          <>
            <h3 className="wallet-heading">Dine overførte penge</h3>
            {posts.map((post) => (
              <div key={post.id} className="wallet-wrapper">
                <div className="wallet-display">
                  <p className="wallet-currency"><span>DKK </span>{post.walletCurrency}</p>
                  <div className="add-money">
                    <button type="button" onClick={() => addMoney(100, post)}>+</button>
                  </div>
                </div>

                <div className="connected-armbands">
                  <h3>Forbundede armbånd</h3>
                  <div className="armbands-wrapper">
                    {post.armbands.map((armband, armbandIndex) => (
                      <div key={armbandIndex} className="armband">
                        <div>
                          <h3>{armband.user}</h3>
                          <p><span>DKK </span>{armband.armbandCurrency}</p>
                          <div className="add-money">
                            <button type="button" onClick={() => moneyToArmband(50, armband, post)}>+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="wallet-display">
            <p className="wallet-currency"><span>DKK </span>0,00</p>
            <div className="add-money">
              <button type="button">+</button>
            </div>
          </div>
        )}

      </div>
      <ToastContainer />
    </main>
  )
};

export default Wallet;