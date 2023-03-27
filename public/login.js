
function login(event){

  event.preventDefault();

  console.log(event.target.name);

  const loginDetails = {
    email: event.target.email.value,
    password: event.target.email.value,
  }

  console.log(loginDetails);

  axios.post('http://localhost:3000/user/login',loginDetails)
  .then(response => {
    if(response.status === 200){
      alert(response.data.message);
    }
    else{
      throw new Error(response.data.message)
    }
  })
  .catch(err => {
    console.log(JSON.stringify(err))
    document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
  })
}