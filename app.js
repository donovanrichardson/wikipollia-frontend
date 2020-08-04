async function render(){
    $('#articles').empty()

    const response = await fetch('https://wikipollia.herokuapp.com/article')
    const articles = await response.json()
    articles.forEach(a=>{
        $('#articles').append($('<li>').text(a))
    })
}

async function doPost(obj){
    // console.log(
        try{
            const postreq = await fetch('https://wikipollia.herokuapp.com/vote',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
    });
    console.log(await postreq.json())
        }catch(err){
            console.error(err);
        }
}

async function sendVote(event){
    console.log(event);
    event.preventDefault()
    console.log($('#title').val(),$('#comment').val());
    myobj = {
        up:1,
        oldid:1,
        article:$('#title').val(),
        comment:$('#comment').val()
    }
    await doPost(myobj)
}

$('form button').on('click', async (event)=>{
    event.preventDefault()
    await doPost({
        up:1,
        oldid:1,
        article:$('#title').val(),
        comment:$('#comment').val()
    })
    /* await  */render()
})
render()
