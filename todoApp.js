
MONTHS = ['1', '2','3','4','5','6','7','8','9','10','11','12',]

var ToDo;
function makeTodoList(set) {
  var idNum = 0;
  var ToDo = function(title, month, year, description) {
    this.id = (function() {
      idNum += 1;
      return idNum;
    })();
    this.title = title;
    this.completed = false;
    this.month = month;
    this.year = year;
    this.description = description;

  };
  ToDo.prototype.isWithinMonthYear = function(month, year) {
    month = month || '';
    year = year || ''
    if (typeof month !== "string" && typeof year !== "string" ) {
      console.log("Please try again. Arguments must be strings.")
      return false;
    }
    return (this.month === month && this.year === year);
  };

  var todos = (function() {
    result = [];
    for (i = 0; i < set.length; i += 1) {
      var todo = set[i]
      result.push(new ToDo(todo.title, todo.month, todo.year, todo.description))
    }
    return result;
  })();

  return {
    list: function() {
      return todos.slice();
    },
    add: function(todo) {
      todos.push(todo)
      return todos.slice()
    },
    delete: function(id) {
      var idx = this.findIdxOf(id)
      var todo = todos[idx]
      if (idx >= 0) {
        todos.splice(idx, 1);
        return todo
      } else {
        return undefined;
      }
    },
    update: function(id, property, newValue) {
      var idx = this.findIdxOf(id);
      todos[idx][property] = newValue;
      return todos.slice()
    },
    find: function(id) {
      var idx = this.findIdxOf(id);
      if (idx >= 0) {
        return todos.slice(idx, idx + 1)[0]
      } else {
        return undefined;
      }
    },
    findIdxOf: function(id) {
      for (var i = 0; i < todos.length; i += 1 ) {
        if (todos[i].id === id) {
          return i;
        }
      };
      return undefined;
    },
  }
}

var todoManager = function(list) {
  return {
    all: function() {
      return list.list().slice();
    },
    completed: function() {
      return list.list().filter(function(todo) {
        return todo.completed === true;
      }).slice()
    },
    within: function(month, year) {
      return list.list().filter(function(todo) {
        return todo.isWithinMonthYear(month, year) === true;
      }).slice()
    },
    completedWithin: function(month, year) {
      return this.within(month, year).filter(function(todo) {
        return todo.completed === true;
      })
    }
  }
}
var todoData1 = {
  title: 'Buy Milk',
  month: '1',
  year: '2017',
  description: 'Milk for baby',
};

var todoData2 = {
  title: 'Buy Apples',
  month: '',
  year: '2017',
  description: 'An apple a day keeps the doctor away',
};

var todoData3 = {
  title: 'Buy chocolate',
  month: '1',
  year: '',
  description: 'For the cheat day',
};

var todoData4 = {
  title: 'Buy Veggies',
  month: '',
  year: '',
  description: 'For the daily fiber needs',
};

var todoSet = [todoData1, todoData2, todoData3, todoData4];
var todoList = makeTodoList(todoSet);
