const {db} = require("../config/dbconfig")



exports.userInfo = (req,res)=>{
    const {name,email} = req.user;
    if(!name || !email){
        return res.status(400).json({
            message: "please sign in"
        })
    }

    const query = "SELECT u.full_name, u.email, DATE_FORMAT(ud.date_of_birth, '%Y-%m-%d') as date_of_birth , ud.phone_number, ud.address, ud.profile_picture FROM users as u JOIN user_data as ud on u.id = user_id WHERE u.email = ?"

    db.query(query,[email],(err,result)=>{
        if(err){
            return res.status(400).json({message: err.sqlMessage})
        }
        res.status(200).json({Data: result})
    })


}