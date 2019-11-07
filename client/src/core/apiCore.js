import queryString from 'query-string';

// Get products from backend
export const getProducts = (sortBy) => {
    return fetch(`/api/products?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 


// Get categories from backend
export const getCategories = () => {
    return fetch(`/api/categories`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

// Get products based on category and price filters
export const getFilteredProducts = async(skip, limit, filters = {}) => {
    const data = {
        limit, skip, filters
    };
    return fetch(`/api/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Get categpry based on search on home page
export const list = params => {

    const query = queryString.stringify(params);

    return fetch(`/api/products/search?${query}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Get a single product from backend
export const read = (productId) => {
    return fetch(`/api/product/${productId}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Get related products from backend
export const listRelated = (productId) => {
    return fetch(`/api/products/related/${productId}`, {
        method: "GET"
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

// Get braintree client token from backend
export const getBraintreeClientToken = (userId, token) => {
    return fetch(`/api/braintree/getToken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    })
    .then(res => {
        return res.json()
    })
    .catch(err => console.log(err));
}

// Process final payment
export const processPayment = (userId, token, paymentData) => {
    return fetch(`/api/braintree/payment/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(paymentData)
    })
    .then(res => {
        return res.json(res)
    })
    .catch(err => console.log(err));
}

// Create order
export const createOrder = (userId, token, createOrderData) => {
    return fetch(`/api/order/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ order: createOrderData })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};