
const Bill = require('../models/Bill');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class BillController {
    //POST
    async create(req, res, next) {
        console.log(req.body);
        await Bill
            .create(req.body)
            .then(() => {
                res.json({ message: "Bill created successfully" });
            })
            .catch(next);
    }

    //GET
    async findBill(req, res, next) {
        try {
            const { userId, isPaid } = req.query;
            console.log(req.query);
    
            const query = {};
            if (userId) query.user = userId;
            if (isPaid !== undefined) query.isPaid = isPaid === 'true';
    
            const bills = await Bill.find(query);
            res.json(mutipleMongooseToObject(bills));
        } catch (error) {
            next(error);
        }
    }

    //PUT
    async update(req, res, next) {
        const { id } = req.params;
        const data = req.body;
        await Bill
            .updateOne({ _id: id }, data)
            .then(() => {
                res.json({ message: "Bill updated successfully" });
            })
            .catch(next);
    }

    //DELETE
    async delete(req, res, next) {
        const { id } = req.params;
        await Bill
            .findByIdAndDelete({ _id: id })
            .then(() => {
                res.json({ message: "Bill deleted successfully" });
            })
            .catch(next);
    }
    
}

module.exports = new BillController();