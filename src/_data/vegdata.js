const allVeg =  require('./varvegliam.json');
const storeData = require('./varvegsuttons.json');

//write a function to combine data from both the above

//create an export of all the objects grouped into one big file - see video on how to do this

//this checks for instock items, and pushes them to a new array
let allInStock = [];

function cleanOutOfStock() {
    for ( i = 0 ; i < storeData.length ; i++ ) {
        if ( storeData[i].in_stock == 1) {
            allInStock.push(storeData[i]);
        }
    }
}

cleanOutOfStock();

let newData = [];


//a function to call
function lookUp(prod) {
    for ( i = 0 ; i < allVeg.length ; i++ ) {
        for ( j = 0 ; j < allInStock.length ; j++ ) {
            if ( allVeg[i].storeID == allInStock[j].product_id ) {
                let objectEx = allInStock[j];
                let objectL = allVeg[i];
                let veg = {
                    "vegetable": objectL.vegetable,
                    "name": objectL.name,
                    "type": objectL.type,
                    "cats": objectL.cats,
                    "abID": objectL.abID,
                    "abStoreID": objectL.storeID,
                    "varSuttonsID": objectEx.product_id,
                    "featured": objectL.featured,
                    "colourful": objectL.colourful,
                    "description": objectL.description,
                    "sow": objectL.sow,
                    "harvest": objectL.harvest,
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
    return newData
};
