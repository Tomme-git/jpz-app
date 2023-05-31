export async function getPostsData(setPosts, setWalletAmount, setIsPosts) {
  try {
    const url =
      "https://jpz-app-default-rtdb.europe-west1.firebasedatabase.app/userCurrency.json";

    const response = await fetch(url);
    const data = await response.json();

    if (data !== null) {
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setPosts(postsArray);
      setWalletAmount(data["walletCurrency"]);
    } else {
      setIsPosts(false);
    }
  } catch (error) {
    console.log(error);
    setIsPosts(false);
  }
}

export async function addMoney(userUrl, setWalletAmount, amount, post) {
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
  console.log(data);

  setWalletAmount(updatedWalletCurrency);
}

export async function moneyToArmband(userUrl, setWalletAmount, setArmbandAmount, amount, armband, post) {
  const updatedWalletCurrency = post.walletCurrency - amount;
  const updatedArmbandCurrency = armband.armbandCurrency + amount;

  const armbandsObj = post.armbands;
  let updatedArmbands = {};
  for (let i = 0; i < armbandsObj.length; i++) {
    if (armbandsObj[i].user === armband.user) {
      updatedArmbands[i] = { "user": armband.user, "armbandCurrency": armband.armbandCurrency + amount };
    } else {
      updatedArmbands[i] = { "user": armbandsObj[i].user, "armbandCurrency": armbandsObj[i].armbandCurrency };
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
  console.log(data);
  setWalletAmount(updatedWalletCurrency);
  setArmbandAmount(updatedArmbandCurrency);
}