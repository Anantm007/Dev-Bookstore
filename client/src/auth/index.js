// Register User
export const signup = async user => {
    return fetch(`/api/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Login User
export const signin = async user => {
    return fetch(`/api/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
}

// Save token in storage
export const authenticate = (data, next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

// Signout so destroy the local token
export const signout = (next) => {
    if(typeof window !== 'undefined')
    {
        localStorage.removeItem('jwt');
        next();
        return fetch('/api/signout', {
            method: "GET"
        })
        .then(response => {
            console.log("signout", response);
        })
        .catch(err => console.log(err));
    }
};

// Return if user is authenticated or not
export const isAuthenticated = () => {
    if(typeof window == 'undefined')
    {
        return false;
    }

    if(localStorage.getItem('jwt'))
    {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
}
