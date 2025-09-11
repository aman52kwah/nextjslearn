import {config} from 'dotenv';
import postgres from 'postgres';
 
config({path:'.env'});

async function setupDatabase() {
  // Create the postgres connection - adjust the connection string as needed
  const sql = postgres(process.env.POSTGRES_URL || process.env.DATABASE_URL, {
    // Add connection options if needed
  });

  try {

console.log('Setting up the database...');

//users table
    console.log('Creating users table...');
    await sql`
     CREATE TABLE IF NOT EXISTS users(
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     EMAIL TEXT NOT NULL UNIQUE,
     password TEXT NOT NULL,
     );
     `;

     // CREATE CUSTOMERS TABLE
      console.log('Creating customers table...');
      await sql`
      CREATE TABLE IF NOT EXISTS customers(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VATCHAR(100) NOT NULL,
      image_url VARCHAR(255) NOT NULL
      );
      `;

      // create invoices table
      console.log("Creating invoices table..");
      await sql`
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL,
      FOREIGN KEY (customer_id) REFERENCES customers(id)
  );
    `;



// Create the revenue table
    console.log('Creating revenue table...');
    
    
    await sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL,
        revenue INTEGER NOT NULL
      );
    `;
    
    console.log('Revenue table created successfully!');
    
    // Check if data already exists
    const existingData = await sql`SELECT COUNT(*) FROM revenue`;
    
    if (existingData[0].count === '0') {
      console.log('Inserting sample data...');
      
      // Insert sample revenue data
      await sql`
        INSERT INTO revenue (month, revenue) VALUES
        ('Jan', 20000),
        ('Feb', 18000),
        ('Mar', 22000),
        ('Apr', 25000),
        ('May', 23000),
        ('Jun', 27000),
        ('Jul', 29000),
        ('Aug', 31000),
        ('Sep', 28000),
        ('Oct', 33000),
        ('Nov', 35000),
        ('Dec', 37000);
      `;
      
      console.log('Sample data inserted successfully!');
    } else {
      console.log('Data already exists, skipping insert.');
    }
    
    // Verify the data
    const result = await sql`SELECT * FROM revenue LIMIT 5`;
    console.log('First 5 rows:', result);
    
    console.log('Database setup completed!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    // Close the connection
    await sql.end();
  }
}

setupDatabase();
