import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPostsData } from '../utils/firebaseUtils';
import WalletIcon from '../images/wallet.svg';

function WalletWidget() {
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
  const [walletAmount, setWalletAmount] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { posts, isPosts } = await getPostsData();
        setPosts(posts);
        setIsPosts(isPosts);
      } catch (error) {
        console.log(error)
        setIsPosts(false);
      }
    }
    fetchData();

  }, [walletAmount, setWalletAmount]);
  return (
    <div className="wallet-widget">
      {isPosts ? (
        <>
          {posts.map((post) => (
            <NavLink key={post.id} to="/projects/jpz-app/Wallet">
              <div className="widget-value">
                <img height={20} src={WalletIcon} alt="Pung ikon" />
                <p>{post.walletCurrency},-</p>
              </div>
            </NavLink>
          ))}
        </>
      ) : (
        <NavLink to="/projects/jpz-app/Wallet">
          <div className="widget-value">
            <p>👛</p>
            <p>0 kr.</p>
          </div>
        </NavLink>
      )}
    </div>
  )
}

export default WalletWidget