const { createClient } = require('@supabase/supabase-js');

// Supabase local development credentials
const supabaseUrl = 'http://127.0.0.1:54321';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createUser() {
  console.log('Creating user rcy007@gmail.com with password 123456...');
  
  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: 'rcy007@gmail.com',
      password: '123456',
      email_confirm: true,
      user_metadata: {
        name: 'Test User'
      }
    });

    if (error) {
      console.error('Error creating user:', error.message);
      return;
    }

    console.log('✅ User created successfully!');
    console.log('User ID:', data.user.id);
    console.log('Email:', data.user.email);
    console.log('\nYou can now log in with:');
    console.log('Email: rcy007@gmail.com');
    console.log('Password: 123456');
    
  } catch (err) {
    console.error('Unexpected error:', err.message);
  }
}

// Run the script
createUser(); 