/**
 * Created by Mtui on 9/28/16.
 */
db= new Mongo("127.0.0.1:27017").getDB("SellElectronics")
cursor = db.deviceTypes.find();
while(cursor.hasNext()){
    printjson(cursor.next());
}

