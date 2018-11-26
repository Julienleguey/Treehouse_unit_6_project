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
  res.redirect('/project/1');
});


app.get('/project/:id', (req, res) => {

  const id = req.params.id;

  console.log(id);

  const projId = projects[id].id;
  const projName = projects[id].project_name;
  const projDescr = projects[id].description;
  const projTech = projects[id].technologies;
  const projLiveLink = projects[id].live_link;
  const projGithub = projects[id].github_link;
  const projImages = projects[id].image_urls;



  console.log(projId);

  const templateData = { projId, projName, projDescr, projTech, projLiveLink, projGithub, projImages };



  res.render('project', templateData);
});








app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});
