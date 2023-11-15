import 'dotenv/config'
import { AppDataSource } from "./db";
import app from "./app";

const PORT = process.env.PORT || 4000

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    
    app.listen(PORT, () => {
      console.log(`Server running ${PORT}`);
    })
  })
  .catch(error => {
    console.log(error)
  })
