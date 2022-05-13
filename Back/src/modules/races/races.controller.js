const Database = require("../../core/database");
const Race = require("./race.model");
const { ObjectId } = require('mongodb');
const { update } = require("../users/users.controller");
const { resourceLimits } = require("worker_threads");


const raceController = {
    getAll: (req, res) => {
        const race = new Race();
        race.getAll().then(results => {
            res.send(results);
        });
    },
    getOne: (req, res) => {
        const race = new Race();
        race.getOne(req.params.id).then(result => {
            if(result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        });
    },
    create: (req, res) => {
        const new_race = {
            "name": req.body.name,
            "number_of_laps": req.body.number_of_laps,
            "date": req.body.date,
            "circuit": req.body.circuit, 
            "drivers": [],
            "capacity": req.body.capacity,
            "image": req.body.image,
            "status": "open"
        };
        console.log(new_race)
        Database.collection("races").insertOne(new_race, function(err, res) {
        if(err) console.log("err");
        else console.log("Todo bien")
    });
    
    res.send({message:"Todo correcto"});
    },

    delete: (req,res) => {
        console.log("vamos a borrar a :" +req.params.id)
        Database.collection("races").deleteOne({_id: ObjectId(req.params.id)},function(err, res) {
        if (err){
            console.log(err)
            res.send({status: "Not Deleted"})
        }
    });
    res.send({status: "Ok, hemos borrado a: "+req.params.id})
    },
    update: (req,res) => {
        console.log("Vamos a actualizar: " + req.body._id );
        const updated_race = {
                _id: req.body._id,
                name: req.body.name,
                number_of_laps: req.body.number_of_laps,
                date: req.body.date,
                circuit: req.body.circuit, 
                capacity: req.body.capacity,
                image: req.body.image
            };
        Database.collection("races").updateOne(
        {_id: ObjectId(req.body._id)},
        { $set: { "name" : updated_race.name , "number_of_laps" : updated_race.number_of_laps,"date": updated_race.date,"circuit": updated_race.circuit, "capacity": updated_race.capacity, "image": updated_race.image}},
        function(err, res) {
            if (err){
                console.log(err)
                res.send({status: "Not updated"})
            }
        });
        res.send({message:"se ha actualizado a : "+req.body.id})
    },
    joinRace:(req,res) => {
        console.log("carrera a la que te unirás:"+req.params.id);
        const race = new Race();
        race.getOne(req.params.id).then(result => {
            if(result) {
                console.log("k onda, tu eres:"+ req.body.username)
                console.log("los corredores iniciales son:" + result.drivers)
                result.drivers.push(req.body.username);
                console.log("Y al final son: "+ result.drivers)
                modified_obj = {}
                if((result.capacity - result.drivers.length) === 0){
                    modified_obj = { "drivers" : result.drivers, "status":"closed"}
                }
                else modified_obj = { "drivers" : result.drivers}
                Database.collection("races").updateOne(
                    {_id: ObjectId(req.params.id)},
                    { $set: modified_obj},
                    function(err, res) {
                        if (err){
                            console.log(err)
                            res.send({message: "Not updated"})
                        }
                    });
                console.log(modified_obj)
            } else {
                res.send({message:"No se encuentra la carrera"});
            }
        });
        console.log("Añadido a la carrera")
        res.send({message:"Bienvenido a la carrera"})
    },
    leftRace:(req,res) => {
        console.log("carrera a la que te desuscribirás:"+req.params.id);
        const race = new Race();
        race.getOne(req.params.id).then(result => {
            if(result) {
                console.log("k onda, tu eres:"+ req.body.username)
                console.log("los corredores iniciales son:" + result.drivers)
                modified_obj = {}
                if((result.capacity - result.drivers.length) === 0){
                    modified_obj = { "drivers" : result.drivers, "status":"open"}
                }
                else modified_obj = { "drivers" : result.drivers}
                result.drivers = result.drivers.filter(element => {
                    return !element === req.body.username;
                });
                console.log("Y al final son: "+ result.drivers)
                Database.collection("races").updateOne(
                    {_id: ObjectId(req.params.id)},
                    { $set: { "drivers" : result.drivers }},
                    function(err, res) {
                        if (err){
                            console.log(err)
                            res.send({message: "Not updated"})
                        }
                    });
            } else {
                res.send({message:"No se encuentra la carrera"});
            }
        });
        console.log("Añadido a la carrera")
        res.send({message:"Bienvenido a la carrera"})
    }
}

module.exports = raceController;