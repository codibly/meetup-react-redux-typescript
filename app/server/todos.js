
module.exports = function (app) {

  const todos = [
    { id: 1, name: 'Initial todo', done: false }
  ];

  app.get('/todo', function(req, res) {
    res.json(todos);
  });

  app.post('/todo', function(req, res) {
    todos.push({
      id: todos.reduce((max, todo) => Math.max(max, todo.id), 0) + 1,
      name: req.body.name,
      done: !!req.body.done
    });
    res.json(todos);
  });

  app.put('/todo/:id', function(req, res) {
    let index = todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (index !== -1) {
      todos[index] = Object.assign({}, todos[index], {
        name: req.body.name || todos[index].name,
        done: !!req.body.done || todos[index].done
      });
    }
    res.json(todos);
  });

  app.delete('/todo/:id', function(req, res) {
    let index = todos.findIndex(todo => todo.id === parseInt(req.params.id));

    if (index !== -1) {
      todos.splice(index, 1);
    }
    res.json(todos);
  });

};
