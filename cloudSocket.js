//Load Cloud Model

function cloudSocket(socket) {
  const responseData = {
    error: true,
    errordata: {},
    message: "Error Occured!",
    data: {}
  };

  socket.on("reload_clouds", userID => {
    console.log("received from client", userID);
    if (userID) {
      Cloud.find({ user: userID })
        .sort({ date: -1 })
        .then(clouds => {
          responseData.error = false;
          responseData.message = "Records found";
          responseData.data = { clouds };
          socket.emit(userID, responseData);
        })
        .catch(err => {
          responseData.message = "No Record found";
          responseData.data = err;
          socket.emit(userID, responseData);
        });
    }
  });
}

module.exports = cloudSocket;
