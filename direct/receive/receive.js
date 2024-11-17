var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'ktmt';
  
        channel.assertQueue(queue, {
            durable: false
        });

        console.log('receiving data from queue:', queue);

        channel.consume(queue, function(msg) {
            var message = JSON.parse(msg.content.toString());
            console.log('received data from queue:', message);
        }, {
            noAck: true
        });
    });
});