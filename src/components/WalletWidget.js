import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getPostsData } from '../utils/firebaseUtils';

function WalletWidget({ widgetKey }) {
  const [posts, setPosts] = useState([]);
  const [isPosts, setIsPosts] = useState(true);
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

  }, [widgetKey]);
  return (
    <div className="wallet-widget">
      {isPosts ? (
        <>
          {posts.map((post) => (
            <NavLink key={post.id} to="/projects/jpz-app/Wallet">
              <div className="widget-value">
                <div className="wallet-icon"></div>
                <p>{post.walletCurrency},-</p>
              </div>
            </NavLink>
          ))}
        </>
      ) : (
        <NavLink to="/projects/jpz-app/Wallet">
          <div className="widget-value">
            <div className="wallet-icon"></div>
            <p>0 kr.</p>
          </div>
        </NavLink>
      )}
    </div>
  )
}

export default WalletWidget