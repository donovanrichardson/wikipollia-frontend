async function render(){
    $('#articles').empty()
    const response = await fetch('https://wikipollia.herokuapp.com/article')
    const articles = await response.json()
    articles.forEach(a=>{
        $('#articles').append($('<li>').text(a))
    })
}

async function sendVote(event){
    const theVote = {
        up:true,
        oldid:1,
        article:$('#title').val(),
        comment:$('#commnet').val(),
    }
    console.log(theVote);
    //snippet from https://stackoverflow.com/a/29823632/9608521
    // try{
        const rawResponse = await fetch('https://wikipollia.herokuapp.com/vote', {
            method: 'POST',
            // headers: {
            //   'Accept': 'application/json',
            //   'Content-Type': 'application/json'
            // },
            body: JSON.stringify(theVote)
          });
        //   const content = await rawResponse.json();

    // }catch(err){
    //     console.error(err)
    // }

      render()
}

$('form button').on('click',sendVote)
render()
