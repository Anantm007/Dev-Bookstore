// Read user  information from backend
export const read = (userId, token) => {
    return fetch(`/api/user/${userId}`, {
        method: 'GET',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
} 

// Update profile
export const update = (userId, token, userData) => {
    return fetch(`/api/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

// Update user in local storage
export const updateUser = (user, next) => {
    if(typeof window !== 'undefined')
    {
        if(localStorage.getItem('jwt'))
        {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}

// Get purchase history
export const getPurchaseHistory = (userId, token) => {
    return fetch(`/api/orders/by/user/${userId}`, {
        method: "GET",
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