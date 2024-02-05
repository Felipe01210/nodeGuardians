const {request, response} = require('express');

const hasRol = ( ...roles ) => {
    return (req=request,res=response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'Token not validated',
            })
        }

        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `${req.user.name} has no permission`
            })
        }

        next();
    }
}

module.exports = { hasRol }