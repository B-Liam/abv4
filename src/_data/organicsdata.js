const allData =  require('./varorganicsliam.json');
const storeData = require('./varoriginalorganics.json');

//write a function to combine data from both the above

//create an export of all the objects grouped into one big file - see video on how to do this

//this checks for instock items, and pushes them to a new array. I've needed to disable this as the datafeed is not accurate regarding what is in stock and what is out of stock
let allInStock = [];

function cleanOutOfStock() {
    for ( i = 0 ; i < storeData.length ; i++ ) {
        if ( storeData[i].in_stock ) {
            allInStock.push(storeData[i]);
        }
    }
}
cleanOutOfStock();


let newData = [];


//a function to call
function lookUp(prod) {
    for ( i = 0 ; i < allData.length ; i++ ) {
        for ( j = 0 ; j < allInStock.length ; j++ ) {
            if ( allData[i].storeID == allInStock[j].product_id ) {
                let objectEx = allInStock[j];
                let objectL = allData[i];
                let veg = {
                    "product": objectL.product,
                    "name": objectL.name,
                    "type": objectL.type,
                    "cats": objectL.cats,
                    "abID": objectL.abID,
                    "abStoreID": objectL.storeID,
                    "varSupplierID": objectEx.product_id,
                    "description": objectL.description,
                    "deeplink": objectEx.deeplink,
                    "image": objectEx.image_url,
                    "price": objectEx.price,
                    "inStock": objectEx.in_stock,
                    "merchant": objectEx.program_name
                }
                newData.push(veg);
            }
        }
    }
}

lookUp();

module.exports = function() {
    return newData;
};
