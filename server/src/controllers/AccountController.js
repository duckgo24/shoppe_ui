const Account = require('../models/Account');
const { mongooseToObject, mutipleMongooseToObject } = require('../utils/mongoose');

class AccountController {
    // GET
    async search(req, res, next) {
        try {
            const { username, password } = req.query;
            const account = await Account.findOne({ username, password });
            if (!account) {
                return res.json({ message: "Not Found" });
            }
            res.status(200).json({ data: mongooseToObject(account)});
        } catch (error) {
            next(error);
        }
    } 
    
    //POST
    async insert(req, res, next) {
        console.log(req.body);
        try {
            const {username, password } = req.body;
            await Account
                .create({ username, password })
                .then(() => res.json({ message: "OKE" }))
        } catch (error) {
            next(error);
        }
    }

    async stores(req, res, next) {
        try {
            const accounts = await Account.find({});
            res.json(mutipleMongooseToObject(accounts));
        } catch (error) {
            next(error);
        }
    } 

    async getAccountIdByUsername(req, res, next) {
        const { username } = req.query;
        const account = await Account.findOne({ username: username })
        if (account) {
            res.json(mongooseToObject(account));
        }else {
            res.json({ message: "NOT OKE" })
        }
        
    }
}

module.exports = new AccountController();
