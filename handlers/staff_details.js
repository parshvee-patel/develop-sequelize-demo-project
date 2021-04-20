import StaffDB from "../sequelize";
import { passwordfunction } from "../helpers"

/**
 * This method is to create the staff
 */
const createStaff = async(req, res) => {
    try {
        /**
         * Create a staff
         */
        const staffData = await StaffDB.StaffDetails.create({
            firstName: req.firstName,
            lastName: req.lastName,
            email: req.email,
            password: await passwordfunction.encryptPassword(req.password),
            contactNo: req.contactNo,
            address: req.address,
            city: req.city,
            zipCode: req.zipCode,
            profileImage: req.profileImage,
        });
        return staffData;
    } catch (err) {
        console.error("Error While Create Staff", err);
    }
};

/**
 * Get Staff Details Function
 */
const getStaff = async() => {
    try {
        const staffData = await StaffDB.StaffDetails.findAll({
            attributes: [
                "firstName", "lastName", "email", "contactNo", "address"
            ]
        });
        return staffData;
    } catch (err) {
        console.error("Error While Get staff details", err);
    }
};

/**
 * Get Staff Details by Id Function
 */
const getStaffById = async(id) => {
    try {
        const staff = await StaffDB.StaffDetails.findOne({
            where: {
                id: id,
            },
        });
        return staff;
    } catch (err) {
        console.error("Error While Get staff details by id", err);
    }
};

/**
 * Update Staff Details by Id Function
 */
const updateStaffById = async(dataDetails, params) => {
    try {
        const staffData = {
            firstName: dataDetails.firstName,
            lastName: dataDetails.lastName,
            email: dataDetails.email,
            password: await passwordfunction.encryptPassword(dataDetails.password),
            contactNo: dataDetails.contactNo,
            address: dataDetails.address,
            city: dataDetails.city,
            zipCode: dataDetails.zipCode,
            profileImage: dataDetails.profileImage,
        }
        const staff = await StaffDB.StaffDetails
            .update(staffData, {
                where: {
                    id: params.id
                }
            })
        return staff
    } catch (err) {
        console.error("Error While Update staff details by id", err)
    }
};

/**
 * Delete Staff Details by Id Function
 */
const deleteStaffById = async(id) => {
    try {
        const staff = await StaffDB.StaffDetails.destroy({
            where: {
                id: id
            }
        })
        return staff
    } catch (err) {
        console.error("Error While Delete staff details by id", err)
    }
};

const Staffdetails = {
    createStaff,
    getStaff,
    getStaffById,
    updateStaffById,
    deleteStaffById,
};

export { Staffdetails };