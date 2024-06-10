
const categoriesRoutes = require('./category');
const productRoutes = require('./product');
const userRoutes = require('./user');
const accountRoutes = require('./account');
const billRoutes = require('./bill');


function route(app) {
    app.use('/categories', categoriesRoutes)
    app.use('/products', productRoutes);
    app.use('/users', userRoutes);
    app.use('/accounts', accountRoutes);
    app.use('/bills', billRoutes);
}

module.exports = route;
