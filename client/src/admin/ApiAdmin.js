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
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

// Fetch all orders for admin
export const listOrders = (userId, token) => {
    return fetch(`/api/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
}

// Get status values of all orders
export const getStatusValues = (userId, token) => {
    return fetch(`/api/order/status-values/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Update status values
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`/api/order/${orderId}/status/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Get all products
export const getProducts = () => {
    return fetch(`/api/products?limit=100`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// Get a single product
export const getProduct = (productId) => {
    return fetch(`/api/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


// Update a product
export const updateProduct = (productId, userId, token, productData) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: productData   // not stringify because we are using form data as image is also there
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Delete a product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`/api/product/${productId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};