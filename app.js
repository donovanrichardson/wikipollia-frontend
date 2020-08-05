async function render(){
    $('#articles').empty()

    const response = await fetch('https://wikipollia.herokuapp.com/article')
    const articles = await response.json()
    articles.forEach(a=>{
        $('#articles').append($('<li>').text(`${a.title}: ${a.score}`))
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
    // console.log(postreq);
    console.log(obj);
    const thejson = await postreq.json()
    console.log(thejson);
        }catch(err){
            console.error(err);
            console.log(err);
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

async function setName(event){
    event.preventDefault();
    articleName = event.target.innerHTML
    // console.log(articleName);
    $('#title').text(articleName)
}

let articleName;

$('#voteform button').on('click', async (event)=>{
    event.preventDefault()
    const upvote = event.target.attributes.getNamedItem('id').value === 'upvote'
    // console.log(upvote);
    const postable = {
        up:upvote,
        article:articleName,
        comment:$('#comment').val()
    }
    console.log(postable);
    await doPost(postable)
    /* await  */render()
})

$('#searchform button').on('click', async event =>{
    event.preventDefault()
    $('#results').empty()
    const searchTerm = $('#query').val()
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&limit=10&namespace=0&format=json&origin=*`)
    //&origin=*' from https://stackoverflow.com/a/38921370/9608521
    const results = await response.json()
    results[1].forEach(r=>{
        $('#results').append($('<li>').append($('<button>').text(r).on('click',setName)))
    })

})
render()
