var store=require('store');
var users=[];
var chats=[];

exports.addUser = function(userName) {
  if(users.length>0){
      for(var i=0;i<users.length;i++){
          if(users[i].toLocaleLowerCase()==userName.toLocaleLowerCase()){
              ispresent=true;
              return;
          }
      }           
  }
  users.push(userName);
  store.set('users',users);
};

exports.getUsers = function() {
  return users;
};

exports.updateChat = function(sourceUser,message) {
  return "HELLO";
};

exports.getChat = function(sourceUser,destUset,message) {
  return "HELLO";
};

