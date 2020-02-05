liff.init()

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://adminbot:${process.env.PASSWORD_MONGO_DB}@bot-linecoba-78zrv.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
var profileuser;
liff.getProfile()
.then(profile => {
    profileuser = profile
})
.catch((err) => {
  console.log('error', err);
});

async function tambah(text) {
    const collection = client.db("bot-dicoding").collection(profileuser.userId);
        let idx = await collection.count()
        console.log(idx)            
        const myobj = { id: 'ID'+(idx+1),status: true, task: text };
        console.log(myobj)            
        await collection.insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted"); 
            client.close();
        })
    liff.sendMessages([
        {
          type:'text',
          text:'Berhasil menambahkan Task'
        }
      ])
}