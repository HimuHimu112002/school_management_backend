const AdminModel = require("../model/AdminModel");
const AuthModel = require("../model/googleAuth");
const UserModel = require("../model/UserModel");

const workSocket = (io, socket) => {
  socket.on("adminDelete", async (id, user) => {
    let deletData = await AdminModel.find({ _id: id });
    let deletDataFromUser = await AdminModel.find({ user: user });
    // delete from admin model
    let deleteAdmin = await AdminModel.findByIdAndDelete({
      _id: deletData[0]._id,
    });
    // delete from user model
    let deleteAdminUser = await UserModel.findByIdAndDelete({
      _id: deletDataFromUser[0].user,
    });
    let deleteAuthUser = await AuthModel.findByIdAndDelete({
      _id: deletDataFromUser[0].user,
    });
    socket.emit("deleteAdmin", deleteAdmin);
    if (deleteAdminUser) {
      socket.emit("deleteAdminUser", deleteAdminUser);
    } else if (deleteAuthUser) {
      socket.emit("deleteAuthUser", deleteAuthUser);
    }
  });

  socket.on("adminStatus", async (id, value, user) => {
    let updateAdminStatus = await AdminModel.findByIdAndUpdate(
      { _id: id },
      { AdminStatus: value },
      { new: true }
    );
    let updateUserStatus = await UserModel.findByIdAndUpdate(
      { _id: user },
      { userStatus: value },
      { new: true }
    );
    socket.emit("updateAdminStatus", updateAdminStatus);
    socket.emit("updateUserStatus", updateUserStatus);
  });
};
module.exports = workSocket;
