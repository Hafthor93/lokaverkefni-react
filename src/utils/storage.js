export const findOrder = (email) => {
    return JSON.parse(localStorage.getItem(email)) || {};
}

export const createNewOrder = (meal) => {
    const newOrder = JSON.parse(localStorage.getItem('newOrder'));
    localStorage.setItem('newOrder', JSON.stringify({ ...newOrder, meal }));
}

export const addDrinksToNewOrder = (drinks) => {
    const newOrder = JSON.parse(localStorage.getItem('newOrder'));
    localStorage.setItem('newOrder', JSON.stringify({ ...newOrder, drinks }));
}

export const addInfoToNewOrder = (info) => {
    const newOrder = JSON.parse(localStorage.getItem('newOrder'));
    localStorage.setItem('newOrder', JSON.stringify({ ...newOrder, info }));
}

export const createOrderWithEmail = (info) => {
    const newOrder = JSON.parse(localStorage.getItem('newOrder'));
    const email = info.email;
    localStorage.setItem(email, JSON.stringify({ ...newOrder, info }));
    localStorage.removeItem('newOrder');
}

export const getCurrentOrder = () => {
    return JSON.parse(localStorage.getItem('newOrder'));
}

export const updateMeal = (email, meal) => {
    const order = findOrder(email);
    localStorage.setItem(email, JSON.stringify({ ...order, meal }));
}
export const updateDrinks = (email, drinks) => {
    const order = findOrder(email);
    localStorage.setItem(email, JSON.stringify({ ...order, drinks }));
}
export const updateInfo = (email, info) => {
    const order = findOrder(email);
    if(email !== info.email){
        localStorage.setItem(info.email, JSON.stringify({ ...order, info }));
        localStorage.removeItem(email);
    }
    else {
        localStorage.setItem(email, JSON.stringify({ ...order, info }));
    }
}