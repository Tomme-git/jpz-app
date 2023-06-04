import React, { useState, useEffect } from 'react';
import { getPostsData } from '../utils/walletUtils';
import { NavLink } from 'react-router-dom';
import defaultProfilePicture from '../images/default-pfp.png';

function Homepage() {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
  const [walletAmount, setWalletAmount] = useState(false);
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

  }, [walletAmount, setWalletAmount]);
  return (
    <main>
      <div className={`loading ${isLoading ? "show" : "hide"}`}></div>
      <section className="year-cards">
        <h1>Årskort</h1>
        {isPosts ? (
          <>
            {posts.map((post) => (
              <div key={post.id} className="year-card">
                <div className="barcode" style={{ backgroundColor: 'white', height: '75px', marginBottom: '1.5rem' }}></div>
                <div className="profile">
                  <img src={defaultProfilePicture} alt="årskort billede" />
                  <div>
                    <div className="card-owner">
                      <p><b>{post.yearCards.name}</b></p>
                      <p>{post.yearCards.type}</p>
                    </div>
                    <div className="card-details">
                      <p><b>Udløbsdato</b></p>
                      <p>{post.yearCards.endDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className="widget-value">
            <p>👛</p>
            <p>0 kr.</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Homepage;