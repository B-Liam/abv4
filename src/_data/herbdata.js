const allFruit =  require('./varherbsliam.json');
const storeData = require('./varvegsuttons.json');

//write a function to combine data from both the above

//create an export of all the objects grouped into one big file - see video on how to do this

//this checks for instock items, and pushes them to a new array (at the moment I've disabled this - it will display all)
let allInStock = [];

function cleanOutOfStock() {
    for ( i = 0 ; i < storeData.length ; i++ ) {
        if ( storeData[i].in_stock == 1 || storeData[i].in_stock == 0 ) {
            allInStock.push(storeData[i]);
        }
    }
}

cleanOutOfStock()


let newData = [];


//a function to call
function lookUp(prod) {
    for ( i = 0 ; i < allFruit.length ; i++ ) {
        for ( j = 0 ; j < allInStock.length ; j++ ) {
            if ( allFruit[i].storeID == allInStock[j].merchant_product_id ) {
                let objectEx = allInStock[j];
                let objectL = allFruit[i];
                let veg = {
                    "herb": objectL.herb,
                    "name": objectL.name,
                    "type": objectL.type,
                    "cats": objectL.cats,
                    "abID": objectL.abID,
                    "abStoreID": objectL.storeID,
                    "varSuttonsID": objectEx.merchant_product_id,
                    "featured": objectL.featured,
                    "colourful": objectL.colourful,
                    "description": objectL.description,
                    "sow": objectL.sow,
                    "harvest": objectL.harvest,
                    "deeplink": objectEx.aw_deep_link,
                    "image": objectEx.aw_image_url,
                    "price": objectEx.search_price,
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
