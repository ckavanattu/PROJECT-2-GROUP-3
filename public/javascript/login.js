async function login(event) {
event.preventDefault();

const email = document.getElementById ("login-email").value.trim();
const password = document.getElementById("login-password").value.trim();

if (email && password) {
    const response = await fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    if(response.ok) {
        alert ("Logged In")
        document.location.replace('/')

    } else {
        alert(response.statusText);
    }
}


}

async function signup(event) {
    event.preventDefault();

    const email = document.getElementById("signup-email").value.trim();
    const username = document.getElementById ("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            alert("Thank you for signing up!")
            document.location.replace('/')
        } else{
            alert(response.statusText);
        }
    }
   
}

function home ()  {
    document.location.replace('/')

}


document.getElementById("modalOne").addEventListener("submit", login)
document.getElementById("modalTwo").addEventListener("submit", signup)
document.getElementById("home").addEventListener("click", home)