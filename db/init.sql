CREATE TABLE IF NOT EXISTS subscription (
    subscription_id serial PRIMARY KEY,
    first_name VARCHAR ( 25 ) NOT NULL,
    last_name VARCHAR ( 25 ) NOT NULL,
    email VARCHAR ( 255 ) UNIQUE NOT NULL,
    created_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);