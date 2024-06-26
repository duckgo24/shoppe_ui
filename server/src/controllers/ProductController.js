const Product = require('../models/Product');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class ProductController {
    // GET
    show(req, res, next) {
        Product.find({})
            .then((products) => {
                res.json(mutipleMongooseToObject(products));
            })
            .catch(next);
    }

    // POST
    insert(req, res, next) {
        Product.create(req.body)
            .then(() => {
                res.json({ message: 'Product created successfully' });
            })
            .catch(next);
    }

    // [Post]
    async find(req, res, next) {
        const query = req.body;

        console.log(query)
        try {
            let dbQuery = {};

            if(query?._id) {
                dbQuery._id = query._id;
            }
            
            if (query?.name) {
                dbQuery.name = { $regex: query.name, $options: 'i' };
            }

            if (query?.color) {
                dbQuery.color = { $regex: query.color, $options: 'i' };
            }

            if (query?.price || query?.quantity) {
                const field = query.price ? 'price' : 'quantity';
                const value = query.price ? query.price : query.quantity;

                switch (query.operator) {
                    case 'gt':
                        dbQuery[field] = { $gt: value };
                        break;
                    case 'eq':
                        dbQuery[field] =  value;
                        break;
                    case 'lt':
                        dbQuery[field] = { $lt: value };
                        break;
                }
            }
            
            
            const data = await Product.find(dbQuery);
            if (data && data.length > 0) {
                res.json(mutipleMongooseToObject(data));
            } else {
                res.status(404).json({ message: 'No products found' });
            }
        } catch (error) {
            next(error);
        }
    }

    //PUT
    edit(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.status(200).json({ message: 'Sửa thành công' });
            })
            .catch(next);
    }

    //DELETE
    delete(req, res, next) {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: 'Xóa thành công' });
            })
            .catch(next);
    }
}

module.exports = new ProductController();
