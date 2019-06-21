const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    name: {
        type: String,
        // required: true
    },
    title: {
        type: String,
        // required: true
    },
    sex: {
        type: String,
        // required: true
    },
    start_date: {
        type: Date,
        // required: true
    },
    phone: {
        type: String,
        default: "000-000-00000"
    },
    email: {
        type: String,
        // required: true
    },
    manager: {
            type: Schema.Types.ObjectId,
            ref: "Employee"
    },
    directly_reports: [
        {
            type: Schema.Types.ObjectId,
            ref: "Employee"
        }     
    ],
    avatar: {
        type: String
    }
});

module.exports = mongoose.model("Employee", EmployeeSchema);

// 'use strict';
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const Employee  = mongoose.model('Employee', new Schema({
//     image: {type: String, default: ""},
//     name: {type: String, default: ""},
//     title:{type: String, default: ""},
//     sex: {type: String, default: ""},
//     startDate: {type: Date, default: new Date()},
//     officePhone: {type: String, default: ""},
//     cellPhone: {type: String, default: ""},
//     sms: {type: String, default: ""},
//     email: {type: String, default: ""},
//     manager: {type: Schema.Types.ObjectId, ref: 'Employee'},
//     directReports: [{ type: Schema.Types.ObjectId, ref: 'Employee'}]
// }, {versionKey: false}), 'Employees');

// module.exports.Employee = Employee;