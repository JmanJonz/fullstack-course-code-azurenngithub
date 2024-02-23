This is a very simple nextjs chat application that me and my family and friends can use for fun.

click login in order to login or create an account with a single button click it will check if you already have an account and if you don't it will create one for you.

upon creating an account password is hashed and you are logged in

logged in as in a jwt is created for you with your email signing it saying that you are verified to access things to your unique account. this jwt is sent down to the client and stored in local storage

click logout to be taken back to the login page

you can type a message and then send it to anyone with an existing email in the database if they don't have an email the message will not be created. 

every 5 seconds the messages refresh so you get the most up todate messages coming to your inbox. 

all messages persist and will come back if you logout and log back in

it's just a fun little chat project for me, my family, and friends to play around with.

