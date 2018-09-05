import { observable, action, computed, autorun } from 'mobx'
import axios from 'axios'
import GlobalStore from './GlobalStore'

class MyTradesStore {

  @computed get stock() {return GlobalStore.stock }
  @computed get pair() {return GlobalStore.pair }

  @observable myTrades = {}

  @action fetchMyTrades(){
    axios.get(`http://localhost:8051/myTrades/${this.stock}/${this.pair}`)
    .then((response) => {
      this.myTrades = response.data
    })
    .catch((error) => {
      console.log(error)
      this.myTrades = {}
    })
  }

}

const store = window.MyTradesStore = new MyTradesStore()

export default store

autorun(() => {
  console.log(store.stock)
  console.log(store.pair)
  store.fetchMyTrades()
})