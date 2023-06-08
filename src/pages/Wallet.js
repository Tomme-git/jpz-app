import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getPostsData, addMoney, moneyToArmband } from '../utils/firebaseUtils';
import AddIcon from '../images/add.svg';

function Wallet() {
  const userId = 0;
  const notify = (amountAdded, person = false, error = false) => toast(
    error ? `Der skete en fejl, prøv igen senere` : `${amountAdded} kr. overført ${person ? "til " + person + "s armbånd" : "til din pung"}`,
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

  async function handleAddMoney(amount, post) {
    try {
      const { walletCurrency, notifyParams } = await addMoney(userUrl, amount, post);
      setWalletAmount(walletCurrency);
      notify(notifyParams.amountAdded);
    } catch (error) {
      console.error(error);
      notify(0, false, true);
    }
  };

  async function handleMoneyToArmband(amount, armband, post) {
    try {
      const { walletCurrency, notifyParams } = await moneyToArmband(userUrl, amount, armband, post);
      setWalletAmount(walletCurrency);
      notify(notifyParams.amountAdded, notifyParams.person);
    } catch (error) {
      console.error(error);
      notify(0, false, true);
    }
  };

  return (
    <main>
      <div className={`loading ${isLoading ? "show" : "hide"}`}></div>
      <section>
        <h1>Din pung</h1>
        <h4>Tank op eller overfør penge til armbånd</h4>
        {isPosts ? (
          <>
            <h3 className="wallet-heading">Dine overførte penge</h3>
            {posts.map((post) => (
              <div key={post.id} className="wallet-wrapper">
                <div className="wallet-display">
                  <p className="wallet-currency"><span>kr. </span>{post.walletCurrency},-</p>
                  <div className="add-money">
                    <button type="button" onClick={() => handleAddMoney(100, post)}><img src={AddIcon} height={20} alt="Tilføj penge ikon" /></button>
                  </div>
                </div>

                <div className="connected-armbands">
                  <h3>Forbundede armbånd</h3>
                  <div className="armbands-wrapper">
                    {post.armbands.map((armband, armbandIndex) => (
                      <div key={armbandIndex} className="armband">
                        <div>
                          <h3>{armband.user}</h3>
                          <p><span>kr. </span>{armband.armbandCurrency},-</p>
                          <div className="add-money">
                            <button type="button" onClick={() => handleMoneyToArmband(50, armband, post)}><img src={AddIcon} height={20} alt="Tilføj penge ikon" /></button>
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
          <>
            <h3 className="wallet-heading">Dine overførte penge</h3>
            <div className="wallet-display">
              <p className="wallet-currency"><span>DKK </span>0,00</p>
              <div className="add-money">
                <button type="button">+</button>
              </div>
            </div>
          </>
        )}

      </section>
      <ToastContainer />
    </main>
  );
};

export default Wallet;