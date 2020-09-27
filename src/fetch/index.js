const url = "https://noteque-backend.herokuapp.com/"

export const postNote = async (body) => {
    const data = await fetch(`${url}users/newnote`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    return await data.json();
}

export const updateNote = async (body) => {
    const data = await fetch(`${url}users/updatenote`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    return await data.json();
}

export const deleteNote = async (body) => {
    const data = await fetch(`${url}users/deletenote`, {
        method: "DELETE",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        }
    })
    return await data.json();
}

export const pinNote = async (body) => {
    const data = await fetch(`${url}users/pinnote`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json",
        }
    })
    return await data.json();
}

export const createUser = async (body) => {
    const data = await fetch(`${url}users`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    return await data.json();
}

export const getUser = async (token) => {
    const data = await fetch(`${url}users/me`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "token": token
        }
    })
    return await data.json();
}

export const loginUser = async (body) => {
    const data = await fetch(`${url}login`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    return await data.json();
}




