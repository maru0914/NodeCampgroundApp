const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MONGO Connection open!');
    })
    .catch(err => {
        console.log('Oh no, MONGO connection error!');
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '634649fafcda802e588bd902',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores enim sint dolor voluptatum fugiat eius voluptate blanditiis quaerat sunt debitis, consectetur alias repellat perspiciatis. Cumque, quos? Illo quae laudantium quia!',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dqgeqgqgf/image/upload/v1665736527/YelpCamp/tqqf9mhhqdnxcqh8ap17.jpg',
                    filename: 'YelpCamp/tqqf9mhhqdnxcqh8ap17'
                },
                {
                    url: 'https://res.cloudinary.com/dqgeqgqgf/image/upload/v1665736529/YelpCamp/g4hb5wmzq7rbbiejyy0q.jpg',
                    filename: 'YelpCamp/g4hb5wmzq7rbbiejyy0q'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})