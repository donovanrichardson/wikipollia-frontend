async function render(){
    const response = await fetch('https://wikipollia.herokuapp.com/')
    const value = await response.json()
    $('body').text(value.hello)

}


render()
