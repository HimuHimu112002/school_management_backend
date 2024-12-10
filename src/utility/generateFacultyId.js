// const TeacherId = async () => {
//   const findLastFacultyId = async () => {
//     const lastFaculty = await TeacherModel.findOne(
//       { TeacherRole: "Teacher" },
//       {
//         id: 1,
//         _id: 0,
//       }
//     )
//       .sort({
//         createdAt: -1,
//       })
//       .lean();
//     return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
//   };
//   let currentId = (0).toString();
//   const lastFacultyId = await findLastFacultyId();
//   if (lastFacultyId) {
//     currentId = lastFacultyId.substring(2);
//   }
//   let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
//   return (incrementId = `T-${incrementId}`);
// };
// export default TeacherId;
