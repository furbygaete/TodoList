App = {
    load: async() => {
        // Load app...
        await App.loadAccount()
        console.log("app loading...")
    },

    loadAccount: async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      App.account = accounts[0];
      console.log(accounts[0]);
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})