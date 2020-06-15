module.exports = (req, res, next) => {

    //if there is a flash message, transfer it to the context then clear it
    res.local.flash = req.session.flash
    delete req.session.flash
    next()

}