const express = require('express');
const Employee = require('../models/employee');
// import Employee from "../models/employee";

const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    }
});

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg'|| file.mimetype === 'image/png'){
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }

const upload = multer({ 
    storage: storage
    // fileFilter: fileFilter
 });


//Get all employees, add ref
router.get("/", (req, res) => {
    const {sort, search, manager, directReports} = req.query;
    // console.log('directReports: ', req.query.directReports);
    let condition = {};
    let option = {};
    if(search){
        const regEx = new RegExp(search)    
        // console.log('directly_reports: ',directly_reports)  
        condition = {$or: [
            {name: regEx},
            {title: regEx},
            {email: regEx},
            {phone: regEx},
            // {manager: regEx}
            // {directly_reports: regEx}
        ]}       
    }
    if(sort){
        option = JSON.parse(sort)
    }
    if(manager){
        condition = {"_id" : manager}
    }
    if(directReports){
        condition = {"_id" : {$in :
            directReports.map(e => JSON.parse(e)._id)
        }}
        // console.log(typeof directReports[0]);
        // console.log(directReports[0]._id);
    }
    // console.log(typeof(option))
    // console.log('option: ', option)
    Employee.find(condition)
    .sort(option)
    .populate("manager")
    .populate("directly_reports")
    .exec((err, employees) => {
        if(err) {
            res.json(err);
        } else {
            // console.log('name: ',name);
            res.status(200).json(employees);
            // console.log(employees)
        }
    })
});


router.get("/:id", (req, res) => {
    Employee.findById(req.params.id)
    .populate("manager")
    .populate("directly_reports")
    .exec((err, employee) => {
        if(err) {
            res.json({err});
        } else {
            res.status(200).json({employee});
        }
    })
});

//NO.1 original vision, must have manager!
router.post("/", upload.single('avatar'), (req, res) => {
    // console.log(req.body)
    let newEmployee = new Employee(req.body);//except req.body.manager
    newEmployee.avatar = req.file.filename;
    const {manager} = req.body;
    newEmployee.save((err,employee) => {
        if(err){
            // console.log(employee)
            res.status(500).json({err});
        } else {
            // console.log(manager)
            if (manager !== "null") {
                // console.log("manager !== null")
                Employee.findOneAndUpdate(
                    {_id: manager},
                    {$push: {directly_reports: employee._id}},
                    (err, manager) => {
                        if(err){
                            res.json(err)
                        } else {
                            res.status(200).json(manager)
                        }
                    }
                )
            } else {
                // console.log("manager is null")
                res.status(200).json(employee)}
        }
    })
});

//NO.2 use model.create(),dosen't work
// router.post("/", upload.single('avatar'), (req, res) => {
//     // console.log(req.body)
//     let newEmployee = new Employee(req.body);//except req.body.manager
//     newEmployee.avatar = req.file.filename;
//     const {manager} = req.body;
//     if (manager !== "null") {
//         Employee.findOneAndUpdate(
//             {_id: manager},
//             {$push: {directly_reports: employee._id}},
//             (err, employees) => {
//                 if(err){
//                     res.json(err)
//                 } else {
//                     Employee.create(req.body, (err, newEmp) => {
//                         if (err)  
//                             res.status(500).json({err});
//                         else 
//                             res.status(200).json({newEmp})
//                     })
//                 }
//             }
//         )
//     } else {
//         Employee.create(req.body, (err, newEmp) => {
//             if (err)  
//                 res.status(500).json({err});
//             else 
//                 res.status(200).json({newEmp})
//         })
//     }
// });



// router.post("/", upload.single('avatar'), (req, res) => {
//     // console.log(req.body)
//     let newEmployee = new Employee(req.body);//except req.body.manager
//     newEmployee.avatar = req.file.filename;
//     const {manager} = req.body;
//     if (manager !== "null") {
//         Employee.findOneAndUpdate(
//             {_id: manager},
//             {$push: {directly_reports: employee._id}},
//             (err, employees) => {
//                 if(err){
//                     res.json(err)
//                 } else {
//                     Employee.save(req.body, (err, newEmp) => {
//                         if (err)  
//                             res.status(500).json({err});
//                         else 
//                             res.status(200).json({newEmp})
//                     })
//                 }
//             }
//         )
//     }
//     newEmployee.save((err,employee) => {
//         if(err){
//             console.log(employee)
//             res.status(500).json({err});
//         } else {
//             // console.log(manager)
//             if (manager !== "null") {
//                 console.log("manager !== null")
//                 Employee.findOneAndUpdate(
//                     {_id: manager},
//                     {$push: {directly_reports: employee._id}},
//                     (err, employees) => {
//                         if(err){
//                             res.json(err)
//                         } else {
//                             res.status(200).json(employees)
//                         }
//                     }
//                 )
//             } else {
//                 console.log("manager is null")
//                 res.status(200).json(employee)}
//         }
//     })
// });


