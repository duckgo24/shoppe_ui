const User = require('../models/User');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');
class UserController {
    //[Get]
    stores(req, res, next) {
        User.find({})
            .then((users) => {
                res.json(mutipleMongooseToObject(users));
            })
            .catch(next);
    }

    //[Post]
    create(req, res, next) {
        const formData = req.body;
        User.create(formData).then(() => {
            res.json({ res: formData, message: 'Tạo tài khoản thành công' });
        });
    }

    // [Post]
    async find(req, res, next) {
        const query = req.body;
        console.log(query);
        
        try {
            let dbQuery = {};
    
            if (query?.name) {
                dbQuery.name = { $regex: query.name, $options: 'i' };
            }
    
            if (query?.gender) {
                dbQuery.gender = { $regex: query.gender, $options: 'i' };
            }
    
            if (query?.phone) {
                dbQuery.phone = { $regex: query.phone, $options: 'i' };
            }

      
    
    
            const data = await User.find(dbQuery && dbQuery.length > 0 ? dbQuery : query);
            if (data && data.length > 0) {
                res.json(mutipleMongooseToObject(data));
            } else {
                res.status(404).json({ message: 'No users found' });
            }
        } catch (error) {
            next(error);
        }
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
    edit(req, res, next) {
        User
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.status(200).json({ message: 'Sửa thành công' });
            })
            .catch(next);
    }



    //DELETE
    delete(req, res, next) {
        User
            .findOneAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'Xóa thành công' });
            })
            .catch(next);
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
