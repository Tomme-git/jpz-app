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
      yearCards: post.yearCards,
      tickets: post.tickets
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
        updatedArmbands[i] = { "user": armband.user, "armbandCurrency": armband.armbandCurrency + amount, "armbandNumber": armband.armbandNumber };
      } else {
        updatedArmbands[i] = { "user": armbandsObj[i].user, "armbandCurrency": armbandsObj[i].armbandCurrency, "armbandNumber": armbandsObj[i].armbandNumber };
      };
    };
    const updatedArray = {
      walletCurrency: updatedWalletCurrency,
      armbands: updatedArmbands,
      yearCards: post.yearCards,
      tickets: post.tickets
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

export async function addArmband(userUrl, name, armbandNumber) {
  try {
    const response = await fetch(userUrl);
    const data = await response.json();
    let armbands = data.armbands;
    if (armbands) {
      armbands.push({ user: name, armbandCurrency: 0, armbandNumber: armbandNumber })
    } else {
      armbands = [{ user: name, armbandCurrency: 0, armbandNumber: armbandNumber }]
    }
    const updatedarmbands = { ...data, armbands }
    await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedarmbands),
    });
    return { notifyParams: { name: name, armbandNumber: armbandNumber } }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create year card.');
  }
}

export async function addYearCard(userUrl, name, ageGroup) {
  let d = new Date();
  let nextYear = d.getFullYear() + 1;
  let month = d.getMonth() + 1;
  let day = d.getDate();
  let nextYearDate = day + '/' + month + '/' + nextYear;
  try {
    const response = await fetch(userUrl);
    const data = await response.json();
    let yearCards = data.yearCards;
    if (yearCards) {
      yearCards.push({ name: name, type: ageGroup, active: "yes", endDate: nextYearDate })
    } else {
      yearCards = [{ name: name, type: ageGroup, active: "yes", endDate: nextYearDate }]
    }
    const updatedYearCards = { ...data, yearCards }
    await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedYearCards),
    });
    return { yearCards: yearCards, notifyParams: { name: name } }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to create year card.');
  }
}

export async function buyTickets(userUrl, amount, cost) {
  try {
    const response = await fetch(userUrl);
    const data = await response.json();

    const updatedWalletCurrency = data.walletCurrency - cost;
    const updatedTicketAmount = data.tickets + amount
    const updatedArray = {
      walletCurrency: updatedWalletCurrency,
      armbands: data.armbands,
      yearCards: data.yearCards,
      tickets: updatedTicketAmount
    };
    await fetch(userUrl, {
      method: "PUT",
      body: JSON.stringify(updatedArray),
    });
    return { walletCurrency: updatedWalletCurrency, notifyParams: { ticketsBought: amount } }
  } catch (error) {
    console.log(error);
    throw new Error('Failed to buy tickets.');
  }
}