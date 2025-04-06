import { login } from "./auth.js" 

const loginForm = document.getElementById("loginForm")
console.log("hola mundo")

if(loginForm){
    loginForm.addEventListener("submit", async (e)=>{
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        console.log('datos:', email,password)

        try {
            await login(email, password)
            window.location.href = 'dashboard.html'
        } catch (error) {
            alert('error al intentar iniciar sesion: ' + error.message)
        }
    })
}


