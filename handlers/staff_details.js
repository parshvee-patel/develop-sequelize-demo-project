import StaffDB from "../sequelize";

/**
 * Create Staff Details Function
 */
const createStaff = async (req ,res) => {
  try {

    const staffData = await StaffDB.StaffDetails.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: req.body.Password,
      ContactNo: req.body.ContactNo,
      Address: req.body.Address,
      City: req.body.City,
      ZipCode: req.body.ZipCode,
      ProfileImage: req.body.ProfileImage,
    });
    return staffData;
  } catch (err) {
    console.error("Error While Create Staff", err);
  }
};

/**
 * Get Staff Details Function
 */
const getStaff = async () => {
  console.log("get Staff Details Function");
  return true;
};

/**
 * Get Staff Details by Id Function
 */
const getStaffById = async () => {
  console.log("Get Staff Details By Id Function");
  return true;
};

/**
 * Update Staff Details by Id Function
 */
const updateStaffById = async () => {
  console.log("Update Staff Details By Id Function");
  return true;
};

/**
 * Delete Staff Details by Id Function
 */
const deleteStaffById = async () => {
  console.log("Delete Staff Details By Id Function");
  return true;
};

const Staffdetails = {
  createStaff,
  getStaff,
  getStaffById,
  updateStaffById,
  deleteStaffById,
};

export { Staffdetails };
