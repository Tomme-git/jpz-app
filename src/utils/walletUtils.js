export async function getPostsData() {
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
      return { posts: postsArray, isPosts: postsArray.length > 0 };
    } else {
      return { posts: [], isPosts: false };
    }
  } catch (error) {
    console.log(error);
    return { posts: [], isPosts: false };
  }
}

export async function addMoney(userUrl, amount, post) {
  try {
    const updatedWalletCurrency = post.walletCurrency + amount;
    const updatedArray = {
      walletCurrency: updatedWalletCurrency,
      armbands: post.armbands,
      yearCards: post.yearCards
    };
    await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedArray),
    });
    return { walletCurrency: updatedWalletCurrency, notifyParams: { amountAdded: amount } }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to add money.');
  }
}

export async function moneyToArmband(userUrl, amount, armband, post) {
  try {
    const updatedWalletCurrency = post.walletCurrency - amount;
    const armbandsObj = post.armbands;
    const updatedArmbands = {};
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
      yearCards: post.yearCards
    };
    await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedArray),
    });
    return { walletCurrency: updatedWalletCurrency, notifyParams: { amountAdded: amount, person: armband.user } }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to transfer money.');
  }
}