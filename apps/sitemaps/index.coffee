express = require 'express'
routes = require './routes'

app = module.exports = express()
app.set 'views', __dirname + '/templates'
app.set 'view engine', 'jade'

app.get '/articles/sitemap.xml', routes.articles
app.get '/sitemap.xml', routes.index
app.get '/sitemap-:resource-:page.xml', routes.resourcePage
