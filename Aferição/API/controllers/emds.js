var Emd = require('../models/emds')

// Exame list
module.exports.list = (query) => {
    if (query.res=='OK') {
        query.resultado=True
        delete query.res
    }
    return Emd
            .find(query).
            select("id nome data resultado")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getEmd = id => {
    return Emd.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getModalidades = () => {
    return Emd
        .distinct('modalidade')
        .then(resposta => {
            return resposta
        })
        .catch(erro => {
            return erro
        })
}

module.exports.listatletas = (query) => {
    if (query.hasAtrribute("gen")) {
        query["género"]=query.gen
        query.removeAttribute("gen")
        return Emd
            .find(query)
            .select("nome")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
    }
    else{
        return Emd
            .find(query)
            .select("nome")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
    }
}