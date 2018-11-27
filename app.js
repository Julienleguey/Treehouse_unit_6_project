const express = require('express');
const { data } = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));
app.use('/images', express.static('images'));
app.set('view engine', 'pug');


app.get('/', (req, res) => {

  const projs = [];

  for (let i = 0; i < projects.length; i++) {
    projs.push({proj_id: projects[i].id, proj_name: projects[i].project_name});
  }

  const templateData = { projs };

  res.render('index', templateData);
});


app.get('/about', (req, res) => {
  res.render('about');
});


app.get('/project', (req, res) => {
  res.redirect('/project/0');
});


app.get('/project/:id', (req, res, next) => {

  const id = req.params.id;

  //if id not >=0 or <= projects.length then

  if (id >= 0 && id <= projects.length) {
    const projId = projects[id].id;
    const projName = projects[id].project_name;
    const projDescr = projects[id].description;
    const projTech = projects[id].technologies;
    const projLiveLink = projects[id].live_link;
    const projGithub = projects[id].github_link;
    const projImages = projects[id].image_urls;

    const templateData = { projId, projName, projDescr, projTech, projLiveLink, projGithub, projImages };

    res.render('project', templateData);
  } else {
    const err = new Error("This project doesn't exist (yet)!");
    err.status = 404;
    next(err);
  }
});


app.use((req, res, next) => {
  const err = new Error("We couldn't find the page you're looking for!");
  err.status = 404;
  next(err);
});


app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});


app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
