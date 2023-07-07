let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

menu.onclick = () =>{
   menu.classList.toggle('fa-times');
   navbar.classList.toggle('active');
};

window.onscroll = () =>{
   menu.classList.remove('fa-times');
   navbar.classList.remove('active');
};

let loadMoreBtn = document.querySelector('.packages .load-more .btn');
let currentItem = 3;

loadMoreBtn.onclick = () =>{
   let boxes = [...document.querySelectorAll('.packages .box-container .box')];
   for (var i = currentItem; i < currentItem + 3; i++){
      boxes[i].style.display = 'inline-block';
   };
   currentItem += 3;
   if(currentItem >= boxes.length){
      loadMoreBtn.style.display = 'none';
   }
}


function seterror(id,error){
   
   element=document.getElementById(id);
   element.getElementsByClassName('formerror')[0].innerHTML=error;
   

}

function validateForm(){
   
   var name=document.forms['myForm']["username"].value;

   
   if(name.length<5){
    seterror("name","Length is short");
     return false; 
   }
  
}


function validSignup(){
   var name=document.forms['SignupForm']["username"].value;
   var email=document.forms['SignupForm']["email"].value;
   var phone_num=document.forms['SignupForm']["phone"].value;
   var pass_word=document.forms['SignupForm']["password"].value;

   var check=email.indexOf('@');

   if(pass_word.length<6){
      seterror("pswd","Length is invalid");
      return false;
   }
   if(check==-1){
      seterror("email","Not valid Form");
      return false;
   }
   if(phone_num[0]!=9){
      console.log(phone_num[0]);
     seterror("phn","Not correct form");
      return false

   }
   if(phone_num.length>9){

      console.log(phone_num[0]);
     seterror("phn","Length is not correct");
      return false;
   }
   return true;
}

function validbook(){
   
  
   var phone_num=document.forms['bokform']["phone"].value;
   if(phone_num.length!=10){

      console.log(phone_num[0]);
     seterror("phn","Length is not correct");
      return false;
   }
   
   

}