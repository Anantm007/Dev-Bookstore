// Create category
export const createCategory = async(userId, token, category) => {
    return fetch(`/api/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Create product
export const createProduct = async(userId, token, product) => {
    return fetch(`/api/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
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