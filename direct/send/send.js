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

        var message = {
            id: 11,
            packet_no: 126,
            temperature: 30,
            humidity: 60,
            tds: 1100,
            pH: 5.0
        };
  
        channel.assertQueue(queue, {
            durable: false
        });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
        console.log("send data complete:", message);

        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
    });
});

