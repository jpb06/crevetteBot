let unit = module.exports = {
  "generate": async (client) => {
    // client.generateInvite(['ADMINISTRATOR']).then(link => {
    //   console.log(`Generated bot invite link: ${link}`);
    // }).catch(err => {
    //     console.log(err.stack);
    // });

    try {
      let link = await client.generateInvite(['ADMINISTRATOR']);
      console.log(link);
    } catch (e) {
      console.log(e.stack);
    }
  }
}