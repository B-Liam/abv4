const allData =  require('./varbuyshedsliam.json');
const storeData = require('./varbuyshedsdirect.json');

//write a function to combine data from both the above

//create an export of all the objects grouped into one big file - see video on how to do this

//this checks for instock items, and pushes them to a new array
let allInStock = [];

function cleanOutOfStock() {
    for ( i = 0 ; i < storeData.length ; i++ ) {
        if ( storeData[i].in_stock == "1") {
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
            if ( allData[i].storeID == allInStock[j].merchant_product_id ) {
                let objectEx = allInStock[j];
                let objectL = allData[i];
                let veg = {
                    "product": objectL.product,
                    "name": objectL.name,
                    "type": objectL.type,
                    "cats": objectL.cats,
                    "featured": objectL.featured,
                    "abID": objectL.abID,
                    "abStoreID": objectL.storeID,
                    "varSupplierID": objectEx.merchant_product_id,
                    "description": objectL.description,
                    "deeplink": objectEx.aw_deep_link,
                    "image": objectEx.aw_image_url,
                    "price": objectEx.search_price,
                    "brand": objectEx.brand,
                    "inStock": objectEx.in_stock,
                    "merchant": objectEx.merchant_name
                }
                newData.push(veg);
            }
        }
    }
}

lookUp();

module.exports = function() {
    return newData
};
