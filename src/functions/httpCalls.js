function doFetch(url,body, method) {
    console.log(body)
    //send api
    fetch(url, {
        method: method,
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((data) => console.log(data));

    //if ok then update state

}