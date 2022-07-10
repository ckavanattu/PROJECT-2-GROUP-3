
async function reviewHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-input"]').value.trim();
    
    if(comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                comment_text
            }),
            headers: {
                'Content-Type':  'application/json'
            }
        });

        if(response.ok) {
            alert("review submitted!");
            document.location.reload();
        } else{
            alert(response.statusText);
        }
        
    }

}




document.getElementById('comment').addEventListener('submit', reviewHandler)