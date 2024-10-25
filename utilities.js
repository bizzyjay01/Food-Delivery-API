const pagination = (req) =>{
    // const { page, limit } = req.query

    const page = Number(req.query.page) || 1 // i.e get me the page in the query if they send it, if not use 1

    const limit = Number(req.query.limit) || 5

    // to skip and send the next items

    const skip = limit * (page -1)

    return {page, limit, skip}
}

module.exports = {pagination}