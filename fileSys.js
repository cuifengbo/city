
const fs = require('fs');
const path = require('path');
console.log("tt");
// const last = 2;//要自增的版本号位置
// fs.readFile(path.join(__dirname, './package.json'), 'utf8', function (err, data) {
//     if (err) throw err;
//     let _data = JSON.parse(data);
//     let arr = _data.version.split(".");
//         for(var i=0;i<arr.length;i++){
//         if(i==last){
//             arr[i] = String(Number(arr[i])+1)
//         }
//     }
//     _data.version = arr.join(".")
//     fs.writeFile('./package.json',JSON.stringify(_data,null,"  "), function (err) {
//         if (err) console.error(err);
//         console.log("当前版本:",_data.version);
//       });
// });
// async function print(path) {
//     const dir = await fs.promises.opendir(path);
//     for await (const dirent of dir) {
//       console.log(dirent.name);
//     }
//   }
// print('./data').catch(console.error);
var db = {};
buildJson('./data');
console.log(__dirname);
function buildJson(p){
    mapIt(p,db,true);
    console.log("map----");
}

async function mapIt(p,o,outer) {
    const dir = await fs.promises.opendir(p);
    for await (const dirent of dir) {
        if(dirent.isDirectory()){
            o[dirent.name] = {};
            mapIt(p+"/"+dirent.name,o[dirent.name]);
        }else{
            o[dirent.name] = {}; 
            let t ;
            t = dirent.name.substring(dirent.name.length-4);
            console.log(t);
            // console.log(path.join(__dirname, p,dirent.name))
          
            //o[dirent.name]["rel"] = path;
            switch (t) {
                case "json":
                    console.log("d:",path.join(__dirname, dirent.name));
                    fs.readFile(path.join(__dirname,p , dirent.name), 'utf8', function (err, data) {
                        console.log("filedata",JSON.parse(data));
                        o[dirent.name]=JSON.parse(data);
                    });
                    break;
                case ".png":
                case ".jpg":
                    //o[dirent.name]["path"] = path.join(__dirname, p,dirent.name)+"";
                    o[dirent.name]["path"] = "../" + path.join(p,dirent.name)+"";
                    console.log("__dirname",__dirname);
                    console.log("p",p);
                    console.log("dirent",dirent);
                    break;
                default:
                    break;
            }
        }
    }
    if(outer){
        console.log(db);
        console.log("over");
    }
}
setTimeout(() => {
    fs.writeFile('./db/db.js',"const db = "+JSON.stringify(db,null,"  ")+"\n export default db", function (err) {
        if (err) console.error(err);
        console.log("写入成功");
    });
}, 2000);
