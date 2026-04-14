import fs from 'fs';

async function fixMongoEnv() {
  try {
    const srvHost = 'cluster0.x6ei0ac.mongodb.net';
    
    // 1. Fetch DNS SRV
    const srvRes = await fetch(`https://dns.google/resolve?name=_mongodb._tcp.${srvHost}&type=SRV`);
    const srvData = await srvRes.json();
    
    // 2. Fetch DNS TXT
    const txtRes = await fetch(`https://dns.google/resolve?name=${srvHost}&type=TXT`);
    const txtData = await txtRes.json();
    
    // 3. Parse Hosts
    const hosts = srvData.Answer.map((ans) => {
      const parts = ans.data.split(' ');
      return `${parts[3].replace(/\.$/, '')}:${parts[2]}`;
    }).join(',');
    
    // 4. Parse Options
    let options = '';
    if (txtData.Answer && txtData.Answer.length > 0) {
      options = '?' + txtData.Answer.map((ans) => ans.data.replace(/"/g, '')).join('&');
    }
    
    // 5. Read .env, extract creds, replace MONGO_URI
    let envData = fs.readFileSync('.env', 'utf8');
    
    // Extract user/pass:  MONGO_URI=mongodb+srv://user:pass@cluster0...
    const match = envData.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@/);
    if (!match) throw new Error("Could not find credentials in .env");
    
    const user = match[1];
    const pass = match[2];
    
    // The final URI should be mongodb://user:pass@host1,host2/?opts
    const directURI = `mongodb://${user}:${pass}@${hosts}/threads_clone_db${options}&ssl=true`;
    
    // Replace in env
    envData = envData.replace(/^MONGO_URI=.*$/m, `MONGO_URI=${directURI}`);
    fs.writeFileSync('.env', envData, 'utf8');
    console.log("Successfully replaced MONGO_URI with direct connection string to bypass DNS block!");
  } catch (err) {
    console.error("Failed", err);
  }
}

fixMongoEnv();