router.put("/:id",  upload.single('avatar'), (req, res) => {
    Employee.findById(req.params.id, (err, preEmployee) => {
        const {managerId} = req.body;
        // console.log(req.body);
        if(err){
            res.status(500).json({err})
        } else {
            if(managerId != preEmployee.manager){
                // console.log("curmanager: ",managerId); 
                //manager is object
                // console.log("pre: ",preEmployee.manager) 
                //premanager是string只有id
                if(managerId){ 
                    Employee.findOneAndUpdate(
                        {_id: managerId},
                        {$push: {directly_reports: req.params.id}},
                        (err, manager) => {
                            if(err) if(err) {
                                res.status(500).end('error in removing id from DR');
                                return; 
                            } else {
                                res.status(200).json({message: 'successfully deleted.'})
                            }
                        }
                    )
                } 
                if(preEmployee.manager){
                    Employee.findOneAndUpdate(
                        {_id: preEmployee.manager},
                        {$pull: {directly_reports: req.params.id}},
                        (err, manager) => {
                            if(err) if(err) {
                                res.status(500).end('error in removing id from DR');
                                return; 
                            } else {
                                res.status(200).json({message: 'successfully deleted.'})
                            }
                        }
                    )
                }
                Employee.findOneAndUpdate({_id: req.params.id}, {$set: {
                    manager: req.body.managerId,
                    sex: req.body.sex,
                    title: req.body.title,
                    phone: req.body.phone,
                    email: req.body.email,
                    start_date: req.body.start_date
                }}, (err, employee) => {
                    // console.log('id:',req.params.id);
                    // console.log(req.body);
                    if(err) {
                        res.json(err);
                    } else {
                        res.status(200).json(employee);
                    }
                })                             
            } else {
                // let editEmp = new Employee ({
                //     manager: req.body.managerId,
                //     sex: req.body.sex,
                //     title: req.body.title,
                //     phone: req.body.phone,
                //     email: req.body.email,
                //     start_date: req.body.start_date
                // })
                Employee.findOneAndUpdate({_id: req.params.id}, {$set: {
                    manager: req.body.managerId,
                    sex: req.body.sex,
                    title: req.body.title,
                    phone: req.body.phone,
                    email: req.body.email,
                    start_date: req.body.start_date
                }}, (err, employee) => {
                    // console.log('id:',req.params.id);
                    // console.log(req.body);
                    if(err) {
                        res.json(err);
                    } else {
                        res.status(200).json(employee);
                        // Employee.find({},(err, employees) => {
                        //     if(err) {
                        //         res.json(err);
                        //     } else {
                        //         res.status(200).json(employees);
                        //     }
                        // })
                       
                    }
                })
            }      
        }})
    })

router.delete("/:id", (req, res) => {
    Employee.findById(req.params.id, (err, employee) => {
        const {manager, directly_reports} = employee;
        // console.log(_id)
        if(err) {
            res.status(400).end('err in finding employee');
            return; 
        } else {
            if (manager) {
                // console.log(employee._id);
                Employee.findOneAndUpdate(
                    {_id: manager},
                    {$pull: {directly_reports: employee._id}},
                    (err, manager) => {
                        if(err)  {
                            res.status(400).end('error in removing id from DR');
                            return; 
                        } else {
                            // res.status(200).json({message: 'successfully deleted.'})
                            console.log('directly_reports successfully deleted.')
                        }
                    }
                )
            }
            if (directly_reports.length > 0) {
                Employee.updateMany(
                    {manager: req.params.id},
                    {$set: {manager: null}},
                    (err, employees) => {
                        if(err) {
                            res.status(400).end('error in removing manager');
                            return; 
                        } else {
                            // res.status(200).json({message: 'successfully deleted manager.'})
                            console.log('manager successfully deleted.') 
                        }
                    }
                )
            } 
            employee.remove().then(() => {
                Employee.find({})
                .populate("manager")
                .populate("directly_reports")
                .exec((err, employees) => {
                    if(err) {
                        res.json(err);
                    } else {
                        res.status(200).json(employees);
                    }
                })       
            })    
           
        } 
    })           
});

module.exports = router;