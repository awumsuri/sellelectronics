var db = new Mongo("127.0.0.1:27017").getDB("SellElectronics");
var o = db.deviceTypes.distinct("name", {"make": "samsung"});
while(o.hasNext() ) {
  printjson(o.next());
}
