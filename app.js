async function render(){
    $('#articles').empty()
    const response = await fetch('http://localhost:3000/article')
    const articles = await response.json()
    articles.forEach(a=>{
        $('#articles').append($('<li>').text(a))
    })
}

async function sendVote(event){
    console.log(event);
    const response = await fetch('http://localhost:3000/vote', {
        method:"POST",
        "Content-Type":"application/json"
    })
    console.log(await response.json());
    render()
}

$('form button').on('click',sendVote)
render()
