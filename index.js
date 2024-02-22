let http = require('http');
let url = require('url');
let qs = require('querystring');
let db = require('./db');
const uuid = require('uuid');

let port = 8020;

http.createServer(function(req, res){
    let q = url.parse(req.url, true);
    let id = q.query.id;
    let term = q.query.term;
    let is_closed = q.query.is_closed;
    let categories = q.query.categories;
    let location = q.query.location;
    let price = q.query.price;
    let phone = q.query.phone;
    let rating = q.query.rating;
    res.setHeader('Content-Type', 'application/json');
    
    if(q.pathname == "/business" && req.method === "GET"){
        
        if(id === undefined){
            //list business
            let sql = "SELECT * FROM tbl_business";
            db.query(sql, (err, result) => {
                if(err) throw err;
                res.end(JSON.stringify(result));
            });
        }else if(id !== undefined){
            //get 1 business
            let sql = "SELECT * FROM tbl_business WHERE id='" + id + "'";
            db.query(sql, (err, result) => {
                if(err) throw err;
                let business = result[0];
                res.end(JSON.stringify(business));
            })
        }
    }else if(q.pathname == "/business" && req.method === "POST"){
        //save

        let body = '';

        req.on('data', function(data){
            body += data;
            if(body.length > 1e6){
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 === ! MB
                req.shouldKeepAlive = false;
            }
        });

        // console.log('id ' + uuid.v4());
        req.on('end', function(){
            let postData = qs.parse(body);
            let id = uuid.v4();
            let name = postData.name;
            let is_closed = postData.is_closed;
            let categories = postData.categories;
            let location = postData.location;
            let latitude = postData.latitude;
            let longitude = postData.longitude;
            let price = postData.price;
            let phone = postData.phone;
            let rating = postData.rating;
            let sql = `insert into tbl_business (id, name, is_closed, categories, location, latitude, longitude, price, phone, rating) values ( '${id}', '${name}', '${is_closed}', '${categories}', '${location}', '${latitude}', '${longitude}', '${price}', '${phone}', '${rating}' )`;

            db.query(sql, (err, result) => {
                if(err) throw err;

                if(result.affectedRows == 1){
                    res.end(JSON.stringify({message: 'Success'}));
                }else{
                    res.end(JSON.stringify({message: 'Failed'}));
                }
            });

        });    
    }
    else if(q.pathname == "/business" && req.method === "PUT"){
        //update  
        let body = '';
        req.on('data', function(data){
            body += data;
            if(body.length > 1e6){
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 === ! MB
                req.shouldKeepAlive = false;
            }
        });
        
        req.on('end', function(){
            let postData = qs.parse(body);
            let name = postData.name;
            let categories = postData.categories;
            let location = postData.location;
            let price = postData.price;
            let phone = postData.phone;
            let rating = postData.rating;
            let sql = `update tbl_business set name = '${name}', is_closed = '${is_closed}', categories = '${categories}', location = '${location}', latitude = '${latitude}', longitude = '${longitude}', price = '${price}', phone = '${phone}', rating = '${rating}' where id = '${id}'`;

            console.log(sql);

            db.query(sql, (err, result) => {
                if(err) throw err;
                    
                if(result.affectedRows == 1){
                    res.end(JSON.stringify({message: 'Success'}));
                }else{
                    res.end(JSON.stringify({message: 'Failed'}));
                }
            }); 
        })
        
    }
    else if(q.pathname == "/business" && req.method === "DELETE"){
        //delete   
        let sql = `delete from tbl_business where id = '${id}'`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            if(result.affectedRows == 1){
                res.end(JSON.stringify({message: 'Success'}));
            }else{
                res.end(JSON.stringify({message: 'Failed'}));
            }
        })
    }else if(q.pathname == "/business/search" && req.method === "GET"){
        let param = '';
        if(term !== undefined){
            param += `name like '%${term}%'`;
        }
        if(is_closed !== undefined){
            param += ` or is_closed like '%${is_closed}%'`;
        }
        if(categories !== undefined){
            param += ` or categories like '%${categories}%'`;
        }
        if(location !== undefined){
            param += ` or name like '%${location}%'`;
        }
        if(price !== undefined){
            param += ` or price like '%${price}%'`;
        }
        if(phone !== undefined){
            param += ` or phone like '%${phone}%'`;
        }
        if(rating !== undefined){
            param += ` or rating like '%${rating}%'`;
        }

        let sql = `select * from tbl_business where ${param}`;
        // console.log(sql);
        db.query(sql, (err, result) => {
            if(err) res.end(JSON.stringify({message: 'Parameter term harus diisi!'}));
            console.log(result);
            if(result.length > 0){
                res.end(JSON.stringify(result))
            }else{
                res.end(JSON.stringify({message: 'Data not found.'}))
            }
        })
    }else{
        res.end();
    }

}).listen(port);
console.log('Server is running on port ' + port);