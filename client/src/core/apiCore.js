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