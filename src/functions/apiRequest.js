const getRequestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};

const deleteRequestOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
};

const postRequestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const get = async (urlParams, module, url = null) => {
    return await fetch((url) ? url : process.env.REACT_APP_API_ENDPOINT + module + '/' + urlParams, getRequestOptions);
}

export const getList = async (urlQueryParams, module, url = null) => {
    return await fetch((url) ? url : process.env.REACT_APP_API_ENDPOINT + module + '?' + new URLSearchParams(urlQueryParams), getRequestOptions);
}

export const post = async (values, module) => {
    postRequestOptions.body = JSON.stringify(values);
    return await fetch(process.env.REACT_APP_API_ENDPOINT + module, postRequestOptions);
}

export const deleteEntry = async (urlParams, module, url = null) => {
    return await fetch((url) ? url : process.env.REACT_APP_API_ENDPOINT + module + '/' + urlParams, deleteRequestOptions);
}
