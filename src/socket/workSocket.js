const AdminModel = require("../model/AdminModel");
const UserModel = require("../model/UserModel");

const workSocket = (io, socket) => {
  socket.on("adminDelete", async (id, user) => {
    let deletData = await AdminModel.find({ _id: id });
    let deletDataFromUser = await AdminModel.find({ user: user });
    let deleteAdmin = await AdminModel.findByIdAndDelete({
      _id: deletData[0]._id,
    });
    let deleteAdminUser = await UserModel.findByIdAndDelete({
      _id: deletDataFromUser[0].user,
    });
    socket.emit("deleteAdmin", deleteAdmin);
    socket.emit("deleteAdminUser", deleteAdminUser);
  });
};
module.exports = workSocket;
