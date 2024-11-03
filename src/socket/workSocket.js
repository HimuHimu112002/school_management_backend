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
