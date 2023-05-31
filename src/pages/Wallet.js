import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPostsData, addMoney, moneyToArmband } from '../utils/walletUtils';

function Wallet() {
  const userId = 0;
  const notify = (amountAdded, person = false) => toast(
    `${amountAdded} kr. overført ${person ? "til " + person + "s armbånd" : "til din pung"}`,
    {
      type: "success",
      theme: "light",
      pauseOnFocusLoss: false,
      delay: 500,
      autoClose: 2000,
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
    setIsLoading(true);
    const fetchData = async () => {
      await getPostsData(setPosts, setWalletAmount, setIsPosts);
      setIsLoading(false);
    }
    fetchData();
  }, [walletAmount, setWalletAmount, armbandAmount, setArmbandAmount]);

  async function handleAddMoney(amount, post) {
    await addMoney(userUrl, setWalletAmount, amount, post);
    notify(amount);
  };

  async function handleMoneyToArmband(amount, armband, post) {
    await moneyToArmband(userUrl, setWalletAmount, setArmbandAmount, amount, armband, post);
    notify(amount, armband.user);
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
                    <button type="button" onClick={() => handleAddMoney(100, post)}>+</button>
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
                            <button type="button" onClick={() => handleMoneyToArmband(50, armband, post)}>+</button>
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
  );
};

export default Wallet;