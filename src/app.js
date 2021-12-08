App = {
    contracts: {},    
    load: async() => {
        // Load app...
        await App.loadAccount()
        await App.loadContract()
        await App.render()
        console.log("app loading...")
    },

    loadAccount: async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      App.account = accounts[0];
      //console.log(accounts[0]);
    },

    loadContract: async () => {
      const todoList = await $.getJSON('TodoList.json');
      App.contracts.TodoList = TruffleContract(todoList);
      App.contracts.TodoList.setProvider(window.ethereum);

      //Hydrate the smart contract with values from the blockchain
      App.todoList = await App.contracts.TodoList.deployed();
      //console.log(todoList)
    },

    render: async () => {
      //Prevent double render
      if (App.loading){
        return
      }

      //Update app loading state
      App.setLoading(true)  
      //Render Account
      $('#account').html(App.account)

      //Update loading state
      App.setLoading(false)
    },

    setLoading: (boolean) => {
      App.loading = boolean
      const loader = $('#loader')
      const content = $('#content')
      if (boolean){
        loader.show()
        content.hide()
      } else {
        loader.hide()
        content.show()
      }
    }

}

$(() => {
    $(window).load(() => {
        App.load()
    })
})