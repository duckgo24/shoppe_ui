const Bill = require('../models/Bill');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class BillController {
    //POST
    async create(req, res, next) {
        console.log(req.body);
        await Bill.create(req.body)
            .then(() => {
                res.json({ message: 'Bill created successfully' });
            })
            .catch(next);
    }

    //GET
    async findBillById(req, res, next) {
        const { id } = req.params;
        try {
            const bill = await Bill.findById(id);

            if (bill) {
                res.json(mongooseToObject(bill));
            } else {
                res.json({ message: 'No bill found' });
            }
        } catch (error) {
            next(error);
        }
    }
    //GET
    async findBillByAccount(req, res, next) {
        console.log(req.query);
        try {
            const { account, isPaid } = req.query;

            const query = {};
            if (account) query.account = account;
            if (isPaid !== undefined) query.isPaid = isPaid === 'true';

            const bills = await Bill.find(query);
            if (bills) {
                res.json(mutipleMongooseToObject(bills));
            } else {
                res.json({ message: 'No bills found' });
            }
        } catch (error) {
            console.error('Error finding bills:', error);
            next(error);
        }
    }

    //PUT
    async update(req, res, next) {
        const { id } = req.params;
        const data = req.body;
        await Bill.updateOne({ _id: id }, data)
            .then(() => {
                res.json({ message: 'Bill updated successfully' });
            })
            .catch(next);
    }

    //DELETE
    async delete(req, res, next) {
        const { id } = req.params;
        await Bill.findByIdAndDelete({ _id: id })
            .then(() => {
                res.json({ message: 'Bill deleted successfully' });
            })
            .catch(next);
    }
}

module.exports = new BillController();
