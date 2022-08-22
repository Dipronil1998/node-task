const {dbPort} = require('../config/bootstrap');
const app = require('../config/app');
port = dbPort || 3003;

app.listen(port, () => {
  console.log(`Server is run: ${port}`);
});
