async function signup(event){
  try{
    event.preventDefault();
    console.log(event.target.email.value);

    const signupDetails = {
      fullName : event.target.fullName.value,
      email : event.target.email.value,
      password: event.target.password.value
    }

    console.log(signupDetails)
    const response = await axios.post('http://localhost:3000/user/signup',signupDetails)
    

    if(response.status === 201){
      window.location.href = "./login.html"
    }
    else{
      throw new Error('Failed to login')
    }
  }
  catch(err){
    document.body.innerHTML += `<div style ="color:red;>${err}</div>`;
    console.log(err);
  }
}