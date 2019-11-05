// Add item to local storage
export const addItem = (item, next) => {
    let cart = []
    if(typeof window !== undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.push({
            ...item, 
            count: 1
        })

        // remove duplicates
        // build array from new set and turn it back nito array using Array.from so that later we can re-map it
        // now set will only allow unique values in it 
        // so pass the ids of each product
        // If loop tries to add same value again, it will get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product
        
        cart = Array.from(new Set(cart.map((p) => (p._id) ))).map(id => {
            return cart.find(p => p._id === id)
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

// Return total length of cart
export const itemTotal = () => {
    if(typeof window !== undefined )
    {
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem("cart")).length;
        }
    }
    
    // By default
    return 0;
}

// Get cart
export const getCart = () => {
    if(typeof window !== undefined )
    {
        if(localStorage.getItem('cart'))
        {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }

    return [];
    
}

// Update cart item
export const updateItem = (productId, count) => {
    let cart = [];

    if(typeof window !== undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.forEach((p) => {
            if(p._id === productId)
            {
                p.count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return;
}

// Remove item from cart
export const removeItem = (productId) => {
    let cart = [];

    if(typeof window !== undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.forEach((p,i) => {
            if(p._id === productId)
            {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

    return cart;
};

// Empty cart after successfull purchase
export const emptyCart = next => {
    if(typeof window !== "undefined")
    {
        localStorage.removeItem('cart')
        next()
    }
}