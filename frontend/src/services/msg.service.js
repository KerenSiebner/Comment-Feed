import { httpService } from './http.service'
import { storageService } from './async-storage.service'


export const msgService = {
  add,
  query
}

function query(filterBy) {
  var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`msg${queryStr}`)
  return storageService.query('msg')
}

async function add(msgToAdd) { 
  const addedMsg = await httpService.post('msg', msgToAdd) 
  console.log('addedMsg', addedMsg)
  // const addedMsg = await storageService.post('msg', msgToAdd)
  return addedMsg
}