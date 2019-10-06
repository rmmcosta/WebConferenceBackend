const participantCreate = function (name,email){
    console.log(name,email);
    return {"name":name,"email":email}
}

module.exports.participantCreate = participantCreate;