const express = require('express');
const pdf = require('html-pdf');
const fs = require('fs');
const app = express();
const debug = false;
const port = 5000;


/**
 * Generate Badge for Printing
 */
app.get('/badge', (req, res) => {
    let { width, height, name, company, host, date, template, i18n, photo, attachment } = req.query;

    if (!i18n || typeof i18n !== 'object') i18n = {};
    if (!i18n.visiting) i18n.visiting = 'Visiting: ';
    if (!i18n.date) i18n.date = 'Date: ';

    if (!name) return res.sendStatus(400);

    // Defaults
    if (!template) template = '<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <title>Visitor Badge</title> <style type="text/css"> body { font-family: sans-serif; background: #fff; width: 100%; height: 100%; } * { margin: 0; padding: 0; box-sizing: border-box; } .badge { background: #fff; position: relative; } .top { padding: 30px; padding-bottom: 27px; text-align: center; font-weight: bold; background: #000; font-size: 24px; color: #ffffff; width: 100%; } .text { padding: 30px; font-weight: bold; } .text h1 { margin-bottom: 15px; } .text h2 { margin-bottom: 10px; } </style> </head> <body> <div class="badge"> <div class="top"> <h2>VISITOR</h2> </div> <div class="text float-left"> <h1>{{name}}</h1> <h2>{{company}}</h2> <h2>{{visiting}}</h2> <h2>{{date}}</h2> </div> </div> </body> </html>';
    if (!height) height = "4.8in";
    if (!width) width = "7.8in";
    if (!company) company = '';
    if (!i18n) i18n = {};

    // Create Date String
    if (!date) date = '';
    else date = i18n.date + date;

    // Create Host String
    if (!host) host = '';
    else host = i18n.visiting + host;

    // let html = fs.readFileSync('badge.html', 'utf8'); // Read the template from external badge.html

    // Create the output HTML for the badge
    let html = template.replace('{{name}}', name).replace('{{company}}', company).replace('{{visiting}}', host).replace('{{date}}', date);

    // Create PDF from html fragment
    pdf.create(html, { "height": height, "width": width, "border": "0" }).toBuffer(function (err, buffer) {

        // Save the badge as a PDF
        res.setHeader('Content-Type', 'application/pdf');

        // If &attachment=false render in an iframe instead of as an attachment / download
        if (attachment !== 'false')
            res.setHeader('Content-Disposition', 'attachment; filename=badge.pdf');

        res.end(buffer);
    });
});


app.listen(port, function () { console.log('App listening on port', port); });
