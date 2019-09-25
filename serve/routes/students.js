
module.exports = (app) => {
    const express = require('express'),
        router = express.Router(),
        nodeExcel = require('excel-export'),
        Students = require('./../models/Students');
    let temp = [];

    router.get('/list', async (req, res) => {
        let items = await Students.find();
        res.send(items);
    });

    router.post('/add', async (req, res) => {
        let msg = await Students.create({ info: req.body });
        res.send({ msg })
    });
    router.delete('/delete/:id', async (req, res) => {
        let msg = await Students.findByIdAndRemove(req.params.id);
        res.send({ msg: 'success' })
    });
    router.get('/excel', async (req, res) => {
        var conf = {};
        //  conf.stylesXmlFile = "styles.xml";
        conf.name = "mysheet";
        conf.cols = [{
            caption: 'Name',
            type: 'string',
        },
        {
            caption: 'city',
            type: 'string'

        }, {
            caption: 'Age',
            type: 'number'
        }];

        // var data = [{
        //     name: 'juhi',
        //     City: 'delhi',
        //     Age: 20
        // },
        // {
        //     name: 'vaishalli',
        //     City: 'noida',
        //     Age: 21
        // }, {
        //     name: 'kaushambi',
        //     City: 'gurgaon',
        //     Age: 22

        // }, {
        //     name: 'suresh',
        //     City: 'delhi',
        //     Age: 70
        // }];

        const data = await Students.find();
        conf.rows = data.map(item=>);
        console.log('data', data)
        // for (var i = 0; i < data.length; i++) {
        //     var buffer = [data[i].name, data[i].City, data[i].Age];
        //     temp.push(buffer);
        // };
        // conf.rows = temp;
        // var result = nodeExcel.execute(conf);
        // res.setHeader('Content-Type', 'application/vnd.openxmlformats');
        // res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
        // res.end(result, 'binary');
    });

    app.use('/api/students', router)

};