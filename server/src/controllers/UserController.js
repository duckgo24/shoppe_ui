const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class UserController {
    //[Post] 
    create(req, res, next) {
        const formData = req.body
        User 
        .create(formData)
        .then(() => {
            res.json({message: "User created successfully"})        
        })  
    }

    //[Get]
    async getInfoByAccId(req, res, next) {
        const accountId = req.query?.account;
        if (accountId) {
            try {
                const user = await User.findOne({ account: accountId });
                if (user) {
                    res.json(mongooseToObject(user));
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (err) {
                next(err);
            }
        } else {
            res.status(400).json({ message: 'Account ID not provided' });
        }
    }

    //PUT 
    async edit(req, res, next) {
        console.log(req.body);
        User
            .updateOne({account: req.params.id} , req.body)
            .then(() => {
                res.status(200).json({message: "Sửa thành công"})
            })
            .catch(next)
    }

    //DELETE 
    async deleteByAccId(req, res, next) {
        const accountId = req.query?.account;
        if (accountId) {
            try {
                const user = await User.findOneAndDelete({ account: accountId });
                if (user) {
                    res.json({ message: 'success' });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (err) {
                next(err);
            }
        } else {
            res.status(400).json({ message: 'Account ID not provided' });
        }
    }
    
    

    
}

module.exports = new UserController();