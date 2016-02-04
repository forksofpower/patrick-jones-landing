'use strict';

let express     = require('express')
  , path        = require('path')
  , app         = express();

const port      = process.env.LANDING_PAGE_PORT || 3003;

app.use('/public', express.static(__dirname + '/assets'))
app.set('view engine', 'jade')
app.set('views', __dirname + '/views')

app.get('/', (req, res) =>
  res.status(200).render('index', { title: 'Patrick Jones', header: 'This is a test!'})
)

app.listen(port, () =>
  console.log(`Application is running on port ${port}`)
)
