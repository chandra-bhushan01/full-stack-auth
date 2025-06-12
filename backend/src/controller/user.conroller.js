const { db } = require("../config/dbconfig")



exports.userInfo = (req, res) => {
    const { id, name } = req.user;
    if (!id || !name) {
        return res.status(400).json({
            message: "please sign in"
        })
    }

    const query = "SELECT u.full_name, u.email, DATE_FORMAT(ud.date_of_birth, '%Y-%m-%d') as date_of_birth , ud.phone_number, ud.address, ud.profile_picture FROM users as u JOIN user_data as ud on u.id = user_id WHERE u.id = ?"

    db.query(query, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: err.sqlMessage })
        }
        res.status(200).json({ Data: result })
    })
}

exports.updateInfo = (req, res) => {
    const { id, name } = req.user;
    const {
        address,
        date_of_birth,
        email,
        full_name,
        phone_number,
        profile_picture
    } = req.body;

    if (!id || !name) {
        return res.status(400).json({ message: "Please sign in" });
    }

    const updateUserQuery = `
        UPDATE users
        SET full_name = ?, email = ?
        WHERE id = ?;
    `;

    const updateUserDataQuery = `
        UPDATE user_data
        SET address = ?, date_of_birth = ?, phone_number = ?, profile_picture = ?
        WHERE user_id = ?;
    `;

    try {
        db.query(updateUserQuery, [full_name, email, id], (err1, result1) => {
            if (err1) {
                return res.status(400).json({ message: "Error updating user: " + err1 });
            }

            db.query(updateUserDataQuery, [address, date_of_birth, phone_number, profile_picture, id], (err2, result2) => {
                if (err2) {
                    return res.status(400).json({ message: "Error updating user_data: " + err2 });
                }

                return res.status(200).json({ message: "User information updated successfully." });
            });
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error: "+ error });
    }
};


