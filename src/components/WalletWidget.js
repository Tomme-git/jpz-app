import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPostsData } from '../utils/walletUtils';

function WalletWidget() {
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
  const [walletAmount, setWalletAmount] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      await getPostsData(setPosts, setWalletAmount, setIsPosts);
    }
    fetchData();
    console.log(walletAmount); // false = ok! (the widget is READ ONLY)
  }, []);
  return (
    <div className="wallet-widget">
      {isPosts ? (
        <>
          {posts.map((post) => (
            <NavLink to="/projects/jpz-app/Wallet">
              <div key={post.id} className="widget-value">
                <p>👛</p>
                <p>{post.walletCurrency} kr.</p>
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