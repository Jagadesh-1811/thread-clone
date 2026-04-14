import dns from 'dns';
import util from 'util';

const resolveSrv = util.promisify(dns.resolveSrv);
const resolveTxt = util.promisify(dns.resolveTxt);

async function formatMongoDbDirectString(srvHost) {
  try {
    const srvRecords = await resolveSrv('_mongodb._tcp.' + srvHost);
    const txtRecords = await resolveTxt(srvHost);
    
    // Sort SRV records by priority and weight (not strictly necessary for connection string)
    const hosts = srvRecords.map(r => `${r.name}:${r.port}`).join(',');
    
    // Extract authSource and replicaSet from TXT records
    let options = '';
    if (txtRecords && txtRecords.length > 0) {
      options = '?' + txtRecords.map(r => r.join('')).join('&');
    }
    
    const directURI = `mongodb://${hosts}/${options}`;
    console.log("DIRECT_URI=" + directURI);
  } catch (error) {
    console.error("Resolution Failed:", error);
  }
}

formatMongoDbDirectString('cluster0.x6ei0ac.mongodb.net');
