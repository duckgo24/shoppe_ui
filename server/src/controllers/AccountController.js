const Account = require('../models/Account');
const { mongooseToObject, mutipleMongooseToObject } = require('../utils/mongoose');

class AccountController {
    // GET
    async search(req, res, next) {
        try {
            const { username, password } = req.query;
            const account = await Account.findOne({ username, password });
            if (!account) {
                return res.json({ message: 'Not Found' });
            }
            res.status(200).json({ data: mongooseToObject(account) });
        } catch (error) {
            next(error);
        }
    }

    //POST
    async insert(req, res, next) {
        try {
            const { username, password } = req.body;


            const checkExitAccount = await Account.findOne({ username });
            if (checkExitAccount) {
                return res.json({ 
                    message: 'Account already exists',
                    status: 400
                 });
            }

            const account = await Account.create({ username, password });
            if(account) {
                res.json({
                    data: {
                        id: account._id,
                        username: account.username,
                        password: account.password,
                    },
                    status: 200
                });
            }
            
        } catch (error) {
            next(error);
        }
    }

    //GET
    async stores(req, res, next) {
        try {
            const accounts = await Account.find({});
            res.json(mutipleMongooseToObject(accounts));
        } catch (error) {
            next(error);
        }
    }

    //GET
    async getAccountIdByUsername(req, res, next) {
        const { username } = req.query;
        const account = await Account.findOne({ username: username });
        if (account) {
            res.json(mongooseToObject(account));
        } else {
            res.json({ message: 'NOT OKE' });
        }
    }

     //PUT
    async update(req, res, next) {
        console.log(req.body);
        Account
            .updateOne({_id: req.params.id} , req.body)
            .then(() => {
                res.status(200).json({message: "Sửa thành công"})
            })
            .catch(next)
    }


    //DELETE
    delete(req, res, next) {
        Account
            .findOneAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json({message: "Xóa thành công"})
            })
            .catch(next)
    }
}

module.exports = new AccountController();
