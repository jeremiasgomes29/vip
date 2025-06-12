import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';
import bodyParser from 'body-parser';

const DISCORD_BOT_TOKEN = 'SEU_TOKEN_DO_BOT';
const GUILD_ID = 'ID_DO_SEU_SERVIDOR';
const ROLE_ID = 'ID_DO_CARGO_VIP';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

const app = express();
app.use(bodyParser.json());

client.once('ready', () => {
  console.log(`🤖 Bot online como ${client.user.tag}`);
});

app.post('/webhook-compra', async (req, res) => {
  const { discordID } = req.body;

  if (!discordID) return res.status(400).send('ID do Discord não informado.');

  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const member = await guild.members.fetch(discordID);

    await member.roles.add(ROLE_ID);
    console.log(`✅ Cargo adicionado para ${discordID}`);
    res.send('Cargo atribuído com sucesso!');
  } catch (err) {
    console.error(`❌ Erro ao dar cargo para ${discordID}:`, err);
    res.status(500).send('Erro ao atribuir o cargo.');
  }
});

client.login(DISCORD_BOT_TOKEN);
app.listen(3000, () => {
  console.log('🚀 Servidor escutando na porta 3000');
});


