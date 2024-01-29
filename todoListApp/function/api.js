
export const callApi = async (url, options = {}) => {
    
    const headers = { Accept: "application/json", ...options.headers}
    const r = await fetch(url, {...options, headers})
    if (r.ok) {
        return r.json()
    }
    throw new Error('server erreur', {cause: r})
    
    
}

//callApi('/assets/entri.json', options)

/*const options = {
    title: 'Hi',
    v: 'vvv',
    headeers: {
        f: 'Going out'
    }
}
*/