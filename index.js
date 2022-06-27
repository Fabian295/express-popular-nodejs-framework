import express from 'express';
import Joi from 'joi';

const app = express();

app.use(express.json())

const topics = [
  {
    id: 1,
    imgUrl: 'assets/logo_ang_blue-bg.jpg',
    title: 'Angular Core Deep Dive!',
    price: 100,
    level: 'Beginner',
    description: 'Content and info Subject One. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas rerum harum, excepturi ea, deleniti omnis molestias numquam repellendus et illum est ut qui minima sunt dolorum sit libero fuga?'
  },
  {
    id: 2,
    imgUrl: 'assets/logo_rxjs_350.jpeg',
    title: 'RxJs, a detailed look ',
    price: 150,
    level: 'Beginner',
    description: 'Info and practice with RxJs. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas rerum harum, excepturi ea, deleniti omnis molestias numquam repellendus et illum est ut qui minima sunt dolorum sit libero fuga?'
  },
  {
    id: 3,
    imgUrl: 'assets/ng_rx.png',
    title: 'NgRx, State management ',
    price: 50,
    level: 'Beginner',
    description: `Content and info NgRx. The Redux Store is used with medium and
    big sized applications, to maintain the state of of your app and it's components.  `
  },
  {
    id: 4,
    imgUrl: 'assets/logo_ang_blue-bg.jpg',
    title: 'Angular Advanced',
    price: 100,
    level: 'Advanced',
    description: `When you have mastered the Beginners of Angular,
    it's now time to get to know the script language in al of it's glory and get to
    a higher level. `
  },
  {
    id: 5,
    imgUrl: 'assets/ang_material.jpeg',
    title: 'Angular Material',
    price: 200,
    level: 'Advanced',
    description: 'Subject Five, content and info. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas rerum harum, excepturi ea, deleniti omnis molestias numquam repellendus et illum est ut qui minima sunt dolorum sit libero fuga?'
  },
  {
    id: 6,
    imgUrl: 'assets/ang_security.jpeg',
    title: 'Angular Security',
    price: 350,
    level: 'Beginner',
    description: 'Content and info Subject Six.Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas rerum harum, excepturi ea, deleniti omnis molestias numquam repellendus et illum est ut qui minima sunt dolorum sit libero fuga? '
  },
  {
    id: 7,
    imgUrl: 'assets/logo_ts.jpeg',
    title: 'Type Script, beyond the Beginners ',
    price: 400,
    level: 'Beginner',
    description: `A good understanding about Type Script is important when working
    with Angular. Angular was built with a TypeScript base, there for it is
    better to have a good knowledge of TypeScript syntax. `
  },
  {
    id: 8,
    imgUrl: 'assets/logo_ang_blue-bg.jpg',
    title: 'Angular Architecture',
    price: 625,
    level: 'Advanced',
    description: `Explenation, details and more about Angular and how it's architecture is build.
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quas rerum harum, excepturi ea, deleniti
     omnis molestias numquam repellendus et illum est ut qui minima sunt dolorum sit libero fuga?</p> `
  },
  {
    "id": 9,
    "title": "new text"
}
];


//basic example get call
app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/api/courses', (req, res) => {
//   res.send([1, 2, 3]);
// }) 

// app.get('/api/courses/:id', (req, res) => {
//   res.send(req.params.id);
// }) 

app.get('/api/topics', (req, res) => {
  res.send(topics);
});

app.post('/api/topics', (req, res) => {
  // const schema = {
  //   title: Joi.string().min(3).required()
  // };

  // const result = Joi.validate(req.body, schema);
  // console.log(result);
  // if(result.error) {
  //   res.status(400).send(result.error.details[0].message);
  //   return;
  // }

  /***************************************************** 
   * All the commeented lines above, are not neccesary anymore
   * because I made, and then used, the function validateTopic(),
   * and because of reconstructoring
   ************************************************/

  const { error } = validateTopic(req.body)
  if(error) {  //not result.error, constructoring
    res.status(400).send(error.details[0].message);      // not result.error.details[0].message
    return;
  }

  const topic = {
    id: topics.length + 1,
    title: req.body.title,
    level: req.body.level,
    description: req.body.description

  };
  topics.push(topic);
  res.send(topic);

});

app.get('/api/topics/:id', (req, res) => {

  const topic = topics.find(t => t.id ==  parseInt(req.params.id));
  if(!topic) res.status(404).send('The topic with the given ID was not found!');
  res.send(topic);
  // res.send(data)
  // res.send(req.query && req.params);
}) 

app.put('/api/topics/:id',(req, res) => {
  const topic = topics.find(t => t.id ==  parseInt(req.params.id));
  if(!topic) res.status(404).send('The topic with the given ID was not found!');

  // const result = validateTopic(req.body)
  const { error } = validateTopic(req.body)
  if(error) {  //not result.error, constructoring
    res.status(400).send(error.details[0].message);      // not result.error.details[0].message
    return;
  }

  topic.title = req.body.title;
  topic.level = req.body.level;
  topic.description = req.body.description
  res.send(topic);
});


const validateTopic  = (topic) => {
  const schema = {
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    level: Joi.string().min(3).required()
  };
  
  return Joi.validate(topic, schema);
  
}

// DELETE a  Topic
app.delete('/api/topics/:id', (req, res) => {

  const topic = topics.find(t => t.id ==  parseInt(req.params.id));
  if(!topic) res.status(404).send('The topic with the given ID was not found!');

  const index = topics.indexOf(topic);
  topics.splice(index, 1);

  res.send(topic);
  // res.send(data)
  // res.send(req.query && req.params);
}) 


//create server annd listen to a port, here it is port 3000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}...`)) 
