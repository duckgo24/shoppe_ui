
const Product = require('../models/Product');
const { mutipleMongooseToObject, mongooseToObject } = require('../utils/mongoose');

class ProductController {
    // GET
    show(req, res, next) {
        Product
            .find({})
            .then(products => {
                res.json(mutipleMongooseToObject(products));
            })
            .catch(next);
    }

    // POST 
    insert(req, res, next) {
        Product.create(req.body)
            .then(() => {
                console.log("Đã vào sản phẩm")
                res.json({ message: "Product created successfully" });
            })
            .catch(next);
    }

    // GET
    searchByName(req, res, next) {
        const { name } = req.query;
        console.log(req.query);
        const regex = new RegExp(name, "i");
    
        Product.find({ name: regex })
            .then(products => {
                res.json(mutipleMongooseToObject(products));
            })
            .catch(next);
        }
    

    //GET 
    searhbyId(req, res, next) { 
        Product
            .findById(req.params.id)
            .then(product => {
                res.json(mongooseToObject(product));
            })
            .catch(next);
    }

    //PUT
    edit(req, res, next) {
        Product
            .updateOne({_id: req.params.id} , req.body)
            .then(() => {
                res.status(200).json({message: "Sửa thành công"})
            })
            .catch(next)
    }


    //DELETE
    delete(req, res, next) {
        Product
            .findOneAndDelete({_id: req.params.id})
            .then(() => {
                res.status(200).json({message: "Xóa thành công"})
            })
            .catch(next)
        
    }
    

}

module.exports = new ProductController();
