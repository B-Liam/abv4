const allGrowingPages =  require('./growingpages.json');

let newIndex = [];
let page = null;

function buildIndex() {
    for ( i = 0 ; i < page.length ; i++) {
        let newObject = { title: page[i].content.title, slug: page[i].slug, order: page[i].content.order, category: page[i].content.category, image: page[i].content.lead_image.filename }
        newIndex.push( newObject );
    }
}

module.exports = async function() {

    page = allGrowingPages.stories;

    buildIndex();

    return newIndex

};