const Categoria = require("./../modelos/categoria.modelo");
const Producto = require("./../modelos/producto.modelo");

let index = (req, res) => {
    Producto.find({})
    .populate("categoria")
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json(data);
    })
}

let guardar = (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precio : body.precio,
        categoria : body.categoria
    });

    producto.save((err, producto_nuevo)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            producto_nuevo
        });
    });

}

let modificar = (req, res) => {
    let body = req.body;
    let id = req.params.id;
    
    Producto.findByIdAndUpdate(id, body, {new :true}, (err, producto_modificado) => {
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            producto_modificado
        });
    })
}

let eliminar = (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndRemove(id, (err, producto_eliminado) => {
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json({
            ok:true,
            producto_eliminado
        });
    })
}

let listar_categoria = (req, res) =>{
    Categoria.find({})
    .exec((err, data)=>{
        if(err)
            return res.status(500).json({
                ok: false,
                err
            });

        return res.json(data);
    })
}

module.exports = {
    guardar,
    modificar, 
    index,
    listar_categoria,
    eliminar
}