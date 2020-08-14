module.exports = (req, res, next) =>{
    if (!req.user){
        req.flash('error', 'you need to signed to access this page')
        res.redirect('/auth/login')
    }
    else {
        next()
    }
}