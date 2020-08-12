let articleName;

async function render(){
    $('#articles ul').empty()

    const response = await fetch('https://wikipollia.herokuapp.com/article/trending')
    // const response = await fetch('http://localhost:3000/article/trending')
    const articles = await response.json()
    articles.forEach(a=>{
        // $('#articles ul').append($('<li>').text(`${a.title}: ${a.score}`).addClass('frosted'))
        $('#articles ul').append(
            $('<li>')
            .attr('article', a.title)
            .append($('<span>').text(a.title))
            .append($('<span>').text(a.score))
            .on('click',event =>{
                event.preventDefault()
                articleName = event.target.attributes.getNamedItem('article').value
                $('#title h4').text("Selected title:")
                $('#title p').text(articleName)

            })
            .addClass('frosted topArticle'))
    })
}

async function doPost(obj){
        try{
            // const postreq = await fetch('http://localhost:3000/vote',{
            const postreq = await fetch('https://wikipollia.herokuapp.com/vote',{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(obj)
    });
    // const thejson = await postreq.json()
        }catch(err){
            console.error(err);
        }
}

async function sendVote(event){
    event.preventDefault()
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
    $('#title').text(articleName)
}



$('#voteform button').on('click', async (event)=>{
    event.preventDefault()
    const upvote = event.target.attributes.getNamedItem('id').value === 'upvote'
    const postable = {
        up:upvote,
        article:articleName,
        comment:$('#comment').val()
    }
    await doPost(postable)
    render()
})

$('#searchform button').on('click', async event =>{
    event.preventDefault()
    $('#results').empty()
    const searchTerm = $('#query').val()
    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm}&limit=5&namespace=0&format=json&origin=*`)
    //&origin=*' from https://stackoverflow.com/a/38921370/9608521
    const results = await response.json()
    results[1].forEach(r=>{
        $('#results').append($('<li>').append($('<div>').addClass('frosted searchresult').text(r).on('click',setName)))
    })

})
render()
