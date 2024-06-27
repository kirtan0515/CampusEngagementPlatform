import AWS from 'aws-sdk';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { DynamoDB, SSM } = AWS;
const db = new DynamoDB.DocumentClient();
const ssm = new SSM();
const tableName = 'Users';

let jwtSecret;

const getJwtSecret = async () => {
  if (!jwtSecret) {
    try {
      const parameter = await ssm.getParameter({ Name: '/myapp/jwtSecret', WithDecryption: true }).promise();
      jwtSecret = parameter.Parameter.Value;
    } catch (error) {
      console.error('Error fetching JWT secret:', error);
      throw new Error('Could not fetch JWT secret');
    }
  }
  return jwtSecret;
};

export const handler = async (event) => {
  const method = event.httpMethod;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  };

  if (method === 'POST' && event.path === '/signup') {
    return handleSignUp(event, headers);
  }

  if (method === 'POST' && event.path === '/login') {
    return handleLogin(event, headers);
  }

  if (method === 'GET' && event.path === '/engagement') {
    return handleEngagement(event, headers);
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method Not Allowed' })
  };
};

const handleSignUp = async (event, headers) => {
  try {
    const { email, password, name } = JSON.parse(event.body);
    console.log(`Signing up user: ${email}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const userID = email;

    const newItem = {
      TableName: tableName,
      Item: {
        UserID: userID,
        Email: email,
        Name: name,
        Password: hashedPassword,
      },
    };

    await db.put(newItem).promise();
    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ message: 'User created successfully' })
    };
  } catch (error) {
    console.error('Error during sign-up:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
};

const handleLogin = async (event, headers) => {
  try {
    const { email, password } = JSON.parse(event.body);
    console.log(`Logging in user: ${email}`);
    
    const params = {
      TableName: tableName,
      Key: { UserID: email },
    };

    const result = await db.get(params).promise();
    
    console.log('DynamoDB get result:', result);

    if (!result.Item) {
      console.warn(`User not found: ${email}`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'User not found' })
      };
    }

    const isPasswordValid = await bcrypt.compare(password, result.Item.Password);
    console.log('Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      console.warn(`Invalid credentials for user: ${email}`);
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid credentials' })
      };
    }

    const secret = await getJwtSecret();
    console.log('JWT secret retrieved');

    const token = jwt.sign({ email: result.Item.Email }, secret, { expiresIn: '1h' });
    console.log('JWT token generated');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Login successful', token })
    };
  } catch (error) {
    console.error('Error during login:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
    };
  }
};

const handleEngagement = async (event, headers) => {
    try {
      // Example engagement data - replace with actual logic
      const engagementData = {
        message: 'Engagement data retrieved successfully',
        user: {
          email: 'newuser@example.com',
          name: 'New User',
          engagements: [
            { id: 1, type: 'post', content: 'First post' },
            { id: 2, type: 'comment', content: 'First comment' }
          ]
        }
      };
  
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(engagementData)
      };
    } catch (error) {
      console.error('Error during engagement:', error);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Internal Server Error', details: error.message })
      };
    }
  };
  
