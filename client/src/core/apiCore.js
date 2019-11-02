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
