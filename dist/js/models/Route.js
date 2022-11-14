export default class {
  constructor(name, hash_route, view){
    this.name = name
    this.hash_route = hash_route
    this.element =  new view()
  }
}