function getQueryParams(requestQuery) {
    const { title, brand, inStock, search, sort, select, filters } = requestQuery;
    // console.log('requestQuery : ', requestQuery);

    // filtering
    const queryParams = {};
    if (inStock) {
        // need default value here for queryParams.stock
        queryParams.stock = -Infinity;
        if (inStock === 'true') queryParams.stock = { $gte: 1 };
        if (inStock === 'false') queryParams.stock = 0;
        // if (!isNaN(Number(inStock))) queryParams.stock = Number(inStock);
    };
    if (brand) {
        queryParams.brand = { $regex: brand, $options: 'i' };
    };
    if (title) {
        queryParams.title = { $regex: title, $options: 'i' };
    };
    if (search) {
        queryParams.$or = [{ description: { $regex: search, $options: 'i' } }, { title: { $regex: search, $options: 'i' } }, { category: { $regex: search, $options: 'i' } }, { brand: { $regex: search, $options: 'i' } }];
    };

    // sorting
    let sortList = 'id'
    if (sort) {
        sortList = sort.split(',').join(' ');
    };

    //selecting certain fields
    let selectList = []; // make it array of strings or just string, both are fine
    if (select) {
        selectList = select.split(','); // so join or not, both are fine
    };


    // pagination
    const page = requestQuery.page || 1;
    const limit = requestQuery.limit || 10;
    const skip = (page - 1) * limit;


    // numeric filters
    if (filters) {
        // console.log(filters); // price>10 => price: {$gt:10}
        let filter = filters.split(',');
        const mapping = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte'
        };
        const regex = /\b(>|>=|=|<|<=)\b/;
        filter.forEach((value) => {
            const match = regex.exec(value);
            if (!match) return;
            value = value.replace(regex, `_${mapping[match[0]]}_`);
            value = value.split('_');
            const allowedNumericFilterFields = ['stock', 'price', 'rating', 'discountPercentage'];
            if (allowedNumericFilterFields.includes(value[0])) {
                queryParams[value[0]] = {};
                queryParams[value[0]][value[1]] = Number(value[2]);
            }
        });
    };
    return {
        queryParams, sortList, selectList, limit, skip
    }
};

module.exports = getQueryParams;