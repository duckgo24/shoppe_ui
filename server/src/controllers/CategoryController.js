const Category = require('../models/Category');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class CategoryController {
    // GET
    getAll(req, res, next) {
        Category
            .find({})
            .then((categories) => {
                res.json(mutipleMongooseToObject(categories));
            })
            .catch(next);
    }

    // POST
    create(req, res, next) {
        Category.create(req.body)
            .then(() => {
                res.json({ message: 'Thêm thành công', data: req.body });
            })
            .catch(next);
    }

    // GET
    searchByName(req, res, next) {
        const { name } = req.query;
        console.log(req.query);
        const regex = new RegExp(name, 'i');

        Product.find({ name: regex })
            .then((categories) => {
                res.json(mutipleMongooseToObject(categories));
            })
            .catch(next);
    }


    //PUT
    edit(req, res, next) {
        console.log(req.body);
        Category
            .updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.status(200).json({ message: 'Sửa thành công' });
            })
            .catch(next);
    }

    //DELETE
    delete(req, res, next) {
        Category
            .findOneAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'Xóa thành công' });
            })
            .catch(next);
    }
}

module.exports = new CategoryController();
