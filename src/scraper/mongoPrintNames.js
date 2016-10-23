/**
 * Created by Mtui on 10/23/16.
 */
var cursor = db.deviceTypes.distinct("name");
while(cursor.hasNext()) {
  printPrettyJson(cursor.next());
}
