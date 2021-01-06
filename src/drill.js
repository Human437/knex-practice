require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchByName (searchTerm){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name','ILIKE',`%${searchTerm}`)
    .then(result =>{
      console.log(result)
    })
}
searchByName('NOT DOGS')

function paginatedItems (pageNumber){
  const productsPerPage = 6
  const offset = productsPerPage * (pageNumber -1)
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result =>{
      console.log(result)
    })
}
paginatedItems(2)

function itemsAfterDate(daysAgo){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('date_added','>',knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo))
    .then(result =>{
      console.log(result)
    })
}
itemsAfterDate(10)

function totalCostByCategory(){
  knexInstance
    .select('category')
    .from('shopping_list')
    .groupBy('category')
    .sum('price AS total')
    .then(result => {
        console.log(result)
    })
}
totalCostByCategory()