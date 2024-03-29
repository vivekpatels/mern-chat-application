import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;

        // this will filter and give all users except for the one who is logged in.
        const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);

        
    } catch (error) {
        console.log("Error in getUsersForSidebar");
        res.status(500).json({error: "Internal server error"})
    }
}